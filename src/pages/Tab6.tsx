import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React,{useEffect, useState} from 'react';
import EmployeeItem from '../components/EmployeeItem';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonSelect,IonList, IonInput, IonButton, IonItem, IonLabel, 
  IonBadge,IonSelectOption, IonText, IonDatetimeButton,IonModal,IonDatetime,
  IonIcon} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadSQL from '../models/database';

interface Person {
  id_usuario: number;
  durante_los_ultimos_6_meses_ha_estado: string | null;
  usted_tiene_contrato_de_trabajo: string | null;
  la_actividad_economica_en_la_cual_trabaja: string | null;
  en_el_trabajo_se_desempeña_como: string | null;
  le_interesa_el_emprendimiento: string | null;
  tiene_alguna_idea_de_negocio: string | null;
  en_que_sector_se_inscribe_su_idea_de_negocio: string | null;
  otro_sector_cual: string | null;
  su_capacidad_laboral_afectada_por_discapacidad: string | null;
  cuenta_con_calificacion_perdida_capacidad_laboral: string | null;
  porcentaje_de_perdida_laboral: string | null;
  cual_es_su_ingreso_mensual_promedio: string | null;
  ha_recibido_capacitacion_despues_de_discapacidad: string | null;
  donde_recibio_capacitacion: string | null;
  necesita_capacitacion_para: string | null;
  necesidades_de_capacitacion_de_pers_discapacidad: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}


const Tab6: React.FC = () => {
  const params = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [db, setDb] = useState<any>(null);
  const [items, setItems] = useState<Person>({
    id_usuario: '',
    durante_los_ultimos_6_meses_ha_estado: '',
    usted_tiene_contrato_de_trabajo: '',
    la_actividad_economica_en_la_cual_trabaja: '',
    en_el_trabajo_se_desempeña_como: '',
    le_interesa_el_emprendimiento: '',
    tiene_alguna_idea_de_negocio: '',
    en_que_sector_se_inscribe_su_idea_de_negocio: '',
    otro_sector_cual: '',
    su_capacidad_laboral_afectada_por_discapacidad: '',
    cuenta_con_calificacion_perdida_capacidad_laboral: '',
    porcentaje_de_perdida_laboral: '',
    cual_es_su_ingreso_mensual_promedio: '',
    ha_recibido_capacitacion_despues_de_discapacidad: '',
    donde_recibio_capacitacion: '',
    necesita_capacitacion_para: '',
    necesidades_de_capacitacion_de_pers_discapacidad: '',
    fecharegistro: '',
    usuario: '',
    estado: '',
    tabla: 'discapacidad_capitulo_7'
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
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_7 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setButtonDisabled((transformedPeople[0].durante_los_ultimos_6_meses_ha_estado) ? false : true);
      } else {
        setItems({
          id_usuario: parseInt(params.ficha),
          durante_los_ultimos_6_meses_ha_estado: '',
          usted_tiene_contrato_de_trabajo: '',
          la_actividad_economica_en_la_cual_trabaja: '',
          en_el_trabajo_se_desempeña_como: '',
          le_interesa_el_emprendimiento: '',
          tiene_alguna_idea_de_negocio: '',
          en_que_sector_se_inscribe_su_idea_de_negocio: '',
          otro_sector_cual: '',
          su_capacidad_laboral_afectada_por_discapacidad: '',
          cuenta_con_calificacion_perdida_capacidad_laboral: '',
          porcentaje_de_perdida_laboral: '',
          cual_es_su_ingreso_mensual_promedio: '',
          ha_recibido_capacitacion_despues_de_discapacidad: '',
          donde_recibio_capacitacion: '',
          necesita_capacitacion_para: '',
          necesidades_de_capacitacion_de_pers_discapacidad: '',
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: 1,
          tabla: 'discapacidad_capitulo_7'
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
        durante_los_ultimos_6_meses_ha_estado: data.durante_los_ultimos_6_meses_ha_estado || '',
        usted_tiene_contrato_de_trabajo: data.usted_tiene_contrato_de_trabajo || '',
        la_actividad_economica_en_la_cual_trabaja: data.la_actividad_economica_en_la_cual_trabaja || '',
        en_el_trabajo_se_desempeña_como: data.en_el_trabajo_se_desempeña_como || '',
        le_interesa_el_emprendimiento: data.le_interesa_el_emprendimiento || '',
        tiene_alguna_idea_de_negocio: data.tiene_alguna_idea_de_negocio || '',
        en_que_sector_se_inscribe_su_idea_de_negocio: data.en_que_sector_se_inscribe_su_idea_de_negocio || '',
        otro_sector_cual: data.otro_sector_cual || '',
        su_capacidad_laboral_afectada_por_discapacidad: data.su_capacidad_laboral_afectada_por_discapacidad || '',
        cuenta_con_calificacion_perdida_capacidad_laboral: data.cuenta_con_calificacion_perdida_capacidad_laboral || '',
        porcentaje_de_perdida_laboral: data.porcentaje_de_perdida_laboral || '',
        cual_es_su_ingreso_mensual_promedio: data.cual_es_su_ingreso_mensual_promedio || '',
        ha_recibido_capacitacion_despues_de_discapacidad: data.ha_recibido_capacitacion_despues_de_discapacidad || '',
        donde_recibio_capacitacion: data.donde_recibio_capacitacion || '',
        necesita_capacitacion_para: data.necesita_capacitacion_para || '',
        necesidades_de_capacitacion_de_pers_discapacidad: data.necesidades_de_capacitacion_de_pers_discapacidad || '',
        fecharegistro: data.fecharegistro || '',
        usuario: data.usuario || null,
        estado: data.estado || null,
        tabla: data.tabla || 'discapacidad_capitulo_7'
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
      // if (field === 'telefono') {
      //   newState.telefonofijo = value === '1' ? 'NO APLICA' : '';
      // }
      return newState;
    });
  };

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  const validarCampos = () => {
    // const camposObligatorios = ['energia', 'acueducto', 'alcantarillado', 'gas', 'telefono','telefonofijo'];
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
     console.log(items);
     try {
       await db.exec(
         `INSERT OR REPLACE INTO discapacidad_capitulo_7 (
           id_usuario, 
           durante_los_ultimos_6_meses_ha_estado, 
           usted_tiene_contrato_de_trabajo, 
           la_actividad_economica_en_la_cual_trabaja, 
           en_el_trabajo_se_desempeña_como, 
           le_interesa_el_emprendimiento, 
           tiene_alguna_idea_de_negocio, 
           en_que_sector_se_inscribe_su_idea_de_negocio, 
           otro_sector_cual, 
           su_capacidad_laboral_afectada_por_discapacidad, 
           cuenta_con_calificacion_perdida_capacidad_laboral, 
           porcentaje_de_perdida_laboral, 
           cual_es_su_ingreso_mensual_promedio, 
           ha_recibido_capacitacion_despues_de_discapacidad, 
           donde_recibio_capacitacion, 
           necesita_capacitacion_para, 
           necesidades_de_capacitacion_de_pers_discapacidad, 
           fecharegistro, 
           usuario, 
           estado, 
           tabla
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
         [
           items.id_usuario,
           items.durante_los_ultimos_6_meses_ha_estado,
           items.usted_tiene_contrato_de_trabajo,
           items.la_actividad_economica_en_la_cual_trabaja,
           items.en_el_trabajo_se_desempeña_como,
           items.le_interesa_el_emprendimiento,
           items.tiene_alguna_idea_de_negocio,
           items.en_que_sector_se_inscribe_su_idea_de_negocio,
           items.otro_sector_cual,
           items.su_capacidad_laboral_afectada_por_discapacidad,
           items.cuenta_con_calificacion_perdida_capacidad_laboral,
           items.porcentaje_de_perdida_laboral,
           items.cual_es_su_ingreso_mensual_promedio,
           items.ha_recibido_capacitacion_despues_de_discapacidad,
           items.donde_recibio_capacitacion,
           items.necesita_capacitacion_para,
           items.necesidades_de_capacitacion_de_pers_discapacidad,
           items.fecharegistro,
           items.usuario,
           items.estado,
           items.tabla
         ]
       );
     
       const respSelect = db.exec(`SELECT * FROM "discapacidad_capitulo_7" WHERE id_usuario="${items.id_usuario}";`);
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
        <IonTitle slot="start">CAPITULO VII. OCUPACIÓN Y TRABAJO</IonTitle>  
        <IonTitle slot="end">ID_USUARIO: <label style={{color:'#17a2b8'}}>{params.ficha}</label> </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
<form>
    {/* <div className="social-card">
      <span className="label">Ficha:</span>
      <span className="value">{params.ficha}</span>
    </div> */}

      <br />

      <div className='shadow p-3 mb-2 pt-0 bg-white rounded'>
      <div className="row g-3 was-validated ">
        <IonList>
          <div className="alert alert-primary" role="alert">
            <span className="badge badge-secondary text-dark">CAPÍTULO VII. ACTIVIDAD LABORAL</span>
          </div>

          {/* Sección 7.1 a 7.2 */}
          <div className="row g-3">
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="durante_los_ultimos_6_meses_ha_estado">7.1 Durante los últimos 6 meses, ha estado principalmente:</label>
              <select
                onChange={(e) => handleInputChange(e, 'durante_los_ultimos_6_meses_ha_estado')}
                value={items.durante_los_ultimos_6_meses_ha_estado}
                className="form-control form-control-sm"
                id="durante_los_ultimos_6_meses_ha_estado"
                required
              >
                <option value="1">Empleado</option>
                <option value="2">Desempleado</option>
                <option value="3">Estudiante</option>
                <option value="4">Otra situación</option>
              </select>
            </div>
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="usted_tiene_contrato_de_trabajo">7.2 ¿Usted tiene contrato de trabajo?</label>
              <select
                onChange={(e) => handleInputChange(e, 'usted_tiene_contrato_de_trabajo')}
                value={items.usted_tiene_contrato_de_trabajo}
                className="form-control form-control-sm"
                id="usted_tiene_contrato_de_trabajo"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          {/* Sección 7.3 a 7.4 */}
          <div className="row g-3">
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="la_actividad_economica_en_la_cual_trabaja">7.3 La actividad económica en la cual trabaja actualmente se relaciona con:</label>
              <select
                onChange={(e) => handleInputChange(e, 'la_actividad_economica_en_la_cual_trabaja')}
                value={items.la_actividad_economica_en_la_cual_trabaja}
                className="form-control form-control-sm"
                id="la_actividad_economica_en_la_cual_trabaja"
                required
              >
                <option value="1">Comercio</option>
                <option value="2">Servicios</option>
                <option value="3">Industria</option>
                <option value="4">Otra</option>
              </select>
            </div>
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="en_el_trabajo_se_desempeña_como">7.4 En el trabajo se desempeña como:</label>
              <select
                onChange={(e) => handleInputChange(e, 'en_el_trabajo_se_desempeña_como')}
                value={items.en_el_trabajo_se_desempeña_como}
                className="form-control form-control-sm"
                id="en_el_trabajo_se_desempeña_como"
                required
              >
                <option value="1">Empleado</option>
                <option value="2">Autónomo</option>
                <option value="3">Empleador</option>
                <option value="4">Otro</option>
              </select>
            </div>
          </div>

          {/* Sección 7.5 a 7.6 */}
          <div className="row g-3">
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="le_interesa_el_emprendimiento">7.5 ¿Le interesa el emprendimiento?</label>
              <select
                onChange={(e) => handleInputChange(e, 'le_interesa_el_emprendimiento')}
                value={items.le_interesa_el_emprendimiento}
                className="form-control form-control-sm"
                id="le_interesa_el_emprendimiento"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="tiene_alguna_idea_de_negocio">7.6 ¿Tiene alguna idea de negocio?</label>
              <select
                onChange={(e) => handleInputChange(e, 'tiene_alguna_idea_de_negocio')}
                value={items.tiene_alguna_idea_de_negocio}
                className="form-control form-control-sm"
                id="tiene_alguna_idea_de_negocio"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          {/* Sección 7.7 a 7.9 */}
          <div className="row g-3">
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="en_que_sector_se_inscribe_su_idea_de_negocio">7.7 ¿En qué sector económico se inscribe su idea de negocio o actividad de negocio actual?</label>
              <select
                onChange={(e) => handleInputChange(e, 'en_que_sector_se_inscribe_su_idea_de_negocio')}
                value={items.en_que_sector_se_inscribe_su_idea_de_negocio}
                className="form-control form-control-sm"
                id="en_que_sector_se_inscribe_su_idea_de_negocio"
                required
              >
                <option value="1">Comercio</option>
                <option value="2">Servicios</option>
                <option value="3">Industria</option>
                <option value="4">Tecnología</option>
              </select>
            </div>
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="otro_sector_cual">Otro. ¿Cuál?</label>
              <input
                type="text"
                onChange={(e) => handleInputChange(e, 'otro_sector_cual')}
                value={items.otro_sector_cual}
                className="form-control form-control-sm"
                id="otro_sector_cual"
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="su_capacidad_laboral_afectada_por_discapacidad">7.8 ¿Su capacidad laboral se ha visto afectada como consecuencia de su discapacidad?</label>
              <select
                onChange={(e) => handleInputChange(e, 'su_capacidad_laboral_afectada_por_discapacidad')}
                value={items.su_capacidad_laboral_afectada_por_discapacidad}
                className="form-control form-control-sm"
                id="su_capacidad_laboral_afectada_por_discapacidad"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="cuenta_con_calificacion_perdida_capacidad_laboral">7.9 ¿Cuenta con calificación de pérdida de capacidad laboral? (Si su respuesta es SÍ pase a 7.9.1)</label>
              <select
                onChange={(e) => handleInputChange(e, 'cuenta_con_calificacion_perdida_capacidad_laboral')}
                value={items.cuenta_con_calificacion_perdida_capacidad_laboral}
                className="form-control form-control-sm"
                id="cuenta_con_calificacion_perdida_capacidad_laboral"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          {/* Sección 7.9.1 y 7.10 */}
          <div className="row g-3">
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="porcentaje_de_perdida_laboral">7.9.1 Porcentaje de pérdida de capacidad laboral:</label>
              <input
                type="text"
                onChange={(e) => handleInputChange(e, 'porcentaje_de_perdida_laboral')}
                value={items.porcentaje_de_perdida_laboral}
                className="form-control form-control-sm"
                id="porcentaje_de_perdida_laboral"
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="cual_es_su_ingreso_mensual_promedio">7.10 ¿Cuál es su ingreso mensual promedio?</label>
              <select
                onChange={(e) => handleInputChange(e, 'cual_es_su_ingreso_mensual_promedio')}
                value={items.cual_es_su_ingreso_mensual_promedio}
                className="form-control form-control-sm"
                id="cual_es_su_ingreso_mensual_promedio"
                required
              >
                <option value="1">Menos de $1,000</option>
                <option value="2">$1,000 - $2,000</option>
                <option value="3">Más de $2,000</option>
              </select>
            </div>
          </div>

          {/* Sección 7.11 a 7.12 */}
          <div className="row g-3">
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="ha_recibido_capacitacion_despues_de_discapacidad">7.11 Después de presentar su discapacidad, ¿Ha recibido capacitación para el trabajo? (Si su respuesta es NO pase a 7.12)</label>
              <select
                onChange={(e) => handleInputChange(e, 'ha_recibido_capacitacion_despues_de_discapacidad')}
                value={items.ha_recibido_capacitacion_despues_de_discapacidad}
                className="form-control form-control-sm"
                id="ha_recibido_capacitacion_despues_de_discapacidad"
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="donde_recibio_capacitacion">7.11.1 ¿Dónde recibió la capacitación?</label>
              <select
                onChange={(e) => handleInputChange(e, 'donde_recibio_capacitacion')}
                value={items.donde_recibio_capacitacion}
                className="form-control form-control-sm"
                id="donde_recibio_capacitacion"
                required
              >
                <option value="1">Institución educativa</option>
                <option value="2">Centro de capacitación</option>
                <option value="3">Otra</option>
              </select>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="necesita_capacitacion_para">7.12 Necesita capacitación para:</label>
              <select
                onChange={(e) => handleInputChange(e, 'necesita_capacitacion_para')}
                value={items.necesita_capacitacion_para}
                className="form-control form-control-sm"
                id="necesita_capacitacion_para"
                required
              >
                <option value="1">Oficios técnicos</option>
                <option value="2">Gestión empresarial</option>
                <option value="3">Tecnologías</option>
                <option value="4">Otra</option>
              </select>
            </div>
            <div className="col-sm-6 pt-2 pb-2">
              <label htmlFor="necesidades_de_capacitacion_de_pers_discapacidad">NECESIDADES DE CAPACITACIÓN DE LA PERSONA CON DISCAPACIDAD:</label>
              <input
                type="text"
                onChange={(e) => handleInputChange(e, 'necesidades_de_capacitacion_de_pers_discapacidad')}
                value={items.necesidades_de_capacitacion_de_pers_discapacidad}
                className="form-control form-control-sm"
                id="necesidades_de_capacitacion_de_pers_discapacidad"
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>
          </div>

        </IonList>
        </div>
      </div>


      

    {/* <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton disabled={buttonDisabled} routerLink={`/tabs/tab7/${params.ficha}`}>Siguiente</IonButton></div> */}
       
    <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
       <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab9/${params.ficha}`;} }}> Siguiente</div>
       </div>
       </form>
    </IonContent>
  </IonPage>
  );
};

export default Tab6;
