class RootedOrbitCamera extends THREE.PerspectiveCamera
{
  constructor(domElement, fov, aspect, near, far)
  {
    super(fov, aspect, near, far);

    this.cameraRoot = new THREE.Mesh();
    this.cameraRoot.add(this);
  }

  setCameraRoot(object)
  {
    object.add(this.cameraRoot);
  }

  animate(animationSpeed)
  {
    this.lookAt(this.cameraRoot.getWorldPosition(new THREE.Vector3));
  }
}

export default RootedOrbitCamera;