import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../js/firebase';
import styles from './ProjectForm.module.scss';

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
  });

  useEffect(() => {
    if (editingProject) {
      setFormData((prevData) => ({
        ...prevData, // retain default structure
        ...editingProject, // update with project data
      }));
    }
  }, [editingProject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, mainImage: e.target.files[0] });
  };

  // Helper function to upload image to Firebase Storage and get URL
  const uploadImage = async (projectId, file) => {
    const storageRef = ref(storage, `projects/${projectId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
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

    try {
      const storageRef = ref(storage, `projects/${formData.title}/content/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Update the content array with the image URL
      const newContent = [...formData.content];
      newContent[index].url = imageUrl;
      setFormData({ ...formData, content: newContent });
    } catch (error) {
      console.error('Error uploading content image:', error);
    }
  };

  // Add a new content section based on selected type
  const addContentSection = (type) => {
    const newContentItem = { type, title: '', text: '', description: '', url: '' };
    setFormData({ ...formData, content: [...formData.content, newContentItem] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let projectId = editingProject ? editingProject.id : null;
      // If there's a mainImage file, upload it first
      let imageUrl = formData.mainImage;
      if (formData.mainImage && formData.mainImage instanceof File) {
        // If creating a new project, we must first create a placeholder document to get an ID
        if (!projectId) {
          const projectRef = await addDoc(collection(db, 'projects'), {}); // Placeholder
          projectId = projectRef.id;
        }

        // Upload image and get URL
        imageUrl = await uploadImage(projectId, formData.mainImage);
      }

      const projectData = {
        ...formData,
        mainImage: imageUrl, // Store the image URL in Firestore
      };

      if (editingProject) {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, projectData);
        console.log('Project updated', projectData);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        console.log('Project saved', projectData);
      }

      onClose({ updated: !!editingProject, new: !editingProject });
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
    <section className="modal" onClick={onClickClose}>
      <div className="modal-content" onClick={stopPropagation}>
        <div className="modal-header">
          <h2>
            {editingProject ? `Edit Project: ${formData.title}` : 'New Project'}
          </h2>
          <button className="close-btn" onClick={onClickClose}>
            <span>&times;</span>
          </button>
        </div>

        <div className={styles.mainImageContainer}>
          {formData.mainImage && (
            <img
              src={formData.mainImage instanceof File ? URL.createObjectURL(formData.mainImage) : formData.mainImage}
              alt="Main Image"
              className={styles.mainImage}
            />
          )}

          <label htmlFor="main-image-upload" className={styles.uploadLabel}>Upload Project Main Image</label>
          <input type="file" name="mainImage" id="main-image-upload" onChange={handleFileChange} />
        </div>


        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={formData.id} />
          <div className={styles.formGroup}>
            <label htmlFor="published">Published</label>
            <input type="checkbox" name="published" id="published" onChange={handleInputChange} checked={formData.published} />
          </div>

          <div className="grid-two-col">
            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" placeholder="Project Title" onChange={handleInputChange} value={formData.title} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="location">Location</label>
              <input type="text" name="location" placeholder="Location" onChange={handleInputChange} value={formData.location} />
            </div>
          </div>

          <div className="grid-two-col">
            <div className={styles.formGroup}>
              <label htmlFor="award">Award</label>
              <input type="text" name="award" placeholder="Award" onChange={handleInputChange} value={formData.award} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="photoCredit">Photo Credit</label>
              <input type="text" name="photoCredit" placeholder="Photo Credit" onChange={handleInputChange} value={formData.photoCredit} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">Role</label>
            <input type="text" name="role" placeholder="Role" onChange={handleInputChange} value={formData.role} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="use">Use</label>
            <input type="text" name="use" placeholder="Use (comma separated)" onChange={handleInputChange} value={formData.use} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="order">Order</label>
            <input type="number" name="order" placeholder="Order" onChange={handleInputChange} value={formData.order} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="projectType">Project Type</label>
            <select id="projectType" name="projectType" onChange={handleInputChange} value={formData.projectType}>
              <option value="Historic Interior Renovation">Historic Interior Renovation</option>
              <option value="Interior Renovation">Interior Renovation</option>
              <option value="New Construction">New Construction</option>
              <option value="Schematic Proposal">Schematic Proposal</option>
              <option value="Renovation">Renovation</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="area">Area (sq ft)</label>
            <input type="number" name="area" placeholder="Area (sq ft)" onChange={handleInputChange} value={formData.area} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea name="description" placeholder="Description" rows={4} cols={40}
              defaultValue={formData.description}
              onChange={handleInputChange} value={formData.description}>
            </textarea>
          </div>

          {/* Dynamic content sections */}
          {formData.content.map((contentItem, index) => (
            <div key={index} className={styles.contentSection}>

              <div className={styles.flex}>
                <h3>{capitalize(contentItem.type)} Section</h3>

                <button type="button" className="warn-btn" onClick={() => setFormData({ ...formData, content: formData.content.filter((_, i) => i !== index) })}>
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
                    value={contentItem.title}
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
                    value={contentItem.description}
                    onChange={(e) => handleContentChange(index, 'description', e.target.value)}
                  />
                </div>
              )}

              {/* URL (only for image type) */}
              {contentItem.type === 'image' && (
                <div className={styles.contentImageContainer}>
                  <img src={contentItem.url instanceof File ? URL.createObjectURL(contentItem.url) : contentItem.url} alt="Upload Image" className={styles.contentImage} />

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
                    value={contentItem.text}
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

          <button type="submit" className={styles.submitButton}>Save Project</button>
        </form>
      </div>
    </section>
  );
};

export default ProjectForm;
