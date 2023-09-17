import { DebtFormType, GoalFormType } from '../../state/types'

// Calculation Functions
interface TotalableItem {
    Amount: number;
}
export const calcAmountTotal = <Ttl extends TotalableItem>(data: Ttl[]) => data.reduce((acc,item)=> acc+item.Amount,0);

export const calcSavedTotal = (data:GoalFormType[]) => data.reduce((acc,item)=> acc+item.Saved,0);

export const calcMonthlyIntTotal = (data:DebtFormType[])=>Number(data.reduce((acc,item)=>acc+(item.Amount*(item.debtApr/1200)),0).toFixed(1));

export const calcGoalsPct = (data:GoalFormType[])=> Number(data.reduce((acc,itm)=> acc + (itm.Saved/itm.Amount)*100, 0).toFixed(1));

// Email format validation
export const isValidEmail = (email:string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email)
}