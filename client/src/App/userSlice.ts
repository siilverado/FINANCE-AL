import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type User from '../types/User.type';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
