import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"

const codeExamples = {
  "Bubble Sort": `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
  "Quick Sort": `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter((x, i) => x <= pivot && i < arr.length - 1);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
}

export default function CodeViewPanel({ algorithm }) {
  const code = codeExamples[algorithm] || "// Select an algorithm to view code"

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">Pseudocode</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <pre className="text-sm font-mono text-muted-foreground">
            <code>{code}</code>
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
