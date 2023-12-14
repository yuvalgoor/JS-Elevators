/**
 * @typedef {import('phaser').Scene} Scene
 */

export default class Elevator {
  /**
   * @param {Scene} scene
   * @param {number} id
   * @param {number} floorCount
   */
  constructor(scene, id, floorCount) {
    this.scene = scene;

    // Elevator properties
    this.id = id;
    this.floorCount = floorCount;
    this.currentFloor = 0;
    this.destinationFloor = null;
    this.speed = 0;
    this.movingDirection = 0; // -1 for down, 1 for up, 0 for stationary

    // Elevator movement properties
    this.maxSpeed = 4;
    this.acceleration = 0.06;

    // Create a rectangle for the elevator
    this.graphics = scene.add.rectangle(100 * (id + 1), 0, 50, 50, 0x00ff00);
    this.graphics.setInteractive();
    this.graphics.on("pointerdown", () => {
      // Set a random destination floor for demo purposes
      this.destinationFloor = Phaser.Math.Between(0, this.floorCount - 1);
    });

    // Write the destination floor on the moving elevator
    this.text = scene.add.text(
      100 * (id + 1),
      this.graphics.y,
      this.destinationFloor !== null ? this.destinationFloor.toString() : ""
    );
    this.text.setOrigin(0.5, 0.5);
    this.text.setAlign("center");
    this.text.setPadding(10, 10, 10, 10);
    this.text.setColor("#000000");
    this.text.setFontSize(20);
  }

  update() {
    if (this.destinationFloor !== null) {
      // Calculate the target Y position
      let targetY = this.destinationFloor * 60;
  
      // Calculate the direction needed to move towards the target
      let targetDirection = Math.sign(targetY - this.graphics.y);
  
      // Calculate the distance to the destination floor
      let distance = Math.abs(targetY - this.graphics.y);
  
      // Check if the elevator needs to change direction
      if (this.movingDirection !== targetDirection && this.movingDirection !== 0) {
        // Decelerate until the elevator stops
        this.speed = Math.max(this.speed - this.acceleration, 0);
  
        // If the elevator has stopped, reset the moving direction
        if (this.speed === 0) {
          this.movingDirection = 0;
        }
      } else {
        // If close to the destination, start slowing down
        if (distance < (this.speed * this.speed) / (2 * this.acceleration)) {
          this.speed = Math.max(this.speed - this.acceleration, 0);
        } else if (targetDirection === this.movingDirection) {
          // Accelerate if moving in the same direction
          this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
        }
  
        // Update the moving direction
        this.movingDirection = targetDirection;
      }
  
      // Move the elevator
      this.graphics.y += this.movingDirection * this.speed;
  
      // Stop at the destination floor if close enough
      if (Math.abs(this.graphics.y - targetY) <= this.acceleration) {
        this.graphics.y = targetY;
        this.arrived();
      }
    }
  
    // Update text position and value
    this.text.y = this.graphics.y;
    this.text.setText(
      this.destinationFloor !== null ? this.destinationFloor.toString() : " "
    );
  }
  
  // Elevator stopped at the destination floor
  arrived() {
    this.destinationFloor = null;
  }
}
