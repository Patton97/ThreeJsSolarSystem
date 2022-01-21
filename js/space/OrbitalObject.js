import SceneObject from "../SceneObject.js";

class OrbitalObject extends SceneObject 
{
  constructor(name, colour, geometry, material, parent, distance, spinSpeed, orbitSpeed)
  {
    // the orbital object should always be parented by a spinning root
    // the spinning root is parented by a dormant root
    // the dormat root is parented by an orbit root
    // the orbit root is parented by whatever the calling code passed in
    // this enables other objects to be attached to an orbital object, 
    // without necessarily abiding by its spin speed
    let orbitRoot = new SceneObject(`${name}'s Orbit Root`, null, null, parent)
    let dormantRoot = new SceneObject(`${name}'s Dormant Root`, null, null, orbitRoot, distance);
    let spinningRoot = new SceneObject(`${name}'s Spinning Root`, null, null, dormantRoot);

    super(name, geometry, material);

    spinningRoot.add(this);
    this.orbitRoot = orbitRoot;
    this.dormantRoot = dormantRoot;
    this.spinningRoot = spinningRoot;
    
    this.name = name;
    this.colour = colour;
    
    this.spinSpeed = spinSpeed;
    this.orbitSpeed = orbitSpeed;

    this.initOrbitPath(distance);   
  }

  initOrbitPath(distance)
  {
    let orbitPathGeometry = new THREE.TorusGeometry(distance.x, 0.1, 30, 200);
    let orbitPathMaterial = new THREE.MeshPhongMaterial({color: this.colour});
    this.orbitPath = new THREE.Mesh(orbitPathGeometry, orbitPathMaterial);
    this.orbitPath.rotation.x += Math.PI / 2;
    this.orbitRoot.add(this.orbitPath);
  }

  animate(animSpeed)
  {
    this.orbitRoot.rotation.y += animSpeed * this.orbitSpeed;
    this.rotation.y += animSpeed * this.spinSpeed;
  }
}

export default OrbitalObject;