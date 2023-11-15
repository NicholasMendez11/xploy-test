import { Task, Id } from "@/types/types";
import { defaultTasks } from "@/utils/data";
import { generateId } from "@/utils/services";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: defaultTasks,
    reducers: {
      setTasks: (state, action: PayloadAction<Task[]>) => action.payload,
      createTask: (state, action: PayloadAction<Id>) => {
        const newTask: Task = {
          id: generateId(),
          columnId: action.payload,
          content: `Task ${state.length + 1}`,
        };
        state.push(newTask);
      },
      deleteTask: (state, action: PayloadAction<Id>) => state.filter((task) => task.id !== action.payload),
      updateTask: (state, action: PayloadAction<{id: Id, content: string}>) => state.map((task) => {
        if (task.id !== action.payload.id) return task;
        return { ...task, content: action.payload.content };
      }),
    },
  });

export default tasksSlice.reducer;