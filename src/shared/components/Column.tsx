"use client";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";

import TaskCard from "./TaskCard";
import { Column, Task } from "@/types/types";
import { Id } from "react-beautiful-dnd";
import { Badge, IconButton } from "@material-tailwind/react";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-[#8FB2C9] opacity-40
      border-2
      border-[#358FC1]
      w-[350px]
      h-full
      max-h-full
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
        bg-[#f4f7fd9d]
        border-2
        border-white
        ring-rose-500
        transition-all
        duration-300
        w-[350px]
        h-full
        max-h-full
        rounded-md
        flex
        flex-col
  "
    >
      {/* Column title */}

      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="
            text-md
            h-[60px]
            cursor-grab
            text-[#358FC1]
            bg-[#3590c127]
            hover:bg-[#358FC1] hover:text-black hover:font-semibold transition-all duration-300 
     
            rounded-lg
           
            p-3
            font-bold
            flex
            items-center
            justify-between
            "
      >
        <div className="flex gap-2">
          <div className={`w-4 h-4 rounded-full bg-[${column.color}]`} />
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-white focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id as Id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
          <div>( {tasks.length} )</div>
        </div>

        <IconButton
          className="
          text-black
          shadow-none
          hover:shadow-none
          hover:text-red-700
          hover:scale-150
          bg-transparent
          rounded
          px-1
          py-2
          "
          onClick={() => {
            deleteColumn(column.id as Id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 shadow-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </IconButton>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className="flex gap-2 items-center text-center text-[#358FC1]
        bg-[#3590c127] hover:bg-[#358FC1] hover:text-white hover:font-semibold transition-all duration-300 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id as Id);
        }}
      >
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
