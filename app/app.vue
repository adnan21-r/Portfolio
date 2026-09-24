<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    <a href="#main" class="skip-link">Skip to content</a>

    <Navbar />

    <main id="main">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>

    <FooterSection />
  </div>
</template>

<style>
.skip-link {
  position: absolute;
  left: 1rem;
  top: -3rem;
  z-index: 2000;
  padding: 0.5rem 1rem;
  background: var(--ink);
  color: var(--surface);
  border-radius: 6px;
}

.skip-link:focus {
  top: 1rem;
}
</style>
