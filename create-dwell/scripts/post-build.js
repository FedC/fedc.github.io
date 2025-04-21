const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");
const firebasePath = path.join(__dirname, "../firebase.json");

const firebaseJson = require(firebasePath);

// Match static files
const jsFile = fs.readdirSync(distDir).find(f => /^index\..+\.js$/.test(f));
const staticAssets = fs.readdirSync(distDir).filter(f =>
  /\.(png|jpe?g|gif|ico|svg|webp|avif|woff2?|ttf|eot|mp4|webm)$/.test(f)
);

if (!jsFile) {
  console.error("❌ Could not find built index.js or index.css in dist/");
  process.exit(1);
}

// Start building rewrites
const rewrites = [];

// Add rewrites for static assets
staticAssets.forEach((file) => {
  rewrites.push({
    source: `**/${file}`,
    destination: `/${file}`
  });
});

// Add core rewrites
rewrites.push(
  {
    source: "/admin/edit-project/index.*.js",
    destination: `/${jsFile}`
  },
  {
    source: "/**/index.*.js",
    destination: `/${jsFile}`
  },
);

const cssFiles = fs.readdirSync(distDir).filter(f => /^index\..+\.css$/.test(f));

cssFiles.forEach(cssFile => {
  rewrites.push({
    source: `/admin/edit-project/${cssFile}`,
    destination: `/${cssFile}`
  });
  rewrites.push({
    source: `/**/${cssFile}`,
    destination: `/${cssFile}`
  });
});

rewrites.push({
  source: "**",
  destination: "/index.html"
});

firebaseJson.hosting.rewrites = rewrites;

fs.writeFileSync(firebasePath, JSON.stringify(firebaseJson, null, 2));
console.log("✅ firebase.json rewrites updated:", jsFile, cssFiles, staticAssets);