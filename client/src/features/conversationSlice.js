import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    conversation : null,
    conversationUser : null,
}

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState, 
    reducers : {
        setConversation : (state, action) => {
            state.conversation = action.payload
        },
       setConversationUser : (state, action) => {
            state.conversationUser = action.payload
        },
    }
})

export const { setConversation, setConversationUser} = conversationSlice.actions;
export const selectConversation = (state) => state.conversations.conversation;
export const selectConversationUser = (state) => state.conversations.conversationUser;


export default conversationSlice.reducer;