import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Level1 from "./Level1";


// Layers for the main menu scene
export const MenuLayers = {
    MAIN: "MAIN",
    LEVELS: "LEVELS",
    CONTROLS: "CONTROLS",
    HELP: "HELP"
} as const;

export default class MainMenu extends Scene {
    
    private logo: Sprite;
    private background: Sprite;

    loadScene(): void {
        this.load.image("logo", "assets/images/logo.png");
        this.load.image("background", "assets/images/background.png")
    }

    public startScene(): void {
        this.addLayer("primary");
        this.background = this.add.sprite("background", "primary");
        
        let center = this.viewport.getCenter();
//        let Origin = this.viewport.getOrigin();
//        let View = this.viewport.getView();
        this.background.position.set(center.x, center.y);


    
        this.addUILayer(MenuLayers.MAIN);
        
        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        // Create a play button
        let playBtn = <Button>this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(size.x, 300), text: "Play Game"});
        playBtn.backgroundColor = Color.TRANSPARENT;
        playBtn.borderColor = Color.WHITE;
        playBtn.borderRadius = 0;
        playBtn.setPadding(new Vec2(50, 10));
        playBtn.font = "PixelSimple";

        
        
        // Levels button
        let lvBtn =  <Button>this.add.uiElement(UIElementType.BUTTON, MenuLayers.LEVELS, {position: new Vec2(size.x, 400), text: "LEVEL"});
        lvBtn.backgroundColor = Color.GREEN;
        lvBtn.borderColor = Color.WHITE;
        lvBtn.borderRadius = 0;
        lvBtn.setPadding(new Vec2(50, 10));
        lvBtn.font = "PixelSimple";
        
        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            this.sceneManager.changeToScene(Level1);
        }


        lvBtn.onClick = () => {
            this.sceneManager.changeToScene(Level1);
        }

    }
}

