import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v1 as uuid} from 'uuid'; 
import _ from 'lodash';

const categoryAdapter = createEntityAdapter();

export const categorySlice = createSlice({
  name: 'category',
  initialState: categoryAdapter.getInitialState(),
  reducers: {
    addCategory: (state, action) => {
      let {name, id} = action.payload;
      id = id ? id : uuid();
      categoryAdapter.upsertOne(state, {name, id});
    },
    removeCategory: (state, action) => {
       categoryAdapter.removeOne(state, action.payload);
    },
  },
});

export const { addCategory, removeCategory } = categorySlice.actions;

export const { 
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectAll: selectAllCategorys,
  selectTotal: selectTotalCategorys } = categoryAdapter.getSelectors(state => state.category);

export default categorySlice.reducer;
