import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1,
  cheese: 0.8
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
  };
  const updateIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
    ingredients: updateIngredients,
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
  };
  const updateIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
    ingredients: updateIngs,
    building: true
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
