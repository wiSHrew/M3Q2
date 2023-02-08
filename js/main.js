import * as THREE from './three.module.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let stars, starGeo;
let textMesh = new THREE.Mesh();
lighting();
name();
particles();

function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("./assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xffb6c1,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

function animateParticles() {
    starGeo.verticesNeedUpdate = true;
    stars.position.y -= 2;
    
    if(stars.position.y < -180){
      stars.position.y = 180;
    }
  };

function name(){
  let text = "Jugaire";
  const texture = new THREE.TextureLoader().load("./assets/textures/wooden.jpg");
  const textLoader = new FontLoader();
  textLoader.load("./assets/fonts/Roboto Medium_Regular.json",function(font){
    const tGeometry = new TextGeometry(text,{
      font: font,
      size: 2,
      height: 2
    });
    const tMaterial = new THREE.MeshPhongMaterial({map: texture});
    
    textMesh = new THREE.Mesh(tGeometry, tMaterial);
    tGeometry.center();
    scene.add(textMesh);
    camera.position.z = 15;
    
  });
};
function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);
  animateParticles();
  textMesh.rotation.x += 0.009;
  textMesh.rotation.y += 0.009;
  
  renderer.render(scene, camera);
}

animate();
