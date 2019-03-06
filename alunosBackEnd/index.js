const app = require('express')();
const http = require('http').createServer(app);
//const config = require('./config')
const bodyParser = require("body-parser");

var mysql = require('mysql');

let usuarios = [];
let usuario = [];
let bancas = [];
let bancaPrincipal = [];
let celebridades = [];
let celebridade = [];
let conteudosCelebridade = [];
let destaques = [];
let sobres = [];



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//variavel de conexao
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bcd127',
  database: 'db_bugs_bunny'
});


//efetuar a conexão
connection.connect(function(err){

  if(!err){
     console.log("Conexão efetuada cm sucesso");
  }else{
    console.log("Erro na conexão");
    console.log(err);
  }

});



// Substitua pelo seu comando
var sql = "SELECT * FROM tbl_usuarios";

 

// Executa o comando SQL
connection.query(sql, function(err, rows, fields) {
if (err) throw err;

 

// Faz o laço para retornar os dados
for (var i in rows) {
	
	 const usuario = {
		"id": rows[i].id,
		"nome": rows[i].nome,
		"email": rows[i].email,
		"senha": rows[i].senha,
		"idNivel": rows[i].idNivel,
		"status": rows[i].status
	};
	
	
    
	usuarios.push(usuario);
	
}
});


app.get("/", (req, res)=>{
	
	res.send("Seja bem vindo a API BugsBunny");
});







//LOGAR
app.post("/logar", (req, res)=>{

    console.log(req.body.email)
	console.log(req.body.senha)
    
	let email = req.body.email
    let senha = req.body.senha
	//var sql = "SELECT * FROM tbl_usuarios where id = ?", [id];

	
	// Executa o comando SQL
	connection.query("SELECT * FROM tbl_usuarios where email = ? and senha = ?", [email, senha], function(err, rows, fields) {
		if (rows.length > 0){
            
            res.send({
               sucesso:true,
               msg:"Login efetuado com sucesso",
               usuario:rows[0]                 
            })
    
            
        }else{
            res.send({
                sucesso:false
            })
        }

        

	});

//////////	

	//const usuario1  = usuarios.filter(usuarios => usuarios.id != req.params.id)


	//res.send(usuario)

});



//VER USUARIOS
app.get("/usuarios", (req, res)=>{
	

	res.send(usuarios)

	//connection.end();
	
});



//apagar usuario
app.get("/deleteUsuario/:id", (req, res)=>{
	
	var sql = "delete from tbl_usuarios where id ="+req.params.id
	
	connection.query(sql, function(err, rows, fields) {
	if (err) throw err;

		
	});	
	
	
	
	
	res.send({"sucesso" :true, "msg": "Add com sucesso"})

	//connection.end();
	
});




app.get("/dadosUsuario/:id", (req, res)=>{


	// Substitua pelo seu comando
	var sql = "SELECT * FROM tbl_usuarios where id = "+req.params.id;

	
	// Executa o comando SQL
	connection.query(sql, function(err, rows, fields) {
		if (err) throw err;
		
		usuario = [{
			"id": rows[0].id,
			"nome": rows[0].nome,
			"Email": rows[0].email,
			"Senha": rows[0].senha,
			"idNivel": rows[0].idNivel,
			"status": rows[0].status			
			
		}]

	});

//////////	

	//const usuario1  = usuarios.filter(usuarios => usuarios.id != req.params.id)


	res.send(usuario)

});



//VER BANCAS
app.get("/bancas", (req, res)=>{
	
	var sql = "select * from tbl_banca"
	
	connection.query(sql, function(err, rows, fields){
		if(err) throw err;
		
		for (var i in rows){
			
			const banca = [{
				"idBanca": rows[i].idBanca,
				"titulo": rows[i].titulo,
				"foto": rows[i].foto,
				"texto": rows[i].texto,
				"status": rows[i].status
			}]			
		
			bancas.push(banca)
		}
		
		
		

		
	})
	
	res.send(bancas)
	
});



//VER BANCA PRINCIPAL
app.get("/bancaPrincipal", (req, res)=>{
	
	var sql = "select * from tbl_banca_principal"
	
	connection.query(sql, function(err, rows, fields){
		if(err) throw err;
		
		//for (var i in rows){
			
            bancaPrincipal = [{
				"idBancaPrincipal": rows.idBancaPrincipal,
				"foto": rows.foto,
				"texto": rows.texto,
				"status": rows.status
			}]			
		
			//bancaPrincipal.push(bancaPrincipal)
		//}
		
		
		

		
	})
	
	res.send(bancaPrincipal)
	
});



//VER CELEBRIDADES
app.get("/celebridades", (req, res)=>{
	
	var sql = "select * from tbl_celebridade"
	
	connection.query(sql, function(err, rows, fields){
		if(err) throw err;
		
		for (var i in rows){
			
			const celebridade = [{
				"idCelebridade": rows[i].idCelebridade,
				"nomeCelebridade": rows[i].nomeCelebridade,
				"foto": rows[i].foto,
				"status": rows[i].status
			}]			
		
			celebridades.push(celebridade)
		}
		
		
		

		
	})
	
	res.send(celebridades)
	
});



//VER CELEBRIDADE POR ID
app.get("/celebridade/:id", (req, res)=>{
	
	var sql = "select * from tbl_celebridade where idCelebridade = "+req.params.id
	
	connection.query(sql, function(err, rows, fields){
		if(err) throw err;
		
		//for (var i in rows){
			
            celebridade = [{
				"idCelebridade": rows[0].idCelebridade,
				"nomeCelebridade": rows[0].nomeCelebridade,
				"foto": rows[0].foto,
				"status": rows[0].status
			}]			
		
			//celebridades.push(celebridade)
		//}
		
		
		

		
	})
	
	res.send(celebridade)
	
});



//VER CONTEUDO DA CELEBRIDADE
app.get("/conteudoCelebridade", (req, res)=>{
	
	var sql = "select cc.idConteudoCelebridade, cc.titulo, cc.texto, cc.foto, cc.banner from tbl_conteudo_celebridade as cc, tbl_celebridade as c where c.idCelebridade = cc.idCelebridade and cc.status = 1 and c.status = 1"
	
	connection.query(sql, function(err, rows, fields){

		
		res.send(rows)

		
	})
	
	
	
});



//VER DESTAQUES
app.get("/destaques", (req, res)=>{
	
	var sql = "select * from tbl_destaque"
	
	connection.query(sql, function(err, rows, fields){
		if(err) throw err;
		
		for (var i in rows){
			
            const destaque = [{
				"idDestaque": rows[i].idDestaque,
				"titulo": rows[i].titulo,
                "texto": rows[i].texto,
                "foto": rows[i].foto,
				"status": rows[i].status
			}]			
		
            destaques.push(destaque)
		}
		
		
		

		
	})
	
	res.send(destaques)
	
});



//VER SOBRE
app.get("/sobre", (req, res)=>{
	
	var sql = "select * from tbl_sobre"
	
	connection.query(sql, function(err, rows, fields){
		if(err) throw err;
		
		for (var i in rows){
			
            const sobre = [{
				"idSobre": rows[i].idSobre,
				"titulo": rows[i].titulo,
                "texto": rows[i].texto,
                "foto": rows[i].foto,
				"status": rows[i].status
			}]			
		
            sobres.push(sobre)
		}
		
		
		

		
	})
	
	res.send(sobres)
	
});





//configurando a porta do servidor
http.listen( 5001, function(){
    console.log(`Servidor rodando na porta 5001`);
    
});