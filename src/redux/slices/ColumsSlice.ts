import { Column, Id } from "@/types/types";
import { defaultCols } from "@/utils/data";
import { generateId } from "@/utils/services";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const columnsSlice = createSlice({
    name: 'columns',
    initialState: defaultCols,
    reducers: {
      setColumns: (state, action: PayloadAction<Column[]>) => action.payload,
      createNewColumn: (state) => {
        const columnToAdd: Column = {
          id: generateId(),
          title: `Column ${state.length + 1}`,
          color: "",
        };
        state.push(columnToAdd);
      },
      deleteColumn: (state, action: PayloadAction<Id>) => state.filter((col) => col.id !== action.payload),
      updateColumn: (state, action: PayloadAction<{id: Id, title: string}>) => state.map((col) => {
        if (col.id !== action.payload.id) return col;
        return { ...col, title: action.payload.title };
      }),
    },
  });

export default columnsSlice.reducer;