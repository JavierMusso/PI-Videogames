import React from "react";

function Home() {
  return (
    <div className="Home">
      <small>
        Input de búsqueda para encontrar videojuegos por nombre <br /> Área
        donde se verá el listado de videojuegos. Deberá mostrar su:
        <br /> *Imagen
        <br /> *Nombre
        <br /> *Géneros <br />
        Botones/Opciones para filtrar por género y por videojuego existente o
        agregado por nosotros
        <br /> Botones/Opciones para ordenar tanto ascendentemente como
        descendentemente los videojuegos por orden alfabético y por rating
        <br />
        Paginado para ir buscando y mostrando los siguientes videojuegos, 15
        juegos por pagina, mostrando los primeros 15 en la primer pagina.
      </small>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
