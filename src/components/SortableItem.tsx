import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import type { ReactNode } from "react";
import { buttonStyle } from "../styles/ButtonStyle";

const cardHeightClass =
  "h-[72px] sm:h-[88px] md:h-[100px] min-h-[72px] sm:min-h-[88px]";

type SortableItemProps = {
  id: number;
  card: ReactNode;
  footer?: ReactNode;
  disabled?: boolean;
};

function SortableItem({ id, card, footer, disabled = false }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: transform
      ? `translate3d(0, ${Math.round(transform.y)}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`w-full max-w-2xl mx-auto px-4 mt-4 sm:mt-6 md:mt-8 ${
        isDragging ? "opacity-50 z-50 relative" : ""
      }`}
    >
      <div className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[2.75rem_1fr] gap-x-2">
        <button
          type="button"
          aria-label="Reordenar tarefa"
          title={disabled ? "Reordene com o filtro Todas" : "Arrastar para reordenar"}
          className={`${buttonStyle} ${cardHeightClass} bg-blue-50 dark:bg-[#242320] row-start-1 col-start-1 flex items-center justify-center shrink-0 w-10 sm:w-11 text-[#FF8303] touch-manipulation transition-opacity duration-300 ${
            disabled
              ? "opacity-40 pointer-events-none cursor-not-allowed"
              : "cursor-grab active:cursor-grabbing hover:border-red-500 dark:hover:border-blue-300"
          }`}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>
        <div className="row-start-1 col-start-2 min-w-0">{card}</div>
        {footer ? (
          <div className="row-start-2 col-start-2 min-w-0">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

export default SortableItem;
