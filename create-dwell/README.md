# Create Dwell Website

A modern, interactive website for Create Dwell, featuring project showcases, team information, and dynamic content management.

## Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase CLI (`npm install -g firebase-tools`)

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/your-username/create-dwell.git
cd create-dwell
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following structure:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Deployment

### Firebase Hosting Setup

1. Login to Firebase:
```bash
firebase login
```

2. Initialize Firebase in your project (if not already done):
```bash
firebase init
```
Select the following options:
- Hosting
- Firestore
- Storage

3. Build the project:
```bash
npm run build
# or
yarn build
```

4. Deploy to Firebase:
```bash
firebase deploy
```

### Environment Configuration

For different environments (development, staging, production), create the following files:

- `.env.development` - Development environment variables
- `.env.staging` - Staging environment variables
- `.env.production` - Production environment variables

Example structure for each environment file:
```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

# Other Environment Variables
REACT_APP_ENV=development|staging|production
```

### Firebase Project Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - Authentication
   - Firestore Database
   - Storage
   - Hosting

3. Set up Firestore security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. Set up Storage security rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Project Structure

```
create-dwell/
├── public/
├── src/
│   ├── components/
│   ├── js/
│   ├── pages/
│   └── styles/
├── .env
├── .env.development
├── .env.staging
├── .env.production
├── firebase.json
├── firestore.rules
└── storage.rules
```

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [GSAP Documentation](https://greensock.com/docs/) 