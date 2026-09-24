<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container nav-wrapper">
      <a href="#" class="nav-logo" translate="no" aria-label="Adnan Al Rakka, back to top">
        adnan<span class="logo-sep">/</span>al-rakka
      </a>

      <nav id="site-nav" class="nav-menu" translate="no" :class="{ open: menuOpen }" aria-label="Sections">
        <a v-for="link in links" :key="link.href" :href="link.href" class="nav-link" @click="closeMenu">
          <span class="method get">GET</span>{{ link.path }}
        </a>
        <a href="#contact" class="nav-link nav-cta" @click="closeMenu">
          <span class="method post">POST</span>/contact
        </a>
      </nav>

      <button
        class="nav-toggle"
        :class="{ open: menuOpen }"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const links = [
  { href: '#about', path: '/about' },
  { href: '#experience', path: '/experience' },
  { href: '#projects', path: '/projects' },
  { href: '#skills', path: '/skills' },
];

const isScrolled = ref(false);
const menuOpen = ref(false);

const closeMenu = () => menuOpen.value = false;

const onKeydown = (e) => {
  if (e.key === 'Escape') closeMenu();
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 24;
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.1rem 0;
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease, padding 0.3s ease;
}

.navbar.scrolled {
  padding: 0.7rem 0;
  background: rgba(237, 239, 242, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--rule);
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 500;
}

.logo-sep {
  color: var(--accent);
  margin: 0 0.1em;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.45rem 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--ink-2);
  border-radius: 6px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  color: var(--ink);
  background: var(--surface);
}

.nav-cta {
  margin-left: 0.5rem;
  border: 1px solid var(--rule);
  background: var(--surface);
  color: var(--ink);
}

.nav-cta:hover {
  border-color: var(--ink);
}

.nav-toggle {
  display: none;
  position: relative;
  width: 40px;
  height: 40px;
  background: none;
  border: 1px solid var(--rule);
  border-radius: 8px;
  cursor: pointer;
  z-index: 1001;
}

.nav-toggle span {
  position: absolute;
  left: 11px;
  width: 16px;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.25s ease, top 0.25s ease;
}

.nav-toggle span:nth-child(1) { top: 15px; }
.nav-toggle span:nth-child(2) { top: 22px; }
.nav-toggle.open span:nth-child(1) { top: 19px; transform: rotate(45deg); }
.nav-toggle.open span:nth-child(2) { top: 19px; transform: rotate(-45deg); }

@media (max-width: 860px) {
  .nav-toggle {
    display: block;
  }

  .nav-menu {
    position: fixed;
    inset: 0 0 auto 0;
    padding: 5rem var(--gutter) 1.5rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
    background: var(--canvas);
    border-bottom: 1px solid var(--rule);
    transform: translateY(-100%);
    visibility: hidden;
    transition: transform 0.3s ease, visibility 0.3s;
  }

  .nav-menu.open {
    transform: translateY(0);
    visibility: visible;
  }

  .nav-link {
    padding: 0.9rem 0.75rem;
    font-size: 0.9rem;
  }

  .nav-cta {
    margin: 0.5rem 0 0;
  }
}
</style>
