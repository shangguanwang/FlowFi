import { AssetsFormType } from '../../state/types'

export const calculateAssetTotal = (data:AssetsFormType[]) => data.reduce((acc, item)=> acc+item.assetAmount,0)