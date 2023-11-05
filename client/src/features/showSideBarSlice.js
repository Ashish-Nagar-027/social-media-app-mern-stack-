import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showSideBar : false,
}

export const showSideBarSlice = createSlice({
    name: 'showSideBar',
    initialState, 
    reducers : {
        toggleSideBar : (state) => {
            state.showSideBar = !state.showSideBar
        },
    }
})

export const { toggleSideBar} = showSideBarSlice.actions;
export const showSideBar = (state) => state.showSideBar.showSideBar

export default showSideBarSlice.reducer;