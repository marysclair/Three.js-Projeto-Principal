import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { gsap } from "gsap/gsap-core";

const canvas = document.querySelector("#canvas");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

canvas.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(1, 0.5, 4);
orbit.update();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
