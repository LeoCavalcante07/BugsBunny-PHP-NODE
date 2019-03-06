<?php

    session_start();

    $resultJSON = null;

    if($_POST){
        $email = $_POST['email'];
        $senha = $_POST['senha'];
        //echo(file_get_contents('php://input'));
        
        $dados = http_build_query(array(
            'email'=> $email,
            'senha'=>$senha
        ));


        $contexto = stream_context_create( array(
            'http'=>array(
                'method'=>'POST',
                'content'=> $dados,
                'header'=> 'Content-type: application/x-www-form-urlencoded',
                'content'=>$dados
            )
        ));

        $resultado_login = json_decode(file_get_contents('http://localhost:5001/logar', false, $contexto));

        if($resultado_login->sucesso){

           $_SESSION['idUsuarioLogado'] = $resultado_login->usuario->id;
           $_SESSION['nomeUsuarioLogado'] = $resultado_login->usuario->nome;

            //echo($_SESSION['nomeUsuarioLogado']);
             header("location:index.php");
        }

        
    }
?>

<html>
    <head>
    </head>

    <body>
        <form name="formLogar" action="login.php" method="POST">

            <input type="text" name="email" >
            <input type="password" name="senha">

            <input type="submit" name="btnLogar" value="Logar">

        </form>
    </body>
</html>