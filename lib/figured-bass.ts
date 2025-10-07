// Utility functions for interpreting figured bass notation and building proper chord voicings

export interface ChordNote {
  note: string
  octave: number
}

/**
 * Converts a scale degree (1-7) to a note name in C major
 */
export function degreeToNote(degree: string, key = "C"): string {
  const degreeNum = Number.parseInt(degree)

  // For now, we only support C major
  const noteMap: Record<number, string> = {
    1: "C",
    2: "D",
    3: "E",
    4: "F",
    5: "G",
    6: "A",
    7: "B",
  }

  return noteMap[degreeNum] || "C"
}

/**
 * Interprets figured bass notation and returns the intervals above the bass
 * Examples:
 * - "5/3" = root position triad (3rd and 5th above bass)
 * - "6/3" = first inversion (3rd and 6th above bass)
 * - "6/4" = second inversion (4th and 6th above bass)
 * - "7/5/3" = seventh chord (3rd, 5th, and 7th above bass)
 */
export function interpretFiguredBass(figures: string): number[] {
  // Map common figured bass notations to intervals (in semitones)
  const figureMap: Record<string, number[]> = {
    "5/3": [4, 7], // Major/minor triad: 3rd (4 semitones) + 5th (7 semitones)
    "6/3": [4, 9], // First inversion: 3rd + 6th
    "6/4": [5, 9], // Second inversion: 4th + 6th
    "7/5/3": [4, 7, 10], // Dominant 7th: 3rd + 5th + minor 7th
    "6/5/3": [4, 8, 10], // 7th chord, first inversion
    "6/4/3": [3, 5, 9], // 7th chord, second inversion
    "6/4/2": [2, 5, 9], // 7th chord, third inversion
    "9/5/3": [4, 7, 14], // 9th chord
    "8/5/3": [4, 7, 12], // Octave + 5th + 3rd
  }

  return figureMap[figures] || [4, 7] // Default to root position triad
}

/**
 * Builds a complete chord voicing from a bass note and figured bass notation
 */
export function buildChordFromFiguredBass(bassNote: string, bassOctave: number, figures: string): ChordNote[] {
  const intervals = interpretFiguredBass(figures)

  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  const bassIndex = noteNames.indexOf(bassNote)

  if (bassIndex === -1) {
    console.error(`[v0] Invalid bass note: ${bassNote}`)
    return [{ note: bassNote, octave: bassOctave }]
  }

  const chord: ChordNote[] = [{ note: bassNote, octave: bassOctave }]

  // Add each interval above the bass
  for (const interval of intervals) {
    const targetIndex = (bassIndex + interval) % 12
    const targetNote = noteNames[targetIndex]

    // Calculate which octave the note should be in
    // If the note index wrapped around, we need to go up an octave
    const octaveOffset = Math.floor((bassIndex + interval) / 12)
    const targetOctave = bassOctave + octaveOffset

    chord.push({ note: targetNote, octave: targetOctave })
  }

  console.log(`[v0] Built chord from ${bassNote}${bassOctave} with figures ${figures}:`, chord)

  return chord
}

/**
 * Builds a suspension chord progression (preparation, suspension, resolution)
 */
export function buildSuspensionProgression(
  suspensionType: string,
  bassOctave = 3,
): { preparation: ChordNote[]; suspension: ChordNote[]; resolution: ChordNote[] } {
  // Define suspension patterns with proper voice leading
  const suspensionPatterns: Record<
    string,
    {
      prep: { bass: string; upper: string[] }
      susp: { bass: string; upper: string[] }
      res: { bass: string; upper: string[] }
    }
  > = {
    "7-6": {
      prep: { bass: "D", upper: ["F", "A", "C"] }, // ii7 chord (prepares the C)
      susp: { bass: "D", upper: ["C", "F", "A"] }, // 7th (C) above bass D is suspended
      res: { bass: "D", upper: ["B", "F", "A"] }, // 7th resolves down to 6th (B)
    },
    "9-8": {
      prep: { bass: "C", upper: ["E", "G"] }, // I chord
      susp: { bass: "C", upper: ["D", "E", "G"] }, // 9th suspension
      res: { bass: "C", upper: ["C", "E", "G"] }, // Resolution to octave
    },
    "4-3": {
      prep: { bass: "C", upper: ["E", "G"] }, // I chord
      susp: { bass: "C", upper: ["F", "G"] }, // 4th suspension
      res: { bass: "C", upper: ["E", "G"] }, // Resolution to 3rd
    },
    "2-3": {
      prep: { bass: "D", upper: ["F", "A"] }, // ii chord
      susp: { bass: "D", upper: ["E", "A"] }, // 2nd suspension (E is 2nd above D)
      res: { bass: "D", upper: ["F", "A"] }, // Resolution to 3rd
    },
  }

  const pattern = suspensionPatterns[suspensionType] || suspensionPatterns["4-3"]

  const buildChord = (bass: string, upper: string[]): ChordNote[] => {
    const chord: ChordNote[] = [{ note: bass, octave: bassOctave }]
    upper.forEach((note) => {
      chord.push({ note, octave: bassOctave + 1 })
    })
    return chord
  }

  return {
    preparation: buildChord(pattern.prep.bass, pattern.prep.upper),
    suspension: buildChord(pattern.susp.bass, pattern.susp.upper),
    resolution: buildChord(pattern.res.bass, pattern.res.upper),
  }
}
