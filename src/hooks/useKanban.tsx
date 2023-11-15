import { activeColumnSlice } from "@/redux/slices/ActiveColumnSlice";
import { activeTaskSlice } from "@/redux/slices/ActiveTaskSlice";
import { columnsSlice } from "@/redux/slices/ColumsSlice";
import { tasksSlice } from "@/redux/slices/TasksSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Column, Id, Task } from "@/types/types";

import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function useKanban() {
  const dispatch = useDispatch<AppDispatch>();

  const columns = useSelector((state: RootState) => state.columns);
  const tasks = useSelector((state: RootState) => state.tasks);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]); //?

  const activeColumn = useSelector((state: RootState) => state.activeColumn);

  const activeTask = useSelector((state: RootState) => state.activeTask);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function createTask(columnId: Id) {
    dispatch(tasksSlice.actions.createTask(columnId));
  }

  function deleteTask(taskId: Id) {
    dispatch(tasksSlice.actions.deleteTask(taskId));
  }

  function updateTask(id: Id, content: string) {
    dispatch(tasksSlice.actions.updateTask({ id, content }));
  }

  function createNewColumn() {
    dispatch(columnsSlice.actions.createNewColumn());
  }
  function deleteColumn(columnId: Id) {
    dispatch(columnsSlice.actions.deleteColumn(columnId));
  }

  function updateColumn(id: Id, title: string) {
    dispatch(columnsSlice.actions.updateColumn({ id, title }));
  }

  function setActiveColumn(column: Column | null) {
    dispatch(activeColumnSlice.actions.setActiveColumn(column));
  }

  function setActiveTask(task: Task | null) {
    dispatch(activeTaskSlice.actions.setActiveTask(task));
  }
  //DnD functions

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
    const overColumnIndex = columns.findIndex((col) => col.id === overId);

    dispatch(
      columnsSlice.actions.setColumns(
        arrayMove(columns, activeColumnIndex, overColumnIndex)
      )
    );
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex] = {
          ...updatedTasks[activeIndex],
          columnId: tasks[overIndex].columnId,
        };
        dispatch(
          tasksSlice.actions.setTasks(
            arrayMove(updatedTasks, activeIndex, overIndex - 1)
          )
        );
      } else {
        dispatch(
          tasksSlice.actions.setTasks(arrayMove(tasks, activeIndex, overIndex))
        );
      }
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const updatedTasks = [...tasks];
      updatedTasks[activeIndex] = {
        ...updatedTasks[activeIndex],
        columnId: overId,
      };
      dispatch(
        tasksSlice.actions.setTasks(
          arrayMove(updatedTasks, activeIndex, activeIndex)
        )
      );
    }
  }
  return {
    columnsId,
    activeColumn,
    activeTask,
    sensors,
    columns,
    tasks,
    createTask,
    deleteTask,
    updateTask,
    createNewColumn,
    deleteColumn,
    updateColumn,
    onDragStart,
    onDragEnd,
    onDragOver,
  };
}

export default useKanban;

// import { Column, Id, Task } from "@/types/types";
// import { defaultCols, defaultTasks } from "@/utils/data";
// import { generateId } from "@/utils/services";
// import {
//   DragEndEvent,
//   DragOverEvent,
//   DragStartEvent,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";
// import React, { useMemo, useState } from "react";

// function useKanban() {
//   const [columns, setColumns] = useState<Column[]>(defaultCols);
//   const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

//   const [tasks, setTasks] = useState<Task[]>(defaultTasks);

//   const [activeColumn, setActiveColumn] = useState<Column | null>(null);

//   const [activeTask, setActiveTask] = useState<Task | null>(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 10,
//       },
//     })
//   );

//   function createTask(columnId: Id) {
//     const newTask: Task = {
//       id: generateId(),
//       columnId,
//       content: `Task ${tasks.length + 1}`,
//     };

//     setTasks([...tasks, newTask]);
//   }

//   function deleteTask(id: Id) {
//     const newTasks = tasks.filter((task) => task.id !== id);
//     setTasks(newTasks);
//   }

//   function updateTask(id: Id, content: string) {
//     const newTasks = tasks.map((task) => {
//       if (task.id !== id) return task;
//       return { ...task, content };
//     });

//     setTasks(newTasks);
//   }

//   function createNewColumn() {
//     //TODO Add color when selecting new column
//     const columnToAdd: Column = {
//       id: generateId(),
//       title: `Column ${columns.length + 1}`,
//       color: "",
//     };

//     setColumns([...columns, columnToAdd]);
//   }

//   function deleteColumn(id: Id) {
//     const filteredColumns = columns.filter((col) => col.id !== id);
//     setColumns(filteredColumns);

//     const newTasks = tasks.filter((t) => t.columnId !== id);
//     setTasks(newTasks);
//   }

//   function updateColumn(id: Id, title: string) {
//     const newColumns = columns.map((col) => {
//       if (col.id !== id) return col;
//       return { ...col, title };
//     });

//     setColumns(newColumns);
//   }

//   function onDragStart(event: DragStartEvent) {
//     if (event.active.data.current?.type === "Column") {
//       setActiveColumn(event.active.data.current.column);
//       return;
//     }

//     if (event.active.data.current?.type === "Task") {
//       setActiveTask(event.active.data.current.task);
//       return;
//     }
//   }

//   function onDragEnd(event: DragEndEvent) {
//     setActiveColumn(null);
//     setActiveTask(null);

//     const { active, over } = event;
//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;

//     if (activeId === overId) return;

//     const isActiveAColumn = active.data.current?.type === "Column";
//     if (!isActiveAColumn) return;

//     console.log("DRAG END");

//     setColumns((columns) => {
//       const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

//       const overColumnIndex = columns.findIndex((col) => col.id === overId);

//       return arrayMove(columns, activeColumnIndex, overColumnIndex);
//     });
//   }

//   function onDragOver(event: DragOverEvent) {
//     const { active, over } = event;
//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;

//     if (activeId === overId) return;

//     const isActiveATask = active.data.current?.type === "Task";
//     const isOverATask = over.data.current?.type === "Task";

//     if (!isActiveATask) return;

//     // Im dropping a Task over another Task
//     if (isActiveATask && isOverATask) {
//       setTasks((tasks) => {
//         const activeIndex = tasks.findIndex((t) => t.id === activeId);
//         const overIndex = tasks.findIndex((t) => t.id === overId);

//         if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
//           // Fix introduced after video recording
//           tasks[activeIndex].columnId = tasks[overIndex].columnId;
//           return arrayMove(tasks, activeIndex, overIndex - 1);
//         }

//         return arrayMove(tasks, activeIndex, overIndex);
//       });
//     }

//     const isOverAColumn = over.data.current?.type === "Column";

//     // Im dropping a Task over a column
//     if (isActiveATask && isOverAColumn) {
//       setTasks((tasks) => {
//         const activeIndex = tasks.findIndex((t) => t.id === activeId);

//         tasks[activeIndex].columnId = overId;
//         console.log("DROPPING TASK OVER COLUMN", { activeIndex });
//         return arrayMove(tasks, activeIndex, activeIndex);
//       });
//     }
//   }
//   return {
//     columnsId,
//     activeColumn,
//     activeTask,
//     sensors,
//     columns,
//     tasks,
//     createTask,
//     deleteTask,
//     updateTask,
//     createNewColumn,
//     deleteColumn,
//     updateColumn,
//     onDragStart,
//     onDragEnd,
//     onDragOver,
//   };
// }

// export default useKanban;
