#!/usr/bin/env node

/**
 * Script to automatically regenerate the components registry
 * Run this script whenever you add new components to the docs directory
 */

import { execSync } from "child_process";
import path from "path";

console.log("🔄 Regenerating components registry...");

try {
  // Change to the project root directory
  const projectRoot = path.join(__dirname, "../..");
  process.chdir(projectRoot);

  // Run the build registry script
  console.log("📦 Building registry...");
  execSync("npm run build:registry", { stdio: "inherit" });

  console.log("✅ Components registry regenerated successfully!");
  console.log("📁 Registry files updated in public/registry/");
  
} catch (error) {
  console.error("❌ Error regenerating components registry:", error);
  process.exit(1);
}
