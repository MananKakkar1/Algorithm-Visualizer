"use client";

import { ScrollArea } from "./ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const dataStructures = [
  { name: "Arrays", items: ["Array Traversal", "Array Rotation"] },
  { name: "Linked Lists", items: ["Singly Linked List", "Doubly Linked List"] },
  { name: "Stacks", items: ["Stack Operations", "Expression Evaluation"] },
  { name: "Queues", items: ["Queue Operations"] },
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
  { name: "Graph Traversals", items: ["BFS", "DFS", "Dijkstra"] },
];

export default function Sidebar({
  isOpen,
  onToggle,
  selectedAlgorithm,
  onSelectAlgorithm,
}) {
  return (
    <aside
      className={`sidebar ${isOpen ? "open" : "closed"}`}
      style={{
        width: isOpen ? "260px" : "0px",
        backgroundColor: "#0b1220",
        borderRight: "1px solid #1c2333",
        overflow: "hidden",
        position: "relative",
        color: "#e0e0ff",
        transition: "width 0.3s ease",
      }}
    >
      {/* Toggle Button
      <Button
        variant="ghost"
        size="icon"
        className="sidebar-toggle"
        onClick={onToggle}
        style={{
          position: "absolute",
          top: "14px",
          right: "-12px",
          zIndex: 20,
          backgroundColor: "#1a1f3b",
          border: "1px solid #3b2a6f",
          color: "#b39aff",
          borderRadius: "50%",
          width: "26px",
          height: "26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#5a3fc0";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#1a1f3b";
          e.currentTarget.style.color = "#b39aff";
        }}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button> */}

      {isOpen && (
        <div
          style={{
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "4px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`
              .sidebar::-webkit-scrollbar,
              div::-webkit-scrollbar {
                width: 0 !important;
                height: 0 !important;
                display: none !important;
              }
            `}
          </style>

          <div
            style={{
              padding: "16px 12px",
            }}
          >
            {/* DATA STRUCTURES */}
            <div style={{ marginBottom: "30px" }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#8b8fb3",
                  marginBottom: "12px",
                  letterSpacing: "0.4px",
                }}
              >
                DATA STRUCTURES
              </h2>
              {dataStructures.map((category) => (
                <div key={category.name} style={{ marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#c5c7e0",
                      marginBottom: "8px",
                    }}
                  >
                    {category.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      width: "100%",
                    }}
                  >
                    {category.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => onSelectAlgorithm(item)}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          backgroundColor:
                            selectedAlgorithm === item ? "#5a3fc0" : "#1a1f3b",
                          color:
                            selectedAlgorithm === item ? "#fff" : "#b39aff",
                          border: "1px solid #3b2a6f",
                          borderRadius: "8px",
                          padding: "9px 10px",
                          fontSize: "13.5px",
                          textAlign: "left",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (selectedAlgorithm !== item) {
                            e.currentTarget.style.backgroundColor = "#5a3fc0";
                            e.currentTarget.style.color = "#fff";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedAlgorithm !== item) {
                            e.currentTarget.style.backgroundColor = "#1a1f3b";
                            e.currentTarget.style.color = "#b39aff";
                          }
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ALGORITHMS */}
            <div>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#8b8fb3",
                  marginBottom: "12px",
                  letterSpacing: "0.4px",
                }}
              >
                ALGORITHMS
              </h2>
              {algorithms.map((category) => (
                <div key={category.name} style={{ marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#c5c7e0",
                      marginBottom: "8px",
                    }}
                  >
                    {category.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      width: "100%",
                    }}
                  >
                    {category.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => onSelectAlgorithm(item)}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          backgroundColor:
                            selectedAlgorithm === item ? "#5a3fc0" : "#1a1f3b",
                          color:
                            selectedAlgorithm === item ? "#fff" : "#b39aff",
                          border: "1px solid #3b2a6f",
                          borderRadius: "8px",
                          padding: "9px 10px",
                          fontSize: "13.5px",
                          textAlign: "left",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (selectedAlgorithm !== item) {
                            e.currentTarget.style.backgroundColor = "#5a3fc0";
                            e.currentTarget.style.color = "#fff";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedAlgorithm !== item) {
                            e.currentTarget.style.backgroundColor = "#1a1f3b";
                            e.currentTarget.style.color = "#b39aff";
                          }
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
