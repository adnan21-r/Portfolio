<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Technical Arsenal</span>
        <h2 class="section-title">Skills & <span class="gradient-text">Technologies</span></h2>
      </div>

      <div class="skills-showcase">
        <div class="skill-category" v-for="(cat, key) in categories" :key="key">
          <div class="category-header">
            <div class="category-icon" :style="{ background: cat.gradient }">
              <img :src="`https://cdn.simpleicons.org/${cat.iconName}/white`" :alt="cat.title" class="cat-logo" />
            </div>
            <div class="category-info">
              <h3>{{ cat.title }}</h3>
              <span class="category-count">{{ cat.skills.length }} skills</span>
            </div>
          </div>

          <div class="skills-list">
            <div v-for="skill in cat.skills" :key="skill.name" class="skill-item glass-card">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div 
                  class="skill-progress" 
                  :style="{ 
                    width: skill.level + '%',
                    background: cat.gradient
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tools-section">
        <h3 class="tools-title">
          <span class="tools-icon">🛠️</span>
          Development Toolkit
        </h3>
        <div class="tools-orbit">
          <div class="orbit-center">
            <span>Tools</span>
          </div>
          <div class="orbit-ring">
            <div 
              v-for="(tool, index) in tools" 
              :key="tool.name" 
              class="tool-item"
              :style="{ 
                '--angle': (index / tools.length) * 360 + 'deg',
                '--delay': index * 0.1 + 's'
              }"
            >
              <img :src="`https://cdn.simpleicons.org/${tool.slug}/white`" :alt="tool.name" class="tool-logo" />
              <span class="tool-name">{{ tool.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = {
  languages: {
    title: 'Programming Languages',
    iconName: 'codeforces',
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    skills: [
      { name: 'PHP', level: 95 },
      { name: 'JavaScript', level: 88 },
      { name: 'Python', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'HTML5/CSS3', level: 92 },
    ]
  },
  frameworks: {
    title: 'Frameworks & Libraries',
    iconName: 'vuedotjs',
    gradient: 'linear-gradient(135deg, #22d3ee, #0891b2)',
    skills: [
      { name: 'Laravel', level: 95 },
      { name: 'Vue.js', level: 88 },
      { name: 'Livewire', level: 85 },
      { name: 'Nuxt.js', level: 78 },
    ]
  },
  backend: {
    title: 'Backend & Database',
    iconName: 'serverless',
    gradient: 'linear-gradient(135deg, #4ade80, #16a34a)',
    skills: [
      { name: 'RESTful APIs', level: 92 },
      { name: 'MySQL', level: 88 },
      { name: 'Authentication', level: 90 },
      { name: 'MVC Architecture', level: 88 },
    ]
  }
};

const tools = [
  { name: 'Git', slug: 'git' },
  { name: 'VS Code', slug: 'visualstudiocode' },
  { name: 'Postman', slug: 'postman' },
  { name: 'Docker', slug: 'docker' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'Figma', slug: 'figma' },
  { name: 'PHP', slug: 'php' },
  { name: 'Python', slug: 'python' },
];
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.skills-showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
}

/* Category */
.skill-category {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 1.5rem;
  padding: 2rem;
  transition: all 0.4s ease;
}

.skill-category:hover {
  border-color: var(--border-glow);
  transform: translateY(-5px);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  font-size: 1.5rem;
}

.category-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.category-count {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Skills List */
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  padding: 1rem;
  border-radius: 0.75rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 500;
}

.skill-level {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--primary);
}

.skill-bar {
  height: 6px;
  background: var(--bg-deep);
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  border-radius: 3px;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Tools Orbit */
.tools-section {
  text-align: center;
}

.tools-title {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  margin-bottom: 3rem;
}

.tools-orbit {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
}

.orbit-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 0 60px var(--glow-primary);
  z-index: 2;
}

.orbit-ring {
  position: absolute;
  inset: 0;
  border: 1px dashed var(--border-subtle);
  border-radius: 50%;
  animation: orbit-spin 60s linear infinite;
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.tool-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(var(--angle)) translateX(180px) rotate(calc(-1 * var(--angle)));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  transition: all 0.3s ease;
  animation: orbit-spin-reverse 60s linear infinite;
}

@keyframes orbit-spin-reverse {
  from { transform: rotate(var(--angle)) translateX(180px) rotate(calc(-1 * var(--angle) - 0deg)); }
  to { transform: rotate(var(--angle)) translateX(180px) rotate(calc(-1 * var(--angle) - 360deg)); }
}

.tool-item:hover {
  border-color: var(--primary);
  background: rgba(168, 85, 247, 0.1);
  z-index: 10;
  transform: rotate(var(--angle)) translateX(180px) rotate(calc(-1 * var(--angle))) scale(1.1);
}

.cat-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.tool-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.tool-name {
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .skills-showcase {
    grid-template-columns: 1fr;
  }

  .tools-orbit {
    width: 320px;
    height: 320px;
  }

  .tool-item {
    transform: rotate(var(--angle)) translateX(140px) rotate(calc(-1 * var(--angle)));
    padding: 0.75rem;
  }

  @keyframes orbit-spin-reverse {
    from { transform: rotate(var(--angle)) translateX(140px) rotate(calc(-1 * var(--angle) - 0deg)); }
    to { transform: rotate(var(--angle)) translateX(140px) rotate(calc(-1 * var(--angle) - 360deg)); }
  }
}

@media (max-width: 640px) {
  .tools-orbit {
    width: 280px;
    height: 280px;
  }

  .orbit-center {
    width: 80px;
    height: 80px;
    font-size: 0.9rem;
  }

  .tool-item {
    transform: rotate(var(--angle)) translateX(120px) rotate(calc(-1 * var(--angle)));
    padding: 0.5rem;
  }

  @keyframes orbit-spin-reverse {
    from { transform: rotate(var(--angle)) translateX(120px) rotate(calc(-1 * var(--angle) - 0deg)); }
    to { transform: rotate(var(--angle)) translateX(120px) rotate(calc(-1 * var(--angle) - 360deg)); }
  }

  .tool-name {
    display: none;
  }
}
</style>
