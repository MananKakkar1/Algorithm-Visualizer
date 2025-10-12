import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const codeExamples = {
  "Bubble Sort": `def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(0, len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,

  "Quick Sort": `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`,

  "Merge Sort": `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`,

  "Heap Sort": `def heap_sort(arr):
    n = len(arr)

    def heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(n, largest)

    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)

    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(i, 0)

    return arr`,

  "Array Traversal": `def traverse(arr):
    for i in range(len(arr)):
        print(arr[i])`,

  "Array Rotation": `def rotate(arr, k):
    k = k % len(arr)
    return arr[k:] + arr[:k]`,

  "Stack Operations": `def stack_operations():
    stack = []

    stack.append(5)   # push
    stack.append(8)   # push
    stack.pop()       # pop
    stack.append(3)   # push

    return stack`,

  "Expression Evaluation": `def evaluate(expression):
    stack = []

    for token in expression:
        if token.isdigit():
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(a / b)

    return stack[0]


# Example:
# evaluate(["2", "3", "+", "4", "*"]) -> 20`,
};

const algoInfo = {
  "Bubble Sort": {
    time: "O(n²)",
    space: "O(1)",
    desc: "A simple comparison-based sorting algorithm that repeatedly compares adjacent elements and swaps them if they are out of order.",
  },
  "Quick Sort": {
    time: "O(n log n) average, O(n²) worst",
    space: "O(log n)",
    desc: "A divide-and-conquer sorting algorithm that partitions elements around a pivot, recursively sorting each partition.",
  },
  "Merge Sort": {
    time: "O(n log n)",
    space: "O(n)",
    desc: "Divides the array into halves, recursively sorts them, and merges the sorted halves into a final sorted array.",
  },
  "Heap Sort": {
    time: "O(n log n)",
    space: "O(1)",
    desc: "Transforms the array into a max heap, then repeatedly extracts the largest element to sort the array in-place.",
  },
  "Array Traversal": {
    time: "O(n)",
    space: "O(1)",
    desc: "Sequentially visits each element of the array for processing or display.",
  },
  "Array Rotation": {
    time: "O(n)",
    space: "O(1)",
    desc: "Rotates array elements left or right by k positions, preserving relative order.",
  },
  "Stack Operations": {
    time: "O(1) for push/pop",
    space: "O(n)",
    desc: "Demonstrates stack operations using push and pop, where elements follow LIFO (Last-In, First-Out) order.",
  },
  "Expression Evaluation": {
    time: "O(n)",
    space: "O(n)",
    desc: "Evaluates a postfix expression using a stack by pushing operands and applying operators as they appear.",
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

      {/* --- PSEUDOCODE AREA --- */}
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
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
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
