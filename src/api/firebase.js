import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config.js";

/**
 * Add a new asset to the user's Asset list in Firestore
 * @param {Name, Amount, assetType} formData
 */
export async function addAssetsData({ Name, Amount, assetType }) {
  const userDocRef = doc(db, "users", "testuser");
  const assetsCollectionRef = collection(userDocRef, "assets");
  return addDoc(assetsCollectionRef, {
    Name: Name,
    Amount: Amount,
    assetType: assetType,
  });
}

/**
 * Add a new asset to the user's Debt list in Firestore
 * @param {Name, Amount, debtType, debtApr} formData
 */
export async function addDebtData({ Name, Amount, debtType, debtApr }) {
  const userDocRef = doc(db, "users", "testuser");
  const debtCollectionRef = collection(userDocRef, "debt");
  return addDoc(debtCollectionRef, {
    Name: Name,
    Amount: Amount,
    debtType: debtType,
    debtApr: debtApr,
  });
}
/**
 * Add a new asset to the user's Goals list in Firestore
 * @param {Name, Amount, Due} formData
 */
export async function addGoalsData({ Name, Amount, Due }) {
  const userDocRef = doc(db, "users", "testuser");
  const assetsCollectionRef = collection(userDocRef, "goals");
  return addDoc(assetsCollectionRef, {
    Name: Name,
    Amount: Amount,
    Due: Due,
  });
}

/** Get Data from user's list in Firestore
 * @param {collectionName} === "assets", "debts"
 */
export async function getData(collectionName) {
  const collectionRef = collection(db, "users", "testuser", collectionName);
  const querySnapshot = await getDocs(collectionRef);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return data;
}

export const deleteData = async (id, collectionName) => {
  try {
    // delete data from firebase
    const docRef = doc(db, "users", "testuser", collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting asset:", error);
  }
};

export const updateAssetData = async (id, newData) => {
  try {
    const docRef = doc(db, "users", "testuser", "assets", id);
    //update the existing row with new data
    return updateDoc(docRef, {
      Name: newData.Name,
      Amount: newData.Amount,
      assetType: newData.assetType,
    });
  } catch (error) {
    console.error("Error updating asset:", error);
  }
}

export const updateDebtData = async (id, newData) => {
  try {
    const docRef = doc(db, "users", "testuser", "debt", id);
    //update the existing row with new data
    return updateDoc(docRef, {
      Name: newData.Name,
      Amount: newData.Amount,
      debtType: newData.debtType,
      debtApr: newData.debtApr,
    });
  } catch (error) {
    console.error("Error updating debt:", error);
  }
}