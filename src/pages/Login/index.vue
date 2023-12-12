<script setup>

import {ref} from "vue";

const loginFormData = ref({
  email: '',
  password: '',
})
</script>

<template>
  <div class="login">
    <div class="video-container">
      <video muted autoplay loop playsinline>
        <source src="@/assets/videos/assets-videos-login-bg.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="video-mask"></div>
    <div class="login-container">
      <div class="login-container-desc">
        <header>
          Welcome!
        </header>
        <main>
          <img src="@/assets/images/assets-images-logo-2.png" alt="">
        </main>
        <footer>
          没用账号？<a>现在注册</a>
        </footer>
      </div>
      <div class="login-container-main">
        <header>
          登录
        </header>
        <main>
          <el-form
              label-position="top"
              label-width="100px"
              :model="loginFormData"
              style="width: 100%;"
              size="large"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="loginFormData.email" placeholder="email"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginFormData.password" placeholder="password"/>
            </el-form-item>
            <el-button type="primary" :loading="true">登录</el-button>
          </el-form>
          <div class="forgot-password">
            <a>忘记您的密码？</a>
          </div>
        </main>
        <footer>
          使用其他方式登录
          <ul>
            <li>
              WeChat
            </li>
            <li>
              Google
            </li>
            <li>
              Twitter
            </li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .video-container {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
}

.video-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.login-container {
  width: 1140px;
  height: 690px;
  overflow: hidden;
  background-color: #FFFFFF;
  display: flex;
}

.login-container-desc, .login-container-main {
  width: 50%;
  height: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
}

.login-container-desc {
  background-color: #F2F2F2;

  header {
    font-size: 32px;
    font-family: 'LeagueGothicItalic', sans-serif;
    color: #333;
  }

  main {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 90px;
    font-weight: 900;

    span {
      padding: 0 10px;
    }

    img {
      width: 163px;
      height: 163px;
    }
  }

  footer {
    color: #666;
  }
}

.login-container-main {
  header {
    font-size: 32px;
  }

  main {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    margin-top: 10%;

    .el-button {
      margin-top: 36px;
      width: 60%;
      height: 64px;
    }

    .forgot-password {
      margin-top: 20px;
    }
  }

  footer {
    ul {
      display: flex;
      margin-top: 8px;

      li {
        flex: 1;
        height: 48px;
        border: rgba(0, 0, 0, 0.1) 1px solid;
        transition: all 0.35s;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 12px;
      }

      li:first-child {
        margin-left: 0;
      }

      li:hover {
        background-color: black;
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>
