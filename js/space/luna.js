import OrbitalObject from "./OrbitalObject.js";
import FolderBasedMaterialLoader from "../FolderBasedMaterialLoader.js";

const NAME = "Luna";
const COLOUR_HEX = 0xc2c5cc;
const DISTANCE = new THREE.Vector3(19.2, 0, 0); // Luna's actual distance from Earth is 384,000 km
const SPIN_SPEED = 0;
const ORBIT_SPEED = 1.022; // 1.022 km/s
const EQ_RADIUS = 1.7381; // 1738.1 km

class Luna extends OrbitalObject
{
  constructor(parent)
  {
    let geometry = Luna.makeGeometry();
    let material = Luna.makeMaterial();

    super(
      NAME, 
      COLOUR_HEX,
      geometry,
      material,
      parent,
      DISTANCE, 
      SPIN_SPEED, 
      ORBIT_SPEED
    );
  }

  animate(animSpeed)
  {
    // find a nice way to call base
    this.orbitRoot.rotation.y += animSpeed * this.orbitSpeed;
    this.rotation.y += animSpeed * this.spinSpeed;

    this.spinningRoot.lookAt(this.orbitRoot.getWorldPosition(new THREE.Vector3));
  }

  static makeGeometry()
  {
    return new THREE.SphereGeometry(EQ_RADIUS, 1000, 1000);
  }

  static makeMaterial()
  {
    let mat = new THREE.MeshPhongMaterial();
    
    FolderBasedMaterialLoader.loadMaterialFromFolder(mat, "./assets/planets/earth/luna");

    mat.displacementScale = 0.01;

    return mat;
  }
}

export default Luna;