import { AssetsFormType, DebtFormType } from '../../state/types'

export const calculateAssetTotal = (data:AssetsFormType[]) => data.reduce((acc, item)=> acc+item.Amount,0);

export const calculateDebtTotal = (data:DebtFormType[]) => data.reduce((acc,item)=> acc+item.Amount,0);

export const calcMonthlyIntTotal = (data:DebtFormType[])=>Number(data.reduce((acc,item)=>acc+(item.Amount*(item.debtApr/1200)),0).toFixed(2));

// Email format validation
export const isValidEmail = (email:string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email)
}