import fs from "fs"
import path from "path"

// Read the curriculum file
const curriculumPath = path.join(process.cwd(), "lib", "curriculum.ts")
let content = fs.readFileSync(curriculumPath, "utf-8")

// Fix all instances of property": to property:
const fixes = [
  { from: /correctAnswer":/g, to: "correctAnswer:" },
  { from: /hints":/g, to: "hints:" },
  { from: /prompt":/g, to: "prompt:" },
  { from: /audioPattern":/g, to: "audioPattern:" },
  { from: /figuredBass":/g, to: "figuredBass:" },
  { from: /notation":/g, to: "notation:" },
  { from: /description":/g, to: "description:" },
  { from: /options":/g, to: "options:" },
]

let fixCount = 0
fixes.forEach(({ from, to }) => {
  const matches = content.match(from)
  if (matches) {
    fixCount += matches.length
    content = content.replace(from, to)
  }
})

// Write the fixed content back
fs.writeFileSync(curriculumPath, content, "utf-8")

console.log(`[v0] Fixed ${fixCount} syntax errors in curriculum.ts`)
