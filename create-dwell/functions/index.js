/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
// const sharp = require('sharp');

// Initialize Firebase Admin SDK
admin.initializeApp();

exports.getProjectImages = functions
  .https.onRequest(async (req, res) => {
    cors(req, res, async () => {
      const projectId = req.query.projectId || req.body.projectId;

      if (!projectId) {
        return res.status(400).send('Project ID is required');
      }

      const bucketName = 'create-dwell.appspot.com';
      const bucket = storage.bucket(bucketName);
      const projectDir = `projects/${projectId}/images`;

      try {
        // Get all images for the project
        const [files] = await bucket.getFiles({ prefix: projectDir });

        // Convert file objects to public URLs
        const imageUrls = files.map(file => `https://storage.googleapis.com/${bucketName}/${file.name}`);

        return res.status(200).json({
          projectId,
          images: imageUrls,
        });
      } catch (error) {
        console.error('Error fetching images:', error);
        return res.status(500).send('Unable to fetch project images');
      }
    });
  });