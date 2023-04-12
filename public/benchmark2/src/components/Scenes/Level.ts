import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Scene from "../../Wolfie2D/Scene/Scene";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import PlayerController, { PlayerTweens } from "../Player/PlayerController";
//import PlayerWeapon from "../Player/PlayerWeapon";

import { UserEvents } from "../UserEvents";
import { HWPhysicsGroups } from "../HWPhysicsGroups";
import HWFactoryManager from "../Factory/HWFactoryManager";
import MainMenu from "./MainMenu";
import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";

/**
 * A const object for the layer names
 */
export const HWLayers = {
    // The primary layer
    PRIMARY: "PRIMARY",
    // The UI layer
    UI: "UI"
} as const;


export type HWLayer = typeof HWLayers[keyof typeof HWLayers]

export default abstract class Level extends Scene {
    public add: HWFactoryManager;
  
    protected playerSpriteKey: string;
    protected player: AnimatedSprite;
    protected playerSpawn: Vec2;

/* 

    private healthLabel: Label;
    private healthBar: Label;
    private healthBarBg: Label;

    protected levelEndPosition: Vec2;
    protected levelEndHalfSize: Vec2;

    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => Scene;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;

    // Level end transition timer and graphic
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;

    protected levelMusicKey: string;
    protected jumpAudioKey: string;
 */
    
    protected tilemapKey: string;
    protected wallsLayerKey: string;
    /** The scale for the tilemap */
    protected tilemapScale: Vec2;
    /** The wall layer of the tilemap */
    protected walls: OrthogonalTilemap;

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, {...options, physics: {
            groupNames: [
                HWPhysicsGroups.GROUND, 
                HWPhysicsGroups.PLAYER
            ],
            collisions:
            [
                [0, 1, 1, 0],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [0, 1, 1, 0],
            ]
        }});
        this.add = new HWFactoryManager(this, this.tilemaps);
    }


    public startScene(): void {
        // Initialize the tilemaps
        this.initializeTilemap();
    }


    protected initializeTilemap(): void {
        if (this.tilemapKey === undefined || this.tilemapScale === undefined) {
            throw new Error("Cannot add the tilemap unless the tilemap key and scale are set.");
        }
        // Add the tilemap to the scene
        this.add.tilemap(this.tilemapKey, this.tilemapScale);

        // Get the wall and destructible layers 
        this.walls = this.getTilemap(this.wallsLayerKey) as OrthogonalTilemap;
    }
    
    protected initializePlayer(key: string): void {
        if (this.playerSpawn === undefined) {
            throw new Error("Player spawn must be set before initializing the player!");
        }

        // Add the player to the scene
        this.player = this.add.animatedSprite(key, HWLayers.PRIMARY);
        this.player.scale.set(1, 1);
        this.player.position.copy(this.playerSpawn);
        
        // Give the player physics and setup collision groups and triggers for the player
        this.player.addPhysics(new AABB(this.player.position.clone(), this.player.boundary.getHalfSize().clone()));
        this.player.setGroup(HWPhysicsGroups.PLAYER);
    }

    protected initializeViewport(): void {
        if (this.player === undefined) {
            throw new Error("Player must be initialized before setting the viewport to folow the player");
        }
        this.viewport.follow(this.player);
        this.viewport.setZoomLevel(5);
        this.viewport.setBounds(0, 0, 512, 512);
    }


}