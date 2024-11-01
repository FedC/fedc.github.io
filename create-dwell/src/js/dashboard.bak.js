import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from './firebase.js';
import { doc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';

async function fetchProjects() {
  const querySnapshot = await getDocs(collection(db, 'projects'));
  const projects = [];
  querySnapshot.forEach(doc => {
    console.log(doc.data());
    // Display project data in the admin UI
    projects.push(doc.data());
  });

  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = ''; // Clear existing projects
  projects.forEach(project => {
    const projectElement = document.createElement('div');
    // populate as table
    projectElement.innerHTML = `
      <table style="">
        <tr>
          <th style="">Title</th>
          <th style="">Location</th>
          <th style="">Area</th>
          <th style="">Award</th>
          <th style="">Photo Credit</th>
          <th style="">Role</th>
          <th style="">Type</th>
          <th style="">Use</th>
          <th style="">Order</th>
          <th style="">Actions</th>
        </tr>
        <tr onclick="viewProject('${doc.id}')">
          <td style="">${project.title}</td>
          <td style="">${project.location}</td>
          <td style="">${project.area}</td>
          <td style="">${project.award}</td>
          <td style="">${project.photoCredit}</td>
          <td style="">${project.role}</td>
          <td style="">${project.projectType}</td>
          <td style="">${project.use.join(', ')}</td>
          <td style="">${project.order}</td>
          <td style="">
            <button class="accent-btn" onclick="publishProject('${doc.id}'); event.stopPropagation()">Publish</button>
            <button class="warn-btn" onclick="deleteProject('${doc.id}'); event.stopPropagation()">Delete</button>
          </td>
        </tr>
      </table>`;

    projectsList.appendChild(projectElement);
  });
}

async function uploadImage(projectId, file) {
  // Create a storage reference
  const storageRef = ref(storage, `projects/${projectId}/${file.name}`);

  // Upload the file to Firebase Storage
  const snapshot = await uploadBytes(storageRef, file);

  // Get the URL of the uploaded image
  const imageUrl = await getDownloadURL(snapshot.ref);

  // Update Firestore with the new image URL in the project document
  const projectDocRef = doc(db, 'projects', projectId);
  await updateDoc(projectDocRef, {
    content: arrayUnion({
      type: 'image',
      url: imageUrl,
      title: "New Image Title", // Add this based on the user input
      description: "New Image Description" // Add this based on the user input
    })
  });

  console.log('Image uploaded and Firestore updated with:', imageUrl);
}

window.uploadImage = uploadImage;
window.fetchProjects = fetchProjects;

fetchProjects();

publishProject = async (projectId) => {
  const projectDocRef = doc(db, 'projects', projectId);
  await updateDoc(projectDocRef, { published: true });
  console.log('Project published:', projectId);
};

deleteProject = async (projectId) => {
  const projectDocRef = doc(db, 'projects', projectId);
  await deleteDoc(projectDocRef);
  console.log('Project deleted:', projectId);
  fetchProjects(); // Refresh the project list
};

viewProject = (projectId) => {
  // Implement view project functionality
  console.log('View project:', projectId);
};

window.deleteProject = deleteProject;
window.publishProject = publishProject;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
      window.location.href = "/admin-login";
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  });

  document.getElementById('projectForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    /*
    {
  "title": "Modern Museum",
  "location": "New York, USA",
  "area": 5000, // Area in sq ft
  "award": "Best Architectural Design 2023",
  "photoCredit": "John Doe Photography",
  "mainImage": "gs://create-dwell.appspot.com/projects/project1/main.jpg",
  "role": "Project Architect: Donald Singer",
  "use": ["Residential", "Cultural"],
  "order": 1,
  "projectType": "Historic Interior Renovation", // New field for project type
  "content": [
    {
      "type": "image",
      "url": "gs://create-dwell.appspot.com/projects/project1/img1.jpg",
      "title": "Museum Exterior",
      "description": "A modern look at the museum’s exterior."
    },
    {
      "type": "quote",
      "text": "The museum is a place where art and nature coexist harmoniously."
    },
    {
      "type": "text",
      "title": "Project Overview",
      "text": "The design of the museum showcases Suzhou’s Garden tradition as part of the exhibitions, taking visitors on a journey and exploration of art, nature, and water."
    }
  ]
}*/
    const projectData = {
      title: document.getElementById('title').value,
      location: document.getElementById('location').value,
      area: Number(document.getElementById('area').value),
      projectType: document.getElementById('projectType').value,
      description: document.getElementById('description').value,
      createdAt: new Date(),
      content: [], // Initialize with an empty array for content
      projectType: document.getElementById('projectType').value,
      award: document.getElementById('award').value,
      photoCredit: document.getElementById('photoCredit').value,
      role: document.getElementById('role').value,
      use: document.getElementById('use').value.split(','), // Assuming use is a comma-separated string
      order: Number(document.getElementById('order').value),
      mainImage: document.getElementById('mainImage').value // Assuming this is a URL or path
    };

    // Save the project data to Firestore
    try {
      const docRef = await addDoc(collection(db, 'projects'), projectData);
      console.log('Project saved with ID:', docRef.id);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  });

  document.querySelector('#newProjectBtn').addEventListener('click', () => {
    document.getElementById('projectForm').reset(); // Reset the form
    document.getElementById('projectModal').style.display = 'block'; // Show the form
  });

  document.querySelector('#closeProjectModalBtn').addEventListener('click', () => {
    document.getElementById('projectForm').reset(); // Reset the form
    document.getElementById('projectModal').style.display = 'none'; // Hide the form
  });
});
