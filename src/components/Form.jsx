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
            user.telefone.value = onEdit.telefone;
            user.email.value = onEdit.email;
        }
    }, [onEdit]);
   
    const handleSubmit = async (e) => {
        e.preventDefault();
     
            const user = ref.current;

            if (
            !user.nome.value ||
            !user.telefone.value ||
            !user.email.value 
            ) {   
            return toast.warn("Preencha todos os campos!");      
            }
            
          if (onEdit) {
            await axios.put("https://api-nodejs-lyart.vercel.app/" + onEdit.id, {
                nome: user.nome.value,
                telefone: user.telefone.value,
                email: user.email.value,
                
            }).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data));
          } else {

           await axios.post("https://api-nodejs-lyart.vercel.app/", {
                nome: user.nome.value,
                telefone: user.telefone.value,
                email: user.email.value,
               
            }).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data));
        } 
          user.nome.value = "";
          user.telefone.value = "";
          user.email.value = "";
         

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
        <Label>telefone</Label>
        <Input name="telefone" />
        </InputArea>
        <InputArea>
        <Label>email</Label>
        <Input name="email" />
        </InputArea>
       

        <Button type="submit">Salvar</Button>
        </FormContainer>
    )
};

export default Form;

