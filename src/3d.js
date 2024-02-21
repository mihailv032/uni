import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import {FlakesTexture} from 'three/addons/textures/FlakesTexture.js';

const width = window.innerWidth > 930 ? window.innerWidth/2 : window.innerWidth;
const height =window.innerHeight
const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(45,  width / height, 0.1, 1000),
      renderer = new THREE.WebGLRenderer({ antialias: true });


renderer.setClearColor(0xffffff, 1.0);
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width , height);
document.getElementById("scene").append(renderer.domElement);

camera.position.set(-20, 20, 30);
camera.lookAt(scene.position);
THREE.Object3D.DEFAULT_MATRIX_AUTO_UPDATE

/* CONTROLS */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false;


/* CUBE */

const texture = new THREE.CanvasTexture(new FlakesTexture())
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping
texture.repeat.x = 10;
texture.repeat.y = 6;

const cubeMaterial = {
  clearcoat: 1.0,
  clearRoughness: 0.1,
  metalness: 0.9,
  roughness: 0.5,
  color: 0x111111,
  normalMap: texture,
  normalScale: new THREE.Vector2(0.15,0.15)
}

const geometry = new RoundedBoxGeometry( 10, 10, 10, 6, 2 );
const material = new THREE.MeshPhongMaterial(cubeMaterial);
const cube = new THREE.Mesh(geometry,material)
scene.add(cube)

/*
   Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff);
const pointlight = new THREE.PointLight(0xffffff,10000);
pointlight.position.set(-15,-15,30)
scene.add(pointlight,ambientLight);

//const helper = new THREE.PointLightHelper(pointlight)
//scene.add(helper)



function render() {
  renderer.render(scene, camera);
  cube.rotation.x += 0.01
  cube.rotation.z += -0.01
  requestAnimationFrame(render);
}

render()

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
  const width = window.innerWidth > 930 ? window.innerWidth/2 : window.innerWidth;
  camera.aspect = width / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(width, window.innerHeight );
}
