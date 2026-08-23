import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { ensureDirExists } from "./utils.js";

const projectsYamlPath = path.join(process.cwd(), "config", "projects.yaml");
const outputPath = path.join(
  process.cwd(),
  "src",
  "data",
  "generated",
  "repos.json",
);

function loadProjectsFromYaml() {
  const raw = fs.readFileSync(projectsYamlPath, "utf-8");
  const data = yaml.load(raw);

  // Support both the current nested shape ({ authorName, items }) and the
  // legacy flat array shape for backward compatibility.
  const authorName = data?.projects?.authorName ?? "";
  const items = Array.isArray(data?.projects?.items)
    ? data.projects.items
    : Array.isArray(data?.projects)
      ? data.projects
      : [];

  // Validate that items is an array
  if (!Array.isArray(items)) {
    throw new Error("projects.items must be an array in the YAML file");
  }

  // Validate each entry has the one truly required field
  items.forEach((item, index) => {
    if (!item.title) {
      throw new Error(`Entry at index ${index} is missing required field: title`);
    }
    if ("tools" in item && item.tools != null && !Array.isArray(item.tools)) {
      throw new Error(`Entry at index ${index} must have tools as an array`);
    }
  });

  return { authorName, items };
}

function saveProjects() {
  try {
    const { authorName, items } = loadProjectsFromYaml();

    ensureDirExists(outputPath);
    fs.writeFileSync(outputPath, JSON.stringify({ authorName, items }, null, 2));

    console.log(`✅ Projects written to ${outputPath} (${items.length} entries)`);
  } catch (error) {
    console.error("❌ Failed to load projects:", error.message);
    process.exit(1);
  }
}

saveProjects();
