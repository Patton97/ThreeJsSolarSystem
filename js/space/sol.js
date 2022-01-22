import Star from "./star.js";

const NAME = "Sol";
const MATERIAL_COLOUR_HEX = 0xffff00;
const LIGHT_COLOUR_HEX = 0xffffff; // making the light the same yellow as the material just makes every other object look weird
const EQ_RADIUS = 20; // based on literally zero science because real Sol is fucking huge

class Sol extends Star
{
  constructor(parent)
  {
    let geometry = Sol.makeGeometry();
    let material = Sol.makeMaterial();

    let distance = new THREE.Vector3(0, 0, 0);
    let spinSpeed = 0;
    let orbitSpeed = 0;

    super(NAME, LIGHT_COLOUR_HEX, geometry, material, parent, distance, spinSpeed, orbitSpeed);
  }

  static makeGeometry()
  {
    return new THREE.SphereGeometry(EQ_RADIUS, 20, 20, 20);
  }

  static makeMaterial()
  {
    let colour = MATERIAL_COLOUR_HEX;
    let material = new THREE.MeshStandardMaterial({ color: colour });
    material.emissive.setHex(colour);
    return material;
  }
}

export default Sol;