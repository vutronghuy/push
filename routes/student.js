var express = require('express');
const StudentModel = require('../models/StudentModel');
var router = express.Router();

router.get('/', async (req, res) => {
    var students = await StudentModel.find();
    res.render('student/studentList', { students : students });
})
//: để nó hiện id
router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await StudentModel.findByIdAndDelete(id)
    .then(() => console.log("delete successfully !"))
    .catch(() => console.log("delete failed"));
    res.redirect('/student');
})

router.get('/add', async (req, res) => {
    res.render('student/studentAdd'); 
})
router.post('/add', async (req, res) => {
    await StudentModel.create(req.body);
    res.redirect('/student'); 
})
router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var student = await StudentModel.findById(id);
    res.render('student/studentEdit', { student : student});

})
router.post('/edit/:id', async (req, res) => {
    // var id = req.params.id;
    // var student = req.body;
    await StudentModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => console.log("edit successfully !"))
    .catch(() => console.log("edit failed"));
    res.redirect('/student');
})

module.exports = router;
