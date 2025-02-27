const express = require('express');
const { persist, retrieveAll, retrieveById, deleteById, updateById} = require('../controllers/CategoryController');

const router = express.Router();

router.post('/persist', persist);
router.get('/retrieve', retrieveAll);
router.get('/retrieve/:id', retrieveById);
router.delete('/delete/:id', deleteById);
router.patch('/update/:id', updateById);


module.exports = router;