import '../Pagina404/P404.css'

const paginaI=()=>{
  window.location.href = '/';
}

function P404 () {
  return (
    <container className='fourohfour'>
      
      <div className='text'>
      <div className='img'>
        <h1>La página no existe.</h1>
        <br/>
        <font color="black" face="Comic Sans MS,arial">
        <h3 > Por favor vaya a la página de inicio de "COMUNIDAD PARA ADULTOS MAYORES" haciendo clic en el botón de abajo</h3>
        </font>
        <br/>
        <button type="button" class=" btn btn-success m-2" onClick={paginaI}>Página de Inicio</button>
      </div>
      </div>
    </container>
  )
}

export default P404;