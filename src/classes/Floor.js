import 'phaser';

export default class Floor {
    /**
     * Constructor for the Floor class.
     * @param {Phaser.Scene} scene - The current scene.
     * @param {number} floorNumber - The number of this floor.
     * @param {number} colorOffset - The offset for the floor color to differentiate it.
     */
    constructor(scene, floorNumber, colorOffset) {
        this.scene = scene;
        this.floorNumber = floorNumber;

        // Calculate color based on offset
        let color = 0xFFFFFF - colorOffset * floorNumber;

        // Create a rectangle for the floor
        this.graphics = scene.add.rectangle(
            scene.sys.canvas.width / 2, 
            60 * floorNumber, 
            scene.sys.canvas.width, 
            60, 
            color
        );
        this.graphics.setInteractive();
        this.graphics.on("pointerdown", () => {
            // Set the elevator destination in the game manager
            this.scene.gameManager.setElevatorDestination(this);
        });

        // Write the floor number on it
        this.text = scene.add.text(
            this.graphics.x, 
            this.graphics.y, 
            floorNumber.toString(),
            {
                font: "16px Arial",
                fill: "#000000"
            }
        );
        this.text.setOrigin(0.5, 0.5);
    }

    /**
     * Placeholder for future update logic.
     */
    update() {
        // Future update logic can go here
    }
}
