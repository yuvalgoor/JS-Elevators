/**
 * @typedef {import('phaser').Scene} Scene
 */

export default class Person {
    /**
     * @param {Scene} scene
     * @param {number} id
     * @param {number} currentFloor
     * @param {number} desiredFloor
     */

    constructor(scene, id, currentFloor, desiredFloor) {
        this.scene = scene;

        this.id = id;
        this.currentFloor = currentFloor;
        this.desiredFloor = desiredFloor;
        this.elevator = null;

        this.graphics = scene.add.rectangle(this.getFloorPositionX(), 60 * currentFloor, 20, 20, 0x66ccff);
        
        // Write the desired floor on the person
        this.text = scene.add.text(
            this.graphics.x,
            this.graphics.y,
            desiredFloor.toString()
        );
        this.text.setOrigin(0.5, 1);
        this.text.setAlign("center");
        this.text.setPadding(10, 10, 10, 10);
        this.text.setColor("#000000");
        this.text.setFontSize(20);

    }

    update() {
        // If in elevator, move with the elevator, include the text
        if (this.elevator !== null) {
            this.graphics.y = this.elevator.graphics.y;
            this.text.y = this.graphics.y;
        }
    }

    enterElevator(elevator, slot) {
        // Enter the elevator
        this.elevator = elevator;

        // Fade out the person + text while moving them to the elevator
        this.scene.tweens.add({
            targets: [this.graphics, this.text],
            x: (slot.id * 20) + this.elevator.graphics.x - 60,
            y: elevator.graphics.y,
            duration: 300,
            ease: Phaser.Math.Easing.Quadratic.InOut
            // onComplete: () => {
            //     this.graphics.y = elevator.graphics.y;
            //     this.text.y = this.graphics.y;
            // },
        });
    }

    getFloorPositionX() {
        // Calculate the X position of  the person on the floor
        // based on the number of people on the floor

        let peopleOnFloor = this.scene.people.filter(
            (person) => person.currentFloor === this.currentFloor
        );
        const floorX = 20 + 23 * (peopleOnFloor.length);
        return floorX;
        }


    arrived() {
        // Remove the elevator from person
        this.elevator = null;

        // Fade out the person + text while moving them to the left
        this.scene.tweens.add({
            targets: [this.graphics, this.text],
            alpha: 0,
            x: this.graphics.x+50,
            duration: 500,
            ease: Phaser.Math.Easing.Quadratic.In,
            onComplete: () => {
                this.destroy();
            },

        });
    }

    destroy() {
        // Remove the person from the scene
        this.graphics.destroy();
        this.text.destroy();
        this.scene.people = this.scene.people.filter(
            (person) => person !== this
        );
    }
}
