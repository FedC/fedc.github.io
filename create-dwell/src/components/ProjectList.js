import React from 'react';

const ProjectList = ({ projects, onEdit }) => {

  const onClickPublish = (e, project) => {
    e.stopPropagation();
    console.log('Publish', project);
  }

  const onClickDelete = (e, project) => {
    e.stopPropagation();
    console.log('Delete', project);
  }

  return (
    <div id="projectsList">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Area</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} onClick={() => onEdit(project)}>
              <td>{project.title}</td>
              <td>{project.location}</td>
              <td>{project.area}</td>
              <td className='td-actions'>
                <button className='accent-btn' onClick={(e) => onClickPublish(e,project)}>Publish</button>
                <button className='warn-btn' onClick={(e) => onClickDelete(e, project)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
