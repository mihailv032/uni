import * as THREE from 'three'

const element = document.getElementById("scene");
const dimensions = 3;
const background = 0xffffff;
//const element =
const width = window.innerWidth,
    height = window.innerHeight;

const debug = true;

  /*** three.js boilerplate ***/
const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000),
      renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setClearColor(background, 1.0);
renderer.setSize(width, height);
element.append(renderer.domElement);

camera.position.set(-20, 20, 30);
camera.lookAt(scene.position);
THREE.Object3D.DEFAULT_MATRIX_AUTO_UPDATE

/*
   Lights
 */
const pointlight = new THREE.PointLight(0xffffff,1000);
pointlight.position.set(-20,10,20)
scene.add(pointlight);


/*** Debug aids ***/  
if(debug) {
  scene.add(new THREE.PointLightHelper(pointlight))
  scene.add(new THREE.GridHelper( 20 ));
}

//mouse 
const SCREEN_HEIGHT = window.innerHeight;
const SCREEN_WIDTH = window.innerWidth/2;

const raycaster = new THREE.Raycaster(),
      mouse = new THREE.Vector2();

function isMouseOverCube(mouseX, mouseY) {
  var directionVector = new THREE.Vector3();
  
  //Normalise mouse x and y
  var x = ( mouseX / SCREEN_WIDTH ) * 2 - 1;
  var y = -( mouseY / SCREEN_HEIGHT ) * 2 + 1;
  
  directionVector.set(x, y, 1);
  
//  projector.unprojectVector(directionVector, camera);
  mouse.x = directionVector
  mouse.y = camera
  directionVector.sub(camera.position);
  directionVector.normalize();

  raycaster.set(camera.position, directionVector);
  
  return raycaster.intersectObjects(allCubes, true).length > 0;
}

  //Return the axis which has the greatest maginitude for the vector v
  function principalComponent(v) {
    var maxAxis = 'x',
        max = Math.abs(v.x);
    if(Math.abs(v.y) > max) {
      maxAxis = 'y';
      max = Math.abs(v.y);
    }
    if(Math.abs(v.z) > max) {
      maxAxis = 'z';
      max = Math.abs(v.z);
    }
    return maxAxis;
  }



  let clickVector, clickFace;
  let lastCube;

  var onCubeMouseDown = function(e, cube) {
    disableCameraControl();

    //Maybe add move check in here
    if(true || !isMoving) {
      clickVector = cube.rubikPosition.clone();
      
      var centroid = e.targetFace.centroid.clone();
      centroid.applyMatrix4(cube.matrixWorld);

      //Which face (of the overall cube) did we click on?
      if(nearlyEqual(Math.abs(centroid.x), maxExtent))
        clickFace = 'x';
      else if(nearlyEqual(Math.abs(centroid.y), maxExtent))
        clickFace = 'y';
      else if(nearlyEqual(Math.abs(centroid.z), maxExtent))
        clickFace = 'z';    
    }  
  };

  //Matrix of the axis that we should rotate for 
  // each face-drag action
  //    F a c e
  // D    X Y Z
  // r  X - Z Y
  // a  Y Z - X
  // g  Z Y X -
  var transitions = {
    'x': {'y': 'z', 'z': 'y'},
    'y': {'x': 'z', 'z': 'x'},
    'z': {'x': 'y', 'y': 'x'}
  }

  const onCubeMouseUp = (e, cube) => {

    if(clickVector) {
      //TODO: use the actual mouse end coordinates for finer drag control
      var dragVector = cube.rubikPosition.clone();
      dragVector.sub(clickVector);

      //Don't move if the "drag" was too small, to allow for 
      // click-and-change-mind.
      if(dragVector.length() > cubeSize) {

        //Rotate with the most significant component of the drag vector
        // (excluding the current axis, because we can't rotate that way)
        var dragVectorOtherAxes = dragVector.clone();
        dragVectorOtherAxes[clickFace] = 0;

        var maxAxis = principalComponent(dragVectorOtherAxes);

        var rotateAxis = transitions[clickFace][maxAxis],
            direction = dragVector[maxAxis] >= 0 ? 1 : -1;
        
        //Reverse direction of some rotations for intuitive control
        //TODO: find a general solution!
        if(clickFace == 'z' && rotateAxis == 'x' || 
           clickFace == 'x' && rotateAxis == 'z' ||
           clickFace == 'y' && rotateAxis == 'z')
          direction *= -1;

        if(clickFace == 'x' && clickVector.x > 0 ||
           clickFace == 'y' && clickVector.y < 0 ||
           clickFace == 'z' && clickVector.z < 0)
          direction *= -1;

        pushMove(cube, clickVector.clone(), rotateAxis, direction);
        startNextMove();
        enableCameraControl();
      } else {
        console.log("Drag me some more please!");
      }
    }
  };

  //If the mouse was released outside of the Rubik's cube, use the cube that the mouse 
  // was last over to determine which move to make
  var onCubeMouseOut = function(e, cube) {
    //TODO: there is a possibility that, at some rotations, we may catch unintentional
    // cubes on the way out. We should check that the selected cube is on the current
    // drag vector.
    lastCube = cube;
  }

element.addEventListener('mouseup', e => {
  if(!isMouseOverCube(e.clientX, e.clientY)) {
    if(lastCube)
      onCubeMouseUp(e, lastCube);
  }
});







/*
   BUILD CUBE
*/
const faceMaterials = new THREE.MeshPhysicalMaterial()
const cubeSize = 3,spacing = 0.2;
const increment = cubeSize + spacing,
      maxExtent = (cubeSize * dimensions + spacing * (dimensions - 1)) / 2, 
      allCubes = [];

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness :1,
  
})

function newCube(x, y, z) {
  const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cube = new THREE.Mesh(cubeGeometry, material);
  cube.castShadow = true;
  
  cube.position.set(x, y, z) 
  cube.rubikPosition = cube.position.clone();
  
  scene.add(cube);
  allCubes.push(cube);
}

  var positionOffset = (dimensions - 1) / 2;
  for(var i = 0; i < dimensions; i ++) {
    for(var j = 0; j < dimensions; j ++) {
      for(var k = 0; k < dimensions; k ++) {

        const x = (i - positionOffset) * increment,
              y = (j - positionOffset) * increment,
              z = (k - positionOffset) * increment;

        newCube(x, y, z);
      }
    }
  }


function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
