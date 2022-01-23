
import RootedOrbitCamera from "./RootedOrbitCamera.js";
import SceneManager from "./SceneManager.js";
import { OrbitControls } from "./OrbitControls.js";
import Stats from "../node_modules/stats.js/src/Stats.js";
import SolarSystem from "./space/SolarSystem.js";

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

let camera = new RootedOrbitCamera(renderer.domElement, 75, window.innerWidth / window.innerHeight, 0.1, 1000000000 );

let controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;

const sceneManager = new SceneManager(camera, 0.0001);

const solarSystem = new SolarSystem(sceneManager.scene);
sceneManager.addObject(solarSystem);

sceneManager.camera.setCameraRoot(solarSystem.earth.dormantRoot);
sceneManager.camera.position.set(-50, 0, 0);

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize()
{
  sceneManager.camera.aspect = window.innerWidth / window.innerHeight;
  sceneManager.camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() 
{
  requestAnimationFrame( animate );
  sceneManager.animate();
  renderer.render( sceneManager.scene, sceneManager.camera );
  stats.update();
  controls.update();
}
animate();