import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

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
  "Merge Sort": `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
};

const algoInfo = {
  "Bubble Sort": {
    time: "O(n²)",
    space: "O(1)",
    desc: "A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are out of order.",
  },
  "Quick Sort": {
    time: "O(n²)",
    space: "O(log n)",
    desc: "A divide-and-conquer algorithm that selects a pivot element, partitions the array, and recursively sorts the partitions.",
  },
  "Merge Sort": {
    time: "O(n log n)",
    space: "O(n)",
    desc: "A divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and merges the sorted halves back together.",
  },
};

export default function CodeViewPanel({ algorithm }) {
  const code = codeExamples[algorithm] || "// Select an algorithm to view code";
  const info = algoInfo[algorithm];

  return (
    <Card
      className="flex-1 flex flex-col card"
      style={{
        backgroundColor: "#0b1220",
        color: "#e0e0ff",
        border: "1px solid #1c2333",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* --- PSEUDOCODE HEADER --- */}
      <CardHeader
        style={{
          borderBottom: "1px solid #1c2333",
          paddingBottom: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <CardTitle
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#b39aff",
            letterSpacing: "0.5px",
          }}
        >
          Pseudocode
        </CardTitle>
      </CardHeader>

      {/* --- PSEUDOCODE AREA (wrap to fit width) --- */}
      <CardContent
        style={{
          flex: "0 0 auto",
          paddingBottom: "1rem",
          borderBottom: "1px solid #1c2333",
        }}
      >
        <div
          style={{
            backgroundColor: "#111832",
            border: "1px solid #1c2333",
            borderRadius: "8px",
            padding: "10px 12px",
            width: "100%",

            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontSize: "13px",
            color: "#c7c8f9",
            lineHeight: 1.5,

            // make code fit container width:
            whiteSpace: "pre-wrap", // preserve newlines, allow wrapping
            overflowWrap: "anywhere", // wrap long tokens if needed
            wordBreak: "break-word", // extra safety
            tabSize: 2,
          }}
        >
          {code}
        </div>
      </CardContent>

      {/* --- DETAILS HEADER --- */}
      <CardHeader
        style={{
          borderBottom: "1px solid #1c2333",
          paddingBottom: "0.5rem",
          marginBottom: "0.5rem",
          marginTop: "0.75rem",
        }}
      >
        <CardTitle
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#b39aff",
            letterSpacing: "0.5px",
          }}
        >
          Algorithm Details
        </CardTitle>
      </CardHeader>

      {/* --- DETAILS CONTENT --- */}
      <CardContent style={{ flex: "1 1 auto" }}>
        {info ? (
          <div style={{ lineHeight: "1.6" }}>
            <p
              style={{
                fontSize: "13.5px",
                color: "#c7c8f9",
                marginBottom: "6px",
              }}
            >
              <strong style={{ color: "#b39aff" }}>Time Complexity:</strong>{" "}
              {info.time}
            </p>
            <p
              style={{
                fontSize: "13.5px",
                color: "#c7c8f9",
                marginBottom: "10px",
              }}
            >
              <strong style={{ color: "#b39aff" }}>Space Complexity:</strong>{" "}
              {info.space}
            </p>
            <p
              style={{
                fontSize: "13.5px",
                color: "#c7c8f9",
              }}
            >
              {info.desc}
            </p>
          </div>
        ) : (
          <p
            style={{
              fontSize: "13.5px",
              color: "#8b8fb3",
            }}
          >
            Select an algorithm to see details.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
