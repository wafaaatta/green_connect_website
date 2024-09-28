import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";
import AnnounceState from "../../interfaces/states/announce_state";

const initialState: AnnounceState = {
    announces: [],
    status_code: null,
    loading: false,
    error: null,
    currentAnnounce: null
}

export const getAllAnnounces = createAsyncThunk(
    'announce/getAllAnnounces',
    async (size?: number) => {
        try{
            const response = await axiosHttp.get('/announces/accepted', {
                params: {
                    size
                }
            })
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)


export const createAnnounce = createAsyncThunk(
    'announce/createAnnounce',
    async (announce: FormData) => {
        try{
            const response = await axiosHttp.post('/announces', announce)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const getUserAnnounces = createAsyncThunk(
    'announce/getUserAnnounces',
    async () => {
        try{
            const response = await axiosHttp.get('/user/announces')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const deleteAnnounce = createAsyncThunk(
    'announce/deleteAnnounce',
    async (id: number) => {
        try{
            await axiosHttp.delete(`announces/${id}`)
            return {id}
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

interface UpdateAnnouncePayload {
    id: number
    data: FormData
}

export const updateAnnounce = createAsyncThunk(
    'announce/updateAnnounce',
    async (payload: UpdateAnnouncePayload) => {
        try{
            const response = await axiosHttp.post(`announces/${payload.id}?_method=PUT`, payload.data)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const announceSlice = createSlice({
    name: 'announce',
    initialState,
    reducers: {
        setCurrentAnnounce: (state, action) => {
            state.currentAnnounce = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAnnounces.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllAnnounces.fulfilled, (state, action) => {
                state.loading = false
                state.announces = action.payload
            })
            .addCase(getAllAnnounces.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(createAnnounce.pending, (state) => {
                state.loading = true
            })
            .addCase(createAnnounce.fulfilled, (state, action) => {
                state.loading = false
                state.announces.unshift(action.payload)
            })
            .addCase(createAnnounce.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(getUserAnnounces.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserAnnounces.fulfilled, (state, action) => {
                state.loading = false
                state.announces = action.payload
            })
            .addCase(getUserAnnounces.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(deleteAnnounce.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteAnnounce.fulfilled, (state, action) => {
                state.loading = false
                state.announces = state.announces.filter((announce) => announce.id !== action.payload.id)
            })
            .addCase(deleteAnnounce.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(updateAnnounce.pending, (state) => {
                state.loading = true
            })
            .addCase(updateAnnounce.fulfilled, (state, action) => {
                state.loading = false
                state.announces = state.announces.map((announce) => {
                    if (announce.id === action.payload.id) {
                        return action.payload
                    }
                    return announce
                })
            })
            .addCase(updateAnnounce.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })
    }
})

export const { setCurrentAnnounce } = announceSlice.actions
export default announceSlice.reducer