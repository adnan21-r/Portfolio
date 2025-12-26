<template>
  <footer class="footer">
    <div class="glow-border"></div>
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="#" class="nav-logo">
          <div class="logo-icon">
            <span class="bracket">&lt;</span>
            <span class="slash">/</span>
            <span class="bracket">&gt;</span>
          </div>
          <span class="logo-name">Adnan<span class="dot">.</span></span>
        </a>
        <p class="footer-desc">
          Engineering digital excellence with precision and passion. 
          Building the future, one line of code at a time.
        </p>
        <div class="footer-status">
          <span class="status-pulse"></span>
          Ready for New Projects
        </div>
      </div>

      <div class="footer-nav">
        <div class="footer-col">
          <h4>Navigation</h4>
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Portfolio</a>
        </div>
        <div class="footer-col">
          <h4>Tech Stack</h4>
          <a href="#">Laravel</a>
          <a href="#">Vue.js</a>
          <a href="#">Three.js</a>
          <a href="#">REST APIs</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <a href="https://www.linkedin.com/in/adnan-al-rakka-978003338" target="_blank">LinkedIn</a>
          <a href="https://github.com/adnan21-r" target="_blank">GitHub</a>
          <a href="mailto:adnanalrakka_2004@hotmail.com">Email</a>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <div class="bottom-wrap">
        <p class="copyright">© {{ year }} Adnan Al Rakka. Rights reserved.</p>
        <div class="bottom-info">
          <span>Built with <span class="highlight">Nuxt 4</span> & <span class="highlight">Three.js</span></span>
          <div class="v-divider"></div>
          <span>Performance: <span class="highlight">100/100</span></span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  position: relative;
  background: var(--bg-deep);
  padding-top: 8rem;
  border-top: 1px solid var(--border-subtle);
  overflow: hidden;
}

.glow-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), var(--secondary), transparent);
  box-shadow: 0 0 20px var(--glow-primary);
}

.footer-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 5rem;
  padding-bottom: 5rem;
}

.footer-desc {
  color: var(--text-secondary);
  max-width: 350px;
  margin: 1.5rem 0 2rem;
  line-height: 1.8;
}

.footer-status {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(74, 222, 128, 0.05);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 2rem;
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 500;
}

.status-pulse {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.footer-col h4 {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.footer-col a {
  display: block;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.footer-col a:hover {
  color: var(--primary-light);
  transform: translateX(5px);
}

.footer-bottom {
  border-top: 1px solid var(--border-subtle);
  padding: 2.5rem 0;
}

.bottom-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.bottom-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.highlight {
  color: var(--text-primary);
  font-weight: 600;
}

.v-divider {
  width: 1px;
  height: 20px;
  background: var(--border-subtle);
}

/* Nav Logo Styles (Reused from Navbar) */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  display: flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 600;
}

.bracket { color: var(--primary); }
.slash { color: var(--secondary); }
.logo-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.dot { color: var(--primary); }

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .footer-nav {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .bottom-wrap {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}
</style>
