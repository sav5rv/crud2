var express = require('express');
const app   = require('../app');
var router  = express.Router();



/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const results = await global.db.selectProfs();
    console.log(results);
    res.render('prof', { results });
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})


/* GET new page. pág 210 */
router.get('/new', function (req, res, next) {
  res.render('prof-new', { title: 'Profissional', result: {}, action: '/prof/new' });
})



/* POST new page. */
router.post('/new', async function (req, res) {
  //salvar o cliente aqui pág 206
  const nome          = req.body.nome
  const especialidade = req.body.especialidade

  try {
    await global.db.insertProf({ nome, especialidade });
    res.redirect('/prof/?new=true');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }  
})



/* GET edit page. pág 209 */
router.get('/edit/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    const result = await global.db.selectProf(id);
    res.render('prof-new', { title: 'Edição de Profissional', result, action: '/prof/edit/' + id });
    console.log('linha 51 do prof');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
});


/* POST edit page. */
router.post('/edit/:id', async function (req, res) {
  const id            = parseInt(req.params.id);
  const nome          = req.body.nome;
  const especialidade = req.body.especialidade;

  try {
    await global.db.updateProf(id, { nome, especialidade });
    res.redirect('/prof?edit=true')
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})


/* GET delete page. A rota está sendo acessada via GET pois esta sendo chamada por um link*/
router.get('/delete/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    await global.db.deleteProf(id);
    res.redirect('/prof/?delete=true');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})




module.exports = router;
