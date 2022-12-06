var express = require('express');
const app   = require('../app');
var router  = express.Router();



/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const results = await global.db.selectAlunos();
    console.log(results);
    console.log('linha 12');
    res.render('aluno', { results });
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})


/* GET new page. pág 210 */
router.get('/new', function (req, res, next) {
  console.log('linha 24');
  res.render('aluno-new', { title: 'Cadastro de Aluno', result: {}, action: "/aluno/new" });
})



/* POST new page. */
router.post('/new', async function (req, res) {
  //salvar o aluno aqui pág 206
  const nome  = req.body.nome // o nome é ref ao campo texto nome do arq new.ejs
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf    = req.body.uf
  console.log('linha 36');

  try {
    await global.db.insertAluno({ nome, idade, uf });
    res.redirect('/aluno?new=true');   //está direcionando para a rota /aluno e levando a variável new como true
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }  
})



/* GET edit page. pág 209 */
router.get('/edit/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    const result = await global.db.selectAluno(id);
    res.render('aluno-new', { title: 'Editar registro de Aluno', result, action: '/aluno/edit/' + id });
    console.log('linha 56');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
});


/* POST edit page. */
router.post('/edit/:id', async function (req, res) {
  const id    = parseInt(req.params.id);
  const nome  = req.body.nome;
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf    = req.body.uf;

  try {
    await global.db.updateAluno(id, { nome, idade, uf });
    res.redirect('/aluno/?edit=true')
    console.log('linha 74');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})



/* GET delete page. A rota está sendo acessada via GET pois esta sendo chamada por um link*/
router.get('/delete/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    await global.db.deleteAluno(id);
    res.redirect('/aluno/?delete=true');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})




module.exports = router;