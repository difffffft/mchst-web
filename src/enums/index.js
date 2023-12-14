import userAvatar from '@/assets/images/assets-images-avatar-user.jpg'
import assistantAvatar from '@/assets/images/assets-images-avatar-assistant.jpg'
import assistantAvatar2 from '@/assets/images/assets-images-logo.png'

export const AUTH_MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
    FORGOT: 'forgot'
}

export const AUTH_MODE_DESC = {
    login: '登录',
    register: '注册',
    forgot: '忘记密码'
}

export const OPENAI_ROLES = {
    USER: 'user',
    ASSISTANT: 'assistant'
}

export const OPENAI_ROLE_AVATAR = {
    user: userAvatar,
    assistant: assistantAvatar2
}