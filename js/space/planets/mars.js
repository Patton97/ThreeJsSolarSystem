import FolderBasedMaterialLoader from "../../FolderBasedMaterialLoader.js";
import OrbitalObject from "../OrbitalObject.js";

const MARS_NAME = "Mars";
const MARS_COLOUR_HEX = 0xff0000;
const MARS_DISTANCE_MILLION_KM = new THREE.Vector3(227.9, 0, 0);
const MARS_ORBIT_SPEED_KM_SEC = 24.007;
const SPIN_SPEED = 24.117; // Mars' actual spin speed is 0.24117km/sec (EQ rotation velocity)
const EQ_RADIUS = 3.3962; // Mars' actual EQ radius is 3396.2km

class MARS extends OrbitalObject
{
  constructor(parent)
  {
    let geometry = MARS.makeGeometry();
    let material = MARS.makeMaterial();

    super(
      MARS_NAME, 
      MARS_COLOUR_HEX,
      geometry,
      material, 
      parent, 
      MARS_DISTANCE_MILLION_KM,
      SPIN_SPEED,
      MARS_ORBIT_SPEED_KM_SEC,
    );
  }

  static makeGeometry()
  {
    return new THREE.SphereGeometry(EQ_RADIUS, 1000, 1000);
  }

  static makeMaterial()
  {
    let mat = new THREE.MeshPhongMaterial();
    
    FolderBasedMaterialLoader.loadMaterialFromFolder(mat, "./assets/planets/mars");

    mat.displacementScale = 0.25;

    return mat;
  }
}

export default MARS;