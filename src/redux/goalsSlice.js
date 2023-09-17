import { createSlice } from "@reduxjs/toolkit";

const goalsSlice = createSlice({
    name:'goals',
    initialState: [],
    reducers: {
        setGoalsData: (state, action)=>{
            return action.payload;
        }
    }
})

export const {setGoalsData} = goalsSlice.actions;
export default goalsSlice.reducer;