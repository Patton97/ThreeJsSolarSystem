import Sol from "./space/sol.js";
import Mars from "./space/planets/mars.js";
import Earth from "./space/planets/earth.js";
import { SkyBox, SkySphere } from "./skybox.js";
import RootedOrbitCamera from "./RootedOrbitCamera.js";
import SceneManager from "./SceneManager.js";
import { OrbitControls } from "./OrbitControls.js";

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let camera = new RootedOrbitCamera(renderer.domElement, 75, window.innerWidth / window.innerHeight, 0.1, 1000000000 );

let controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;

const sceneManager = new SceneManager(camera, 0.0001);

let sol = new Sol(sceneManager.scene);
let earth = new Earth(sol);
let mars = new Mars(sol);
let skySphere = new SkySphere(sceneManager.scene, "assets/skybox/skybox.png");

sceneManager.addObjects([sol, earth, mars]);

sceneManager.camera.setCameraRoot(mars.dormantRoot);
sceneManager.camera.position.set(-50, 0, 0);

function animate() 
{
  requestAnimationFrame( animate );
  sceneManager.animate();
  renderer.render( sceneManager.scene, sceneManager.camera );

  controls.update();
}
animate();