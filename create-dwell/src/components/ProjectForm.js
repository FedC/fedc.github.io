import React, { useState, useEffect, useRef } from 'react';
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
// import { useLocation } from 'react-router-dom';

import { CSS } from '@dnd-kit/utilities';
import MultiSelectToggleDrag from './MultiSelectToggleDrag';

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
  'Engineering',
  'MEP Engineers', // (Mechanical, Electrical, Plumbing)
  'Electrical Engineer',
  'Mechanical Engineer',
  'Plumbing Engineer',
  'Structural Engineer',
  'Landscape Architect',
  'Landscape Design & Contractor',
  'Civil Engineer',
  'Interior Designer',
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

/** MultiSelectDropdown for project uses */
const USE_OPTIONS = [
  'Residential',
  'Commercial',
  'Retail',
  'Educational',
  'Office',
  'Cultural',
];

function MultiSelectDropdown({ options, selected, onChange, label }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckboxChange = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className={styles.multiSelectDropdown} ref={dropdownRef}>
      <label>{label}</label>
      <button
        type="button"
        className={styles.dropdownButton}
        onClick={() => setOpen((o) => !o)}
      >
        {Array.isArray(selected) && selected.length > 0 ? selected.join(', ') : 'Select...'}
        <span className={styles.dropdownArrow}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
            <path d="M6 8L10 12L14 8" stroke="#1b1b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <label key={option} className={styles.dropdownOption}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

const PROJECT_TYPE_OPTIONS = [
  'Historic Interior Renovation',
  'Interior Renovation',
  'Exterior Renovation',
  'Signage / Wayfinding',
  'Package',
  'Addition',
  'New Construction',
  'Schematic Proposal',
  'Renovation',
];

const ProjectForm = ({ onClose, editingProject, onUpdateSuccess, onUnsavedChanges }) => {
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
  const [originalData, setOriginalData] = useState(null); // To hold the initial snapshot
  const [unsaved, setUnsaved] = useState(false);
  
  // const location = useLocation();
  // useEffect(() => {
  // }, [location.pathname]);

  // Load the project data on editing
  useEffect(() => {
    if (editingProject) {
      const snapshot = { ...editingProject };
      setFormData(snapshot);
      setOriginalData(snapshot); // Capture the initial snapshot for comparison
    }
  }, [editingProject]);

  useEffect(() => {
    if (!originalData) return;
    // Simple shallow comparison; for deep objects, use a deep equality check
    const isChanged = JSON.stringify(formData) !== JSON.stringify(originalData);
    setUnsaved(isChanged);
    onUnsavedChanges(isChanged);
  }, [formData, originalData]);

  // Deep comparison utility
  const isDataChanged = (data1, data2) => {
    return JSON.stringify(data1) !== JSON.stringify(data2);
  };

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

    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };

      console.log('Updated FormData:', updatedFormData); // Logs the updated state immediately
      return updatedFormData;
    });
  };

  const handleInputChangeAndSubmit = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };

      setTimeout(() => handleSubmit(null, updatedFormData), 0);

      return updatedFormData;
    });
  };

  const handleMainImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update preview image immediately
    setFormData((prevFormData) => ({ ...prevFormData, mainImage: file }));

    // Ensure a placeholder document is created if needed
    if (!globalProjectId) {
      const projectRef = await addDoc(collection(db, 'projects'), {}); // Placeholder
      globalProjectId = projectRef.id;
    }

    // Upload image and get URL
    const imageUrl = await uploadImage(globalProjectId, file);

    // Update formData with the image URL
    setFormData((prevFormData) => ({ ...prevFormData, mainImage: imageUrl }));
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
    setFormData((prevFormData) => {
      const newArray = [...prevFormData[arrayName]];
      newArray[index] = value;
      return { ...prevFormData, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName, item = '') => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [arrayName]: [...prevFormData[arrayName], item],
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData((prevFormData) => {
      const newArray = [...prevFormData[arrayName]];
      newArray.splice(index, 1);
      return { ...prevFormData, [arrayName]: newArray };
    });
  };

  const handleTeamChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedTeams = [...(prevFormData.teams || [])];
      updatedTeams[index][field] = value;
      return { ...prevFormData, teams: updatedTeams };
    });
  };

  const addTeam = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      teams: [...(prevFormData.teams || []), { name: '', role: '' }],
    }));
  };

  const removeTeam = (index) => {
    setFormData((prevFormData) => {
      const updatedTeams = [...(prevFormData.teams || [])];
      updatedTeams.splice(index, 1);
      return { ...prevFormData, teams: updatedTeams };
    });
  };

  const handlePublicationChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedPublications = [...(prevFormData.publications || [])];
      updatedPublications[index][field] = value;
      return { ...prevFormData, publications: updatedPublications };
    });
  };

  const addPublication = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      publications: [...(prevFormData.publications || []), { title: '', link: '', date: '', imageUrl: '' }],
    }));
  };

  const removePublication = (index) => {
    setFormData((prevFormData) => {
      const updatedPublications = [...(prevFormData.publications || [])];
      updatedPublications.splice(index, 1);
      return { ...prevFormData, publications: updatedPublications };
    });
  };

  const uploadPublicationImage = async (index, file) => {
    if (!file) return;

    setLoading(true); // Start loading

    try {
      const baseName = getBaseName(file.name);
      const basePath = `projects/${formData.id}/publications/${baseName}`;

      // Upload the original file to Firebase Storage
      const storageRef = ref(storage, `${basePath}.jpg`);
      const snapshot = await uploadBytes(storageRef, file);

      // Construct the "large" size path
      const largeImagePath = `${basePath}_large.jpg`;

      // Wait for the "large" version to be processed
      const imageUrl = await waitForProcessedFile(largeImagePath);
      console.log("Processed large image URL:", imageUrl);

      // Update the publications array with the new image URL using the updater function
      setFormData((prevFormData) => {
        const updatedPublications = [...(prevFormData.publications || [])];
        updatedPublications[index].imageUrl = imageUrl;
        return { ...prevFormData, publications: updatedPublications };
      });

      console.log('Updated FormData:', formData); // Logs the updated state immediately

      setTimeout(() => handleSubmit(null, formData), 0);

    } catch (error) {
      console.error("Error uploading publication image:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle dynamic content change
  const handleContentChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const newContent = [...prevFormData.content];
      newContent[index][field] = value;
      return { ...prevFormData, content: newContent };
    });
  };

  const handleContentChangeAndSubmit = (index, field, value) => {
    setFormData((prevFormData) => {
      const newContent = [...prevFormData.content];
      newContent[index][field] = value;
      const updatedFormData = { ...prevFormData, content: newContent };

      // Call handleSubmit after ensuring formData is updated
      setTimeout(() => handleSubmit(null, updatedFormData), 0);

      return updatedFormData;
    });
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

      // Update the content array with the new image URL using the updater function
      setFormData((prevFormData) => {
        const updatedContent = [...prevFormData.content];
        updatedContent[index].url = imageUrl;
        return { ...prevFormData, content: updatedContent };
      });

      handleSubmit(); // Save the updated content

    } catch (error) {
      console.error("Error uploading content image:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Add a new content section based on selected type
  const addContentSection = (type) => {
    const newContentItem = {
      type,
      title: '',
      text: '',
      description: '',
      url: '',
      featured: false,
      published: false
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      content: [...prevFormData.content, newContentItem],
    }));
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
    setFormData((prevFormData) => {
      const contentItem = prevFormData.content[index];

      // Perform async deletion of the image if necessary
      if (contentItem.type === "image" && contentItem.url) {
        deleteContentImage(contentItem.url).catch((error) => {
          console.error("Failed to delete content image:", error);
        });
      }

      // Remove the content section
      const newContent = [...prevFormData.content];
      newContent.splice(index, 1);

      return { ...prevFormData, content: newContent };
    });
  };

  const handleSubmit = async (e, updatedFormData = null) => {
    if (e) { e.preventDefault(); }

    const dataToSubmit = updatedFormData || formData;
    // debugger;

    // Check if data has changed
    if (!isDataChanged(dataToSubmit, originalData) && !updatedFormData) {
      // No changes detected. Skipping submit
      console.log('No changes detected. Skipping submit');
      return;
    }

    try {
      let projectId = globalProjectId;
      // If creating a new project, we must first create a placeholder document to get an ID
      if (!projectId) {
        const projectRef = await addDoc(collection(db, 'projects'), {});
        projectId = projectRef.id;
        globalProjectId = projectId;
      }

      const projectData = {
        ...dataToSubmit,
        content: dataToSubmit.content || [], // Ensure content is always an array
        id: projectId,
      };
  
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, projectData);
      setFormData(projectData);
      console.log('Project saved', projectData);

      onUpdateSuccess('Project saved successfully');
      setOriginalData(dataToSubmit); // Update the original data snapshot
      onUnsavedChanges(false);

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

    // Confirm with the user
    if (!window.confirm('Are you sure you want to remove this section?')) {
      return;
    }

    setFormData((prevFormData) => {
      const newContent = [...prevFormData.content];
      newContent.splice(index, 1); // Remove the specified content section
      return { ...prevFormData, content: newContent };
    });
  };

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
              <div></div>

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
              <label htmlFor="use">Use</label>
              <MultiSelectToggleDrag options={USE_OPTIONS} selected={formData.use} onChange={(selected) => {
                setFormData(prev => ({ ...prev, use: selected }));
              }} />
            </div>

            <div className="grid-two-col">
              <div className={styles.formGroup}>
                <label htmlFor="projectType">Project Type</label>
                <MultiSelectToggleDrag
                  options={PROJECT_TYPE_OPTIONS}
                  selected={Array.isArray(formData.projectType) ? formData.projectType : (formData.projectType ? [formData.projectType] : [])}
                  onChange={(selected) => {
                    setFormData(prev => ({ ...prev, projectType: selected }));
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="status">Project Status</label>
                <select name="status" onChange={handleInputChangeAndSubmit} value={formData.status}>
                  <option value="">Select Status</option>
                  <option value="Schematic Design">Schematic Design</option>
                  <option value="Design Development">Design Development</option>
                  <option value="Construction Documentation">Construction Documentation</option>
                  <option value="Bidding and Negotiation">Bidding and Negotiation</option>
                  <option value="Construction Administration">Construction Administration</option>
                  <option value="In Permitting">In Permitting</option>
                  <option value="Planned for Construction">Planned for Construction</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Unbuilt">Unbuilt</option>
                  <option value="Built">Built</option>
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
              <label htmlFor="clientDescription">Client Description</label>
              <textarea name="clientDescription" placeholder="Client Description" rows="3" onChange={handleInputChange} onBlur={handleSubmit} value={formData.clientDescription}></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="challenge">Challenge</label>
              <textarea name="challenge" placeholder="Challenge" rows="3" onChange={handleInputChange} onBlur={handleSubmit} value={formData.challenge}></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="solution">Solution</label>
              <textarea name="solution" placeholder="Solution" rows="3" onChange={handleInputChange} onBlur={handleSubmit} value={formData.solution}></textarea>
            </div>

          </div>

          {/* Publications */}
          <div className={styles.contentSection}>
            <h3>Publications</h3>
            {formData.publications?.map((pub, index) => (
              <div key={'publication-' + index} className={styles.arrayItem}>
                <div className={`${styles.contentImageContainer} ${pub.imageUrl ? styles.hasImage : styles.noImage}`}>
                  <img
                    id={`content-image-preview-${index}`}
                    src={pub.imageUrl instanceof File ? URL.createObjectURL(pub.imageUrl) : pub.imageUrl} className={styles.contentImage} />

                  <label htmlFor={`publication-image-upload-${index}`} className={styles.uploadLabel}>Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    id={`publication-image-upload-${index}`}
                    onChange={(e) => uploadPublicationImage(index, e.target.files[0])}
                    onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                  />
                </div>

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
                <select
                  value={team.role}
                  onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                >
                  <option value="">Select Role</option>
                  {teamRoles.map((role, i) => (
                    <option key={'role-' + index + i} value={role}>{role}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Team Name"
                  value={team.name}
                  onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                />
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
                          <path d="M480-80 310-250l57-57 73 73v-206H235l73 72-58 58L80-480l169-169 57 57-72 72h206v-206l-73 73-57-57 170-170 170 170-57 57-73-73v206h205l-73-72 58-58 170 170-170 170-57-57 73-73H520v205l72-73 58 58L480-80Z" />
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

                        {contentItem.type === 'image' && (
                          <Checkbox
                            label="Featured"
                            checked={!!contentItem.featured}
                            onChange={(e) => handleContentChangeAndSubmit(index, 'featured', e.target.checked)}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                          />
                        )}

                        <button
                          type="button"
                          className="warn-btn"
                          onClick={(e) => onClickRemoveContentSection(e, index)}
                          onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                          </svg>
                        </button>
                      </div>

                    </div>

                    <div
                      className={styles.contentItemBody}
                      onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                    >

                      <div className={contentItem.type === 'image' ? styles.flexTop : 'none'}>

                        {(contentItem.type === 'text') && (
                          <div className={styles.formGroup}>
                            <label>Title</label>
                            <input
                              type="text"
                              placeholder="Title"
                              value={contentItem.title || ''}
                              onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                              onBlur={handleSubmit}
                              onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                            />
                          </div>
                        )}

                        <div>
                          {contentItem.type === 'image' && (
                            <div className={`${styles.contentImageContainer} ${contentItem.url ? styles.hasImage : styles.noImage
                              }`}>
                              <img
                                id={`content-image-preview-${index}`}
                                src={contentItem.url instanceof File ? URL.createObjectURL(contentItem.url) : contentItem.url} className={styles.contentImage} />

                              <label htmlFor={`content-image-upload-${index}`} className={styles.uploadLabel}>Upload Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                id={`content-image-upload-${index}`}
                                onChange={(e) => uploadContentImage(index, e.target.files[0])}
                                onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
                              />
                            </div>
                          )}

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
                              ></textarea>
                            </div>
                          )}
                        </div>

                        <div className={styles.flexWidth}>
                          {(contentItem.type === 'image') && (
                            <div className={styles.formGroup}>
                              <label>Title</label>
                              <input
                                type="text"
                                placeholder="Title"
                                value={contentItem.title || ''}
                                onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                                onBlur={handleSubmit}
                                onPointerDown={(e) => e.stopPropagation()} // Prevent drag interaction
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
                              />
                            </div>
                          )}
                        </div>

                      </div>

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
