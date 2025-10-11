"use client"

import { ScrollArea } from "./ui/scroll-area"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

const dataStructures = [
  { name: "Arrays", items: ["Array Traversal", "Array Rotation"] },
  { name: "Linked Lists", items: ["Singly Linked List", "Doubly Linked List"] },
  { name: "Stacks", items: ["Stack Operations", "Expression Evaluation"] },
  { name: "Queues", items: ["Queue Operations", "Circular Queue"] },
  { name: "Trees", items: ["Binary Tree", "BST", "AVL Tree"] },
  { name: "Graphs", items: ["Graph Representation", "Adjacency List"] },
  { name: "Heaps", items: ["Min Heap", "Max Heap"] },
]

const algorithms = [
  { name: "Sorting", items: ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort"] },
  { name: "Searching", items: ["Linear Search", "Binary Search"] },
  { name: "Recursion", items: ["Factorial", "Fibonacci", "Tower of Hanoi"] },
  { name: "Dynamic Programming", items: ["Knapsack", "LCS", "Coin Change"] },
  { name: "Graph Traversals", items: ["BFS", "DFS", "Dijkstra"] },
]

export default function Sidebar({ isOpen, onToggle, selectedAlgorithm, onSelectAlgorithm }) {
  return (
    <aside className={`relative border-r border-border bg-card transition-all duration-300 ${isOpen ? "w-64" : "w-0"}`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border border-border bg-card"
        onClick={onToggle}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            <div>
              <h2 className="mb-3 text-sm font-semibold text-muted-foreground">DATA STRUCTURES</h2>
              {dataStructures.map((category) => (
                <div key={category.name} className="mb-4">
                  <h3 className="mb-2 text-sm font-medium">{category.name}</h3>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => onSelectAlgorithm(item)}
                        className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent ${
                          selectedAlgorithm === item ? "bg-accent text-accent-foreground" : ""
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
              <h2 className="mb-3 text-sm font-semibold text-muted-foreground">ALGORITHMS</h2>
              {algorithms.map((category) => (
                <div key={category.name} className="mb-4">
                  <h3 className="mb-2 text-sm font-medium">{category.name}</h3>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => onSelectAlgorithm(item)}
                        className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent ${
                          selectedAlgorithm === item ? "bg-accent text-accent-foreground" : ""
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
  )
}


