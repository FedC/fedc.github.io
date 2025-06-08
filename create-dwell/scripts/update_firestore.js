const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// async function updateFirestore() {
//   const batch = db.batch(); // Use batch for better performance

//   projects.forEach((project) => {
//     const docRef = db.collection('projects').doc(); // Generate a unique ID for each project
//     batch.set(docRef, project);
//   });

//   try {
//     await batch.commit();
//     console.log('All projects have been successfully added to Firestore.');
//   } catch (error) {
//     console.error('Error adding projects to Firestore:', error);
//   }
// }

// updateFirestore();

// async function updateProjects() {
//   try {
//     const projectsSnapshot = await db.collection('projects').get();

//     const batch = db.batch();
//     projectsSnapshot.forEach((doc) => {
//       const project = doc.data();

//       // Modify only the `content` array
//       if (project.content && Array.isArray(project.content)) {
//         project.content = project.content.map((contentItem) => ({
//           ...contentItem,
//           published: true,
//         }));
//       }

//       // Add the update to the batch
//       const docRef = db.collection('projects').doc(doc.id);
//       batch.set(docRef, { content: project.content }, { merge: true }); // Merge updates only
//     });

//     await batch.commit();
//     console.log('All projects updated successfully.');
//   } catch (error) {
//     console.error('Error updating projects:', error);
//   }
// }

// updateProjects();

// async function populateFeaturedCollection() {
//   try {
//     const projectsSnapshot = await db.collection('projects').get();

//     const batch = db.batch(); // Use batch for better performance
//     let order = 0; // Initialize order for featured images

//     projectsSnapshot.forEach((doc) => {
//       const project = doc.data();
//       const projectId = doc.id;

//       // Add the main image as a featured image if it exists
//       if (project.mainImage) {
//         const featuredDocRef = db.collection('featured').doc(); // Generate a new document ID
//         batch.set(featuredDocRef, {
//           projectId,
//           type: 'main',
//           contentIndex: null,
//           imageUrl: project.mainImage,
//           order: order++,
//         });
//       }

//       // Add featured images from the content array
//       if (project.content && Array.isArray(project.content)) {
//         project.content.forEach((contentItem, index) => {
//           if (contentItem.type === 'image' && contentItem.featured) {
//             const featuredDocRef = db.collection('featured').doc(); // Generate a new document ID
//             batch.set(featuredDocRef, {
//               projectId,
//               type: 'content',
//               contentIndex: index,
//               imageUrl: contentItem.url,
//               order: order++,
//             });
//           }
//         });
//       }
//     });

//     await batch.commit();
//     console.log('Featured collection populated successfully.');
//   } catch (error) {
//     console.error('Error populating featured collection:', error);
//   }
// }

// populateFeaturedCollection();

async function updateProjects() {
  try {
    const projectsSnapshot = await db.collection('projects').get();
    const aboutSnapshot = await db.collection('about').get();
    const batch = db.batch();
    

    console.log(aboutSnapshot.docs);

    // const docid = '02rukrjrNlSZsOyKAfgu';

    // projectsSnapshot.forEach((doc) => {
    //   const project = doc.data();

    //   if (project.id === ''
    //     || project.title?.includes('Fede')
    //     || project.title === ''
    //     // && doc.id !== docid
    //   ) {
    //     const docRef = db.collection('projects').doc(doc.id);
    //     batch.delete(docRef);
    //   }
    // });

    // projectsSnapshot.forEach((doc) => {
    //   const project = doc.data();
      
    //   if (typeof project.use === 'string') {
    //     const docRef = db.collection('projects').doc(doc.id);
    //     batch.update(docRef, {
    //       use: [project.use]
    //     });
    //   }
    // });

    // projectsSnapshot.forEach((doc) => {
    //   const project = doc.data();
      
    //   if (typeof project.projectType === 'string') {
    //     const docRef = db.collection('projects').doc(doc.id);
    //     batch.update(docRef, {
    //       projectType: [project.projectType]
    //     });
    //   }
    // });

    // projectsSnapshot.forEach((doc) => {
    //   const project = doc.data();
      
    //   if (project.title === "56 Court Addition" && project.published === false) {
    //     const docRef = db.collection('projects').doc(doc.id);
    //     batch.delete(docRef);
    //   }
    // });

    // projectsSnapshot.forEach((doc) => {
    //   const project = doc.data();
      
    //   if (doc.id === "NR6Nr8g5H3TpKIdlLMhQ") {
    //     const docRef = db.collection('projects').doc(doc.id);
    //     batch.delete(docRef);
    //   }
    // });

    // projectsSnapshot.forEach((doc) => {
    //   const project = doc.data();
      
    //   if (project.title?.startsWith("Federico") || !project.title) {
    //     const docRef = db.collection('projects').doc(doc.id);
    //     batch.delete(docRef);
    //   }
    // });



    // await batch.commit();
    console.log('All matching projects updated successfully.');
  } catch (error) {
    console.error('Error updating projects:', error);
  }
}

// updateProjects();


async function fixContentToArray() {
  try {
    const docRef = db.collection('about').doc('main');
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.error('Document not found.');
      return;
    }

    const data = docSnap.data();
    const sections = data.sections;

    const targetIndex = sections.findIndex(
      (s) => s.title === '' && s.content && !Array.isArray(s.content)
    );

    if (targetIndex === -1) {
      console.log('No malformed content found.');
      return;
    }

    const malformedContent = sections[targetIndex].content;
    sections[targetIndex].content = [malformedContent];

    await docRef.update({ sections });
    console.log('Fixed malformed content into array.');
  } catch (err) {
    console.error('Error fixing content:', err);
  }
}

// fixContentToArray();

async function setServicesMain() {
  const servicesDocRef = db.collection('services').doc('main');

  const serviceData = {
    title: 'Our Services',
    description: 'Experienced in new construction and renovations, our various services are organized into six design phases. The scope of each project informs the phases required, as well as the services included within each phase.',
    sections: [
      {
        title: 'Pre-Design',
        description: 'Code research, site analysis, and programming (the identification of the owner\'s needs, wants, and desires) are the essential tasks that inform the requirements and concept for the project.'
      },
      {
        title: 'Schematic Design',
        description: 'The concept for a project is conceived and communicated via sketches and 3D renderings. Drawings map out the exterior, interior, and systems of the building.'
      },
      {
        title: 'Owner/Stakeholder Approval (1)',
        description: 'Drawings are ready for submittals to HOAs, city design boards, or community review groups. Preliminary cost estimates can also be generated.'
      },
      {
        title: 'Design Development',
        description: 'Engineers and consultants are added to the process. Materials, finishes, equipment, and fixtures are selected and specified.'
      },
      {
        title: 'Owner/Stakeholder Approval (2)',
        description: 'Updated drawings are reviewed again with owners and stakeholders before moving to final construction docs.'
      },
      {
        title: 'Construction Documents',
        description: 'Final permit drawings and documents are produced, compliant with all local codes.'
      },
      {
        title: 'Permit',
        description: 'Permit applications are submitted. Architects manage revisions and responses until permits are approved.'
      },
      {
        title: 'Bidding & Negotiation',
        description: 'Owner selects delivery method and contractor. Architect helps review bids and clarify scope.'
      },
      {
        title: 'Construction Administration',
        description: 'The architect ensures construction meets drawings. They handle change orders, RFIs, walkthroughs, and project closeout.'
      }
    ]
  };

  try {
    await servicesDocRef.set(serviceData, { merge: true });
    console.log('services/main document written successfully.');
  } catch (error) {
    console.error('Error writing services/main:', error);
  }
}

setServicesMain();