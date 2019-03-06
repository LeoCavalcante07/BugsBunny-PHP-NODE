<?php

    class Usuario{
        public $id;
        public $nome;
        public $email;
        public $senha;
        public $idNivel;
        public $status;


        public function Usuario($id, $nome, $email, $senha, $idNivel, $status){
            $this->id = $id;
            $this->nome = $nome;
            $this->email = $email;
            $this->senha = $senha;
            $this->idNivel = $idNivel;
            $this->status = $status;
        }

    }

?>