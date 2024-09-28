import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";
import Eventstate from "../../interfaces/states/EventState";

const initialState: Eventstate = {
    events: [],
    status_code: null,
    loading: false,
    error: null
}

export const getAllEvents = createAsyncThunk(
    'event/getAllEvents',
    async () => {
        try{
            const response = await axiosHttp.get('/events')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllEvents.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload
            })
            .addCase(getAllEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })
    }
})

export default eventSlice.reducer