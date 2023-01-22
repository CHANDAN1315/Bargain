export const actionType = {
    SET_USER: 'SET_USER',
    SET_FASHION_ITEMS: 'SET_FASHION_ITEMS',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CARTITEMS: 'SET_CARTITEMS'
};
// it is reducer function for useReducer hook. 
const reducer = (state, action) => {
    // console.log(action.fashionItems);

    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_FASHION_ITEMS:
            return {
                ...state,
                fashionItems: action.fashionItems,
            };
        case actionType.SET_CART_SHOW:
            return {
                ...state,
                cartShow: action.cartShow,
            };
        case actionType.SET_CARTITEMS:
            return {
                ...state,
                cartItems: action.cartItems,
            };

        default:
            return state;
    }
};
export default reducer