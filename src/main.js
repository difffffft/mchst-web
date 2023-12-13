/**
 * 基础依赖
 * basic dependency
 */
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import ElementPlusIcons from '@/utils/elementPlusIcons'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

/**
 * 项目相关
 * Project Related
 */
import '@/styles/common/index.scss'
import '@/styles/pc/index.scss'
import '@/styles/mobile/index.scss'
import App from './App.vue'
import router from './router'
import pinia from "@/stores"

import BaseAuth from '@/components/BaseAuth/index.vue'

import '@/permission'


const app = createApp(App)

app.component('BaseAuth', BaseAuth)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.use(ElementPlusIcons)

app.mount('#app')
