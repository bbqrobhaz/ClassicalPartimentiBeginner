import fs from "fs"
import path from "path"

// Read the curriculum file
const curriculumPath = path.join(process.cwd(), "lib", "curriculum.ts")
let content = fs.readFileSync(curriculumPath, "utf-8")

console.log("[v0] Starting syntax fix...")
console.log("[v0] Original file size:", content.length, "characters")

// Count occurrences before fix
const beforeCount = (content.match(/\w+":/g) || []).length
console.log("[v0] Found", beforeCount, "syntax errors to fix")

// Fix all instances of property": to property:
// This regex matches: word characters followed by ":
content = content.replace(/(\w+)":/g, "$1:")

// Count occurrences after fix
const afterCount = (content.match(/\w+":/g) || []).length
console.log("[v0] Remaining syntax errors:", afterCount)
console.log("[v0] Fixed", beforeCount - afterCount, "syntax errors")

// Write the fixed content back
fs.writeFileSync(curriculumPath, content, "utf-8")

console.log("[v0] Syntax fix complete!")
console.log("[v0] File written successfully")
