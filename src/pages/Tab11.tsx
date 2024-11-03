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
  const viviendaOptions = [
    { value: "", label: "SELECCIONE" },
    { value: "2", label: "APARTAMENTO" },
    { value: "6", label: "CALLE" },
    { value: "1", label: "CASA" },
    { value: "3", label: "CUARTO" },
    { value: "7", label: "HOTEL DE PASO" },
    { value: "5", label: "INSTITUCIÓN PRIVADA" },
    { value: "4", label: "INSTITUCIÓN PÚBLICA" },
    { value: "8", label: "OTRO TIPO DE VIVIENDA" }
  ];

  const condicionViviendaOptions = [
    { value: "", label: "SELECCIONE" },
    { value: "1", label: "ARRIENDO O SUBARRIENDO" },
    { value: "7", label: "INQUILINATO" },
    { value: "8", label: "OTRA CONDICIÓN. ¿CUÁL?" },
    { value: "4", label: "VIVIENDA DE UN FAMILIAR SIN PAGAR ARRIENDO" },
    { value: "5", label: "VIVIENDA DE UN TERCERO SIN PAGAR ARRIENDO" },
    { value: "6", label: "VIVIENDA EN ZONA DE INVASIÓN" },
    { value: "2", label: "VIVIENDA PROPIA O LA ESTÁ PAGANDO" },
    { value: "3", label: "VIVIENDA PROPIA TOTALMENTE PAGA" }
  ];

  const t1_sino = [
    { value: "1", label: "No" },
    { value: "2", label: "Sí" }
  ];


  const t1_condiciones_higienicas = [
    { value: "1", label: "Adecuadas" },
    { value: "2", label: "Inadecuadas" }
  ];

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
      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="actualmente_vive_en">11.1 Actualmente vive en:</label>
          <select
            className="form-control form-control-sm"
            id="actualmente_vive_en"
            value={items.actualmente_vive_en}
            onChange={(e) => handleInputChange(e, 'actualmente_vive_en')}
            required
          >
            {viviendaOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="en_que_condicion_posee_vivienda">11.2 ¿En qué condición posee la vivienda?</label>
          <select
            className="form-control form-control-sm"
            id="en_que_condicion_posee_vivienda"
            value={items.en_que_condicion_posee_vivienda}
            onChange={(e) => handleInputChange(e, 'en_que_condicion_posee_vivienda')}
            required
          >
            {condicionViviendaOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="otra_condicion_cual">Otra condición. ¿Cuál?:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="otra_condicion_cual"
            style={{ textTransform: 'uppercase' }}
            value={items.otra_condicion_cual}
            onChange={(e) => handleInputChange(e, 'otra_condicion_cual')}
            required
          />
        </div>
      </div>

      <div className="form-group col-sm pt-3">
                11.3 Número de espacios con los que cuenta la vivienda:
            </div>

      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="numero_de_espacios_vivienda_cocina">Cocina</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="numero_de_espacios_vivienda_cocina"
            value={items.numero_de_espacios_vivienda_cocina}
            onChange={(e) => handleInputChange(e, 'numero_de_espacios_vivienda_cocina')}
            required
          />
        </div>
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="numero_de_espacios_vivienda_comedor">Comedor</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="numero_de_espacios_vivienda_comedor"
            value={items.numero_de_espacios_vivienda_comedor}
            onChange={(e) => handleInputChange(e, 'numero_de_espacios_vivienda_comedor')}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="numero_de_espacios_vivienda_sala">Sala</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="numero_de_espacios_vivienda_sala"
            value={items.numero_de_espacios_vivienda_sala}
            onChange={(e) => handleInputChange(e, 'numero_de_espacios_vivienda_sala')}
            required
          />
        </div>
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="numero_de_espacios_vivienda_baño">Baño</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="numero_de_espacios_vivienda_baño"
            value={items.numero_de_espacios_vivienda_baño}
            onChange={(e) => handleInputChange(e, 'numero_de_espacios_vivienda_baño')}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="numero_de_espacios_vivienda_habitaciones">Habitaciones</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="numero_de_espacios_vivienda_habitaciones"
            value={items.numero_de_espacios_vivienda_habitaciones}
            onChange={(e) => handleInputChange(e, 'numero_de_espacios_vivienda_habitaciones')}
            required
          />
        </div>
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="numero_de_espacios_vivienda_balcon">Balcón</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="numero_de_espacios_vivienda_balcon"
            value={items.numero_de_espacios_vivienda_balcon}
            onChange={(e) => handleInputChange(e, 'numero_de_espacios_vivienda_balcon')}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="numero_de_espacios_vivienda_parqueadero">Parqueadero</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="numero_de_espacios_vivienda_parqueadero"
            value={items.numero_de_espacios_vivienda_parqueadero}
            onChange={(e) => handleInputChange(e, 'numero_de_espacios_vivienda_parqueadero')}
            required
          />
        </div>
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="numero_de_espacios_vivienda_otras">Otros</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="numero_de_espacios_vivienda_otras"
            value={items.numero_de_espacios_vivienda_otras}
            onChange={(e) => handleInputChange(e, 'numero_de_espacios_vivienda_otras')}
            required
          />
        </div>
      </div>

      <div className="form-group col-sm pt-3">
              11.4 Acceso de la vivienda:
            </div>

      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="acceso_vivienda_por_trocha">Acceso por trocha</label>
          <select
            className="form-control form-control-sm"
            id="acceso_vivienda_por_trocha"
            value={items.acceso_vivienda_por_trocha}
            onChange={(e) => handleInputChange(e, 'acceso_vivienda_por_trocha')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="acceso_vivienda_por_medio_de_escalas">Acceso con escalera (Escalas)</label>
          <select
            className="form-control form-control-sm"
            id="acceso_vivienda_por_medio_de_escalas"
            value={items.acceso_vivienda_por_medio_de_escalas}
            onChange={(e) => handleInputChange(e, 'acceso_vivienda_por_medio_de_escalas')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="acceso_vivienda_por_medio_de_callejon">Acceso por medio de callejon</label>
          <select
            className="form-control form-control-sm"
            id="acceso_vivienda_por_medio_de_callejon"
            value={items.acceso_vivienda_por_medio_de_callejon}
            onChange={(e) => handleInputChange(e, 'acceso_vivienda_por_medio_de_callejon')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="acceso_vivienda_por_via_pavimentada">Vía pavimentada</label>
          <select
            className="form-control form-control-sm"
            id="acceso_vivienda_por_via_pavimentada"
            value={items.acceso_vivienda_por_via_pavimentada}
            onChange={(e) => handleInputChange(e, 'acceso_vivienda_por_via_pavimentada')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="acceso_vivienda_por_via_sin_pavimentar">Vía sin pavimentar</label>
          <select
            className="form-control form-control-sm"
            id="acceso_vivienda_por_via_sin_pavimentar"
            value={items.acceso_vivienda_por_via_sin_pavimentar}
            onChange={(e) => handleInputChange(e, 'acceso_vivienda_por_via_sin_pavimentar')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="condiciones_higienicas">11.5 Condiciones higiénicas:</label>
          <select
            className="form-control form-control-sm"
            id="condiciones_higienicas"
            value={items.condiciones_higienicas}
            onChange={(e) => handleInputChange(e, 'condiciones_higienicas')}
            required
          >
            {t1_condiciones_higienicas.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      
      <div className="form-group col-sm pt-3">
          11.6 Condiciones de enseres básicos:
            </div>


      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="condiciones_enseres_basicos_adecuados">Adecuadas</label>
          <select
            className="form-control form-control-sm"
            id="condiciones_enseres_basicos_adecuados"
            value={items.condiciones_enseres_basicos_adecuados}
            onChange={(e) => handleInputChange(e, 'condiciones_enseres_basicos_adecuados')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
     
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="condiciones_enseres_basicos_en_sobreuso">En Sobreuso</label>
          <select
            className="form-control form-control-sm"
            id="condiciones_enseres_basicos_en_sobreuso"
            value={items.condiciones_enseres_basicos_en_sobreuso}
            onChange={(e) => handleInputChange(e, 'condiciones_enseres_basicos_en_sobreuso')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>   
      <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="condiciones_enseres_basicos_reducidos">Reducidos enseres básicos</label>
          <select
            className="form-control form-control-sm"
            id="condiciones_enseres_basicos_reducidos"
            value={items.condiciones_enseres_basicos_reducidos}
            onChange={(e) => handleInputChange(e, 'condiciones_enseres_basicos_reducidos')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

          
      <div className="form-group col-sm pt-3">
            11.7 Condiciones Ambientales:
            </div>

            <div className="row">
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="condiciones_ambientales_aireadas_iluminadas">Aireadas e iluminadas</label>
          <select
            className="form-control form-control-sm"
            id="condiciones_ambientales_aireadas_iluminadas"
            value={items.condiciones_ambientales_aireadas_iluminadas}
            onChange={(e) => handleInputChange(e, 'condiciones_ambientales_aireadas_iluminadas')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
     
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="condiciones_ambientales_aireadas_poca_ilumi">Aireadas con poca iluminación</label>
          <select
            className="form-control form-control-sm"
            id="condiciones_ambientales_aireadas_poca_ilumi"
            value={items.condiciones_ambientales_aireadas_poca_ilumi}
            onChange={(e) => handleInputChange(e, 'condiciones_ambientales_aireadas_poca_ilumi')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="condiciones_ambientales_iluminacion_poco_airea">Adecuada iluminación poco aireadas</label>
          <select
            className="form-control form-control-sm"
            id="condiciones_ambientales_iluminacion_poco_airea"
            value={items.condiciones_ambientales_iluminacion_poco_airea}
            onChange={(e) => handleInputChange(e, 'condiciones_ambientales_iluminacion_poco_airea')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
     
        <div className="form-group col-sm-6 pb-3">
          <label htmlFor="condiciones_ambientales_vivienda_con_humedades">Vivienda con humedades</label>
          <select
            className="form-control form-control-sm"
            id="condiciones_ambientales_vivienda_con_humedades"
            value={items.condiciones_ambientales_vivienda_con_humedades}
            onChange={(e) => handleInputChange(e, 'condiciones_ambientales_vivienda_con_humedades')}
            required
          >
            {t1_sino.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group col-sm pt-3">
              11.8 Vivienda construida en:
            </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_adobe">Adobe</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_construida_en_adobe"
          value={items.vivienda_construida_en_adobe || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_adobe')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_bareque">Bareque</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_construida_en_bareque"
          value={items.vivienda_construida_en_bareque || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_bareque')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    {/* Madera (Tabla) y Piso en Baldosa */}
    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_madera_tabla">Madera (Tabla)</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_construida_en_madera_tabla"
          value={items.vivienda_construida_en_madera_tabla || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_madera_tabla')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_piso_en_baldosa">Piso en Baldosa</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_construida_en_piso_en_baldosa"
          value={items.vivienda_construida_en_piso_en_baldosa || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_piso_en_baldosa')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    {/* Piso en Obra Negra y Piso en Tierra */}
    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_piso_obra_negra">Piso en Obra Negra</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_construida_en_piso_obra_negra"
          value={items.vivienda_construida_en_piso_obra_negra || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_piso_obra_negra')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_piso_en_tierra">Piso en Tierra</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_construida_en_piso_en_tierra"
          value={items.vivienda_construida_en_piso_en_tierra || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_piso_en_tierra')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    {/* Techo con teja de asbesto y Techo con teja de barro */}
    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_techo_teja_asbesto">Techo con teja de asbesto ("eternit")</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_construida_en_techo_teja_asbesto"
          value={items.vivienda_construida_en_techo_teja_asbesto || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_techo_teja_asbesto')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_techo_teja_barro">Techo con teja de barro</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_construida_en_techo_teja_barro"
          value={items.vivienda_construida_en_techo_teja_barro || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_techo_teja_barro')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    {/* Otro y ¿Cuál? */}
    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_otro">Otro. ¿Cuál?</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_construida_en_otro"
          value={items.vivienda_construida_en_otro || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_otro')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_construida_en_otro_cual">¿Cuál?:</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="vivienda_construida_en_otro_cual"
          value={items.vivienda_construida_en_otro_cual || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_construida_en_otro_cual')}
          style={{ textTransform: 'uppercase' }}
          required
        />
      </div>
      </div>

      
      <div className="form-group col-sm pt-3">
            11.9 La vivienda cuenta con servicios públicos de:
            </div>
            

            <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_cuenta_servicios_publ_energia_elec">Energía eléctrica</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_cuenta_servicios_publ_energia_elec"
          value={items.vivienda_cuenta_servicios_publ_energia_elec || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_cuenta_servicios_publ_energia_elec')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_cuenta_servicios_publ_alcantarillado">Alcantarillado</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_cuenta_servicios_publ_alcantarillado"
          value={items.vivienda_cuenta_servicios_publ_alcantarillado || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_cuenta_servicios_publ_alcantarillado')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_cuenta_servicios_publ_telefono">Teléfono</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_cuenta_servicios_publ_telefono"
          value={items.vivienda_cuenta_servicios_publ_telefono || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_cuenta_servicios_publ_telefono')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_cuenta_servicios_publ_acueducto">Acueducto</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_cuenta_servicios_publ_acueducto"
          value={items.vivienda_cuenta_servicios_publ_acueducto || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_cuenta_servicios_publ_acueducto')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_cuenta_servicios_publ_gas_natural">Gas natural conectado a red pública</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_cuenta_servicios_publ_gas_natural"
          value={items.vivienda_cuenta_servicios_publ_gas_natural || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_cuenta_servicios_publ_gas_natural')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_cuenta_servicios_publ_recoleccion_basura">Recolección de basuras</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_cuenta_servicios_publ_recoleccion_basura"
          value={items.vivienda_cuenta_servicios_publ_recoleccion_basura || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_cuenta_servicios_publ_recoleccion_basura')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_cuenta_servicios_publ_internet">Internet</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_cuenta_servicios_publ_internet"
          value={items.vivienda_cuenta_servicios_publ_internet || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_cuenta_servicios_publ_internet')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="vivienda_cuenta_servicios_publ_ninguno">Ninguno</label>
        <select
          className="form-control form-control-sm"
          id="vivienda_cuenta_servicios_publ_ninguno"
          value={items.vivienda_cuenta_servicios_publ_ninguno || ''}
          onChange={(e) => handleInputChange(e, 'vivienda_cuenta_servicios_publ_ninguno')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="preparacion_alimentos_agua_potable">11.10 Para la preparación de alimentos ¿Utilizan agua potable?</label>
        <select
          className="form-control form-control-sm"
          id="preparacion_alimentos_agua_potable"
          value={items.preparacion_alimentos_agua_potable || ''}
          onChange={(e) => handleInputChange(e, 'preparacion_alimentos_agua_potable')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        11.11 Dispositivos tecnológicos en el hogar:
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="dispositivos_tecnologicos_televisor">Televisor</label>
        <select
          className="form-control form-control-sm"
          id="dispositivos_tecnologicos_televisor"
          value={items.dispositivos_tecnologicos_televisor || ''}
          onChange={(e) => handleInputChange(e, 'dispositivos_tecnologicos_televisor')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="dispositivos_tecnologicos_computador">Computador</label>
        <select
          className="form-control form-control-sm"
          id="dispositivos_tecnologicos_computador"
          value={items.dispositivos_tecnologicos_computador || ''}
          onChange={(e) => handleInputChange(e, 'dispositivos_tecnologicos_computador')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="dispositivos_tecnologicos_tablet">Tablet</label>
        <select
          className="form-control form-control-sm"
          id="dispositivos_tecnologicos_tablet"
          value={items.dispositivos_tecnologicos_tablet || ''}
          onChange={(e) => handleInputChange(e, 'dispositivos_tecnologicos_tablet')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="dispositivos_tecnologicos_celular">Celular</label>
        <select
          className="form-control form-control-sm"
          id="dispositivos_tecnologicos_celular"
          value={items.dispositivos_tecnologicos_celular || ''}
          onChange={(e) => handleInputChange(e, 'dispositivos_tecnologicos_celular')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="dispositivos_tecnologicos_otros">Otro</label>
        <select
          className="form-control form-control-sm"
          id="dispositivos_tecnologicos_otros"
          value={items.dispositivos_tecnologicos_otros || ''}
          onChange={(e) => handleInputChange(e, 'dispositivos_tecnologicos_otros')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="dispositivos_tecnologicos_otros_cuales">¿Cuáles?:</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="dispositivos_tecnologicos_otros_cuales"
          value={items.dispositivos_tecnologicos_otros_cuales || ''}
          onChange={(e) => handleInputChange(e, 'dispositivos_tecnologicos_otros_cuales')}
          style={{ textTransform: 'uppercase' }}
          required
        />
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="dispositivos_tecnologicos_ninguno">Ninguno</label>
        <select
          className="form-control form-control-sm"
          id="dispositivos_tecnologicos_ninguno"
          value={items.dispositivos_tecnologicos_ninguno || ''}
          onChange={(e) => handleInputChange(e, 'dispositivos_tecnologicos_ninguno')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        11.12 Riesgos de la vivienda:
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="riesgos_vivienda_por_deslizamiento">Riesgo por deslizamiento</label>
        <select
          className="form-control form-control-sm"
          id="riesgos_vivienda_por_deslizamiento"
          value={items.riesgos_vivienda_por_deslizamiento || ''}
          onChange={(e) => handleInputChange(e, 'riesgos_vivienda_por_deslizamiento')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="riesgos_vivienda_por_inundaciones">Riesgo por inundaciones</label>
        <select
          className="form-control form-control-sm"
          id="riesgos_vivienda_por_inundaciones"
          value={items.riesgos_vivienda_por_inundaciones || ''}
          onChange={(e) => handleInputChange(e, 'riesgos_vivienda_por_inundaciones')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="riesgos_vivienda_por_techo_paredes_mal_estado">Riesgo por techo o paredes en mal estado</label>
        <select
          className="form-control form-control-sm"
          id="riesgos_vivienda_por_techo_paredes_mal_estado"
          value={items.riesgos_vivienda_por_techo_paredes_mal_estado || ''}
          onChange={(e) => handleInputChange(e, 'riesgos_vivienda_por_techo_paredes_mal_estado')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="riesgos_vivienda_por_fallas_geologicas">Riesgo por fallas geológicas</label>
        <select
          className="form-control form-control-sm"
          id="riesgos_vivienda_por_fallas_geologicas"
          value={items.riesgos_vivienda_por_fallas_geologicas || ''}
          onChange={(e) => handleInputChange(e, 'riesgos_vivienda_por_fallas_geologicas')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="riesgos_vivienda_por_otro">Otro. ¿Cuál?</label>
        <select
          className="form-control form-control-sm"
          id="riesgos_vivienda_por_otro"
          value={items.riesgos_vivienda_por_otro || ''}
          onChange={(e) => handleInputChange(e, 'riesgos_vivienda_por_otro')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="form-group col-sm pb-3">
        <label htmlFor="riesgos_vivienda_por_otro_cual">Otro. ¿Cuál?:</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="riesgos_vivienda_por_otro_cual"
          value={items.riesgos_vivienda_por_otro_cual || ''}
          onChange={(e) => handleInputChange(e, 'riesgos_vivienda_por_otro_cual')}
          style={{ textTransform: 'uppercase' }}
          required
        />
      </div>
    </div>

    <div className="row">
      <div className="form-group col-sm pb-3">
        <label htmlFor="riesgos_vivienda_por_ninguno">Ninguno</label>
        <select
          className="form-control form-control-sm"
          id="riesgos_vivienda_por_ninguno"
          value={items.riesgos_vivienda_por_ninguno || ''}
          onChange={(e) => handleInputChange(e, 'riesgos_vivienda_por_ninguno')}
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

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
