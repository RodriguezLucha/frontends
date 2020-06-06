import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v1 as uuid} from 'uuid'; 
import _ from 'lodash';

const cardAdapter = createEntityAdapter();

export const cardSlice = createSlice({
  name: 'card',
  initialState: cardAdapter.getInitialState(),
  reducers: {
    addCard: (state, action) => {
      let {front, back} = action.payload;
      let id = uuid();
      let active = true;
      cardAdapter.upsertOne(state, {front, back, id, active});
    },
    removeCard: (state, action) => {
       cardAdapter.removeOne(state, action.payload);
    },
    shuffleCards: (state, action) => {
      state.ids = _.shuffle(state.ids);
    },
    deactivateCard: (state, action) => {
      state.entities[action.payload].active = false; 
    },
    activateCard: (state, action) => {
      state.entities[action.payload].active = true; 
    }
  },
});

export const { addCard, removeCard, shuffleCards, deactivateCard, activateCard } = cardSlice.actions;

export const { 
  selectById: selectCardById,
  selectIds: selectCardIds,
  selectEntities: selectCardEntities,
  selectAll: selectAllCards,
  selectTotal: selectTotalCards } = cardAdapter.getSelectors(state => state.card);

export default cardSlice.reducer;
