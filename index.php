<?php

    session_start();
    if(isset($_GET['sair'])){
        session_destroy();
        header('location:login.php');
    }

    if(!isset($_SESSION['idUsuarioLogado'])){
        header("location:login.php");
    }
    include_once('Usuario.php');

    $JSONUsuarios = file_get_contents('http://localhost:5001/usuarios');

    $usuarios = json_decode($JSONUsuarios);

?>

<html>
    <head>

    </head>
    <body>

        <p>Bem vindo <?php echo($_SESSION['nomeUsuarioLogado']) ?></p>

        <a href="index.php?sair">Sair</a>

        <div style='width: 1000px; height: 160px; border: solid 1px black'>
            <?php 

                // foreach($obj as $o){
                //     echo($o->id);
                // }

                $i=0;


               // var_dump($obj);


                // while($i < count($obj)){

                //     echo($obj[$i] -> nome);

                    

                //     $i++;
                // }


                $listaUsuarios = new ArrayObject();
                foreach($usuarios as $usuario){
                    //var_dump($usuario-> nome);
                    $u = new Usuario($usuario-> id, $usuario-> nome, $usuario-> email, $usuario-> senha, $usuario-> idNivel, $usuario-> status);




                    $listaUsuarios -> append($u);
                }
                echo($listaUsuarios[1]-> nome);
                
            
            ?>
            
               <table width="400px" border="1px">
                <tr>
                    <td>ID</td>
                    <td>Nome</td>
                    <td>email</td>
                    <td>senha</td>
                    <td>nivel</td>
                </tr>
                <?php
                      $i = 0;
                    while($i < sizeof($listaUsuarios)){
                ?>
                <tr>
                        <td><?php echo($listaUsuarios[$i]-> id) ?></td>
                        <td><?php echo($listaUsuarios[$i]-> nome) ?></td>
                        <td><?php echo($listaUsuarios[$i]-> email) ?></td>
                        <td><?php echo($listaUsuarios[$i]-> senha) ?></td>
                        <td><?php echo($listaUsuarios[$i]-> idNivel) ?></td>
                    </tr>
                

                <?php
                $i++;
                    }
                ?>
               </table>


        </div>
    </body>
</html>