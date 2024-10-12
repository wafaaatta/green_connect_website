import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthState from "../../interfaces/states/AuthState";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";
import { removeAuthenticationToken, saveAuthenticationToken } from "../../utils/authentication";

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
    token: null
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string, password: string }) => {
        try{
            saveAuthenticationToken('test-token')
            return {
                token: 'test-token',
                user: {
                    name: 'John Doe',
                    email: credentials.email,
                    id: 1,
                    created_at: '2020-01-01 00:00:00',
                }
            }
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials: { name: string, email: string, password: string }) => {
        try{
            const response = await axiosHttp.post('/users', credentials)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const validateToken = createAsyncThunk(
    'auth/validateToken',
    async () => {
        try{
            const response = await axiosHttp.get('/validate-token')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

interface UpdateUserPayload {
    id: number
    data: {
        name: string
        email: string
    }
}

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (payload: UpdateUserPayload) => {
        try{
            const response = await axiosHttp.post(`/users/${payload.id}?_method=PUT`, payload.data)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const mockupAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.token = null

            removeAuthenticationToken()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })

        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })

        builder
            .addCase(validateToken.pending, (state) => {
                state.loading = true
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload
                
            })
            .addCase(validateToken.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })
    }
})

export const { logoutUser } = mockupAuthSlice.actions
export default mockupAuthSlice.reducer