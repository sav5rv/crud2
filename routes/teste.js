var express = require('express');
var router = express.Router();

/* GET aluno page. */
router.get('/', function (req, res, next) {
  res.render('teste', { title: "T" });
})



module.exports = router;
