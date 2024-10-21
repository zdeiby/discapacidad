import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React, { useEffect, useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonInput, IonButton, IonItem, IonLabel
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import loadSQL from '../models/database';

interface Person {
  id_usuario: string | null;
  fecharegistro: string | null;
  usuario: string | null;
  estado: string | null;
  tabla: string | null;
  cuantas_personas_viven_hogar: string | null;
  cuantas_personas_viven_hogar_discapacidad: string | null;
  tiene_personas_a_cargo: string | null;
  numero_personas_a_cargo: string | null;
  recibe_servicio_icbf: string | null;
  beneficiario_programa: string | null;
  beneficiario_programa_otro: string | null;
  numero_personas_a_cargo_mayor60: string | null;
  numero_personas_a_cargo_menor12: string | null;
  con_quien_vive: string | null;

}




const Tab2: React.FC = () => {
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
  const getCurrentYear = (): number => {
    const date = new Date();
    return date.getFullYear();
  };
  const [people, setPeople] = useState<Person[]>([]);
  const params = useParams();
  const [db, setDb] = useState<any>(null);
  const [items, setItems] = useState<Person>({
    id_usuario: params.ficha,
    fecharegistro: getCurrentDateTime(),
    usuario: localStorage.getItem('cedula'),
    estado: '1',
    tabla: 'discapacidad_capitulo_1', 
    cuantas_personas_viven_hogar: '', 
    cuantas_personas_viven_hogar_discapacidad: '', 
    tiene_personas_a_cargo: '', 
    numero_personas_a_cargo: '', 
    recibe_servicio_icbf: '', 
    beneficiario_programa: '', 
    beneficiario_programa_otro: '', 
    numero_personas_a_cargo_mayor60: '', 
    numero_personas_a_cargo_menor12: '', 
    con_quien_vive: ''  
  });
  
  
  

  useEffect(() => {
    loadSQL(setDb, fetchUsers);
    
  }, []);

  useEffect(() => {
    console.log('Componente montado o actualizado');
    fetchUsers();
  }, [db, params.ficha]);
  
  
  
  

  const fetchUsers = async (database = db) => {
    if (db) {
      try {
        const res = await database.exec(`SELECT * FROM discapacidad_capitulo_1 WHERE id_usuario=${params.ficha}`);
        
        if (res[0]?.values && res[0]?.columns) {
          // Transforma los resultados de la consulta en objetos tipo Person
          const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
            return res[0].columns.reduce((obj, col, index) => {
              obj[col] = row[index];
              return obj;
            }, {} as Person);
          });
          
          if (transformedPeople.length > 0) {
            setItems(transformedPeople[0]); // Guardar el primer objeto en items
            console.log('Datos obtenidos:', transformedPeople[0]); // Verifica los datos
          }
        } else {
          // Si no se encuentran datos, configura los valores iniciales
          setItems({
            id_usuario: params.ficha,
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: '1',
          tabla: 'discapacidad_capitulo_1',
          con_quien_vive: '',
          cuantas_personas_viven_hogar: '',
          cuantas_personas_viven_hogar_discapacidad: '',
          tiene_personas_a_cargo: '',
          numero_personas_a_cargo_menor12: '',
          numero_personas_a_cargo_mayor60: '',
          numero_personas_a_cargo: '',
          recibe_servicio_icbf: '',
          beneficiario_programa: '',
          beneficiario_programa_otro: '',

          });
        }
      } catch (err) {
        console.error("Error en la consulta SQL:", err);
      }
    }
  };
  


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

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    
    setItems((prevItems) => {
      const newState = { ...prevItems, [field]: value };
  
      if (field === 'tiene_personas_a_cargo') {
        if (value === '2') { 
          newState.numero_personas_a_cargo_menor12 = '';
          newState.numero_personas_a_cargo_mayor60 = '';
        }
      }
    
      // Si selecciona "12" en beneficiario_programa, limpiar el campo beneficiario_programa_otro
      if (field === 'beneficiario_programa') {
        if (value != '12') {
          newState.beneficiario_programa_otro = '';
        }
      }
  
      return newState;
    });
  };


   const validarCampos = () => {
     let camposObligatorios = [
       'cuantas_personas_viven_hogar', 
       'cuantas_personas_viven_hogar_discapacidad', 
       'tiene_personas_a_cargo', 
       'recibe_servicio_icbf', 
       'beneficiario_programa'
     ];

     if (items.tiene_personas_a_cargo == '2') {
      camposObligatorios.push('numero_personas_a_cargo_menor12', 'numero_personas_a_cargo_mayor60');
    }
    if (items.tiene_personas_a_cargo === '1') {
      camposObligatorios = camposObligatorios.filter(campo => 
        campo !== 'numero_personas_a_cargo_menor12' && campo !== 'numero_personas_a_cargo_mayor60'
      );    }
  
    // Si beneficiario_programa es "12", agregar beneficiario_programa_otro como obligatorio
    if (items.beneficiario_programa == '12') {
      camposObligatorios.push('beneficiario_programa_otro');
    }else {
      // Si no es "12", quitar beneficiario_programa_otro de los obligatorios
      camposObligatorios = camposObligatorios.filter(campo => campo !== 'beneficiario_programa_otro');
    }
    console.log(camposObligatorios)

     for (let campo of camposObligatorios) {
       if (!items[campo]) {
         return false;
       }
     }
     return true;
   };
  

  const enviar = async (database = db, event: React.MouseEvent<HTMLButtonElement>) => {
    //event.preventDefault();
     if (!validarCampos()) {
       return;
     }
    event.preventDefault();
    try {
  await db.exec(`
  INSERT OR REPLACE INTO discapacidad_capitulo_1 
  (id_usuario, fecharegistro, usuario, estado, tabla, con_quien_vive, cuantas_personas_viven_hogar, cuantas_personas_viven_hogar_discapacidad, tiene_personas_a_cargo, numero_personas_a_cargo_menor12, numero_personas_a_cargo_mayor60, numero_personas_a_cargo, recibe_servicio_icbf, beneficiario_programa, beneficiario_programa_otro) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
  [
    items.id_usuario, 
    items.fecharegistro, 
    items.usuario, 
    items.estado, 
    items.tabla, 
    items.con_quien_vive, 
    items.cuantas_personas_viven_hogar, 
    items.cuantas_personas_viven_hogar_discapacidad, 
    items.tiene_personas_a_cargo, 
    items.numero_personas_a_cargo_menor12, 
    items.numero_personas_a_cargo_mayor60, 
    items.numero_personas_a_cargo, 
    items.recibe_servicio_icbf, 
    items.beneficiario_programa, 
    items.beneficiario_programa_otro
  ]
);

      saveDatabase();
      alert('Datos guardados correctamente');
    } catch (err) {
      console.error('Error al guardar los datos:', err);
    }
    
    
    
    
  };

 


  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">CAPITULO 1. INFORMACIÓN PERSONAL</IonTitle>
          <IonTitle slot="end">ID_INTEGRANTE: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
<form> 
        {/* <div className="social-card">
          <span className="label">: {params.ficha}</span>
          <span className="value"></span>
        </div> */}

        <br />

        <div className=' shadow p-3 mb-5 bg-white rounded'>
          <IonList>
          <div className="row g-3 was-validated">
            <div className="col-sm">
              <label className="form-label">1.12 Actualmente Vive</label>
              <select
                className="form-control form-control-sm"
                onChange={(e) => handleInputChange(e, 'con_quien_vive')}
                value={items.con_quien_vive}
                required
              >
                <option value="SOLO">SOLO</option>
                <option value="ACOMPAÑADO">ACOMPAÑADO</option>
              </select>
            </div>

            {/* 1.13 ¿Cuántas personas viven en este hogar? */}
            <div className="col-sm">
              <label className="form-label">1.13 ¿Cuántas personas viven en este hogar?</label>
              <input
                type="number"
                className="form-control form-control-sm"
                onChange={(e) => handleInputChange(e, 'cuantas_personas_viven_hogar')}
                value={items.cuantas_personas_viven_hogar}
                required
              />
            </div>
          </div>

          </IonList>
          <IonList>
          <div className="row g-3 was-validated">
            {/* 1.14 ¿Cuántas de ellas presentan discapacidad? */}
            <div className="col-sm">
              <label className="form-label">1.14 ¿Cuántas de ellas presentan discapacidad?</label>
              <input
                type="number"
                className="form-control form-control-sm"
                onChange={(e) => handleInputChange(e, 'cuantas_personas_viven_hogar_discapacidad')}
                value={items.cuantas_personas_viven_hogar_discapacidad}
                required
              />
            </div>

            {/* 1.15 ¿Actualmente tiene personas a cargo? */}
            <div className="col-sm">
              <label className="form-label">1.15 ¿Actualmente tiene personas a cargo?</label>
              <select
                className="form-control form-control-sm"
                onChange={(e) => handleInputChange(e, 'tiene_personas_a_cargo')}
                value={items.tiene_personas_a_cargo}
                required
              >
                <option value=""> SELECCIONE </option>
                <option value="1">NO</option>
                <option value="2">SI</option>
              </select>
            </div>
          </div>
        </IonList>
        <IonList>
          <div className="row g-3 was-validated">
          {(items.tiene_personas_a_cargo =='2')?
           <>
            <div className="col-sm">
              <label className="form-label">1.16 Número de personas a cargo menores de 12 años</label>
              <input
                type="text"
                className="form-control form-control-sm"
                onChange={(e) => handleInputChange(e, 'numero_personas_a_cargo_menor12')}
                value={items.numero_personas_a_cargo_menor12}
                required
              />
            </div>
            <div className="col-sm">
              <label className="form-label">1.17 Número de personas a cargo mayores de 60 años</label>
              <input
                type="text"
                className="form-control form-control-sm"
                onChange={(e) => handleInputChange(e, 'numero_personas_a_cargo_mayor60')}
                value={items.numero_personas_a_cargo_mayor60}
                required
              />
            </div>
            </> :''}
          </div>
        </IonList>
        <IonList>
          <div className="row g-3 was-validated">
            {/* 1.18 ¿Recibe algún servicio del ICBF? */}
            <div className="col-sm">
              <label className="form-label">1.18 ¿Recibe algún servicio del Instituto Colombiano de Bienestar Familiar?</label>
              <select
                className="form-control form-control-sm"
                onChange={(e) => handleInputChange(e, 'recibe_servicio_icbf')}
                value={items.recibe_servicio_icbf}
                required
              >
                <option value=""> SELECCIONE </option>
                <option value="1">No</option>
                <option value="2">SI</option>
              </select>
            </div>

            {/* 1.19 Es beneficiario de programas */}
            <div className="col-sm">
              <label className="form-label">1.19 Es beneficiario de programas de:</label>
              <select   className="form-control form-control-sm"   onChange={(e) => handleInputChange(e, 'beneficiario_programa')}   value={items.beneficiario_programa}   required >
                <option value=""> SELECCIONE </option><option value="2"> Amauta </option><option value="1"> Club Juvenil </option><option value="9"> Club Juvenil </option><option value="6"> Familias Medellín </option><option value="3"> Hogar Comunitario </option><option value="5"> Hogar Infantil </option><option value="7"> Hogar Sustituto </option><option value="4"> Isvimed </option><option value="11"> Ninguno </option><option value="12"> Otros Programas de Bienestar </option><option value="10"> Protección </option><option value="8"> Seguridad alimentaria </option>
              </select>
            </div>
          </div>
        </IonList>

        <IonList>
        {(items.beneficiario_programa =='12')?
          <div className="row g-3 was-validated">
            {/* Cual? */}
            <div className="col-sm">
              <label className="form-label">Cual?</label>
              <input
                type="text"
                className="form-control form-control-sm"
                onChange={(e) => handleInputChange(e, 'beneficiario_programa_otro')}
                value={items.beneficiario_programa_otro}
                required
              />
            </div>
          </div>:''}
        </IonList>


          <br />

        </div>

        <br />

        <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
          <div className="btn btn-primary" onClick={() => window.location.href = `/tabs/tab4/${params.ficha}`}>Siguiente</div>
        </div>
         </form> 

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
