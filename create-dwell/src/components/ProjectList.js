import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../js/firebase';
import * as styles from './ProjectList.module.scss';

const ProjectList = ({ projects, onEdit, onUpdate }) => {

  const onTogglePublished = async (e, project) => {
    e.stopPropagation();

    // Optimistically update the UI
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? { ...p, published: e.target.checked } : p
    );
    onUpdate(updatedProjects);

    try {
      // Persist the change in Firestore
      const projectRef = doc(db, "projects", project.id);
      await updateDoc(projectRef, { published: e.target.checked });
      console.log(`Project ${project.id} published status updated to: ${e.target.checked}`);
    } catch (error) {
      console.error("Error updating project publish status:", error);

      // Revert the UI state if the Firestore update fails
      const revertedProjects = projects.map((p) =>
        p.id === project.id ? { ...p, published: !e.target.checked } : p
      );
      onUpdate(revertedProjects);
    }
  };

  const onClickDelete = (e, project) => {
    e.stopPropagation();
    console.log('Delete', project);
  }

  const getSmallSizeUrl = (url) => {
    return url.replace('_large', '_small');
  }

  return (
    <div id="projectsList">
      <table>
        <thead>
          <tr>
            <th>Main Image</th>
            <th>Title</th>
            <th>Location</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            // todo: add class to row if project is not published
            <tr key={project.id} onClick={() => onEdit(project)} >
              <td>
                {project.mainImage && (
                  <img
                    id="main-image-preview"
                    src={project.mainImage instanceof File ? URL.createObjectURL(project.mainImage) : getSmallSizeUrl(project.mainImage)}
                    alt="Main Image"
                    className={styles.mainImage}
                  />
                )}
              </td>
              <td>{project.title}</td>
              <td>{project.location}</td>
              <td onClick={(e) => e.stopPropagation()}>
                {<input type='checkbox' checked={project.published} onChange={(e) => onTogglePublished(e, project)}  /> }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
