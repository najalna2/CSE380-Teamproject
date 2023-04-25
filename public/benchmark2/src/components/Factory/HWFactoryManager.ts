import Graphic from "../../Wolfie2D/Nodes/Graphic";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Tilemap from "../../Wolfie2D/Nodes/Tilemap";
import UIElement from "../../Wolfie2D/Nodes/UIElement";
import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager";
import HWAnimatedSprite from "../Nodes/HWAnimatedSprite";
import HWLevel, { HWLayer } from "../Scenes/Level";
import CNF from "./HWCanvasNodeFactory";

/**
 * An extension of Wolfie2ds FactoryManager. I'm creating a more specific factory for my custom HW3Level. If you want to get custom
 * GameNodes into your scenes (with more specific properties) you'll have to extend the factory classes.
 */
export default class HWFactoryManager extends FactoryManager {

    private hwCanvasNodeFactory: CNF;

    public constructor(scene: HWLevel, tilemaps: Tilemap[]) {
        super(scene, tilemaps)
        this.hwCanvasNodeFactory = new CNF();
        this.hwCanvasNodeFactory.init(scene);
    }

    public animatedSprite(key: string, layerName: HWLayer): HWAnimatedSprite {
        return this.hwCanvasNodeFactory.addAnimatedSprite(key, layerName);
    }

    public uiElement(type: string, layerName: HWLayer, options?: Record<string, any>): UIElement {
        return super.uiElement(type, layerName, options);
    }

    public graphic(type: string, layerName: HWLayer, options?: Record<string, any>): Graphic {
        return super.graphic(type, layerName, options);
    }

    public sprite(key: string, layerName: HWLayer): Sprite {
        return super.sprite(key, layerName);
    }
}