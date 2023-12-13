<script setup>
import {useAppStore} from "@/stores/modules/appStore.js";

const emits = defineEmits(['onClick'])
const appStore = useAppStore()
</script>

<template>
  <div class="collapse" @click="emits('onClick')">
    <el-icon>
      <ArrowLeftBold v-if="appStore.historyCollapse"/>
      <ArrowRightBold v-else/>
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.collapse {
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: 0.8%;
  transform: translateY(-50%);
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
}
</style>