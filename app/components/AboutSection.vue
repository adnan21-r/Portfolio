<template>
  <section id="about" class="section">
    <div class="container">
      <div class="about-layout">
        <div class="about-visual">
          <div class="terminal-3d">
            <div class="terminal-frame">
              <div class="terminal-header">
                <div class="terminal-buttons">
                  <span class="btn-close"></span>
                  <span class="btn-min"></span>
                  <span class="btn-max"></span>
                </div>
                <span class="terminal-title">adnan@portfolio:~</span>
              </div>
              <div class="terminal-body">
                <div class="terminal-line">
                  <span class="prompt">$</span>
                  <span class="command">cat about.json</span>
                </div>
                <div class="terminal-output">
                  <pre>{
  "name": "Adnan Al Rakka",
  "title": "Software Developer",
  "location": "Lebanon",
  "education": {
    "degree": "BS Computer Engineering",
    "university": "Lebanese International University",
    "gpa": "3.5/4.0"
  },
  "current_role": "Software Developer @ Orion Dev",
  "focus": [
    "Backend Architecture",
    "RESTful APIs",
    "Interactive UIs"
  ],
  "motto": "Code with precision, build with passion"
}</pre>
                </div>
                <div class="terminal-line">
                  <span class="prompt">$</span>
                  <span class="cursor">_</span>
                </div>
              </div>
            </div>
            
            <div class="floating-elements">
              <div class="float-element el-1">
                <img src="https://cdn.simpleicons.org/php/white" alt="PHP" />
              </div>
              <div class="float-element el-2">
                <img src="https://cdn.simpleicons.org/vuedotjs/white" alt="Vue" />
              </div>
              <div class="float-element el-3">
                <img src="https://cdn.simpleicons.org/laravel/white" alt="Laravel" />
              </div>
            </div>
          </div>
        </div>

        <div class="about-content">
          <span class="section-eyebrow">About Me</span>
          <h2 class="section-title">
            Transforming Ideas Into
            <span class="gradient-text">Digital Reality</span>
          </h2>

          <p class="about-text">
            I'm a dedicated Software Developer with a passion for building systems that 
            make a difference. Currently pursuing my BS in Computer Engineering at 
            <strong>Lebanese International University</strong> with a <strong>3.5 GPA</strong>, 
            I combine strong academic foundations with real-world development experience.
          </p>

          <p class="about-text">
            My expertise spans from crafting robust backend architectures with Laravel 
            to building dynamic, responsive frontends with Vue.js. I thrive in creating 
            secure, scalable solutions that solve real problems.
          </p>

          <div class="about-cards">
            <div class="about-card glass-card">
              <div class="card-icon-wrap">
                <span class="card-icon">🎓</span>
              </div>
              <h4>Education</h4>
              <p>BS Computer Engineering</p>
              <span class="card-sub">LIU • GPA 3.5/4.0</span>
            </div>

            <div class="about-card glass-card">
              <div class="card-icon-wrap">
                <span class="card-icon">💼</span>
              </div>
              <h4>Current Role</h4>
              <p>Software Developer</p>
              <span class="card-sub">Orion Dev • Full-time</span>
            </div>

            <div class="about-card glass-card">
              <div class="card-icon-wrap">
                <span class="card-icon">🏆</span>
              </div>
              <h4>Baccalaureate</h4>
              <p>General Science</p>
              <span class="card-sub">Grade: 15.9/20</span>
            </div>
          </div>

          <div class="soft-skills">
            <h4 class="skills-title">Core Competencies</h4>
            <div class="skills-wrap">
              <span class="skill-pill">Problem Solving</span>
              <span class="skill-pill">Time Management</span>
              <span class="skill-pill">Team Collaboration</span>
              <span class="skill-pill">Technical Documentation</span>
              <span class="skill-pill">Agile Methodology</span>
              <span class="skill-pill">Code Review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 5rem;
  align-items: center;
}

/* Terminal 3D */
.terminal-3d {
  position: relative;
  perspective: 1000px;
}

.terminal-frame {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  overflow: hidden;
  transform: rotateY(-5deg) rotateX(5deg);
  transition: transform 0.5s ease;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.terminal-frame:hover {
  transform: rotateY(0deg) rotateX(0deg);
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-subtle);
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn-close { background: #ff5f57; }
.btn-min { background: #febc2e; }
.btn-max { background: #28c840; }

.terminal-title {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.terminal-body {
  padding: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.8;
}

.terminal-line {
  margin-bottom: 0.5rem;
}

.prompt {
  color: var(--accent);
  margin-right: 0.5rem;
}

.command {
  color: var(--secondary);
}

.terminal-output {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem 0;
  overflow-x: auto;
}

.terminal-output pre {
  color: var(--text-secondary);
  margin: 0;
  white-space: pre-wrap;
}

.cursor {
  animation: blink 1s infinite;
  color: var(--primary);
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.float-element {
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  animation: float-around 6s ease-in-out infinite;
  padding: 10px;
}

.float-element img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.el-1 {
  top: -20px;
  right: 30px;
  color: var(--primary);
  animation-delay: 0s;
}

.el-2 {
  bottom: 40px;
  right: -30px;
  color: var(--accent);
  animation-delay: -2s;
}

.el-3 {
  top: 50%;
  left: -40px;
  color: var(--secondary);
  animation-delay: -4s;
}

@keyframes float-around {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -10px) rotate(5deg); }
  75% { transform: translate(-10px, 10px) rotate(-5deg); }
}

/* Content */
.about-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.about-text strong {
  color: var(--primary-light);
}

.about-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.about-card {
  padding: 1.5rem;
  text-align: center;
}

.card-icon-wrap {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(168, 85, 247, 0.1);
  border-radius: 0.75rem;
}

.card-icon {
  font-size: 1.5rem;
}

.about-card h4 {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.about-card p {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.card-sub {
  font-size: 0.85rem;
  color: var(--primary);
}

.skills-title {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.skills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-pill {
  padding: 0.5rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 2rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.skill-pill:hover {
  border-color: var(--primary);
  background: rgba(168, 85, 247, 0.1);
}

@media (max-width: 1024px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .terminal-3d {
    order: 2;
  }

  .terminal-frame {
    transform: none;
  }

  .about-cards {
    grid-template-columns: 1fr;
  }
}
</style>
