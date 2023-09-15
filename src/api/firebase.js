import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./config.js";

/**
 * Add a new asset to the user's list in Firestore
 * @param {assetName, assetAmount, assetType} formData
 */
export async function addAssetsData({ assetName, assetAmount, assetType }) {
  const userDocRef = doc(db, "users", "testuser");
  const assetsCollectionRef = collection(userDocRef, "assets");
  return addDoc(assetsCollectionRef, {
    dateCreated: new Date(),
    assetName: assetName,
    assetAmount: assetAmount,
    assetType: assetType,
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

export const editData = async (id, collectionName, newData) => {
  try {
    const docRef = doc(db, "users", "testuser", collectionName, id);
    await setDoc(docRef, newData, {merge:true}); //update the existing row with new data
  } catch (error) {
    console.error("Error updating asset:", error);
  }
}