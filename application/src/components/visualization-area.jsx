"use client";

import { Card } from "./ui/card";
import { useEffect, useMemo, useRef, useState } from "react";

/* ================================
   STEP GENERATORS
==================================*/

// Bubble Sort
function generateBubbleSteps(arr) {
  const a = arr.slice();
  const steps = [];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ op: "compare", a: j, b: j + 1 });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ op: "swap", i: j, j: j + 1 });
      }
    }
  }
  return steps;
}

// Quick Sort
function generateQuickSteps(arr) {
  const a = arr.slice();
  const steps = [];

  function swap(i, j) {
    [a[i], a[j]] = [a[j], a[i]];
  }

  function partition(l, r) {
    const pivot = a[r];
    let i = l;
    for (let j = l; j < r; j++) {
      steps.push({ op: "compare", a: j, b: r });
      if (a[j] < pivot) {
        if (i !== j) {
          swap(i, j);
          steps.push({ op: "swap", i, j });
        }
        i++;
      }
    }
    if (i !== r) {
      swap(i, r);
      steps.push({ op: "swap", i, j: r });
    }
    return i;
  }

  function quick(l, r) {
    if (l >= r) return;
    const p = partition(l, r);
    quick(l, p - 1);
    quick(p + 1, r);
  }

  quick(0, a.length - 1);
  return steps;
}

// Merge Sort
function generateMergeSteps(arr) {
  const a = arr.slice();
  const steps = [];

  function mergeSort(start, end) {
    if (end - start <= 1) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid, end);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    const left = a.slice(start, mid);
    const right = a.slice(mid, end);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      steps.push({ op: "compare", a: start + i, b: mid + j });
      if (left[i] <= right[j]) {
        a[k] = left[i];
        steps.push({ op: "set", index: k, value: left[i] });
        i++;
      } else {
        a[k] = right[j];
        steps.push({ op: "set", index: k, value: right[j] });
        j++;
      }
      k++;
    }

    while (i < left.length) {
      a[k] = left[i];
      steps.push({ op: "set", index: k, value: left[i] });
      i++; k++;
    }
    while (j < right.length) {
      a[k] = right[j];
      steps.push({ op: "set", index: k, value: right[j] });
      j++; k++;
    }
  }

  mergeSort(0, a.length);
  return steps;
}

// Heap Sort
function generateHeapSteps(arr) {
  const a = arr.slice();
  const steps = [];

  const swap = (i, j) => {
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
    steps.push({ i, j, compare: false, swapped: true });
  };

  const compare = (i, j) => {
    steps.push({ i, j, compare: true, swapped: false });
  };

  const heapify = (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      compare(left, largest);
      if (a[left] > a[largest]) largest = left;
    }
    if (right < n) {
      compare(right, largest);
      if (a[right] > a[largest]) largest = right;
    }
    if (largest !== i) {
      swap(i, largest);
      heapify(n, largest);
    }
  };

  const n = a.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    swap(0, i);
    heapify(i, 0);
  }

  return steps;
}

// Array Traversal / Rotation
function generateArrayTraversalSteps(arr) {
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    steps.push({ i, j: null, compare: true, swapped: false });
  }
  return steps;
}

function generateArrayRotationSteps(arr, k = 1) {
  const steps = [];
  const n = arr.length;
  const a = arr.slice();
  k = k % n;

  for (let step = 0; step < k; step++) {
    const first = a[0];
    for (let i = 0; i < n - 1; i++) {
      steps.push({ i, j: i + 1, compare: false, swapped: true });
      a[i] = a[i + 1];
    }
    a[n - 1] = first;
  }
  return steps;
}

// Stack Operations
function generateStackSteps() {
  const steps = [];
  const operations = [
    { type: "push", value: 5 },
    { type: "push", value: 8 },
    { type: "pop" },
    { type: "push", value: 3 },
  ];

  let stack = [];
  for (const op of operations) {
    if (op.type === "push") {
      stack.push(op.value);
      steps.push({ stack: [...stack], action: "push", value: op.value });
    } else if (op.type === "pop" && stack.length > 0) {
      stack.pop();
      steps.push({ stack: [...stack], action: "pop" });
    }
  }
  return steps;
}

// Expression Evaluation using Stack (Postfix evaluation simulation)
function generateExpressionEvalSteps() {
  const steps = [];
  const expression = ["2", "3", "+", "4", "*"]; // Example: (2 + 3) * 4
  let stack = [];

  for (const token of expression) {
    if (!isNaN(parseInt(token))) {
      stack.push(Number(token));
      steps.push({
        stack: [...stack],
        action: "push",
        value: Number(token),
      });
    } else {
      if (stack.length >= 2) {
        const b = stack.pop();
        const a = stack.pop();
        let result;
        if (token === "+") result = a + b;
        else if (token === "-") result = a - b;
        else if (token === "*") result = a * b;
        else if (token === "/") result = a / b;

        stack.push(result);
        steps.push({
          stack: [...stack],
          action: "eval",
          value: result,
        });
      }
    }
  }

  steps.push({
    stack: [...stack],
    action: "done",
  });

  return steps;
}

/* ================================
   VISUALIZATION COMPONENT
==================================*/

export default function VisualizationArea({
  algorithm,
  isPlaying,
  speed,
  stepTick = 0,
  resetTick = 0,
}) {
  const [sourceArray, setSourceArray] = useState([]);
  const [array, setArray] = useState([]);
  const [active, setActive] = useState([]);
  const [stack, setStack] = useState([]);
  const [highlightAction, setHighlightAction] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setSourceArray(newArray);
    setArray(newArray.slice());
    setStack([5]);
    setStepIndex(0);
    setActive([]);
    setHighlightAction("");
  }, [resetTick]);

  useEffect(() => {
    setStepIndex(0);
    setActive([]);
    setArray(sourceArray.slice());
    setStack([5]);
    setHighlightAction("");
    setFinished(false);
  }, [algorithm, sourceArray]);

  const steps = useMemo(() => {
    const algo = (algorithm || "").toLowerCase();

    if (algo.includes("quick")) return generateQuickSteps(sourceArray);
    if (algo.includes("merge")) return generateMergeSteps(sourceArray);
    if (algo.includes("heap")) return generateHeapSteps(sourceArray);
    if (algo.includes("bubble")) return generateBubbleSteps(sourceArray);
    if (algo.includes("rotation")) return generateArrayRotationSteps(sourceArray);
    if (algo.includes("traversal")) return generateArrayTraversalSteps(sourceArray);
    if (algo.includes("expression")) return generateExpressionEvalSteps();
    if (algo.includes("stack")) return generateStackSteps();

    return [];
  }, [sourceArray, algorithm]);

  const stepsRef = useRef(steps);
  useEffect(() => { stepsRef.current = steps; }, [steps]);

  const stepIndexRef = useRef(stepIndex);
  useEffect(() => { stepIndexRef.current = stepIndex; }, [stepIndex]);

  const doStep = () => {
    const s = stepsRef.current[stepIndexRef.current];
    if (!s) return;

    if (
      algorithm.toLowerCase().includes("stack") ||
      algorithm.toLowerCase().includes("expression")
    ) {
      setStack(s.stack || []);
      setHighlightAction(
        s.action === "push"
          ? "push"
          : s.action === "pop"
          ? "pop"
          : s.action === "eval"
          ? "eval"
          : ""
      );
    } else if (s.op === "compare" || s.compare) {
      setActive([s.a ?? s.i, s.b ?? s.j].filter(Boolean));
    } else if (s.op === "swap" || s.swapped) {
      setArray((prev) => {
        const copy = prev.slice();
        [copy[s.i], copy[s.j]] = [copy[s.j], copy[s.i]];
        return copy;
      });
      setActive([s.i, s.j]);
    } else if (s.op === "set" || "value" in s) {
      setArray((prev) => {
        const copy = prev.slice();
        copy[s.index ?? s.i] = s.value;
        return copy;
      });
      setActive([s.index ?? s.i]);
    }

    setStepIndex((idx) => {
      const next = idx + 1;
      if (next >= (stepsRef.current?.length ?? 0)) {
        setFinished(true);
        setTimeout(() => setFinished(false), 1500);
      }
      return next;
    });
  };

  const lastStepTick = useRef(stepTick);
  useEffect(() => {
    if (stepTick !== lastStepTick.current) {
      lastStepTick.current = stepTick;
      doStep();
    }
  }, [stepTick]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(doStep, Math.max(50, Math.round(2000 - (speed / 100) * 1950)));
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const isStack =
    algorithm.toLowerCase().includes("stack") ||
    algorithm.toLowerCase().includes("expression");

  return (
    <Card
      className="p-5 card"
      style={{
        backgroundColor: "#0b1220",
        border: "1px solid #1c2333",
        borderRadius: "10px",
        color: "#e0e0ff",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginLeft: 15 }}>
          {algorithm}
        </h2>
        <p style={{ fontSize: "13px", color: "#8b8fb3", marginLeft: 15 }}>
          Visualizing algorithm execution
        </p>
      </div>

      {/* === STACK VISUALIZATION === */}
      {isStack ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "260px",
            backgroundColor: "#111830",
            borderRadius: "8px",
            padding: "10px 20px",
            boxShadow: finished ? "0 0 20px 5px rgba(179,154,255,0.4)" : "none",
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* Tube container */}
          <div
            style={{
              position: "relative",
              width: "140px",
              height: "100%",
              border: "3px solid #3b3f63",
              borderRadius: "12px",
              background: "linear-gradient(180deg, #0d1228 0%, #0b0f20 100%)",
              boxShadow: finished
                ? "0 0 15px rgba(179,154,255,0.6) inset"
                : "inset 0 0 10px #1c2240",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
              justifyContent: "flex-start",
              overflow: "hidden",
              transition: "box-shadow 0.5s ease",
            }}
          >
            {stack.map((val, idx) => (
              <div
                key={idx}
                style={{
                  width: "100px",
                  height: "40px",
                  marginBottom: "8px",
                  backgroundColor: finished
                    ? "#c5b3ff"
                    : idx === stack.length - 1
                    ? "#b39aff"
                    : "#5a3fc0",
                  border: "1px solid #b39aff",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "600",
                  color: "white",
                  transform: finished ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: finished
                    ? "0 0 15px rgba(179,154,255,0.7)"
                    : "0 2px 6px rgba(0,0,0,0.3)",
                  transition: "all 0.5s ease, transform 0.4s ease-in-out",
                }}
              >
                {val}
              </div>
            ))}
          </div>

          {/* Instruction text */}
          <div
            style={{
              marginLeft: "35px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              height: "100%",
              gap: "10px",
            }}
          >
            {["PUSH", "POP", "EVAL"].map((label) => (
              <div
                key={label}
                style={{
                  color:
                    highlightAction === label.toLowerCase() ? "white" : "#666a80",
                  fontWeight: highlightAction === label.toLowerCase() ? "600" : "400",
                  fontSize: "15px",
                  transition: "color 0.3s ease",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // === DEFAULT BAR VISUALIZATION ===
        <div
          className={"visualization-bars" + (finished ? " sorted" : "")}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            height: "220px",
            backgroundColor: "#111830",
            borderRadius: "8px",
            padding: "10px 6px",
            overflow: "hidden",
          }}
        >
          {array.map((value, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                margin: "0 1px",
                borderRadius: "3px 3px 0 0",
                height: `${value * 1.75}px`,
                backgroundColor: active.includes(idx)
                  ? "#ff4d6d"
                  : finished
                  ? "#b39aff"
                  : "#5a3fc0",
                transition: "height 0.2s, background-color 0.4s",
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
