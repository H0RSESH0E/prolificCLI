class Engineer extends Employee {
    constructor(UserInput) {
        super(userInput);

        this.github = userInput.github;
    }

    getGithub() {}

    getRole() // Overidden to return Engineer
}