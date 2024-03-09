import React from "react";
import {toast, ToastContainer } from "react-toastify";
import axios from "axios";
const Grid = ({ users, setUsers, setOnEdit }) => {

     const handleEdit = (item) => {
        setOnEdit(item);
     };


    const handleDelete = async (id) => {
        await axios.delete("https://api-nodejs-lyart.vercel.app/" + id)
        .then(({ data }) => {
            const newArray = users.filter((user) => user.id !== id);

            setUsers(newArray);
            toast.success(data);
            
        })
        .catch(({ data }) => toast.error(data));
        setOnEdit(null);
    }

    return (
  <table>
 <thead>
    <tr>
        <th>Nome</th>
        <th>Telefone</th>
        <th>Email</th>
        <th>Editar</th>
        <th>Remover</th>
    </tr>
 </thead>
 <tbody>
    {users.map((item, i) => (
        <tr key={i}>
            <td width="30%">{item.nome}</td>
            <td width="30%">{item.telefone}</td>
            <td width="30%">{item.email}</td>
            <td><button className="edit" onClick={() => handleEdit(item)}>Editar</button></td>
            <td><button className="delete" onClick={() => handleDelete(item.id)}>Deletar</button></td> 
        
        </tr>
    ))}
 </tbody>
  </table>
    );
};

export default Grid;