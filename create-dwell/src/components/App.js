import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { auth, db } from '../js/firebase';
import { collection, getDocs } from 'firebase/firestore';

const App = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        window.location.href = "/admin-login";
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projectData = [];
    querySnapshot.forEach((doc) => {
      projectData.push({ id: doc.id, ...doc.data() });
    });
    setProjects(projectData);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleNewProjectClick = () => {
    setEditingProject(null);  // Set to null for a new project
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const closeModal = (options) => {
    setIsModalOpen(false);
    if (options?.updated) {
      fetchProjects();
    } else if (options?.new) {
      fetchProjects();
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Manage Projects</h2>
        <button id="newProjectBtn" className="primary-btn mb10" onClick={handleNewProjectClick}>New Project</button>
        {isModalOpen && <ProjectForm onClose={closeModal} editingProject={editingProject} />}
        <ProjectList projects={projects} onEdit={handleEditProject} />
        
      </div>
    </div>
  );
};

export default App;
