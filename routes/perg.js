var express = require('express');
const app   = require('../app');
var router  = express.Router();



/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const results = await global.db.selectPergs();
    console.log(results);
    const profs = await global.db.selectProfs();
  let valores = Object.values(profs);
  
    res.render('perg', { results, valores });
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})


/* GET new page. pág 210 */
router.get('/new', function (req, res, next) {
  console.log('linha 25')
  const result = global.db.selectPerg();
  const profs = global.db.selectProfs();
  let valores = Object.values(profs);
  res.render('perg-new', { title: 'Pergunta', valores, result, action: '/perg/new' });


  

})



/* POST new page. */
router.post('/new', async function (req, res) {
  //salvar o cliente aqui pág 206
  const grupo           = req.body.grupo
  const pergunta        = req.body.pergunta
  const fk_profissional = req.body.fk_profissional

  try {
    await global.db.insertPerg({ grupo, pergunta, fk_profissional });
    const profs = await global.db.selectProfs();
    let valores = Object.values(profs);
    console.log(valores);
    console.log(profs)
    console.log('linha 40')
    res.redirect('/perg/?new=true', {valores, profs} );
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }  
})



/* GET edit page. pág 209 */
router.get('/edit/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    const result = await global.db.selectPerg(id);
    
    const profs = await global.db.selectProfs();
    let valores = Object.values(profs);
    res.render('perg-new', { title: 'Editar Perguntas', result, profs, valores, action: '/perg/edit/' + id });
    
    console.log('linha 51 do perg');
    console.log('linha 52 do perg');
    console.log(valores);
    valores.forEach((nome, id) => {
    console.log('Nome: ' + nome + ' Id: ' + id);
  });
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
