import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import ApiInterface from "../../interfaces/ApiInterface";
import Message from "../../interfaces/Message";
import axiosHttp from "../../utils/axios_client";

interface MessageState extends ApiInterface{
    messages: Message[];
    currentMessage: Message | null;
}

const initialState: MessageState = {
    messages: [],
    currentMessage: null,
    loading: false,
    error: null,
    status_code: null
};

export const getConversationMessages = createAsyncThunk(
    'message/getConversationMessages',
    async (conversationId: number) => {
        try{
            const response = await axiosHttp.get(`/conversations/${conversationId}/messages`)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createMessage = createAsyncThunk(
    'message/createMessage',
    async (message: Message) => {
        try{
            const response = await axiosHttp.post('/messages', message)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        pushMessage: (state, action) => {
            state.messages.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversationMessages.pending, (state) => {
                state.loading = true
            })
            .addCase(getConversationMessages.fulfilled, (state, action) => {
                state.loading = false
                state.messages = action.payload
            })
            .addCase(getConversationMessages.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })


            .addCase(createMessage.pending, (state) => {
                state.loading = true
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.loading = false
                state.messages.push(action.payload)
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Something went wrong'
            })
    }
});

export const { pushMessage } = messageSlice.actions
export default messageSlice.reducer;