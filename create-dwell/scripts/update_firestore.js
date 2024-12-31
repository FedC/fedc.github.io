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

async function updateProjects() {
  try {
    const projectsSnapshot = await db.collection('projects').get();

    const batch = db.batch();
    projectsSnapshot.forEach((doc) => {
      const project = doc.data();

      // Modify only the `content` array
      if (project.content && Array.isArray(project.content)) {
        project.content = project.content.map((contentItem) => ({
          ...contentItem,
          published: true,
        }));
      }

      // Add the update to the batch
      const docRef = db.collection('projects').doc(doc.id);
      batch.set(docRef, { content: project.content }, { merge: true }); // Merge updates only
    });

    await batch.commit();
    console.log('All projects updated successfully.');
  } catch (error) {
    console.error('Error updating projects:', error);
  }
}

updateProjects();