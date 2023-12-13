<template>
    <div class="base-new-chat-button">
        <img src='@/assets/images/assets-images-logo.png'>
        <span>New chat</span>
        <el-icon size="18">
            <Edit />
        </el-icon>
    </div>
</template>

<style lang="scss" scoped>
.base-new-chat-button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 46px;

    img {
        height: 32px;
    }
}

.base-new-chat-button:hover {}
</style>