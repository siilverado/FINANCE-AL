import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface sportInfo {
  name: string;
  types: string[];
  image: string;
}
export interface sportType {
  sport: sportInfo[] | null;
}

const initialState: sportType = {
  sport: null,
};

const sportSlice = createSlice({
  name: 'sport',
  initialState,
  reducers: {
    setSport: (state, { payload }: PayloadAction<sportInfo[] | null>) => {
      state.sport = payload;
    },
  },
});

export const { setSport } = sportSlice.actions;

export default sportSlice.reducer;
