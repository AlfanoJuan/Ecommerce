import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/Carrito.css';

function CarritoDeCompra() {
  const {id} = useParams();
  
  const navigate = useNavigate();

  const [productoData, setproductoData] = useState([{}])

  useEffect ( () => { 
    fetch(`http://localhost:5000/getCarritoD/${(id)}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      }).then(
          response => response.json()
      ).then((data) => {
        if (Array.isArray(data)) {
          const formattedData = data.map((rows) => {
              return {
                ...rows
              };
             
          });
          setproductoData(formattedData);
          
      } else {
        console.log('Invalid data format:', data);
      }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
    });
           
}, [id]) 
  
  const handleConfirmarCompra = () => {
    
    fetch(`http://localhost:5000/getCarritoA/${(id)}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      }).then(
          response => response.json()
      ).then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          navigate(`/pago/${data[0].id_carrito}`); 
        }     
      })
      .catch((error) => {
        console.error('Fetch error:', error);
    });
  };

  const handleAumentarCantidad = (id_producto) => {
    const newData = productoData.map(item => {
      if (item.id_producto === id_producto) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setProductoData(newData);
  };

  const handleEliminarArticulo = (id_producto) => { 
    fetch(`http://localhost:5000/deleteCarrito/${id_producto}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => res.json())
    .then((data) => {
        
      console.log('Element deleted:', data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error deleting element:', error);
    });
  }; 


  const totalPrecio = productoData.reduce((total, producto) => total + producto.total_price, 0);

  return (
    <div>
      <div className='banner'>
        <h2 className='subt'>
          Carrito de Compra
        </h2>
      </div>

      <div className='contenedor-productos'>
        {productoData.map((row, index) =>  (
          <div className="producto" key={index}>
                {row.img_prod && (
              <img class="imagen-producto"
                src={URL.createObjectURL(new Blob([new Uint8Array(row.img_prod.data)]))}
                alt="Descripción de la imagen"
              />
                )}
        
            <h1 className="titulo-producto">{row.nombreP}</h1>
            <p className="descripcion">{row.descripcion}</p>
            <div>
              <p>Cantidad: {row.count_id_producto}</p>
              <div className="acciones">
                <button
                  className="boton-aumentar"
                >
                  -
                </button>
                <button
                  className="boton-aumentar"
                  onClick={() => handleAumentarCantidad(row.id_producto)}
                >
                  +
                </button>
              </div>
              <br />
            </div>
            
            <p>Subtotal: ${row.total_price}</p>

          </div>
        ))}
        <p>Total: ${totalPrecio} </p>
        <div className="acciones-carrito">
          <button className="boton-confirmar" onClick={handleConfirmarCompra}>Confirmar Compra</button>
        </div>
      </div>
    </div>
  );
}

export default CarritoDeCompra;
