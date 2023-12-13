<script setup>
import {useAppStore} from "@/stores/modules/appStore.js";
import {ref} from "vue";
import {nanoid} from "nanoid";

const appStore = useAppStore()

const current = ref(nanoid())
const onHistoryItemClick = (value) => {
  current.value = value
}
const list = ref([
  {
    id: nanoid(),
    name: "今天",
    children: [
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      }
    ]
  },
  {
    id: nanoid(),
    name: "昨天",
    children: [
      {
        id: current.value,
        name: "请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
    ]
  },
  {
    id: nanoid(),
    name: "7天以前",
    children: [
      {
        id: nanoid(),
        name: "请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
      {
        id: nanoid(),
        name: "请问你的谁的谁,请问你的谁的谁,请问你的谁的谁",
      },
    ]
  }
])
</script>

<template>
  <div class="history" :class="appStore.historyCollapse ? 'history-collapse' :'history-no-collapse'">
    <BaseNewChatButton></BaseNewChatButton>
    <ul class="scrollbar">
      <li v-for="v in list" :key="v.id">
        <span class="time">{{ v.name }}</span>
        <div class="history-item" v-for="j in v.children" :key="j.id"
             :class="current === j.id ? 'history-item-active':''"
             @click="onHistoryItemClick(j.id)"
        >
          <el-text truncated>{{ j.name }}</el-text>
        </div>
      </li>
    </ul>
    <BaseSettingButton></BaseSettingButton>
  </div>
</template>

<style lang="scss" scoped>
.history {
  height: 100%;
  padding: 12px;
  background-color: $m-history-bg;
  position: relative;
  transition: all 0.35s;
  display: flex;
  flex-direction: column;

  ul {
    overflow-y: auto;
    padding-right: 12px;
    flex: 1;

    li {
      margin-top: 20px;

      .time {
        color: #999999;
        font-size: 12px;
      }
    }
  }
}

.history-collapse {
  width: 240px;
}

.history-no-collapse {
  width: 0;
  padding: 0;
}


.history-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  border-radius: 8px;
  margin-top: 8px;
  padding-left: 12px;
  cursor: pointer;
  transition: all 0.35s;

  .el-text {
    color: white;
    font-size: 14px;
  }
}

.history-item:hover {
  background-color: #202123;
}

.history-item-active {
  background-color: #202123;
}
</style>
