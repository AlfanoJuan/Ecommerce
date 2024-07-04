import React, { useState, useEffect } from "react";
import './Styles/categorias.css';


function Categorias() {


    const [categorias, setCategorias] = useState({
      nombre:"",
      descripcion:""
    })

    const [categoriasForm, setCategoriasForm] = useState({
        nombre:"",
        descripcion:""
      })
    
    const handleText = e => {
         
      setCategorias({
        ...categorias,
        [e.target.name]: e.target.value
      })
      console.log(categorias)
    }

    const handleTextEdit = e => {
         
        setCategorias({
          ...categorias,
          [e.target.name]: e.target.value
        })
        console.log(categorias)
      }
  
  
  const handleSubmit = (event)  => {
  
    let {nombre, descripcion} = categorias;
  
      event.preventDefault();
      if ( nombre === '' || descripcion === '' ) {
          alert('Todos los campos son obligatorios')
          return
      }


      const requestInit = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(categorias)
      }
  
      fetch('http://localhost:5000/postCategoria', requestInit)
      .then ((res) => res.json())
      .then ((res) => {
          console.log(res);
          alert('Categoria agregada correctamente.')

          setCategorias({
            nombre:"",
            descripcion:""
          })

          window.location.reload(); 
      })
      .catch(err => { 
          console.error(err)
          alert('Categoria no agregada.')
      })
  
  
  }
  

  const handleSubmitEdit = (id_categoria)  => {
  
    const categoriasxd = {nombre: categorias.nombre, descripcion: categorias.descripcion, id: id_categoria};
  
      if ( categorias.nombre === '' || categorias.descripcion === '' ) {
          alert('Todos los campos son obligatorios')
          return
      }


      const requestInit = {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(categoriasxd)
      }
      
      fetch('http://localhost:5000/EditCategoria', requestInit)
      .then ((res) => res.json())
      .then ((res) => {
          console.log(res);
          alert('Categoria agregada correctamente.')
        //   window.location.reload(); 
      })
      .catch(err => { 
          console.error(err)
          alert('Categoria no agregada.')
      })
  
  
  }

  
  

  const handleCategorias = (event)  => {
  
        event.preventDefault();
        // Obtener elementos del DOM
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


    const [idCategoria, setIdCategoria] = useState(null);
    
    console.log(idCategoria)

    const handleCategoriasEdit = (id_categoria)  => {


          event.preventDefault();
        // Obtener elementos del DOM
        var modal = document.getElementById('myModalEdit');
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

        setIdCategoria(id_categoria);

       

    }
   
  
    
    

    const [categoriasData, setCategoriasData] = useState([])
    

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await fetch('http://localhost:5000/getAllCategorias');
                const jsonData = await response.json();
                setCategoriasData(jsonData);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        obtenerDatos();
    }, []);
    
    const handleSubmitDelete = (id_categoria) => {
        
        const deletecat = { id: id_categoria }

        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(deletecat)
        }

        fetch('http://localhost:5000/deleteCategoria', requestInit)
        .then ((res) => res.json())
        .then ((res) => {
            console.log(res);
            window.location.reload(); 
        })
        .catch(err => { 
            console.error(err)
        })

    }

    
    return (
      <div>
    
      <div className="admin-container">
                  <div className="admin-header">
                      <h2>Administrar Categorias</h2>
                  </div>
                  <table id="categorias-table" className="admin-table">
                      <thead>
                          <tr>
                              <th>Nombre de Categoria</th>
                              <th>Descripcion</th>
                              <th>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(categoriasData) && categoriasData.length > 0 ? (
                            categoriasData.map(item => (
                                <tr key={item.id_categoria}>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>
                                    <td>
                                        <div className="admin-buttons" >
                                            <button onClick={() => handleSubmitDelete(item.id_categoria)}>Borrar</button>
                                            <button onClick={() => handleCategoriasEdit(item.id_categoria)}>Modificar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No hay datos disponibles</td>
                            </tr>
                        )}
                      </tbody>
                  </table>
                  <div className="admin-buttons">
                      <button onClick = {handleCategorias} > Agregar</button>
                  </div>
              </div>
  
              <div id="myModal" class="modal">
                    <div class="modal-content">
                    <span class="close">&times;</span>
                        <form onSubmit={handleSubmit}> 
                        <div>
                            Nombre Categoria:
                            <input type="text" name="nombre" onChange={handleText}/>
                        </div>
                        <div>
                            Descripcion:
                            <textarea type="text" name="descripcion" onChange={handleText}/>
                        </div>
                        <div className="boton-guardar">
                            <button type="submit" /* onClick={guardarProducto}*/>Guardar Categoria</button> 
                        </div>
                        </form>
                    </div>
                </div>

                <div id="myModalEdit" class="modal">
                    <div class="modal-content">
                    <span class="close">&times;</span>

    
                        <form onSubmit={() => handleSubmitEdit(idCategoria)}> 
                        <div>
                            Nombre Categoria:
                            <input type="text" name="nombre" value={categorias.nombre} onChange={handleTextEdit}/>
                        </div>
                        <div>
                            Descripcion:
                            <textarea type="text" name="descripcion"  value={categorias.descripcion} onChange={handleTextEdit}/>
                        </div>
                        <div className="boton-guardar">
                            <button type="submit" /* onClick={guardarProducto}*/>Guardar Categoria</button> 
                        </div>
                        </form>
                    </div>
                </div>
      </div>
    );
  }

export default Categorias;

