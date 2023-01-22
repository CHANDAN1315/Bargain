import { fetchCart, fetchuser } from "../utils/fetchDataLocaStorage"

const userInfo = fetchuser()
const cartInfo = fetchCart()

export const intialState = {
    user : userInfo,
    fashionItems: null,
    cartShow: false,
    cartItems: cartInfo,
};