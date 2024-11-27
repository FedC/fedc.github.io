import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import ToastNotification from './ToastNotification';
import AdminHeader from './AdminHeader';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { auth, db } from '../js/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  let params = useParams();
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load admin CSS
    const adminBaseCss = document.createElement('link');
    adminBaseCss.rel = 'stylesheet';
    adminBaseCss.href = '/admin-base.css'; // Ensure this path is correct
    document.head.appendChild(adminBaseCss);

    const adminCss = document.createElement('link');
    adminCss.rel = 'stylesheet';
    adminCss.href = '/admin.css'; // Ensure this path is correct
    document.head.appendChild(adminCss);

    return () => {
      // Cleanup the admin CSS when unmounting
      document.head.removeChild(adminCss);
      document.head.removeChild(adminBaseCss);
    };
  }, []);

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

  useEffect(() => {
    const fetchProjectById = async (id) => {
      const projectRef = doc(db, 'projects', id);
      const projectSnap = await getDoc(projectRef);

      if (projectSnap.exists()) {
        setSelectedProject({ id: projectSnap.id, ...projectSnap.data() });
      } else {
        console.error('No such project!');
        navigate('/'); // Redirect to home if project not found
      }
    };

    const isEditingProject = location.pathname.includes('edit-project');
    if (isEditingProject) {
      const projectId = location.pathname.split('/').pop();
      fetchProjectById(projectId);
    }
  }, [navigate]);

  const setSelectedProject = (project) => {
    setEditingProject(project);
  };

  const handleNewProjectClick = () => {
    setEditingProject(null);  // Set to null for a new project
    // setIsModalOpen(true);
    navigate('/admin/new-project');
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    // setIsModalOpen(true);
    navigate(`/admin/edit-project/${project.id}`);
  };

  // Function to handle updates from ProjectList
  const handleUpdateProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    showToast('Project updated successfully', 'success');
  };

  const closeModal = (options) => {
    setIsModalOpen(false);
    if (options?.updated) {
      fetchProjects();
      showToast('Project saved successfully', 'success');
    } else if (options?.new) {
      fetchProjects();
      showToast('Project added successfully', 'success');
    }
  };

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now(); // Unique ID for each toast
    setToasts([...toasts, { id, message, type, duration }]);

    // Auto-remove toast after duration
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div>
      <AdminHeader />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Manage Projects</h2>
                <button id="newProjectBtn" className="primary-btn mb10" onClick={handleNewProjectClick}>New Project</button>
                <ProjectList projects={projects} onEdit={handleEditProject} onUpdate={handleUpdateProjects} />
              </div>
            } />
          <Route
            path="/new-project"
            element={
              <ProjectForm
                onClose={() => navigate('/admin')}
                editingProject={null}
              />
            }
          />
          <Route
            path="/edit-project/:projectId"
            element={
              <ProjectForm
                onClose={() => navigate('/admin')}
                editingProject={editingProject}
              />
            }
          />
          <Route path="/users" element={<div>Users Management</div>} />
          <Route path="/analytics" element={<div>Analytics Overview</div>} />
          <Route path="/settings" element={<div>Settings</div>} />
        </Routes>
      
      </div>

      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default AdminPanel;