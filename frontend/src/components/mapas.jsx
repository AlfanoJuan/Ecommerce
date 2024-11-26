import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import miImagen from "./images/registerBDM.png";
//import Imagenlogo from "./images/register.png";
import './Styles/index.css';


function HeaderAndFooterExample({userdata}) {
  const {id_user} = userdata.data?.user

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [productoForm, setproductoForm] = useState({
    nombreP: "",
  })

  const handleChange = e => {
    setproductoForm({
        ...productoForm,
        [e.target.name]: e.target.value
    })
};
  

  const toggleAmpliar1 = (index) => {
    setSelectedImageIndex(index === selectedImageIndex ? null : index);
  };

  const [productoData, setproductoData] = useState([{}])


    useEffect ( () => { 

      const nombreP = productoForm.nombreP;
      fetch('http://localhost:5000/getProducto', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        }).then(
            response => response.json()
        ).then((data) => {
            if (Array.isArray(data)) {
                const filteredData = data.filter((producto) =>
                  producto.nombreP.toLowerCase().includes(nombreP.toLowerCase())
                );
                console.log(data)
                setproductoData(filteredData);
            } else {
              console.log('Invalid data format:', data);
            } 
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
          
    
    }, [productoForm])  

    const handleSubmit = (id_post) => { 
    
      const reqbody = {
          id_post: id_post,
          id_user: id_user
      }
    console.log()
      const requestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reqbody),
      }
  
      fetch('http://localhost:5000/postCarrito', requestInit)
      .then ((res) => res.json())
      .then ((res) => {
        console.log(res)
      })
  
  
    }

  return (
<div>
<input
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
              name="nombreP"
            />
    <div className='baner'>
        <h2 className='subt'>
          Bienvenido
        </h2>
    </div>
<div>
  <ul className="opciones">
    <li>Lacteos</li>
    <li>Carnes</li>
    <li>Frutas</li>
    <li>Verduras</li>
  </ul>
</div>

    <div className='fondo'>
      
    {productoData.map((row, index) => (
     <div className="plannerI" key={index}>
      
     <div id="imagen-contenedorI" onClick={() => toggleAmpliar1(index)}>
     {row.img_prod && (
     <img
      src={URL.createObjectURL(new Blob([new Uint8Array(row.img_prod.data)]))}
       alt="Descripción de la imagen" 
       className={`imagen-plannerI ${selectedImageIndex === index ? "ampliadaI" : ""}`} 
       />
       )}
     </div>
  
     <h1 className="titulo-plannerI">{row.nombreP}</h1>
     <p className="descripcionI">
     {row.descripcion}</p>
     {userdata.data?.user.id_user ? (
        <button type="submit" value="Submit" onClick={() => handleSubmit(row.id_producto)} className="button-plannerI">Agregar</button>
     ) : 
     (<> </>)}
     </div>
    ))}
    
    </div>

</div>
    
  );
}

export default HeaderAndFooterExample;