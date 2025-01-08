import React, { useState, useEffect } from 'react';
import { db } from '../js/firebase';
import { doc, collection, getDocs, updateDoc, query, orderBy } from 'firebase/firestore';
import * as styles from './FeaturedImages.module.scss';
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

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms ease',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.sortableItem}>
      {children}
    </div>
  );
};

const FeaturedImages = ({ onUpdateSuccess }) => {
  const [projects, setProjects] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Drag starts after moving 10px
      },
    })
  );

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        // Fetch featured items ordered by `order`
        const featuredSnapshot = await getDocs(query(collection(db, 'featured'), orderBy('order')));
        const featuredData = featuredSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Fetch projects data
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Combine featured items with project data
        const combinedFeatured = featuredData.map((item) => {

          const project = projectsData.find((proj) => proj.id === item.projectId);
          if (!project) {
            console.warn(`Project with ID ${item.projectId} not found.`);
            return null;
          }

          if (project.published === false) {
            console.log(`Project with ID ${item.projectId} is not published.`);
            return null;
         }

          if (item.type === 'main') {
            return { id: item.id, projectId: item.projectId, imageUrl: project.mainImage, order: item.order };
          }

          if (item.type === 'content') {
            const contentImage = project.content?.find((content) => content.id === item.contentId);
            if (!contentImage) {
              console.warn(`Content with ID ${item.contentId} not found in project ${item.projectId}.`);
              return null;
            }
            return { id: item.id, projectId: item.projectId, imageUrl: contentImage.url, order: item.order };
          }

          return null;
        }).filter(Boolean);

        setProjects(projectsData);
        setFeaturedItems(combinedFeatured);
        console.log('Combined Featured Items:', combinedFeatured);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      }
    };

    fetchFeaturedItems();
  }, []);

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = featuredItems.findIndex((item) => item.id === active.id);
    const newIndex = featuredItems.findIndex((item) => item.id === over.id);
    const reorderedItems = arrayMove(featuredItems, oldIndex, newIndex).map((item, index) => ({
      ...item,
      order: index,
    }));

    setFeaturedItems(reorderedItems);

    try {
      // Update Firestore order
      await Promise.all(
        reorderedItems.map((item) =>
          updateDoc(doc(db, 'featured', item.id), { order: item.order })
        )
      );
      console.log('Updated featured order in Firestore.');
      onUpdateSuccess && onUpdateSuccess('Order updated successfully');
    } catch (error) {
      console.error('Error updating Firestore order:', error);
    }
  };

  return (
    <div className={styles.featuredImages}>
      <h2>Featured Images</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={featuredItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div className={styles.imageList}>
            {featuredItems.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <div className={styles.imageContainer}>
                  <img src={item.imageUrl} alt={`Featured from ${item.projectId}`} />
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {draggingItem ? (
            <div className={styles.dragOverlay}>
              <img src={draggingItem.imageUrl} alt="Dragging item" />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default FeaturedImages;