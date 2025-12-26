<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    
    <!-- Immersive 3D Background -->
    <ThreeUniverse />
    
    <!-- Navigation -->
    <Navbar />
    
    <main>
      <!-- Hero: First Impression -->
      <HeroSection />
      
      <div class="glow-line"></div>
      
      <!-- About: The Story -->
      <AboutSection />
      
      <!-- Experience: The Proof -->
      <ExperienceSection />
      
      <!-- Skills: The Tools -->
      <SkillsSection />
      
      <div class="glow-line"></div>
      
      <!-- Projects: The Evidence -->
      <ProjectsSection />
      
      <!-- Contact: The Connection -->
      <ContactSection />
    </main>

    <!-- Footer: The Legacy -->
    <FooterSection />
    
    <!-- Top Progress Bar -->
    <div class="scroll-progress-container">
      <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrollProgress = ref(0);

const updateScrollProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.value = scrolled;
};

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
});
</script>

<style>
.app-root {
  min-height: 100vh;
  position: relative;
}

main {
  position: relative;
  z-index: 1;
}

/* Page Scroll Progress */
.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: transparent;
  z-index: 2000;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--tertiary));
  box-shadow: 0 0 10px var(--glow-primary);
  transition: width 0.1s ease-out;
}

/* Global Section Animations */
.section {
  overflow: hidden;
}

[data-aos] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-aos].aos-animate {
  opacity: 1;
  transform: translateY(0);
}
</style>
