import User from "../User"

interface AuthState {
    isAuthenticated: boolean
    loading: boolean
    user: User | null
    error: string | null
    token: string | null
}

export default AuthState