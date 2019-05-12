const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.json(tests);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    res.send(test);
  } catch (error) {
    next(error);
  }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.studentId);
    let test = await Test.create(req.body);
    let studentTest = await test.setStudent(student);
    res.status(201).json(studentTest);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Test.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
