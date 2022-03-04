const Intern = require('../lib/Intern.js');

test('creates an Intern object', () =>{
    const intern = new Intern('name', 'id', 'email@email', 'University of Toronto');

    expect(intern.school).toEqual(expect.stringContaining('University of Toronto'));
    console.table(intern);
});