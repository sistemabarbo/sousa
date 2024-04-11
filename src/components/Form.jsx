import React, {useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

const FormContainer = styled.form`
display: flex;
align-items: flex-end;
gap: 10px;
flex-wrap: wrap;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
`;

const InputArea = styled.div`
display: flex;
flex-direction: column;
`;
const Input = styled.input`
width: 120px;
padding: 0 10px;
border: 1px solid #bbb;
border-radius: 5px;
height: 40px;
`;
const Label = styled.label``;
const Button = styled.button`
padding: 10px;
cursor: pointer;
border: none;
color: white;
background-color: #2c73d2;
height: 42px;
`;

 const Form = ({getUsers, onEdit, setOnEdit}) => {
    const ref = useRef();

       useEffect(() => {
    
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
         user.departamento.value = onEdit.departamento;
         user.cpf.value = onEdit.cpf;
         user.email.value = onEdit.email;
            user.telefone.value = onEdit.telefone;
            user.cidade.value = onEdit.cidade;
         user.estado.value = onEdit.estado;
         user.unidade.value = onEdit.unidade;
        }
    }, [onEdit]);
   
    const handleSubmit = async (e) => {
        e.preventDefault();
     
            const user = ref.current;

            if (
            !user.nome.value ||
             !user.departamento.value ||
             !user.cpf.value ||
             !user.email.value ||
            !user.telefone.value ||
            !user.cidade.value ||
             !user.estado.value ||
             !user.unidade.value
            ) {   
            return toast.warn("Preencha todos os campos!");      
            }
            
          if (onEdit) {
            await axios.put("https://api-nodejs-lyart.vercel.app/" + onEdit.id, {
                nome: user.nome.value,
             departamento: user.nome.value,
             cpf: user.cpf.value,
             email: user.email.value,
                telefone: user.telefone.value,
                cidade: user.cidade.value,
             estado: user.estado.value,
             unidade: user.unidade.value,
                
            }).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data));
          } else {

           await axios.post("https://api-nodejs-lyart.vercel.app/", {
                nome: user.nome.value,
             departamento: user.nome.value,
             cpf: user.cpf.value,
             email: user.email.value,
                telefone: user.telefone.value,
                cidade: user.cidade.value,
             estado: user.estado.value,
             unidade: user.unidade.value,
               
            }).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data));
        } 
          user.nome.value = "";
     user.departamento.value = "";
     user.cpf.value = "";
     user.email.value = "";
          user.telefone.value = "";
          user.cidade.value = "";
     user.estado.value = "";
     user.unidade.value = "";
         

          setOnEdit(null);
          getUsers();
         
          
    };
   
    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
        <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
        </InputArea>
        <InputArea>
        <Label>Departamento</Label>
        <Input name="departamento" />
        </InputArea>
        <InputArea>
        <Label>Cpf</Label>
        <Input name="cpf" />
        </InputArea>
        <InputArea>
        <Label>Email</Label>
        <Input name="email" />
        </InputArea>
        <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" />
        </InputArea>
        <InputArea>
        <Label>cidade</Label>
        <Input name="cidade" />
        </InputArea>
        <InputArea>
        <Label>Estado</Label>
        <Input name="estado" />
        </InputArea>
        <InputArea>
        <Label>Unidade</Label>
        <Input name="unidade" />
        </InputArea>
       

        <Button type="submit">Salvar</Button>
        </FormContainer>
    )
};

export default Form;

