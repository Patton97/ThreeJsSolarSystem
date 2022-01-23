import SceneObject from "../SceneObject.js";
import Sol from "./sol.js";
import Mars from "./planets/mars.js";
import Earth from "./planets/earth.js";
import Luna from "./luna.js";
import {SkySphere} from "../skybox.js";

class SolarSystem extends SceneObject
{
  constructor(scene)
  {
    super("SolarSystem");

    //this.add(scene);
    this.sol = new Sol(scene);
    this.earth = new Earth(this.sol);
    this.luna = new Luna(this.earth);
    this.mars = new Mars(this.sol);

    this.objects = 
    [
      this.sol,
      this.earth,
      this.luna,
      this.mars,
    ];

    this.planets = 
    [
      this.earth,
      this.mars,
    ];

    this.skySphere = new SkySphere(scene, "../../assets/skybox/skybox.png");
  }

  animate(animSpeed)
  {
    this.objects.forEach(object => object.animate(animSpeed));
  }
}

export default SolarSystem;