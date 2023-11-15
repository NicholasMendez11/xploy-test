import { Column } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const activeColumnSlice = createSlice({
    name: 'activeColumn',
    initialState: null as Column | null,
    reducers: {
      setActiveColumn: (state, action: PayloadAction<Column | null>) => action.payload,
    },
  });

export default activeColumnSlice.reducer;