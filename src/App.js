import React, { useState, useEffect, Fragment } from "react";
import "./App.css";


function Cita({cita, index,eliminarCita}) {
  return(
    <div className='cita'>
      <p>Mascota:<span>{cita.mascota}</span></p>
      <p>Dueño:<span>{cita.propietario}</span></p>
      <p>Fecha:<span>{cita.fecha}</span></p>
      <p>Hora:<span>{cita.hora}</span></p>
      <p>Sintomas:<span>{cita.sintomas}</span></p>
      <button  onClick={()=> eliminarCita(index)} type='button' className='button eliminar u-full-width'>Eliminar X</button>
    </div>
  )
}


function Formulario({crearCita}) {

  const stateInicial={
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:''
  }
// cita= state actual
//actualizarCita= funcion que cambia el state
  const [cita, actualizarCitas] = useState(stateInicial);
  
//actualiza el state
  const actualizarState= e =>{
    actualizarCitas({
      ...cita,
      [e.target.name]: e.target.value
    })
  }
  // pasamos la cita al coponente principal
  const enviarCita= e=>{
    e.preventDefault();
    //pasar la cita al componente principal
    console.log(cita)
    crearCita(cita)

    //reiniciar el state(reiniciando el form)
    actualizarCitas(stateInicial)

}
  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form onSubmit={enviarCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={actualizarState}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input type="date" className="u-full-width" name="fecha" onChange={actualizarState} value={cita.fecha}/>
        

        <label>Hora</label>
        <input type="time" className="u-full-width" name="hora" onChange={actualizarState} value={cita.hora}/>

        <label>Sintomas</label>
        <textarea className="u-full-width" name="sintomas" onChange={actualizarState} value={cita.sintomas}></textarea>

        <button type="submit" className="button-primary u-full-width">
          Agregar
        </button>
      </form>
    </Fragment>
  );
}

function App() {
  // cargar las citas del localStoral como state inicial, o sea que se guarden siempre 
  let citasIniciales= JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales=[];
  }
  //useState retorna dos funciones
  //el state actual= this.state;
  //funcion que actualiza el state this.setState():

  const [citas, guardarCitas] = useState(citasIniciales);
  console.log(citas);

  //agregar las nuevas citas al state
  const crearCita= cita =>{
    //tomar una copia del state y agregar el nuevo cliente
    const nuevasCitas=[...citas,cita];

    console.log(nuevasCitas);
    //almacenamos en  el state
    guardarCitas(nuevasCitas);
  }

  //Elimina las citas  del State

  const eliminarCita=index=>{
    const nuevasCitas=[...citas];
    nuevasCitas.splice(index,1)
    guardarCitas(nuevasCitas)
  }

  useEffect(()=>{
    let citasIniciales= JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas' , JSON.stringify([]));
    }
  },[citas])

  //cargar condicionalmente un aviso
  const titulo= Object.keys(citas).length===0? 'no hay citas': 'Administrar las citas aqui';
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
            crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index)=>(
              <Cita
              key={index}
              index={index}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
