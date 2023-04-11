import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./components/Scenes/MainMenu";
import { UserControls } from "./components/UserControls";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main(){

    // Set up options for our game
    let options = {
        canvasSize: {x: 800, y: 640},          // The size of the game
        clearColor: {r: 34, g: 32, b: 52},   // The color the game clears to
        inputs: [
            {name: UserControls.MOVE_LEFT, keys: ["a"]},
            {name: UserControls.MOVE_RIGHT, keys: ["d"]},
            {name: UserControls.JUMP, keys: ["w", "space"]},
            {name: UserControls.ATTACK, keys: ["j"]}
        ],
        useWebGL: false,                        // Tell the game we want to use webgl
        showDebug: false                       // Whether to show debug messages. You can change this to true if you want
    }

    // Create a game with the options specified
    const game = new Game(options);

    // Start our game
    game.start(MainMenu, {});
})();