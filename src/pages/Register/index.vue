<script setup>
import {AUTH_MODE} from "@/enums/index.js";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {validateEmail, validateRepassword} from "@/utils/validate.js";
import {ElMessage} from "element-plus";
import {useLoginApi, useRegisterApi, useSendCodeApi} from "@/api/sys/auth.js";

const router = useRouter()


const submitStatus = ref(false)
const submitFormData = ref({
  nickName: '',
  email: '',
  verifyCode: '',
  password: '',
  repeatPassword: ''
})
const submitFormRules = ref({
  nickName: [{required: true, message: '昵称' + '不能为空', trigger: 'blur'}],
  email: [
    {required: true, message: '邮箱' + '不能为空', trigger: 'blur'},
    {required: true, validator: validateEmail, trigger: 'blur'},
  ],
  verifyCode: [{required: true, message: '验证码' + '不能为空'}],
  password: [{required: true, message: '密码' + '不能为空', trigger: 'blur'}],
  repeatPassword: [
    {required: true, message: '重复的密码' + '不能为空', trigger: 'blur'},
    {required: true, validator: validateRepassword.bind(submitFormData), trigger: 'blur'}
  ],
})

const onLogin = () => {
  router.push('/login')
}


const codeCount = ref(0)
const onSendCode = async () => {
  if (!submitFormData.value.email) {
    ElMessage.warning("请填写正确的验证码！")
    return
  }
  try {
    const {data} = await useSendCodeApi(submitFormData.value.email)
    ElMessage.success("验证码已发送")
    codeCount.value = 60
    const _interval = {value: null}
    _interval.value = setInterval(() => {
      if (codeCount.value <= 0) {
        clearInterval(_interval.value)
      }
      codeCount.value--
    }, 1000)
  } catch (e) {

  } finally {

  }
}
const onSubmit = async () => {
  submitStatus.value = true
  try {
    await useRegisterApi(submitFormData.value)
    ElMessage.success("注册成功！")
    onLogin()
  } catch (e) {

  } finally {
    submitStatus.value = false
  }
}
</script>

<template>
  <BaseAuth :mode="AUTH_MODE.REGISTER"
            :submit-status="submitStatus"
            :submit-form-data="submitFormData"
            :submit-form-rules="submitFormRules"
            :code-count="codeCount"
            @on-login="onLogin"
            @on-submit="onSubmit"
            @on-send-code="onSendCode"
  ></BaseAuth>
</template>
