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
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const { RecaptchaEnterpriseServiceClient } = require("@google-cloud/recaptcha-enterprise");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const sharp = require('sharp');
const path = require('path');
const os = require('os');
const fs = require('fs');

const sizes = {
  small: 300,
  medium: 800,
  large: 1600,
};

const projectID = "create-dwell";
const recaptchaKey = "6LfOJr8qAAAAAOvXNz5-ddMP3FmyucIOuqY9hYSQ";

const client = new RecaptchaEnterpriseServiceClient();

// Initialize Firebase Admin SDK
admin.initializeApp();

exports.helloWorld = functions.https.onRequest({ region: "us-east1" }, (req, res) => {
  res.send("Hello, World!");
});

exports.verifyRecaptcha = functions.https.onCall(async (data, context) => {
  const token = data.token;
  const recaptchaAction = data.action;
  const projectPath = client.projectPath(projectID);

  try {
    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    if (!response.tokenProperties.valid) {
      throw new Error(`Invalid reCAPTCHA token: ${response.tokenProperties.invalidReason}`);
    }

    if (response.tokenProperties.action !== recaptchaAction) {
      throw new Error("reCAPTCHA action does not match.");
    }

    return {
      success: true,
      score: response.riskAnalysis.score,
      reasons: response.riskAnalysis.reasons,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

exports.generateResizedImages = onObjectFinalized({ region: "us-east1", bucket: "create-dwell.appspot.com" }, async (event) => {
  logger.info("Received event:", event);
  const object = event.data; // The Storage object that has been finalized
  const filePath = object.name; // File path in the bucket
  const contentType = object.contentType; // File content type

  // Validate input
  if (!filePath || !contentType) {
    logger.info("File path or content type is missing. Skipping...");
    return null;
  }

  // Skip files that already include size suffixes
  if (/_small|_medium|_large/.test(filePath)) {
    logger.info(`File ${filePath} already resized. Skipping...`);
    return null;
  }

  const fileName = path.basename(filePath); // Extract file name
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const bucket = getStorage().bucket(object.bucket);

  logger.info(`Processing file: ${filePath}`);
  logger.info(`Content type: ${contentType}`);
  logger.info(`File name: ${fileName}`);

  // Supported image formats
  const supportedFormats = ['image/tiff', 'image/jpeg', 'image/png', 'image/jpg'];
  if (!supportedFormats.includes(contentType)) {
    logger.info(`Unsupported file type: ${contentType}`);
    return null;
  }

  try {
    // Download the image to a temporary file
    await bucket.file(filePath).download({ destination: tempFilePath });
    logger.info(`Image downloaded locally to ${tempFilePath}`);

    // Process each size
    for (const [sizeName, maxSize] of Object.entries(sizes)) {
      const baseName = path.basename(fileName, path.extname(fileName));
      const jpgPath = path.join(os.tmpdir(), `${baseName}_${sizeName}.jpg`);
      const webpPath = path.join(os.tmpdir(), `${baseName}_${sizeName}.webp`);

      // Resize and save as JPEG
      await sharp(tempFilePath)
        .resize(maxSize, maxSize, { fit: 'inside' })
        .jpeg()
        .toFile(jpgPath);

      // Upload resized JPEG to bucket
      await bucket.upload(jpgPath, {
        destination: `${path.dirname(filePath)}/${baseName}_${sizeName}.jpg`,
        metadata: { contentType: 'image/jpeg' },
      });

      // Resize and save as WEBP
      await sharp(tempFilePath)
        .resize(maxSize, maxSize, { fit: 'inside' })
        .webp()
        .toFile(webpPath);

      // Upload resized WEBP to bucket
      await bucket.upload(webpPath, {
        destination: `${path.dirname(filePath)}/${baseName}_${sizeName}.webp`,
        metadata: { contentType: 'image/webp' },
      });

      // Remove local resized files
      fs.unlinkSync(jpgPath);
      fs.unlinkSync(webpPath);
    }

    // Remove the original file from the bucket
    await bucket.file(filePath).delete();
    // Clean up local temporary file
    fs.unlinkSync(tempFilePath);
    logger.info(`Temporary file ${tempFilePath} deleted`);
  } catch (error) {
    logger.error('Error processing image:', error);
  }

  return null;
});
