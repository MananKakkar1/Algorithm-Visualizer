import styles from "../styles/LandingPage.module.css";
const LandingPage = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            AlgoViz
          </div>
          <nav className={styles.navigation}>
            <a href="#features" className={styles.navLink}>
              Features
            </a>
            <a href="#algorithms" className={styles.navLink}>
              Algorithms
            </a>
            <a href="#about" className={styles.navLink}>
              About
            </a>
            <a href="#contact" className={styles.navLink}>
              Contact
            </a>
          </nav>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Visualize Algorithms
            <span className={styles.highlight}> Like Never Before</span>
          </h1>
          <p className={styles.heroDescription}>
            Interactive algorithm visualization platform that makes complex algorithms easy to understand through
            stunning visual representations and step-by-step execution.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryButton}>Start Visualizing</button>
            <button className={styles.secondaryButton}>
              <span className={styles.playIcon}>▶</span>
              Watch Demo
            </button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.algorithmDemo}>
            <div className={styles.bars}>
              <div className={styles.bar} style={{ height: "60%" }}></div>
              <div className={styles.bar} style={{ height: "30%" }}></div>
              <div className={styles.bar} style={{ height: "80%" }}></div>
              <div className={styles.bar} style={{ height: "45%" }}></div>
              <div className={styles.bar} style={{ height: "90%" }}></div>
              <div className={styles.bar} style={{ height: "20%" }}></div>
            </div>
            <p className={styles.demoLabel}>Sorting Algorithm Visualization</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose AlgoViz?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3 className={styles.featuresHeader}>Interactive Learning</h3>
              <p>Step through algorithms at your own pace with interactive controls and detailed explanations.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featuresHeader}>Real-time Visualization</h3>
              <p>Watch algorithms execute in real-time with smooth animations and visual feedback.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🧠</div>
              <h3 className={styles.featuresHeader}>Multiple Algorithms</h3>
              <p>Explore sorting, searching, graph, and pathfinding algorithms all in one place.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3 className={styles.featuresHeader}>Performance Metrics</h3>
              <p>Compare time and space complexity with built-in performance analysis tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section id="algorithms" className={styles.algorithms}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Supported Algorithms</h2>
          <div className={styles.algorithmCategories}>
            <div className={styles.categoryCard}>
              <h3>Sorting Algorithms</h3>
              <ul>
                <li>Bubble Sort</li>
                <li>Quick Sort</li>
                <li>Merge Sort</li>
                <li>Heap Sort</li>
              </ul>
            </div>
            <div className={styles.categoryCard}>
              <h3>Pathfinding</h3>
              <ul>
                <li>Dijkstra's Algorithm</li>
                <li>A* Search</li>
                <li>Breadth-First Search</li>
                <li>Depth-First Search</li>
              </ul>
            </div>
            <div className={styles.categoryCard}>
              <h3>Graph Algorithms</h3>
              <ul>
                <li>Minimum Spanning Tree</li>
                <li>Topological Sort</li>
                <li>Strongly Connected Components</li>
                <li>Network Flow</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Ready to Master Algorithms?</h2>
          <p>Join thousands of students and professionals who have improved their algorithmic thinking with AlgoViz.</p>
          <button className={styles.ctaButtonLarge}>Start Learning Today</button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h4>AlgoViz</h4>
              <p>Making algorithms accessible through visualization.</p>
            </div>
            <div className={styles.footerSection}>
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#algorithms">Algorithms</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">Tutorials</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
