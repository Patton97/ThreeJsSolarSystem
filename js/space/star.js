import OrbitalObject from "./OrbitalObject.js";

const COLOUR_HEX = 0xffff00;
const EQ_RADIUS = 20; // based on literally zero science because real sun is fucking huge

// TODO: abstract "star" from "sun"
class Star extends OrbitalObject
{
  constructor(name, colour, parent)
  {
    let distance = new THREE.Vector3(0, 0, 0);
    let spinSpeed = 0;
    let orbitSpeed = 0;

    let geometry = Star.makeSunGeometry();
    let material = Star.makeSunMaterial();

    super(name, colour, geometry, material, parent, distance, spinSpeed, orbitSpeed);

    this.initLight();
  }

  initLight()
  {
    this.light = new THREE.PointLight( 0xffffff, 1, 100000 );
    this.add(this.light);
  }

  static makeSunGeometry()
  {
    return new THREE.SphereGeometry(EQ_RADIUS, 20, 20, 20);
  }

  static makeSunMaterial()
  {
    let colour = COLOUR_HEX;
    let material = new THREE.MeshStandardMaterial({ color: colour });
    material.emissive.setHex(colour);
    return material;
  }
}

export default Star;