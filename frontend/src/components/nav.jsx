import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Styles/nav.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Styles/offcanvas.css'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Index from "./index.jsx";

export const NavbarReact = ({userdata, setUserdata, setToken}) => {
    const { id_user } = userdata.data?.user;
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [userForm, setuserForm] = useState({
      nombre:"",
      apellido_p:"",
      usuario:"",
      rol:"",
      correo:""
    })

  
    const handleLogout = () => {
      setUserdata({ data: { user: { 
        usuario:'', 
        correo:'', 
        contrasena:'', 
        nombre:'', 
        apellidoP:'', 
        fnacimiento:'', 
        sexo:'',
        rol:''}}});
        setToken('');
        localStorage.removeItem('token');
    };

    useEffect ( () => { 
      fetch(`http://localhost:5000/getEditUser/${(id_user)}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        }).then(
            response => response.json()
        ).then((data) => {
          console.log(data)
          setuserForm({
              nombre: data.nombre,
              apellido_p: data.apellido_p,
              usuario: data.usuario,
              rol: data.rol,
              correo:data.correo
          });
        })
        .catch((error) => {
          console.error('Fetch error:', error);
      }); 
      
    }, [id_user]) 

    
  
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
        <Navbar.Brand href="/" className="Nav-titulo">BisonGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Pagina Principal</Nav.Link>
            {userForm.rol === 0 ? ( 
              <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            <Nav.Link href={`/carrito/${id_user}`}>Carrito</Nav.Link>
            <Nav.Link href={`/categorias`}>Categorias</Nav.Link>

            <NavDropdown title="Opciones de vendedor" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/producto">
                Crear producto
              </NavDropdown.Item>
              <NavDropdown.Item href="/editarproducto">
                Editar productos
              </NavDropdown.Item>
            </NavDropdown>
              </Nav>
           
             ): userForm.rol === 1 ? ( <Nav

              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
                <NavDropdown title="Más" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Compras</NavDropdown.Item>
              <NavDropdown.Item href={`/carrito/${id_user}`}>
               Carrito
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>):(<></>)}
          </Nav>
          {userForm.usuario ? (
             <div>
             <Nav.Link variant="primary" onClick={handleShow} className="nav-link" aria-current="page">Perfil</Nav.Link>
             </div>   
          
            
         ) : ( 
          <Nav.Link href="/login" className="ms-2" style={{ color: "#ff58b9" }}>Iniciar Sesión</Nav.Link>
         )}  
        </Navbar.Collapse>
      </Container>
      <OffcanvasComponent show={show} handleClose={handleClose} handleLogout={handleLogout} usuario={userForm.usuario} id_user={id_user} />
    </Navbar>
    );

};

const OffcanvasComponent = ({ show, handleClose, handleLogout, usuario, id_user}) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement='end' className="Offcanvas-backgorund">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Usuario: {usuario}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body >
        <Link className="nav-link" aria-current="page" to={`./perfiles/${id_user}`}>Panel de Control</Link>
        <Link className="nav-link" aria-current="page"  onClick={() =>{ 
          handleLogout();
          handleClose();}} to="./login">Cerrar Sesión</Link>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NavbarReact;
