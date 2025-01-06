import React, { useState, useEffect } from 'react';
import { db, storage } from '../js/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as styles from './AboutForm.module.scss';
import { title } from 'process';

const AboutForm = ({ onUpdateSuccess, onClose }) => {
  const [sections, setSections] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [newSection, setNewSection] = useState({ title: '', subTitle: '', content: '', bullets: [] });
  const [loading, setLoading] = useState(false);

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

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleAddBullet = (index, bullet) => {
    const updatedSections = [...sections];
    updatedSections[index].bullets.push(bullet);
    setSections(updatedSections);
  };

  const handleAddParagraph = (index, paragraph) => {
    const updatedSections = [...sections];
    updatedSections[index].paragraphs = [
      ...(updatedSections[index].paragraphs || []),
    ];
    updatedSections[index].paragraphs.push(paragraph);
    setSections(updatedSections);
  };

  const handleRemoveBullet = (sectionIndex, bulletIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].bullets.splice(bulletIndex, 1);
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, newSection]);
    setNewSection({ title: '', subTitle: '', content: '', bullets: [] });
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
      await setDoc(doc(db, 'about', 'main'), { sections, imageUrl, aboutText, title, description });
      console.log('About content saved successfully');
      onUpdateSuccess('About content saved successfully');
    } catch (error) {
      console.error('Error saving about content:', error);
    } finally {
      setLoading(false);
    }
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
        {/* <div className={styles.flexRight}>
          <button onClick={handleAddSection}>Add New Section</button>
        </div> */}
        {sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <input
              type="text"
              placeholder="Title"
              value={section.title}
              onBlur={saveAbout}
              onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
            />
            <input
              type="text"
              placeholder="SubTitle"
              value={section.subTitle}
              onBlur={saveAbout}
              onChange={(e) => handleSectionChange(index, 'subTitle', e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={section.content}
              onBlur={saveAbout}
              onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
            />
            <div className={styles.bullets}>
              {section.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex}>
                  <input
                    type="text"
                    value={bullet}
                    onBlur={saveAbout}
                    onChange={(e) => {
                      const updatedSections = [...sections];
                      updatedSections[index].bullets[bulletIndex] = e.target.value;
                      setSections(updatedSections);
                    }}
                  />
                  <button onClick={() => handleRemoveBullet(index, bulletIndex)}>Remove</button>
                </div>
              ))}
              <button onClick={() => handleAddBullet(index, '')}>Add Bullet</button>
              <button onClick={() => handleAddParagraph(index, '')}>Add Paragraph</button>
            </div>

            {/* paragraphs */}
            {section.paragraphs && section.paragraphs.map((paragraph, paragraphIndex) => (
              <div key={paragraphIndex}>
                <textarea
                  placeholder="Paragraph"
                  value={paragraph}
                  onBlur={saveAbout}
                  onChange={(e) => {
                    const updatedSections = [...sections];
                    updatedSections[index].paragraphs[paragraphIndex] = e.target.value;
                    setSections(updatedSections);
                  }}
                />
              </div>
            ))}

            {/* <button onClick={() => handleRemoveSection(index)}>Remove Section</button> */}
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
  );
};

export default AboutForm;