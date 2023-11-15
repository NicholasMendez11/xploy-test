import { Column, Task } from "@/types/types";

export const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Todo",
    color: "#49C3E5",
  },
  {
    id: "doing",
    title: "Work in progress",
    color: "#8471F2",
  },
  {
    id: "done",
    title: "Done",
    color: "#67E2AE",
  },
];

export const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "todo",
    content: "This is an example task",
  },
  
];