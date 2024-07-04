import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/pago.css';

const VentanaDePago = ({userdata}) => {

  const {id} = useParams();
  const [totalAPagar, setTotalAPagar] = useState(0);

  const navigate = useNavigate();

  const CLIENT_ID = 'AXRsWzTd5wo8LwFaCXuMekgn6PdwHmlpjKkwq52RFmSydmHxdXB-ywFBs6xeb1_dN5B6JHbIukp4vqHt';

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: totalAPagar, // Monto a pagar
        },
      }],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
        console.log('Pago completado:', details);

        const id_user = userdata.data.user.id_user;

        var venta = { id:id_user, total:totalAPagar, tipo_pago:"Paypal"};

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(venta)
        }

        fetch('http://localhost:5000/postVenta', requestInit)
        .then ((res) => res.json())
        .then ((res) => {
            console.log(res);
            alert('Pago realizado correctamente.')
            navigate('/')
        })
        .catch(err => { 
            console.error(err)
            alert('Pago no completado.')
        })
    
    });
  };

  useEffect( () => {
    fetch(`http://localhost:5000/getCarritoTotal/${(id)}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      }).then(
          response => response.json()
      ).then((data) => {
        if (data) {
            setTotalAPagar(data);
          
      } else {
        console.log('Invalid data format:', data);
      }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
    });
  }, [])

  return (
    <div>

      <div className='banner'>
        <h2 className='subt'>
          Detalles de Pago
        </h2>
      </div>
      <div className='contenedor-pago'>
        <div className='element'>
          <label>Total a Pagar:</label>
          <input
            type="number"
            value={totalAPagar}
          />
        </div>
        <div className='element'>
            <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                />
            </PayPalScriptProvider>
        </div>   
        
              
      </div>
      
    </div>
  );
};

export default VentanaDePago;
