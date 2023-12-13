<script setup>
import {AUTH_MODE} from "@/enums/index.js";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {validateEmail, validateRepassword} from "@/utils/validate.js";

const router = useRouter()


const submitStatus = ref(false)
const submitFormData = ref({
  username: '',
  email: '',
  password: '',
  repeatPassword: ''
})
const submitFormRules = ref({
  username: [{required: true, message: '昵称' + '不能为空', trigger: 'blur'}],
  email: [
    {required: true, message: '邮箱' + '不能为空', trigger: 'blur'},
    {required: true, validator: validateEmail, trigger: 'blur'},
  ],
  password: [{required: true, message: '密码' + '不能为空', trigger: 'blur'}],
  repeatPassword: [
    {required: true, message: '重复的密码' + '不能为空', trigger: 'blur'},
    {required: true, validator: validateRepassword.bind(submitFormData), trigger: 'blur'}
  ],
})

const onLogin = () => {
  router.push('/login')
}

const onSubmit = () => {

}
</script>

<template>
  <BaseAuth :mode="AUTH_MODE.REGISTER"
            :submit-status="submitStatus"
            :submit-form-data="submitFormData"
            :submit-form-rules="submitFormRules"
            @on-login="onLogin"
            @on-submit="onSubmit"
  ></BaseAuth>
</template>
