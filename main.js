import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableZoom = false;
controls.enableDamping= true;
const particleGeometry = new THREE.BufferGeometry();
const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

const particles = [];
const particleCount = 5000;

for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 5;
    const radius = Math.random() * 15;

    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const z = Math.random() * 2;

    particles.push(x, y, z);
}

particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particles, 3));

const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

camera.position.z = 20;
let rotationSpeed = 0.011;

document.addEventListener('click', () => {
    rotationSpeed *= -1; 
});
const animate = () => {
    requestAnimationFrame(animate);

    particleSystem.rotation.x += rotationSpeed;
    particleSystem.rotation.y += rotationSpeed;

    controls.update(); 
    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();