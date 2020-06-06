import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v1 as uuid} from 'uuid'; 

const cardAdapter = createEntityAdapter();

export const cardSlice = createSlice({
  name: 'card',
  initialState: cardAdapter.getInitialState(),
  reducers: {
    addCard: (state, action) => {
      let {front, back} = action.payload;
      let id = uuid();
      cardAdapter.upsertOne(state, {front, back, id});
    },
    removeCard: (state, action) => {
       cardAdapter.removeOne(state, action.payload);
    }
  },
});

export const { addCard, removeCard } = cardSlice.actions;

export const { 
  selectById: selectCardById,
  selectIds: selectCardIds,
  selectEntities: selectCardEntities,
  selectAll: selectAllCards,
  selectTotal: selectTotalCards } = cardAdapter.getSelectors(state => state.card);

export default cardSlice.reducer;
