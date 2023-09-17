// Defind a rooteState for Redux
export interface RootState {
  auth: {
    isLoggedIn: boolean;
  };
}

// Define an interface for the data grid columns
import { GridCellParams, GridRowParams} from '@mui/x-data-grid';
export interface DatagridColumnType{
  field:string;
  headerName:string;
  width: number;
  renderCell?:(params:GridCellParams)=>string;
  type?: string;
  getActions?: (params: GridRowParams) => JSX.Element[];
}

// interface for the assetFormData object
export interface AssetsFormType {
    id?:string;
    Name: string;
    Amount: number;
    assetType: string;
  }
// interface for the debtFormData object
export interface DebtFormType {
  id?:string;
  Name: string;
  Amount: number;
  debtType: string;
  debtApr: number;
}

  // user info
export interface userInfoType {
  email: string;
  password: string;
}