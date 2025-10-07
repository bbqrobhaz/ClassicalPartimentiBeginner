"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SampleTest {
  note: string
  octave: number
  status: "untested" | "loading" | "success" | "failed"
  error?: string
  url?: string
}

export function SampleDiagnostic() {
  const [tests, setTests] = useState<SampleTest[]>([])
  const [testing, setTesting] = useState(false)

  // Available samples according to the library
  const availableSamples = [
    { note: "A", octaves: [0, 1, 2, 3, 4, 5, 6, 7] },
    { note: "C", octaves: [1, 2, 3, 4, 5, 6, 7, 8] },
    { note: "D#", octaves: [1, 2, 3, 4, 5, 6, 7] },
    { note: "F#", octaves: [1, 2, 3, 4, 5, 6, 7] },
  ]

  const testAllSamples = async () => {
    setTesting(true)
    const allTests: SampleTest[] = []

    // Initialize all tests
    for (const sample of availableSamples) {
      for (const octave of sample.octaves) {
        allTests.push({
          note: sample.note,
          octave,
          status: "untested",
        })
      }
    }

    setTests(allTests)

    // Test each sample
    for (let i = 0; i < allTests.length; i++) {
      const test = allTests[i]
      const noteForUrl = test.note.replace("#", "%23")
      const url = `https://unpkg.com/@audio-samples/piano-velocity8@1.0.5/audio/${noteForUrl}${test.octave}v8.ogg`

      console.log(`[v0] Testing sample: ${test.note}${test.octave}`)

      // Update status to loading
      allTests[i] = { ...test, status: "loading", url }
      setTests([...allTests])

      try {
        const response = await fetch(url)
        if (response.ok) {
          console.log(`[v0] ✓ ${test.note}${test.octave} loaded successfully`)
          allTests[i] = { ...test, status: "success", url }
        } else {
          console.log(`[v0] ✗ ${test.note}${test.octave} failed: HTTP ${response.status}`)
          allTests[i] = {
            ...test,
            status: "failed",
            error: `HTTP ${response.status}`,
            url,
          }
        }
      } catch (error) {
        console.log(`[v0] ✗ ${test.note}${test.octave} failed:`, error)
        allTests[i] = {
          ...test,
          status: "failed",
          error: error instanceof Error ? error.message : "Network error",
          url,
        }
      }

      setTests([...allTests])

      // Small delay between tests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setTesting(false)
    console.log("[v0] Sample diagnostic complete")
  }

  const successCount = tests.filter((t) => t.status === "success").length
  const failCount = tests.filter((t) => t.status === "failed").length
  const totalCount = tests.length

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sample Availability Diagnostic</h2>
      <p className="text-muted-foreground mb-4">
        This tool tests all available piano samples from the library to see which ones can be loaded from unpkg.
      </p>

      <Button onClick={testAllSamples} disabled={testing} className="mb-4">
        {testing ? "Testing..." : "Test All Samples"}
      </Button>

      {tests.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm">
            <strong>Results:</strong> {successCount} success, {failCount} failed out of {totalCount} total
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {availableSamples.map((sample) => (
              <div key={sample.note} className="space-y-1">
                <h3 className="font-semibold">{sample.note}</h3>
                {sample.octaves.map((octave) => {
                  const test = tests.find((t) => t.note === sample.note && t.octave === octave)
                  if (!test) return null

                  return (
                    <div
                      key={`${sample.note}${octave}`}
                      className={`text-xs p-1 rounded ${
                        test.status === "success"
                          ? "bg-green-100 text-green-800"
                          : test.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : test.status === "loading"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {sample.note}
                      {octave}:{" "}
                      {test.status === "loading"
                        ? "..."
                        : test.status === "success"
                          ? "✓"
                          : test.status === "failed"
                            ? "✗"
                            : "?"}
                      {test.error && <div className="text-xs mt-1">{test.error}</div>}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {failCount > 0 && (
            <div className="mt-4 p-4 bg-red-50 rounded">
              <h3 className="font-semibold text-red-800 mb-2">Failed Samples:</h3>
              <div className="space-y-1 text-sm">
                {tests
                  .filter((t) => t.status === "failed")
                  .map((test) => (
                    <div key={`${test.note}${test.octave}`}>
                      <strong>
                        {test.note}
                        {test.octave}:
                      </strong>{" "}
                      {test.error}
                      <div className="text-xs text-red-600 break-all">{test.url}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
