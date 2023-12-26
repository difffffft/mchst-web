import service from "@/utils/request";


export const useLoginApi = (data) => {
    return service.post('/admin/user/login', data)
}

export const useSendCodeApi = (email) => {
    return service.get(`/admin/user/send/${email}`)
}

export const useRegisterApi = (data) => {
    return service.post(`/admin/user/register`, data)
}