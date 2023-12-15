export default class GameManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.selectedElevator = null;

    this.scorePerPerson = 10;
  }

  setSelectedElevator(elevator) {
    this.selectedElevator = elevator;
  }

  setElevatorDestination(floor) {
    if (this.selectedElevator === null) {
      return;
    }
    // Set the destination floor for the selected elevator
    this.selectedElevator.destinationFloor = floor.floorNumber;

    // Deselect the elevator
    this.selectedElevator = null;
  }

  handleElevatorArrival(elevator) {
    this.handlePeopleDropOff(elevator);
    this.handlePeoplePickup(elevator);
  }

  handlePeopleDropOff(elevator) {
    // Iterate over each slot in the elevator
    elevator.slots.forEach((slot) => {
        // Check if the slot is occupied and the occupant's desired floor matches the current floor
        if (slot.person && slot.person.desiredFloor === elevator.currentFloor) {
            // Update the score for dropping off the person
            this.score += this.scorePerPerson;

            // Let the person complete their arrival process
            slot.person.arrived();

            // Set the slot to unoccupied
            slot.person = null;
        }
    });
}

  handlePeoplePickup(elevator) {
    // Check if there are people to pick up at the current floor
    let peopleToPickUp = this.scene.people.filter(
      (person) =>
        person.currentFloor === elevator.currentFloor &&
        person.elevator === null
    );

    // Loop through each person who needs to be picked up
    peopleToPickUp.forEach((person) => {
      // Find the first empty slot in the elevator
      let emptySlot = elevator.slots.find((slot) => slot.person === null);

      // If there's an empty slot, assign the person to it
      if (emptySlot) {
        emptySlot.person = person;
        person.enterElevator(elevator, emptySlot);
      }
    });
  }
}

// Other game management logic (scores, player progress)
