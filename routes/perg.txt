var express = require('express');
const app   = require('../app');
var router  = express.Router();



/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const carregarSelectProf = await global.db.selectProfs();
    const results            = await global.db.selectPergs();
    res.render('perg', { results, carregarSelectProf });
  }
  catch (error) {
    res.redirect('/?erro = ' + error);
  }
})


/* GET new page. pág 210 */
router.get('/new', async function (req, res, next) {
  try {
    const carregarSelectProf = await global.db.selectProfs(); //resp por pegar os dados da tb_Prof e passar para a pág onde será carregado o select
    res.render('perg-new', { title: 'Pergunta', result: {}, carregarSelectProf, action: '/perg/new' });
  }
  catch (error) {
    res.redirect('/erro = ' + error);
  }
})



/* POST new page. */
router.post('/new', async function (req, res) {
  //salvar o cliente aqui pág 206
  const grupo           = req.body.grupo
  const pergunta        = req.body.pergunta
  const fk_profissional = req.body.fk_profissional

  try {
    await global.db.insertPerg({ grupo, pergunta, fk_profissional });
    res.redirect('/perg/?new=true');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }  
})



/* GET edit page. pág 209 */
router.get('/edit/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    const carregarSelectProf = await global.db.selectProfs();
    const result             = await global.db.selectPerg(id);
    res.render('perg-new', { title: 'Editar Pergunta', result, carregarSelectProf, action: '/perg/edit/' + id });
    console.log('linha 51');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
});


/* POST edit page. */
router.post('/edit/:id', async function (req, res) {
  const id              = parseInt(req.params.id);
  const grupo           = req.body.grupo;
  const pergunta        = req.body.pergunta;
  const fk_profissional = req.body.fk_profissional;

  try {
    await global.db.updatePerg(id, { grupo, pergunta, fk_profissional });
    res.redirect('/perg?edit=true')
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})


/* GET delete page. A rota está sendo acessada via GET pois esta sendo chamada por um link*/
router.get('/delete/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    await global.db.deletePerg(id);
    res.redirect('/perg/?delete=true');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})




module.exports = router;