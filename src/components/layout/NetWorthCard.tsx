import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { calcAmountTotal } from '../../components/functions/functions';
import { AssetsFormType, DebtFormType } from '../../state/types';
import { Card, CardContent, Typography } from '@mui/material';

const NetWorthCard = () => {
    const assetsData = useSelector((store: RootState)=>store.assets);
    const totalAssets = calcAmountTotal<AssetsFormType>(assetsData);
    const debtData = useSelector((store: RootState)=>store.debt);
    const totalDebt = calcAmountTotal<DebtFormType>(debtData);
    const networth = totalAssets - totalDebt;
    const debtAssetRatio = Math.round(totalDebt/totalAssets*100);
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
            <Typography variant="h6" color="text.secondary">
                Net Worth
            </Typography>
            <Typography variant="h5">
             ${networth}
            </Typography>
            <Typography variant="h6">
              <span style={{ fontSize: '18px', color: 'grey' }}>Assets:</span> ${totalAssets}  <span style={{ fontSize: '18px', color: 'grey' }}>Debt:</span> ${totalDebt}
            </Typography>
            <Typography variant="h6">
            <span style={{ fontSize: '18px', color: 'grey' }}>Debt-to-Asset Ratio</span> {debtAssetRatio}%
            </Typography>
            </CardContent>
        </Card>
      )
}

export default NetWorthCard