import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Styles/login.css';
import miImagen from "./images/LoginBDM.jpeg";

const Login = ({user, setUser, setToken}) => {


  const handleClick = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user)
}

    let { usuario, contrasena } = user

    const navigate = useNavigate();

    const handleSubmit = e => { 

      e.preventDefault();

      if ( usuario === '' || contrasena === '' ) {
          alert('Todos los campos son obligatorios')
          return
      }

      const user = { usuario, contrasena };
      
       //fetch
      const requestInit = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(user),
      }

      fetch('http://localhost:5000/login', requestInit)
      .then ((res) => res.json())
      .then ((res) => {
          if (res.token) {
              setToken(res.token);
              navigate('/');
              

              setUser({
                  usuario: '',
                  contrasena: ''
              });
          } else {
              console.log('Login failed!'); 

              alert('User doesnt exists')
       
          }
           
      })

     
    }

    return (
      <div className="container">

      <div className="center-container">

        <img src={miImagen} alt="Descripción de la imagen" className="imagen-izquierda"/>

        <form onSubmit={handleSubmit}  className="form_main">
          <h1 className="heading">Login</h1>

          <h5 className="user-passw">Username</h5>
          <div className="inputContainer">
            <input type="text" className="inputField" name="usuario" id="username" onChange={handleClick}/>
          </div>
  
          <h5 className="user-passw" onChange={handleClick}>Password</h5>
          <div className="inputContainer">
            <input type="password" className="inputField" name="contrasena" id="password" onChange={handleClick} />
          </div>
          <Link to="/" className="forgotLink">Forgot your password?</Link>
  
          <button className="button">Submit</button>
          <p className="dont-account">Don´t have an account yet? </p>
          <Link to="/register" className="RegisterLink">Create an account</Link>

        </form>
      </div>

      </div>
    );
  };
  
  export default Login;