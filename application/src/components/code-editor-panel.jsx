"use client"

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { useState } from "react"

export default function CodeEditorPanel() {
  const [code, setCode] = useState(`// Edit your algorithm here
function customSort(arr) {
  // Your implementation
  return arr;
}`)

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">Code Editor</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-full w-full resize-none rounded-md bg-background/50 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          spellCheck={false}
        />
      </CardContent>
    </Card>
  )
}


