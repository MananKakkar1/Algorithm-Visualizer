"use client";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useState } from "react";

export default function CodeEditorPanel() {
  const [code, setCode] = useState(`// Edit your algorithm here
function customSort(arr) {
  // Your implementation
  return arr;
}`);

  return (
    <Card className="flex-1 flex flex-col card">
      <CardHeader>
        <CardTitle className="text-base">Code Editor</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="code-textarea"
          spellCheck={false}
        />
      </CardContent>
    </Card>
  );
}
