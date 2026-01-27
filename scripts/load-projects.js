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

  return projects;
}

function saveProjects() {
  try {
    const projects = loadProjectsFromYaml();

    ensureDirExists(outputPath);
    // Save as array
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));

    console.log(`✅ Projects written to ${outputPath}`);
  } catch (error) {
    console.error("❌ Failed to load projects:", error);
    process.exit(1);
  }
}

saveProjects();
