<template>
  <div ref="container" class="universe-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const container = ref(null);
let scene, camera, renderer, animationId;
let particles, codeBlocks = [], floatingIcons = [];
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let scrollY = 0;

// Technology icons as 3D objects
const techData = [
  { symbol: 'PHP', color: 0x777BB4 },
  { symbol: 'Vue', color: 0x42B883 },
  { symbol: 'JS', color: 0xF7DF1E },
  { symbol: 'SQL', color: 0x00758F },
  { symbol: 'Git', color: 0xF05032 },
  { symbol: 'API', color: 0xa855f7 },
  { symbol: '<>', color: 0x22d3ee },
  { symbol: '{}', color: 0xf472b6 },
];

const createParticleSystem = () => {
  const count = 2000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const colorPalette = [
    new THREE.Color(0xa855f7),
    new THREE.Color(0x22d3ee),
    new THREE.Color(0xf472b6),
    new THREE.Color(0x4ade80),
  ];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 15 + Math.random() * 35;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    sizes[i] = Math.random() * 3 + 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
};

const createCodeBlock = (x, y, z, color) => {
  const group = new THREE.Group();

  // Main block with glow
  const geometry = new THREE.BoxGeometry(1.8, 1, 0.2);
  const material = new THREE.MeshPhysicalMaterial({
    color: color,
    metalness: 0.3,
    roughness: 0.4,
    transparent: true,
    opacity: 0.85,
    emissive: color,
    emissiveIntensity: 0.2,
  });
  const block = new THREE.Mesh(geometry, material);
  group.add(block);

  // Code lines inside block
  for (let i = 0; i < 4; i++) {
    const lineWidth = 0.4 + Math.random() * 0.8;
    const lineGeo = new THREE.BoxGeometry(lineWidth, 0.06, 0.05);
    const lineMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5 - i * 0.1,
    });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.set(-0.5 + lineWidth / 2, 0.25 - i * 0.18, 0.15);
    group.add(line);
  }

  // Outer glow
  const glowGeo = new THREE.BoxGeometry(2, 1.2, 0.05);
  const glowMat = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.1,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.z = -0.15;
  group.add(glow);

  group.position.set(x, y, z);
  group.userData = {
    basePosition: { x, y, z },
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.3,
    rotSpeed: 0.002 + Math.random() * 0.003,
  };

  return group;
};

const createFloatingIcon = (data, x, y, z) => {
  const group = new THREE.Group();

  // Create text sprite
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Gradient background circle
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 100);
  gradient.addColorStop(0, `#${data.color.toString(16).padStart(6, '0')}40`);
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(128, 128, 100, 0, Math.PI * 2);
  ctx.fill();

  // Text
  ctx.fillStyle = `#${data.color.toString(16).padStart(6, '0')}`;
  ctx.font = 'bold 64px Fira Code, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(data.symbol, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2.5, 2.5, 1);
  group.add(sprite);

  group.position.set(x, y, z);
  group.userData = {
    basePosition: { x, y, z },
    phase: Math.random() * Math.PI * 2,
    floatSpeed: 0.5 + Math.random() * 0.5,
    orbitRadius: 0.5 + Math.random() * 1,
  };

  return group;
};

const init = () => {
  if (!container.value) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050510, 0.02);

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 15);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x050510, 1);
  container.value.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const primaryLight = new THREE.PointLight(0xa855f7, 3, 50);
  primaryLight.position.set(10, 10, 10);
  scene.add(primaryLight);

  const secondaryLight = new THREE.PointLight(0x22d3ee, 2, 50);
  secondaryLight.position.set(-10, -5, 10);
  scene.add(secondaryLight);

  const accentLight = new THREE.PointLight(0xf472b6, 1.5, 40);
  accentLight.position.set(0, 10, -10);
  scene.add(accentLight);

  // Create particle system
  particles = createParticleSystem();
  scene.add(particles);

  // Create code blocks
  const blockPositions = [
    [-8, 4, -5], [7, 3, -8], [-6, -3, -4], [8, -2, -6],
    [-9, 0, -10], [9, 5, -12], [-5, 6, -7], [6, -5, -9],
  ];

  const colors = [0xa855f7, 0x22d3ee, 0xf472b6, 0x4ade80];
  blockPositions.forEach((pos, i) => {
    const block = createCodeBlock(pos[0], pos[1], pos[2], colors[i % colors.length]);
    scene.add(block);
    codeBlocks.push(block);
  });

  // Create floating tech icons
  techData.forEach((tech, i) => {
    const angle = (i / techData.length) * Math.PI * 2;
    const radius = 8 + Math.random() * 4;
    const x = Math.cos(angle) * radius;
    const y = (Math.random() - 0.5) * 8;
    const z = -5 - Math.random() * 10;
    const icon = createFloatingIcon(tech, x, y, z);
    scene.add(icon);
    floatingIcons.push(icon);
  });

  // Event listeners
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);

  animate();
};

const onMouseMove = (e) => {
  targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
};

const onScroll = () => {
  scrollY = window.scrollY;
};

const onResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);

  const time = Date.now() * 0.001;

  // Smooth mouse follow
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;

  // Rotate particles
  if (particles) {
    particles.rotation.y += 0.0005;
    particles.rotation.x = mouseY * 0.1;
  }

  // Animate code blocks
  codeBlocks.forEach((block) => {
    const { basePosition, phase, speed, rotSpeed } = block.userData;
    block.position.y = basePosition.y + Math.sin(time * speed + phase) * 0.5;
    block.position.x = basePosition.x + Math.cos(time * speed * 0.5 + phase) * 0.3;
    block.rotation.y += rotSpeed;
    block.rotation.x = Math.sin(time * 0.3 + phase) * 0.1;
  });

  // Animate floating icons
  floatingIcons.forEach((icon) => {
    const { basePosition, phase, floatSpeed, orbitRadius } = icon.userData;
    icon.position.y = basePosition.y + Math.sin(time * floatSpeed + phase) * 1;
    icon.position.x = basePosition.x + Math.cos(time * floatSpeed * 0.7 + phase) * orbitRadius;
    icon.rotation.z = Math.sin(time + phase) * 0.1;
  });

  // Camera parallax
  camera.position.x = mouseX * 2;
  camera.position.y = mouseY * 1.5 - scrollY * 0.002;
  camera.lookAt(0, -scrollY * 0.001, 0);

  renderer.render(scene, camera);
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
  if (renderer) {
    renderer.dispose();
    container.value?.removeChild(renderer.domElement);
  }
});
</script>

<style scoped>
.universe-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
