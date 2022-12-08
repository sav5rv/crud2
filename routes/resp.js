var express = require('express');
const app   = require('../app');
var router  = express.Router();



/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const results = await global.db.selectResps();
    console.log(results);
    res.render('resp', { results });
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})


/* GET new page. pág 210 */
router.get('/new', function (req, res, next) {
  res.render('resp-new', { title: 'Respostas', result: {}, action: '/resp/new' });
})



/* POST new page. */
router.post('/new', async function (req, res) {
  //salvar o cliente aqui pág 206
  const nome          = req.body.nome
  const especialidade = req.body.especialidade

  try {
    await global.db.insertResp({ nome, especialidade });
    res.redirect('/resp/?new=true');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }  
})



/* GET edit page. pág 209 */
router.get('/edit/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    const result = await global.db.selectResp(id);
    const carregarSelectProf = await global.db.selectProfs();
    const carregarSelectAluno = await global.db.selectAlunos();
    
    const results            = await global.db.selectPergs();
    res.render('resp-new', { title: 'Edição de Respostas', result, results, carregarSelectProf, carregarSelectAluno, action: '/resp/edit/' + id });
    console.log('linha 51 do resp');
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
    await global.db.updateResp(id, { nome, especialidade });
    res.redirect('/resp?edit=true')
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})


/* GET delete page. A rota está sendo acessada via GET pois esta sendo chamada por um link*/
router.get('/delete/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    await global.db.deleteResp(id);
    res.redirect('/resp/?delete=true');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})




module.exports = router;
