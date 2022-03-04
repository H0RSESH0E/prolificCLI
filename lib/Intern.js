class Intern extends Employee {
    constructor(userInput) {
    super(userInput);

    this.school = userInput.school;
    }

    getSchool() {}

    getRole() // Overidden to return 'Intern'
}