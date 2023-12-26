import service from "@/utils/request";
import {AUTHORIZATION_NAME, BASE_URL} from "@/constants/index.js";
import {useUserStore} from "@/stores/modules/userStore.js";


export const useChatApi = (formData) => {
    return service.post('/sys/chat/', formData)
}


export const useSendProApi = async (data) => {
    // const url = 'http://43.143.249.23:8080/sys/chat/stream'
    // const url = 'http://localhost:8080/chat/stream'
    const url = 'http://193.200.134.12:8080/chat/stream'
    const userStore = useUserStore()
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [AUTHORIZATION_NAME]: userStore.authorization
        },
        body: JSON.stringify(data)
    })
}
