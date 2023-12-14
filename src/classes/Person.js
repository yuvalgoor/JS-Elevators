
export default class Person {
    constructor(scene, currentFloor, desiredFloor) {
        this.scene = scene;
        this.currentFloor = currentFloor;
        this.desiredFloor = desiredFloor;
        this.graphics = scene.add.rectangle(100 * currentFloor + 60, 60 * currentFloor + 25, 20, 20, 0x808080);
        // Additional person-specific logic here
    }

    update() {
        // Update logic for person's behavior
    }
}
