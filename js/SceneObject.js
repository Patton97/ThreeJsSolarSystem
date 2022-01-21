class SceneObject extends THREE.Mesh
{
  constructor(name, geometry, material, parent, position = new THREE.Vector3, rotation = new THREE.Vector3)
  {
    geometry = geometry ?? SceneObject.createDefaultGeometry();
    material = material ?? SceneObject.createDefaultMaterial();

    super(geometry, material);
    
    this.name = name;

    this.setPosition(position)
    this.setRotation(rotation)

    parent?.add(this);  
  }

  setPosition(position)
  {
    this.position.set(position.x, position.y, position.z);
  }

  setRotation(rotation)
  {
    this.rotation.set(rotation.x, rotation.y, rotation.z);
  }

  animate(animSpeed)
  {
    
  }

  static createDefaultGeometry()
  {
    return new THREE.BoxGeometry(1, 1, 1);
  }

  static createDefaultMaterial()
  {
    return new THREE.MeshPhongMaterial({color: 0xFF69B4});
  }
}

export default SceneObject;