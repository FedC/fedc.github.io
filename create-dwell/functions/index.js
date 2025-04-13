/**
 * Import function triggers from their respective submodules:
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onCall, onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { onObjectFinalized } = require("firebase-functions/v2/storage");
// const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

const admin = require('firebase-admin');
// const cors = require('cors')({ origin: true });
const sharp = require('sharp');
const path = require('path');
const os = require('os');
const fs = require('fs');

const sizes = {
  small: 300,
  medium: 800,
  large: 1600,
};

// Initialize Firebase Admin SDK
admin.initializeApp();

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
