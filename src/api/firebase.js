import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./config.js";

/**
 * Add a new asset to the user's list in Firestore
 * @param {assetName, assetAmount, assetType} formData
 */
export async function addData({ assetName, assetAmount, assetType }) {
  const collectionRef = collection(db, "users");
  return addDoc(collectionRef, {
    dateCreated: new Date(),
    assetName: assetName,
    assetAmount: assetAmount,
    assetType: assetType,
  });
}
/** Get Data from user's list in Firestore
 * @returns {[{assetName, assetAmount, assetType, id},...]}
 */
export async function getData() {
  const collectionRef = collection(db, "users");
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
