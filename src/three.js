// NOTE From sample codepen - https://codepen.io/mjurczyk

import * as THREE from 'three';
import packageJson from '../package.json';

let camera, scene, renderer, ground, lightPrimary, lightSecondary, textures;

const createWorld = () => {
  const meshA = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshPhysicalMaterial({
      map: textures.debugGreen,
      roughness: 0.75,
      metalness: 0.0,
    })
  );
  meshA.castShadow = true;
  meshA.position.x = -3.0;
  meshA.rotateZ(0.5);

  ground = new THREE.Mesh(
    new THREE.CylinderGeometry(25.0, 25.0, 0.01, 64),
    new THREE.MeshStandardMaterial({ map: textures.debugFloor })
  );
  ground.position.y = -3.0;
  ground.receiveShadow = true;
  
  lightPrimary = new THREE.PointLight(0xffffff, 100.0);
  lightPrimary.position.set(2.0, 2.0, -2.0);
  lightPrimary.castShadow = true;
  
  lightSecondary = new THREE.PointLight(0x8888ff, 100.0);
  lightSecondary.position.set(-2.0, 2.0, -2.0);
  lightSecondary.castShadow = true;
  
  scene.add(meshA);
  scene.add(ground);
  scene.add(lightPrimary);
  scene.add(lightSecondary);
  
  camera.lookAt(meshA.position);
};

const init = () => {
  const container = document.querySelector('.vanilla-canvas-wrapper');
  const containerBox = container.getBoundingClientRect();

  const label = container.querySelector('.label');
  label.innerHTML = `three ${packageJson.devDependencies['three']}`;

  camera = new THREE.PerspectiveCamera(60, containerBox.width / containerBox.height, 0.1, 1000.0);
  camera.position.set(-5, 5, 7);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  scene.add(new THREE.HemisphereLight(0xffffcc, 0x19bbdc, 0.5));

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(containerBox.width, containerBox.height);
  renderer.shadowMap.enabled = true;
  
  window.addEventListener('resize', () => {
    camera.aspect = containerBox.width / containerBox.height;
    camera.updateProjectionMatrix();
    renderer.setSize(containerBox.width, containerBox.height);
  });

  container.appendChild(renderer.domElement);

  createWorld();
}

const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera); 
}

textures = {
  debugFloor: new THREE.TextureLoader().load('//cdn.wtlstudio.com/sample.wtlstudio.com/9f120108-34f1-4c8e-8340-42ab82b1110c.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.repeat.setScalar(4.0);
  }),
  debugGreen: new THREE.TextureLoader().load('//cdn.wtlstudio.com/sample.wtlstudio.com/9a69fcdb-e1b0-4b1a-9869-2688080a6ef7.png'),
};

init();
animate();