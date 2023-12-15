import "phaser";
import Elevator from "../classes/Elevator";
import Person from "../classes/Person";
import Floor from "../classes/Floor";
import GameManager from "../classes/GameManager";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
    this.gameManager = new GameManager(this);
    
  }

  create() {
    this.elevators = [];
    this.people = [];
    this.floors = [];

    // Define the total number of floors and color offset
    const totalFloors = 10;
    const colorOffset = 0x101010; // Adjust this based on your preference

    // Create floors
    for (let i = 0; i < totalFloors; i++) {
      this.floors.push(new Floor(this, i, colorOffset));
    }

    // Example: Create 3 elevators and spawn people periodically
    for (let i = 0; i < 3; i++) {
      this.elevators.push(new Elevator(this, i, 10)); // 10 floors for example
    }

    // Example: Spawn a person every 2 seconds
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        let currentFloor = Phaser.Math.Between(0, 9);
        let desiredFloor;
        do {
          desiredFloor = Phaser.Math.Between(0, 9);
        } while (desiredFloor === currentFloor);
        
        const id = this.people.length;
        this.people.push(new Person(this,id, currentFloor, desiredFloor));
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    // Update the game manager
    this.elevators.forEach((elevator) => elevator.update());
    this.people.forEach((person) => person.update());
  }
}
