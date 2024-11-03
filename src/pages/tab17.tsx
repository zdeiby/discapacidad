import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonList, IonInput, IonButton
  } from '@ionic/react';
  
  import React, { useEffect, useState } from 'react';
  import loadSQL from '../models/database';
  import { useParams } from 'react-router-dom';
  import 'bootstrap/dist/css/bootstrap.min.css';
  
  interface Person {
    id_usuario: number;
    registre_relacion_familiar_con_persona_con_discapacidad: string;
    la_famiilia_es_red_de_apoyo_para_la_pcd: string | null;
    la_familia_acepta_el_diagnostico_de_la_pcd: string | null;
    la_pcd_participa_en_la_toma_de_decisiones: string | null;
    comunicacion_asertiva_en_el_hogar: string | null;
    habitos_de_vida_saludables: string | null;
    riesgo_por_violencia_intrafamiliar: string | null;
    riesgo_por_desconocimiento_del_manejo_diagnostico: string | null;
    riesgo_por_consumo_de_sustancias_psicoactivas_en_hogar: string | null;
    riesgo_en_el_territorio_por_dinamicas_del_contexto: string | null;
    riesgo_por_presunta_vulneracion_de_derechos: string | null;
    tiene_representante_legal: number | null;
    fecharegistro: string | null;
    usuario: number | null;
    estado: number | null;
    tabla: string | null;
  }
  
  
  const Tab17: React.FC = () => {
    const getCurrentDateTime = () => {
        const date = new Date();
        return date.toISOString().slice(0, 19).replace('T', ' ');
      };
    
    const params = useParams<{ ficha: string }>();
    const [people, setPeople] = useState<Person[]>([]);
    const [db, setDb] = useState<any>(null);
    const [items, setItems] = useState<Person>({
      id_usuario: Number(params.ficha),
      registre_relacion_familiar_con_persona_con_discapacidad: '',
      la_famiilia_es_red_de_apoyo_para_la_pcd: '1',
      la_familia_acepta_el_diagnostico_de_la_pcd: '1',
      la_pcd_participa_en_la_toma_de_decisiones: '1',
      comunicacion_asertiva_en_el_hogar: '1',
      habitos_de_vida_saludables: '1',
      riesgo_por_violencia_intrafamiliar: '1',
      riesgo_por_desconocimiento_del_manejo_diagnostico: '1',
      riesgo_por_consumo_de_sustancias_psicoactivas_en_hogar: '1',
      riesgo_en_el_territorio_por_dinamicas_del_contexto: '1',
      riesgo_por_presunta_vulneracion_de_derechos: '1',
      tiene_representante_legal: 0,
      fecharegistro: getCurrentDateTime(),
      usuario: localStorage.getItem('cedula') || '',
      estado: '1',
      tabla: 'discapacidad_capitulo_9',
    });
    
    const [buttonDisabled, setButtonDisabled] = useState(true);
  
    useEffect(() => {
      loadSQL(setDb, fetchUsers);
    }, []);
  
    useEffect(() => {
      if (db) fetchUsers(db);
    }, [db]);
  
    useEffect(() => {
      if (people.length > 0) {
        const data = people[0];
        setItems({
          id_usuario: data.id_usuario || Number(params.ficha),
          registre_relacion_familiar_con_persona_con_discapacidad: data.registre_relacion_familiar_con_persona_con_discapacidad || '',
          la_famiilia_es_red_de_apoyo_para_la_pcd: data.la_famiilia_es_red_de_apoyo_para_la_pcd || '0',
          la_familia_acepta_el_diagnostico_de_la_pcd: data.la_familia_acepta_el_diagnostico_de_la_pcd || '0',
          la_pcd_participa_en_la_toma_de_decisiones: data.la_pcd_participa_en_la_toma_de_decisiones || '0',
          comunicacion_asertiva_en_el_hogar: data.comunicacion_asertiva_en_el_hogar || '0',
          habitos_de_vida_saludables: data.habitos_de_vida_saludables || '0',
          riesgo_por_violencia_intrafamiliar: data.riesgo_por_violencia_intrafamiliar || '0',
          riesgo_por_desconocimiento_del_manejo_diagnostico: data.riesgo_por_desconocimiento_del_manejo_diagnostico || '0',
          riesgo_por_consumo_de_sustancias_psicoactivas_en_hogar: data.riesgo_por_consumo_de_sustancias_psicoactivas_en_hogar || '0',
          riesgo_en_el_territorio_por_dinamicas_del_contexto: data.riesgo_en_el_territorio_por_dinamicas_del_contexto || '0',
          riesgo_por_presunta_vulneracion_de_derechos: data.riesgo_por_presunta_vulneracion_de_derechos || '0',
          tiene_representante_legal: data.tiene_representante_legal || 0,
          fecharegistro: data.fecharegistro || getCurrentDateTime(),
          usuario: data.usuario || localStorage.getItem('cedula') || '',
          estado: data.estado || '1',
          tabla: data.tabla || 'discapacidad_capitulo_9',
        });
      }
    }, [people]);
    
  
    const fetchUsers = async (database = db) => {
        if (database) {
          const res = await database.exec(`SELECT * FROM discapacidad_capitulo_9 WHERE id_usuario=${params.ficha}`);
          if (res[0]?.values && res[0]?.columns) {
            const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
              return res[0].columns.reduce((obj, col, index) => {
                obj[col] = row[index] !== '' ? row[index].toString() : '0'; // Convertir valores null a '0'
                return obj;
              }, {} as Person);
            });
            setPeople(transformedPeople);
            setButtonDisabled(!transformedPeople[0].id_usuario);
          }
        }
      };
  
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
          store.put(data, 'sqliteDb').onsuccess = () => {
            console.log('Data saved to IndexedDB');
          };
        };
      }
    };
  
  

  
    const enviar = async (database = db, event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    
      try {
        await database.exec(`INSERT OR REPLACE INTO discapacidad_capitulo_9 (
          id_usuario, registre_relacion_familiar_con_persona_con_discapacidad, la_famiilia_es_red_de_apoyo_para_la_pcd,
          la_familia_acepta_el_diagnostico_de_la_pcd, la_pcd_participa_en_la_toma_de_decisiones, comunicacion_asertiva_en_el_hogar,
          habitos_de_vida_saludables, riesgo_por_violencia_intrafamiliar, riesgo_por_desconocimiento_del_manejo_diagnostico,
          riesgo_por_consumo_de_sustancias_psicoactivas_en_hogar, riesgo_en_el_territorio_por_dinamicas_del_contexto,
          riesgo_por_presunta_vulneracion_de_derechos, tiene_representante_legal, fecharegistro, usuario, estado, tabla
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
          [
            items.id_usuario, items.registre_relacion_familiar_con_persona_con_discapacidad, items.la_famiilia_es_red_de_apoyo_para_la_pcd,
            items.la_familia_acepta_el_diagnostico_de_la_pcd, items.la_pcd_participa_en_la_toma_de_decisiones, items.comunicacion_asertiva_en_el_hogar,
            items.habitos_de_vida_saludables, items.riesgo_por_violencia_intrafamiliar, items.riesgo_por_desconocimiento_del_manejo_diagnostico,
            items.riesgo_por_consumo_de_sustancias_psicoactivas_en_hogar, items.riesgo_en_el_territorio_por_dinamicas_del_contexto,
            items.riesgo_por_presunta_vulneracion_de_derechos, items.tiene_representante_legal, items.fecharegistro,
            items.usuario, items.estado, items.tabla
          ]
        );
        
        saveDatabase();
        alert('Datos Guardados con éxito');
        fetchUsers(); // Actualiza los datos después de guardar
      } catch (err) {
        console.error('Error al exportar los datos JSON:', err);
      }
    };

    const handleInputChange = (event, field) => {
      const { value } = event.target;
      setItems((prevItems) => ({
        ...prevItems,
        [field]: value,
      }));
      console.log(items);
      
    };
    
  
    return (
      <IonPage>
        <IonHeader><div className='col-12'>
          <IonToolbar>
            <IonTitle slot="start">CAPITULO IX. DINÁMICA FAMILIAR</IonTitle>
            <IonTitle slot="end">FICHA: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
          </IonToolbar></div>
        </IonHeader>
        <IonContent fullscreen><form>
          
      
        <div className=' shadow p-3 mb-5 bg-white rounded'>
  <div className="row g-3 was-validated">

  <IonList>
        <div className="row g-3">
          <div className="col-sm-12">
            <label htmlFor="registre_relacion_familiar_con_persona_con_discapacidad">
              Registre relación familiar con la persona con discapacidad
            </label>
            <textarea
              className="form-control"
              id="registre_relacion_familiar_con_persona_con_discapacidad"
              style={{ textTransform: 'uppercase' }}
              rows="5"
              required
              value={items.registre_relacion_familiar_con_persona_con_discapacidad || ''}
              onChange={(e) => handleInputChange(e, 'registre_relacion_familiar_con_persona_con_discapacidad')}
            ></textarea>
          </div>
        </div>
      </IonList>
      <IonList>
         {/* Campos con opciones Sí/No en dos columnas */}
         {[
          { label: '9.1 La familia es red de apoyo para la PcD:', key: 'la_famiilia_es_red_de_apoyo_para_la_pcd' },
          { label: '9.2 La familia acepta el diagnóstico de la PcD:', key: 'la_familia_acepta_el_diagnostico_de_la_pcd' },
          { label: '9.3 La PcD participa en la toma de decisiones:', key: 'la_pcd_participa_en_la_toma_de_decisiones' },
          { label: '9.4 Comunicación asertiva en el hogar:', key: 'comunicacion_asertiva_en_el_hogar' },
          { label: '9.5 Hábitos de vida saludables:', key: 'habitos_de_vida_saludables' },
          { label: '9.6 Riesgo por violencia intrafamiliar:', key: 'riesgo_por_violencia_intrafamiliar' },
          { label: '9.7 Riesgo por desconocimiento del manejo del diagnóstico:', key: 'riesgo_por_desconocimiento_del_manejo_diagnostico' },
          { label: '9.8 Riesgo por consumo de sustancias psicoactivas en el hogar:', key: 'riesgo_por_consumo_de_sustancias_psicoactivas_en_hogar' },
          { label: '9.9 Riesgo en el territorio por dinámicas del contexto:', key: 'riesgo_en_el_territorio_por_dinamicas_del_contexto' },
          { label: '9.10 Riesgo por presunta vulneración de derechos:', key: 'riesgo_por_presunta_vulneracion_de_derechos' },
        ].map(({ label, key }, index, array) => (
          // Agrupar cada par de campos en una fila
          index % 2 === 0 && (
            <div className="row g-3 pb-3" key={index}>
              <div className="col-sm-6">
                <label htmlFor={array[index].key}>{array[index].label}</label>
                <select
                  className="form-control form-control-sm"
                  id={array[index].key}
                  required
                  value={items[array[index].key] || ''}
                  onChange={(e) => handleInputChange(e, array[index].key)}
                >
                   <option value="1">NO</option>
                   <option value="2">SI</option>
                </select>
              </div>
              {index + 1 < array.length && (
                <div className="col-sm-6">
                  <label htmlFor={array[index + 1].key}>{array[index + 1].label}</label>
                  <select
                    className="form-control form-control-sm"
                    id={array[index + 1].key}
                    required
                    value={items[array[index + 1].key] || ''}
                    onChange={(e) => handleInputChange(e, array[index + 1].key)}
                  >
                    <option value="1">NO</option>
                    <option value="2">SI</option>
                  </select>
                </div>
              )}
            </div>
          )
        ))}
      </IonList>
      </div>
  </div>

      <br />
         <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
         <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab10/${params.ficha}`;} }}> Siguiente</div>
         </div> 
             </form>
        </IonContent>
      </IonPage>
  
    );
  };
  
  export default Tab17;
  