import React from 'react';

export const Store = React.createContext();

const initialState = {
  posts: [],
  count: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, posts: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
