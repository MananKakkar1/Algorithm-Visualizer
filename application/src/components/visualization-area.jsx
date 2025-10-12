"use client";

import { Card } from "./ui/card";
import { useEffect, useMemo, useRef, useState } from "react";

// Generate bubble sort swap steps: returns array of {i,j, swapped}
function generateBubbleSteps(arr) {
  const a = arr.slice();
  const steps = [];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ i: j, j: j + 1, compare: true, swapped: false });
      if (a[j] > a[j + 1]) {
        // swap
        const tmp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = tmp;
        steps.push({ i: j, j: j + 1, compare: false, swapped: true });
      }
    }
  }
  return steps;
}

function generateQuickSteps(arr) {
  const a = arr.slice();
  const steps = [];

  function swap(i, j) {
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }

  function partition(l, r) {
    const pivot = a[r];
    let i = l;
    for (let j = l; j < r; j++) {
      steps.push({ i: j, j: r, compare: true, swapped: false });
      if (a[j] < pivot) {
        steps.push({ i: i, j: j, compare: false, swapped: true });
        swap(i, j);
        i++;
      }
    }
    steps.push({ i: i, j: r, compare: false, swapped: true });
    swap(i, r);
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

export default function VisualizationArea({
  algorithm,
  isPlaying,
  speed,
  stepTick = 0,
  resetTick = 0,
}) {
  // sourceArray is the immutable input snapshot used to generate steps
  const [sourceArray, setSourceArray] = useState([]);
  // visual array is the one we mutate and display while stepping
  const [array, setArray] = useState([]);
  const [active, setActive] = useState([]); // indices being compared/highlighted
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // initial array (only on reset)
  useEffect(() => {
    const newArray = Array.from(
      { length: 20 },
      () => Math.floor(Math.random() * 100) + 10
    );
    setSourceArray(newArray);
    setArray(newArray.slice());
    setStepIndex(0);
    setActive([]);
  }, [resetTick]);

  // when algorithm changes, reset the step index and active highlights and reset visual array to source
  useEffect(() => {
    setStepIndex(0);
    setActive([]);
    setArray(sourceArray.slice());
    setFinished(false);
  }, [algorithm, sourceArray]);

  // steps are memoized for current array snapshot and selected algorithm
  const steps = useMemo(() => {
    if ((algorithm || "").toLowerCase().includes("quick")) {
      return generateQuickSteps(sourceArray);
    }
    // default to bubble sort
    return generateBubbleSteps(sourceArray);
  }, [sourceArray, algorithm]);

  // keep refs to steps and stepIndex so playback doesn't re-generate steps mid-run
  const stepsRef = useRef(steps);
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  const stepIndexRef = useRef(stepIndex);
  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);

  // advance a single step (play or manual step)
  const doStep = () => {
    const currentIndex = stepIndexRef.current;
    const s = stepsRef.current[currentIndex];
    if (!s) return; // finished
    if (s.compare) {
      setActive([s.i, s.j]);
    } else if (s.swapped) {
      setArray((prev) => {
        const copy = prev.slice();
        const tmp = copy[s.i];
        copy[s.i] = copy[s.j];
        copy[s.j] = tmp;
        return copy;
      });
      setActive([s.i, s.j]);
    }
    setStepIndex((idx) => {
      const next = idx + 1;
      // if we've reached or passed the end, trigger finished animation
      if (next >= (stepsRef.current ? stepsRef.current.length : 0)) {
        setFinished(true);
        // clear finished state after animation (2s)
        setTimeout(() => setFinished(false), 2000);
      }
      return next;
    });
  };

  // handle manual stepTick prop (increments when user clicks step)
  const lastStepTick = useRef(stepTick);
  useEffect(() => {
    if (stepTick !== lastStepTick.current) {
      lastStepTick.current = stepTick;
      doStep();
    }
  }, [stepTick]);

  // autoplay when isPlaying; interval depends on speed
  useEffect(() => {
    if (!isPlaying) return undefined;
    // Map speed (0..100) to interval (2000ms slow .. 50ms fast)
    const intervalMs = Math.max(
      50,
      Math.round(2000 - (speed / 100) * (2000 - 50))
    );
    const id = setInterval(() => {
      doStep();
    }, intervalMs);
    return () => clearInterval(id);
  }, [isPlaying, speed]);

  return (
    <Card className="flex-1 p-6 card">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{algorithm}</h2>
        <p className="text-sm text-muted-foreground">
          Visualizing algorithm execution
        </p>
      </div>

      <div className={"visualization-bars" + (finished ? " sorted" : "")}>
        {array.map((value, idx) => (
          <div
            key={idx}
            className="visual-bar"
            style={{
              height: `${value}%`,
              backgroundColor: active.includes(idx)
                ? "var(--destructive)"
                : "var(--primary)",
            }}
          />
        ))}
      </div>
    </Card>
  );
}
