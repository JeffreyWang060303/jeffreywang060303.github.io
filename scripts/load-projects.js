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

  const projects = data?.projects ?? [];

  // Validate that projects is an array
  if (!Array.isArray(projects)) {
    throw new Error("Projects must be an array in the YAML file");
  }

  // Validate each project has required fields
  projects.forEach((project, index) => {
    if (!project.title) {
      throw new Error(`Project at index ${index} is missing required field: title`);
    }
    if (!project.role) {
      throw new Error(`Project at index ${index} is missing required field: role`);
    }
    if (!project.duration) {
      throw new Error(`Project at index ${index} is missing required field: duration`);
    }
    if (!project.description) {
      throw new Error(`Project at index ${index} is missing required field: description`);
    }
    if (!Array.isArray(project.tools)) {
      throw new Error(`Project at index ${index} must have tools as an array`);
    }
  });

  return projects;
}

function saveProjects() {
  try {
    const projects = loadProjectsFromYaml();

    ensureDirExists(outputPath);
    // Save as array
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));

    console.log(`✅ Projects written to ${outputPath} (${projects.length} projects)`);
  } catch (error) {
    console.error("❌ Failed to load projects:", error.message);
    process.exit(1);
  }
}

saveProjects();
