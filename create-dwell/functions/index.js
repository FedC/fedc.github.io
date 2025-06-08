/**
 * Import function triggers from their respective submodules:
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onCall, onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const { onRequest } = require("firebase-functions/v2/https");
// const isBot = require('isbot');

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
const db = getFirestore();

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const botList = [
  /bot/i, /crawl/i, /spider/i, /slurp/i, /headless/i,
  /googlebot/i, /bingbot/i, /yandex/i, /baiduspider/i,
  /duckduckbot/i, /facebook/i, /whatsapp/i, /telegrambot/i,
  /preview/i, /validator/i, /monitor/i, /archive/i,
  /lighthouse/i, /pingdom/i, /phantomjs/i, /chrome-lighthouse/i,
  /^curl/i, /^Wget/i
];

function isBot(userAgent = "") {
  return botList.some((pattern) => pattern.test(userAgent));
}

function handleRedirects(req, res) {
  const lowerPath = req.path.toLowerCase();

  const legacyRedirects = [
    { prefix: "/residential-project/", replaceWith: "/project/" },
    { prefix: "/commercial-project/", replaceWith: "/project/" },
    { prefix: "/cultural-project/", replaceWith: "/project/" },
    { prefix: "/branding-project/", replaceWith: "/project/" },
    { prefix: "/community-project/", replaceWith: "/project/" },
    { prefix: "/residential-projects", redirectTo: "/residential" },
    { prefix: "/commercial-projects", redirectTo: "/commercial" },
    { prefix: "/cultural-projects", redirectTo: "/cultural" },
    { prefix: "/branding", redirectTo: "/branding" },
    { prefix: "/community", redirectTo: "/community" }
  ];

  for (const r of legacyRedirects) {
    if (lowerPath.startsWith(r.prefix)) {
      const to = r.redirectTo || lowerPath.replace(r.prefix, r.replaceWith);
      res.redirect(301, to);
      return true;
    }
  }

  return false;
};

exports.prerender = onRequest(async (req, res) => {
  logger.info(`Prerendering request: ${req.path}`);

  if (req.path.startsWith("/admin")) {
    logger.info('Admin request');
    res.redirect(302, req.path);
    return;
  }

  // Redirects first
  if (await handleRedirects(req, res)) {
    logger.info('Redirected');
    return;
  }

  const userAgent = req.headers["user-agent"] || "";
  const pathReq = req.path.toLowerCase();
  logger.info(`Path: ${pathReq}`);

  if (!isBot(userAgent)) {
    logger.info('Redirecting to home page');
    return res.redirect(302, '/');
  }

  const renderError = (error, context) => {
    logger.error(`Error rendering ${context}:`, error);
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head><meta charset="UTF-8"><title>Render Error</title></head>
        <body>
          <h1>500 – Error Rendering ${context}</h1>
          <p>${error.message}</p>
        </body>
      </html>
    `;
    res.status(500).set("Content-Type", "text/html").send(html);
  };


  if (pathReq === "/" || pathReq === "/index.html") {
    try {
      logger.info(`Rendering full page`);
      await renderFull(res);
      return;
    } catch (error) {
      logger.error(`Error rendering full page: ${error}`);
      return renderError(error, pathReq);
    }
  }
  if (pathReq === "/about") {
    try { 
      await renderAbout(res);
      return;
    } catch (error) {
      logger.error(`Error rendering about page: ${error}`);
      return renderError(error, pathReq);
    }
  }
  if (pathReq === "/services") {
    try { 
      await renderServices(res);
      return;
    } catch (error) {
      logger.error(`Error rendering services page: ${error}`);
      return renderError(error, pathReq);
    }
  }
  if (pathReq.startsWith("/project/")) {
    try {
      const slug = pathReq.replace("/project/", "");
      await renderProject(slug, res);
      return;
    } catch (error) {
      logger.error(`Error rendering project page: ${error}`);
      return renderError(error, pathReq);
    }
  }

  if (pathReq === "/residential") return renderCategory(res, "residential");
  if (pathReq === "/commercial") return renderCategory(res, "commercial");
  if (pathReq === "/cultural") return renderCategory(res, "cultural");
  if (pathReq === "/contact-us") return renderContact(res);
  if (pathReq === "/community") return renderCategory(res, "community");
  if (pathReq === "/branding") return renderCategory(res, "branding");
  if (pathReq.startsWith("/residential-project/")) {
    const slug = pathReq.replace("/residential-project/", "");
    return renderProject(slug, res);
  }

  // fallback 404
  const notFoundHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head><meta charset="UTF-8"><title>Page Not Found</title></head>
      <body><h1>404 – Page Not Found</h1><p>The page "${req.path}" could not be rendered.</p></body>
    </html>
  `;
  res.status(404).set("Content-Type", "text/html").send(notFoundHtml);
});

const renderCategory = async (res, category) => {
  const titleMap = {
    residential: "Residential Projects",
    commercial: "Commercial Projects",
    cultural: "Cultural Projects",
    community: "Community Projects",
    branding: "Branding Projects"
  };

  const metaDescription = `Explore our ${category} work. Experienced in new construction and renovations.`;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>create-dwell | ${titleMap[category] || category}</title>
    <meta name="description" content="${metaDescription}" />
    <link rel="canonical" href="https://create-dwell.com/${category}" />
  </head>
  <body>
    <h1>${titleMap[category] || category}</h1>
    <p>${metaDescription}</p>
  </body>
  </html>`;

  res.set("Content-Type", "text/html");
  res.status(200).send(html);
};

const renderContact = (res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>create-dwell | Contact</title>
      <meta name="description" content="Contact create-dwell architecture. Carolina Wiebe, Architect in Florida. carolina@create-dwell.com | 954 210 0862 | AR91865 + ID6603" />
      <link rel="canonical" href="https://create-dwell.com/contact-us" />
    </head>
    <body>
      <h1>Contact Us</h1>
      <p>create-dwell architecture</p>
      <p>Email: carolina@create-dwell.com</p>
      <p>Phone: 954 210 0862</p>
      <p>Florida | AR91865 + ID6603</p>
    </body>
  </html>`;

  res.set("Content-Type", "text/html");
  res.status(200).send(html);
};

async function renderAbout(res) {
  const aboutDoc = await db.collection("about").doc("main").get();
  const servicesDoc = await db.collection("services").doc("main").get();

  const about = aboutDoc.exists ? aboutDoc.data() : {};
  const services = servicesDoc.exists ? servicesDoc.data() : {};

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>About - Create Dwell</title>
    </head>
    <body>
      <h1>${about.title || 'About Us'}</h1>
      <p>${about.description || ''}</p>
      <p>${about.aboutText || ''}</p>
      <h2>Services</h2>
      ${(services.sections || []).map(s => `<h3>${s.title}</h3><p>${s.description}</p>`).join('')}
    </body>
    </html>
  `;

  res.set("Content-Type", "text/html");
  res.status(200).send(html);
}

async function renderServices(res) {
  const servicesDoc = await db.collection("services").doc("main").get();
  const services = servicesDoc.exists ? servicesDoc.data() : {};

  const intro = `Experienced in new construction and renovations, our various services are organized into six design phases.
  The scope of each project informs the phases required, as well as the services included within each phase.
  Approvals may be required to proceed to a subsequent phase.`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Services - Create Dwell</title>
    </head>
    <body>
      <h1>Services</h1>
      <p>${intro}</p>
      ${(services.sections || []).map(s => `<h2>${s.title}</h2><p>${s.description}</p>`).join('')}
    </body>
    </html>
  `;

  res.set("Content-Type", "text/html");
  res.status(200).send(html);
}

async function renderProject(slug, res) {
  const projectsSnap = await db.collection("projects").get();
  const projects = projectsSnap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((project) => slugify(project.title) === slug);

  if (!projects.length) {
    return res.status(404).send("Project not found");
  }

  const project = projects[0];

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${project.title || 'Project'}</title>
    </head>
    <body>
      <h1>${project.title}</h1>
      <p><strong>Location:</strong> ${project.location || ''}</p>
      <p><strong>Use:</strong> ${Array.isArray(project.use) ? project.use.join(', ') : project.use || ''}</p>
      <p><strong>Area:</strong> ${project.area || ''}</p>
      <p><strong>Status:</strong> ${project.status || ''}</p>
      <p>${project.description || ''}</p>
      <p>${project.clientDescription || ''}</p>
      <p>${project.challenge || ''}</p>
      <p>${project.solution || ''}</p>
    </body>
    </html>
  `;

  res.set("Content-Type", "text/html");
  res.status(200).send(html);
}

async function renderFull(res) {
  const [projectsSnap, aboutDoc, servicesDoc] = await Promise.all([
    db.collection("projects").get(),
    db.collection("about").doc("main").get(),
    db.collection("services").doc("main").get(),
  ]);

  const projects = projectsSnap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((project) => project.published);
  logger.info(`Projects: ${projects.length}`);

  const about = aboutDoc.exists ? aboutDoc.data() : {};
  const services = servicesDoc.exists ? servicesDoc.data() : {};

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pre-rendered Content</title>
      <style>
        body { font-family: sans-serif; padding: 2rem; line-height: 1.6; }
        h1, h2 { color: #333; }
        .project { margin-bottom: 2rem; }
      </style>
    </head>
    <body>
      <h1>About</h1>
      <h2>${about.title || ''}</h2>
      <p>${about.description || ''}</p>
      <p>${about.aboutText || ''}</p>

      <h1>Services</h1>
      <p>Experienced in new construction and renovations, our various services are organized into six design phases.
      The scope of each project informs the phases required, as well as the services included within each phase.
      Approvals may be required to proceed to a subsequent phase.</p>
      ${(services.sections || []).map((section) => `
        <h2>${section.title}</h2>
        <p>${section.description}</p>
      `).join('')}

      <h1>Projects</h1>
      ${projects.map((project) => `
        <div class="project">
          <h2>${project.title}</h2>
          <p><strong>Location:</strong> ${project.location || ''}</p>
          <p><strong>Use:</strong> ${Array.isArray(project.use) ? project.use.join(', ') : project.use || ''}</p>
          <p><strong>Area:</strong> ${project.area || ''}</p>
          <p><strong>Status:</strong> ${project.status || ''}</p>
          <p>${project.description || ''}</p>
          <p>${project.clientDescription || ''}</p>
          <p>${project.challenge || ''}</p>
          <p>${project.solution || ''}</p>
        </div>
      `).join('')}
    </body>
    </html>
  `;

  res.set("Content-Type", "text/html");
  res.status(200).send(html);
}

exports.sitemap = onRequest(async (req, res) => {
  const [projectsSnap] = await Promise.all([
    db.collection("projects").get(),
  ]);

  const baseUrl = "https://create-dwell.com";
  const urls = ["", "about", "services"];

  const escapeXml = (unsafe) =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const projectUrls = projectsSnap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((p) => p.published)
    .map((p) => {
      const slug = slugify(p.title);
      return {
        loc: `${baseUrl}/project/${slug}`,
        image: p.mainImage || null
      };
    });

  const allUrls = [
    ...urls.map(u => ({ loc: `${baseUrl}/${u}`, image: null })),
    ...projectUrls
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${allUrls
      .map(({ loc, image }) => {
        return `<url>
  <loc>${escapeXml(loc)}</loc>
  ${
    image
      ? `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`
      : ""
  }
</url>`;
      })
      .join("\n")}
  </urlset>`;

  res.set("Content-Type", "application/xml");
  res.status(200).send(xml);
});

exports.robots = onRequest((req, res) => {
  const robots = `User-agent: *
    Allow: /
    Sitemap: https://create-dwell.com/sitemap.xml`;
  res.set("Content-Type", "text/plain");
  logger.info(`Robots: ${robots}`);
  res.status(200).send(robots);
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
