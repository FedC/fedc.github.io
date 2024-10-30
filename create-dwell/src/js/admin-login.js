import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log("logged in:", user.email);

    // Check the user's role in Firestore
    const userDocRef = doc(db, 'users', user.uid); // Get the user document from Firestore using their UID
    const userDoc = await getDoc(userDocRef); // Retrieve the document

    if (userDoc.exists()) {
      const userData = userDoc.data(); // Get the user data
      const userRole = userData.role; // Assume there's a 'role' field in the document

      if (userRole === 'admin') {
        // If the user is an admin, redirect to the admin dashboard
        console.log('User is an admin');
        window.location.href = '/admin';
      } else {
        // If not an admin, show an error or redirect elsewhere
        console.error('User does not have admin privileges');
        alert('You do not have permission to access the admin dashboard.');
      }
    } else {
      console.error('No user document found in Firestore');
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert('Login failed. Please try again.');
  }
});