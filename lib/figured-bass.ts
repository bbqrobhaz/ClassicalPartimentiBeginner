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
 * Gets the diatonic note at a given interval above a bass note in C major
 * This respects the key signature, so intervals are diatonic, not chromatic
 */
function getDiatonicNote(bassNote: string, intervalNumber: number): { note: string; semitones: number } {
  // C major scale notes
  const cMajorScale = ["C", "D", "E", "F", "G", "A", "B"]

  // Find the bass note in the scale
  const bassIndex = cMajorScale.indexOf(bassNote)
  if (bassIndex === -1) {
    console.error(`[v0] Bass note ${bassNote} not in C major scale`)
    return { note: bassNote, semitones: 0 }
  }

  // Calculate the target note diatonically (wrapping around the scale)
  const targetIndex = (bassIndex + intervalNumber - 1) % 7
  const targetNote = cMajorScale[targetIndex]

  // Calculate the actual semitone distance
  const chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  const bassChromatic = chromaticScale.indexOf(bassNote)
  const targetChromatic = chromaticScale.indexOf(targetNote)

  // Calculate semitones, accounting for octave wrapping
  let semitones = targetChromatic - bassChromatic
  if (semitones < 0) semitones += 12

  // If we've gone past an octave in the diatonic scale, add 12 semitones
  const octaveOffset = Math.floor((bassIndex + intervalNumber - 1) / 7)
  semitones += octaveOffset * 12

  return { note: targetNote, semitones }
}

/**
 * Interprets figured bass notation and returns the intervals above the bass
 * Now returns diatonic intervals for C major
 */
export function interpretFiguredBass(figures: string): Array<{ intervalNumber: number }> {
  // Map figured bass to interval numbers (1=unison, 3=third, 5=fifth, etc.)
  const figureMap: Record<string, number[]> = {
    "5/3": [3, 5], // Triad: 3rd and 5th
    "6/3": [3, 6], // First inversion: 3rd and 6th
    "6/4": [4, 6], // Second inversion: 4th and 6th
    "7/5/3": [3, 5, 7], // Seventh chord: 3rd, 5th, and 7th
    "6/5/3": [3, 5, 6], // 7th chord, first inversion
    "6/4/3": [3, 4, 6], // 7th chord, second inversion
    "6/4/2": [2, 4, 6], // 7th chord, third inversion
    "9/5/3": [3, 5, 9], // 9th chord
    "8/5/3": [3, 5, 8], // Octave + 5th + 3rd
  }

  const intervals = figureMap[figures] || [3, 5] // Default to root position triad
  return intervals.map((num) => ({ intervalNumber: num }))
}

/**
 * Builds a complete chord voicing from a bass note and figured bass notation
 * Now uses diatonic intervals in C major
 */
export function buildChordFromFiguredBass(bassNote: string, bassOctave: number, figures: string): ChordNote[] {
  const intervals = interpretFiguredBass(figures)

  const chord: ChordNote[] = [{ note: bassNote, octave: bassOctave }]

  // Add each diatonic interval above the bass
  for (const interval of intervals) {
    const { note: targetNote, semitones } = getDiatonicNote(bassNote, interval.intervalNumber)

    // Calculate which octave the note should be in
    const octaveOffset = Math.floor(semitones / 12)
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
