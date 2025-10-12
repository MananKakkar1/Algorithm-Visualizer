import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

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
};

const algoInfo = {
  "Bubble Sort": {
    time: "O(n^2)",
    space: "O(1)",
    desc: "Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
  },
  "Quick Sort": {
    time: "O(n log n) average, O(n^2) worst",
    space: "O(log n) average",
    desc: "Divide-and-conquer algorithm that picks a pivot, partitions the array, then recursively sorts the partitions.",
  },
};

export default function CodeViewPanel({ algorithm }) {
  const code = codeExamples[algorithm] || "// Select an algorithm to view code";

  return (
    <Card className="flex-1 flex flex-col card">
      <CardHeader>
        <CardTitle className="text-base">Pseudocode</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="scroll-area">
          <pre className="text-sm font-mono text-muted-foreground">
            <code>{code}</code>
          </pre>
        </ScrollArea>
        <div className="p-4">
          {algoInfo[algorithm] ? (
            <div>
              <h4 className="text-base">Complexity</h4>
              <p className="text-sm">Time: {algoInfo[algorithm].time}</p>
              <p className="text-sm">Space: {algoInfo[algorithm].space}</p>
              <h4 className="text-base" style={{ marginTop: "0.5rem" }}>
                About
              </h4>
              <p className="text-sm">{algoInfo[algorithm].desc}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select an algorithm to see details.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
