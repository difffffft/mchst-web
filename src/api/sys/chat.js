import service from "@/utils/request";
import {BASE_URL} from "@/constants/index.js";
import {useUserStore} from "@/stores/modules/userStore.js";


export const useChatApi = (formData) => {
    return service.post('/sys/chat/', formData)
}


export const useSendProApi = async (data) => {
    const url = BASE_URL + '/sys/chat/stream'
    const userStore = useUserStore()
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userStore.authorization
        },
        body: JSON.stringify({context_list: data})
    })
}
