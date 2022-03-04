const Engineer = require('../lib/Engineer.js');

test('creates an Engineer object with a Github username', () =>{
    const engineer = new Engineer('name', 'id', 'email@email', 'H0RSESH0E');

    expect(engineer.github).toEqual(expect.stringContaining('H0RSESH0E'));

    console.table(engineer);
});