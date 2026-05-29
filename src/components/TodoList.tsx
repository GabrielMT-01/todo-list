import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Todo } from "../types/Todo";
import SortableItem from "./SortableItem";
import TodoTask from "./TodoTask";

export type TodoFilter = "all" | "completed" | "pending";

type TodoListProps = {
  todos: Todo[];
  allTodos: Todo[];
  filter: TodoFilter;
  onReorder: (items: Todo[]) => void;
  enteringTodoIds: Set<number>;
  handleAddTodo: (e: React.SyntheticEvent) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (id: number) => void;
  handleCancel: () => void;
  handleEdit: (todo: Todo) => void;
  handleToggleCompleted: (id: number) => void;
};

function TodoList({
  todos,
  allTodos,
  filter,
  onReorder,
  enteringTodoIds,
  handleAddTodo,
  title,
  setTitle,
  description,
  setDescription,
  handleDelete,
  handleCancel,
  handleEdit,
  handleToggleCompleted,
}: TodoListProps) {
  const isDragEnabled = filter === "all";

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = allTodos.findIndex((t) => t.id === active.id);
    const newIndex = allTodos.findIndex((t) => t.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onReorder(arrayMove(allTodos, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      autoScroll={false}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {todos.map((todo) => (
          <TodoTask
            key={todo.id}
            todo={todo}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            handleAddTodo={handleAddTodo}
            handleEdit={handleEdit}
            handleToggleCompleted={handleToggleCompleted}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          >
            {({ card, footer }) => (
              <SortableItem
                id={todo.id}
                disabled={!isDragEnabled}
                card={
                  <div
                    className={
                      enteringTodoIds.has(todo.id)
                        ? "animate-[task-enter_0.35s_ease-out_forwards]"
                        : ""
                    }
                  >
                    {card}
                  </div>
                }
                footer={footer}
              />
            )}
          </TodoTask>
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default TodoList;
