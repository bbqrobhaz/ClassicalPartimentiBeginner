import type { Lesson, Achievement, SkillLevel } from "./types"

export const CURRICULUM: Lesson[] = [
  {
    id: "scale-degrees",
    title: "Understanding Scale Degrees",
    category: "foundations",
    level: 1,
    prerequisites: [],
    description: "Learn the Do-Re-Mi system and how scale degrees form the foundation of partimenti.",
    content: {
      theory:
        "In partimenti, we use the Do-Re-Mi system (movable Do solfège) where Do is always the tonic (home note) of the key. Each scale degree has a specific function: Do (1) is stable, Re (2) moves upward, Mi (3) defines major/minor, Fa (4) pulls to Mi, Sol (5) is the dominant, La (6) is flexible, and Ti (7) leads to Do.",
      examples: [
        {
          id: "scale-c-major",
          description: "C Major scale with Do-Re-Mi labels",
          notation: "Do Re Mi Fa Sol La Ti Do",
          audioPattern: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
          figuredBass: "Do Re Mi Fa Sol La Ti Do",
        },
      ],
      exercises: [
        {
          id: "identify-do",
          type: "identify",
          prompt: "Listen to the note. Which scale degree is it?",
          audioPattern: ["C4"],
          options: ["Do (1)", "Re (2)", "Mi (3)", "Fa (4)"],
          correctAnswer: "Do (1)",
          hints: ["This is the home note, the tonic, the most stable scale degree"],
        },
        {
          id: "identify-sol",
          type: "identify",
          prompt: "Listen to the note. Which scale degree is it?",
          audioPattern: ["G4"],
          options: ["Do (1)", "Mi (3)", "Sol (5)", "Ti (7)"],
          correctAnswer: "Sol (5)",
          hints: ["This is the dominant, the second most important scale degree"],
        },
      ],
    },
    difficulty: "beginner",
    tradition: "Italian",
    xpReward: 50,
  },
  {
    id: "do-chord",
    title: "The Do Chord (Tonic Triad)",
    category: "chords",
    level: 1,
    prerequisites: ["scale-degrees"],
    description: "Master the tonic triad - the home chord that provides stability and resolution.",
    content: {
      theory:
        "The Do chord (I) is built on the first scale degree and consists of Do-Mi-Sol (1-3-5). It's the most stable chord in any key and serves as the point of departure and return. In figured bass, it's often unmarked or shown as '5/3'.",
      examples: [
        {
          id: "do-chord-root",
          description: "Do chord in root position (Do-Mi-Sol)",
          notation: "[C E G]",
          audioPattern: ["C4", "E4", "G4"],
          figuredBass: "5/3 or unmarked",
        },
        {
          id: "do-chord-first-inv",
          description: "Do chord in first inversion (Mi-Sol-Do)",
          notation: "[E G C]",
          audioPattern: ["E4", "G4", "C5"],
          figuredBass: "6",
        },
      ],
      exercises: [
        {
          id: "play-do-chord",
          type: "play",
          prompt: "Play the Do chord in root position (C-E-G)",
          correctAnswer: "C E G",
          hints: ["Start with C, then add E and G above it"],
        },
        {
          id: "identify-do-inversions",
          type: "identify",
          prompt: "Is this Do chord in root position or first inversion?",
          audioPattern: ["C4", "E4", "G4"],
          options: ["Root position", "First inversion"],
          correctAnswer: "Root position",
          hints: ["Listen for the lowest note - is it Do or Mi?"],
        },
      ],
    },
    difficulty: "beginner",
    tradition: "Italian",
    xpReward: 75,
  },
  {
    id: "re-chord",
    title: "The Re Chord (Supertonic)",
    category: "chords",
    level: 1,
    prerequisites: ["do-chord"],
    description: "Learn the supertonic chord that creates forward motion toward the dominant.",
    content: {
      theory:
        "The Re chord (ii) is built on the second scale degree: Re-Fa-La (2-4-6). It's a minor chord in major keys and diminished in minor keys. The Re chord typically moves to Sol (V) or Do (I), creating a sense of gentle forward motion.",
      examples: [
        {
          id: "re-chord-root",
          description: "Re chord in root position (Re-Fa-La)",
          notation: "[D F A]",
          audioPattern: ["D4", "F4", "A4"],
          figuredBass: "5/3",
        },
        {
          id: "re-to-sol",
          description: "Re chord moving to Sol (ii-V progression)",
          notation: "[D F A] → [G B D]",
          audioPattern: ["D4", "F4", "A4"],
          figuredBass: "ii - V",
        },
      ],
      exercises: [
        {
          id: "play-re-chord",
          type: "play",
          prompt: "Play the Re chord in root position (D-F-A)",
          correctAnswer: "D F A",
          hints: ["Start with D, then add F and A above it"],
        },
        {
          id: "re-to-sol-progression",
          type: "play",
          prompt: "Play the progression: Re chord to Sol chord (D-F-A then G-B-D)",
          correctAnswer: "D F A G B D",
          hints: ["Play D-F-A, then G-B-D"],
        },
      ],
    },
    difficulty: "beginner",
    tradition: "Italian",
    xpReward: 75,
  },
  {
    id: "mi-chord",
    title: "The Mi Chord (Mediant)",
    category: "chords",
    level: 1,
    prerequisites: ["re-chord"],
    description: "Explore the mediant chord that bridges tonic and dominant functions.",
    content: {
      theory:
        "The Mi chord (iii) is built on the third scale degree: Mi-Sol-Ti (3-5-7). It's a minor chord in major keys. The Mi chord shares two notes with the Do chord (Mi and Sol), making it a gentle alternative to the tonic. It often moves to Fa (IV) or La (vi).",
      examples: [
        {
          id: "mi-chord-root",
          description: "Mi chord in root position (Mi-Sol-Ti)",
          notation: "[E G B]",
          audioPattern: ["E4", "G4", "B4"],
          figuredBass: "5/3",
        },
        {
          id: "do-mi-fa",
          description: "Common progression: Do-Mi-Fa (I-iii-IV)",
          notation: "[C E G] → [E G B] → [F A C]",
          audioPattern: ["C4", "E4", "G4"],
          figuredBass: "I - iii - IV",
        },
      ],
      exercises: [
        {
          id: "play-mi-chord",
          type: "play",
          prompt: "Play the Mi chord in root position (E-G-B)",
          correctAnswer: "E G B",
          hints: ["Start with E, then add G and B above it"],
        },
        {
          id: "identify-mi-chord",
          type: "identify",
          prompt: "Which chord do you hear?",
          audioPattern: ["E4", "G4", "B4"],
          options: ["Do chord", "Re chord", "Mi chord", "Fa chord"],
          correctAnswer: "Mi chord",
          hints: ["This chord shares notes with the Do chord but has a minor quality"],
        },
      ],
    },
    difficulty: "beginner",
    tradition: "Italian",
    xpReward: 75,
  },
  {
    id: "fa-chord",
    title: "The Fa Chord (Subdominant)",
    category: "chords",
    level: 1,
    prerequisites: ["mi-chord"],
    description: "Master the subdominant chord that prepares dominant and tonic arrivals.",
    content: {
      theory:
        "The Fa chord (IV) is built on the fourth scale degree: Fa-La-Do (4-6-1). It's a major chord that creates a sense of departure from the tonic. The Fa chord typically moves to Sol (V) or directly to Do (I), and is essential in authentic cadences (IV-V-I).",
      examples: [
        {
          id: "fa-chord-root",
          description: "Fa chord in root position (Fa-La-Do)",
          notation: "[F A C]",
          audioPattern: ["F4", "A4", "C5"],
          figuredBass: "5/3",
        },
        {
          id: "plagal-cadence",
          description: "Plagal cadence: Fa-Do (IV-I)",
          notation: "[F A C] → [C E G]",
          audioPattern: ["F4", "A4", "C5"],
          figuredBass: "IV - I",
        },
      ],
      exercises: [
        {
          id: "play-fa-chord",
          type: "play",
          prompt: "Play the Fa chord in root position (F-A-C)",
          correctAnswer: "F A C",
          hints: ["Start with F, then add A and C above it"],
        },
        {
          id: "fa-sol-do-progression",
          type: "play",
          prompt: "Play the authentic cadence: Fa-Sol-Do (F-A-C, G-B-D, C-E-G)",
          correctAnswer: "F A C G B D C E G",
          hints: ["Play three chords: F-A-C, then G-B-D, then C-E-G"],
        },
      ],
    },
    difficulty: "beginner",
    tradition: "Italian",
    xpReward: 75,
  },
  {
    id: "cadences",
    title: "Cadences: Musical Punctuation",
    category: "progressions",
    level: 2,
    prerequisites: ["fa-chord"],
    description: "Learn how cadences create phrases and provide closure in baroque music.",
    content: {
      theory:
        "Cadences are harmonic formulas that create points of rest or closure. The authentic cadence (V-I) provides strong closure, the half cadence (ending on V) creates suspense, and the deceptive cadence (V-vi) surprises by avoiding the expected resolution. Cadences are the punctuation marks of musical phrases.",
      examples: [
        {
          id: "authentic-cadence",
          description: "Authentic cadence: Sol-Do (V-I)",
          notation: "[G B D] → [C E G]",
          audioPattern: ["G4", "B4", "D5"],
          figuredBass: "V - I",
        },
        {
          id: "half-cadence",
          description: "Half cadence: ending on Sol (V)",
          notation: "[C E G] → [G B D]",
          audioPattern: ["C4", "E4", "G4"],
          figuredBass: "I - V",
        },
        {
          id: "deceptive-cadence",
          description: "Deceptive cadence: Sol-La (V-vi)",
          notation: "[G B D] → [A C E]",
          audioPattern: ["G4", "B4", "D5"],
          figuredBass: "V - vi",
        },
      ],
      exercises: [
        {
          id: "identify-authentic",
          type: "identify",
          prompt: "What type of cadence is this?",
          audioPattern: ["G4", "B4", "D5"],
          options: ["Authentic cadence", "Half cadence", "Deceptive cadence"],
          correctAnswer: "Authentic cadence",
          hints: ["Does it end on the tonic (Do) or dominant (Sol)?"],
        },
        {
          id: "identify-half",
          type: "identify",
          prompt: "What type of cadence is this?",
          audioPattern: ["C4", "E4", "G4"],
          options: ["Authentic cadence", "Half cadence", "Deceptive cadence"],
          correctAnswer: "Half cadence",
          hints: ["This cadence ends on the dominant, creating suspense"],
        },
        {
          id: "play-authentic-cadence",
          type: "play",
          prompt: "Play an authentic cadence (V-I): G-B-D then C-E-G",
          correctAnswer: "G B D C E G",
          hints: ["Play the Sol chord (G-B-D) followed by the Do chord (C-E-G)"],
        },
      ],
    },
    difficulty: "intermediate",
    tradition: "Italian",
    xpReward: 100,
  },
  {
    id: "rule-of-octave",
    title: "Rule of the Octave",
    category: "progressions",
    level: 2,
    prerequisites: ["cadences"],
    description: "Master the fundamental bass pattern that harmonizes ascending and descending scales.",
    content: {
      theory:
        "The Rule of the Octave is the most important pattern in baroque keyboard playing. It provides a standard harmonization for bass scales, both ascending and descending. Each scale degree receives specific chords and figured bass numbers. This pattern appears in countless baroque compositions and is essential for improvisation.",
      examples: [
        {
          id: "rule-ascending",
          description: "Rule of the Octave ascending in C major",
          audioPattern: [
            ["C4", "E4", "G4"],
            ["D4", "F4", "A4"],
            ["E4", "G4", "C5"],
            ["F4", "A4", "C5"],
            ["G4", "B4", "D5"],
            ["A4", "C5", "E5"],
            ["B4", "D5", "F5"],
            ["C5", "E5", "G5"],
          ],
          figuredBass: "5/3 - 6/3 - 6 - 5/3 - 5/3 - 6/5 - 6/4 - 5/3",
        },
        {
          id: "rule-descending",
          description: "Rule of the Octave descending in C major",
          audioPattern: [
            ["C5", "E5", "G5"],
            ["B4", "D5", "G5"],
            ["A4", "C5", "F5"],
            ["G4", "B4", "E5"],
            ["F4", "A4", "D5"],
            ["E4", "G4", "C5"],
            ["D4", "F4", "B4"],
            ["C4", "E4", "G4"],
          ],
          figuredBass: "5/3 - 6 - 6/5 - 6 - 6/5 - 5/3 - 7 - 5/3",
        },
      ],
      exercises: [
        {
          id: "play-rule-ascending",
          type: "keyboard",
          prompt: "Play the Rule of the Octave ascending",
          difficulty: "intermediate",
        },
        {
          id: "play-rule-descending",
          type: "keyboard",
          prompt: "Play the Rule of the Octave descending",
          difficulty: "intermediate",
        },
        {
          id: "identify-rule-patterns",
          type: "identification",
          prompt: "Identify whether the Rule of the Octave is ascending or descending",
          difficulty: "intermediate",
        },
      ],
    },
    difficulty: "intermediate",
    tradition: "Italian",
    xpReward: 350,
  },
  {
    id: "suspensions",
    title: "Suspensions: Creating Expressive Tension",
    category: "decorations",
    level: 3,
    prerequisites: ["rule-of-octave"],
    description: "Learn how suspensions delay resolution to create expressive dissonance.",
    content: {
      theory:
        "A suspension is a note held over from one chord into the next, creating a dissonance that then resolves downward by step. The three parts are: preparation (consonance), suspension (dissonance), and resolution (consonance). Common suspensions include 4-3, 7-6, 9-8, and 2-3. Suspensions add expressiveness and forward motion to baroque music.",
      examples: [
        {
          id: "suspension-4-3",
          description: "4-3 suspension",
          audioPattern: [
            ["C4", "F4"],
            ["C4", "E4"],
          ],
          figuredBass: "4 - 3",
        },
        {
          id: "suspension-7-6",
          description: "7-6 suspension",
          audioPattern: [
            ["D4", "C5"],
            ["D4", "B4"],
          ],
          figuredBass: "7 - 6",
        },
        {
          id: "suspension-9-8",
          description: "9-8 suspension",
          audioPattern: [
            ["C4", "D5"],
            ["C4", "C5"],
          ],
          figuredBass: "9 - 8",
        },
      ],
      exercises: [
        {
          id: "identify-suspension-types",
          type: "identification",
          prompt: "Identify the type of suspension: 4-3, 7-6, 9-8, or 2-3",
          difficulty: "advanced",
        },
        {
          id: "play-suspensions",
          type: "keyboard",
          prompt: "Play a 4-3 suspension resolving properly",
          difficulty: "advanced",
        },
      ],
    },
    difficulty: "advanced",
    tradition: "Italian",
    xpReward: 400,
  },
  {
    id: "romanesca",
    title: "Galant Schema: Romanesca",
    category: "schemata",
    level: 3,
    prerequisites: ["suspensions"],
    description: "Master the Romanesca, one of the most beloved patterns in Western music.",
    content: {
      theory:
        "The ROMANESCA is one of the oldest and most beloved patterns in Western music, appearing in countless songs, dances, and instrumental works from the Renaissance through the Baroque era. The bass descends by step: 1-7-6-5 (in C major: C-B-A-G). Above this descending bass, the upper voices create a series of consonances that give the Romanesca its characteristic sound. The standard harmonization uses: I - V6 - vi - III (or V/vi). This pattern appears in works by Corelli, Vivaldi, and countless other baroque masters.",
      examples: [
        {
          id: "romanesca-basic",
          description: "Basic Romanesca pattern in C major",
          audioPattern: [
            ["C4", "E4", "G4"],
            ["B3", "D4", "G4"],
            ["A3", "C4", "E4"],
            ["G3", "B3", "D4"],
          ],
          figuredBass: "1 - 7(6) - 6 - 5",
        },
        {
          id: "romanesca-with-chords",
          description: "Romanesca with full chords (I - V6 - vi - III)",
          audioPattern: [
            ["C4", "E4", "G4", "C5"],
            ["B3", "D4", "G4", "B4"],
            ["A3", "C4", "E4", "A4"],
            ["G3", "B3", "D4", "G4"],
          ],
          figuredBass: "I - V6 - vi - III",
        },
        {
          id: "romanesca-diminished",
          description: "Romanesca with simple diminutions (eighth notes)",
          audioPattern: [
            ["C4", "E4", "G4"],
            ["D4"],
            ["B3", "D4", "G4"],
            ["C4"],
            ["A3", "C4", "E4"],
            ["B3"],
            ["G3", "B3", "D4"],
          ],
          figuredBass: "I - (passing) - V6 - (passing) - vi - (passing) - III",
        },
      ],
      exercises: [
        {
          id: "identify-romanesca",
          type: "identification",
          prompt: "Listen and identify when you hear a Romanesca pattern",
          difficulty: "advanced",
        },
        {
          id: "play-romanesca",
          type: "keyboard",
          prompt: "Play the Romanesca pattern with proper voice leading",
          difficulty: "advanced",
        },
        {
          id: "romanesca-with-diminutions",
          type: "composition",
          prompt: "Create a Romanesca pattern and add your own diminutions (passing notes, neighbor tones)",
          difficulty: "advanced",
        },
      ],
    },
    difficulty: "advanced",
    tradition: "Italian",
    xpReward: 450,
  },
  {
    id: "do-re-mi-schema",
    title: "Galant Schema: Do-Re-Mi",
    category: "schemata",
    level: 3,
    prerequisites: ["romanesca"],
    description: "Learn the ascending Do-Re-Mi pattern that creates optimistic, rising energy.",
    content: {
      theory:
        "The DO-RE-MI schema is a rising bass pattern (1-2-3) that creates a sense of optimism and forward momentum. Unlike the descending Romanesca, this pattern ascends through the first three scale degrees. The standard harmonization is: I - V6/4 - I6 (or I - ii6 - I6). This pattern appears frequently in opening phrases and creates a bright, affirmative character. Composers like Handel and Vivaldi used it to begin movements with energy and confidence.",
      examples: [
        {
          id: "do-re-mi-basic",
          description: "Basic Do-Re-Mi pattern in C major",
          audioPattern: [
            ["C4", "E4", "G4"],
            ["D4", "F4", "G4"],
            ["E4", "G4", "C5"],
          ],
          figuredBass: "1 - 2(6/4) - 3(6)",
        },
        {
          id: "do-re-mi-with-chords",
          description: "Do-Re-Mi with full chords (I - V6/4 - I6)",
          audioPattern: [
            ["C4", "E4", "G4", "C5"],
            ["D4", "F4", "G4", "B4"],
            ["E4", "G4", "C5", "E5"],
          ],
          figuredBass: "I - V6/4 - I6",
        },
        {
          id: "do-re-mi-diminished",
          description: "Do-Re-Mi with passing tones and neighbor notes",
          audioPattern: [["C4", "E4", "G4"], ["D4"], ["D4", "F4", "G4"], ["E4"], ["E4", "G4", "C5"]],
          figuredBass: "I - (passing) - V6/4 - (passing) - I6",
        },
      ],
      exercises: [
        {
          id: "identify-do-re-mi",
          type: "identification",
          prompt: "Listen and identify when you hear a Do-Re-Mi pattern",
          difficulty: "advanced",
        },
        {
          id: "play-do-re-mi",
          type: "keyboard",
          prompt: "Play the Do-Re-Mi pattern with proper voice leading",
          difficulty: "advanced",
        },
        {
          id: "do-re-mi-with-diminutions",
          type: "composition",
          prompt: "Create a Do-Re-Mi pattern and add your own diminutions",
          difficulty: "advanced",
        },
        {
          id: "combine-schemas",
          type: "composition",
          prompt: "Combine a Do-Re-Mi opening with a Romanesca continuation to create a complete phrase",
          difficulty: "advanced",
        },
      ],
    },
    difficulty: "advanced",
    tradition: "Italian",
    xpReward: 500,
  },
  {
    id: "monte-schema",
    title: "Galant Schema: Monte (The Climb)",
    category: "schemata",
    level: 4,
    prerequisites: ["do-re-mi-schema"],
    description: "Master the Monte, a rising sequential pattern that creates dramatic tension and forward drive.",
    content: {
      theory:
        "The MONTE (Italian for 'mountain') is a rising sequential pattern used for transitions and building tension. The melody ascends: do-ti-la-re-do-ti, while the bass climbs: mi-fa-fi-sol (3-4-#4-5). The harmony alternates 6-5-6-5, creating a sense of striving upward. This schema appears frequently in Corelli's sonatas and Vivaldi's concertos as a way to modulate or build energy before a cadence. The chromatic #4 (fi) in the bass is crucial - it creates the leading tone to sol (5), intensifying the drive toward the dominant.",
      examples: [
        {
          id: "monte-basic",
          description: "Basic Monte pattern in C major (ascending to dominant)",
          audioPattern: [
            ["E4", "G4", "C5"],
            ["F4", "A4", "D5"],
            ["F#4", "A4", "D5"],
            ["G4", "B4", "D5"],
          ],
          figuredBass: "6 - 5 - 6 - 5",
        },
        {
          id: "monte-corelli",
          description: "Monte as used by Corelli (with suspensions)",
          audioPattern: [
            ["E4", "G4", "C5"],
            ["F4", "A4", "C5"],
            ["F4", "A4", "D5"],
            ["F#4", "A4", "D5"],
            ["F#4", "A4", "D5"],
            ["G4", "B4", "D5"],
          ],
          figuredBass: "6 - 7-6 - 5 - 7-6 - 5",
        },
        {
          id: "monte-diminished",
          description: "Monte with Baroque diminutions (scalar runs)",
          audioPattern: [
            ["E4", "G4", "C5"],
            ["F4", "G4"],
            ["F4", "A4", "D5"],
            ["E5"],
            ["F#4", "A4", "D5"],
            ["G4", "A4"],
            ["G4", "B4", "D5"],
          ],
          figuredBass: "6 - (passing) - 5 - (neighbor) - 6 - (passing) - 5",
        },
      ],
      exercises: [
        {
          id: "identify-monte",
          type: "identification",
          prompt: "Identify the Monte pattern and notice the chromatic bass ascent",
          difficulty: "advanced",
        },
        {
          id: "play-monte",
          type: "keyboard",
          prompt: "Play the Monte pattern with the chromatic #4 in the bass",
          difficulty: "advanced",
        },
        {
          id: "monte-with-suspensions",
          type: "composition",
          prompt: "Add 7-6 suspensions to your Monte pattern like Corelli",
          difficulty: "advanced",
        },
      ],
    },
    difficulty: "advanced",
    tradition: "Italian",
    xpReward: 550,
  },
  {
    id: "fonte-schema",
    title: "Galant Schema: Fonte (The Fountain)",
    category: "schemata",
    level: 4,
    prerequisites: ["monte-schema"],
    description: "Learn the Fonte, a descending sequential pattern that creates elegant, flowing phrases.",
    content: {
      theory:
        "The FONTE (Italian for 'fountain') is a descending sequential pattern that flows downward like water. It consists of two pairs of events: the first pair in a minor key, the second pair one step lower in major. The melody descends: sol-fa-fa-mi, with an ascending bass and 6/5-5-6/5-5 harmony. The Fonte typically appears after the double bar in binary forms or as a digressive episode. Bach uses it frequently in his keyboard suites, and it appears in countless galant-era works. The pattern creates a sense of elegant descent and often leads back to the tonic or prepares a cadence.",
      examples: [
        {
          id: "fonte-basic",
          description: "Basic Fonte pattern (two descending sequences)",
          audioPattern: [
            ["G4", "B4", "D5"],
            ["F4", "A4", "C5"],
            ["F4", "A4", "C5"],
            ["E4", "G4", "C5"],
          ],
          figuredBass: "6/5 - 5 - 6/5 - 5",
        },
        {
          id: "fonte-bach",
          description: "Fonte as used by Bach (with voice exchange)",
          audioPattern: [
            ["D4", "G4", "B4"],
            ["D4", "F4", "A4"],
            ["C4", "F4", "A4"],
            ["C4", "E4", "G4"],
          ],
          figuredBass: "6/5 - 5/3 - 6/5 - 5/3",
        },
        {
          id: "fonte-diminished",
          description: "Fonte with Baroque diminutions (arpeggiation and passing tones)",
          audioPattern: [
            ["D4", "G4", "B4"],
            ["C4", "D4"],
            ["D4", "F4", "A4"],
            ["C4", "F4", "A4"],
            ["B3", "C4"],
            ["C4", "E4", "G4"],
          ],
          figuredBass: "6/5 - (passing) - 5 - 6/5 - (passing) - 5",
        },
      ],
      exercises: [
        {
          id: "identify-fonte",
          type: "identification",
          prompt: "Identify the Fonte pattern and notice the descending sequence",
          difficulty: "advanced",
        },
        {
          id: "play-fonte",
          type: "keyboard",
          prompt: "Play the Fonte pattern with proper voice leading",
          difficulty: "advanced",
        },
        {
          id: "fonte-voice-exchange",
          type: "composition",
          prompt: "Create a Fonte with voice exchange between soprano and bass like Bach",
          difficulty: "advanced",
        },
      ],
    },
    difficulty: "advanced",
    tradition: "Italian",
    xpReward: 600,
  },
  {
    id: "prinner-schema",
    title: "Galant Schema: Prinner (The Response)",
    category: "schemata",
    level: 4,
    prerequisites: ["fonte-schema"],
    description: "Master the Prinner, the most common response pattern in galant music.",
    content: {
      theory:
        "The PRINNER (named after Johann Jakob Prinner, 1624-1694) is the quintessential response schema in galant music, popular from the 1720s to 1770s. The melody descends stepwise: la-sol-fa-mi (6-5-4-3), while the bass descends: fa-mi-re-do (4-3-2-1). The harmony is 5/3-6/3-6/3-5/3, with the third stage often featuring a dissonance (7-6 suspension). This pattern appears constantly in Mozart, Haydn, and their contemporaries as the standard way to respond to an opening gambit. The Prinner creates a sense of graceful descent and often leads to a cadence. Variants include canon between melody and bass, and circle-of-fifths progressions.",
      examples: [
        {
          id: "prinner-basic",
          description: "Basic Prinner pattern in C major",
          audioPattern: [
            ["A4", "C5", "F5"],
            ["G4", "B4", "E5"],
            ["F4", "A4", "D5"],
            ["E4", "G4", "C5"],
          ],
          figuredBass: "5/3 - 6/3 - 6/3 - 5/3",
        },
        {
          id: "prinner-mozart",
          description: "Prinner with suspension (as used by Mozart)",
          audioPattern: [
            ["A4", "C5", "F5"],
            ["G4", "B4", "E5"],
            ["F4", "A4", "D5"],
            ["F4", "A4", "C5"],
            ["E4", "G4", "C5"],
          ],
          figuredBass: "5/3 - 6/3 - 7 - 6 - 5/3",
        },
        {
          id: "prinner-diminished",
          description: "Prinner with Baroque diminutions (neighbor tones and turns)",
          audioPattern: [
            ["A4", "C5", "F5"],
            ["B4", "A4"],
            ["G4", "B4", "E5"],
            ["A4", "G4"],
            ["F4", "A4", "D5"],
            ["G4", "F4"],
            ["E4", "G4", "C5"],
          ],
          figuredBass: "5/3 - (neighbor) - 6/3 - (neighbor) - 6/3 - (neighbor) - 5/3",
        },
      ],
      exercises: [
        {
          id: "identify-prinner",
          type: "identification",
          prompt: "Identify the Prinner pattern and notice the stepwise descent",
          difficulty: "advanced",
        },
        {
          id: "play-prinner",
          type: "keyboard",
          prompt: "Play the Prinner pattern with proper voice leading",
          difficulty: "advanced",
        },
        {
          id: "prinner-with-suspension",
          type: "composition",
          prompt: "Add a 7-6 suspension at the third stage of your Prinner",
          difficulty: "advanced",
        },
      ],
    },
    difficulty: "advanced",
    tradition: "Italian",
    xpReward: 650,
  },
  {
    id: "baroque-diminutions",
    title: "Baroque Diminution Techniques",
    category: "decorations",
    level: 4,
    prerequisites: ["prinner-schema"],
    description: "Learn authentic Baroque ornamentation techniques from treatises by Ganassi, Ortiz, and Corelli.",
    content: {
      theory:
        "DIMINUTION is the art of transforming long notes into shorter, more energetic ornamental lines. Historical treatises by Sylvestro Ganassi (1535), Diego Ortiz (1553), and later masters teach specific patterns: PASSING TONES (stepwise motion between chord tones), NEIGHBOR TONES (upper and lower), ARPEGGIATION (outlining chords), TRILLS AND MORDENTS (goal-oriented ornaments), and SCALAR RUNS (rapid scales connecting structural notes). Corelli's violin sonatas demonstrate how to apply these patterns tastefully. The key is to maintain the harmonic structure while adding rhythmic energy and melodic interest. Good diminution reveals the underlying harmony rather than obscuring it.",
      examples: [
        {
          id: "passing-tones",
          description: "Passing tones connecting chord tones (Ganassi style)",
          audioPattern: [["C4", "E4", "G4"], ["D4"], ["E4"], ["F4"], ["G4", "B4", "D5"]],
          figuredBass: "I - (passing) - (passing) - (passing) - V",
        },
        {
          id: "neighbor-tones",
          description: "Upper and lower neighbor tones (mordents and trills)",
          audioPattern: [
            ["C4", "E4", "G4"],
            ["D4", "C4"],
            ["C4", "E4", "G4"],
            ["F4", "E4"],
            ["E4", "G4", "C5"],
          ],
          figuredBass: "I - (upper neighbor) - I - (lower neighbor) - I6",
        },
        {
          id: "arpeggiation",
          description: "Arpeggiation outlining harmonies (Corelli style)",
          audioPattern: [["C4"], ["E4"], ["G4"], ["C5"], ["G4"], ["E4"], ["C4"]],
          figuredBass: "I (arpeggiated)",
        },
        {
          id: "scalar-runs",
          description: "Rapid scalar runs connecting structural notes (Vivaldi style)",
          audioPattern: [
            ["C4", "E4", "G4"],
            ["D4", "E4", "F4", "G4", "A4", "B4"],
            ["C5", "E5", "G5"],
          ],
          figuredBass: "I - (scalar run) - I",
        },
        {
          id: "combined-diminutions",
          description: "Combining multiple diminution techniques (Bach style)",
          audioPattern: [
            ["C4", "E4", "G4"],
            ["D4", "C4"],
            ["D4", "E4", "F4"],
            ["G4", "B4", "D5"],
            ["C5", "B4", "A4", "G4"],
            ["C4", "E4", "G4"],
          ],
          figuredBass: "I - (neighbor) - (passing) - V - (scalar descent) - I",
        },
      ],
      exercises: [
        {
          id: "identify-diminution-types",
          type: "identification",
          prompt: "Identify the type of diminution: passing tone, neighbor tone, arpeggio, or scalar run",
          difficulty: "advanced",
        },
        {
          id: "add-passing-tones",
          type: "composition",
          prompt: "Take a simple chord progression and add passing tones between chord tones",
          difficulty: "advanced",
        },
        {
          id: "corelli-style-arpeggiation",
          type: "composition",
          prompt: "Create an arpeggiated passage in the style of Corelli's violin sonatas",
          difficulty: "advanced",
        },
        {
          id: "bach-style-diminution",
          type: "composition",
          prompt: "Combine multiple diminution techniques to create a Bach-style melodic line",
          difficulty: "advanced",
        },
      ],
    },
    difficulty: "advanced",
    tradition: "Italian",
    xpReward: 700,
  },
  {
    id: "compose-baroque-phrase",
    title: "Compose a Baroque Phrase",
    category: "composition",
    level: 4,
    prerequisites: ["baroque-diminutions"],
    description: "Create a complete Baroque phrase combining schemas and diminutions to sound like real music.",
    content: {
      theory:
        "Now you will compose REAL BAROQUE MUSIC, not just exercises. A typical Baroque phrase structure: OPENING (Do-Re-Mi or Romanesca), CONTINUATION (Monte or Fonte for development), RESPONSE (Prinner descending to cadence), CADENCE (authentic V-I with suspensions). Add diminutions tastefully: use passing tones in slower passages, arpeggiation for energy, scalar runs for brilliance, and neighbor tones for expressiveness. Study how Corelli, Vivaldi, Bach, and Handel combine these elements. Your goal is to create music that sounds like it could have been written in 1720, with proper voice leading, harmonic logic, and idiomatic ornamentation.",
      examples: [
        {
          id: "complete-baroque-phrase-corelli",
          description: "Complete phrase in Corelli style (Romanesca + Prinner + Cadence)",
          audioPattern: [
            ["C4", "E4", "G4", "C5"],
            ["D4", "C4"],
            ["B3", "D4", "G4", "B4"],
            ["C4", "B3"],
            ["A3", "C4", "E4", "A4"],
            ["B3", "A3"],
            ["G3", "B3", "D4", "G4"],
            ["A4", "C5", "F5"],
            ["G4", "B4", "E5"],
            ["F4", "A4", "D5"],
            ["F4", "A4", "C5"],
            ["E4", "G4", "C5"],
            ["G4", "B4", "D5"],
            ["C4", "E4", "G4", "C5"],
          ],
          figuredBass: "Romanesca (I-V6-vi-III) → Prinner (6-5-4-3) → Authentic Cadence (V-I)",
        },
        {
          id: "complete-baroque-phrase-vivaldi",
          description: "Complete phrase in Vivaldi style (Do-Re-Mi + Monte + Cadence with runs)",
          audioPattern: [
            ["C4", "E4", "G4"],
            ["D4", "F4", "G4"],
            ["E4", "G4", "C5"],
            ["E4", "G4", "C5"],
            ["F4", "A4", "D5"],
            ["F#4", "A4", "D5"],
            ["G4", "B4", "D5"],
            ["A4", "B4", "C5", "D5", "E5"],
            ["G4", "B4", "D5"],
            ["C4", "E4", "G4"],
          ],
          figuredBass: "Do-Re-Mi (I-V6/4-I6) → Monte (6-5-6-5) → Cadence with scalar run (V-I)",
        },
        {
          id: "complete-baroque-phrase-bach",
          description: "Complete phrase in Bach style (Fonte + Prinner + Suspension cadence)",
          audioPattern: [
            ["D4", "G4", "B4"],
            ["D4", "F4", "A4"],
            ["C4", "F4", "A4"],
            ["C4", "E4", "G4"],
            ["A4", "C5", "F5"],
            ["B4", "A4"],
            ["G4", "B4", "E5"],
            ["A4", "G4"],
            ["F4", "A4", "D5"],
            ["F4", "A4", "C5"],
            ["E4", "G4", "C5"],
            ["D5", "C5"],
            ["G4", "B4", "D5"],
            ["C4", "E4", "G4", "C5"],
          ],
          figuredBass: "Fonte (6/5-5-6/5-5) → Prinner with neighbors (6-5-4-3) → Suspension cadence (4-3, V-I)",
        },
      ],
      exercises: [
        {
          id: "compose-corelli-phrase",
          type: "composition",
          prompt: "Compose an 8-bar phrase using Romanesca + Prinner + Cadence with tasteful diminutions",
          difficulty: "expert",
        },
        {
          id: "compose-vivaldi-phrase",
          type: "composition",
          prompt: "Compose a phrase with Do-Re-Mi opening, Monte sequence, and brilliant scalar runs",
          difficulty: "expert",
        },
        {
          id: "compose-bach-phrase",
          type: "composition",
          prompt: "Compose a phrase combining Fonte and Prinner with suspensions and neighbor tones",
          difficulty: "expert",
        },
        {
          id: "compose-original-baroque",
          type: "composition",
          prompt: "Compose your own original Baroque phrase combining any schemas and diminutions you've learned",
          difficulty: "expert",
        },
      ],
    },
    difficulty: "expert",
    tradition: "Italian",
    xpReward: 750,
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-lesson",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎵",
    xpReward: 50,
    condition: (progress) => progress.lessonsCompleted.filter((lp) => lp.completed).length >= 1,
  },
  {
    id: "five-lessons",
    name: "Dedicated Student",
    description: "Complete 5 lessons",
    icon: "📚",
    xpReward: 100,
    condition: (progress) => progress.lessonsCompleted.filter((lp) => lp.completed).length >= 5,
  },
  {
    id: "week-streak",
    name: "Week Warrior",
    description: "Maintain a 7-day practice streak",
    icon: "🔥",
    xpReward: 200,
    condition: (progress) => progress.streak >= 7,
  },
  {
    id: "master-chords",
    name: "Chord Master",
    description: "Complete all basic chord lessons",
    icon: "🎹",
    xpReward: 150,
    condition: (progress) => {
      const chordLessons = ["do-chord", "re-chord", "mi-chord", "fa-chord"]
      return chordLessons.every((id) => progress.lessonsCompleted.some((lp) => lp.lessonId === id && lp.completed))
    },
  },
  {
    id: "schema-scholar",
    name: "Schema Scholar",
    description: "Master your first Galant schema",
    icon: "🎼",
    xpReward: 250,
    condition: (progress) => {
      const schemaLessons = ["romanesca", "do-re-mi-schema"]
      return schemaLessons.some((id) => progress.lessonsCompleted.some((lp) => lp.lessonId === id && lp.completed))
    },
  },
]

export const SKILL_LEVELS: SkillLevel[] = [
  { level: 1, name: "Novice", minXP: 0, maxXP: 500, color: "#94a3b8" },
  { level: 2, name: "Beginner", minXP: 500, maxXP: 1500, color: "#60a5fa" },
  { level: 3, name: "Intermediate", minXP: 1500, maxXP: 3000, color: "#34d399" },
  { level: 4, name: "Advanced", minXP: 3000, maxXP: 5000, color: "#fbbf24" },
  { level: 5, name: "Expert", minXP: 5000, maxXP: 8000, color: "#f97316" },
  { level: 6, name: "Master", minXP: 8000, maxXP: 12000, color: "#ec4899" },
  { level: 7, name: "Virtuoso", minXP: 12000, maxXP: Number.POSITIVE_INFINITY, color: "#a855f7" },
]

// Helper functions
export function getNextLesson(currentLessonId: string, completedLessonIds: string[]): Lesson | null {
  const currentIndex = CURRICULUM.findIndex((l) => l.id === currentLessonId)
  if (currentIndex === -1 || currentIndex === CURRICULUM.length - 1) return null

  for (let i = currentIndex + 1; i < CURRICULUM.length; i++) {
    const lesson = CURRICULUM[i]
    const prerequisitesMet = lesson.prerequisites.every((prereq) => completedLessonIds.includes(prereq))
    if (prerequisitesMet) {
      return lesson
    }
  }
  return null
}

export function getAvailableLessons(completedLessonIds: string[]): Lesson[] {
  return CURRICULUM.filter((lesson) => {
    const prerequisitesMet = lesson.prerequisites.every((prereq) => completedLessonIds.includes(prereq))
    return prerequisitesMet
  })
}

export function getPreviousLesson(currentLessonId: string): Lesson | null {
  const currentIndex = CURRICULUM.findIndex((l) => l.id === currentLessonId)
  if (currentIndex <= 0) return null
  return CURRICULUM[currentIndex - 1]
}

export function getLessonById(lessonId: string): Lesson | null {
  return CURRICULUM.find((l) => l.id === lessonId) || null
}
