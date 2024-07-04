import React, { useState, useEffect } from "react";
import './Styles/footer.css';

function Footer() {
  const [footerHTML, setFooterHTML] = useState(""); // Estado para almacenar el HTML del footer

  useEffect(() => {
    // Realiza una petición HTTP para cargar el archivo footer.html
    fetch("/footer.html")
      .then((response) => response.text())
      .then((html) => {
        setFooterHTML(html); // Actualiza el estado con el HTML cargado
      })
      .catch((error) => {
        console.error("Error al cargar el archivo footer.html", error);
      });
  }, []);

  return (
    <div>
      {/* Renderiza el contenido del footer utilizando dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: footerHTML }} />
    </div>
  );
}

export default Footer;