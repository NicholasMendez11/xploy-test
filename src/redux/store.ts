import { configureStore } from "@reduxjs/toolkit";
import columnsReducer from "./slices/ColumsSlice";
import tasksReducer from "./slices/TasksSlice";
import activeColumnReducer from "./slices/ActiveColumnSlice";
import activeTaskReducer from "./slices/ActiveTaskSlice";

export const store = configureStore({
  reducer: {
    columns: columnsReducer,
    tasks: tasksReducer,
    activeColumn: activeColumnReducer,
    activeTask: activeTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
