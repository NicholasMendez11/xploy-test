
import { Task } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const activeTaskSlice = createSlice({
    name: 'activeTask',
    initialState: null as Task | null,
    reducers: {
      setActiveTask: (state, action: PayloadAction<Task | null>) => action.payload,
    },
  });

export default activeTaskSlice.reducer;