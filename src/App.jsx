import React, { useState, useEffect } from "react";
import {toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import Form from "./components/Form.jsx";
import Grid from "./components/Grid.jsx";
import Global from "./styles/global";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import axios from "axios";



const Container = styled.div`
width: 100%;
max-width: 800px;
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`;
const Title = styled.h2``;


function App() {
 const [users, setUsers] = useState([]);
 const [onEdit, setOnEdit] = useState(null);

 const getUsers = async () => {
  try {
    const res = await axios.get("https://api-nodejs-lyart.vercel.app/");
    setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
  } catch (error) {
    toast.error(error);
  }
 };

 useEffect(() => {
  getUsers();
 }, [setUsers]);

  return (
    <>
    <Container>
     <Title>Colaboradores</Title>
     <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} /> 
     <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />   
    </Container>    
     <ToastContainer autoClose={3000} />
      <Global />
    </>
  )
}

export default App
