<script setup>
import {useAppStore} from "@/stores/modules/appStore.js";

const props = defineProps({
  chatHistoryList: {
    type: Array,
    required: true
  },
  chatSessionInfo: {
    type: Object,
    required: true
  },
  chatHistoryLoading: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['onNewChat', 'onGoChat', 'onSetting', 'onRename', 'onDelete'])
const appStore = useAppStore()
</script>

<template>
  <div class="history" :class="appStore.historyCollapse ? 'history-collapse' :'history-no-collapse'">
    <BaseNewChatButton @onClick="emits('onNewChat')"></BaseNewChatButton>
    <ul class="scrollbar" v-loading="chatHistoryLoading">
      <li v-for="v in chatHistoryList" :key="v.id">
        <span class="time">{{ v.name }}</span>
        <div class="history-item" v-for="j in v.children" :key="j.id"
             :class="{'history-item-active':chatSessionInfo.id === j.id}"
             @click="emits('onGoChat',j.id)"
        >
          <el-text truncated>{{ j.name }}</el-text>
          <el-popover
              v-if="chatSessionInfo.id === j.id"
              ref="popoverRef"
              trigger="click"
              placement="bottom-start"
          >
            <template #reference>
              <el-icon class="more" @click.stop="">
                <MoreFilled/>
              </el-icon>
            </template>
            <el-button class="option-item" text icon="Edit" @click="emits('onRename', j.id)">重命名</el-button>
            <el-button class="option-item" type="danger" text icon="Delete" @click="emits('onDelete', j.id)">删除
            </el-button>
          </el-popover>
        </div>
      </li>
    </ul>
    <BaseSettingButton @onClick="emits('onSetting')"></BaseSettingButton>
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
  justify-content: space-between;
  align-items: center;
  height: 36px;
  border-radius: 8px;
  margin-top: 8px;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.35s;

  .more {
    margin-left: 12px;
  }


  .el-text {
    color: white;
    font-size: 14px;
  }
}

.option-item {
  width: 100%;
  margin-left: 0;
  margin-top: 8px;
  justify-content: flex-start;
}

.history-item:hover {
  background-color: #202123;
}

.history-item-active {
  background-color: #202123;
}
</style>
