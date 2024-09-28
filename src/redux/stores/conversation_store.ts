import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";
import Conversation from "../../interfaces/Conversation";


interface ConversationState {
    conversations: Conversation[];
}

export const getAllConversations = createAsyncThunk(
    'conversation/getAllConversations',
    async () => {
        try{
            const response = await axiosHttp.get('/user/conversations')
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

export const createConversation = createAsyncThunk(
    'conversation/createConversation',
    async (conversation: {
        receiver_id: number,
        announce_id: number
    }) => {
        try{
            const response = await axiosHttp.post('/conversations', conversation)
            return response.data
        }catch(error){
            throw ApiError.from(error as AxiosError)
        }
    }
)

const initialState: ConversationState = {
    conversations: [],
};

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllConversations.fulfilled, (state, action) => {
            state.conversations = action.payload
        })
        .addCase(getAllConversations.rejected, (state, action) => {
            state.conversations = []
        })
        .addCase(getAllConversations.pending, (state) => {
            state.conversations = []
        })

        .addCase(createConversation.fulfilled, (state, action) => {
            state.conversations.push(action.payload)
        })
        .addCase(createConversation.rejected, (state, action) => {
            state.conversations = []
        })
        .addCase(createConversation.pending, (state) => {
            state.conversations = []
        })
    }
});

export default conversationSlice.reducer;