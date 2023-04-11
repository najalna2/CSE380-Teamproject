
import Scene from "../../Wolfie2D/Scene/Scene";

export default class default_scene extends Scene {

    loadScene(): void {
        this.load.image("logo", "assets/images/logo.png");
        this.load.image("background", "assets/images/background.png")
    }

}