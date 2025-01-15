const express = require('express');
const { persist, retrieveAll, retrieveById, updateById, deleteById } = require('../controllers/ProductController');


const router = express.Router();

router.post('/persist', persist);
router.get('/retrieve', retrieveAll);
router.get('/retrieve/:id', retrieveById);
router.patch('/update/:id', updateById);
router.delete('/delete/:id', deleteById);


module.exports = router;

