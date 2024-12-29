import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { db, storage } from '../js/firebase';
import * as styles from './ProjectForm.module.scss';
import Checkbox from './Checkbox';

const getBaseName = (fileName) => fileName.replace(/\.[^/.]+$/, ""); // Remove the extension

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

const ProjectForm = ({ onClose, editingProject }) => {
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

  const globalProjectId = editingProject?.id;

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
      imageUrl = await uploadImage(globalProjectId, file);
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

      // Cleanup old assets
      const mainImage = editingProject?.mainImage;
      if (mainImage) {
        const basePath = decodeURIComponent(mainImage.split("?")[0].split("/o/")[1]).replace(/_large\.jpg$/, "");
        await deleteOldImages(basePath);
      }

      // Upload the original file to Firebase Storage
      const storageRef = ref(storage, `${basePath}.jpg`);
      const snapshot = await uploadBytes(storageRef, file);

      // Construct the "large" size path
      const largeImagePath = `${basePath}_large.jpg`;

      // Wait for the "large" version to be processed
      const imageUrl = await waitForProcessedFile(largeImagePath);

      console.log("Processed large image URL:", imageUrl);
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

  // Uploads an image to Firebase Storage and updates content section with URL
  const uploadContentImage = async (index, file) => {
    if (!file) return;

    setLoading(true); // Start loading
    try {
      const baseName = getBaseName(file.name);
      const basePath = `projects/${formData.title}/content/${baseName}`;

      // Cleanup old assets
      if (formData.content[index]?.url) {
        const imageUrl = formData.content[index].url;
        const oldBaseName = imageUrl.split("_")[0]; // Extract old base name
        const basePath = decodeURIComponent(imageUrl.split("?")[0].split("/o/")[1]).replace(/_large\.jpg$/, "");
        await deleteOldImages(basePath);
      }

      // Upload the original file to Firebase Storage
      const storageRef = ref(storage, `${basePath}.jpg`);
      const snapshot = await uploadBytes(storageRef, file);

      // Construct the "large" size path
      const largeImagePath = `${basePath}_large.jpg`;

      // Wait for the "large" version to be processed
      const imageUrl = await waitForProcessedFile(largeImagePath);
      console.log("Processed large image URL:", imageUrl);

      // Update the content array with the "large" image URL
      const newContent = [...formData.content];
      newContent[index].url = imageUrl;
      setFormData({ ...formData, content: newContent });
    } catch (error) {
      console.error("Error uploading content image:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Add a new content section based on selected type
  const addContentSection = (type) => {
    const newContentItem = { type, title: '', text: '', description: '', url: '' };
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
    e.preventDefault();
    try {
      let projectId = globalProjectId;
      // If creating a new project, we must first create a placeholder document to get an ID
      if (!projectId) {
        const projectRef = await addDoc(collection(db, 'projects'), {}); // Placeholder
        projectId = projectRef.id;
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
      alert('Project saved successfully');

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
                  <input type="number" name="order" placeholder="Order" onChange={handleInputChange} value={formData.order || 0} className={styles.numberInput}/>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <Checkbox label="Published" checked={!!formData.published} onChange={handleInputChange} name="published" />
              </div>
            </div>

            <div className="grid-two-col">
              <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" placeholder="Project Title" onChange={handleInputChange} value={formData.title || ''} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" placeholder="Location" onChange={handleInputChange} value={formData.location || ''} />
              </div>
            </div>

            <div className="grid-two-col">
              <div className={styles.formGroup}>
                <label htmlFor="award">Award</label>
                <input type="text" name="award" placeholder="Award" onChange={handleInputChange} value={formData.award || ''} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="photoCredit">Photo Credit</label>
                <input type="text" name="photoCredit" placeholder="Photo Credit" onChange={handleInputChange} value={formData.photoCredit || ''} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role">Role</label>
              <input type="text" name="role" placeholder="Role" onChange={handleInputChange} value={formData.role || ''} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="use">Use (use comma separated for many)</label>
              <input type="text" name="use" placeholder="Use (comma separated)" onChange={handleInputChange} value={formData.use || ''} />
            </div>

            <div className="grid-two-col">
              <div className={styles.formGroup}>
                <label htmlFor="projectType">Project Type</label>
                <select id="projectType" name="projectType" onChange={handleInputChange} value={formData.projectType || ''}>
                  <option value="Historic Interior Renovation">Historic Interior Renovation</option>
                  <option value="Interior Renovation">Interior Renovation</option>
                  <option value="New Construction">New Construction</option>
                  <option value="Schematic Proposal">Schematic Proposal</option>
                  <option value="Renovation">Renovation</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="status">Project Status</label>
                <select name="status" onChange={handleInputChange} value={formData.status}>
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
                <input type="number" name="yearCompleted" placeholder="Year Completed" onChange={handleInputChange} value={formData.yearCompleted} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="area">Area (sq ft)</label>
                <input type="number" name="area" placeholder="Area (sq ft)" onChange={handleInputChange} value={formData.area || ''} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">General Description</label>
              <textarea name="description" placeholder="Description" rows={4} cols={40}
                onChange={handleInputChange} value={formData.description || ''}>
              </textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Client Description</label>
              <textarea name="clientDescription" placeholder="Client Description" rows="3" onChange={handleInputChange} value={formData.clientDescription}></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Challenge</label>
              <textarea name="challenge" placeholder="Challenge" rows="3" onChange={handleInputChange} value={formData.challenge}></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Solution</label>
              <textarea name="solution" placeholder="Solution" rows="3" onChange={handleInputChange} value={formData.solution}></textarea>
            </div>

          </div>

          {/* Publications */}
          <div className={styles.contentSection}>
            <h3>Publications</h3>
            {formData.publications.map((pub, index) => (
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
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                </svg>
                Add Publication</button>
            </div>
          </div>

          {/* Teams */}
          <div className={styles.contentSection}>
            <h3>Teams</h3>
            {formData.teams.map((team, index) => (
              <div key={'team-' + index} className={styles.arrayItem}>
                <input
                  type="text"
                  value={team}
                  placeholder="Team Member / Role"
                  onChange={(e) => handleArrayChange('teams', index, e.target.value)}
                />
                <button type="button" onClick={() => removeArrayItem('teams', index)} className='warn-btn'>Remove</button>
              </div>
            ))}
            <div className={styles.flexRight}>
              <button type="button" onClick={() => addArrayItem('teams')} className={styles.iconButton}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                </svg>
                Add Team</button>
            </div>
          </div>

          {/* Dynamic content sections */}
          {formData.content.map((contentItem, index) => (
            <div key={'content-' + index} className={styles.contentSection}>

              <div className={styles.flex}>
                <h3>{capitalize(contentItem.type)} Section</h3>

                <button type="button" className="warn-btn" onClick={() => handleRemoveContentSection(index)}>
                  Remove
                </button>
              </div>

              {/* Title (only for text and image types) */}
              {(contentItem.type === 'image' || contentItem.type === 'text') && (
                <div className={styles.formGroup}>
                  <label>Image Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={contentItem.title || ''}
                    onChange={(e) => handleContentChange(index, 'title', e.target.value)}
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
                  ></textarea>
                </div>
              )}
            </div>
          ))}

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
