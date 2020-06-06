import { configureStore } from '@reduxjs/toolkit';
import card from '../features/card/cardSlice';
import throttle from 'lodash/throttle';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch(err) {
    console.log(err);
  }
};


const persistedStore = loadState();

let store = configureStore({
  reducer: {
    card
  },
  preloadedState: persistedStore,
});

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));
 
export default store;