import { AssetsFormType } from '../../state/types'

export const calculateAssetTotal = (data:AssetsFormType[]) => data.reduce((acc, item)=> acc+item.assetAmount,0)

// Email format validation
export const isValidEmail = (email:string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email)
}