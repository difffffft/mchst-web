import {defineStore} from 'pinia'
import {ref} from "vue";
import Cookie from 'js-cookie'
import {AUTHORIZATION_NAME} from "@/constants/index.js";

export const useUserStore = defineStore('user', () => {
    /**
     * 用户基本信息
     * Basic User Information
     *
     * @type {Ref<UnwrapRef<{id: string, username: string}>>}
     */
    const userInfo = ref({
        /**
         * 用户唯一ID
         * USER_ID
         */
        id: '',
        /**
         * 用户昵称
         * USER_NAME
         */
        username: 'DIFFFFFFT'
    })


    /**
     * 用户验证
     * user authorization
     *
     * @type {Ref<UnwrapRef<string>>}
     */
    const authorization = ref(Cookie.get(AUTHORIZATION_NAME))


    /**
     * 获取用户信息
     * Get user information
     *
     * @returns {Promise<void>}
     */
    const getUserInfo = async () => {
        // throw new Error('')
    }


    /**
     * 退出登录，清空Cookie，清空userStore，reload页面
     * Logout, clear cookies, clear userStore, reload page
     *
     * @constructor
     */
    const logout = () => {
        Cookie.set(AUTHORIZATION_NAME, '')
        userInfo.value.id = ''
        authorization.value = ''
        window.location.reload()
    }

    return {userInfo, authorization, getUserInfo, logout}
})
