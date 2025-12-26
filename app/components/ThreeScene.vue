<template>
  <div ref="containerRef" class="three-scene"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const containerRef = ref(null);
let scene, camera, renderer, animationId;
let codeBlocks = [];
let mouseX = 0, mouseY = 0;

const createCodeBlock = (x, y, z, color, text) => {
  const group = new THREE.Group();
  
  // Main block
  const geometry = new THREE.BoxGeometry(2, 1.2, 0.3);
  const material = new THREE.MeshPhysicalMaterial({
    color: color,
    metalness: 0.1,
    roughness: 0.2,
    transparent: true,
    opacity: 0.9,
    emissive: color,
    emissiveIntensity: 0.1,
  });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  // Glow effect
  const glowGeometry = new THREE.BoxGeometry(2.2, 1.4, 0.1);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.15,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  glow.position.z = -0.2;
  group.add(glow);

  // Code lines (visual representation)
  for (let i = 0; i < 3; i++) {
    const lineGeometry = new THREE.BoxGeometry(1.4 - i * 0.3, 0.08, 0.05);
    const lineMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6 - i * 0.15,
    });
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.set(-0.1 + i * 0.1, 0.3 - i * 0.3, 0.2);
    group.add(line);
  }

  group.position.set(x, y, z);
  group.userData = { 
    baseY: y, 
    phase: Math.random() * Math.PI * 2,
    rotationSpeed: 0.001 + Math.random() * 0.002
  };
  
  return group;
};

const createFloatingSymbol = (symbol, x, y, z, size = 0.5) => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#7c3aed';
  ctx.font = `bold ${80}px JetBrains Mono, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(symbol, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ 
    map: texture, 
    transparent: true,
    opacity: 0.8 
  });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(x, y, z);
  sprite.scale.set(size, size, 1);
  sprite.userData = { 
    baseY: y, 
    phase: Math.random() * Math.PI * 2,
    floatSpeed: 0.5 + Math.random() * 0.5
  };
  
  return sprite;
};

const init = () => {
  if (!containerRef.value) return;

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0f, 5, 25);

  // Camera
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
  camera.position.set(0, 0, 10);

  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0a0a0f, 0);
  containerRef.value.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x7c3aed, 2, 20);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x06b6d4, 1.5, 20);
  pointLight2.position.set(-5, -5, 5);
  scene.add(pointLight2);

  // Create 3D code blocks representing different technologies
  const colors = [0x7c3aed, 0x06b6d4, 0xf472b6, 0x10b981, 0xf59e0b];
  const positions = [
    [-4, 2, -2], [4, 1.5, -3], [-3, -1.5, -1], [3.5, -2, -2], [0, 3, -4],
    [-5, 0, -3], [5, -1, -4], [-2, -3, -2], [2, -2.5, -1]
  ];

  positions.forEach((pos, i) => {
    const block = createCodeBlock(pos[0], pos[1], pos[2], colors[i % colors.length], '');
    scene.add(block);
    codeBlocks.push(block);
  });

  // Add floating code symbols
  const symbols = ['<>', '/>', '{}', '[]', '=>', '()', '&&', '||', '!=', '++'];
  symbols.forEach((sym, i) => {
    const angle = (i / symbols.length) * Math.PI * 2;
    const radius = 6 + Math.random() * 3;
    const x = Math.cos(angle) * radius;
    const y = (Math.random() - 0.5) * 6;
    const z = -3 - Math.random() * 5;
    const sprite = createFloatingSymbol(sym, x, y, z, 0.8 + Math.random() * 0.4);
    scene.add(sprite);
    codeBlocks.push(sprite);
  });

  // Mouse tracking
  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);

  animate();
};

const onMouseMove = (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
};

const onResize = () => {
  if (!containerRef.value) return;
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);

  const time = Date.now() * 0.001;

  // Animate code blocks
  codeBlocks.forEach((block) => {
    const { baseY, phase, rotationSpeed, floatSpeed } = block.userData;
    
    if (block.type === 'Sprite') {
      block.position.y = baseY + Math.sin(time * floatSpeed + phase) * 0.5;
    } else {
      block.position.y = baseY + Math.sin(time * 0.8 + phase) * 0.3;
      block.rotation.y += rotationSpeed;
      block.rotation.x = Math.sin(time * 0.5 + phase) * 0.1;
    }
  });

  // Camera follows mouse slightly
  camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
  camera.position.y += (mouseY * 1 - camera.position.y) * 0.02;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  document.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', onResize);
  if (renderer) {
    renderer.dispose();
    containerRef.value?.removeChild(renderer.domElement);
  }
});
</script>

<style scoped>
.three-scene {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
