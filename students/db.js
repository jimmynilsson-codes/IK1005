const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbOpen = sqlite.open('./database.db', { Promise });

const updateStudent = async (firstname, lastname, age, studentId) => {
    const database = await dbOpen;
    const sqlUpdateStudent = 'UPDATE students SET firstname = ?, lastname = ?, age = ? WHERE student_id = ?';
    
    const outdatedStudent = await getStudent(studentId);

    await database.run(sqlUpdateStudent, firstname, lastname, age, studentId);
    const updatedStudent = await getStudent(studentId);

    return [outdatedStudent, updatedStudent];
};

const deleteStudent = async (studentId) => {
    const database = await dbOpen;
    const sqlDeleteStudent = 'DELETE FROM students WHERE student_id = ?';

    const deletedStudent = await getStudent(studentId);
    database.run(sqlDeleteStudent, studentId);

    return deletedStudent;
};

const addStudent = async (studentData) => {
    const database = await dbOpen;
    const firstname = studentData.firstname;
    const lastname = studentData.lastname;
    const age = studentData.age;
    const insertStudent = 'INSERT INTO students (firstname, lastname, age) VALUES(?,?,?)';

    database.run(insertStudent, firstname, lastname, age);

    return studentData;
};

const getStudent = async (student_id) => {
    const database = await dbOpen;
    const selectStudent = 'SELECT student_id, firstname, lastname, age FROM students WHERE student_id = ?';

    const rowOfStudent = await database.all(selectStudent, student_id);

    return rowOfStudent;
};

const getStudents = async () => {
    const database = await dbOpen;
    const selectStudents = 'SELECT student_id, firstname, lastname, age FROM students';

    const rowsOfStudents = await database.all(selectStudents);
    
    return rowsOfStudents;
};

exports.getStudents = getStudents;
exports.getStudent = getStudent;
exports.addStudent = addStudent;
exports.deleteStudent = deleteStudent;
exports.updateStudent = updateStudent;