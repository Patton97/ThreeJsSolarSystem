import { OrbitControls } from "./OrbitControls.js";
import Star from "./space/star.js";
import Mars from "./space/planets/mars.js";
import Earth from "./space/planets/earth.js";
import { SkyBox, SkySphere } from "./skybox.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000000 );
camera.position.set(-50, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ANIM_SPEED = 0.0001;

var sun = new Star("Sun", 0xffff00, scene, 20);
var earth = new Earth(sun);
var mars = new Mars(scene);

let cameraRoot = new THREE.Mesh();
cameraRoot.add(camera);
mars.dormantRoot.add(cameraRoot);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.update();

const skySphere = new SkySphere(scene, "assets/skybox/skybox.png");
let cameraRootIndex = 0;
let onDocumentKeyDown = (event) => 
{
  // this is dumb but it works for now
  if (event.which == 32) // space
  {
    if (cameraRootIndex == 0) // earth
    {
      mars.dormantRoot.add(cameraRoot);
      cameraRootIndex = 1; // mars
    }
    else // mars
    {
      earth.dormantRoot.add(cameraRoot);
      cameraRootIndex = 0; // earth
    }
  }
}

document.addEventListener("keydown", onDocumentKeyDown, false);

function animate() 
{
  requestAnimationFrame( animate );

  sun.animate(ANIM_SPEED);
  earth.animate(ANIM_SPEED);
  mars.animate(ANIM_SPEED);

  camera.lookAt(cameraRoot.getWorldPosition(new THREE.Vector3));

  renderer.render( scene, camera );
  controls.update();
}
animate();