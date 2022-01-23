import FolderBasedMaterialLoader from "../../FolderBasedMaterialLoader.js";
import OrbitalObject from "../OrbitalObject.js";

const EARTH_NAME = "Earth";
const EARTH_COLOUR_HEX = 0x0000ff;
const DISTANCE = new THREE.Vector3(149.6, 0, 0); // Earth's actual distance from Sol is 149.6 million KM
const EARTH_ORBIT_SPEED_KM_SEC = 29.87;
const SPIN_SPEED = 46.51; // Earth's actual spin speed is 0.4651km/s (EQ rotation velocity)
const EQ_RADIUS = 6.378137; // Earth's actual EQ radius is 6378.137km

class Earth extends OrbitalObject
{
  constructor(parent)
  {
    let geometry = Earth.makeGeometry();
    let material = Earth.makeMaterial();

    super(
      EARTH_NAME, 
      EARTH_COLOUR_HEX,
      geometry,
      material,
      parent,
      DISTANCE, 
      SPIN_SPEED, 
      EARTH_ORBIT_SPEED_KM_SEC
    );
  }

  static makeGeometry()
  {
    return new THREE.SphereGeometry(EQ_RADIUS, 1000, 1000);
  }

  static makeMaterial()
  {
    let mat = new THREE.MeshPhongMaterial();
    
    FolderBasedMaterialLoader.loadMaterialFromFolder(mat, "./assets/planets/earth");

    mat.displacementScale = 0.25;

    return mat;
  }
}

export default Earth;