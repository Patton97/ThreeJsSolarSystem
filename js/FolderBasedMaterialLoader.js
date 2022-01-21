const EXTENSION = `.png`;

// key = material parameter name, as defined by THREE itself
// value = expected filename within provided folder
const MAP_NAMES = 
{
  map  : `diffuse`,
  normalMap: `normal`,
  bumpMap     : `bump`,
  specularMap : `specular`,
  displacementMap : `displacement`
};

const checkResourceExists = (url, onReadyStateDone) => 
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url);
    http.onreadystatechange = function()
    {
        if (this.readyState == this.DONE) 
        {
          onReadyStateDone(this.status != 404);
        }
    };
    http.send();
}


class FolderBasedMaterialLoader
{
  static loadTextureFromPath(path, onLoad, onComplete)
  {
    if (onLoad === undefined || onload === null)
    {
      onLoad = () => {}; // Avoids 'Uncaught TypeError: onLoad is not a function'
    }

    let texture;
    let loadTexture = (success) => 
    {
      let onError = () => console.log(`Texture could not be loaded from ${path}`);

      if(success)
      {
        texture = new THREE.TextureLoader().load(path, onLoad, null, onError);
      }

      onComplete(texture);
    }
    checkResourceExists(path, loadTexture);
  }

  static loadMaterialParametersFromFolder(folderPath, onMaterialParameterLoaded)
  {
    for (const [mapTypeName, mapFileName] of Object.entries(MAP_NAMES)) 
    {
      let relativeUrl = `${folderPath}/${mapFileName}${EXTENSION}`;
      let mapUrl = new URL(relativeUrl, location).href;

      let onComplete = (texture) =>
      {
        onMaterialParameterLoaded(mapTypeName, texture);
      }

      this.loadTextureFromPath(mapUrl, null, onComplete);
    }
  }

  static loadMaterialFromFolder(mat, folderPath)
  {    
    let onMaterialParameterLoaded = (paramName, paramValue) =>
    {
      let param = {};
      param[paramName] = paramValue;
      mat.setValues(param);
      mat.needsUpdate = true;
    };

    FolderBasedMaterialLoader.loadMaterialParametersFromFolder(folderPath, onMaterialParameterLoaded);
    
    return mat;
  }
}

export default FolderBasedMaterialLoader;