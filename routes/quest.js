var express = require('express');
var router = express.Router();

/* GET aluno page. */
router.get('/', async function (req, res) {
  try {
    const carregarSelectProf = await global.db.selectProfs();
    const carregarSelectAluno = await global.db.selectAlunos();
    
    const results            = await global.db.selectPergs();
    res.render('quest', { title: "Montar Questionário", results, carregarSelectProf, carregarSelectAluno });
  }
  catch (error) {
    res.redirect('/?erro = ' + error);
  }
})

/* POST new page. */
router.post('/new', async function (req, res) {
  //salvar o cliente aqui pág 206
   
  const fk_profissional    = req.body.fk_profissional
  const id_aluno           = req.body.aluno
  const nome_questionario  = req.body.nome_questionario
  const idx_pergunta       = req.body.idx_pergunta
  const resposta           = req.body.resposta

  const carregarSelectProf = await global.db.selectProfs();
  try {
    await global.db.insertResp({resposta, idx_pergunta , fk_profissional, nome_questionario, id_aluno });
    res.redirect('/quest/?new=true');
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
    res.render('quest-new', { title: 'Editar resposta', result, action: '/quest/edit/' + id });
    console.log('linha 56 selectResp');
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




module.exports = router;
