<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import BaseAuth from "@/components/BaseAuth/index.vue";
import {AUTH_MODE} from "@/enums/index.js";
import {validateEmail, validateRepassword} from "@/utils/validate.js";

const router = useRouter()

const submitStatus = ref(false)
const submitFormData = ref({
  code: '',
  email: '',
  password: '',
  repeatPassword: ''
})
const submitFormRules = ref({
  email: [
    {required: true, message: '邮箱' + '不能为空', trigger: 'blur'},
    {required: true, validator: validateEmail, trigger: 'blur'}
  ],
  code: [{required: true, message: '验证码' + '不能为空'}],
  password: [{required: true, message: '密码' + '不能为空', trigger: 'blur'}],
  repeatPassword: [
    {required: true, message: '重复的密码' + '不能为空', trigger: 'blur'},
    {required: true, validator: validateRepassword.bind(submitFormData), trigger: 'blur'}
  ],
})

const onForgot = () => {
  console.log("/forgot")
}
const onRegister = () => {
  router.push('/register')
}


const codeCount = ref(0)
const onSendCode = () => {
  codeCount.value = 60

  const _interval = {value: null}
  _interval.value = setInterval(() => {
    if (codeCount.value <= 0) {
      clearInterval(_interval.value)
    }
    codeCount.value--
  }, 1000)
}
const onSubmit = () => {

}
</script>

<template>
  <BaseAuth
      :mode="AUTH_MODE.FORGOT"
      :submit-status="submitStatus"
      :submit-form-data="submitFormData"
      :submit-form-rules="submitFormRules"
      :code-count="codeCount"
      @on-register="onRegister"
      @on-submit="onSubmit"
      @on-send-code="onSendCode"
  ></BaseAuth>
</template>
