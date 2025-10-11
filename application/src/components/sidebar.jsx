"use client";

import { ScrollArea } from "./ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const dataStructures = [
  { name: "Arrays", items: ["Array Traversal", "Array Rotation"] },
  { name: "Linked Lists", items: ["Singly Linked List", "Doubly Linked List"] },
  { name: "Stacks", items: ["Stack Operations", "Expression Evaluation"] },
  { name: "Queues", items: ["Queue Operations", "Circular Queue"] },
  { name: "Trees", items: ["Binary Tree", "BST", "AVL Tree"] },
  { name: "Graphs", items: ["Graph Representation", "Adjacency List"] },
  { name: "Heaps", items: ["Min Heap", "Max Heap"] },
];

const algorithms = [
  {
    name: "Sorting",
    items: ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort"],
  },
  { name: "Searching", items: ["Linear Search", "Binary Search"] },
  { name: "Recursion", items: ["Factorial", "Fibonacci", "Tower of Hanoi"] },
  { name: "Dynamic Programming", items: ["Knapsack", "LCS", "Coin Change"] },
  { name: "Graph Traversals", items: ["BFS", "DFS", "Dijkstra"] },
];

export default function Sidebar({
  isOpen,
  onToggle,
  selectedAlgorithm,
  onSelectAlgorithm,
}) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <Button
        variant="ghost"
        size="icon"
        className="sidebar toggle-btn btn--ghost btn--icon"
        onClick={onToggle}
      >
        {isOpen ? (
          <ChevronLeft className="h-4" />
        ) : (
          <ChevronRight className="h-4" />
        )}
      </Button>

      {isOpen && (
        <ScrollArea className="scroll-area">
          <div className="p-4">
            <div>
              <h2>DATA STRUCTURES</h2>
              {dataStructures.map((category) => (
                <div key={category.name} className="mb-4">
                  <h3>{category.name}</h3>
                  <div>
                    {category.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => onSelectAlgorithm(item)}
                        className={`btn ${
                          selectedAlgorithm === item ? "selected" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2>ALGORITHMS</h2>
              {algorithms.map((category) => (
                <div key={category.name} className="mb-4">
                  <h3>{category.name}</h3>
                  <div>
                    {category.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => onSelectAlgorithm(item)}
                        className={`btn ${
                          selectedAlgorithm === item ? "selected" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      )}
    </aside>
  );
}
