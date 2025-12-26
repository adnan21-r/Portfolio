<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container nav-wrapper">
      <a href="#" class="nav-logo">
        <div class="logo-icon">
          <span class="bracket">&lt;</span>
          <span class="slash">/</span>
          <span class="bracket">&gt;</span>
        </div>
        <span class="logo-name">Adnan<span class="dot">.</span></span>
      </a>

      <div class="nav-menu" :class="{ active: menuOpen }">
        <a href="#about" class="nav-link" @click="closeMenu">About</a>
        <a href="#experience" class="nav-link" @click="closeMenu">Experience</a>
        <a href="#skills" class="nav-link" @click="closeMenu">Skills</a>
        <a href="#projects" class="nav-link" @click="closeMenu">Projects</a>
        <a href="#contact" class="btn btn-primary nav-cta" @click="closeMenu">
          <span>Let's Connect</span>
        </a>
      </div>

      <button class="nav-toggle" :class="{ active: menuOpen }" @click="menuOpen = !menuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isScrolled = ref(false);
const menuOpen = ref(false);

const closeMenu = () => menuOpen.value = false;

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled {
  padding: 1rem 0;
  background: rgba(5, 5, 16, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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

.bracket {
  color: var(--primary);
}

.slash {
  color: var(--secondary);
}

.logo-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.dot {
  color: var(--primary);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  padding: 0.5rem 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-cta {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.nav-toggle span {
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  transition: all 0.3s ease;
  transform-origin: center;
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 900px) {
  .nav-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 350px;
    height: 100vh;
    background: var(--bg-main);
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    border-left: 1px solid var(--border-subtle);
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-menu.active {
    right: 0;
  }

  .nav-link {
    font-size: 1.25rem;
  }

  .nav-cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
