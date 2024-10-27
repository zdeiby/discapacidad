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
  id_usuario: number;
  participa_actividades_con_familia_amigos: string | null;
  participa_actividades_con_comunidad: string | null;
  participa_actividades_religiosas: string | null;
  participa_actividades_productivas: string | null;
  participa_actividades_deportivas_recreacion: string | null;
  participa_actividades_culturales: string | null;
  participa_actividades_trabajo_des_humano: string | null;
  participa_actividades_ciudadanas: string | null;
  participa_actividades_otras: string | null;
  participa_actividades_ninguna: string | null;
  participa_programas_del_inder: string | null;
  participa_en_alguna_organizacion: string | null;
  señale_porque_no_participa_en_organizacion: string | null;
  participa_en_org_personas_discapacidad: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}





const Tab1: React.FC = () => {


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
  const [items, setItems] = useState<Person>({
    id_usuario: parseInt(params.ficha),
    participa_actividades_con_familia_amigos: '',
    participa_actividades_con_comunidad: '',
    participa_actividades_religiosas: '',
    participa_actividades_productivas: '',
    participa_actividades_deportivas_recreacion: '',
    participa_actividades_culturales: '',
    participa_actividades_trabajo_des_humano: '',
    participa_actividades_ciudadanas: '',
    participa_actividades_otras: '',
    participa_actividades_ninguna: '',
    participa_programas_del_inder: '',
    participa_en_alguna_organizacion: '',
    señale_porque_no_participa_en_organizacion: '',
    participa_en_org_personas_discapacidad: '',
    fecharegistro: getCurrentDateTime(),
    usuario: parseInt(localStorage.getItem('cedula') || '0'),
    estado: 1,
    tabla: 'discapacidad_capitulo_6'
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
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_6 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setButtonDisabled((transformedPeople[0].estado) ? false : true);
      } else {
        setItems({
          id_usuario: parseInt(params.ficha),
          participa_actividades_con_familia_amigos: '1',
          participa_actividades_con_comunidad: '1',
          participa_actividades_religiosas: '1',
          participa_actividades_productivas: '1',
          participa_actividades_deportivas_recreacion: '1',
          participa_actividades_culturales: '1',
          participa_actividades_trabajo_des_humano: '1',
          participa_actividades_ciudadanas: '1',
          participa_actividades_otras: '1',
          participa_actividades_ninguna: '1',
          participa_programas_del_inder: '',
          participa_en_alguna_organizacion: '1',
          señale_porque_no_participa_en_organizacion: '',
          participa_en_org_personas_discapacidad: '1',
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: 1,
          tabla: 'discapacidad_capitulo_6'
        });
      }
    }
  };
  



  useEffect(() => {
    if (people.length > 0) {
      let data = people[0] || {};
      setItems({
        id_usuario: data.id_usuario || parseInt(params.ficha),
        participa_actividades_con_familia_amigos: data.participa_actividades_con_familia_amigos || '',
        participa_actividades_con_comunidad: data.participa_actividades_con_comunidad || '',
        participa_actividades_religiosas: data.participa_actividades_religiosas || '',
        participa_actividades_productivas: data.participa_actividades_productivas || '',
        participa_actividades_deportivas_recreacion: data.participa_actividades_deportivas_recreacion || '',
        participa_actividades_culturales: data.participa_actividades_culturales || '',
        participa_actividades_trabajo_des_humano: data.participa_actividades_trabajo_des_humano || '',
        participa_actividades_ciudadanas: data.participa_actividades_ciudadanas || '',
        participa_actividades_otras: data.participa_actividades_otras || '',
        participa_actividades_ninguna: data.participa_actividades_ninguna || '',
        participa_programas_del_inder: data.participa_programas_del_inder || '',
        participa_en_alguna_organizacion: data.participa_en_alguna_organizacion || '',
        señale_porque_no_participa_en_organizacion: data.señale_porque_no_participa_en_organizacion || '',
        participa_en_org_personas_discapacidad: data.participa_en_org_personas_discapacidad || '',
        fecharegistro: data.fecharegistro || getCurrentDateTime(),
        usuario: data.usuario || parseInt(localStorage.getItem('cedula') || '0'),
        estado: data.estado || 1,
        tabla: data.tabla || 'discapacidad_capitulo_6'
      });
    }
  }, [people]);
  
  

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
      // if (field === 'persona_brinda_informacion') {
      //   if (value === '3') {
      //     // Si 'persona_brinda_informacion' es '3', no cambiamos los valores de 'nombre_persona_brinda_informacion' y 'relacion_persona_discapacidad'
      //   } else {
      //     // Si no es '3', limpiamos los campos
      //     newState.nombre_persona_brinda_informacion = '';
      //     newState.relacion_persona_discapacidad = '';
      //   }
      // }

      // // Lógica para manejar el campo 'origen_visita'
      // if (field === 'origen_visita') {
      //   if (value === '3') {
      //     // Si 'origen_visita' es '3', no cambiamos el valor de 'otro_origen_visita'
      //   } else {
      //     // Si no es '3', limpiamos el campo 'otro_origen_visita'
      //     newState.otro_origen_visita = '';
      //   }
      // }

      return newState;
    });
};


 useEffect(() => {
    console.log("Items updated:", items);
    // Aquí puedes realizar cualquier acción que dependa de que `items` esté actualizado
  }, [items]);

  const validarCampos = () => {
  //  const camposObligatorios = [
  //     'fechadiligencia', 
  //     'persona_brinda_informacion', 
  //     'modalidad_atencion', 
  //     'origen_visita',
  //     'proyecto'
  //   ];
  //   for (let campo of camposObligatorios) {
  //     if (!items[campo]) {
  //       return false;
  //     }
  //   }
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
    await db.exec(
      `
      INSERT OR REPLACE INTO discapacidad_capitulo_6 
      (id_usuario, participa_actividades_con_familia_amigos, participa_actividades_con_comunidad, participa_actividades_religiosas, 
      participa_actividades_productivas, participa_actividades_deportivas_recreacion, participa_actividades_culturales, 
      participa_actividades_trabajo_des_humano, participa_actividades_ciudadanas, participa_actividades_otras, 
      participa_actividades_ninguna, participa_programas_del_inder, participa_en_alguna_organizacion, 
      señale_porque_no_participa_en_organizacion, participa_en_org_personas_discapacidad, fecharegistro, usuario, estado, tabla)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        items.id_usuario,
        items.participa_actividades_con_familia_amigos,
        items.participa_actividades_con_comunidad,
        items.participa_actividades_religiosas,
        items.participa_actividades_productivas,
        items.participa_actividades_deportivas_recreacion,
        items.participa_actividades_culturales,
        items.participa_actividades_trabajo_des_humano,
        items.participa_actividades_ciudadanas,
        items.participa_actividades_otras,
        items.participa_actividades_ninguna,
        items.participa_programas_del_inder,
        items.participa_en_alguna_organizacion,
        items.señale_porque_no_participa_en_organizacion,
        items.participa_en_org_personas_discapacidad,
        items.fecharegistro,
        items.usuario,
        items.estado,
        items.tabla
      ]
    );
  
    console.log('Datos guardados con éxito');
    setButtonDisabled(false);
    saveDatabase();
    alert('Datos Guardados con éxito');
  } catch (err) {
    console.error('Error al exportar los datos JSON:', err);
  }
  
  }

  
  
  return (
    <IonPage>
      <IonHeader><div className='col-12'>
        <IonToolbar>
          <IonTitle slot="start">CAPÍTULO VI. PARTICIPACIÓN EN ACTIVIDADES</IonTitle>
          <IonTitle slot="end">ID_USUARIO: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar></div>
      </IonHeader>
      <IonContent fullscreen><form>
        
       
      <div className=' shadow p-3 mb-2 bg-white rounded'>
      <IonList>
        <div className="row g-3 was-validated ">
         
        <div className="alert alert-primary" role="alert">
            <span className="badge badge-secondary text-dark">CAPÍTULO VI. PARTICIPACIÓN EN ACTIVIDADES</span>
          </div>

          {/* Sección de actividades 6.1 */}
          <div className="row g-3">
            <div className="col-sm-12">
              <label>6.1 Participa en actividades:</label>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_con_familia_amigos">Con la familia y amigos:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_con_familia_amigos')}
                value={items.participa_actividades_con_familia_amigos}
                className="form-control form-control-sm"
                id="participa_actividades_con_familia_amigos"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_con_comunidad">Con la comunidad:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_con_comunidad')}
                value={items.participa_actividades_con_comunidad}
                className="form-control form-control-sm"
                id="participa_actividades_con_comunidad"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_religiosas">Religiosas o espirituales:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_religiosas')}
                value={items.participa_actividades_religiosas}
                className="form-control form-control-sm"
                id="participa_actividades_religiosas"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_productivas">Productivas:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_productivas')}
                value={items.participa_actividades_productivas}
                className="form-control form-control-sm"
                id="participa_actividades_productivas"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_deportivas_recreacion">Deportivas o de recreación:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_deportivas_recreacion')}
                value={items.participa_actividades_deportivas_recreacion}
                className="form-control form-control-sm"
                id="participa_actividades_deportivas_recreacion"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_culturales">Culturales:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_culturales')}
                value={items.participa_actividades_culturales}
                className="form-control form-control-sm"
                id="participa_actividades_culturales"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_trabajo_des_humano">Educación para el trabajo y desarrollo humano:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_trabajo_des_humano')}
                value={items.participa_actividades_trabajo_des_humano}
                className="form-control form-control-sm"
                id="participa_actividades_trabajo_des_humano"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_ciudadanas">Ciudadanas:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_ciudadanas')}
                value={items.participa_actividades_ciudadanas}
                className="form-control form-control-sm"
                id="participa_actividades_ciudadanas"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_otras">Otras:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_otras')}
                value={items.participa_actividades_otras}
                className="form-control form-control-sm"
                id="participa_actividades_otras"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="participa_actividades_ninguna">Ninguna:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_actividades_ninguna')}
                value={items.participa_actividades_ninguna}
                className="form-control form-control-sm"
                id="participa_actividades_ninguna"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          {/* Sección de preguntas adicionales 6.1.1 y 6.2 */}
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="participa_programas_del_inder">6.1.1 ¿Participa de los programas del INDER?:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_programas_del_inder')}
                value={items.participa_programas_del_inder}
                className="form-control form-control-sm"
                id="participa_programas_del_inder"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="participa__en_alguna_organizacion">6.2 ¿Actualmente participa en alguna organización? (Sólo para personas de 14 años y más) (Si la respuesta es SI, pase a 6.4):</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa__en_alguna_organizacion')}
                value={items.participa__en_alguna_organizacion}
                className="form-control form-control-sm"
                id="participa__en_alguna_organizacion"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          {/* Sección de razones para no participar en organizaciones */}
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="señale_porque_no_participa_en_organizacion">6.3 Señale la razón por la cual no participa en ninguna organización (Sólo para personas de 14 años y más):</label>
              <select
                onChange={(e) => handleInputChange(e, 'señale_porque_no_participa_en_organizacion')}
                value={items.señale_porque_no_participa_en_organizacion}
                className="form-control form-control-sm"
                id="señale_porque_no_participa_en_organizacion"
                required
              >
                  <option value=""> SELECCIONE </option><option value="1"> FALTA DE DINERO </option><option value="2"> FALTA DE TIEMPO </option><option value="6"> NO CREE EN ELLAS </option><option value="3"> NO EXISTE O NO LA CONOCE </option><option value="9"> OTRA </option><option value="5"> POR SU DISCAPACIDAD </option><option value="8"> PREFIERE RESOLVER SUS PROBLEMAS SÓLO </option><option value="4"> SIENTE RECHAZO </option><option value="7"> SUS PRINCIPIOS O CREENCIAS </option>   
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="participa_en_org_personas_discapacidad">6.4 ¿Participaría en una organización de y para personas con discapacidad?:</label>
              <select
                onChange={(e) => handleInputChange(e, 'participa_en_org_personas_discapacidad')}
                value={items.participa_en_org_personas_discapacidad}
                className="form-control form-control-sm"
                id="participa_en_org_personas_discapacidad"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>




        </div>
      </IonList>
      </div>


    <br />
       <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
       <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab8/${params.ficha}`;} }}> Siguiente</div>
       </div> 
           </form>
      </IonContent>
    </IonPage>

  );
};

export default Tab1;
