import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERRORS,
} from '../constants/productsConstants'

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST: 
      return {loading: true, products: [], error: '' }
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false, 
        products: action.payload.products, 
        productsCount: action.payload.productsCount, 
        error: '' }
    case ALL_PRODUCT_FAIL:
      return {
        loading: false, 
        products: [], 
        productsCount: '', 
        error: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state, 
        error: null }
    default:  
      return state
  }
}
