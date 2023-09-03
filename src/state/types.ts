// Defind a rooteState for Redux
export interface RootState {
  auth: {
    isLoggedIn: boolean;
  };
}

// Define an interface for the assetFormData object
export interface AssetsFormType {
    assetName: string;
    assetAmount: number;
    assetType: string;
  }

  // user info
export interface userInfoType {
  email: string;
  password: string;
}