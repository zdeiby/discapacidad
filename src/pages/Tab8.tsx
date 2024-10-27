import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React, { useEffect, useState } from 'react';
import EmployeeItem from '../components/EmployeeItem';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonSelect, IonList, IonInput, IonButton, IonItem, IonLabel,
  IonBadge, IonSelectOption, IonText, IonDatetimeButton, IonModal, IonDatetime,
  IonIcon
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadSQL from '../models/database';

interface Person {
  id_usuario: number;
  ideas_suicidas: string | null;
  intento_de_suicidio: string | null;
  hospitalizacion_por_psiquiatria: string | null;
  tristeza_extrema_y_permanente: string | null;
  ansiedad_constante_que_afecta_desarrollo: string | null;
  trastornos_alimenticios: string | null;
  consumo_sustancias_psicoactivas: string | null;
  cambios_importantes_en_la_personalidad: string | null;
  alteraciones_permanentes_estado_del_sueño: string | null;
  otro_cuales: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}



const Tab8: React.FC = () => {
  const params = useParams();
 
  const [people, setPeople] = useState<Person[]>([]);
  const [db, setDb] = useState<any>(null);
  const [items, setItems] = useState({
    id_usuario: '',
    ideas_suicidas: '',
    intento_de_suicidio: '',
    hospitalizacion_por_psiquiatria: '',
    tristeza_extrema_y_permanente: '',
    ansiedad_constante_que_afecta_desarrollo: '',
    trastornos_alimenticios: '',
    consumo_sustancias_psicoactivas: '',
    cambios_importantes_en_la_personalidad: '',
    alteraciones_permanentes_estado_del_sueño: '',
    otro_cuales: '',
    fecharegistro: '',
    usuario: '',
    estado: '',
    tabla: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    loadSQL(setDb, fetchUsers);
  }, []);

  const saveDatabase = () => {
    if (db) {
      const data = db.export();
      localStorage.setItem('sqliteDb', JSON.stringify(Array.from(data)));
      const request = indexedDB.open('myDatabase', 1);

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
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_4 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setButtonDisabled((transformedPeople[0].ideas_suicidas) ? false : true);
      } else {
        setItems({
          id_usuario: params.ficha,
          ideas_suicidas: '1',
          intento_de_suicidio: '1',
          hospitalizacion_por_psiquiatria: '1',
          tristeza_extrema_y_permanente: '1',
          ansiedad_constante_que_afecta_desarrollo: '1',
          trastornos_alimenticios: '1',
          consumo_sustancias_psicoactivas: '1',
          cambios_importantes_en_la_personalidad: '1',
          alteraciones_permanentes_estado_del_sueño: '1',
          otro_cuales: '1',
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula') ,
          estado: '1',
          tabla: 'discapacidad_capitulo_4',
        });
      }
    }
  };
  

  const getCurrentDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (people.length > 0) {
      let data = people[0] || {};
      setItems({
        id_usuario: data.id_usuario || parseInt(params.ficha),
        ideas_suicidas: data.ideas_suicidas || '',
        intento_de_suicidio: data.intento_de_suicidio || '',
        hospitalizacion_por_psiquiatria: data.hospitalizacion_por_psiquiatria || '',
        tristeza_extrema_y_permanente: data.tristeza_extrema_y_permanente || '',
        ansiedad_constante_que_afecta_desarrollo: data.ansiedad_constante_que_afecta_desarrollo || '',
        trastornos_alimenticios: data.trastornos_alimenticios || '',
        consumo_sustancias_psicoactivas: data.consumo_sustancias_psicoactivas || '',
        cambios_importantes_en_la_personalidad: data.cambios_importantes_en_la_personalidad || '',
        alteraciones_permanentes_estado_del_sueño: data.alteraciones_permanentes_estado_del_sueño || '',
        otro_cuales: data.otro_cuales || '',
        fecharegistro: data.fecharegistro || '',
        usuario: data.usuario || 0,
        estado: data.estado || 1,
        tabla: data.tabla || 'discapacidad_capitulo_4',
      });
    }
  }, [people]);
  

  useEffect(() => {
    fetchUsers();
  }, [db]);

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setItems((prevItems) => {
      const newState = { ...prevItems, [field]: value };
     

      
      return newState;
    });
  };

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  const validarCampos = () => {
    //const camposObligatorios = ['tenenciadelavivienda', 'unidadproductuva','cualunidadproductiva'];
  //   if (items.tenenciadelavivienda === '2' || items.tenenciadelavivienda === '3') {
  //     camposObligatorios.push('propietario');
  //   }
  //   if (items.unidadproductuva === '1') {
  //     let index = camposObligatorios.indexOf('cualunidadproductiva');
  //     if (index !== -1) {
  //         camposObligatorios.splice(index, 1);
  //     }
  // }
  
  
    // for (let campo of camposObligatorios) {
    //   if (!items[campo]) {
    //     return false;
    //   }
    // }
    return true;
  };
  

  const enviar = async (database = db,event: React.MouseEvent<HTMLButtonElement>) => {
    if (!validarCampos()) {
      // alert('Por favor, completa todos los campos obligatorios.');
       return;
     }
     event.preventDefault();
    console.log(items)
    try {
      await db.exec(
        `INSERT OR REPLACE INTO discapacidad_capitulo_4 (
          id_usuario, 
          ideas_suicidas, 
          intento_de_suicidio, 
          hospitalizacion_por_psiquiatria, 
          tristeza_extrema_y_permanente, 
          ansiedad_constante_que_afecta_desarrollo, 
          trastornos_alimenticios, 
          consumo_sustancias_psicoactivas, 
          cambios_importantes_en_la_personalidad, 
          alteraciones_permanentes_estado_del_sueño, 
          otro_cuales, 
          fecharegistro, 
          usuario, 
          estado, 
          tabla
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          items.id_usuario,
          items.ideas_suicidas,
          items.intento_de_suicidio,
          items.hospitalizacion_por_psiquiatria,
          items.tristeza_extrema_y_permanente,
          items.ansiedad_constante_que_afecta_desarrollo,
          items.trastornos_alimenticios,
          items.consumo_sustancias_psicoactivas,
          items.cambios_importantes_en_la_personalidad,
          items.alteraciones_permanentes_estado_del_sueño,
          items.otro_cuales,
          items.fecharegistro,
          items.usuario,
          items.estado,
          items.tabla
        ]
      );
    
      const respSelect = db.exec(`SELECT * FROM "discapacidad_capitulo_4" WHERE id_usuario="${items.id_usuario}";`);
      setButtonDisabled(false);
      saveDatabase();
      alert('Datos Guardados con éxito');
    } catch (err) {
      console.error('Error al exportar los datos JSON:', err);
    }
    
  };

  function sololectura() {
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">CAPITULO IV. SALUD MENTAL</IonTitle>
          <IonTitle slot="end">FICHA: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form>
      {/* <div className="social-card">
      <span className="label">Ficha:</span>
      <span className="value">{params.ficha}</span> 
    </div>*/}

       
        <div className=' shadow p-3 mb-2 pt-0 bg-white rounded'>
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">CAPITULO IV. SALUD MENTAL</span>
            </div>
            <div className="alert alert-warning" role="alert">
                    <span className="badge badge-warning"><b className='text-dark'>IMPORTANTE:</b></span> Este capítulo aplica para mayores de <strong>5 años</strong>, si el ciudadano es menor, todos los campos estarán deshabilitados y debes dar clic en guardar para continuar. La edad del ciudadano es de <strong> 38 años </strong>.
                </div>
            <div className="row g-3 was-validated ">
              
              <div className="col-sm-6">
                <label htmlFor="">Durante los últimos 6 meses ha presentado:</label><br />
                <label className="form-label">4.1 Ideas suicidas:</label>
                <select onChange={(e) => handleInputChange(e, 'ideas_suicidas')} value={items.ideas_suicidas} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
              <label htmlFor=""></label><br />
                <label className="form-label">4.2 Intento de suicidio:</label>
                <select onChange={(e) => handleInputChange(e, 'intento_de_suicidio')} value={items.intento_de_suicidio}className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">4.3 Hospitalización por psiquiatría:</label>
                <select onChange={(e) => handleInputChange(e, 'hospitalizacion_por_psiquiatria')} value={items.hospitalizacion_por_psiquiatria} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">4.4 Tristeza extrema y permanente:</label>
                <select onChange={(e) => handleInputChange(e, 'tristeza_extrema_y_permanente')} value={items.tristeza_extrema_y_permanente} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">4.5 Ansiedad constante que afecta el desarrollo de actividades cotidianas:</label>
                <select onChange={(e) => handleInputChange(e, 'ansiedad_constante_que_afecta_desarrollo')} value={items.ansiedad_constante_que_afecta_desarrollo} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">4.6 Trastornos alimenticios:</label>
                <select onChange={(e) => handleInputChange(e, 'trastornos_alimenticios')} value={items.trastornos_alimenticios} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">4.7 Consumo de sustancias psicoactivas:</label>
                <select onChange={(e) => handleInputChange(e, 'consumo_sustancias_psicoactivas')} value={items.consumo_sustancias_psicoactivas} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">4.8 Cambios importantes en la personalidad:</label>
                <select onChange={(e) => handleInputChange(e, 'cambios_importantes_en_la_personalidad')} value={items.cambios_importantes_en_la_personalidad} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div> <div className="col-sm-6">
                <label className="form-label">4.9 Alteraciones permanentes en el estado del sueño:</label>
                <select onChange={(e) => handleInputChange(e, 'alteraciones_permanentes_estado_del_sueño')} value={items.alteraciones_permanentes_estado_del_sueño} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Otros ¿Cuáles?:</label>
                <select onChange={(e) => handleInputChange(e, 'otro_cuales')} value={items.otro_cuales} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" >
                <option value="1"> NO </option><option value="2"> SI </option>
                </select>
              </div>
           
              
            </div>
          </IonList>
         

        </div>


        <br />

        {/* <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton disabled={buttonDisabled} routerLink={`/tabs/tab9/${params.ficha}`}>Siguiente</IonButton></div> */}

        <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
       <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab7/${params.ficha}`;} }}> Siguiente</div>
       </div>
       </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab8;
