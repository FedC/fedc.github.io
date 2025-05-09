import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { db, storage } from '../js/firebase';
import * as styles from './ContactAdmin.module.scss';

const ContactAdmin = ({ onClose, onUpdateSuccess }) => {
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const docRef = doc(db, 'about', 'main');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setMainImage(snapshot.data().mainImageUrl || '');
        setPreviewUrl(snapshot.data().mainImageUrl || '');
      }
    };
    fetchImage();
  }, []);

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setLoading(true);

    try {
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const basePath = `contact/${baseName}`;
      const storageRef = ref(storage, `${basePath}.jpg`);
      await uploadBytes(storageRef, file);

      const largeImagePath = `${basePath}_large.jpg`;
      const waitForProcessedFile = async (path) => {
        const fileRef = ref(storage, path);
        try {
          await getMetadata(fileRef);
          return await getDownloadURL(fileRef);
        } catch (err) {
          if (err.code === 'storage/object-not-found') {
            return new Promise((resolve) =>
              setTimeout(() => resolve(waitForProcessedFile(path)), 1000)
            );
          }
          throw err;
        }
      };

      const imageUrl = await waitForProcessedFile(largeImagePath);

      const docRef = doc(db, 'about', 'main');
      await updateDoc(docRef, { mainImageUrl: imageUrl });
      setMainImage(imageUrl);
      onUpdateSuccess?.('Main image updated successfully.');
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.projectForm}>
      <div className={styles.projectHeader}>
        <button onClick={onClose} className={styles.backButton}>
          <span>Back</span>
        </button>
        <h2>Contact Admin</h2>
      </div>

      <div className={styles.formContent}>

        <div className={styles.mainImageContainer}>
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className={styles.mainImage} />
          )}
          <label htmlFor="mainImageUpload" className={styles.uploadLabel}>
            {mainImage ? 'Replace Image' : 'Upload Image'}
          </label>
          <input
            type="file"
            id="mainImageUpload"
            accept="image/*"
            onChange={handleMainImageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactAdmin;