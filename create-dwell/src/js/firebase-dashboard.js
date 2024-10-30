
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from './firebase.js';

// Check if user is authenticated
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log('logged in as:', user.email);
    const userDocRef = doc(db, 'users', user.uid); // Get the user document from Firestore using their UID
    const userDoc = await getDoc(userDocRef); // Retrieve the document

    if (userDoc.exists()) {
      const userData = userDoc.data(); // Get the user data
      const userRole = userData.role; // Assume there's a 'role' field in the document

      if (userRole === 'admin') {
        // If the user is an admin, redirect to the admin dashboard
        console.log('User is an admin');
        
      } else {
        // If not an admin, show an error or redirect elsewhere
        console.error('User does not have admin privileges');
        alert('You do not have permission to access the admin dashboard.');
      }
    } else {
      console.error('No user document found in Firestore');
    }
  } else {
    console.log('Admin not logged in');
    window.location.href = "/admin-login";
  }
});
