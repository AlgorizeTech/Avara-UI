import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../..");
const REGISTRY = path.join(ROOT, "registry.json");
const OUT_DIR = path.join(ROOT, "public/r");

if (!fs.existsSync(REGISTRY) || !fs.existsSync(OUT_DIR)) {
  console.log("No registry.json or public/r/ directory found.");
  process.exit(0);
}

const registry = JSON.parse(fs.readFileSync(REGISTRY, "utf8"));
const items = registry.items ?? [];
const validNames = new Set(items.map((i: any) => i.name));
validNames.add("registry"); // Keep shadcn manifest copy

// 1. Remove orphan files in public/r
const files = fs.readdirSync(OUT_DIR);
let removedCount = 0;
let cleanedCount = 0;

for (const file of files) {
  if (!file.endsWith(".json")) continue;
  const name = file.replace(/\.json$/, "");
  const filePath = path.join(OUT_DIR, file);

  if (!validNames.has(name)) {
    fs.unlinkSync(filePath);
    console.log(`Removed orphan registry file: public/r/${file}`);
    removedCount++;
  } else {
    // 2. Normalize CRLF to LF in JSON files & internal file content strings
    const raw = fs.readFileSync(filePath, "utf8");
    let modified = false;

    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data.files)) {
        for (const f of data.files) {
          if (typeof f.content === "string" && f.content.includes("\r\n")) {
            f.content = f.content.replace(/\r\n/g, "\n");
            modified = true;
          }
        }
      }
      if (modified || raw.includes("\r\n")) {
        const jsonStr = JSON.stringify(data, null, 2).replace(/\r\n/g, "\n") + "\n";
        fs.writeFileSync(filePath, jsonStr, "utf8");
        cleanedCount++;
      }
    } catch {
      if (raw.includes("\r\n")) {
        fs.writeFileSync(filePath, raw.replace(/\r\n/g, "\n"), "utf8");
        cleanedCount++;
      }
    }
  }
}

console.log(`Registry build clean complete: ${removedCount} orphans removed, ${cleanedCount} files line endings normalized.`);
