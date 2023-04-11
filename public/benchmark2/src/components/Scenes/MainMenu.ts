import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Level1 from "./Level1";
import Label from "../../Wolfie2D/Nodes/UIElements/Label"
import UIElement from "../../Wolfie2D/Nodes/UIElement";


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
        this.addLayer("secondary");
        this.background = this.add.sprite("background", "secondary");
        this.logo = this.add.sprite("logo", "primary");
        
        let center = this.viewport.getCenter();
        this.background.position.set(center.x, center.y);
        this.logo.position.set(center.x, 300);

        //add menus
        this.addUILayer(MenuLayers.MAIN);
        this.addUILayer(MenuLayers.LEVELS);
        this.addUILayer(MenuLayers.CONTROLS);
        this.addUILayer(MenuLayers.HELP);
        
        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        // Create a play button
        let playBtn = <Button>this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(size.x, size.y - 200), text: "Play Game"});
        playBtn.backgroundColor = Color.GREEN;
        playBtn.borderColor = Color.WHITE;
        playBtn.textColor = Color.BLACK;
        playBtn.borderRadius = 0;
        playBtn.setPadding(new Vec2(50, 10));
        playBtn.font = "PixelSimple";
        playBtn.size = new Vec2(200,50);

        // Levels button
        let lvBtn =  <Button>this.add.uiElement(UIElementType.BUTTON, MenuLayers.LEVELS, {position: new Vec2(size.x, size.y - 100), text: "LEVEL"});
        lvBtn.backgroundColor = Color.GREEN;
        lvBtn.borderColor = Color.WHITE;
        lvBtn.textColor = Color.BLACK;
        lvBtn.borderRadius = 0;
        lvBtn.setPadding(new Vec2(50, 10));
        lvBtn.font = "PixelSimple";
        lvBtn.size = new Vec2(200,50);
        
        //Controls button
        let conBtn =  <Button>this.add.uiElement(UIElementType.BUTTON, MenuLayers.CONTROLS, {position: new Vec2(size.x, size.y), text: "CONTROLS"});
        conBtn.backgroundColor = Color.GREEN;
        conBtn.borderColor = Color.WHITE;
        conBtn.textColor = Color.BLACK;
        conBtn.borderRadius = 0;
        conBtn.setPadding(new Vec2(50, 10));
        conBtn.font = "PixelSimple";
        conBtn.size = new Vec2(200,50);

        //HelP button
        let helpBtn =  <Button>this.add.uiElement(UIElementType.BUTTON, MenuLayers.HELP, {position: new Vec2(size.x, size.y + 100), text: "HELP"});
        helpBtn.backgroundColor = Color.GREEN;
        helpBtn.borderColor = Color.WHITE;
        helpBtn.textColor = Color.BLACK;
        helpBtn.borderRadius = 0;
        helpBtn.setPadding(new Vec2(50, 10));
        helpBtn.font = "PixelSimple";
        helpBtn.size = new Vec2(200,50);

    
        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            this.sceneManager.changeToScene(Level1);
        }


        lvBtn.onClick = () => {
            Label;
        }

    }
}

