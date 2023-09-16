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
 * @param {assetName, assetAmount, assetType} formData
 */
export async function addAssetsData({ assetName, assetAmount, assetType }) {
  const userDocRef = doc(db, "users", "testuser");
  const assetsCollectionRef = collection(userDocRef, "assets");
  return addDoc(assetsCollectionRef, {
    assetName: assetName,
    assetAmount: assetAmount,
    assetType: assetType,
  });
}

/**
 * Add a new asset to the user's Debt list in Firestore
 * @param {debtName, debtAmount, debtType, debtApr} formData
 */
export async function addDebtData({ debtName, debtAmount, debtType, debtApr }) {
  const userDocRef = doc(db, "users", "testuser");
  const debtCollectionRef = collection(userDocRef, "debt");
  return addDoc(debtCollectionRef, {
    debtName: debtName,
    debtAmount: debtAmount,
    debtType: debtType,
    debtApr: debtApr,
  });
}

/** Get Data from user's list in Firestore
 * @param {collectionName} === "assets", "debts"
 * @returns {[{assetName, assetAmount, assetType, id},...]}
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
      assetName: newData.assetName,
      assetAmount: newData.assetAmount,
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
      debtName: newData.debtName,
      debtAmount: newData.debtAmount,
      debtType: newData.debtType,
      debtApr: newData.debtApr,
    });
  } catch (error) {
    console.error("Error updating debt:", error);
  }
}