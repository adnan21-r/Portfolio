<template>
  <footer class="footer">
    <div class="container footer-row">
      <p>© {{ year }} Adnan Al Rakka</p>
      <p class="footer-mono">Built with Nuxt · <a href="#">Back to top ↑</a></p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: var(--code-bg);
  color: var(--code-dim);
  border-top: 1px solid var(--code-line);
  padding: 1.5rem 0;
  font-size: 0.85rem;
}

.footer-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 2rem;
}

.footer-mono {
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

.footer-mono a {
  color: var(--code-text);
}

.footer-mono a:hover {
  color: #fff;
}

.footer :focus-visible {
  outline-color: var(--code-key);
}
</style>
