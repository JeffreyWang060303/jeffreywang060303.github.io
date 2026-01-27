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
  "projects.json",
);

function loadProjectsFromYaml() {
  const raw = fs.readFileSync(projectsYamlPath, "utf-8");
  const data = yaml.load(raw);

  // Support both legacy `projects.items` and new `projects` array
  const items = data?.projects?.items ?? data?.projects ?? [];
  return items;
}

function normalize(items) {
  return items.map((it) => ({
    title: it.title ?? it.displayName ?? it.id ?? null,
    role: it.role ?? null,
    duration: it.duration ?? null,
    description: it.description ?? it.description ?? null,
    tools: it.tools ?? null,
    github: it.github ?? it.html_url ?? null,
    image: it.image ?? it.previewImage ?? null,
  }));
}

function writeOut(obj) {
  ensureDirExists(outputPath);
  fs.writeFileSync(outputPath, JSON.stringify(obj, null, 2));
  console.log(`✅ Projects written to ${outputPath}`);
}

try {
  const items = loadProjectsFromYaml();
  const normalized = normalize(items);
  writeOut(normalized);
} catch (err) {
  console.error("❌ Failed to generate projects:", err);
  process.exit(1);
}
