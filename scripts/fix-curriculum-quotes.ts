import fs from "fs"
import path from "path"

// Read the curriculum file
const curriculumPath = path.join(process.cwd(), "lib", "curriculum.ts")
let content = fs.readFileSync(curriculumPath, "utf-8")

console.log("[v0] Starting to fix curriculum syntax errors...")
console.log("[v0] Original file size:", content.length, "characters")

// Count how many errors we're fixing
const errorCount = (content.match(/(\w+)":/g) || []).length
console.log("[v0] Found", errorCount, "syntax errors to fix")

// Fix all instances of property": to property:
// This regex matches word characters followed by ": and replaces with just :
content = content.replace(/(\w+)":/g, "$1:")

console.log("[v0] Fixed all syntax errors")
console.log("[v0] New file size:", content.length, "characters")

// Write the fixed content back
fs.writeFileSync(curriculumPath, content, "utf-8")

console.log("[v0] Successfully wrote fixed curriculum.ts")
console.log("[v0] Fixed", errorCount, "syntax errors")
