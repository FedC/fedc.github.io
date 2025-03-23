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
    const batch = db.batch();

    // const docid = '02rukrjrNlSZsOyKAfgu';

    projectsSnapshot.forEach((doc) => {
      const project = doc.data();

      if (project.id === ''
        || project.title?.includes('Fede')
        || project.title === ''
        // && doc.id !== docid
      ) {
        const docRef = db.collection('projects').doc(doc.id);
        batch.delete(docRef);
      }
    });

    await batch.commit();
    console.log('All matching projects deleted successfully.');
  } catch (error) {
    console.error('Error deleting projects:', error);
  }
}

updateProjects();