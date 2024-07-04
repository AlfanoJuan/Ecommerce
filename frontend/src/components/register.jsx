import React from "react";
import { Link } from 'react-router-dom';
import './Styles/login.css';
import miImagen from "./images/LoginBDM.jpeg";
import miImagenR from "./images/registerBDM.png";
import { useNavigate } from 'react-router-dom';


export const Register = ({user, setUser}) => {

 
  const handleClick = e => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
    console.log(user);
  }

  let {usuario, correo, contrasena, nombre, apellidoP, fnacimiento, sexo, rol} = user

  const navigate = useNavigate(); 

  const handleSubmit = (event) => { 
    
    if (usuario === '' || correo === '' || contrasena === '' || nombre === '' || apellidoP === '' || fnacimiento === '' || sexo === '' || rol === ''){
      alert('Todos los campos son obligatorios')
      return
    }
  
    const requestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    }

    fetch('http://localhost:5000/postUser', requestInit)
    .then ((res) => res.json())
    .then ((res) => {
        console.log(res)
    })

    //reload state
    setUser({
      usuario:'', 
      correo:'', 
      contrasena:'', 
      nombre:'', 
      apellidoP:'', 
      fnacimiento:'', 
      sexo:'', 
      rol:''
    })

    navigate('/login');

  }

  return (
    <div className="container">

    <div className="center-container">

      <img src={miImagenR} alt="Descripción de la imagen" className="imagen-izquierdaR"/>

      <form onSubmit={ handleSubmit }className="form_main2">
        <h1 className="heading2">Register</h1>

        
        <div className="user-passw-container">
        <h5 className="user-passw">First Name</h5>
        <h5 className="user-passw">Last Name</h5>
        </div>
        <div className="inputContainer">
          <input type="text" name="nombre" onChange={handleClick} className="inputField2" />
          <input type="text" name="apellidoP" onChange={handleClick} className="inputField2" />
        </div>
        <h5 className="user-passw">User</h5>
        <div className="inputContainer">
          <input type="text" name="usuario" onChange={handleClick} className="inputField" />
        </div>
        <h5 className="user-passw">Email</h5>
        <div className="inputContainer">
          <input type="email" name="correo" onChange={handleClick} className="inputField" />
        </div>

        <h5 className="user-passw">Password</h5>
        <div className="inputContainer">
          <input type="password" name="contrasena" onChange={handleClick} className="inputField" />
        </div>

        <h5 className="user-passw">Contact Number</h5>
        <div className="inputContainer">
          <input type="gmail" name="Cnumber" onChange={handleClick} className="inputField" />
        </div>

        <div className="user-passw-container">
        <h5 className="user-passw">Birthday</h5>
        <h5 className="user-passw">Gender</h5>
        </div>
        <div className="inputContainer">
          <input type="date" name="fnacimiento" onChange={handleClick} className="inputField2" />
          <select name="sexo" onChange={handleClick} className="inputField2">
            <option value="0">M</option>
            <option value="1" selected>F</option>
          </select>
        </div>

        <div className="user-passw-container">
        <h5 className="user-passw">Rol</h5>
        </div>

        <div className="inputContainer">
          <select name="rol" onChange={handleClick} className="inputField3">
            <option value="0">Vendedor</option>
            <option value="1" selected>Comprador</option>
            <option value="2">Vendedor/Comprador</option>
          </select>
        </div>

        <button type="submit" className="button" value="Submit">Submit</button>
        <p className="dont-account">Do you already have an account? </p>
        <Link to="/login" className="RegisterLink">Log in</Link>

      </form>
    </div>

    </div>

  );
};
  
  export default Register;