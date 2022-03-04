const Employee = require('../lib/Employee.js');

test('creates an Employee object with a Github username', () =>{
    const employee = new Employee('Dave', 24601, 'love@life');

    expect(employee.name).toEqual(expect.stringContaining('Dave'));

    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.id).toBeGreaterThanOrEqual(1);

    expect(employee.email).toEqual(expect.stringContaining('love@life'));

    console.table(employee);
});