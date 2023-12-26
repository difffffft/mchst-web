<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import BaseAuth from "@/components/BaseAuth/index.vue";
import {AUTH_MODE} from "@/enums/index.js";
import {validateEmail} from "@/utils/validate.js";
import Cookie from "js-cookie";
import {AUTHORIZATION_NAME} from "@/constants/index.js";
import {useUserStore} from "@/stores/modules/userStore.js";
import {useLoginApi} from "@/api/sys/auth.js";

const router = useRouter()

const submitStatus = ref(false)
const submitFormData = ref({
  email: '',
  password: '',
})
const submitFormRules = ref({
  email: [
    {required: true, message: '邮箱' + '不能为空', trigger: 'blur'},
    {required: true, validator: validateEmail, trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码' + '不能为空', trigger: 'blur'},
  ],
})

const onForgot = () => {
  router.push('/forgot')
}
const onRegister = () => {
  router.push('/register')
}
const onSubmit = async () => {
  submitStatus.value = true
  const userStore = useUserStore()
  try {
    const { data } = await useLoginApi(submitFormData.value)
    Cookie.set(AUTHORIZATION_NAME, data)
    userStore.authorization = Cookie.get(AUTHORIZATION_NAME)
    await router.push('/')
  } catch (e) {

  } finally {
    submitStatus.value = false
  }
}
</script>

<template>
  <BaseAuth
      :mode="AUTH_MODE.LOGIN"
      :submit-status="submitStatus"
      :submit-form-data="submitFormData"
      :submit-form-rules="submitFormRules"
      @on-forgot="onForgot"
      @on-register="onRegister"
      @on-submit="onSubmit"
  ></BaseAuth>
</template>
