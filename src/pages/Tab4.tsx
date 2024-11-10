import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React,{useEffect, useState} from 'react';
import EmployeeItem from './../components/EmployeeItem';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonSelect,IonList, IonInput, IonButton, IonItem, IonLabel, 
  IonBadge,IonSelectOption, IonText, IonDatetimeButton,IonModal,IonDatetime,
  IonIcon} from '@ionic/react';
  import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, useParams } from 'react-router-dom';
import loadSQL from '../models/database';

interface Person {
  id_usuario: number;
  cual_es_el_diagnostico: string | null;
  permanentes_sistema_nervioso: string | null;
  permanentes_los_ojos: string | null;
  permanentes_los_oidos: string | null;
  permanentes_demas_sentidos: string | null;
  permanentes_la_voz_el_habla: string | null;
  permanentes_cardiorrespiratorio_defensas: string | null;
  permanentes_digestion_metabolismo: string | null;
  permanentes_sistema_genital: string | null;
  permanentes_movimiento_del_cuerpo: string | null;
  permanentes_la_piel_unas_cabello: string | null;
  permanentes_ninguno: string | null;
  cual_afecta_mas: string | null;
  hace_cuanto_años: string | null;
  origen_discapacidad: string | null;
  consecuencia_discapacidad: string | null;
  enfermedad_profesional: string | null;
  consumo_psicoactivos: string | null;
  desastres_naturales: string | null;
  por_accidente: string | null;
  victima_de_violencia: string | null;
  del_conflicto_armado_por: string | null;
  dificultades_prestacion_servicios: string | null;
  en_la_familia_existen_personas_con_discapacidad: string | null;
  en_cual_pais_adquirio_discapacidad: string | null;
  en_cual_departamento_adquirio_discapacidad: string | null;
  en_cual_municipio_adquirio_discapacidad: string | null;
  discapacidad_auditiva: string | null;
  discapacidad_fisica: string | null;
  discapacidad_intelectual: string | null;
  discapacidad_mental: string | null;
  discapacidad_sordoceguera: string | null;
  discapacidad_visual: string | null;
  discapacidad_multiple: string | null;
  adicionales_a_las_anteriores: string | null;
  grado_discapacidad_intelectual: string | null;
  actividades_dificultades_pensar: string | null;
  actividades_dificultades_percibir_luz: string | null;
  actividades_dificultades_oir: string | null;
  actividades_dificultades_sabores: string | null;
  actividades_dificultades_hablar: string | null;
  actividades_dificultades_desplazarse: string | null;
  actividades_dificultades_masticar: string | null;
  actividades_dificultades_retener_expulsar: string | null;
  actividades_dificultades_caminar: string | null;
  actividades_dificultades_piel_sana: string | null;
  actividades_dificultades_relacionarse: string | null;
  actividades_dificultades_mover_objetos: string | null;
  actividades_dificultades_posturas: string | null;
  actividades_dificultades_alimentarse: string | null;
  actividades_dificultades_otra: string | null;
  actitudes_negativos_familiares: string | null;
  actitudes_negativos_vecinos: string | null;
  actitudes_negativos_amigos: string | null;
  actitudes_negativos_empleados: string | null;
  actitudes_negativos_otras: string | null;
  actitudes_negativos_nadie: string | null;
  lugares_barreras_dormitorio: string | null;
  lugares_barreras_sala: string | null;
  lugares_barreras_baño: string | null;
  lugares_barreras_escaleras: string | null;
  lugares_barreras_pasillos: string | null;
  lugares_barreras_andenes: string | null;
  lugares_barreras_calles: string | null;
  lugares_barreras_centros_edu: string | null;
  lugares_barreras_lug_trabajo: string | null;
  lugares_barreras_parques: string | null;
  lugares_barreras_paraderos: string | null;
  lugares_barreras_trans_publico: string | null;
  lugares_barreras_hospitales: string | null;
  lugares_barreras_tiendas: string | null;
  lugares_barreras_otros: string | null;
  lugares_barreras_ninguno: number | null;
  medios_comunicacion_escritos: string | null;
  medios_comunicacion_radio: string | null;
  medios_comunicacion_television: string | null;
  medios_comunicacion_senas: string | null;
  medios_comunicacion_senas_naturales: string | null;
  medios_comunicacion_telefono: string | null;
  medios_comunicacion_internet: string | null;
  medios_comunicacion_braille: string | null;
  medios_comunicacion_ninguno: string | null;
  derechos_deberes_pcd: string | null;
  derechos_deberes_pcd_cuales: string | null;
  certificado_discapacidad: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
  consecuencia_discapacidad_cual: string | null;
  hace_cuantos_meses: string | null;
}



const Tab4: React.FC = () => {
  const params = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [db, setDb] = useState<any>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const [items, setItems] = useState({
    id_usuario: '', 
    cual_es_el_diagnostico: '', 
    permanentes_sistema_nervioso: '', 
    permanentes_los_ojos: '', 
    permanentes_los_oidos: '', 
    permanentes_demas_sentidos: '', 
    permanentes_la_voz_el_habla: '', 
    permanentes_cardiorrespiratorio_defensas: '', 
    permanentes_digestion_metabolismo: '', 
    permanentes_sistema_genital: '', 
    permanentes_movimiento_del_cuerpo: '', 
    permanentes_la_piel_unas_cabello: '', 
    permanentes_ninguno: '', 
    cual_afecta_mas: '', 
    hace_cuanto_años: '', 
    origen_discapacidad: '', 
    consecuencia_discapacidad: '', 
    enfermedad_profesional: '', 
    consumo_psicoactivos: '', 
    desastres_naturales: '', 
    por_accidente: '', 
    victima_de_violencia: '', 
    del_conflicto_armado_por: '', 
    dificultades_prestacion_servicios: '', 
    en_la_familia_existen_personas_con_discapacidad: '', 
    en_cual_pais_adquirio_discapacidad: '', 
    en_cual_departamento_adquirio_discapacidad: '', 
    en_cual_municipio_adquirio_discapacidad: '', 
    discapacidad_auditiva: '', 
    discapacidad_fisica: '', 
    discapacidad_intelectual: '', 
    discapacidad_mental: '', 
    discapacidad_sordoceguera: '', 
    discapacidad_visual: '', 
    discapacidad_multiple: '', 
    adicionales_a_las_anteriores: '', 
    grado_discapacidad_intelectual: '', 
    actividades_dificultades_pensar: '', 
    actividades_dificultades_percibir_luz: '', 
    actividades_dificultades_oir: '', 
    actividades_dificultades_sabores: '', 
    actividades_dificultades_hablar: '', 
    actividades_dificultades_desplazarse: '', 
    actividades_dificultades_masticar: '', 
    actividades_dificultades_retener_expulsar: '', 
    actividades_dificultades_caminar: '', 
    actividades_dificultades_piel_sana: '', 
    actividades_dificultades_relacionarse: '', 
    actividades_dificultades_mover_objetos: '', 
    actividades_dificultades_posturas: '', 
    actividades_dificultades_alimentarse: '', 
    actividades_dificultades_otra: '', 
    actitudes_negativos_familiares: '', 
    actitudes_negativos_vecinos: '', 
    actitudes_negativos_amigos: '', 
    actitudes_negativos_empleados: '', 
    actitudes_negativos_otras: '', 
    actitudes_negativos_nadie: '', 
    lugares_barreras_dormitorio: '', 
    lugares_barreras_sala: '', 
    lugares_barreras_baño: '', 
    lugares_barreras_escaleras: '', 
    lugares_barreras_pasillos: '', 
    lugares_barreras_andenes: '', 
    lugares_barreras_calles: '', 
    lugares_barreras_centros_edu: '', 
    lugares_barreras_lug_trabajo: '', 
    lugares_barreras_parques: '', 
    lugares_barreras_paraderos: '', 
    lugares_barreras_trans_publico: '', 
    lugares_barreras_hospitales: '', 
    lugares_barreras_tiendas: '', 
    lugares_barreras_otros: '', 
    lugares_barreras_ninguno: '', 
    medios_comunicacion_escritos: '', 
    medios_comunicacion_radio: '', 
    medios_comunicacion_television: '', 
    medios_comunicacion_senas: '', 
    medios_comunicacion_senas_naturales: '', 
    medios_comunicacion_telefono: '', 
    medios_comunicacion_internet: '', 
    medios_comunicacion_braille: '', 
    medios_comunicacion_ninguno: '', 
    derechos_deberes_pcd: '', 
    derechos_deberes_pcd_cuales: '', 
    certificado_discapacidad: '', 
    fecharegistro: '', 
    usuario: '', 
    estado: '', 
    tabla: '', 
    consecuencia_discapacidad_cual: '', 
    hace_cuantos_meses: ''
  });
  
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isOriginKnown, setIsOriginKnown] = useState(false);
  const [isLocationDisabled, setIsLocationDisabled] = useState(false);
  const [consequenceSections, setConsequenceSections] = useState({
    showAccident: false,
    showComplications: false,
    showHealthConditions: false,
    showArmedConflict: false,
    showSubstanceUse: false,
    showNaturalDisaster: false,
    showServiceDifficulty: false,
    showGeneralIllness: false,
    showProfessionalIllness: false,
    showGenetic: false,
    showSelfHarm: false,
    showOtherCause: false,
    showViolence: false,
  });

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
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_2 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row : any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row [index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setIsDisabled(transformedPeople[0].permanentes_ninguno === "2");
        setIsOriginKnown(transformedPeople[0].origen_discapacidad === "2");
        setIsLocationDisabled(transformedPeople[0].lugares_barreras_ninguno == 2);   
        
        const consequenceValue = transformedPeople[0].consecuencia_discapacidad;
        setConsequenceSections({
            showAccident: consequenceValue === '9',
            showComplications: consequenceValue === '2',
            showHealthConditions: consequenceValue === '1',
            showArmedConflict: consequenceValue === '11',
            showSubstanceUse: consequenceValue === '7',
            showNaturalDisaster: consequenceValue === '8',
            showServiceDifficulty: consequenceValue === '12',
            showGeneralIllness: consequenceValue === '3',
            showProfessionalIllness: consequenceValue === '6',
            showGenetic: consequenceValue === '4',
            showSelfHarm: consequenceValue === '5',
            showOtherCause: consequenceValue === '13',
            showViolence: consequenceValue === '10',
        });
        
    
        setButtonDisabled(transformedPeople[0].estado ? false : true);
      } else {
        setItems({
          id_usuario: params.ficha,
          cual_es_el_diagnostico: '',
          permanentes_sistema_nervioso: '',
          permanentes_los_ojos: '',
          permanentes_los_oidos: '',
          permanentes_demas_sentidos: '',
          permanentes_la_voz_el_habla: '',
          permanentes_cardiorrespiratorio_defensas: '',
          permanentes_digestion_metabolismo: '',
          permanentes_sistema_genital: '',
          permanentes_movimiento_del_cuerpo: '',
          permanentes_la_piel_unas_cabello: '',
          permanentes_ninguno: '',
          cual_afecta_mas: '',
          hace_cuanto_años: '',
          origen_discapacidad: '',
          consecuencia_discapacidad: '',
          enfermedad_profesional: '',
          consumo_psicoactivos: '',
          desastres_naturales: '',
          por_accidente: '',
          victima_de_violencia: '',
          del_conflicto_armado_por: '',
          dificultades_prestacion_servicios: '',
          en_la_familia_existen_personas_con_discapacidad: '',
          en_cual_pais_adquirio_discapacidad: '',
          en_cual_departamento_adquirio_discapacidad: '',
          en_cual_municipio_adquirio_discapacidad: '',
          discapacidad_auditiva: '',
          discapacidad_fisica: '',
          discapacidad_intelectual: '',
          discapacidad_mental: '',
          discapacidad_sordoceguera: '',
          discapacidad_visual: '',
          discapacidad_multiple: '',
          adicionales_a_las_anteriores: '',
          grado_discapacidad_intelectual: '',
          actividades_dificultades_pensar: '',
          actividades_dificultades_percibir_luz: '',
          actividades_dificultades_oir: '',
          actividades_dificultades_sabores: '',
          actividades_dificultades_hablar: '',
          actividades_dificultades_desplazarse: '',
          actividades_dificultades_masticar: '',
          actividades_dificultades_retener_expulsar: '',
          actividades_dificultades_caminar: '',
          actividades_dificultades_piel_sana: '',
          actividades_dificultades_relacionarse: '',
          actividades_dificultades_mover_objetos: '',
          actividades_dificultades_posturas: '',
          actividades_dificultades_alimentarse: '',
          actividades_dificultades_otra: '',
          actitudes_negativos_familiares: '',
          actitudes_negativos_vecinos: '',
          actitudes_negativos_amigos: '',
          actitudes_negativos_empleados: '',
          actitudes_negativos_otras: '',
          actitudes_negativos_nadie: '',
          lugares_barreras_dormitorio: '',
          lugares_barreras_sala: '',
          lugares_barreras_baño: '',
          lugares_barreras_escaleras: '',
          lugares_barreras_pasillos: '',
          lugares_barreras_andenes: '',
          lugares_barreras_calles: '',
          lugares_barreras_centros_edu: '',
          lugares_barreras_lug_trabajo: '',
          lugares_barreras_parques: '',
          lugares_barreras_paraderos: '',
          lugares_barreras_trans_publico: '',
          lugares_barreras_hospitales: '',
          lugares_barreras_tiendas: '',
          lugares_barreras_otros: '',
          lugares_barreras_ninguno: '',
          medios_comunicacion_escritos: '',
          medios_comunicacion_radio: '',
          medios_comunicacion_television: '',
          medios_comunicacion_senas: '',
          medios_comunicacion_senas_naturales: '',
          medios_comunicacion_telefono: '',
          medios_comunicacion_internet: '',
          medios_comunicacion_braille: '',
          medios_comunicacion_ninguno: '',
          derechos_deberes_pcd: '',
          derechos_deberes_pcd_cuales: '',
          certificado_discapacidad: '',
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: '1',
          tabla: 'discapacidad_capitulo_2',
          consecuencia_discapacidad_cual: '',
          hace_cuantos_meses: ''
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
        id_usuario: data.id_usuario || params.ficha,
        cual_es_el_diagnostico: data.cual_es_el_diagnostico || '',
        permanentes_sistema_nervioso: data.permanentes_sistema_nervioso || '',
        permanentes_los_ojos: data.permanentes_los_ojos || '',
        permanentes_los_oidos: data.permanentes_los_oidos || '',
        permanentes_demas_sentidos: data.permanentes_demas_sentidos || '',
        permanentes_la_voz_el_habla: data.permanentes_la_voz_el_habla || '',
        permanentes_cardiorrespiratorio_defensas: data.permanentes_cardiorrespiratorio_defensas || '',
        permanentes_digestion_metabolismo: data.permanentes_digestion_metabolismo || '',
        permanentes_sistema_genital: data.permanentes_sistema_genital || '',
        permanentes_movimiento_del_cuerpo: data.permanentes_movimiento_del_cuerpo || '',
        permanentes_la_piel_unas_cabello: data.permanentes_la_piel_unas_cabello || '',
        permanentes_ninguno: data.permanentes_ninguno || '',
        cual_afecta_mas: data.cual_afecta_mas || '',
        hace_cuanto_años: data.hace_cuanto_años || '',
        origen_discapacidad: data.origen_discapacidad || '',
        consecuencia_discapacidad: data.consecuencia_discapacidad || '',
        enfermedad_profesional: data.enfermedad_profesional || '',
        consumo_psicoactivos: data.consumo_psicoactivos || '',
        desastres_naturales: data.desastres_naturales || '',
        por_accidente: data.por_accidente || '',
        victima_de_violencia: data.victima_de_violencia || '',
        del_conflicto_armado_por: data.del_conflicto_armado_por || '',
        dificultades_prestacion_servicios: data.dificultades_prestacion_servicios || '',
        en_la_familia_existen_personas_con_discapacidad: data.en_la_familia_existen_personas_con_discapacidad || '',
        en_cual_pais_adquirio_discapacidad: data.en_cual_pais_adquirio_discapacidad || '',
        en_cual_departamento_adquirio_discapacidad: data.en_cual_departamento_adquirio_discapacidad || '',
        en_cual_municipio_adquirio_discapacidad: data.en_cual_municipio_adquirio_discapacidad || '',
        discapacidad_auditiva: data.discapacidad_auditiva || '',
        discapacidad_fisica: data.discapacidad_fisica || '',
        discapacidad_intelectual: data.discapacidad_intelectual || '',
        discapacidad_mental: data.discapacidad_mental || '',
        discapacidad_sordoceguera: data.discapacidad_sordoceguera || '',
        discapacidad_visual: data.discapacidad_visual || '',
        discapacidad_multiple: data.discapacidad_multiple || '',
        adicionales_a_las_anteriores: data.adicionales_a_las_anteriores || '',
        grado_discapacidad_intelectual: data.grado_discapacidad_intelectual || '',
        actividades_dificultades_pensar: data.actividades_dificultades_pensar || '',
        actividades_dificultades_percibir_luz: data.actividades_dificultades_percibir_luz || '',
        actividades_dificultades_oir: data.actividades_dificultades_oir || '',
        actividades_dificultades_sabores: data.actividades_dificultades_sabores || '',
        actividades_dificultades_hablar: data.actividades_dificultades_hablar || '',
        actividades_dificultades_desplazarse: data.actividades_dificultades_desplazarse || '',
        actividades_dificultades_masticar: data.actividades_dificultades_masticar || '',
        actividades_dificultades_retener_expulsar: data.actividades_dificultades_retener_expulsar || '',
        actividades_dificultades_caminar: data.actividades_dificultades_caminar || '',
        actividades_dificultades_piel_sana: data.actividades_dificultades_piel_sana || '',
        actividades_dificultades_relacionarse: data.actividades_dificultades_relacionarse || '',
        actividades_dificultades_mover_objetos: data.actividades_dificultades_mover_objetos || '',
        actividades_dificultades_posturas: data.actividades_dificultades_posturas || '',
        actividades_dificultades_alimentarse: data.actividades_dificultades_alimentarse || '',
        actividades_dificultades_otra: data.actividades_dificultades_otra || '',
        actitudes_negativos_familiares: data.actitudes_negativos_familiares || '',
        actitudes_negativos_vecinos: data.actitudes_negativos_vecinos || '',
        actitudes_negativos_amigos: data.actitudes_negativos_amigos || '',
        actitudes_negativos_empleados: data.actitudes_negativos_empleados || '',
        actitudes_negativos_otras: data.actitudes_negativos_otras || '',
        actitudes_negativos_nadie: data.actitudes_negativos_nadie || '',
        lugares_barreras_dormitorio: data.lugares_barreras_dormitorio || '',
        lugares_barreras_sala: data.lugares_barreras_sala || '',
        lugares_barreras_baño: data.lugares_barreras_baño || '',
        lugares_barreras_escaleras: data.lugares_barreras_escaleras || '',
        lugares_barreras_pasillos: data.lugares_barreras_pasillos || '',
        lugares_barreras_andenes: data.lugares_barreras_andenes || '',
        lugares_barreras_calles: data.lugares_barreras_calles || '',
        lugares_barreras_centros_edu: data.lugares_barreras_centros_edu || '',
        lugares_barreras_lug_trabajo: data.lugares_barreras_lug_trabajo || '',
        lugares_barreras_parques: data.lugares_barreras_parques || '',
        lugares_barreras_paraderos: data.lugares_barreras_paraderos || '',
        lugares_barreras_trans_publico: data.lugares_barreras_trans_publico || '',
        lugares_barreras_hospitales: data.lugares_barreras_hospitales || '',
        lugares_barreras_tiendas: data.lugares_barreras_tiendas || '',
        lugares_barreras_otros: data.lugares_barreras_otros || '',
        lugares_barreras_ninguno: data.lugares_barreras_ninguno || '',
        medios_comunicacion_escritos: data.medios_comunicacion_escritos || '',
        medios_comunicacion_radio: data.medios_comunicacion_radio || '',
        medios_comunicacion_television: data.medios_comunicacion_television || '',
        medios_comunicacion_senas: data.medios_comunicacion_senas || '',
        medios_comunicacion_senas_naturales: data.medios_comunicacion_senas_naturales || '',
        medios_comunicacion_telefono: data.medios_comunicacion_telefono || '',
        medios_comunicacion_internet: data.medios_comunicacion_internet || '',
        medios_comunicacion_braille: data.medios_comunicacion_braille || '',
        medios_comunicacion_ninguno: data.medios_comunicacion_ninguno || '',
        derechos_deberes_pcd: data.derechos_deberes_pcd || '',
        derechos_deberes_pcd_cuales: data.derechos_deberes_pcd_cuales || '',
        certificado_discapacidad: data.certificado_discapacidad || '',
        fecharegistro: data.fecharegistro || getCurrentDateTime(),
        usuario: data.usuario || localStorage.getItem('cedula'),
        estado: data.estado || '1',
        tabla: data.tabla || 'discapacidad_capitulo_2',
        consecuencia_discapacidad_cual: data.consecuencia_discapacidad_cual || '',
        hace_cuantos_meses: data.hace_cuantos_meses || ''
      });
    }
  }, [people]);
  

  useEffect(() => {
    fetchUsers();
  }, [db]);

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    if (field === 'permanentes_ninguno') {
      setIsDisabled(value === "2"); // Desactiva si `value` es "2" (SI)
      
    }

    if (field === 'origen_discapacidad') {
      setIsOriginKnown(value === '2'); // "SI" habilita
    }

    
  
    // Si estamos en el campo de "consecuencia_discapacidad" (2.6)
    if (field === 'consecuencia_discapacidad') {
      const sections = {
        showAccident: value === '9',
        showComplications: value === '2',
        showHealthConditions: value === '1',
        showArmedConflict: value === '11',
        showSubstanceUse: value === '7',
        showNaturalDisaster: value === '8',
        showServiceDifficulty: value === '12',
        showGeneralIllness: value === '3',
        showProfessionalIllness: value === '6',
        showGenetic: value === '4',
        showSelfHarm: value === '5',
        showOtherCause: value === '13',
        showViolence: value === '10',
      };
        setItems((prevItems) => ({
            ...prevItems,
            consecuencia_discapacidad: '',
            enfermedad_profesional: '',
            consumo_psicoactivos: '',
            desastres_naturales: '',
            por_accidente: '',
            victima_de_violencia: '',
            del_conflicto_armado_por: '',
            dificultades_prestacion_servicios: '',
            en_la_familia_existen_personas_con_discapacidad:''
        }));
    
      setConsequenceSections(sections);
    }
    
    setItems((prevItems) => ({
      ...prevItems,
      [field]: value,
      
      ...(field === 'permanentes_ninguno' && value === "2" ? { 
        cual_es_el_diagnostico:'',
        consecuencia_discapacidad_cual:'',
        permanentes_sistema_nervioso: '1',
        permanentes_los_ojos: '1',
        permanentes_los_oidos: '1',
        permanentes_demas_sentidos: '1',
        permanentes_la_voz_el_habla: '1',
        permanentes_cardiorrespiratorio_defensas: '1',
        permanentes_digestion_metabolismo: '1',
        permanentes_sistema_genital: '1',
        permanentes_movimiento_del_cuerpo: '1',
        permanentes_la_piel_unas_cabello: '1',
        cual_afecta_mas: '',
        hace_cuanto_años: '',
        hace_cuantos_meses: '',
        origen_discapacidad: '',
        consecuencia_discapacidad: '',
        enfermedad_profesional: '',
        consumo_psicoactivos: '',
        desastres_naturales: '',
        por_accidente: '',
        victima_de_violencia: '',
        del_conflicto_armado_por: '',
        dificultades_prestacion_servicios: '',
        en_la_familia_existen_personas_con_discapacidad: '',
        en_cual_pais_adquirio_discapacidad: '',
        en_cual_departamento_adquirio_discapacidad: '',
        en_cual_municipio_adquirio_discapacidad: '',
        discapacidad_auditiva: '1',
        discapacidad_fisica: '1',
        discapacidad_intelectual: '1',
        discapacidad_mental: '1',
        discapacidad_sordoceguera: '1',
        discapacidad_visual: '1',
        discapacidad_multiple: '1',
        adicionales_a_las_anteriores: '',
        grado_discapacidad_intelectual: '',
        actividades_dificultades_pensar: '1',
        actividades_dificultades_percibir_luz: '1',
        actividades_dificultades_oir: '1',
        actividades_dificultades_sabores: '1',
        actividades_dificultades_hablar: '1',
        actividades_dificultades_desplazarse: '1',
        actividades_dificultades_masticar: '1',
        actividades_dificultades_retener_expulsar: '1',
        actividades_dificultades_caminar: '1',
        actividades_dificultades_piel_sana: '1',
        actividades_dificultades_relacionarse: '1',
        actividades_dificultades_mover_objetos: '1',
        actividades_dificultades_posturas: '1',
        actividades_dificultades_alimentarse: '1',
        actividades_dificultades_otra: '1',
        actitudes_negativos_familiares: '1',
        actitudes_negativos_vecinos: '1',
        actitudes_negativos_amigos: '1',
        actitudes_negativos_empleados: '1',
        actitudes_negativos_otras: '1',
        actitudes_negativos_nadie: '1',
        lugares_barreras_dormitorio: '1',
        lugares_barreras_sala: '1',
        lugares_barreras_baño: '1',
        lugares_barreras_escaleras: '1',
        lugares_barreras_pasillos: '1',
        lugares_barreras_andenes: '1',
        lugares_barreras_calles: '1',
        lugares_barreras_centros_edu: '1',
        lugares_barreras_lug_trabajo: '1',
        lugares_barreras_parques: '1',
        lugares_barreras_paraderos: '1',
        lugares_barreras_trans_publico: '1',
        lugares_barreras_hospitales: '1',
        lugares_barreras_tiendas: '1',
        lugares_barreras_otros: '1',
        lugares_barreras_ninguno: '1',
        medios_comunicacion_escritos: '1',
        medios_comunicacion_radio: '1',
        medios_comunicacion_television: '1',
        medios_comunicacion_senas: '1',
        medios_comunicacion_senas_naturales: '1',
        medios_comunicacion_telefono: '1',
        medios_comunicacion_internet: '1',
        medios_comunicacion_braille: '1',
        medios_comunicacion_ninguno: '1',
        derechos_deberes_pcd: '',
        derechos_deberes_pcd_cuales: '',
        certificado_discapacidad: ''
      } : {}), 
      ...(field === 'consecuencia_discapacidad' ? {
        consecuencia_discapacidad_cual: value !== '13' ? "NO APLICA" : ''
      } : {}),
      ...(field === 'origen_discapacidad' && value === "1" ? { 
        consecuencia_discapacidad: '',
        enfermedad_profesional: '',
        consumo_psicoactivos: '',
        desastres_naturales: '',
        por_accidente: '',
        victima_de_violencia: '',
        del_conflicto_armado_por: '',
        dificultades_prestacion_servicios: ''
      } : {}),
      ...(field === 'lugares_barreras_ninguno' && value === "2" ? {
        lugares_barreras_dormitorio: '1',
        lugares_barreras_sala: '1',
        lugares_barreras_baño: '1',
        lugares_barreras_escaleras: '1',
        lugares_barreras_pasillos: '1',
        lugares_barreras_andenes: '1',
        lugares_barreras_calles: '1',
        lugares_barreras_centros_edu: '1',
        lugares_barreras_lug_trabajo: '1',
        lugares_barreras_parques: '1',
        lugares_barreras_paraderos: '1',
        lugares_barreras_trans_publico: '1',
        lugares_barreras_hospitales: '1',
        lugares_barreras_tiendas: '1',
        lugares_barreras_otros: '1'
      } : {}),
      ...(field === 'derechos_deberes_pcd' ? {
        derechos_deberes_pcd_cuales: value !== '2' ? "NO APLICA" : ''
      } : {})
    }));
    console.log(items);

    if (field === 'lugares_barreras_ninguno') {
      setIsLocationDisabled(value === "2");
    }
  };

  // useEffect(() => {
  //   console.log("Items updated:", items);
  // }, [items]);

  // const validarCampos = () => {
  //   const camposObligatorios = ['tipoevacuacion', 'danosvivienda', 'danosenseres'];
  //   for (let campo of camposObligatorios) {
  //     if (!items[campo]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };


  const enviar = async (database = db, event: React.MouseEvent<HTMLButtonElement>) => {
    // if (!validarCampos()) {
    //   // alert('Por favor, completa todos los campos obligatorios.');
    //   return;
    // }
    event.preventDefault();
    console.log(items);
    try {
      await db.exec(`
        INSERT OR REPLACE INTO discapacidad_capitulo_2 (
          id_usuario, cual_es_el_diagnostico, permanentes_sistema_nervioso, permanentes_los_ojos, permanentes_los_oidos, permanentes_demas_sentidos,
          permanentes_la_voz_el_habla, permanentes_cardiorrespiratorio_defensas, permanentes_digestion_metabolismo, permanentes_sistema_genital, 
          permanentes_movimiento_del_cuerpo, permanentes_la_piel_unas_cabello, permanentes_ninguno, cual_afecta_mas, hace_cuanto_años, origen_discapacidad, 
          consecuencia_discapacidad, enfermedad_profesional, consumo_psicoactivos, desastres_naturales, por_accidente, victima_de_violencia, 
          del_conflicto_armado_por, dificultades_prestacion_servicios, en_la_familia_existen_personas_con_discapacidad, en_cual_pais_adquirio_discapacidad, 
          en_cual_departamento_adquirio_discapacidad, en_cual_municipio_adquirio_discapacidad, discapacidad_auditiva, discapacidad_fisica, 
          discapacidad_intelectual, discapacidad_mental, discapacidad_sordoceguera, discapacidad_visual, discapacidad_multiple, 
          adicionales_a_las_anteriores, grado_discapacidad_intelectual, actividades_dificultades_pensar, actividades_dificultades_percibir_luz, 
          actividades_dificultades_oir, actividades_dificultades_sabores, actividades_dificultades_hablar, actividades_dificultades_desplazarse, 
          actividades_dificultades_masticar, actividades_dificultades_retener_expulsar, actividades_dificultades_caminar, actividades_dificultades_piel_sana, 
          actividades_dificultades_relacionarse, actividades_dificultades_mover_objetos, actividades_dificultades_posturas, actividades_dificultades_alimentarse, 
          actividades_dificultades_otra, actitudes_negativos_familiares, actitudes_negativos_vecinos, actitudes_negativos_amigos, actitudes_negativos_empleados, 
          actitudes_negativos_otras, actitudes_negativos_nadie, lugares_barreras_dormitorio, lugares_barreras_sala, lugares_barreras_baño, lugares_barreras_escaleras, 
          lugares_barreras_pasillos, lugares_barreras_andenes, lugares_barreras_calles, lugares_barreras_centros_edu, lugares_barreras_lug_trabajo, 
          lugares_barreras_parques, lugares_barreras_paraderos, lugares_barreras_trans_publico, lugares_barreras_hospitales, lugares_barreras_tiendas, 
          lugares_barreras_otros, lugares_barreras_ninguno, medios_comunicacion_escritos, medios_comunicacion_radio, medios_comunicacion_television, 
          medios_comunicacion_senas, medios_comunicacion_senas_naturales, medios_comunicacion_telefono, medios_comunicacion_internet, 
          medios_comunicacion_braille, medios_comunicacion_ninguno, derechos_deberes_pcd, derechos_deberes_pcd_cuales, certificado_discapacidad, 
          fecharegistro, usuario, estado, tabla, consecuencia_discapacidad_cual, hace_cuantos_meses
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
         ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?);`,
        [
          items.id_usuario, items.cual_es_el_diagnostico, items.permanentes_sistema_nervioso, items.permanentes_los_ojos, items.permanentes_los_oidos, items.permanentes_demas_sentidos, 
          items.permanentes_la_voz_el_habla, items.permanentes_cardiorrespiratorio_defensas, items.permanentes_digestion_metabolismo, 
          items.permanentes_sistema_genital, items.permanentes_movimiento_del_cuerpo, items.permanentes_la_piel_unas_cabello, items.permanentes_ninguno, 
          items.cual_afecta_mas, items.hace_cuanto_años, items.origen_discapacidad, items.consecuencia_discapacidad, items.enfermedad_profesional, 
          items.consumo_psicoactivos, items.desastres_naturales, items.por_accidente, items.victima_de_violencia, items.del_conflicto_armado_por, 
          items.dificultades_prestacion_servicios, items.en_la_familia_existen_personas_con_discapacidad, items.en_cual_pais_adquirio_discapacidad, 
          items.en_cual_departamento_adquirio_discapacidad, items.en_cual_municipio_adquirio_discapacidad, items.discapacidad_auditiva, items.discapacidad_fisica, 
          items.discapacidad_intelectual, items.discapacidad_mental, items.discapacidad_sordoceguera, items.discapacidad_visual, items.discapacidad_multiple, 
          items.adicionales_a_las_anteriores, items.grado_discapacidad_intelectual, items.actividades_dificultades_pensar, items.actividades_dificultades_percibir_luz, 
          items.actividades_dificultades_oir, items.actividades_dificultades_sabores, items.actividades_dificultades_hablar, items.actividades_dificultades_desplazarse, 
          items.actividades_dificultades_masticar, items.actividades_dificultades_retener_expulsar, items.actividades_dificultades_caminar, items.actividades_dificultades_piel_sana, 
          items.actividades_dificultades_relacionarse, items.actividades_dificultades_mover_objetos, items.actividades_dificultades_posturas, items.actividades_dificultades_alimentarse, 
          items.actividades_dificultades_otra, items.actitudes_negativos_familiares, items.actitudes_negativos_vecinos, items.actitudes_negativos_amigos, 
          items.actitudes_negativos_empleados, items.actitudes_negativos_otras, items.actitudes_negativos_nadie, items.lugares_barreras_dormitorio, 
          items.lugares_barreras_sala, items.lugares_barreras_baño, items.lugares_barreras_escaleras, items.lugares_barreras_pasillos, items.lugares_barreras_andenes, 
          items.lugares_barreras_calles, items.lugares_barreras_centros_edu, items.lugares_barreras_lug_trabajo, items.lugares_barreras_parques, 
          items.lugares_barreras_paraderos, items.lugares_barreras_trans_publico, items.lugares_barreras_hospitales, items.lugares_barreras_tiendas, 
          items.lugares_barreras_otros, items.lugares_barreras_ninguno, items.medios_comunicacion_escritos, items.medios_comunicacion_radio, 
          items.medios_comunicacion_television, items.medios_comunicacion_senas, items.medios_comunicacion_senas_naturales, items.medios_comunicacion_telefono, 
          items.medios_comunicacion_internet, items.medios_comunicacion_braille, items.medios_comunicacion_ninguno, items.derechos_deberes_pcd, 
          items.derechos_deberes_pcd_cuales, items.certificado_discapacidad, items.fecharegistro, items.usuario, items.estado, items.tabla, 
          items.consecuencia_discapacidad_cual, items.hace_cuantos_meses
        ]
    );
    
    
  
      const respSelect = db.exec(`SELECT * FROM "discapacidad_capitulo_2" WHERE id_usuario="${items.id_usuario}";`);
      setButtonDisabled(false);
      saveDatabase();
      alert('Datos guardados con éxito');
    } catch (err) {
      console.error('Error al guardar los datos:', err);
    }
  };
  

  
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle slot="start">CAPITULO II. CARACTERIZACIÓN Y ORIGEN DE LA DISCAPACIDAD</IonTitle>  
        <IonTitle slot="end">ID_INTEGRANTE: <label style={{color:'#17a2b8'}}>{params.ficha}</label> </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <form>
    {/* <div className="social-card">
      <span className="label">Ficha social:</span>
      <span className="value">{params.ficha}</span>
    </div> */}


    
<div className=' shadow p-3  bg-white rounded'>
<IonList>
  <br />
<div className="row  g-3 was-validated">
    <div className="row ">
      <div className=" col-sm">
        <label >2.1 Cual es el diagnóstico en salud:</label>
        <textarea
          className="form-control"
          id="cual_es_el_diagnostico"
          style={{ textTransform: 'uppercase' }}
          rows="5"
          required
          value={items.cual_es_el_diagnostico}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'cual_es_el_diagnostico')}
        />
      </div>
    </div>
    <hr />
    <div className="row ">
      <div className=" col-sm">
        2.2 Por su condición de salud, presenta alteraciones permanentes en: 
        <strong>(Debes seleccionar “SI” mínimo en una opción).</strong>
      </div>
      <hr />
    </div>
    
    <div className="row  pb-3">
      <div className=" col-sm">
        <label htmlFor="permanentes_sistema_nervioso">El sistema nervioso</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_sistema_nervioso"
          required
          value={items.permanentes_sistema_nervioso}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_sistema_nervioso')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className=" col-sm">
        <label htmlFor="permanentes_los_ojos">Los ojos</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_los_ojos"
          required
          value={items.permanentes_los_ojos}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_los_ojos')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="permanentes_los_oidos">Los oídos</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_los_oidos"
          required
          value={items.permanentes_los_oidos}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_los_oidos')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className=" col-sm">
        <label htmlFor="permanentes_demas_sentidos">Los demás órganos de los sentidos (Olfato, Tacto, Gusto)</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_demas_sentidos"
          required
          value={items.permanentes_demas_sentidos}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_demas_sentidos')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="permanentes_la_voz_el_habla">La voz, el habla</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_la_voz_el_habla"
          required
          value={items.permanentes_la_voz_el_habla}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_la_voz_el_habla')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className=" col-sm">
        <label htmlFor="permanentes_cardiorrespiratorio_defensas">El sistema cardiorrespiratorio, las defensas</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_cardiorrespiratorio_defensas"
          required
          value={items.permanentes_cardiorrespiratorio_defensas}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_cardiorrespiratorio_defensas')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="permanentes_digestion_metabolismo">La digestión, el metabolismo, las hormonas</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_digestion_metabolismo"
          required
          value={items.permanentes_digestion_metabolismo}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_digestion_metabolismo')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className=" col-sm">
        <label htmlFor="permanentes_sistema_genital">El sistema genital, urinario, reproductivo</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_sistema_genital"
          required
          value={items.permanentes_sistema_genital}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_sistema_genital')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="permanentes_movimiento_del_cuerpo">El movimiento del cuerpo, manos, brazos, piernas</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_movimiento_del_cuerpo"
          required
          value={items.permanentes_movimiento_del_cuerpo}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_movimiento_del_cuerpo')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className=" col-sm">
        <label htmlFor="permanentes_la_piel_unas_cabello">La piel, las uñas, el cabello</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_la_piel_unas_cabello"
          required
          value={items.permanentes_la_piel_unas_cabello}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'permanentes_la_piel_unas_cabello')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>
    <div className="row ">
      <div className=" col-sm">
        <label htmlFor="permanentes_ninguno">Ninguno (Persona sin discapacidad)  (pase al capítulo XII)</label>
        <select
          className="form-control form-control-sm"
          id="permanentes_ninguno"
          required
          value={items.permanentes_ninguno}
            onChange={(e) => handleInputChange(e, 'permanentes_ninguno')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>
    <hr />
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="cual_afecta_mas">2.3 ¿Cuál es la que más le afecta?</label>
        <textarea
          className="form-control"
          id="cual_afecta_mas"
          style={{ textTransform: 'uppercase' }}
          rows="5"
          required
          value={items.cual_afecta_mas}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'cual_afecta_mas')}
        />
      </div>
    </div>
    <hr />
    <div className="row pb-3">
      <div className=" col-sm">
        2.4 ¿Hace cuánto presenta esta alteración?
      </div>
    </div>
    <div className="row ">
      <div className=" col-sm">
        <label htmlFor="hace_cuanto_años">Años</label>
        <input
          type="number"
          className="form-control form-control-sm"
          id="hace_cuanto_años"
          required
          value={items.hace_cuanto_años}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'hace_cuanto_años')}
        />
      </div>
      <div className=" col-sm">
        <label htmlFor="hace_cuantos_meses">Meses</label>
        <input
          type="number"
          className="form-control form-control-sm"
          id="hace_cuantos_meses"
          required
          value={items.hace_cuantos_meses}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'hace_cuantos_meses')}
        />
      </div>
    </div>
    <hr />
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="origen_discapacidad">2.5 ¿Sabe usted cuál es el origen de su discapacidad?</label>
        <select
          className="form-control form-control-sm"
          id="origen_discapacidad"
          required
          value={items.origen_discapacidad}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'origen_discapacidad')}
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className=" col-sm">
        <label htmlFor="consecuencia_discapacidad">2.6 Principalmente, su discapacidad es consecuencia de:</label>
        <select
          className="form-control form-control-sm"
          id="consecuencia_discapacidad"
          required
          value={items.consecuencia_discapacidad}
           disabled={isDisabled || !isOriginKnown} onChange={(e) => handleInputChange(e, 'consecuencia_discapacidad')}
        >
        <option value=""> SELECCIONE </option><option value="9"> ACCIDENTE (PASE A 2.10) </option><option value="2"> COMPLICACIONES DURANTE EL PARTO (PASE A 2.14) </option><option value="1"> CONDICIONES DE SALUD DE LA MADRE DURANTE EL EMBARAZO (PASE A 2.14) </option><option value="11"> CONFLICTO ARMADO (PASE A 2.12) </option><option value="7"> CONSUMO DE PSICOACTIVOS (PASE A 2.8) </option><option value="8"> DESASTRE NATURAL (PASE A 2.9) </option><option value="12"> DIFICULTADES DE SERVICIOS (PASE A 2.13) </option><option value="3"> ENFERMEDAD GENERAL (PASE A 2.14) </option><option value="6"> ENFERMEDAD PROFESIONAL (PASE A 2.7) </option><option value="4"> GENÉTICA, HEREDITARIA (PASE A 2.14) </option><option value="5"> LESIÓN AUTOINFLIGIDA (PASE A 2.14) </option><option value="13"> OTRA CAUSA (PASE A 2.14) ¿CUÁL? </option><option value="10"> VICTIMA DE VIOLENCIA (PASE A 2.11) </option>        </select>
      </div>
    </div>
    {(items.consecuencia_discapacidad == '13')?
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="consecuencia_discapacidad_cual">Informa cuál:</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="consecuencia_discapacidad_cual"
          style={{ textTransform: 'uppercase' }}
          value={items.consecuencia_discapacidad_cual}
           disabled={isDisabled || !isOriginKnown} onChange={(e) => handleInputChange(e, 'consecuencia_discapacidad_cual')}
        />
      </div>
    </div>:''}
    <hr />
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="enfermedad_profesional">2.7 Enfermedad profesional por:</label>
        <select
          className="form-control form-control-sm"
          id="enfermedad_profesional"
          required
          value={items.enfermedad_profesional}
           disabled={isDisabled || !isOriginKnown || !consequenceSections.showProfessionalIllness} onChange={(e) => handleInputChange(e, 'enfermedad_profesional')}
        >
        <option value=""> SELECCIONE </option><option value="4"> CARGA DE TRABAJO FÍSICA O MENTAL </option><option value="2"> CONDICIONES DE SEGURIDAD </option><option value="3"> CONTAMINANTES (QUÍMICOS, BIOLÓGICOS) </option><option value="1"> MEDIO AMBIENTE DEL LUGAR DE TRABAJO </option><option value="5"> ORGANIZACIÓN DEL TRABAJO </option><option value="6"> OTRA CAUSA </option>        </select>
      </div>
      <div className=" col-sm">
        <label htmlFor="consumo_psicoactivos">2.8 Por consumo de psicoactivos:</label>
        <select
          className="form-control form-control-sm"
          id="consumo_psicoactivos"
          required
          value={items.consumo_psicoactivos}
           disabled={isDisabled || !isOriginKnown || !consequenceSections.showSubstanceUse} onChange={(e) => handleInputChange(e, 'consumo_psicoactivos')}
        >
          <option value=""> SELECCIONE </option><option value="1"> PSICOACTIVOS ACEPTADOS SOCIALMENTE </option><option value="2"> PSICOACTIVOS SOCIALMENTE NO ACEPTADOS </option>        </select>
      </div>
    </div>
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="desastres_naturales">2.9 Desastres naturales:</label>
        <select
          className="form-control form-control-sm"
          id="desastres_naturales"
          required
          value={items.desastres_naturales}
           disabled={isDisabled || !isOriginKnown || !consequenceSections.showNaturalDisaster} onChange={(e) => handleInputChange(e, 'desastres_naturales')}
        >
        <option value=""> SELECCIONE </option><option value="3"> DESLIZAMIENTO </option><option value="2"> INUNDACIÓN </option><option value="4"> OTRO DESASTRE NATURAL </option><option value="1"> TERREMOTO </option>        </select>
      </div>
      <div className=" col-sm">
        <label htmlFor="por_accidente">2.10 Por accidente:</label>
        <select
          className="form-control form-control-sm"
          id="por_accidente"
          required
          value={items.por_accidente}
           disabled={isDisabled || !isOriginKnown || !consequenceSections.showAccident} onChange={(e) => handleInputChange(e, 'por_accidente')}
        >
          <option value=""> SELECCIONE </option><option value="1"> DE TRABAJO </option><option value="2"> DE TRÁNSITO </option><option value="3"> DEPORTIVO </option><option value="4"> EN EL CENTRO EDUCATIVO </option><option value="5"> EN EL HOGAR </option><option value="6"> OTRO TIPO DE ACCIDENTE </option>         </select>
      </div>
    </div>
    <div className="row pb-3">
      <div className=" col-sm">
        <label htmlFor="victima_de_violencia">2.11 Como víctima de violencia:</label>
        <select
          className="form-control form-control-sm"
          id="victima_de_violencia"
          required
          value={items.victima_de_violencia}
           disabled={isDisabled || !isOriginKnown || !consequenceSections.showViolence} onChange={(e) => handleInputChange(e, 'victima_de_violencia')}
        >
          <option value=""> SELECCIONE </option><option value="1"> AL INTERIOR DEL HOGAR </option><option value="2"> DELICUENCIA COMÚN </option><option value="4"> OTRA </option><option value="3"> SOCIAL </option>        </select>
      </div>
      <div className=" col-sm">
        <label htmlFor="del_conflicto_armado_por">2.12 Del conflicto armado por:</label>
        <select
          className="form-control form-control-sm"
          id="del_conflicto_armado_por"
          required
          value={items.del_conflicto_armado_por}
           disabled={isDisabled || !isOriginKnown || !consequenceSections.showArmedConflict} onChange={(e) => handleInputChange(e, 'del_conflicto_armado_por')}
        >
          <option value=""> SELECCIONE </option><option value="1"> ARMA DE FUEGO </option><option value="5"> ARTEFACTOS EXPLOSIVOS IMPROVISADOS AEI  </option><option value="2"> BOMBA </option><option value="3"> MINAS ANTIPERSONALES MAP </option><option value="4"> MUNICIONES SIN EXPLOTAR MUSE </option><option value="6"> OTRO TIPO DE ARMA </option>        </select>
      </div>
    </div>
    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="dificultades_prestacion_servicios">2.13 Dificultades en la prestación de servicios de salud por:</label>
        <select
          className="form-control form-control-sm"
          id="dificultades_prestacion_servicios"
          required
          value={items.dificultades_prestacion_servicios}
           disabled={isDisabled || !isOriginKnown || !consequenceSections.showServiceDifficulty} onChange={(e) => handleInputChange(e, 'dificultades_prestacion_servicios')}
        >
          <option value=""> SELECCIONE </option><option value="1"> ATENCIÓN MÉDICA INOPORTUNA </option><option value="4"> DEFICIENCIAS EN LA CALIDAD DE LA ATENCIÓN </option><option value="2"> EQUIVOCACIONES EN EL DIAGNÓSTICO </option><option value="3"> FORMULACIÓN O APLICACIÓN MALA DE MEDICAMENTOS </option><option value="5"> OTRA </option>        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="en_la_familia_existen_personas_con_discapacidad">2.14 ¿En su familia existen o existieron más personas con discapacidad?:</label>
        <select
          className="form-control form-control-sm"
          id="en_la_familia_existen_personas_con_discapacidad"
          required
          value={items.en_la_familia_existen_personas_con_discapacidad}
           disabled={isDisabled || !isOriginKnown} onChange={(e) => handleInputChange(e, 'en_la_familia_existen_personas_con_discapacidad')}
        >
        <option value=""> SELECCIONE </option><option value="2"> NO </option><option value="3"> NO SABE </option><option value="1"> SI </option>        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="en_cual_pais_adquirio_discapacidad">2.15 ¿En cuál país adquirió la discapacidad?:</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="en_cual_pais_adquirio_discapacidad"
          value={items.en_cual_pais_adquirio_discapacidad}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'en_cual_pais_adquirio_discapacidad')}
          required
        />
      </div>
      <div className="form-group col-sm">
        <label htmlFor="en_cual_departamento_adquirio_discapacidad">2.16 ¿En cuál departamento adquirió la discapacidad?:</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="en_cual_departamento_adquirio_discapacidad"
          value={items.en_cual_departamento_adquirio_discapacidad}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'en_cual_departamento_adquirio_discapacidad')}
          required
        />
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="en_cual_municipio_adquirio_discapacidad">2.17 ¿En cuál municipio adquirió la discapacidad?:</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="en_cual_municipio_adquirio_discapacidad"
          value={items.en_cual_municipio_adquirio_discapacidad}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'en_cual_municipio_adquirio_discapacidad')}
          required
        />
      </div>
    </div>

    <hr />

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="discapacidad_auditiva">2.18 Incluya su discapacidad en las siguientes categorías: (Debe seleccionar "SI" mínimo en una opción)</label>
        <select
          className="form-control form-control-sm"
          id="discapacidad_auditiva"
          value={items.discapacidad_auditiva}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'discapacidad_auditiva')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="discapacidad_fisica">Física</label>
        <select
          className="form-control form-control-sm"
          id="discapacidad_fisica"
          value={items.discapacidad_fisica}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'discapacidad_fisica')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="discapacidad_intelectual">Intelectual</label>
        <select
          className="form-control form-control-sm"
          id="discapacidad_intelectual"
          value={items.discapacidad_intelectual}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'discapacidad_intelectual')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="discapacidad_mental">Mental</label>
        <select
          className="form-control form-control-sm"
          id="discapacidad_mental"
          value={items.discapacidad_mental}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'discapacidad_mental')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="discapacidad_sordoceguera">Sordoceguera</label>
        <select
          className="form-control form-control-sm"
          id="discapacidad_sordoceguera"
          value={items.discapacidad_sordoceguera}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'discapacidad_sordoceguera')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="discapacidad_visual">Visual</label>
        <select
          className="form-control form-control-sm"
          id="discapacidad_visual"
          value={items.discapacidad_visual}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'discapacidad_visual')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="discapacidad_multiple">Múltiple</label>
        <select
          className="form-control form-control-sm"
          id="discapacidad_multiple"
          value={items.discapacidad_multiple}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'discapacidad_multiple')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <hr />

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="adicionales_a_las_anteriores">2.18.1 Otras específicas adicionales a las anteriores:</label>
        <select
          className="form-control form-control-sm"
          id="adicionales_a_las_anteriores"
          value={items.adicionales_a_las_anteriores}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'adicionales_a_las_anteriores')}
          required
        >
        <option value=""> SELECCIONE </option><option value="2"> GRAVE </option><option value="1"> LEVE </option><option value="3"> MODERADA </option><option value="4"> PROFUNDA </option>         </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="grado_discapacidad_intelectual">2.18.2 Grado de discapacidad intelectual (En caso de presentarla):</label>
        <select
          className="form-control form-control-sm"
          id="grado_discapacidad_intelectual"
          value={items.grado_discapacidad_intelectual}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'grado_discapacidad_intelectual')}
          required
        >
          <option value=""> SELECCIONE </option><option value="2"> GRAVE </option><option value="1"> LEVE </option><option value="3"> MODERADA </option><option value="4"> PROFUNDA </option>         </select>
      </div>
    </div>

    <hr />

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_pensar">2.19 En sus actividades diarias presenta dificultades permanentes para: (Debe seleccionar "SI" mínimo en una opción)</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_pensar"
          value={items.actividades_dificultades_pensar}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_pensar')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_percibir_luz">Percibir la luz, distinguir objetos o personas a pesar de usar lentes o gafas:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_percibir_luz"
          value={items.actividades_dificultades_percibir_luz}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_percibir_luz')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_oir">Oír, aun con aparatos especiales:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_oir"
          value={items.actividades_dificultades_oir}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_oir')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_sabores">Distinguir sabores u olores:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_sabores"
          value={items.actividades_dificultades_sabores}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_sabores')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_hablar">Hablar y comunicarse:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_hablar"
          value={items.actividades_dificultades_hablar}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_hablar')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_desplazarse">Desplazarse en trechos cortos por problemas respiratorios o del corazón:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_desplazarse"
          value={items.actividades_dificultades_desplazarse}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_desplazarse')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>
    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_masticar">Masticar, tragar, asimilar y transformar los alimentos:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_masticar"
          value={items.actividades_dificultades_masticar}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_masticar')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_retener_expulsar">Retener o expulsar la orina, tener relaciones sexuales, tener hijos:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_retener_expulsar"
          value={items.actividades_dificultades_retener_expulsar}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_retener_expulsar')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_caminar">Caminar, correr, saltar:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_caminar"
          value={items.actividades_dificultades_caminar}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_caminar')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_piel_sana">Mantener piel, uñas y cabellos sanos:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_piel_sana"
          value={items.actividades_dificultades_piel_sana}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_piel_sana')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_relacionarse">Relacionarse con las demás personas y el entorno:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_relacionarse"
          value={items.actividades_dificultades_relacionarse}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_relacionarse')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_mover_objetos">Llevar, mover, utilizar objetos con las manos:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_mover_objetos"
          value={items.actividades_dificultades_mover_objetos}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_mover_objetos')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_posturas">Cambiar y mantener las posiciones del cuerpo:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_posturas"
          value={items.actividades_dificultades_posturas}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_posturas')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_alimentarse">Alimentarse, asearse, vestirse por sí mismo:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_alimentarse"
          value={items.actividades_dificultades_alimentarse}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_alimentarse')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actividades_dificultades_otra">Otra:</label>
        <select
          className="form-control form-control-sm"
          id="actividades_dificultades_otra"
          value={items.actividades_dificultades_otra}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actividades_dificultades_otra')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <hr />

    <div className="row pb-3">
      <div className="form-group col-sm-12 pb-3">
        <label htmlFor="actitudes_negativos_familiares">2.20 En su hogar o entorno social, ¿quiénes presentan actitudes negativas que le impidan desarrollar su actividad diaria con mayor autonomía?: (Debe seleccionar "SI" mínimo en una opción)</label>
        <select
          className="form-control form-control-sm"
          id="actitudes_negativos_familiares"
          value={items.actitudes_negativos_familiares}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actitudes_negativos_familiares')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actitudes_negativos_vecinos">Vecinos:</label>
        <select
          className="form-control form-control-sm"
          id="actitudes_negativos_vecinos"
          value={items.actitudes_negativos_vecinos}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actitudes_negativos_vecinos')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actitudes_negativos_amigos">Amigos, compañeros:</label>
        <select
          className="form-control form-control-sm"
          id="actitudes_negativos_amigos"
          value={items.actitudes_negativos_amigos}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actitudes_negativos_amigos')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actitudes_negativos_empleados">Funcionarios, empleados:</label>
        <select
          className="form-control form-control-sm"
          id="actitudes_negativos_empleados"
          value={items.actitudes_negativos_empleados}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actitudes_negativos_empleados')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="actitudes_negativos_otras">Otras personas:</label>
        <select
          className="form-control form-control-sm"
          id="actitudes_negativos_otras"
          value={items.actitudes_negativos_otras}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actitudes_negativos_otras')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="actitudes_negativos_nadie">Nadie:</label>
        <select
          className="form-control form-control-sm"
          id="actitudes_negativos_nadie"
          value={items.actitudes_negativos_nadie}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'actitudes_negativos_nadie')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <hr />

    <div className="row pb-3">
      <div className="form-group col-sm-12 pb-3">
        <label htmlFor="lugares_barreras_dormitorio">2.21 ¿En qué lugares de su vivienda o entorno físico encuentra barreras que le impidan desarrollar sus actividades diarias con mayor autonomía?: (Debe seleccionar "SI" mínimo en una opción)</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_dormitorio"
          value={items.lugares_barreras_dormitorio}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_dormitorio')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_sala">Sala-Comedor:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_sala"
          value={items.lugares_barreras_sala}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_sala')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_baño">Baño-Sanitario:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_baño"
          value={items.lugares_barreras_baño}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_baño')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_escaleras">Escaleras:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_escaleras"
          value={items.lugares_barreras_escaleras}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_escaleras')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>


    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_pasillos">Pasillos-Patios:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_pasillos"
          value={items.lugares_barreras_pasillos}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_pasillos')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_andenes">Andenes-Aceras:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_andenes"
          value={items.lugares_barreras_andenes}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_andenes')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_calles">Calles-Vías:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_calles"
          value={items.lugares_barreras_calles}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_calles')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_centros_edu">Centros educativos:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_centros_edu"
          value={items.lugares_barreras_centros_edu}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_centros_edu')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_lug_trabajo">Lugares de trabajo:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_lug_trabajo"
          value={items.lugares_barreras_lug_trabajo}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_lug_trabajo')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_parques">Parques, plazas, estadios, teatros, iglesias:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_parques"
          value={items.lugares_barreras_parques}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_parques')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_paraderos">Paraderos, terminales de transporte:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_paraderos"
          value={items.lugares_barreras_paraderos}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_paraderos')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_trans_publico">Vehículos de transporte público:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_trans_publico"
          value={items.lugares_barreras_trans_publico}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_trans_publico')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_hospitales">Centros de salud, hospitales:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_hospitales"
          value={items.lugares_barreras_hospitales}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_hospitales')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_tiendas">Centros comerciales, tiendas, plazas de mercado:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_tiendas"
          value={items.lugares_barreras_tiendas}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_tiendas')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_otros">Otros lugares:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_otros"
          value={items.lugares_barreras_otros}
           disabled={isDisabled || isLocationDisabled} onChange={(e) => handleInputChange(e, 'lugares_barreras_otros')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="lugares_barreras_ninguno">Ninguno:</label>
        <select
          className="form-control form-control-sm"
          id="lugares_barreras_ninguno"
          value={items.lugares_barreras_ninguno}
           disabled={isDisabled } onChange={(e) => handleInputChange(e, 'lugares_barreras_ninguno')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <hr />

    <div className="row pb-3">
      <div className="form-group col-sm-12 pb-3">
        <label htmlFor="medios_comunicacion_escritos">2.22 ¿Cuáles medios o sistemas de comunicación utiliza habitualmente?: (Debe seleccionar "SI" mínimo en una opción)</label>
        <select
          className="form-control form-control-sm"
          id="medios_comunicacion_escritos"
          value={items.medios_comunicacion_escritos}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'medios_comunicacion_escritos')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="medios_comunicacion_radio">Radio:</label>
        <select
          className="form-control form-control-sm"
          id="medios_comunicacion_radio"
          value={items.medios_comunicacion_radio}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'medios_comunicacion_radio')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="medios_comunicacion_television">Televisión:</label>
        <select
          className="form-control form-control-sm"
          id="medios_comunicacion_television"
          value={items.medios_comunicacion_television}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'medios_comunicacion_television')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="medios_comunicacion_senas">Lengua de señas:</label>
        <select
          className="form-control form-control-sm"
          id="medios_comunicacion_senas"
          value={items.medios_comunicacion_senas}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'medios_comunicacion_senas')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="medios_comunicacion_senas_naturales">Señas naturales:</label>
        <select
          className="form-control form-control-sm"
          id="medios_comunicacion_senas_naturales"
          value={items.medios_comunicacion_senas_naturales}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'medios_comunicacion_senas_naturales')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="medios_comunicacion_telefono">Teléfono:</label>
        <select
          className="form-control form-control-sm"
          id="medios_comunicacion_telefono"
          value={items.medios_comunicacion_telefono}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'medios_comunicacion_telefono')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="medios_comunicacion_internet">Internet:</label>
        <select
          className="form-control form-control-sm"
          id="medios_comunicacion_internet"
          value={items.medios_comunicacion_internet}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'medios_comunicacion_internet')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      <div className="form-group col-sm">
        <label htmlFor="medios_comunicacion_braille">Braille:</label>
        <select
          className="form-control form-control-sm"
          id="medios_comunicacion_braille"
          value={items.medios_comunicacion_braille}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'medios_comunicacion_braille')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="medios_comunicacion_ninguno">Ninguno:</label>
        <select
          className="form-control form-control-sm"
          id="medios_comunicacion_ninguno"
          value={items.medios_comunicacion_ninguno}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'medios_comunicacion_ninguno')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
    </div>

    <hr />

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="derechos_deberes_pcd">2.23 ¿Conoce los derechos y deberes de las PcD?:</label>
        <select
          className="form-control form-control-sm"
          id="derechos_deberes_pcd"
          value={items.derechos_deberes_pcd}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'derechos_deberes_pcd')}
          required
        >
          <option value="1"> NO </option><option value="2"> SI </option>
        </select>
      </div>
      {items.derechos_deberes_pcd == '2' ? 
      <div className="form-group col-sm">
        <label htmlFor="derechos_deberes_pcd_cuales">¿Cuáles?:</label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="derechos_deberes_pcd_cuales"
          value={items.derechos_deberes_pcd_cuales}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'derechos_deberes_pcd_cuales')}
          style={{ textTransform: 'uppercase' }}
          required
        />
      </div>: ''}
    </div>

    <hr />

    <div className="row pb-3">
      <div className="form-group col-sm">
        <label htmlFor="certificado_discapacidad">2.24 ¿La persona cuenta con el certificado de discapacidad acorde a la resolución 1239 de 2022?:</label>
        <select
          className="form-control form-control-sm"
          id="certificado_discapacidad"
          value={items.certificado_discapacidad}
           disabled={isDisabled} onChange={(e) => handleInputChange(e, 'certificado_discapacidad')}
          required
        >
        <option value=""> SELECCIONE </option><option value="3"> EN PROCESO </option><option value="2"> NO </option><option value="1"> SI </option>        </select>
      </div>
    </div>





  </div>
</IonList>

</div>

        <br />

    {/* <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton disabled={buttonDisabled} routerLink={`/tabs/tab5/${params.ficha}`}>Siguiente</IonButton></div> */}
    <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
    {isDisabled ? 
      <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab16/${params.ficha}`;} }}> 
        Siguiente
      </div> 
      : 
      <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab5/${params.ficha}`;} }}> 
        Siguiente
      </div>
    }


       
       </div>   
    </form>
    </IonContent>
  </IonPage>
  );
};

export default Tab4;
