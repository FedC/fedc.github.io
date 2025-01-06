import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../js/firebase';
import * as styles from './ProjectList.module.scss';
import Checkbox from './Checkbox';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableRow = ({ id, onClick, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms ease',
    opacity: isOver ? 0.3 : 1, // Reduce opacity when dragged over
  };

  if (isOver) {
    style.transform += ' scale(.9)'; // Scale up when dragged over
  }

  if (typeof overlay !== 'undefined') {
    if (el) {
      style.height = '78px';
      style.backdropFilter = 'blur(10px)';
      style.display = 'flex';
      style.alignItems = 'center';
      style.justifyContent = 'center';
      style.color = 'white';
      style.fontSize = '1.2rem';
      style.backgroundColor = 'rgba(51, 97, 238, 0.4)';
    }
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

const SortableItem = ({ id, overlay, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms ease',
    opacity: isOver ? 0.3 : 1, // Reduce opacity when dragged over
  };

  if (isOver) {
    style.transform += ' scale(.9)'; // Scale up when dragged over
  }

  if (typeof overlay !== 'undefined') {
    if (el) {
      style.height = '78px';
      style.backdropFilter = 'blur(10px)';
      style.display = 'flex';
      style.alignItems = 'center';
      style.justifyContent = 'center';
      style.color = 'white';
      style.fontSize = '1.2rem';
      style.backgroundColor = 'rgba(51, 97, 238, 0.4)';
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

const ProjectList = ({ projects, onEdit, onUpdate }) => {
  const [items, setItems] = useState(projects || []);
  const [draggingRow, setDraggingRow] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Drag starts after moving 10px
      },
    })
  );

  const handleDragOver = ({ active, over }) => {
    if (over) {
      const id = active.id;
      setHoveredItem(id); // Update the hovered item
    }
  };

  const handleDragStart = ({ active }) => {
    const activeId = active.id;
    setDraggingRow(activeId);
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    const reorderedItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
      ...item,
      order: index,
    }));

    setItems(reorderedItems);

    // Update order in Firestore
    await Promise.all(
      reorderedItems.map((item) => {
        const projectRef = doc(db, 'projects', item.id);
        return updateDoc(projectRef, { order: item.order });
      })
    );

    onUpdate(reorderedItems);
  };

  const onTogglePublished = async (e, project) => {
    e.stopPropagation();

    // Optimistically update the UI
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? { ...p, published: e.target.checked } : p
    );
    onUpdate(updatedProjects);

    try {
      // Persist the change in Firestore
      const projectRef = doc(db, "projects", project.id);
      await updateDoc(projectRef, { published: e.target.checked });
      console.log(`Project ${project.id} published status updated to: ${e.target.checked}`);
    } catch (error) {
      console.error("Error updating project publish status:", error);

      // Revert the UI state if the Firestore update fails
      const revertedProjects = projects.map((p) =>
        p.id === project.id ? { ...p, published: !e.target.checked } : p
      );
      onUpdate(revertedProjects);
    }
  };

  const onClickDelete = (e, project) => {
    e.stopPropagation();
    console.log('Delete', project);
  }

  const getSmallSizeUrl = (url) => {
    return url.replace('_large', '_small');
  }

  useEffect(() => {
    // Update items state and ensure the correct order
    setItems([...projects].sort((a, b) => a.order - b.order));
  }, [projects]);

  return (
    <div id="projectsList" className={styles.projectsList}>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <SortableContext items={items.map((item) => item?.id)} strategy={verticalListSortingStrategy}>
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Main Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {projects
              .sort((a, b) => a.order - b.order)
              .map((project) => (
                <SortableRow key={project.id} id={project.id} onClick={() => onEdit(project)} isOver={hoveredItem === project.id} >
                  <td className={styles.orderTd}>
                    <div className={styles.flexCenter}>
                      <button className={styles.dragButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ccc">
                          <path d="M480-80 310-250l57-57 73 73v-206H235l73 72-58 58L80-480l169-169 57 57-72 72h206v-206l-73 73-57-57 170-170 170 170-57 57-73-73v206h205l-73-72 58-58 170 170-170 170-57-57 73-73H520v205l72-73 58 58L480-80Z" />
                        </svg>
                      </button>
                      <span>&nbsp;</span>

                      <span>{project.order}</span>
                    </div>
                  </td>
                  <td>
                    {project.mainImage && (
                      <div className={styles.flexCenter}>
                        <img
                          id="main-image-preview"
                          src={project.mainImage instanceof File ? URL.createObjectURL(project.mainImage) : getSmallSizeUrl(project.mainImage)}
                          alt="Main Image"
                          className={styles.mainImage}
                        />
                      </div>
                    )}
                  </td>
                  <td>{project.title}</td>
                  <td>{project.location}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className={styles.flexCenter}>
                      {/* {<input type='checkbox' checked={project.published} onChange={(e) => onTogglePublished(e, project)}  /> } */}
                      <Checkbox label="" checked={project.published} onChange={(e) => onTogglePublished(e, project)} />
                    </div>
                  </td>
                </SortableRow>
              ))}
            </tbody>
          </table>
        </SortableContext>
        <DragOverlay>{draggingRow ? <SortableItem id={'drag-overlay-project-' + draggingRow.id} overlay={draggingRow.id}> <p>
          Dragging item #{draggingRow.title}
        </p> </SortableItem> : null}</DragOverlay>
      </DndContext>
    </div>
  );
};

export default ProjectList;
