import fs from "fs"
import path from "path"

// Read the curriculum file
const curriculumPath = path.join(process.cwd(), "lib", "curriculum.ts")
let content = fs.readFileSync(curriculumPath, "utf-8")

// Fix all instances of property": to property:
const propertyNames = [
  "prompt",
  "correctAnswer",
  "hints",
  "description",
  "notation",
  "bassPattern",
  "audioPattern",
  "figuredBass",
  "options",
  "title",
]

propertyNames.forEach((prop) => {
  // Replace all instances of propertyName": with propertyName:
  const regex = new RegExp(`(\\s+)${prop}":\\s*`, "g")
  content = content.replace(regex, `$1${prop}: `)
})

// Write the fixed content back
fs.writeFileSync(curriculumPath, content, "utf-8")

console.log("Fixed all syntax errors in curriculum.ts")
