import fs from "fs";
import path from "path";
const __dirname = path.join();

const assets = {};

const assetsPath = path.join(__dirname, "public/assets");
const outputPath = path.join(__dirname, "src/variables/images.js");

const categories = fs.readdirSync(assetsPath).filter((item) => {
  const category = path.join(assetsPath, item);
  return fs.statSync(category).isDirectory();
});

const toCamelCase = (fileName) => {
  if (fileName === ".DS_Store") {
    return null;
  }
  const name = fileName
    .split("_")
    .splice(1)
    .map((word, i) => {
      if (i === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");

  return name;
};

categories.forEach((category) => {
  const imgPath = path.join(assetsPath, category);
  const imgNames = fs.readdirSync(imgPath);

  const result = imgNames.reduce((acc, img) => {
    const nameWithOutExt = path.basename(img, path.extname(img));
    const fieldName = toCamelCase(nameWithOutExt);
    if (fieldName) {
      acc[fieldName] = `/assets/${category}/${img}`;
    }

    return acc;
  }, {});
  assets[category] = result;
});

// assets 객체를 문자열로 변환
const fileContent = `const assets = ${JSON.stringify(
  assets,
  null,
  2
)};\nexport default assets;`;

// 파일 작성
fs.writeFileSync(outputPath, fileContent, "utf-8");
