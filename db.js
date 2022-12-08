const mysql = require('mysql2/promise');
async function connect(){
    //forma opcional de criar o objeto de conexão
    //const connectionString = 'mysql://root:luiztools@localhost:3306/crud'; 
    //const connection= mysql.createConnection(connectionString); 

    if(global.connection && global.connection.state !== 'disconnected') 
        return global.connection;

    const connection = await mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : '123',
        database : 'banco1'
    });

    console.log('Conectou no MySQL!');
    global.connection = connection;
    return global.connection;
}
connect();


// TB ALUNO
async function selectAlunos(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM tb_aluno;');
    return rows;
}

async function insertAluno(aluno){
    const conn = await connect();
    const sql = "INSERT INTO tb_aluno(nome,idade,uf) VALUES (?,?,?);";
    return await conn.query(sql, [aluno.nome, aluno.idade, aluno.uf]);
}

async function selectAluno(id){  
    const conn = await connect();
    const sql = "SELECT * FROM tb_aluno WHERE id=?";
    const [rows] = await conn.query(sql, [id]);
    return rows && rows.length > 0 ? rows[0] : {};
}

async function updateAluno(id, aluno){
    const conn = await connect();
    const sql = "UPDATE tb_aluno SET nome=?, idade=?, uf=? WHERE id=?";
    return await conn.query(sql, [aluno.nome, aluno.idade, aluno.uf, id]);
}

async function deleteAluno(id){
    const conn = await connect();
    return await conn.query('DELETE FROM tb_aluno WHERE id=?;', [id]);
}



// TB PROFISSIONAL
async function selectProfs(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM tb_profissional;');
    return rows;
}

async function insertProf(prof){
    const conn = await connect();
    const sql = "INSERT INTO tb_profissional(nome,especialidade) VALUES (?,?);";
    return await conn.query(sql, [prof.nome, prof.especialidade]);
}

async function selectProf(id){  
    const conn = await connect();
    const sql = "SELECT * FROM tb_profissional WHERE id=?";
    const [rows] = await conn.query(sql, [id]);
    return rows && rows.length > 0 ? rows[0] : {};
}

async function updateProf(id, prof){
    const conn = await connect();
    const sql = "UPDATE tb_profissional SET nome=?, especialidade=? WHERE id=?";
    return await conn.query(sql, [prof.nome, prof.especialidade, id]);
}

async function deleteProf(id){
    const conn = await connect();
    return await conn.query('DELETE FROM tb_profissional WHERE id=?;', [id]);
}



// TB PERGUNTA ----------------------- ************* -------------------------------------
async function selectPergs(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM tb_pergunta;');
    return rows;
}

async function insertPerg(perg){
    const conn = await connect();
    const sql = "INSERT INTO tb_pergunta(grupo,pergunta,fk_profissional) VALUES (?,?,?);";
    return await conn.query(sql, [perg.grupo, perg.pergunta, perg.fk_profissional]);
}

async function selectPerg(id){  
    const conn = await connect();
    const sql = "SELECT * FROM tb_pergunta WHERE id=?";
    const [rows] = await conn.query(sql, [id]);
    return rows && rows.length > 0 ? rows[0] : {};
}

async function updatePerg(id, perg){
    const conn = await connect();
    const sql = "UPDATE tb_pergunta SET grupo=?, pergunta=?, fk_profissional=? WHERE id=?";
    return await conn.query(sql, [perg.grupo, perg.pergunta, perg.fk_profissional, id]);
}

async function deletePerg(id){
    const conn = await connect();
    return await conn.query('DELETE FROM tb_pergunta WHERE id=?;', [id]);
}

// TB RESPOSTA ----------------------- ************* -------------------------------------
async function selectResps(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM tb_resposta;');
    return rows;
}

async function insertResp(resp){
    const conn = await connect();
    const sql = "INSERT INTO tb_resposta(resposta, idx_pergunta, fk_profissional, nome_questionario, id_aluno) VALUES (?,?,?,?,?);";
    return await conn.query(sql, [resp.resposta, resp.idx_pergunta , resp.fk_profissional, resp.nome_questionario, resp.id_aluno]);
}

async function selectResp(id){  
    const conn = await connect();
    const sql = "SELECT * FROM tb_resposta WHERE id=?";
    const [rows] = await conn.query(sql, [id]);
    return rows && rows.length > 0 ? rows[0] : {};
}

async function updateResp(id, perg){
    const conn = await connect();
    const sql = "UPDATE tb_pergunta SET grupo=?, pergunta=?, fk_profissional=? WHERE id=?";
    return await conn.query(sql, [perg.grupo, perg.pergunta, perg.fk_profissional, id]);
}

async function deleteResp(id){
    const conn = await connect();
    return await conn.query('DELETE FROM tb_resposta WHERE id=?;', [id]);
}


module.exports = { selectAlunos, selectAluno, insertAluno, updateAluno, deleteAluno,
                   selectProfs,  selectProf,  insertProf,  updateProf,  deleteProf,
                   selectPergs,  selectPerg,  insertPerg,  updatePerg,  deletePerg,
                   selectResps,  selectResp,  insertResp,  updateResp,  deleteResp
                 }
