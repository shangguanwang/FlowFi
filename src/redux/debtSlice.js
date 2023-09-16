import { createSlice } from "@reduxjs/toolkit";

const debtSlice = createSlice({
    name:'debt',
    initialState: [],
    reducers: {
        setDebtData: (state, action)=>{
            return action.payload;
        }
    }
})

export const {setDebtData} = debtSlice.actions;
export default debtSlice.reducer;