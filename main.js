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

const loader = new FontLoader();
loader.load("Montserrat Medium_Regular.json", (font) => {
  const textGeometry = new TextGeometry("Portfólio", {
    font: font,
    size: 1.2,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.03,
    bevelSegments: 5,
  });
  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load(
    "/Poliigon_StoneQuartzite_8060_BaseColor.jpg"
  );
  const metalnessMap = textureLoader.load(
    "/Poliigon_StoneQuartzite_8060_Metallic.jpg"
  );
  const roughnessMap = textureLoader.load(
    "/Poliigon_StoneQuartzite_8060_Roughness.jpg"
  );
  const normalMap = textureLoader.load(
    "/Poliigon_StoneQuartzite_8060_Normal.png"
  );

  const textMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.5,
    roughness: 0.5,
    metalnessMap: metalnessMap,
    roughnessMap: roughnessMap,
    normalMap: normalMap,
  });

  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.x = -4.2;
  textMesh.position.y = -0.5;

  scene.add(textMesh);
});

const ambientLight = new THREE.AmbientLight(0x0f172a, 0.5);
scene.add(ambientLight);

const directionalLightTopLeft1 = new THREE.DirectionalLight(0x3399ff, 1);
directionalLightTopLeft1.position.set(-3, 3, 5);
scene.add(directionalLightTopLeft1);

const directionalLightTopRight1 = new THREE.DirectionalLight(0x9933ff, 1);
directionalLightTopRight1.position.set(3, 3, 5);
scene.add(directionalLightTopRight1);

const directionalLightTopLeft2 = new THREE.DirectionalLight(0x3399ff, 1);
directionalLightTopLeft2.position.set(-3, 3, 10);
scene.add(directionalLightTopLeft2);

const directionalLightTopRight2 = new THREE.DirectionalLight(0x9933ff, 1);
directionalLightTopRight2.position.set(3, 3, 10);
scene.add(directionalLightTopRight2);

const directionalLightBottom = new THREE.DirectionalLight(0xffffcc, 1);
directionalLightBottom.position.set(0, -3, 5);
scene.add(directionalLightBottom);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 5);
scene.add(directionalLight);

function moveLightWithCursor(event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  gsap.to(directionalLight.position, {
    x: x * 10,
    y: y * 10,
    duration: 0.5,
    ease: "elastic.out(1,0.3)",
  });
}

canvas.addEventListener("mousemove", moveLightWithCursor);

const tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  ease: "elastic.out(1,0.3)",
});

tl.to(camera.position, {
  z: 5,
  y: 1,
  x: 1,
  duration: 4,
})
  .to(camera.position, {
    x: -1,
    duration: 2,
  })
  .to(camera.position, {
    x: 2,
    duration: 2,
  })
  .to(camera.position, {
    x: 1,
    y: 0.5,
    z: 4,
    duration: 3,
  });

function createRandomStars(numberOfstars) {
  for (let i = 0; i < numberOfstars; i++) {
    const geometry = new THREE.OctahedronGeometry(0.08, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0xcbd5e1 });
    const star = new THREE.Mesh(geometry, material);

    star.position.set(
      Math.random() * 20 - 10,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );

    scene.add(star);

    gsap.to(star.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: Math.random() * (2 - 0.5) + 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }
}

createRandomStars(150);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
