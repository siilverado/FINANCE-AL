import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type ComplexType from '../types/Complex.type';

export interface complexDataType {
  complex: ComplexType | null;
  hasComplex: boolean | null;
}

const initialState: complexDataType = {
  complex: null,
  hasComplex: null,
};

const complexSlice = createSlice({
  name: 'complex',
  initialState,
  reducers: {
    setComplex: (state, { payload }: PayloadAction<ComplexType | null>) => {
      state.complex = payload;
      state.hasComplex = (payload && Object.keys(payload).length > 0) ?? false;
    },
  },
});

export const { setComplex } = complexSlice.actions;

export default complexSlice.reducer;
