<script setup>
import {useSendProApi} from "@/api/sys/chat";
import History from "./components/History/index.vue";
import Chat from "./components/Chat/index.vue";
import {useRoute, useRouter} from "vue-router";
import {computed, nextTick, onBeforeMount, onMounted, ref} from "vue";
import {historyList} from "@/mock/history.js";
import {m_modelList} from "@/mock/modelList.js";
import {nanoid} from "nanoid";
import {OPENAI_ROLES} from "@/enums/index.js";
import useSettingDialog from "@/dialog/SettingDialog/index.jsx";
import {useDark, useToggle} from "@vueuse/core";
import {marked} from "marked";

const route = useRoute()
const router = useRouter()

/**
 * 聊天组件
 * Chat component
 *
 * @type {any}
 */
const chatRef = ref(null)

/**
 * 聊天会话ID
 * Chat Session ID
 *
 * @type {Ref<UnwrapRef<string | RouteParamValue[]>>}
 */
const chatSessionId = computed(() => {
  return route.params.id || ''
})


/**
 * 聊天历史列表
 * Chat History List
 *
 * @type {Ref<UnwrapRef<[{children: [{name: string, id: string}], name: string, id: string},{children, name: string, id: string},{children, name: string, id: string}]>>}
 */
const chatHistoryList = ref([])


/**
 * 聊天历史加载
 * Chat history loading
 *
 * @type {Ref<UnwrapRef<boolean>>}
 */
const chatHistoryLoading = ref(false)

/**
 * 可用的模型列表，不同的账号具有不同的访问权限
 * List of available models
 *
 * @type {Ref<UnwrapRef<*[]>>}
 */
const modelList = ref(m_modelList)

/**
 * 当前会话的信息
 * Information about the current session
 *
 * @type {Ref<UnwrapRef<{}>>}
 */
const chatSessionInfo = ref({
  id: '',
  //模型的value
  model: m_modelList[0].value,
  // 聊天列表
  list: []
})


/**
 * 聊天界面加载
 * Chat interface loading
 *
 * @type {Ref<UnwrapRef<boolean>>}
 */
const chatLoading = ref(false)


/**
 * 清除聊天
 * Clear Chat
 *
 */
const clearChat = () => {
  chatSessionInfo.value.id = ''
  chatSessionInfo.value.list = []
  chatRef.value && chatRef.value.clearPrompt()
}

/**
 * 新建会话，需要清空聊天
 * New session, need to clear chat
 */
const onNewChat = () => {
  // 清空聊天信息
  clearChat()
  // 更新路由
  router.push({
    name: 'Home'
  })
}

/**
 * 进入某个会话
 * Entering a session
 *
 */
const onGoChat = (id) => {
  // 清空聊天信息
  clearChat()
  chatSessionInfo.value.id = id
  // 更新路由
  router.push({
    name: 'ChatSession',
    params: {
      id
    }
  })
  // todo:加载新的聊天记录
  chatLoading.value = true
  setTimeout(() => {
    /**
     * todo：判断当前的聊天记录和界面ID是否相同，防止用户频繁切换ID，导致的界面渲染问题
     */
    chatSessionInfo.value.list.push({
      id: nanoid(),
      role: OPENAI_ROLES.USER,
      content: "new chat"
    })
    chatLoading.value = false
  }, 1200)
}


/**
 * 设置
 * set up
 *
 */
const onSetting = () => {
  const {show, close} = useSettingDialog()
  show()
}

/**
 * 重命名历史记录
 * Rename History
 *
 * @param id
 */
const onRename = (id) => {
  console.log(id)
}

/**
 * 删除历史记录
 * Delete History
 *
 * @param id
 */
const onDelete = (id) => {
  console.log(id)
}


/**
 * 用户发送新的提示词的时候
 * When a user sends a new cue
 *
 */
const onSend = async (prompt) => {
  // 如果当前没有会话
  if (!chatSessionInfo.value.id) {
    //1.生成会话
    //todo:从服务器生成新的会话
    chatSessionInfo.value.id = nanoid()
    //2.更新路由
    await router.push({
      name: 'ChatSession',
      params: {
        id: chatSessionInfo.value.id
      }
    })
    //3.历史记录添加
    chatHistoryList.value[0].children.unshift({
      id: chatSessionInfo.value.id,
      name: prompt,
    })
  }

  //1.将提问数据添加到本地
  // 每一次提问都是一个数组
  chatSessionInfo.value.list.push({
    id: nanoid(),

    // 提问
    q: {
      role: OPENAI_ROLES.USER,
      list: [
        {
          id: nanoid(),
          content: prompt
        }
      ]
    },

    // 回答
    a: {
      role: OPENAI_ROLES.ASSISTANT,
      list: [
        {
          id: nanoid(),
          content: ''
        }
      ]
    }
  })
  // 滚动一下
  await nextTick(() => {
    chatRef.value.startScrollBottom()
  })

  const resp = await useSendProApi({
    model: chatSessionInfo.value.model,
    context_list: chatSessionInfo.value.list
  })

  const huida = {value: ""}
  const reader = resp.body.getReader()
  const decoder = new TextDecoder()
  while (1) {
    const {done, value} = await reader.read()
    if (done) {
      break
    }
    const str = decoder.decode(value)
    // 拿到最后一条会对话
    const lastA = chatSessionInfo.value.list[chatSessionInfo.value.list.length - 1].a.list
    huida.value += str

    //
    lastA[lastA.length - 1].content = marked.parse(huida.value)
    // lastA[lastA.length - 1].content += str

    // 拿到最后一条对话中的
    await nextTick(() => {
      chatRef.value.startScrollBottom()
    })
  }
}


/**
 * 切换成夜间模式
 */
onBeforeMount(() => {
  const isDark = useDark()
  if (!isDark.value) {
    const toggleDark = useToggle(isDark)
    toggleDark()
  }
})

/**
 * 首次进入页面时加载
 * Loaded on first page entry
 *
 */
onMounted(() => {
  chatHistoryLoading.value = true
  setTimeout(() => {
    chatHistoryList.value = historyList
    chatHistoryLoading.value = false
  }, 1500)
})
</script>

<template>
  <div class="home">
    <History
        :chatSessionInfo="chatSessionInfo"
        :chatHistoryList="chatHistoryList"
        :chatHistoryLoading="chatHistoryLoading"
        @onNewChat="onNewChat"
        @onGoChat="onGoChat"
        @onSetting="onSetting"
        @onRename="onRename"
        @onDelete="onDelete"
    ></History>
    <Chat
        ref="chatRef"
        :chatSessionId="chatSessionId"
        :chatSessionInfo="chatSessionInfo"
        :chatModelList="modelList"
        :chatLoading="chatLoading"
        @onSend="onSend"
    ></Chat>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  height: 100%;
  color: white;
}
</style>