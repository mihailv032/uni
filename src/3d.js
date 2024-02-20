import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let mesh;
let renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#header")});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene,camera)
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
//const torus = new THREE.Mesh(geometry,material)

//scene.add(torus)


animate()
init()
function init() {
  
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 );
  camera.position.z = 2.5;
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x111111 );
  
    
    setupControls( texture.animation );
    
  texture = new THREE.TextureLoader().load( 'textures/uv_grid_directx.jpg' );
    // texture.colorSpace = THREE.SRGBColorSpace;
    
    const geometry = new RoundedBoxGeometry( 1, 1, 1, 7, 0.2 );
    const material = new THREE.MeshStandardMaterial( { roughness: 0.1, map: texture } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    
  
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  const environment = new RoomEnvironment( renderer );
  const pmremGenerator = new THREE.PMREMGenerator( renderer );
  
  scene.environment = pmremGenerator.fromScene( environment ).texture;
  
  window.addEventListener( 'resize', onWindowResize );
  
}

function setupControls( animation ) {
  
  // Lottie animation API
  // https://airbnb.io/lottie/#/web
  
  // There are a few undocumented properties:
  // console.log( animation );
  
  const scrubber = document.getElementById( 'scrubber' );
  scrubber.max = animation.totalFrames;
  
  scrubber.addEventListener( 'pointerdown', function () {
    
    animation.pause();
    
  } );
  
  scrubber.addEventListener( 'pointerup', function () {
    
    animation.play();
    
  } );
  
  scrubber.addEventListener( 'input', function () {
    
    animation.goToAndStop( parseFloat( scrubber.value ), true );
    
  } );
  
  animation.addEventListener( 'enterFrame', function () {
    
    scrubber.value = animation.currentFrame;
    
  } );
  
}

function onWindowResize() {
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  
}

//

function animate() {
  
  requestAnimationFrame( animate );
  
  if ( mesh ) {
    mesh.rotation.y -= 0.001;
  }
  
  renderer.render( scene, camera );
  
}
