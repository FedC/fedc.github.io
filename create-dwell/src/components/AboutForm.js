import React, { useState, useEffect } from 'react';
import { db, storage } from '../js/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as styles from './AboutForm.module.scss';
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

const SortableContent = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const transformString = CSS.Transform.toString(transform) || '';

  // Safely extract translate3d part
  const match = transformString.match(/translate3d\(([^)]+)\)/);
  const translate3d = match ? match[0] : ''; // Use the entire match if found, otherwise fallback to an empty string

  console.log(translate3d); // Debugging log

  const style = {
    transform: translate3d, // Use translate3d part only
    transition: transition || 'transform 250ms ease',
    zIndex: 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.sortableContent}>
      <button className={styles.dragButton} {...listeners} {...attributes}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ccc">
          <path d="M480-80 310-250l57-57 73 73v-206H235l73 72-58 58L80-480l169-169 57 57-72 72h206v-206l-73 73-57-57 170-170 170 170-57 57-73-73v206h205l-73-72 58-58 170 170-170 170-57-57 73-73H520v205l72-73 58 58L480-80Z" />
        </svg>
      </button>
      <div className={styles.contentInner}>{children}</div>
    </div>
  );
};

const AboutForm = ({ onUpdateSuccess, onClose }) => {
  const [sections, setSections] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [newSection, setNewSection] = useState({ title: '', subTitle: '', content: '', bullets: [] });
  const [loading, setLoading] = useState(false);
  const [draggingSection, setDraggingSection] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    const fetchAbout = async () => {
      const aboutDoc = await getDoc(doc(db, 'about', 'main'));
      if (aboutDoc.exists()) {
        const data = aboutDoc.data();
        setSections(data.sections || []);
        setImageUrl(data.imageUrl || '');
        setAboutText(data.aboutText || '');
        setDescription(data.description || '');
        setTitle(data.title || '');

      }
    };

    fetchAbout();
  }, []);

  const handleDragEndContent = (sectionIndex, { active, over }) => {
    if (!over || active.id === over.id) return;

    const updatedSections = [...sections];
    const contentArray = updatedSections[sectionIndex].content;

    const oldIndex = contentArray.findIndex((item) => item.id === active.id);
    const newIndex = contentArray.findIndex((item) => item.id === over.id);
    updatedSections[sectionIndex].content = arrayMove(contentArray, oldIndex, newIndex);

    setSections(updatedSections);
    saveAbout();
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleContentChange = (sectionIndex, contentIndex, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].content[contentIndex][field] = value;
    setSections(updatedSections);
    saveAbout();
  };

  const handleAddContent = (sectionIndex, type) => {
    const updatedSections = [...sections];
    const newContent =
      type === 'paragraph'
        ? { type: 'paragraph', text: '', id: `p-${Date.now()}` }
        : type === 'subtitle' ? { type: 'subtitle', text: '', id: `s-${Date.now()}` }
          : { type: 'bullets', bullets: [], id: `b-${Date.now()}` };
    updatedSections[sectionIndex].content.push(newContent);
    setSections(updatedSections);
    saveAbout();
  };

  const handleRemoveContent = (sectionIndex, contentIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].content.splice(contentIndex, 1);
    setSections(updatedSections);
  };

  const handleAddBullet = (sectionIndex, contentIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].content[contentIndex].bullets.push('');
    setSections(updatedSections);
  };

  const handleRemoveBullet = (sectionIndex, contentIndex, bulletIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].content[contentIndex].bullets.splice(bulletIndex, 1);
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    const updatedSections = [...sections];
    updatedSections.push({ title: '', subTitle: '', content: [], imageUrl: '' });
    setSections(updatedSections);
  };

  const handleRemoveSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);

    if (!file) {
      console.error('No file selected.');
      return;
    }

    handleImageUpload(file);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    setLoading(true);
    try {
      const fileName = file.name;
      const baseName = fileName.replace(/\.[^/.]+$/, ''); // Remove extension
      const filePath = `about/${fileName}`; // Path in Firebase Storage
      const storageRef = ref(storage, filePath);

      // Upload the original file
      const metadata = { contentType: file.type };
      await uploadBytes(storageRef, file, metadata);
      console.log(`Image uploaded: ${filePath}`);

      // Construct the expected resized image path for the medium size
      const mediumPath = `about/${baseName}_medium.jpg`;
      const mediumRef = ref(storage, mediumPath);

      // Wait for the resized file to be generated
      const mediumImageUrl = await waitForProcessedFile(mediumPath);
      console.log(`Medium image URL: ${mediumImageUrl}`);

      // Update the state
      setImageUrl(mediumImageUrl);

      // Save the image URL to Firestore
      await setDoc(doc(db, 'about', 'main'), {
        sections, imageUrl: mediumImageUrl,
        aboutText,
        title,
        description,
      }, { merge: true });
      console.log('Image URL saved to Firestore');
      onUpdateSuccess('Image uploaded successfully');

    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const waitForProcessedFile = async (filePath) => {
    const fileRef = ref(storage, filePath);
    try {
      return await getDownloadURL(fileRef); // Check if the file exists and get its URL
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        // Retry after 1 second if the file is not yet available
        console.log(`Waiting for ${filePath}...`);
        return new Promise((resolve) =>
          setTimeout(() => resolve(waitForProcessedFile(filePath)), 1000)
        );
      }
      throw error; // Rethrow other errors
    }
  };

  const handleAboutTextChange = (e) => {
    setAboutText(e.target.value);
  };

  const saveAbout = async () => {
    if (!imageUrl) {
      console.error('No image URL available. Please upload an image.');
      return;
    }

    setLoading(true);

    try {
      // Remove undefined values from sections
      const sanitizedSections = sections.map((section) => {
        const sanitizedContent = section.content.map((content) => ({
          ...content,
          bullets: content.bullets || [], // Ensure bullets is an array
          text: content.text || '', // Ensure text is a string
        }));

        const data = {
          ...section,
          content: sanitizedContent, // Replace with sanitized content
          imageUrl: section.imageUrl || '', // Ensure imageUrl is a string
        };
        delete data.image;
        return data;
      });

      console.log('Sanitized Data:', {
        sections: sanitizedSections,
        imageUrl,
        aboutText,
        title,
        description,
      });

      await setDoc(
        doc(db, 'about', 'main'),
        {
          sections: sanitizedSections,
          imageUrl,
          aboutText: aboutText || '', // Ensure aboutText is a string
          title: title || '', // Ensure title is a string
          description: description || '', // Ensure description is a string
        },
        { merge: true }
      );

      console.log('About content saved successfully');
      onUpdateSuccess('About content saved successfully');
    } catch (error) {
      console.error('Error saving about content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionImageFileChange = async (e, sectionIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update preview image immediately
    const updatedSections = [...sections];
    updatedSections[sectionIndex].image = file; // Only for preview
    setSections(updatedSections);

    // Upload image and get URL
    const imageUrl = await uploadSectionImage(sectionIndex, file);

    // Update section with the final image URL
    updatedSections[sectionIndex].imageUrl = imageUrl; // URL for Firestore
    updatedSections[sectionIndex].image = undefined; // Remove File object
    setSections(updatedSections);

    saveAbout();
  };

  // Helper function to upload image to Firebase Storage and get URL
  const uploadSectionImage = async (sectionIndex, file) => {
    if (!file) return;

    setLoading(true); // Start loading
    try {
      const baseName = getBaseName(file.name);
      const basePath = `about/sections/${baseName}`;

      // Upload the original file to Firebase Storage
      const storageRef = ref(storage, `${basePath}.jpg`);
      await uploadBytes(storageRef, file);

      // Construct the "medium" size path
      const mediumImagePath = `${basePath}_medium.jpg`;

      // Wait for the "medium" version to be processed
      const imageUrl = await waitForProcessedFile(mediumImagePath);

      console.log(`Processed medium image URL for section ${sectionIndex}:`, imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image for section:", error);
      throw error;
    } finally {
      setLoading(false); // End loading
    }
  };

  // Helper function to extract base name from a file
  const getBaseName = (fileName) => {
    return fileName.replace(/\.[^/.]+$/, ""); // Remove file extension
  };

  const onClickClose = () => {
    onClose();
  };

  return (
    <div className={styles.aboutForm}>

      <div className={styles.aboutHeader}>

        <h2>Manage About Content</h2>

        <button type="submit" className={styles.saveButton} onClick={saveAbout} disabled={loading}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" /></svg>
          <span>{loading ? "Uploading..." : "Save"}</span>
        </button>
      </div>

      <div className={styles.aboutFormContent}>

        <div className={styles.sections}>
          <div className={styles.section}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea name="description" placeholder="Description" rows={5} cols={40} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>
        </div>

        <div className={styles.sections}>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={styles.section}>
              <input
                type="text"
                placeholder="Title"
                value={section.title}
                onBlur={saveAbout}
                onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
              />

              {/* Image Upload for Section */}
              <div className={styles.imageUpload}>
                {section.imageUrl ? (
                  <img
                    src={section.imageUrl instanceof File ? URL.createObjectURL(section.imageUrl) : section.imageUrl}
                    alt={`Section ${sectionIndex} Image`}
                    className={styles.sectionImage}
                  />
                ) : (
                  <span>No image uploaded</span>
                )}

                <label htmlFor={`section-image-upload-${sectionIndex}`} className={styles.uploadLabel}>Upload Image</label>
                <input type="file" name="mainImage" id={`section-image-upload-${sectionIndex}`}
                  onChange={(e) => handleSectionImageFileChange(e, sectionIndex)} />
              </div>

              <input
                type="text"
                placeholder="SubTitle"
                value={section.subTitle}
                onBlur={saveAbout}
                onChange={(e) => handleSectionChange(sectionIndex, 'subTitle', e.target.value)}
              />

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleDragEndContent(sectionIndex, event)}
              >
                <SortableContext
                  items={section.content.map((content) => content.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {section.content.map((content, contentIndex) => (
                    <SortableContent key={content.id} id={content.id}>
                      <div className={styles.contentItem}>
                        {content.type === 'paragraph' && (
                          <textarea
                            placeholder="Paragraph"
                            value={content.text}
                            onBlur={saveAbout}
                            onChange={(e) =>
                              handleContentChange(sectionIndex, contentIndex, 'text', e.target.value)
                            }
                          />
                        )}
                        {content.type === 'subtitle' && (
                          <input type="text" value={content.text} onBlur={saveAbout}
                            onChange={(e) => handleContentChange(sectionIndex, contentIndex, 'text', e.target.value)} />
                        )}
                        {content.type === 'bullets' && (
                          <div className={styles.bullets}>
                            {content.bullets.map((bullet, bulletIndex) => (
                              <div key={bulletIndex} className={styles.bullet}>
                                <input
                                  type="text"
                                  value={bullet}
                                  onBlur={saveAbout}
                                  onChange={(e) => {
                                    const updatedBullets = [...content.bullets];
                                    updatedBullets[bulletIndex] = e.target.value;
                                    handleContentChange(
                                      sectionIndex,
                                      contentIndex,
                                      'bullets',
                                      updatedBullets
                                    );
                                  }}
                                />
                                <button className={styles.warn}
                                  onClick={() =>
                                    handleRemoveBullet(sectionIndex, contentIndex, bulletIndex)
                                  }
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                </button>
                              </div>
                            ))}
                            <button onClick={() => handleAddBullet(sectionIndex, contentIndex)} className={styles.iconButton}>
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                            </button>
                          </div>
                        )}

                        <div className={styles.flexRight}>
                          <button className={styles.warn}
                            onClick={() => handleRemoveContent(sectionIndex, contentIndex)}
                            title={'Remove ' + content.type === 'paragraph' ? 'paragraph' : 'bullets'}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                            </svg>
                          </button>
                        </div>

                      </div>
                    </SortableContent>
                  ))}
                </SortableContext>
              </DndContext>

              <div className={styles.contentActions}>
                <button className={styles.iconButton} onClick={() => handleAddContent(sectionIndex, 'subtitle')}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M360-240v-80h480v80H360Zm0-200v-80h480v80H360ZM120-640v-80h720v80H120Z" /></svg>
                  <span>Add Subtitle</span>
                </button>
                <button className={styles.iconButton} onClick={() => handleAddContent(sectionIndex, 'paragraph')}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M360-240v-80h480v80H360Zm0-200v-80h480v80H360ZM120-640v-80h720v80H120Z" /></svg>
                  <span>Add Paragraph</span>
                </button>
                <button className={styles.iconButton} onClick={() => handleAddContent(sectionIndex, 'bullets')}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" /></svg>
                  <span>Add Bullets</span>
                </button>
              </div>

              {/* <button className={styles.warn} onClick={() => handleRemoveSection(sectionIndex)}>Remove Section</button> */}
              {/* handleAddSection */}
              <button className={styles.iconButton} onClick={() => handleAddSection()}>Add Section</button>

            </div>
          ))}
        </div>

        <div className={styles.aboutAuthorSection}>
          <div className={styles.imageContainer}>
            {imageUrl && (
              <img
                id="about-image-preview"
                src={imageUrl instanceof File ? URL.createObjectURL(imageUrl) : imageUrl}
                alt="About Image"
                className={styles.aboutImage}
              />
            )}

            <label htmlFor="about-image-upload" className={styles.uploadLabel}>Upload Image</label>
            <input type="file" name="aboutImage" id="about-image-upload" onChange={onFileChange} />
          </div>

          <div className={styles.section}>
            <div className={styles.formGroup}>
              <label htmlFor="aboutText">About the Architect</label>
              <textarea name="aboutText" placeholder="About the architect" rows={25} cols={40}
                onChange={handleAboutTextChange} onBlur={saveAbout} value={aboutText || ''}>
              </textarea>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AboutForm;