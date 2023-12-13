<script setup>
import {useChatApi} from "@/api/sys/chat";
import {useAppStore} from "@/stores/modules/appStore";
import {useUserStore} from "@/stores/modules/userStore";
import {OPENAI_ROLE_AVATAR, OPENAI_ROLES} from "@/enums";
import {BASE_URL} from "@/constants";
import {marked} from "marked";

const appStore = useAppStore()
import {ref} from "vue";
import {nanoid} from "nanoid";

const userStore = useUserStore()

const msgList = ref([])

const prompt = ref()
const cachePrompt = ref()
const disabled = ref(false)

// msgList.value.push({
//   id: nanoid(),
//   role: OPENAI_ROLES.USER,
//   content: "1+1等于几"
// })
// msgList.value.push({
//   id: nanoid(),
//   role: OPENAI_ROLES.ASSISTANT,
//   content: "# 标题\n在CSS中，使用flex的反转可以通过flex-direction属性来实现。要反转flex容器中子元素的排列顺序，可以将flex-direction的值设置为\"row-reverse\"或\"column-reverse\"。 例如，如果你想要水平排列的子元素从右到左进行排列，可以这样设置： ``` .container { display: flex; flex-direction: row-reverse; } ``` 如果你想要垂直排列的子元素从下到上进行排列，可以这样设置： ``` .container { display: flex; flex-direction: column-reverse; } ``` 通过这种方式，你可以反转flex容器中子元素的排列顺序。同样，你也可以通过改变flex-direction属性的值来实现其他不同的布局效果。\n"
// })
//
// msgList.value.push({
//   id: nanoid(),
//   role: OPENAI_ROLES.ASSISTANT,
//   content: "可以使用Python的for循环来实现：\n\n```python\nfor i in range(1, 11):\n    print(i)\n```\n\n以上代码会输出数字1到10，每个数字占一行。"
// })


const mdToHtml = (value) => {
  return marked.parse(value)
}

const onSend2 = async () => {
  addUser()
  try {
    disabled.value = true
    const {data} = await useChatApi({prompt: cachePrompt.value})
    msgList.value.push({
      id: nanoid(),
      role: OPENAI_ROLES.ASSISTANT,
      content: data
    })
  } catch (e) {

  } finally {
    disabled.value = false
  }
}

const addUser = () => {
  cachePrompt.value = prompt.value
  msgList.value.push({
    id: nanoid(),
    role: OPENAI_ROLES.USER,
    content: prompt.value
  })
  prompt.value = ''
}

const getStreamResponse = async () => {
  addUser()
  const url = BASE_URL + '/sys/chat/stream'
  const context_list = JSON.parse(JSON.stringify(msgList.value.slice(-10))).filter((item, index) => {
    delete item.id
    return item
  })
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': userStore.authorization
    },
    body: JSON.stringify({context_list})
  })
  msgList.value.push({
    id: nanoid(),
    role: OPENAI_ROLES.ASSISTANT,
    content: ''
  })
  const reader = resp.body.getReader()
  const decoder = new TextDecoder()
  while (1) {
    const {done, value} = await reader.read()
    if (done) {
      break
    }
    const str = decoder.decode(value)
    msgList.value[msgList.value.length - 1].content += str
  }
}

const onSend = async () => {
  await getStreamResponse()
}
</script>

<template>
  <div class="chat">
    <BaseCollapseButton @on-click="appStore.historyCollapseToggle"></BaseCollapseButton>
    <div style="height: 100%;display:flex;flex-direction: column;padding: 20px 100px;">
      <div style="flex: 1;">
        <ul class="content-container">
          <li class="content" :class="{'user-content':v.role===OPENAI_ROLES.USER,
        'assistant-content':v.role===OPENAI_ROLES.ASSISTANT}" v-for="v in msgList" :key="v.id">
            <el-avatar :src="OPENAI_ROLE_AVATAR[v.role]"></el-avatar>
            <div class="content-msg">
              <template v-if="v.role===OPENAI_ROLES.USER">
                <div>{{ v.content }}</div>
              </template>
              <template v-if="v.role===OPENAI_ROLES.ASSISTANT">
                <div class="markdown" v-html="mdToHtml(v.content)"></div>
              </template>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div style="display: flex;height: 100%;align-items: flex-end">
          <el-input v-model="prompt" type="textarea" :autosize="{minRows:4,maxRows:6}"
                    style="margin-right: 20px;"></el-input>
          <el-button :disabled="disabled" style="width: 200px;height: 100%" type="primary" size="large" @click="onSend">
            发送
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  flex: 1;
  height: 100%;
  background-color: $m-chat-bg;
  position: relative;
}

::v-deep(.el-card__body) {
  height: 100%;
}

.content-container {
  height: 100%;
  overflow-y: auto;
}

.content {
  display: flex;

  .content-msg {
    max-width: 70%;
    background-color: #f2f2f2;
    border-radius: 8px;
    margin-left: 8px;
    margin-top: 20px;
    padding: 12px 16px;
  }
}

.user-content {
  flex-direction: row-reverse;

  .content-msg {
    background-color: green;
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
</style>