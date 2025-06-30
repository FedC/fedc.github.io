const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");
const firebasePath = path.join(__dirname, "../firebase.json");

const firebaseJson = require(firebasePath);

const jsFile = fs.readdirSync(distDir).find(f => /^index\..+\.js$/.test(f));
const staticAssets = fs.readdirSync(distDir).filter(f =>
  /\.(png|jpe?g|gif|ico|svg|webp|avif|woff2?|ttf|eot|mp4|webm)$/.test(f)
);

if (!jsFile) {
  console.error("❌ Could not find built index.js or index.css in dist/");
  process.exit(1);
}

const rewrites = [];

staticAssets.forEach((file) => {
  rewrites.push({
    source: `**/${file}`,
    destination: `/${file}`
  });
});

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

const functionRoutes = [
  "/about",
  "/services",
  "/residential",
  "/commercial",
  "/cultural",
  "/contact-us",
  "/community",
  "/branding",
  "/residential-project/**",
  "/project/**",
  "/sitemap.xml",
  "/robots.txt",
];

functionRoutes.forEach(route => {
  const func = route.includes("sitemap") ? "sitemap" :
               route.includes("robots") ? "robots" :
               "prerender";
  rewrites.push({ source: route, function: func });
});

rewrites.push({
  source: "/",
  destination: "/index.html"
});
rewrites.push({
  source: "/admin/edit-project/**",
  destination: "/index.html"
});
rewrites.push({
  source: "/admin/**",
  destination: "/index.html"
});
rewrites.push({
  source: "/admin",
  destination: "/index.html"
});
rewrites.push({
  source: "/**",
  destination: "/404.html"
});

firebaseJson.hosting.rewrites = rewrites;

fs.writeFileSync(firebasePath, JSON.stringify(firebaseJson, null, 2));
console.log("✅ firebase.json rewrites updated:", jsFile, cssFiles, staticAssets);

const robotsTxtPath = path.join(distDir, "robots.txt");
const robotsTxtContent = `User-agent: *
Allow: /
Sitemap: https://create-dwell.com/sitemap.xml
`;

fs.writeFileSync(robotsTxtPath, robotsTxtContent);
console.log("✅ dist/robots.txt created.");

const indexHtmlPath = path.join(distDir, "index.html");
const prerenderHtmlPath = path.join(distDir, "prerender.html");

if (fs.existsSync(indexHtmlPath) && fs.existsSync(prerenderHtmlPath)) {
  const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
  const prerenderHtml = fs.readFileSync(prerenderHtmlPath, "utf8");

  const match = prerenderHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const prerenderBody = match ? match[1].trim() : "";

  const updatedHtml = indexHtml.replace(
    /<div id="root"><\/div>/,
    `<div id="root"><div class="ssr-only">\n${prerenderBody}\n</div></div>`
  );

  fs.writeFileSync(indexHtmlPath, updatedHtml, "utf8");
  console.log("✅ Injected prerendered HTML into index.html");
} else {
  console.warn("⚠️ prerender.html or index.html not found — skipping injection");
}