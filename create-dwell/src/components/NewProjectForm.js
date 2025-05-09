import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../js/firebase';
import * as styles from './NewProjectForm.module.scss';

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create a new project with minimal initial data
      // Step 1: Create project with temporary fields
      const docRef = await addDoc(collection(db, 'projects'), {
        title: projectName.trim(),
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
        publications: [],
        teams: [],
      });

      // Step 2: Immediately update it to set the id
      await updateDoc(doc(db, 'projects', docRef.id), {
        id: docRef.id,
      });

      // Navigate to edit page with the new project ID
      navigate(`/admin/edit-project/${docRef.id}`);
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.newProjectForm}>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            disabled={isSubmitting}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectForm; 