class SceneManager
{
  constructor(camera, animationSpeed)
  {
    this.scene = new THREE.Scene();
    this.objects = [];

    this.setAnimationSpeed(animationSpeed);
    this.setCamera(camera)
  }

  setAnimationSpeed(animationSpeed)
  {
    this.animationSpeed = animationSpeed;
  }

  setCamera(camera)
  {
    this.camera = camera;
  }

  addObject(objectToAdd)
  {
    this.objects.push(objectToAdd);
  }

  addObjects(objectsToAdd)
  {
    objectsToAdd.forEach(objectToAdd => this.addObject(objectToAdd));
  }

  animate()
  {
    this.objects.forEach(object => object.animate(this.animationSpeed));
    this.camera.animate(this.animationSpeed);
  }
}

export default SceneManager;