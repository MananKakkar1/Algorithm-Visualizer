import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

/** ------------------------------------------------------------------
 *  PSEUDOCODE SNIPPETS
 *  Keys MUST match the exact algorithm names used by your Sidebar.
 *  Added: "Binary Tree", "BST", and "AVL Tree"
 *  ------------------------------------------------------------------ */
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

  // NEW: Queue Operations
  "Queue Operations": `from collections import deque

def queue_operations():
    q = deque()

    q.append(4)   # enqueue
    q.append(7)   # enqueue
    q.popleft()   # dequeue
    q.append(2)   # enqueue
    q.popleft()   # dequeue

    return list(q)`,

  // NEW: Singly Linked List
  "Singly Linked List": `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = new_node

    def delete(self, key):
        cur = self.head
        prev = None
        while cur and cur.data != key:
            prev = cur
            cur = cur.next
        if not cur:  # not found
            return
        if prev is None:
            self.head = cur.next
        else:
            prev.next = cur.next

    def traverse(self):
        cur = self.head
        while cur:
            print(cur.data, end=" -> " if cur.next else "")
            cur = cur.next
        print()`,

  "Doubly Linked List": `class DNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, data):
        new_node = DNode(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        self.tail.next = new_node
        new_node.prev = self.tail
        self.tail = new_node

    def delete(self, key):
        cur = self.head
        while cur and cur.data != key:
            cur = cur.next
        if not cur:
            return
        if cur.prev:
            cur.prev.next = cur.next
        else:
            self.head = cur.next
        if cur.next:
            cur.next.prev = cur.prev
        else:
            self.tail = cur.prev

    def traverse_forward(self):
        cur = self.head
        while cur:
            print(cur.data, end=" <-> " if cur.next else "")
            cur = cur.next
        print()

    def traverse_backward(self):
        cur = self.tail
        while cur:
            print(cur.data, end=" <-> " if cur.prev else "")
            cur = cur.prev
        print()`,

  /* ========================= NEW TREE EXAMPLES ========================= */

  // Matches your "Binary Tree" visualization (level-order traversal demo)
  "Binary Tree": `# Level-order traversal (BFS) on a binary tree
from collections import deque

class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def level_order(root):
    if not root:
        return []
    q = deque([root])
    order = []
    while q:
        node = q.popleft()
        order.append(node.val)
        if node.left: q.append(node.left)
        if node.right: q.append(node.right)
    return order`,

  // Matches your "BST" visualization (insertion highlights)
  "BST": `# Binary Search Tree insert + inorder traversal
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if root is None:
        return Node(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)`,

  // Matches your "AVL Tree" visualization (insert with rotations)
  "AVL Tree": `# AVL Tree insertion with balancing
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.h = 1  # height

def height(n):
    return n.h if n else 0

def update(n):
    n.h = 1 + max(height(n.left), height(n.right))

def balance_factor(n):
    return height(n.left) - height(n.right)

def rotate_right(y):
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    update(y); update(x)
    return x

def rotate_left(x):
    y = x.right
    T2 = y.left
    y.left = x
    x.right = T2
    update(x); update(y)
    return y

def insert(root, key):
    if not root:
        return Node(key)
    if key < root.val:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)

    update(root)
    bf = balance_factor(root)

    # LL
    if bf > 1 and key < root.left.val:
        return rotate_right(root)
    # RR
    if bf < -1 and key > root.right.val:
        return rotate_left(root)
    # LR
    if bf > 1 and key > root.left.val:
        root.left = rotate_left(root.left)
        return rotate_right(root)
    # RL
    if bf < -1 and key < root.right.val:
        root.right = rotate_right(root.right)
        return rotate_left(root)

    return root`,
    "Linear Search": `def linear_search(arr, x):
        for item in arr:
            if item == x:
                return True
        return False`,
};

/** ------------------------------------------------------------------
 *  DESCRIPTIONS / BIG-O
 *  Added entries for "Binary Tree", "BST", "AVL Tree"
 *  ------------------------------------------------------------------ */
const algoInfo = {
  "Bubble Sort": {
    time: "O(n²)",
    space: "O(1)",
    desc:
      "A simple comparison-based sorting algorithm that repeatedly compares adjacent elements and swaps them if they are out of order."
  },
  "Quick Sort": {
    time: "O(n log n) average, O(n²) worst",
    space: "O(log n)",
    desc:
      "A divide-and-conquer sorting algorithm that partitions elements around a pivot, recursively sorting each partition."
  },
  "Merge Sort": {
    time: "O(n log n)",
    space: "O(n)",
    desc:
      "Divides the array into halves, recursively sorts them, and merges the sorted halves into a final sorted array."
  },
  "Heap Sort": {
    time: "O(n log n)",
    space: "O(1)",
    desc:
      "Transforms the array into a max heap, then repeatedly extracts the largest element to sort the array in-place."
  },
  "Array Traversal": {
    time: "O(n)",
    space: "O(1)",
    desc:
      "Sequentially visits each element of the array for processing or display."
  },
  "Array Rotation": {
    time: "O(n)",
    space: "O(1)",
    desc:
      "Rotates array elements left or right by k positions, preserving relative order."
  },
  "Stack Operations": {
    time: "O(1) for push/pop",
    space: "O(n)",
    desc:
      "Demonstrates stack operations using push and pop, where elements follow LIFO (Last-In, First-Out) order."
  },
  "Expression Evaluation": {
    time: "O(n)",
    space: "O(n)",
    desc:
      "Evaluates a postfix expression using a stack by pushing operands and applying operators as they appear."
  },

  "Queue Operations": {
    time: "O(1) for enqueue/dequeue",
    space: "O(n)",
    desc:
      "A linear data structure following FIFO (First-In, First-Out). New elements are added at the rear and removed from the front."
  },

  "Singly Linked List": {
    time: "Traversal O(n), append O(n) (O(1) with tail), delete O(n)",
    space: "O(1) auxiliary",
    desc:
      "Linear nodes with a single next pointer. Common operations include append, delete by value, and forward traversal."
  },
  "Doubly Linked List": {
    time: "Traversal O(n), append O(1) with tail, delete O(1) with node ref",
    space: "O(1) auxiliary (extra prev pointer per node)",
    desc:
      "Nodes store next and prev pointers, allowing efficient forward/backward traversal and simpler deletions."
  },

  /* ========================= NEW TREE INFO ========================= */

  "Binary Tree": {
    time: "Traversal: O(n) | Search (unstructured): O(n)",
    space: "O(h) recursion/queue (h = height, O(n) worst)",
    desc:
      "A hierarchical structure where each node has up to two children. The visualization shows breadth-first (level-order) traversal that visits nodes by depth from left to right."
  },
  "BST": {
    time:
      "Insert/Search/Delete: O(h) (O(log n) average for balanced trees, O(n) worst)",
    space: "O(h) recursion (h = height)",
    desc:
      "A binary tree with an ordering invariant: left subtree values < node < right subtree values. The visualization highlights nodes visited during insertion order and common traversals."
  },
  "AVL Tree": {
    time: "Insert/Search/Delete: O(log n)",
    space: "O(log n) due to recursion / path updates",
    desc:
      "A self-balancing BST that maintains a height balance factor ∈ {−1,0,1} at every node using rotations (LL, RR, LR, RL). Guarantees logarithmic height; the visualization steps through inserts and rotations."
  },
  "Linear Search": {
    time: "O(n)",
    space: "O(1)",
    desc: "A search algorithm that iterates through the entire array in the worst case to search for one element.",
  },
};

/** ------------------------------------------------------------------
 *  PRESENTATION COMPONENT
 *  ------------------------------------------------------------------ */
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
        flexDirection: "column"
      }}
    >
      {/* PSEUDOCODE HEADER */}
      <CardHeader
        style={{
          borderBottom: "1px solid #1c2333",
          paddingBottom: "0.5rem",
          marginBottom: "0.5rem"
        }}
      >
        <CardTitle
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#b39aff",
            letterSpacing: "0.5px"
          }}
        >
          Pseudocode
        </CardTitle>
      </CardHeader>

      {/* PSEUDOCODE CONTENT */}
      <CardContent
        style={{
          flex: "0 0 auto",
          paddingBottom: "1rem",
          borderBottom: "1px solid #1c2333"
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
            tabSize: 2
          }}
        >
          {code}
        </div>
      </CardContent>

      {/* DETAILS HEADER */}
      <CardHeader
        style={{
          borderBottom: "1px solid #1c2333",
          paddingBottom: "0.5rem",
          marginBottom: "0.5rem",
          marginTop: "0.75rem"
        }}
      >
        <CardTitle
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#b39aff",
            letterSpacing: "0.5px"
          }}
        >
          Algorithm Details
        </CardTitle>
      </CardHeader>

      {/* DETAILS CONTENT */}
      <CardContent style={{ flex: "1 1 auto" }}>
        {info ? (
          <div style={{ lineHeight: 1.6 }}>
            <p
              style={{
                fontSize: "13.5px",
                color: "#c7c8f9",
                marginBottom: "6px"
              }}
            >
              <strong style={{ color: "#b39aff" }}>Time Complexity:</strong>{" "}
              {info.time}
            </p>
            <p
              style={{
                fontSize: "13.5px",
                color: "#c7c8f9",
                marginBottom: "10px"
              }}
            >
              <strong style={{ color: "#b39aff" }}>Space Complexity:</strong>{" "}
              {info.space}
            </p>
            <p style={{ fontSize: "13.5px", color: "#c7c8f9" }}>{info.desc}</p>
          </div>
        ) : (
          <p style={{ fontSize: "13.5px", color: "#8b8fb3" }}>
            Select an algorithm to see details.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
