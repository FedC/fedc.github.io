const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json'); // Update the path

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const projects = [
    {
      "title": "Marquez Residence",
      "location": "Coral Gables, Florida",
      "area": "8,400 SF",
      "award": "AIA Honorable Mention (Built), award of Excellence (Unbuilt)",
      "photoCredit": "photoCredit: Ed Zealy",
      "role": "Project Architect; Donald Singer, Architect",
      "use": ["Residential"],
      "homePageOrder": null,
      "order": 3,
      "projectType": "New Construction"
    },
    {
      "title": "Wiebe Residence",
      "location": "Davie, Florida",
      "area": "3,700 SF",
      "award": null,
      "photoCredit": "photoCredit: Ed Zealy",
      "role": "Project Architect",
      "use": ["Residential"],
      "homePageOrder": 1,
      "order": 1,
      "projectType": "New Construction"
    },
    {
      "title": "Cornfeld Residence",
      "location": "Hollywood, Florida",
      "area": "6,000 SF",
      "award": "AIA award of Excellence",
      "photoCredit": "photoCredit: ",
      "role": "Project Architect, SingerArchitects",
      "use": ["Residential"],
      "homePageOrder": 3,
      "order": 4,
      "projectType": "New Construction"
    },
    {
      "title": "Hartman Residence",
      "location": "Miami, Florida",
      "area": "2,800 SF",
      "award": null,
      "photoCredit": "photoCredit: Ed Zealy",
      "role": "Project Architect",
      "use": ["Residential"],
      "homePageOrder": 2,
      "order": 2,
      "projectType": "Historic Interior Renovation"
    },
    {
      "title": "Salvador Dali Museum",
      "location": "St. Petersburg, Florida",
      "area": "60,000 SF",
      "award": null,
      "photoCredit": "photoCredit: Peter Leiser",
      "role": "Project Architect, SingerArchitects",
      "use": ["Cultural"],
      "homePageOrder": 9,
      "order": 3,
      "projectType": "Schematic Proposal"
    },
    {
      "title": "Wiebe Pool + Patio",
      "location": "Davie, Florida",
      "area": "8,000 SF",
      "award": null,
      "photoCredit": "photoCredit:  Goldin Solar",
      "role": "Project Architect",
      "use": ["Residential"],
      "homePageOrder": null,
      "order": 5,
      "projectType": "New Construction"
    },
    {
      "title": "Pompano Beach Cultural Center Sculpture",
      "location": "Pompano Beach, Florida",
      "area": "Art in Public Places",
      "award": null,
      "photoCredit": "photoCredit: Create-Dwell",
      "role": "Project Architect",
      "use": ["Cultural"],
      "homePageOrder": null,
      "order": 2,
      "projectType": "Schematic Proposal"
    },
    {
      "title": "City Rev Youth Center",
      "location": "Pembroke Pines, Florida",
      "area": "'-",
      "award": null,
      "photoCredit": "photoCredit: Create-Dwell",
      "role": "Project Architect",
      "use": ["Cultural"],
      "homePageOrder": null,
      "order": 2,
      "projectType": "Interior Renovation"
    },
    {
      "title": "Oakland Chapel and Meeting Room",
      "location": "Oakland, California",
      "area": "2,400 SF",
      "award": "AIA award of Excellence",
      "photoCredit": "photoCredit: Create-Dwell",
      "role": "Project Architect",
      "use": ["Cultural"],
      "homePageOrder": 8,
      "order": 1,
      "projectType": "Schematic Proposal"
    },
    {
      "title": "FLL International Airport Garage",
      "location": "Fort Lauderdale, Florida",
      "area": "500,000 cars, Art in Public Places",
      "award": "AIA award of Excellence",
      "photoCredit": "photoCredit: Ed Zealy",
      "role": "Project Architect, SingerArchitects",
      "use": ["Commercial"],
      "homePageOrder": 4,
      "order": 3,
      "projectType": "New Construction"
    },
    {
      "title": "BIG Children's Foundation",
      "location": "Oakland Park, Florida",
      "area": "1,200 SF",
      "award": null,
      "photoCredit": "photoCredit: Create-Dwell",
      "role": "Project Architect",
      "use": ["Cultural"],
      "homePageOrder": null,
      "order": 3,
      "projectType": "Renovation"
    },
    {
      "title": "Hartman and Company Fine Art",
      "location": "Miami, Florida",
      "area": "1,200 SF",
      "award": null,
      "photoCredit": "photoCredit: Ed Zealy",
      "role": "Project Architect",
      "use": ["Commercial"],
      "homePageOrder": null,
      "order": 1,
      "projectType": "Historic Interior Renovation"
    },
    {
      "title": "World Savings & Loan 10",
      "location": "Cape Coral, Florida",
      "area": "3,750 SF",
      "award": "AIA award of Merit",
      "photoCredit": "photoCredit: Ed Zealy",
      "role": "Project Architect; Donald Singer, Architect",
      "use": ["Commercial"],
      "homePageOrder": 6,
      "order": 2,
      "projectType": "New Construction"
    },
    {
      "title": "World Savings & Loan 3",
      "location": "Palm Harbor, Florida",
      "area": "3,250 SF",
      "award": "AIA award of Merit",
      "photoCredit": "photoCredit: Ed Zealy",
      "role": "Project Architect; Donald Singer, Architect",
      "use": ["Commercial"],
      "homePageOrder": 5,
      "order": 4,
      "projectType": "New Construction"
    },
    {
      "title": "Boca Raton Museum of Art",
      "location": "Boca Raton, Florida",
      "area": "45,000 SF",
      "award": "AIA award of Excellence",
      "photoCredit": "photoCredit: Ed Zealy",
      "role": "Project Architect; Donald Singer, Architect",
      "use": ["Cultural"],
      "homePageOrder": 7,
      "order": 1,
      "projectType": "New Construction"
    }
  ];

async function updateFirestore() {
  const batch = db.batch(); // Use batch for better performance

  projects.forEach((project) => {
    const docRef = db.collection('projects').doc(); // Generate a unique ID for each project
    batch.set(docRef, project);
  });

  try {
    await batch.commit();
    console.log('All projects have been successfully added to Firestore.');
  } catch (error) {
    console.error('Error adding projects to Firestore:', error);
  }
}

updateFirestore();