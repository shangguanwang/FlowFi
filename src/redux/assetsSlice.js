import { createSlice } from "@reduxjs/toolkit";

const assetsSlice = createSlice({
    name:'assets',
    initialState: [],
    reducers: {
        setAssetsData: (state, action)=>{
            return action.payload;
        }
    }
})

export const {setAssetsData} = assetsSlice.actions;
export default assetsSlice.reducer;