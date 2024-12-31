import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { db, storage } from '../js/firebase';
import * as styles from './ProjectForm.module.scss';
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
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, overlay, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms ease',
    opacity: isOver ? 0.3 : 1, // Reduce opacity when dragged over
  };

  if (isOver) {
    style.transform += ' scale(.5)'; // Scale up when dragged over
  }

  if (typeof overlay !== 'undefined') {
    const el = document.getElementById('content-item-box-' + overlay);
    if (el) {
      style.height = el.offsetHeight + 'px';
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.contentSection}>
      {children}
    </div>
  );
};

const getBaseName = (fileName) => fileName.replace(/\.[^/.]+$/, ""); // Remove the extension

const teamRoles = [
  'Engineering (Civil, Landscape, Structural)',
  'MEP (Mechanical, Electrical, Plumbing)',
  'Design',
  'General Contractor',
  'Photographer',
  'Cost Eliminator',
];

const deleteOldImages = async (basePath) => {
  const suffixes = ["_small.jpg", "_medium.jpg", "_large.jpg", "_small.webp", "_medium.webp", "_large.webp"];
  for (const suffix of suffixes) {
    try {
      const fileRef = ref(storage, `${basePath}${suffix}`);
      await deleteObject(fileRef); // Deletes the old version
      console.log(`Deleted old image: ${basePath}${suffix}`);
    } catch (error) {
      if (error.code === "storage/object-not-found") {
        console.warn(`File not found: ${basePath}${suffix}`); // Not an issue, just log it
      } else {
        console.error(`Error deleting file ${basePath}${suffix}:`, error);
      }
    }
  }
};

// Helper function to poll for the resized image
const waitForProcessedFile = async (filePath) => {
  const fileRef = ref(storage, filePath);
  try {
    await getMetadata(fileRef); // Check if metadata exists (file is available)
    return await getDownloadURL(fileRef); // Return the download URL
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      return new Promise((resolve) =>
        setTimeout(() => resolve(waitForProcessedFile(filePath)), 1000) // Retry after 1 second
      );
    } else {
      throw error; // Handle unexpected errors
    }
  }
};

const ProjectForm = ({ onClose, editingProject, onUpdateSuccess }) => {
  let globalProjectId = editingProject?.id;

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    location: '',
    area: 0,
    projectType: 'Interior Renovation',
    description: '',
    award: '',
    photoCredit: '',
    role: '',
    use: [],
    order: 0,
    mainImage: null,
    content: [],
    published: false,
    status: '',
    yearCompleted: '',
    clientDescription: '',
    challenge: '',
    solution: '',
    publications: [], // { title: '', link: '', date: '' } // Example fields for each publication
    teams: [],
  });

  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [draggingContent, setDraggingContent] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleDragOver = ({ active, over }) => {
    if (over) {
      const index = parseInt(over.id.split('-')[2], 10);
      setHoveredItem(index); // Update the hovered item
    }
  };

  const handleDragStart = ({ active }) => {
    const activeId = active.id;
    const index = parseInt(activeId.split('-')[2], 10);
    const content = formData.content[index];
    setDraggingContent(content);
    setActiveIndex(index);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Drag starts only after moving 10px
      },
      onStart(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
          event.preventDefault(); // Prevent drag from starting
        }
      },
    }),
  );

  useEffect(() => {
    if (editingProject) {
      setFormData((prevData) => ({
        ...prevData, // retain default structure
        ...editingProject, // update with project data
      }));
    }
  }, [editingProject]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleInputChangeAndSubmit = (e) => {
    handleInputChange(e);
    handleSubmit();
  };

  const handleMainImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update preview image immediately
      setFormData({ ...formData, mainImage: file });
      // If creating a new project, we must first create a placeholder document to get an ID
      if (!globalProjectId) {
        const projectRef = await addDoc(collection(db, 'projects'), {}); // Placeholder
        globalProjectId = projectRef.id;
      }

      // Upload image and get URL
      const imageUrl = await uploadImage(globalProjectId, file);
      setFormData({ ...formData, mainImage: imageUrl });
    }
  };

  // Helper function to upload image to Firebase Storage and get URL
  const uploadImage = async (projectId, file) => {
    if (!file) return;

    setLoading(true); // Start loading
    try {
      const baseName = getBaseName(file.name);
      const basePath = `projects/${projectId}/${baseName}`;

      // Upload the original file to Firebase Storage
      const storageRef = ref(storage, `${basePath}.jpg`);
      const snapshot = await uploadBytes(storageRef, file);

      // Construct the "large" size path
      const largeImagePath = `${basePath}_large.jpg`;

      // Wait for the "large" version to be processed
      const imageUrl = await waitForProcessedFile(largeImagePath);

      console.log("Processed large image URL:", imageUrl);

      // Cleanup old assets
      const mainImage = editingProject?.mainImage;
      if (mainImage) {
        const basePath = decodeURIComponent(mainImage.split("?")[0].split("/o/")[1]).replace(/_large\.jpg$/, "");
        await deleteOldImages(basePath);
      }

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleArrayChange = (arrayName, index, value) => {
    const newArray = [...formData[arrayName]];
    newArray[index] = value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const addArrayItem = (arrayName, item = '') => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], item] });
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleTeamChange = (index, field, value) => {
    const updatedTeams = [...formData.teams];
    updatedTeams[index][field] = value;
    setFormData({ ...formData, teams: updatedTeams });
  };

  const addTeam = () => {
    const newTeam = { name: '', role: '' }; // Default team structure
    setFormData({ ...formData, teams: [...formData.teams, newTeam] });
  };

  const removeTeam = (index) => {
    const updatedTeams = [...formData.teams];
    updatedTeams.splice(index, 1);
    setFormData({ ...formData, teams: updatedTeams });
  };

  const handlePublicationChange = (index, field, value) => {
    const updatedPublications = [...formData.publications];
    updatedPublications[index][field] = value;
    setFormData({ ...formData, publications: updatedPublications });
  };

  const addPublication = () => {
    const newPublication = { title: '', link: '', date: '' }; // Adjust fields as needed
    setFormData({ ...formData, publications: [...formData.publications, newPublication] });
  };

  const removePublication = (index) => {
    const updatedPublications = [...formData.publications];
    updatedPublications.splice(index, 1);
    setFormData({ ...formData, publications: updatedPublications });
  };

  // Handle dynamic content change
  const handleContentChange = (index, field, value) => {
    const newContent = [...formData.content];
    newContent[index][field] = value;
    setFormData({ ...formData, content: newContent });
  };

  const handleContentChangeAndSubmit = (index, field, value) => {
    handleContentChange(index, field, value);
    handleSubmit();
  };

  const handleDragEnd = ({ active, over }) => {
    console.log('Drag end:', { active: active, over: over });
    if (!over) return; // Prevent error if dragging outside droppable area

    const activeIndex = parseInt(active.id.split('-')[2], 10);
    const overIndex = parseInt(over.id.split('-')[2], 10);

    if (activeIndex !== overIndex) {
      const reorderedContent = arrayMove(formData.content, activeIndex, overIndex);
      setFormData((prevData) => ({ ...prevData, content: reorderedContent }));
      handleSubmit();
    }

    setDraggingContent(false);
    setActiveIndex(null);
  };

  // Uploads an image to Firebase Storage and updates content section with URL
  const uploadContentImage = async (index, file) => {
    if (!file) return;

    setLoading(true); // Start loading
    try {
      const baseName = getBaseName(file.name);
      const basePath = `projects/${formData.title}/content/${baseName}`;

      // Upload the original file to Firebase Storage
      const storageRef = ref(storage, `${basePath}.jpg`);
      const snapshot = await uploadBytes(storageRef, file);

      // Construct the "large" size path
      const largeImagePath = `${basePath}_large.jpg`;

      // Wait for the "large" version to be processed
      const imageUrl = await waitForProcessedFile(largeImagePath);
      console.log("Processed large image URL:", imageUrl);

      // Cleanup old assets
      if (formData.content[index]?.url) {
        const imageUrl = formData.content[index].url;
        const oldBaseName = imageUrl.split("_")[0]; // Extract old base name
        const basePath = decodeURIComponent(imageUrl.split("?")[0].split("/o/")[1]).replace(/_large\.jpg$/, "");
        await deleteOldImages(basePath);
      }

      // Update the content array with the "large" image URL
      const newContent = [...formData.content];
      newContent[index].url = imageUrl;
      setFormData({ ...formData, content: newContent });

      handleSubmit(); // Save the updated content

    } catch (error) {
      console.error("Error uploading content image:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Add a new content section based on selected type
  const addContentSection = (type) => {
    const newContentItem = { type, title: '', text: '', description: '', url: '', featured: false, published: false };
    setFormData({ ...formData, content: [...formData.content, newContentItem] });
  };

  const deleteContentImage = async (imageUrl) => {
    try {
      // Parse the image path from the URL
      const basePath = decodeURIComponent(imageUrl.split("?")[0].split("/o/")[1]).replace(/_large\.jpg$/, "");
      const suffixes = ["_small.jpg", "_medium.jpg", "_large.jpg", "_small.webp", "_medium.webp", "_large.webp"];

      for (const suffix of suffixes) {
        const fileRef = ref(storage, `${basePath}${suffix}`);
        try {
          await deleteObject(fileRef);
          console.log(`Deleted image: ${basePath}${suffix}`);
        } catch (error) {
          if (error.code !== "storage/object-not-found") {
            console.error(`Failed to delete image: ${basePath}${suffix}`, error);
          }
        }
      }
    } catch (error) {
      console.error("Error deleting content image:", error);
    }
  };

  const handleRemoveContentSection = async (index) => {
    const contentItem = formData.content[index];

    if (contentItem.type === "image" && contentItem.url) {
      await deleteContentImage(contentItem.url);
    }

    // Update the content array after deletion
    const newContent = [...formData.content];
    newContent.splice(index, 1);
    setFormData({ ...formData, content: newContent });
  };

  const handleSubmit = async (e) => {
    if (e) { e.preventDefault(); }
    try {
      let projectId = globalProjectId;

      // If creating a new project, we must first create a placeholder document to get an ID
      if (!projectId) {
        const projectRef = await addDoc(collection(db, 'projects'), {}); // Placeholder
        projectId = projectRef.id;
        globalProjectId = projectId;

        // Update the form data with the new ID
        setFormData((prevData) => ({
          ...prevData,
          id: projectId,
        }));
      }

      const projectData = {
        ...formData,
      };

      if (editingProject) {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, projectData);
        console.log('Project updated', projectData);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        console.log('Project saved', projectData);
      }

      // onClose({ updated: !!editingProject, new: !editingProject });
      onUpdateSuccess('Project saved successfully');


    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const onClickClose = () => {
    setFormData({
      id: '',
      title: '',
      location: '',
      area: 0,
      projectType: 'Interior Renovation',
      description: '',
      award: '',
      photoCredit: '',
      role: '',
      use: [],
      order: 0,
      mainImage: null,
      content: [],
      published: false,
    });
    onClose();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const onClickRemoveContentSection = (e, index) => {
    e.stopPropagation();

    // confirm first
    if (!window.confirm('Are you sure you want to remove this section?')) {
      return;
    }

    const newContent = [...formData.content];
    newContent.splice(index, 1);
    setFormData({ ...formData, content: newContent });

  }

  return (
    <section className={styles.projectForm}>
      <div className={styles.projectHeader}>
        <button className={styles.backButton} onClick={onClickClose}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
          <span>Back</span>
        </button>

        <h2>
          {editingProject ? `Edit Project: ${formData.title}` : 'New Project'}
        </h2>

        <button type="submit" className={styles.saveButton} onClick={handleSubmit} disabled={loading}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" /></svg>
          <span>{loading ? "Uploading..." : "Save Project"}</span>
        </button>
      </div>


      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Uploading images, please wait...</p>
        </div>
      )}

      <div className={styles.projectFormContent} onClick={stopPropagation}>

        <div className={styles.mainImageContainer}>
          {formData.mainImage && (
            <img
              id="main-image-preview"
              src={formData.mainImage instanceof File ? URL.createObjectURL(formData.mainImage) : formData.mainImage}
              alt="Main Image"
              className={styles.mainImage}
            />
          )}

          <label htmlFor="main-image-upload" className={styles.uploadLabel}>Upload Project Main Image</label>
          <input type="file" name="mainImage" id="main-image-upload" onChange={handleMainImageFileChange} />
        </div>

        <form onSubmit={handleSubmit}>

          <div className={styles.formBox}>
            <input type="hidden" name="id" value={formData.id} />

            <div className={styles.flexSpaceBetween}>
              <div className={styles.formGroup}>
                <div className={styles.flex}>
                  <label htmlFor="order">Order</label>
                  <input type="number" name="order" placeholder="Order" onChange={handleInputChange} onBlur={handleSubmit} value={formData.order || 0} className={styles.numberInput} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <Checkbox label="Published" checked={!!formData.published} onChange={handleInputChangeAndSubmit} name="published" />
              </div>
            </div>

            <div className="grid-two-col">
              <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" placeholder="Project Title" onChange={handleInputChange} onBlur={handleSubmit} value={formData.title || ''} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" placeholder="Location" onChange={handleInputChange} onBlur={handleSubmit} value={formData.location || ''} />
              </div>
            </div>

            <div className="grid-two-col">
              <div className={styles.formGroup}>
                <label htmlFor="award">Award</label>
                <input type="text" name="award" placeholder="Award" onChange={handleInputChange} onBlur={handleSubmit} value={formData.award || ''} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="photoCredit">Photo Credit</label>
                <input type="text" name="photoCredit" placeholder="Photo Credit" onChange={handleInputChange} onBlur={handleSubmit} value={formData.photoCredit || ''} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role">Role</label>
              <input type="text" name="role" placeholder="Role" onChange={handleInputChange} onBlur={handleSubmit} value={formData.role || ''} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="use">Use (use comma separated for many)</label>
              <input type="text" name="use" placeholder="Use (comma separated)" onChange={handleInputChange} onBlur={handleSubmit} value={formData.use || ''} />
            </div>

            <div className="grid-two-col">
              <div className={styles.formGroup}>
                <label htmlFor="projectType">Project Type</label>
                <select id="projectType" name="projectType" onChange={handleInputChangeAndSubmit} value={formData.projectType || ''}>
                  <option value="Historic Interior Renovation">Historic Interior Renovation</option>
                  <option value="Interior Renovation">Interior Renovation</option>
                  <option value="New Construction">New Construction</option>
                  <option value="Schematic Proposal">Schematic Proposal</option>
                  <option value="Renovation">Renovation</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="status">Project Status</label>
                <select name="status" onChange={handleInputChangeAndSubmit} value={formData.status}>
                  <option value="">Select Status</option>
                  <option value="Built">Built</option>
                  <option value="Unbuilt">Unbuilt</option>
                  <option value="Permitting">Permitting</option>
                </select>
              </div>
            </div>

            <div className="grid-two-col">
              <div className={styles.formGroup}>
                <label htmlFor="yearCompleted">Year Completed</label>
                <input type="number" name="yearCompleted" placeholder="Year Completed" onChange={handleInputChange} onBlur={handleSubmit} value={formData.yearCompleted} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="area">Area (sq ft)</label>
                <input type="number" name="area" placeholder="Area (sq ft)" onChange={handleInputChange} onBlur={handleSubmit} value={formData.area || ''} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">General Description</label>
              <textarea name="description" placeholder="Description" rows={4} cols={40}
                onChange={handleInputChange} onBlur={handleSubmit} value={formData.description || ''}>
              </textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Client Description</label>
              <textarea name="clientDescription" placeholder="Client Description" rows="3" onChange={handleInputChange} onBlur={handleSubmit} value={formData.clientDescription}></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Challenge</label>
              <textarea name="challenge" placeholder="Challenge" rows="3" onChange={handleInputChange} onBlur={handleSubmit} value={formData.challenge}></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Solution</label>
              <textarea name="solution" placeholder="Solution" rows="3" onChange={handleInputChange} onBlur={handleSubmit} value={formData.solution}></textarea>
            </div>

          </div>

          {/* Publications */}
          <div className={styles.contentSection}>
            <h3>Publications</h3>
            {formData.publications?.map((pub, index) => (
              <div key={'publication-' + index} className={styles.arrayItem}>
                <input
                  type="text"
                  placeholder="Publication Title"
                  value={pub.title}
                  onChange={(e) => handlePublicationChange(index, 'title', e.target.value)}
                />
                <input
                  type="url"
                  placeholder="Publication Link"
                  value={pub.link}
                  onChange={(e) => handlePublicationChange(index, 'link', e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Publication Date"
                  value={pub.date}
                  onChange={(e) => handlePublicationChange(index, 'date', e.target.value)}
                />
                <button type="button" onClick={() => removePublication(index)} className='warn-btn'>Remove</button>
              </div>
            ))}
            <div className={styles.flexRight}>
              <button type="button" onClick={addPublication} className={styles.iconButton}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
                Add Publication</button>
            </div>
          </div>

          {/* Teams */}
          <div className={styles.contentSection}>
            <h3>Teams</h3>
            {formData.teams?.map((team, index) => (
              <div key={'team-' + index} className={styles.arrayItem}>
                <input
                  type="text"
                  placeholder="Team Name"
                  value={team.name}
                  onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                />
                <select
                  value={team.role}
                  onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                >
                  <option value="">Select Role</option>
                  {teamRoles.map((role, i) => (
                    <option key={'role-' + index + i} value={role}>{role}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeTeam(index)} className='warn-btn'>Remove</button>
              </div>
            ))}
            <div className={styles.flexRight}>
              <button type="button" onClick={addTeam} className={styles.iconButton}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
                Add Team</button>
            </div>
          </div>

          <DndContext collisionDetection={closestCenter} sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <SortableContext items={formData.content.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              {formData.content.map((contentItem, index) => (
                <SortableItem key={'content-item-' + index} id={'content-item-' + index} isOver={hoveredItem === index}>
                  <div id={'content-item-box-' + index}>

                    <div className={styles.contentItemHeader}>

                      <button className={styles.dragButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ccc">
                        <path d="M480-80 310-250l57-57 73 73v-206H235l73 72-58 58L80-480l169-169 57 57-72 72h206v-206l-73 73-57-57 170-170 170 170-57 57-73-73v206h205l-73-72 58-58 170 170-170 170-57-57 73-73H520v205l72-73 58 58L480-80Z"/>
                        </svg>
                      </button>

                      <h3>{`${contentItem.type.charAt(0).toUpperCase() + contentItem.type.slice(1)} Section`}</h3>

                      <div className={styles.flexRightCenter}>

                        <Checkbox
                          label="Published"
                          checked={!!contentItem.published}
                          onChange={(e) => handleContentChangeAndSubmit(index, 'published', e.target.checked)}
                          onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                        />

                        <Checkbox
                          label="Featured"
                          checked={!!contentItem.featured}
                          onChange={(e) => handleContentChangeAndSubmit(index, 'featured', e.target.checked)}
                          onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                        />

                        <button
                          type="button"
                          className="warn-btn"
                          onClick={(e) => onClickRemoveContentSection(e, index)}
                          onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                            </svg>
                        </button>
                      </div>

                    </div>

                    <div 
                      className={styles.contentItemBody}
                      onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                      >

                      {/* Title (only for text and image types) */}
                      {(contentItem.type === 'image' || contentItem.type === 'text') && (
                        <div className={styles.formGroup}>
                          <label>Image Title</label>
                          <input
                            type="text"
                            placeholder="Title"
                            value={contentItem.title || ''}
                            onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                            onBlur={handleSubmit}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                            onKeyboardDown={(e) => e.stopPropagation()} // Prevent drag interaction
                          />
                        </div>
                      )}

                      {/* Description (only for image type) */}
                      {contentItem.type === 'image' && (
                        <div className={styles.formGroup}>
                          <label>
                            Image Description
                          </label>
                          <input
                            type="text"
                            placeholder="Description"
                            value={contentItem.description || ''}
                            onChange={(e) => handleContentChange(index, 'description', e.target.value)}
                            onBlur={handleSubmit}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                            onKeyboardDown={(e) => e.stopPropagation()} // Prevent drag interaction
                          />
                        </div>
                      )}

                      {/* URL (only for image type) */}
                      {contentItem.type === 'image' && (
                        <div className={styles.contentImageContainer}>
                          <img
                            id={`content-image-preview-${index}`}
                            src={contentItem.url instanceof File ? URL.createObjectURL(contentItem.url) : contentItem.url} alt="Upload Image" className={styles.contentImage} />

                          <label htmlFor={`content-image-upload-${index}`} className={styles.uploadLabel}>Upload Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            id={`content-image-upload-${index}`}
                            onChange={(e) => uploadContentImage(index, e.target.files[0])}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                            onKeyboardDown={(e) => e.stopPropagation()} // Prevent drag interaction
                          />
                        </div>
                      )}

                      {/* Text (for text and quote types) */}
                      {(contentItem.type === 'text' || contentItem.type === 'quote') && (
                        <div className={styles.formGroup}>
                          <label>
                            {contentItem.type === 'text' ? 'Text' : 'Quote'}
                          </label>
                          <textarea
                            placeholder="Text"
                            value={contentItem.text || ''}
                            rows={6}
                            cols={40}
                            onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                            onBlur={handleSubmit}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                            onKeyboardDown={(e) => e.stopPropagation()} // Prevent drag interaction
                          ></textarea>
                        </div>
                      )}
                    </div>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
            <DragOverlay>{draggingContent ? <SortableItem id={'drag-overlay-content-' + activeIndex} overlay={activeIndex}> <p>
              Dragging item #{activeIndex}
            </p> </SortableItem> : null}</DragOverlay>
          </DndContext>

          <div className={styles.addContentButtons}>
            <button type="button" className="accent-btn" onClick={() => addContentSection('image')}>Add Image Content</button>
            <button type="button" className="accent-btn" onClick={() => addContentSection('text')}>Add Text Content</button>
            <button type="button" className="accent-btn" onClick={() => addContentSection('quote')}>Add Quote Content</button>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Uploading..." : "Save Project"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProjectForm;
