import service from "@/utils/request";


export const useChatApi = (formData) => {
    return service.post('/sys/chat/', formData)
}