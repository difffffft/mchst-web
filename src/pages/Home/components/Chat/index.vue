<script setup>
import {useAppStore} from "@/stores/modules/appStore";
import {OPENAI_ROLE_AVATAR, OPENAI_ROLES} from "@/enums";
import {marked} from "marked";
import {ref} from "vue";

const props = defineProps({
  chatSessionId: {
    type: String,
    required: true
  },
  chatModelList: {
    type: Array,
    required: true
  },
  chatSessionInfo: {
    type: Object,
    required: true
  },
  chatLoading: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['onSend'])

const appStore = useAppStore()


/**
 * 用户当前输入的提示词
 * The prompt word currently entered by the user
 *
 * @type {Ref<UnwrapRef<string>>}
 */
const prompt = ref('')

/**
 * MarkDown转Html
 * @param value
 * @returns {string | Promise<string>}
 */
const mdToHtml = (value) => {
  return marked.parse(value)
}

/**
 * 发送提示词
 * @returns {Promise<void>}
 */
const onSend = async () => {
  await emits('onSend', prompt.value)
  prompt.value = ''
}

/**
 * 清空提示词
 */
const clearPrompt = () => {
  prompt.value = ''
}

const onSendMessage = async (event) => {
  if (!event.shiftKey) {
    await onSend()
  }
}

const isTextareaFocused = ref(false)
const onTextareaFocus = () => {
  isTextareaFocused.value = true;
}
const onTextareaBlur = () => {
  isTextareaFocused.value = false;
}


const contentContainer = ref(null)
/**
 * 滚动到最下方
 * Scroll to the bottom
 *
 */
const startScrollBottom = () => {
  contentContainer.value.scrollTop = contentContainer.value.scrollHeight
}

defineExpose({
  clearPrompt,
  startScrollBottom
})
</script>

<template>
  <div class="chat" v-loading="chatLoading">
    <BaseCollapseButton @on-click="appStore.historyCollapseToggle"></BaseCollapseButton>

    <!--头部区域-->
    <header v-if="!chatSessionInfo.id">
      <el-select v-model="chatSessionInfo.model" placeholder="请选择模型" size="large">
        <el-option
            v-for="item in chatModelList"
            :label="item.name"

            :key="item.value"
            :value="item.value"
        />
      </el-select>
    </header>

    <!--内容展示区，问题区，回答区-->
    <main ref="contentContainer">
      <ul class="content-container" v-if="chatSessionInfo.list.length > 0">
        <li class="content" :class="{'user-content':v.role===OPENAI_ROLES.USER,
        'assistant-content':v.role===OPENAI_ROLES.ASSISTANT}" v-for="v in chatSessionInfo.list" :key="v.id">
          <el-avatar :src="OPENAI_ROLE_AVATAR[v.role]"></el-avatar>
          <div class="content-msg">
            <template v-if="v.role===OPENAI_ROLES.USER">
              <pre>{{ v.content }}</pre>
            </template>
            <template v-if="v.role===OPENAI_ROLES.ASSISTANT">
              <div class="markdown" v-html="mdToHtml(v.content)"></div>
            </template>
          </div>
        </li>
      </ul>
      <BaseEmpty v-else></BaseEmpty>
    </main>


    <!--用户输入文本，点击发送-->
    <footer>
      <div class="footer-container" :class="{ 'focused': isTextareaFocused }">
        <el-input
            v-model="prompt"
            type="textarea" :autosize="{minRows:1,maxRows:8}"
            @keyup.enter="onSendMessage" @focus="onTextareaFocus" @blur="onTextareaBlur"></el-input>
        <el-button :disabled="prompt===''" class="send-button" :class="{'send-button-disable':prompt===''}" type="info"
                   icon="Top" @click="onSend"/>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  flex: 1;
  height: 100%;
  background-color: $m-chat-bg;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
}


main {
  flex: 1;
  overflow-y: auto;

  .content-container {
    margin: 0 auto;
    padding: 20px 60px;
    display: flex;
    flex-direction: column;
  }

  .content {
    width: 100%;
    display: flex;
    margin-bottom: 20px;

    .content-msg {
      flex: 1;

      border-radius: 8px;
      margin-left: 8px;
      padding: 12px 16px;
    }
  }

  .user-content {
    .content-msg {
      color: white;
      border-top-right-radius: 0;
      margin-right: 8px;
    }
  }

  .assistant-content {
    .content-msg {
      border-top-left-radius: 0;
    }
  }
}


footer {
  margin: 0 auto;

  .footer-container {
    display: flex;
    align-items: flex-end;
    border-radius: 12px;
    border: 1px solid rgba(217, 217, 227, .2);
    padding: 8px;

    ::v-deep(textarea) {
      box-shadow: none;
      background-color: transparent;
      resize: none;
    }

    .send-button {
      color: black;
      background-color: white;
    }

    .send-button:hover {
      background-color: black;
      color: white;
    }

    .send-button-disable {
      background-color: #222222;
      color: #999;
    }

    .send-button-disable:hover {
      background-color: #222222;
      color: #999;
    }
  }

  .footer-container.focused {
    border-color: rgba(217, 217, 227, .4);
  }
}


.content-container, footer {
  width: 60%;
}

@media screen and (max-width: $m-mobile-width) {
  .content-container {
    padding: 20px 0 !important;
    width: 100%;
  }

  footer {
    width: 100%;
  }
}
</style>