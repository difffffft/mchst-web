<script setup>
import {useChatApi, useSendProApi} from "@/api/sys/chat";
import History from "./components/History/index.vue";
import Chat from "./components/Chat/index.vue";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {historyList} from "@/mock/history.js";
import {m_modelList} from "@/mock/modelList.js";
import {nanoid} from "nanoid";
import {OPENAI_ROLES} from "@/enums/index.js";
import useSettingDialog from "@/dialog/SettingDialog/index.jsx";

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
  model: 'chat-gpt-3.5',
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
  chatSessionInfo.value.list.push({
    id: nanoid(),
    role: OPENAI_ROLES.USER,
    content: prompt
  })
  //2.将回答数据添加到本地
  chatSessionInfo.value.list.push({
    id: nanoid(),
    role: OPENAI_ROLES.ASSISTANT,
    content: ''
  })
  //2.去发送请求
  const context_list = JSON.parse(JSON.stringify(chatSessionInfo.value.list.slice(-10))).map((item, index) => {
    return {
      role: item.role,
      content: item.content
    }
  })
  const resp = await useSendProApi(context_list)
  const reader = resp.body.getReader()
  const decoder = new TextDecoder()
  while (1) {
    const {done, value} = await reader.read()
    if (done) {
      break
    }
    const str = decoder.decode(value)
    chatSessionInfo.value.list[chatSessionInfo.value.list.length - 1].content += str
  }
}


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
  display: flex;
  height: 100%;
  color: white;
}
</style>