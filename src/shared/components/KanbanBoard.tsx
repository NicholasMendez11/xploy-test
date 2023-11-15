"use client";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import ColumnContainer from "./Column";
import useKanban from "@/hooks/useKanban";

function KanbanBoard() {
  const {
    sensors,
    columnsId,
    columns,
    tasks,
    activeColumn,
    activeTask,
    onDragEnd,
    onDragOver,
    onDragStart,
    deleteColumn,
    updateColumn,
    createTask,
    deleteTask,
    updateTask,
    createNewColumn,
  } = useKanban();
  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        overflow-x-auto
        px-[40px]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="mx-auto my-5 flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <div
            onClick={() => {
              createNewColumn();
            }}
            className="
            h-full
            w-[300px]
            min-w-[300px]
            cursor-pointer
            rounded-lg
            hover:bg-[#EBF1FA]
            border-2
            ring-rose-500
            transition-all
            duration-300
            flex
            items-center
            justify-center
            font-bold
            text-2xl
            text-gray-700
            hover:text-[#2E88C0]
      "
          >
            + New Column
          </div>
        </div>

        {typeof document !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
