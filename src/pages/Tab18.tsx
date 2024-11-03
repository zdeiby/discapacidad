import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonSelect, IonList, IonInput, IonButton, IonItem, IonLabel,
  IonBadge, IonSelectOption, IonText,
  IonIcon
} from '@ionic/react';
import './Tab1.css';
import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';
import axios from 'axios';
import loadSQL from '../models/database';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Person {
  id_usuario: string | null;
  fecharegistro: string | null;
  usuario: string | null;
  estado: string | null;
  tabla: string | null;
  año_diligenciamiento: string | null;
  mes_diligenciamiento: string | null;
  dia_diligenciamiento: string | null;
  fechadiligencia: string | null;
  persona_brinda_informacion: string | null;
  nombre_persona_brinda_informacion: string | null;
  relacion_persona_discapacidad: string | null;
  modalidad_atencion: string | null;
  origen_visita: string | null;
  otro_origen_visita: string | null;
  origen_visita_cual: string | null;
  proyecto: string | null;
}




const Tab18: React.FC = () => {


  const getCurrentDateTime = () => {
    const date = new Date();
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const day = String(date.getDate()).padStart(2, '0');
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getYearPostulacion = () => {
    return new Date().getFullYear();
  };
  

  const params = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [db, setDb] = useState<any>(null);
  const [items, setItems] = useState({
    id_usuario: params.ficha,
    fecharegistro: getCurrentDateTime(),
    usuario: localStorage.getItem('cedula'),
    estado: '1',
    tabla: 'discapacidad_capitulo_0', 
    año_diligenciamiento: getYearPostulacion(), 
    mes_diligenciamiento: (new Date()).getMonth() + 1, 
    dia_diligenciamiento: (new Date()).getDate(), 
    fechadiligencia: '',
    persona_brinda_informacion: '',
    nombre_persona_brinda_informacion: '',
    relacion_persona_discapacidad: '',
    modalidad_atencion: '',
    origen_visita: '',
    otro_origen_visita: '',
    origen_visita_cual: '',
    proyecto: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    loadSQL(setDb, fetchUsers);
  }, []);

 


  const saveDatabase = () => {
    if (db) {
      const data = db.export();
      localStorage.setItem('sqliteDb', JSON.stringify(Array.from(data)));
      const request = indexedDB.open('myDatabase', 1); // Asegúrate de usar el mismo nombre de base de datos
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('sqliteStore')) {
          db.createObjectStore('sqliteStore');
        }
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['sqliteStore'], 'readwrite');
        const store = transaction.objectStore('sqliteStore');
        const putRequest = store.put(data, 'sqliteDb');
  
        putRequest.onsuccess = () => {
          console.log('Data saved to IndexedDB');
        };
  
        putRequest.onerror = (event) => {
          console.error('Error saving data to IndexedDB:', event.target.error);
        };
      };
  
      request.onerror = (event) => {
        console.error('Failed to open IndexedDB:', event.target.error);
      };
    }
  };



  const fetchUsers = async (database = db) => {
    if (db) {
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_0  where id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setButtonDisabled((transformedPeople[0].estado)?false:true); 
    
      }else{
        setItems({
          id_usuario: params.ficha,
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: '1',
          tabla: 'discapacidad_capitulo_0',
          año_diligenciamiento: getYearPostulacion(),
          mes_diligenciamiento: (new Date()).getMonth() + 1,
          dia_diligenciamiento: (new Date()).getDate(),
          fechadiligencia: '',
          persona_brinda_informacion: '',
          nombre_persona_brinda_informacion: '',
          relacion_persona_discapacidad: '',
          modalidad_atencion: '',
          origen_visita: '',
          otro_origen_visita: '',
          origen_visita_cual: '',
          proyecto: ''
        });
      }
    }

  };



  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (people.length > 0) {
      let data = people[0] || {};
      setItems({
        id_usuario: data.id_usuario || params.ficha,
        fecharegistro: data.fecharegistro || getCurrentDateTime(),
        usuario: data.usuario || localStorage.getItem('cedula'),
        estado: data.estado || '1',
        tabla: data.tabla || 'discapacidad_capitulo_0',
        año_diligenciamiento: data.año_diligenciamiento || new Date().getFullYear(),
        mes_diligenciamiento: data.mes_diligenciamiento || (new Date().getMonth() + 1).toString().padStart(2, '0'),
        dia_diligenciamiento: data.dia_diligenciamiento || new Date().getDate().toString().padStart(2, '0'),
        fechadiligencia: data.fechadiligencia || '',
        persona_brinda_informacion: data.persona_brinda_informacion || '',
        nombre_persona_brinda_informacion: data.nombre_persona_brinda_informacion || '',
        relacion_persona_discapacidad: data.relacion_persona_discapacidad || '',
        modalidad_atencion: data.modalidad_atencion || '',
        origen_visita: data.origen_visita || '',
        otro_origen_visita: data.otro_origen_visita || '',
        origen_visita_cual: data.origen_visita_cual || '',
        proyecto: data.proyecto || ''
      });
    }
  }, [people]); // Ejecuta este efecto cuando `people` cambia
  

// Llamar a `fetchUsers` en el momento adecuado
useEffect(() => {
  fetchUsers();
}, [db]); // Ejecuta este efecto cuando `db` cambia

  //saveDatabase();    para guardar la db



  const handleInputChange = (event, field) => {
    const { value } = event.target;

    setItems((prevItems) => {
      const newState = { ...prevItems, [field]: value };

      // Lógica para manejar el campo 'persona_brinda_informacion'
      if (field === 'persona_brinda_informacion') {
        if (value === '3') {
          // Si 'persona_brinda_informacion' es '3', no cambiamos los valores de 'nombre_persona_brinda_informacion' y 'relacion_persona_discapacidad'
        } else {
          // Si no es '3', limpiamos los campos
          newState.nombre_persona_brinda_informacion = '';
          newState.relacion_persona_discapacidad = '';
        }
      }

      // Lógica para manejar el campo 'origen_visita'
      if (field === 'origen_visita') {
        if (value === '3') {
          // Si 'origen_visita' es '3', no cambiamos el valor de 'otro_origen_visita'
        } else {
          // Si no es '3', limpiamos el campo 'otro_origen_visita'
          newState.otro_origen_visita = '';
        }
      }

      return newState;
    });
};


 useEffect(() => {
    console.log("Items updated:", items);
    // Aquí puedes realizar cualquier acción que dependa de que `items` esté actualizado
  }, [items]);

  const validarCampos = () => {
   const camposObligatorios = [
      'fechadiligencia', 
      'persona_brinda_informacion', 
      'modalidad_atencion', 
      'origen_visita',
      'proyecto'
    ];
    for (let campo of camposObligatorios) {
      if (!items[campo]) {
        return false;
      }
    }
    return true;
  };


  const enviar = async (database = db,event: React.MouseEvent<HTMLButtonElement>) => {
  // event.preventDefault();
   if (!validarCampos()) {
   // alert('Por favor, completa todos los campos obligatorios.');
    return;
  }
  event.preventDefault();
    try {
      await db.exec(`
        INSERT OR REPLACE INTO discapacidad_capitulo_0 
        (id_usuario, fecharegistro, usuario, estado, tabla, año_diligenciamiento, mes_diligenciamiento, dia_diligenciamiento, fechadiligencia, persona_brinda_informacion, nombre_persona_brinda_informacion, relacion_persona_discapacidad, modalidad_atencion, origen_visita, otro_origen_visita, origen_visita_cual, proyecto)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
        [
          items.id_usuario, items.fecharegistro, items.usuario, items.estado, items.tabla, items.año_diligenciamiento, items.mes_diligenciamiento,
          items.dia_diligenciamiento, items.fechadiligencia, items.persona_brinda_informacion, items.nombre_persona_brinda_informacion,
          items.relacion_persona_discapacidad, items.modalidad_atencion, items.origen_visita, items.otro_origen_visita, items.origen_visita_cual,
          items.proyecto
        ]
      );
      console.log('Datos guardados con éxito');
     // alert('Datos guardados correctamente');
          setButtonDisabled(false);
          saveDatabase();
          alert('Datos Guardados con éxito');
        }
           catch (err) {
      console.error('Error al exportar los datos JSON:', err);
    }
  }

  
  
  return (
    <IonPage>
      <IonHeader><div className='col-12'>
        <IonToolbar>
          <IonTitle slot="start">INFORMACIÓN DILIGENCIAMIENTO</IonTitle>
          <IonTitle slot="end">ID_USUARIO: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar></div>
      </IonHeader>
      <IonContent fullscreen><form>
        
       
      <div className=' shadow p-3 mb-5 bg-white rounded'>
      <IonList>
<div className="row g-3 was-validated ">
          <div className="col-sm-6">
            <label  className="form-label">Fecha Diligenciamiento</label>
            <input onChange={(e) => handleInputChange(e, 'fechadiligencia')}  value={items.fechadiligencia} type="date" placeholder="" className="form-control form-control-sm  "  required/>
          </div>
        </div>
</IonList>
<IonList>
<div className="row g-3 was-validated ">
        <div className="col-sm">
            <label  className="form-label">Persona que brinda la información</label>
            <select onChange={(e) => handleInputChange(e, 'persona_brinda_informacion')}  value={items.persona_brinda_informacion} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
              <option value=""> SELECCIONE </option><option value="1"> La Persona con Discapacidad </option><option value="3"> Otra. ¿Quién? </option><option value="2"> Representante legal/Persona cuidadora/Familiar </option>  
            </select>
          </div>
          {items.persona_brinda_informacion == '3' && (
            <>
          <div className="col-sm">
            <label  className="form-label">Otra. ¿Quién (nombre)?</label>
            <input onChange={(e) => handleInputChange(e, 'nombre_persona_brinda_informacion')}  value={items.nombre_persona_brinda_informacion} type="text" placeholder="" className="form-control form-control-sm  "  required/>
          </div>
          <div className="col-sm">
            <label  className="form-label">Relación con la persona con discapacidad</label>
            <input onChange={(e) => handleInputChange(e, 'relacion_persona_discapacidad')}  value={items.relacion_persona_discapacidad} type="text" placeholder="" className="form-control form-control-sm  "  required/>
          </div>
          </>
           )}  
        </div>
</IonList>

<IonList>
<div className="row g-3 was-validated">
          <div className="col-sm">
            <label  className="form-label">Modalidad de la Atención</label>
            <select onChange={(e) => handleInputChange(e, 'modalidad_atencion')}  value={items.modalidad_atencion} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
              <option value=""> SELECCIONE </option><option value="1"> Presencial </option><option value="3"> Telefónica </option><option value="2"> Virtual </option>
            </select>
          </div>
          <div className="col-sm">
            <label  className="form-label">Origen de la Visita:</label>
            <select onChange={(e) => handleInputChange(e, 'origen_visita')}  value={items.origen_visita} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
              <option value=""> SELECCIONE </option><option value="2"> Atencion Prioritaria </option><option value="3"> Otra </option><option value="1"> Persona Postulada en el año actual (vigencia del proyecto) </option>  
            </select>
          </div>
          {items.origen_visita == '3' && (
          <div className="col-sm">
            <label  className="form-label">Otro ¿Cual?</label>
            <input  onChange={(e) => handleInputChange(e, 'otro_origen_visita')}  value={items.otro_origen_visita} type="text" placeholder="" className="form-control form-control-sm  "  required/>
          </div> 
           )} 
        </div>
</IonList>
<IonList>
<div className="row g-3 was-validated">
          <div className="col-sm">
            <label  className="form-label">Proyecto</label>
            <input  onChange={(e) => handleInputChange(e, 'proyecto')}  value={items.proyecto} type="text" placeholder="" className="form-control form-control-sm  "  required/>
          </div>  
        </div>
</IonList>

</div>


    <br />
       <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
       <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab2/${params.ficha}`;} }}> Siguiente</div>
       </div> 
           </form>
      </IonContent>
    </IonPage>

  );
};

export default Tab18;