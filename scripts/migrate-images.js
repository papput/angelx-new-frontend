const fs = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.join(__dirname, "..", "src", "components");

const files = fs
  .readdirSync(COMPONENTS_DIR)
  .filter((f) => f.endsWith(".js") && f !== "AppImage.js")
  .map((f) => path.join(COMPONENTS_DIR, f));

const APP_IMAGE_IMPORT = 'import AppImage from "@/components/AppImage";\n';
const GET_IMAGE_SRC_IMPORT = 'import { getImageSrc } from "@/utils/image";\n';

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  const hasImg = /<img\b/.test(content);
  const hasBgUrl = /backgroundImage:\s*`url\(\$\{/.test(content);

  if (!hasImg && !hasBgUrl) return;

  if (hasImg && !content.includes("AppImage")) {
    const firstImport = content.indexOf("import ");
    const semi = content.indexOf(";", firstImport);
    content =
      content.slice(0, semi + 1) +
      "\n" +
      APP_IMAGE_IMPORT +
      content.slice(semi + 1);
  }

  if (hasBgUrl && !content.includes("getImageSrc")) {
    const firstImport = content.indexOf("import ");
    const semi = content.indexOf(";", firstImport);
    content =
      content.slice(0, semi + 1) +
      "\n" +
      GET_IMAGE_SRC_IMPORT +
      content.slice(semi + 1);
  }

  if (hasImg) {
    content = content.replace(/<img\b/g, "<AppImage");
  }

  if (hasBgUrl) {
    content = content.replace(
      /backgroundImage:\s*`url\(\$\{([^}]+)\}\)`/g,
      (match, expr) => {
        if (expr.includes("getImageSrc")) return match;
        return `backgroundImage: \`url(\${getImageSrc(${expr})})\``;
      },
    );
  }

  fs.writeFileSync(filePath, content);
  console.log("Updated:", path.basename(filePath));
});

console.log("Image migration complete.");
