const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const distDir = path.join(__dirname, "../dist");
const outputPath = path.join(distDir, "prerender.html");

const serviceAccount = require('./service-account-key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function generateFullHtml() {
  const [projectsSnap, aboutDoc, servicesDoc] = await Promise.all([
    db.collection("projects").get(),
    db.collection("about").doc("main").get(),
    db.collection("services").doc("main").get(),
  ]);

  const projects = projectsSnap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((p) => p.published);

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
  ${(services.sections || []).map(section => `
    <h2>${section.title}</h2>
    <p>${section.description}</p>
  `).join('')}

  <h1>Projects</h1>
  ${projects.map(project => `
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

  fs.writeFileSync(outputPath, html);
  console.log("✅ prerender.html created at", outputPath);
}

generateFullHtml().catch(err => {
  console.error("❌ Error rendering full HTML:", err);
  process.exit(1);
});