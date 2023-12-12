import {defineStore} from 'pinia'
import {ref} from "vue";

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
        username: ''
    })


    /**
     * 用户验证
     * user authorization
     *
     * @type {Ref<UnwrapRef<string>>}
     */
    const authorization = ref("")


    /**
     * 获取用户信息
     * Get user information
     *
     * @returns {Promise<void>}
     */
    const getUserInfo = async () => {

    }

    return {userInfo, authorization, getUserInfo}
})
