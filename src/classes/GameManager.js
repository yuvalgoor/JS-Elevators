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
    // Check if there are people to drop off
    let peopleToDropOff = this.scene.people.filter(
      (person) =>
        person.desiredFloor === elevator.currentFloor &&
        person.elevator === elevator
    );

    // If there are people to drop off
    if (peopleToDropOff.length > 0) {
      // Remove the people from the elevator
      elevator.people = elevator.people.filter(
        (person) => !peopleToDropOff.includes(person)
      );

      peopleToDropOff.forEach((person) => {
        // Update the score
        this.score += this.scorePerPerson;

        // Make the people arrive
        person.arrived();
      });
    }
  }

  handlePeoplePickup(elevator) {
    // Check if there are people to pick up
    let peopleToPickUp = this.scene.people.filter(
      (person) => person.currentFloor === elevator.currentFloor && person.elevator === null
    );

    // If there are people to pick up
    if (peopleToPickUp.length > 0) {
      // If there is space in the elevator
      if (elevator.people.length < elevator.capacity) {
        // Pick up the people one by one and check the capacity after each pick up
        peopleToPickUp.forEach((person) => {
          if (elevator.people.length < elevator.capacity) {
            elevator.people.push(person);
            person.enterElevator(elevator);
          }
        });
      }
    }
  }
}

// Other game management logic (scores, player progress)
