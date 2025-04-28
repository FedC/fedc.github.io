import React from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as styles from './MultiSelectToggleDrag.module.scss';

function SortableToggle({ id, children, ...props }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };
  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    >
      {children}
    </button>
  );
}

export default function MultiSelectToggleDrag({ options, selected, onChange }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Drag handler
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = selected.indexOf(active.id);
      const newIndex = selected.indexOf(over.id);
      onChange(arrayMove(selected, oldIndex, newIndex));
    }
  };

  // Toggle handler
  const handleToggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className={styles.multiSelectToggleDrag}>
      <div className={styles.selectedList}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={selected} strategy={verticalListSortingStrategy}>
            {selected.map((option) => (
              <SortableToggle
                key={option}
                id={option}
                className={`${styles.toggleButton} ${styles.selected}`}
                type="button"
                onClick={() => handleToggle(option)}
              >
                {option}
              </SortableToggle>
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className={styles.unselectedList}>
        {options.filter((o) => !selected.includes(o)).map((option) => (
          <button
            key={option}
            className={styles.toggleButton}
            type="button"
            onClick={() => handleToggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
} 