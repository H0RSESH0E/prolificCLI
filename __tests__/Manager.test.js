const Manager = require('../lib/Manager.js');

test('creates a Manager object', () =>{
    const manager = new Manager('name', 'id', 'email@email', 302);

    expect(manager.officeNumber).toEqual(expect.any(Number));
    expect(manager.officeNumber).toBeGreaterThanOrEqual(1);
    console.table(manager);
});