import { baseUrl } from "../constants/app_constants"

export const getFileUrl = (endpoint: string) => {
    return `${baseUrl}/${endpoint}`
}