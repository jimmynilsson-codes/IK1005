const routes = require('express').Router();
const db = require('./db');

routes.get('/', (req, res) => {
    res.json({ username: 'h06jimni' });
});

routes.get('/getstudents/', async (req, res) => {
    try {
        const students = await db.getStudents();

        res.json(students);

    } catch (error) {
        res.json(error);
    }
});

routes.get('/getstudent/:id', async (req, res) => {
    try {
        student_id = req.params.id;
        const student = await db.getStudent(student_id);

        res.json(student);

    } catch (error) {
        res.json(error);
    }
});

routes.post('/addstudent/', async (req, res) => {
    const studentData = req.body;

    try {
        const addedStudent = await db.addStudent(studentData);

        res.json({ 'Added student': addedStudent });
        
    } catch (error) {
        res.json(error);
    }
});

routes.put('/putstudent/:id', async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const studentId = req.params.id;

    try {
        const updatedStudent = await db.updateStudent(firstname, lastname, age, studentId);

        res.json({ 'Old student information': updatedStudent[0], 'New student information': updatedStudent[1] });

    } catch (error) {
        res.json(error)
    }
});

routes.delete('/delstudent/:id', async (req, res) => {
    const studentId = req.params.id;

    try {
        const deletedStudent = await db.deleteStudent(studentId);

        res.json({ 'Deleted student': deletedStudent });

    } catch (error) {
        res.json(error);
    }
});

module.exports = routes;