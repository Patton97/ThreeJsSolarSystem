const TEXTURE_LOADER = new THREE.TextureLoader();

const LOAD_TEXTURE = (texturePath) => TEXTURE_LOADER.load(texturePath);

const CREATE_MATERIAL = (texturePath) => new THREE.MeshBasicMaterial( { map: LOAD_TEXTURE(texturePath), side: THREE.BackSide } );

const SKY_BOX_FACE_NAMES = 
[
  "front",
  "back",
  "top",
  "bottom",
  "right",
  "left",
];

class SkyBox extends THREE.Mesh
{
  constructor(scene, directory, size)
  {
    let geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    let materials = [];

    for(const SKY_BOX_FACE_NAME in SKY_BOX_FACE_NAMES)
    {
      let texturePath = `${directory}/${SKY_BOX_FACE_NAME}.png`;
      let material = CREATE_MATERIAL(texturePath);
      materials.push(material);
    }

    super(geometry, materials);
    scene.add(this);
  }
}

class SkySphere extends THREE.Mesh
{
  constructor(scene, texturePath)
  {
    let geometry = new THREE.SphereGeometry(1000, 25, 25);
    let material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texturePath), side: THREE.BackSide })

    super(geometry, material);
    scene.add(this);
  }
}

export { SkyBox, SkySphere };