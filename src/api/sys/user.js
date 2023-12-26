import service from "@/utils/request.js";

export const useUserInfoApi = () => {
    return service.get('/admin/user/info')
}