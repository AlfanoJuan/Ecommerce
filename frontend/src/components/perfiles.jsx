import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai'
import './Styles/Perfiles.css';

export const Perfiles = () =>{
  const { id } = useParams();
  console.log(id)
  const [userForm, setuserForm] = useState({
    nombre:"",
    apellido_p:"",
    usuario:"",
    correo:"",
    rol: ""
  })

useEffect ( () => { 
    fetch(`http://localhost:5000/getEditUser/${(id)}`, {
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
            correo:data.correo,
            rol:data.rol
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
    }); 
    
}, [id]) 

const handleChange = e => {
    setuserForm({
        ...userForm,
        [e.target.name]: e.target.value
    })
    console.log(userForm)
};

const [detallesData, setDetallesData] = useState([])

const handleverDetalles = (id) => { 

    const obtenerDetalles = async () => {
        try {
            const response = await fetch(`http://localhost:5000/getVentaD/${(id)}`);
            const jsonData = await response.json();
            setDetallesData(jsonData);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    obtenerDetalles();

    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('close')[0];

    // Función para abrir la ventana modal
    modal.style.display = 'block';
    
    // Función para cerrar la ventana modal al hacer clic en la "X"
    span.onclick = function() {
    modal.style.display = 'none';
    };

    // Función para cerrar la ventana modal al hacer clic fuera de ella
    window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    };
}

const handleSubmit = () => {

    const formeditprofile = 
    {  
        nombre: userForm.nombre,
        apellidoP: userForm.apellido_p,
        usuario: userForm.usuario,
        correo: userForm.correo
    };

    const requestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formeditprofile),
    };

    fetch(`http://localhost:5000/putUser/${id}`, requestInit)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => console.log(error));
    
};

const [ventasData, setventasData] = useState([])

    useEffect(() => {
        if(userForm.rol == 0){
            const obtenerDatos = async () => {
            try {
                const response = await fetch('http://localhost:5000/getAllVentas');
                const jsonData = await response.json();
                setventasData(jsonData);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        obtenerDatos();
        }
        
    }, []);

  return (
    <div>
    { userForm.rol === 1 ? ( 
        <div>

          <div className="profile-container">
          <div className="profile-header">
              <h1>Perfil de Usuario</h1>
          </div>
          <form className="profile-info" onSubmit={() => handleSubmit(id)}>
              <div>
                  <label>Nombre:</label>
                  <input type="text"  name="nombre" onChange={handleChange} value={userForm.nombre} />
              </div>
              <div>
                  <label>Apellido:</label>
                  <input type="text"  name="apellido_p" onChange={handleChange}  value={userForm.apellido_p}/>
              </div>
              <div>
                  <label>Nombre de Usuario:</label>
                  <input type="text"  name="usuario" onChange={handleChange}  value={userForm.usuario}/>
              </div>
              <div>
                  <label>Correo Electrónico:</label>
                  <input type="email" name="correo" onChange={handleChange}  value={userForm.correo}/>
              </div>
            <div className="save-button">
              <button type="submit" value="Submit">Guardar Cambios</button>
            </div>
          </form>
  
 
      </div>
        <div className="admin-container">
          <div className="admin-header">
                            <h2>Consulta de Pedidos</h2>
                        </div>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Numero de Pedido</th>
                                    <th>Producto</th>
                                    <th>Fecha de Compra</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Aquí se agregarán los datos de la tabla */}
                            </tbody>
                        </table>
                        <div className="admin-buttons">
                            <button>Ver detalles</button>
                        </div>
          </div>
        </div>

    ) : userForm.rol === 0 ? (
    <div>
        
                 {/* AQUI SOLO PODRIA VERLO EL VENDEDOR */}
         <div className="profile-container">
        <div className="profile-header">
            <h1>Perfil de Vendedor</h1>
        </div>
        <form className="profile-info" onSubmit={handleSubmit}>
                <div>
                  <label>Nombre:</label>
                  <input type="text" name="nombre" onChange={handleChange}  value={userForm.nombre} />
              </div>
              <div>
                  <label>Apellido:</label>
                  <input type="text" name="apellido_p" onChange={handleChange}  value={userForm.apellido_p}/>
              </div>
              <div>
                  <label>Nombre de Usuario:</label>
                  <input type="text" name="usuario" onChange={handleChange}  value={userForm.usuario}/>
              </div>
              <div>
                  <label>Correo Electrónico:</label>
                  <input type="email" name="correo" onChange={handleChange}  value={userForm.correo}/>
              </div>
              <div className="save-button">
                <button type="submit" value="Submit">Guardar Cambios</button>
              </div>
        </form>
    </div>
    <div className="admin-container">
                        <div className="admin-header">
                            <h2>Ventas</h2>
                        </div>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Numero de Venta</th>
                                    <th>Comprador</th>
                                    <th>Fecha de Registro</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(ventasData) && ventasData.length > 0 ? (
                                ventasData.map(item => (
                                    <tr key={item.id_venta}>
                                        <td>{item.id_venta}</td>
                                        <td>{item.id_user}</td>
                                        <td>{item.fecha}</td>
                                        <td>
                                        <div className="admin-buttons">
                                            <button onClick={() => handleverDetalles(item.id_venta)}>Ver detalles</button>
                                        </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No hay datos disponibles</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        
             </div>
    </div>
       
        
    ) :  (
        <div>
                
                {/* AQUI SOLO PODRIA VERLO EL VENDEDOR */}
        <div className="profile-container">
        <div className="profile-header">
        <h1>Perfil de Administrador</h1>
        </div>
        <form className="profile-info" onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" name="nombre" onChange={handleChange}  value={userForm.nombre} />
            </div>
            <div>
                <label>Apellido:</label>
                <input type="text" name="apellido_p" onChange={handleChange}  value={userForm.apellido_p}/>
            </div>
            <div>
                <label>Nombre de Usuario:</label>
                <input type="text" name="usuario" onChange={handleChange}  value={userForm.usuario}/>
            </div>
            <div>
                <label>Correo Electrónico:</label>
                <input type="email" name="correo" onChange={handleChange}  value={userForm.correo}/>
            </div>
            <div className="save-button">
            <button type="submit" value="Submit">Guardar Cambios</button>
            </div>
        </form>
        </div>
        {/* AQUI SOLO PODRIA VERLO EL SUPER ADMIN */}
        <div className="admin-container">
                    <div className="admin-header">
                        <h2>Administrar Perfiles</h2>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nombre de Usuario</th>
                                <th>Rol de Usuario</th>
                                <th>Fecha de Registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aquí se agregarán los datos de la tabla */}
                        </tbody>
                    </table>
                    <div className="admin-buttons">
                        <button>Agregar</button>
                        <button>Modificar</button>
                        <button>Eliminar</button>
                    </div>
            </div>
        </div>

    )}

    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nombre de Producto</th>
                        <th>Cantidad comprada</th>
                        <th>Precio por unidad</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(detallesData) && detallesData.length > 0 ? (
                    detallesData.map(item => (
                        <tr key={item.nombreP}>
                            <td>{item.nombreP}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.precio_u}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No hay datos disponibles</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </div>
  
</div>

  );
}

export default Perfiles;

