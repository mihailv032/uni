import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const width = window.innerWidth/2
const height =window.innerHeight
const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(45,  width / height, 0.1, 1000),
      renderer = new THREE.WebGLRenderer({ antialias: true });


renderer.setClearColor(0xffffff, 1.0);
renderer.setSize(width , height);
document.getElementById("scene").append(renderer.domElement);


camera.position.set(-20, 20, 30);
camera.lookAt(scene.position);
THREE.Object3D.DEFAULT_MATRIX_AUTO_UPDATE

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false;


/* CUBE */

const geometry = new RoundedBoxGeometry( 10, 10, 10, 6, 2 );
const material = new THREE.MeshPhongMaterial();
const cube = new THREE.Mesh(geometry,material)
scene.add(cube)

/*
   Lights
 */
const pointlight = new THREE.PointLight(0xffffff,1000);
pointlight.position.set(10,10,10)
scene.add(pointlight);

scene.add(new THREE.PointLightHelper(pointlight))



function render() {
  renderer.render(scene, camera);
  cube.rotation.x += 0.01
  cube.rotation.z += -0.01
  requestAnimationFrame(render);
}

render()
