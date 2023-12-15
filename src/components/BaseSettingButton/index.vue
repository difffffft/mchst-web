<script setup>
import {useUserStore} from "@/stores/modules/userStore.js";

const emits = defineEmits(['onClick'])

const userStore = useUserStore()
</script>

<template>
  <div class="base-new-chat-button" @click="emits('onClick')">
    <div class="left">
      <el-avatar :size="30" style="margin-left: 0">{{ userStore.userInfo.username[0] }}</el-avatar>
      <el-text truncated>设置</el-text>
    </div>
    <el-icon size="18">
      <Setting/>
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.base-new-chat-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 46px;
  padding: 0 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.35s;

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-avatar{
      background-color: #AB47BC;
    }

    img {
      height: 30px;
    }

    span {
      color: white;
      margin-left: 8px;
    }
  }
}

.base-new-chat-button:hover {
  background-color: #202123;
}

.base-new-chat-button:active {
  scale: 0.96;
}
</style>
<script setup>
</script>