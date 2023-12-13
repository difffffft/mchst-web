<script setup>
import {AUTH_MODE, AUTH_MODE_DESC} from "@/enums/index.js";
import {ref} from "vue";

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: () => AUTH_MODE.LOGIN
  },
  codeCount: {
    type: Number,
    required: false,
    default: () => 0
  },
  submitStatus: {
    type: Boolean,
    required: false,
    default: () => false
  },
  submitFormData: {
    type: Object,
    required: true,
  },
  submitFormRules: {
    type: Object,
    required: true,
  }
})
const emits = defineEmits(['onRegister', 'onLogin', 'onForgot', 'onSubmit', 'onSendCode'])


const count = ref(0)
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
          {{
            mode === AUTH_MODE.LOGIN || mode === AUTH_MODE.FORGOT ? '没有账号' : mode === AUTH_MODE.REGISTER ? '已有账号' : ''
          }}？
          <a @click.stop="mode === AUTH_MODE.LOGIN || mode === AUTH_MODE.FORGOT ? emits('onRegister') : mode === AUTH_MODE.REGISTER ? emits('onLogin') : ''">现在{{
              mode === AUTH_MODE.LOGIN || mode === AUTH_MODE.FORGOT ? '注册' : mode === AUTH_MODE.REGISTER ? '登录' : ''
            }}</a>
        </footer>
      </div>
      <div class="login-container-main">
        <header>
          {{ AUTH_MODE_DESC[mode] }}
        </header>
        <main>
          <el-form
              label-position="top"
              label-width="100px"
              :model="submitFormData"
              :rules="submitFormRules"
              style="width: 100%;"
              size="large"
          >
            <template v-if="mode === AUTH_MODE.LOGIN">
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model.trim="submitFormData.email" placeholder="email" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model.trim="submitFormData.password" placeholder="password"
                          autocomplete="off">
                </el-input>
              </el-form-item>
            </template>
            <template v-if="mode === AUTH_MODE.REGISTER">
              <el-form-item label="昵称" prop="username">
                <el-input v-model.trim="submitFormData.username" placeholder="username" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model.trim="submitFormData.email" placeholder="email" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model.trim="submitFormData.password" placeholder="password"
                          autocomplete="off">
                </el-input>
              </el-form-item>
              <el-form-item label="重复密码" prop="repeatPassword">
                <el-input type="password" v-model.trim="submitFormData.repeatPassword" placeholder="password"
                          autocomplete="off">
                </el-input>
              </el-form-item>
            </template>
            <template v-if="mode === AUTH_MODE.FORGOT">
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model.trim="submitFormData.email" placeholder="email" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <div class="row">
                  <el-input class="code-input" v-model.trim="submitFormData.code" placeholder="code" autocomplete="off"
                            style="flex: 1"/>
                  <el-button @click="emits('onSendCode')" :disabled="codeCount > 0">获取验证码<span
                      v-show="codeCount > 0" class="count">({{ codeCount }}s)</span>
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item label="新密码" prop="password">
                <el-input v-model.trim="submitFormData.password" placeholder="password" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="重复密码" prop="repeatPassword">
                <el-input v-model.trim="submitFormData.repeatPassword" placeholder="password" autocomplete="off"/>
              </el-form-item>
            </template>
            <el-button class="submit" type="primary" :loading="submitStatus" @click="emits('onSubmit')">
              {{ AUTH_MODE_DESC[mode] }}
            </el-button>
          </el-form>
          <div class="forgot-password" v-if="mode === AUTH_MODE.LOGIN">
            <a @click.stop="emits('onForgot')">忘记您的密码？</a>
          </div>
        </main>
        <footer v-if="mode === AUTH_MODE.LOGIN">
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
.row {
  width: 100%;
  display: flex;
}

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

    .submit {
      margin-top: 36px;
      width: 50%;
      height: 64px;
    }

    .forgot-password {
      margin-top: 20px;
    }

    .code-input {
      margin-right: 20px;
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


@media screen and (max-width: $m-mobile-width) {

  .login {
    justify-content: flex-start;
    align-items: flex-start;
    overflow: auto;
  }

  .video-container, .video-mask {
    display: none;
  }

  .login-container {
    width: 100%;
    height: auto;
    overflow: auto;
    flex-direction: column;
  }

  .login-container-desc, .login-container-main {
    width: 100%;
    height: auto;
  }

  .login-container-desc{
    height: 500px;
  }
}
</style>
