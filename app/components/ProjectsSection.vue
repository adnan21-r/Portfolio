<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Creative Portfolio</span>
        <h2 class="section-title">Innovative <span class="gradient-text">Project Gallery</span></h2>
      </div>

      <div class="projects-grid">
        <div 
          v-for="(project, index) in projects" 
          :key="index" 
          class="project-card-3d"
          @mousemove="handleMouseMove($event, index)"
          @mouseleave="handleMouseLeave(index)"
          :ref="el => projectRefs[index] = el"
        >
          <div class="project-inner">
            <div class="project-front glass-card">
              <div class="project-visual" :style="{ background: project.gradient }">
                <div class="project-icon">{{ project.icon }}</div>
                <div class="project-number">0{{ index + 1 }}</div>
              </div>
              <div class="project-info">
                <h3 class="project-name">{{ project.title }}</h3>
                <p class="project-tagline">{{ project.tagline }}</p>
                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag" class="small-tag">{{ tag }}</span>
                </div>
              </div>
            </div>

            <div class="project-back glass-card">
              <div class="back-content">
                <h3>Challenge & Solution</h3>
                <p>{{ project.description }}</p>
                
                <div class="project-results">
                  <div v-for="result in project.results" :key="result" class="result-item">
                    <span class="result-check">✓</span>
                    {{ result }}
                  </div>
                </div>

                <div class="project-links">
                  <a :href="project.github" target="_blank" class="btn btn-outline btn-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.795 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.237 1.07 1.834 2.809 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Source
                  </a>
                  <a :href="project.link" target="_blank" class="btn btn-primary btn-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    Visit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';

const projectRefs = ref([]);

const projects = [
  {
    title: "E-Commerce Titan",
    tagline: "High-performance shopping experience",
    description: "Architected a complete end-to-end e-commerce solution with a focus on security and scalability. Implemented complex product variants and real-time inventory management.",
    icon: "🛍️",
    gradient: "linear-gradient(135deg, #a855f7, #22d3ee)",
    tags: ["Laravel", "Vue.js", "Stripe", "MySQL"],
    results: ["100% Secure Checkout", "Under 2s Page Load", "Automated Invoicing"],
    github: "https://github.com/adnan21-r",
    link: "#"
  },
  {
    title: "Crisis Control OS",
    tagline: "Real-time emergency management",
    description: "Developed a mission-critical system for donor family tracking and resource allocation. Features live geolocation tracking and instant communication protocols.",
    icon: "🚨",
    gradient: "linear-gradient(135deg, #f472b6, #fbbf24)",
    tags: ["PHP", "JavaScript", "Google Maps", "WebSockets"],
    results: ["Real-time Geo-tracking", "Multi-user Coordination", "Instant Alerts"],
    github: "https://github.com/adnan21-r",
    link: "#"
  },
  {
    title: "Portfolio Universe",
    tagline: "The one you are exploring",
    description: "An immersive 3D experience designed to showcase the intersection of engineering and art. Built with high-performance WebGL and modern Vue architecture.",
    icon: "🌌",
    gradient: "linear-gradient(135deg, #4ade80, #3b82f6)",
    tags: ["Nuxt.js", "Three.js", "GSAP", "Custom GLSL"],
    results: ["Incomparable 3D UX", "Fully Responsive", "SEO Optimized"],
    github: "https://github.com/adnan21-r",
    link: "#"
  }
];

const handleMouseMove = (e, index) => {
  const card = projectRefs.value[index];
  if (!card) return;
  
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  
  card.style.setProperty('--rx', `${rotateX}deg`);
  card.style.setProperty('--ry', `${rotateY}deg`);
};

const handleMouseLeave = (index) => {
  const card = projectRefs.value[index];
  if (!card) return;
  card.style.setProperty('--rx', `0deg`);
  card.style.setProperty('--ry', `0deg`);
};
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}

.project-card-3d {
  perspective: 2000px;
  height: 500px;
  cursor: pointer;
}

.project-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
}

.project-card-3d:hover .project-inner {
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(1.02);
}

/* Flip on hover for different info */
.project-card-3d:active .project-inner,
.project-card-3d.flipped .project-inner {
  transform: rotateY(180deg);
}

.project-front, .project-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-width: 2px;
}

.project-back {
  transform: rotateY(180deg);
  padding: 2.5rem;
  justify-content: center;
}

.project-visual {
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.25rem 1.25rem 0 0;
  margin: -1px -1px 0 -1px;
}

.project-icon {
  font-size: 5rem;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
  z-index: 1;
}

.project-number {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 800;
  opacity: 0.2;
  color: white;
}

.project-info {
  padding: 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-name {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.project-tagline {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 2rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
}

.small-tag {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  padding: 0.25rem 0.75rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  color: var(--text-muted);
}

/* Back Content */
.back-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-light);
}

.back-content p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.project-results {
  margin-bottom: 2.5rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.result-check {
  color: var(--accent);
  font-weight: 900;
}

.project-links {
  display: flex;
  gap: 1.5rem;
}

.btn-icon {
  flex: 1;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
