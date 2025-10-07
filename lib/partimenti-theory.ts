export type Interval =
  | "unison"
  | "minor-2nd"
  | "major-2nd"
  | "minor-3rd"
  | "major-3rd"
  | "perfect-4th"
  | "tritone"
  | "perfect-5th"
  | "minor-6th"
  | "major-6th"
  | "minor-7th"
  | "major-7th"
  | "octave"

export type GalantSchema = "prinner" | "romanesca" | "monte" | "fonte" | "fenaroli" | "quieszenza" | "meyer" | "jupiter"

export type CadenceType =
  | "simple-authentic"
  | "compound-authentic"
  | "half-cadence"
  | "deceptive"
  | "evaded"
  | "phrygian"
  | "plagal"

export type SuspensionType = "7-6" | "9-8" | "4-3" | "2-3"

export type DecorationType = "turn" | "appoggiatura" | "acciaccatura" | "passing-note" | "neighbor-note" | "escape-tone"

export interface RuleOfOctaveStep {
  degree: number
  bass: string
  figures: string[]
  description: string
}

export const RULE_OF_OCTAVE_ASCENDING: RuleOfOctaveStep[] = [
  { degree: 1, bass: "Do", figures: ["5/3"], description: "Tonic triad" },
  { degree: 2, bass: "Re", figures: ["6/3"], description: "First inversion" },
  { degree: 3, bass: "Mi", figures: ["6/3"], description: "First inversion" },
  { degree: 4, bass: "Fa", figures: ["5/3"], description: "Root position" },
  { degree: 5, bass: "Sol", figures: ["5/3"], description: "Dominant" },
  { degree: 6, bass: "La", figures: ["6/3"], description: "First inversion" },
  { degree: 7, bass: "Ti", figures: ["6/5/3"], description: "Diminished seventh" },
  { degree: 8, bass: "Do", figures: ["5/3"], description: "Tonic return" },
]

export const RULE_OF_OCTAVE_DESCENDING: RuleOfOctaveStep[] = [
  { degree: 8, bass: "Do", figures: ["5/3"], description: "Tonic" },
  { degree: 7, bass: "Ti", figures: ["6/3"], description: "First inversion" },
  { degree: 6, bass: "La", figures: ["5/3"], description: "Root position" },
  { degree: 5, bass: "Sol", figures: ["5/3"], description: "Dominant" },
  { degree: 4, bass: "Fa", figures: ["6/3"], description: "First inversion" },
  { degree: 3, bass: "Mi", figures: ["6/3"], description: "First inversion" },
  { degree: 2, bass: "Re", figures: ["7/5/3"], description: "Seventh chord" },
  { degree: 1, bass: "Do", figures: ["5/3"], description: "Tonic resolution" },
]

export interface GalantSchemaPattern {
  name: GalantSchema
  description: string
  bassLine: string[]
  figures: string[][]
  difficulty: "beginner" | "intermediate" | "advanced"
}

export const GALANT_SCHEMATA: GalantSchemaPattern[] = [
  {
    name: "prinner",
    description: "Descending stepwise pattern, common in opening themes",
    bassLine: ["6", "5", "4", "3"],
    figures: [["5/3"], ["6/3"], ["5/3"], ["6/3"]],
    difficulty: "beginner",
  },
  {
    name: "romanesca",
    description: "Descending tetrachord with characteristic harmonization",
    bassLine: ["1", "7", "6", "5"],
    figures: [["5/3"], ["6/3"], ["5/3"], ["5/3"]],
    difficulty: "beginner",
  },
  {
    name: "monte",
    description: "Ascending sequence by step",
    bassLine: ["1", "2", "2", "3", "3", "4"],
    figures: [["5/3"], ["6/3"], ["5/3"], ["6/3"], ["5/3"], ["6/3"]],
    difficulty: "intermediate",
  },
  {
    name: "fonte",
    description: "Descending sequence by step",
    bassLine: ["4", "3", "3", "2", "2", "1"],
    figures: [["5/3"], ["6/3"], ["5/3"], ["6/3"], ["7/5/3"], ["5/3"]],
    difficulty: "intermediate",
  },
  {
    name: "fenaroli",
    description: "Ascending pattern with characteristic 7-6 suspension",
    bassLine: ["1", "2", "3", "4"],
    figures: [["5/3"], ["7/5/3", "6/3"], ["7/5/3", "6/3"], ["5/3"]],
    difficulty: "intermediate",
  },
  {
    name: "quieszenza",
    description: "Resting pattern with suspension resolution",
    bassLine: ["2", "1"],
    figures: [["7/5/3"], ["5/3"]],
    difficulty: "beginner",
  },
]

export interface CadencePattern {
  type: CadenceType
  description: string
  bassLine: string[]
  figures: string[][]
  difficulty: "beginner" | "intermediate" | "advanced"
}

export const CADENCE_PATTERNS: CadencePattern[] = [
  {
    type: "simple-authentic",
    description: "V-I cadence in root position",
    bassLine: ["5", "1"],
    figures: [["5/3"], ["5/3"]],
    difficulty: "beginner",
  },
  {
    type: "compound-authentic",
    description: "IV-V-I or ii-V-I cadence",
    bassLine: ["4", "5", "1"],
    figures: [["5/3"], ["5/3"], ["5/3"]],
    difficulty: "intermediate",
  },
  {
    type: "half-cadence",
    description: "Ending on dominant",
    bassLine: ["1", "5"],
    figures: [["5/3"], ["5/3"]],
    difficulty: "beginner",
  },
  {
    type: "deceptive",
    description: "V-vi instead of V-I",
    bassLine: ["5", "6"],
    figures: [["5/3"], ["5/3"]],
    difficulty: "intermediate",
  },
  {
    type: "evaded",
    description: "Expected cadence avoided through continuation",
    bassLine: ["5", "6", "4", "5"],
    figures: [["5/3"], ["5/3"], ["6/3"], ["5/3"]],
    difficulty: "advanced",
  },
]

export interface SuspensionPattern {
  type: SuspensionType
  description: string
  preparation: string
  suspension: string
  resolution: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export const SUSPENSION_PATTERNS: SuspensionPattern[] = [
  {
    type: "7-6",
    description: "Seventh resolving to sixth",
    preparation: "5/3",
    suspension: "7/5/3",
    resolution: "6/3",
    difficulty: "beginner",
  },
  {
    type: "9-8",
    description: "Ninth resolving to octave",
    preparation: "5/3",
    suspension: "9/5/3",
    resolution: "8/5/3",
    difficulty: "intermediate",
  },
  {
    type: "4-3",
    description: "Fourth resolving to third",
    preparation: "6/3",
    suspension: "6/4/3",
    resolution: "6/3",
    difficulty: "beginner",
  },
  {
    type: "2-3",
    description: "Second resolving to third",
    preparation: "6/3",
    suspension: "6/4/2",
    resolution: "6/3",
    difficulty: "intermediate",
  },
]

export interface DecorationPattern {
  type: DecorationType
  description: string
  pattern: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
}

export const DECORATION_PATTERNS: DecorationPattern[] = [
  {
    type: "passing-note",
    description: "Stepwise connection between two chord tones",
    pattern: ["C", "D", "E"],
    difficulty: "beginner",
  },
  {
    type: "neighbor-note",
    description: "Step away and return to the same note",
    pattern: ["C", "D", "C"],
    difficulty: "beginner",
  },
  {
    type: "turn",
    description: "Ornamental figure around a principal note",
    pattern: ["C", "D", "C", "B", "C"],
    difficulty: "intermediate",
  },
  {
    type: "appoggiatura",
    description: "Accented non-chord tone resolving by step",
    pattern: ["D", "C"],
    difficulty: "intermediate",
  },
  {
    type: "acciaccatura",
    description: "Quick grace note before the main note",
    pattern: ["B", "C"],
    difficulty: "intermediate",
  },
  {
    type: "escape-tone",
    description: "Stepwise approach, leap away",
    pattern: ["C", "D", "F"],
    difficulty: "advanced",
  },
]

export const INTERVALS: { name: Interval; semitones: number; difficulty: "easy" | "medium" | "hard" }[] = [
  { name: "unison", semitones: 0, difficulty: "easy" },
  { name: "minor-2nd", semitones: 1, difficulty: "medium" },
  { name: "major-2nd", semitones: 2, difficulty: "easy" },
  { name: "minor-3rd", semitones: 3, difficulty: "easy" },
  { name: "major-3rd", semitones: 4, difficulty: "easy" },
  { name: "perfect-4th", semitones: 5, difficulty: "easy" },
  { name: "tritone", semitones: 6, difficulty: "hard" },
  { name: "perfect-5th", semitones: 7, difficulty: "easy" },
  { name: "minor-6th", semitones: 8, difficulty: "medium" },
  { name: "major-6th", semitones: 9, difficulty: "medium" },
  { name: "minor-7th", semitones: 10, difficulty: "medium" },
  { name: "major-7th", semitones: 11, difficulty: "hard" },
  { name: "octave", semitones: 12, difficulty: "easy" },
]

export function getIntervalName(interval: Interval): string {
  const names: Record<Interval, string> = {
    unison: "Unison",
    "minor-2nd": "Minor 2nd",
    "major-2nd": "Major 2nd",
    "minor-3rd": "Minor 3rd",
    "major-3rd": "Major 3rd",
    "perfect-4th": "Perfect 4th",
    tritone: "Tritone",
    "perfect-5th": "Perfect 5th",
    "minor-6th": "Minor 6th",
    "major-6th": "Major 6th",
    "minor-7th": "Minor 7th",
    "major-7th": "Major 7th",
    octave: "Octave",
  }
  return names[interval]
}

export function getSchemaName(schema: GalantSchema): string {
  const names: Record<GalantSchema, string> = {
    prinner: "Prinner",
    romanesca: "Romanesca",
    monte: "Monte",
    fonte: "Fonte",
    fenaroli: "Fenaroli",
    quieszenza: "Quieszenza",
    meyer: "Meyer",
    jupiter: "Jupiter",
  }
  return names[schema]
}

export function noteToFrequency(note: string, octave: number): number {
  const noteMap: Record<string, number> = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11,
  }

  const semitones = noteMap[note]
  if (semitones === undefined) {
    throw new Error(`Invalid note: ${note}`)
  }

  // MIDI note number: C4 = 60, A4 = 69
  const midiNote = (octave + 1) * 12 + semitones
  // A4 = 440 Hz, frequency = 440 * 2^((n-69)/12)
  return 440 * Math.pow(2, (midiNote - 69) / 12)
}

export function getIntervalFrequency(rootNote: string, rootOctave: number, semitones: number): number {
  const rootFreq = noteToFrequency(rootNote, rootOctave)
  // Each semitone multiplies frequency by 2^(1/12)
  return rootFreq * Math.pow(2, semitones / 12)
}
