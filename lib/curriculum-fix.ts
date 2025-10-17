// Temporary script to fix all syntax errors in curriculum.ts
import fs from "fs"

const content = fs.readFileSync("lib/curriculum.ts", "utf-8")

// Fix all instances of property": to property:
const fixed = content.replace(/(\w+)":/g, "$1:")

fs.writeFileSync("lib/curriculum.ts", fixed, "utf-8")

console.log("Fixed all syntax errors in curriculum.ts")
