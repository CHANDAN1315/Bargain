import {collection, doc, getDocs, orderBy, query, setDoc} from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem = async (data) =>{
    await setDoc(doc(firestore, 'fashionItems', `${Date.now()}`),data, {
        merge: true,

    });
};

//getall fashion items
// its working fine no check needed
export const getAllFashionItems = async () =>{
    const items = await getDocs(
        query(collection(firestore,"fashionItems"), orderBy("id", "desc"))
    );

    // console.log(items)
    return items.docs.map((doc) => doc.data());
}
