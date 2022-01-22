import OrbitalObject from "./OrbitalObject.js";

class Star extends OrbitalObject
{
  constructor(name, colour, geometry, material, parent, distance, spinSpeed, orbitSpeed)
  {
    super(name, colour, geometry, material, parent, distance, spinSpeed, orbitSpeed);

    this.initLight();
  }

  initLight()
  {
    this.light = new THREE.PointLight( this.colour, 1, 100000 );
    this.add(this.light);
  }
}

export default Star;