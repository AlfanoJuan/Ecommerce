import React, { useState, useEffect } from "react";
import { AiFillStar } from 'react-icons/ai'
import "./Styles/producto.css"
import { useParams } from "react-router-dom";

function EditarProducto(){
    const { id } = useParams();

    const [image, setImage] = useState(null);

    const [productoForm, setproductoForm] = useState({
        nombreP: '',
        descripcion: '',
        precio: '',
        cant_disp: '',
    });


    const handleText = e => {
       
        setproductoForm({
          ...productoForm,
          [e.target.name]: e.target.value
        });

    }

    const handleImageChange = (event) => {
        const selectedImage = setImage(event.target.files[0]);

        if (selectedImage) {
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (selectedImage.size > maxSizeInBytes) {
                alert('Image size is too large. Please select a smaller image.');
                event.target.value = null; // Clear the input
                setImage(null); // Clear the state
            } else {
                setImage(selectedImage);
            }
        }
    };

    let {nombreP, descripcion, precio, cant_disp} = productoForm;

   

    useEffect ( () => { 
        fetch(`http://localhost:5000/geteditProducto/${id}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          }).then(
              response => response.json()
          ).then((data) => {
            console.log(data)
            
            setproductoForm({
                nombreP: data.nombreP,
                descripcion: data.descripcion,
                precio: data.precio,
                cant_disp: data.cant_disp,
            });
            
          })
          .catch((error) => {
            console.error('Fetch error:', error);
        });
            
        
    }, [id]) 

    const handleSubmit = (event) => {
        event.preventDefault();

        if ( nombreP === '' || descripcion === '' || precio === '' || cant_disp === '') {
            alert('Todos los campos son obligatorios')
            return
        }

        const formData = new FormData();
        formData.append('nombreP', nombreP);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('img_prod', image);
        formData.append('cant_disp', cant_disp);

        
        const requestInit = {
            method: 'PUT',
            body: formData
        }

        fetch(`http://localhost:5000/editProducto/${id}`, requestInit)
        .then ((res) => res.json())
        .then ((res) => {
            console.log(res);
        })
        .catch(err => { 
            console.error(err)
        })

        console.log(formData);
    }

    const handleSubmitDelete = (event) => {
        event.preventDefault();

        const requestInit = {
            method: 'DELETE'
        }

        fetch(`http://localhost:5000/deleteProduto/${id}`, requestInit)
        .then ((res) => res.json())
        .then ((res) => {
            console.log(res);
        })
        .catch(err => { 
            console.error(err)
        })

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div>
                        Producto:
                        <input 
                        type="text" 
                        name="nombreP" 
                        value={productoForm.nombreP} 
                        onChange={handleText}
                        />
                    </div>
                    <div>
                        Descripcion:
                        <textarea 
                        type="text" 
                        name="descripcion" 
                        value={productoForm.descripcion} 
                        onChange={handleText}
                        />
                    </div>
                    <div>
                        Precio:
                        <input 
                        type="number" 
                        name="precio" 
                        value={productoForm.precio} 
                        onChange={handleText}
                        />
                    </div>
                    <div>
                        Cantidad disponible:
                        <input 
                        type="number" 
                        name="cant_disp" 
                        value={productoForm.cant_disp} 
                        onChange={handleText}
                        />
                    </div>

                    <div className="form-group">
                                Load image: 
                                <input 
                                type="file"
                                className="form-control custom-input" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                id='fileinput'
                                />
                    </div>
                    {/* <div className="star-widgeet">
                        Rating:
                        {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;
                            
                            return(
                                <label>
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        value={currentRating}
                                        onClick={() => setRating(currentRating)}
                                    />
                                    <AiFillStar 
                                        className='star' 
                                        size={25}
                                        color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label> 
                            );  
                            
                        })}
                
                    </div> */}
                </div>
                <div className="boton-guardar">
                    <button type="submit" >Guardar Cambios</button> 
                    </div>

            </form>
            <div className="boton-guardar">
                    <button type="submit" onClick={handleSubmitDelete}>Borrar Producto</button> 
            </div>
        </div>
    );
}

export default EditarProducto;