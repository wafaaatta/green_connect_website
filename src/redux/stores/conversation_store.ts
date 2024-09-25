import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiError from "../../interfaces/ApiError";
import axiosHttp from "../../utils/axios_client";

interface Conversation {
    id: number;
    sender: string;
    receiver: string;
    message: string;
    created_at: string;
}

interface ConversationState {
    conversations: Conversation[];
}

export const getAllConversations = createAsyncThunk(
    'conversation/getAllConversations',
    async () => {
        try{
            const response = await axiosHttp.get('/conversations')
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
    }
});

export default conversationSlice.reducer;