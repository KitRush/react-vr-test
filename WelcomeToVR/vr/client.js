// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance, Module} from 'react-vr-web';
import { Scene } from 'three';
import * as THREE from 'three';

export default class CubeModule extends Module{  
  constructor() {
    super('CubeModule');
  }
  init(cube) {
    this.cube = cube;
  }
  changeCubeColor(color) {
    this.cube.material.color = new THREE.Color(color);
  }
}

const scene = new Scene();
const cubeModule = new CubeModule();

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'app', parent, {
    cursorVisibility: 'auto',
    nativeModules: [cubeModule],
    scene: scene,
    // Add custom options here
    ...options,
  });

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial(),
  );
  cube.position.z = -4;
  scene.add(cube);
  cubeModule.init(cube);

  vr.render = function(timestamp) {
    const seconds = timestamp / 1000;
    cube.position.x = 0 + (1 * (Math.cos(seconds)));
    cube.position.y = 0.2 + (1 * Math.abs(Math.sin(seconds)));
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
