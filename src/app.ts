import fs from "fs";
import path from "path";

const LESSONS_DIR = path.join(__dirname, "../..", "lessions");
const README_PATH = path.join(__dirname, "../..", "README.md");

function getLessonFolders(): string[] {
  return fs.readdirSync(LESSONS_DIR).filter((folder) => {
    const fullPath = path.join(LESSONS_DIR, folder);
    return fs.statSync(fullPath).isDirectory();
  });
}

function generateMarkdownLinks(folders: string[]): string {
  return (
    folders
      .map((folder) => `- [${folder}](lessions/${encodeURIComponent(folder)})`)
      .join("\n") + "\n"
  );
}

function updateReadme(content: string) {
  const readme = fs.readFileSync(README_PATH, "utf8");

  const newSection = `## Contents\n\n${content}`;
  const updatedReadme = readme.replace(
    /## Contents[\s\S]*?(?=##|$)/,
    newSection
  );

  fs.writeFileSync(README_PATH, updatedReadme, "utf8");
  console.log("README.md updated successfully!");
}

function main() {
  const folders = getLessonFolders();
  const markdownLinks = generateMarkdownLinks(folders);
  updateReadme(markdownLinks);
}

main();
