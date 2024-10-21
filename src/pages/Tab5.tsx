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
  id_usuario: string | null;
  oportunamente_diagnosticada: string | null;
  orientacion_sobre_discapacidad: string | null;
  atencion_general_ultimo_año: string | null;
  atencion_discapacidad_ultimo_año: string | null;
  ninguna_atencion_ultimo_año: string | null;
  tiempo_sin_revision_general: number | null;
  requiere_atencion_a_causa_discapacidad: string | null;
  debe_usar_silla_de_ruedas: string | null;
  debe_usar_caminador: string | null;
  debe_usar_muletas: string | null;
  debe_usar_baston_de_apoyo: string | null;
  debe_usar_baston_guia: string | null;
  debe_usar_audifonos: string | null;
  debe_usar_insumos_medicos: string | null;
  debe_usar_protesis: string | null;
  debe_usar_otros_productos_de_apoyo: string | null;
  debe_usar_ninguno: string | null;
  utiliza_actualmente_silla_de_ruedas: string | null;
  utiliza_actualmente_caminador: string | null;
  utiliza_actualmente_muletas: string | null;
  utiliza_actualmente_baston_de_apoyo: string | null;
  utiliza_actualmente_baston_guia: string | null;
  utiliza_actualmente_audifonos: string | null;
  utiliza_actualmente_insumos_medicos: string | null;
  utiliza_actualmente_protesis: string | null;
  utiliza_actualmente_otros_productos_de_apoyo: string | null;
  utiliza_actualmente_ninguno: string | null;
  cree_necesita_silla_de_ruedas: string | null;
  cree_necesita_caminador: string | null;
  cree_necesita_muletas: string | null;
  cree_necesita_baston_de_apoyo: string | null;
  cree_necesita_baston_guia: string | null;
  cree_necesita_audifonos: string | null;
  cree_necesita_insumos_medicos: string | null;
  cree_necesita_protesis: string | null;
  cree_necesita_otros_productos_de_apoyo: string | null;
  cree_necesita_ninguno: string | null;
  otras_condiciones_usa_medicamentos: string | null;
  cuales_medicamentos: string | null;
  otras_condiciones_tiene_escaras: string | null;
  otras_condiciones_tiene_traqueotomia: string | null;
  otras_condiciones_tiene_gastrostomia: string | null;
  otras_condiciones_requiere_uso_de_pañal: string | null;
  otras_condiciones_oxigeno_dependiente: string | null;
  otras_condiciones_dialisis_permanente: string | null;
  ha_presentado_covid19: string | null;
  cuantas_veces_covid19: string | null;
  fecha_ultimo_contagio: string | null;
  esta_vacunado_contra_covid19: string | null;
  numero_dosis_aplicadas: string | null;
  fecha_ultima_dosis_aplicada: string | null;
  fabricante_de_la_vacuna: string | null;
  otro_fabricante_cual: string | null;
  tiene_esquema_de_vacunas_completo: string | null;
  requiere_apoyo_para_actividades_diarias: string | null;
  persona_que_ayuda_actividades_diarias: string | null;
  sexo_persona_que_mas_ayuda: string | null;
  rehabilitacion_ordenada_fisioterapia: string | null;
  rehabilitacion_ordenada_fonoaudiologia: string | null;
  rehabilitacion_ordenada_medic_permanen: string | null;
  rehabilitacion_ordenada_medici_fisica: string | null;
  rehabilitacion_ordenada_optometria: string | null;
  rehabilitacion_ordenada_psicologia: string | null;
  rehabilitacion_ordenada_psiquiatria: string | null;
  rehabilitacion_ordenada_terapia_ocupa: string | null;
  rehabilitacion_ordenada_trabajo_social: string | null;
  rehabilitacion_ordenada_otro_tipo: string | null;
  rehabilitacion_ordenada_ninguno: string | null;
  actualmente_esta_en_rehabilitacion: string | null;
  quien_paga_rehabilitacion: string | null;
  quien_paga_rehabilitacion_otro_quien: string | null;
  establecimiento_rehabilitacion_es: string | null;
  porque_no_recibe_rehabilitacion: string | null;
  porque_no_recibe_rehabilitacion_otro: string | null;
  cuanto_tiempo_sin_rehabilitacion: string | null;
  conoce_prestadores_rehabilitacion: string | null;
  a_que_regimen_de_salud_pertenece: string | null;
  cual_regimen_de_salud: string | null;
  cual_es_su_eps: string | null;
  tipo_afiliacion: string | null;
  otro_tipo_afiliacion_cual: string | null;
  ultima_hospitalizacion_motivo: string | null;
  hace_cuanto_ultima_hospitalizacion: string | null;
  tiempo_de_hospitalizacion: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string;
  tiempo_sin_revision_general_meses: number | null;
}





const Tab5: React.FC = () => {
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



  const params = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [db, setDb] = useState<any>(null);
  const [items, setItems] = useState({
    id_usuario: params.ficha,
    oportunamente_diagnosticada: '',
    orientacion_sobre_discapacidad: '',
    atencion_general_ultimo_año: '',
    atencion_discapacidad_ultimo_año: '',
    ninguna_atencion_ultimo_año: '',
    tiempo_sin_revision_general: '',
    requiere_atencion_a_causa_discapacidad: '',
    debe_usar_silla_de_ruedas: '',
    debe_usar_caminador: '',
    debe_usar_muletas: '',
    debe_usar_baston_de_apoyo: '',
    debe_usar_baston_guia: '',
    debe_usar_audifonos: '',
    debe_usar_insumos_medicos: '',
    debe_usar_protesis: '',
    debe_usar_otros_productos_de_apoyo: '',
    debe_usar_ninguno: '',
    utiliza_actualmente_silla_de_ruedas: '',
    utiliza_actualmente_caminador: '',
    utiliza_actualmente_muletas: '',
    utiliza_actualmente_baston_de_apoyo: '',
    utiliza_actualmente_baston_guia: '',
    utiliza_actualmente_audifonos: '',
    utiliza_actualmente_insumos_medicos: '',
    utiliza_actualmente_protesis: '',
    utiliza_actualmente_otros_productos_de_apoyo: '',
    utiliza_actualmente_ninguno: '',
    cree_necesita_silla_de_ruedas: '',
    cree_necesita_caminador: '',
    cree_necesita_muletas: '',
    cree_necesita_baston_de_apoyo: '',
    cree_necesita_baston_guia: '',
    cree_necesita_audifonos: '',
    cree_necesita_insumos_medicos: '',
    cree_necesita_protesis: '',
    cree_necesita_otros_productos_de_apoyo: '',
    cree_necesita_ninguno: '',
    otras_condiciones_usa_medicamentos: '',
    cuales_medicamentos: '',
    otras_condiciones_tiene_escaras: '',
    otras_condiciones_tiene_traqueotomia: '',
    otras_condiciones_tiene_gastrostomia: '',
    otras_condiciones_requiere_uso_de_pañal: '',
    otras_condiciones_oxigeno_dependiente: '',
    otras_condiciones_dialisis_permanente: '',
    ha_presentado_covid19: '',
    cuantas_veces_covid19: '',
    fecha_ultimo_contagio: '',
    esta_vacunado_contra_covid19: '',
    numero_dosis_aplicadas: '',
    fecha_ultima_dosis_aplicada: '',
    fabricante_de_la_vacuna: '',
    otro_fabricante_cual: '',
    tiene_esquema_de_vacunas_completo: '',
    requiere_apoyo_para_actividades_diarias: '',
    persona_que_ayuda_actividades_diarias: '',
    sexo_persona_que_mas_ayuda: '',
    rehabilitacion_ordenada_fisioterapia: '',
    rehabilitacion_ordenada_fonoaudiologia: '',
    rehabilitacion_ordenada_medic_permanen: '',
    rehabilitacion_ordenada_medici_fisica: '',
    rehabilitacion_ordenada_optometria: '',
    rehabilitacion_ordenada_psicologia: '',
    rehabilitacion_ordenada_psiquiatria: '',
    rehabilitacion_ordenada_terapia_ocupa: '',
    rehabilitacion_ordenada_trabajo_social: '',
    rehabilitacion_ordenada_otro_tipo: '',
    rehabilitacion_ordenada_ninguno: '',
    actualmente_esta_en_rehabilitacion: '',
    quien_paga_rehabilitacion: '',
    quien_paga_rehabilitacion_otro_quien: '',
    establecimiento_rehabilitacion_es: '',
    porque_no_recibe_rehabilitacion: '',
    porque_no_recibe_rehabilitacion_otro: '',
    cuanto_tiempo_sin_rehabilitacion: '',
    conoce_prestadores_rehabilitacion: '',
    a_que_regimen_de_salud_pertenece: '',
    cual_regimen_de_salud: '',
    cual_es_su_eps: '',
    tipo_afiliacion: '',
    otro_tipo_afiliacion_cual: '',
    ultima_hospitalizacion_motivo: '',
    hace_cuanto_ultima_hospitalizacion: '',
    tiempo_de_hospitalizacion: '',
    fecharegistro: getCurrentDateTime(),
    usuario: localStorage.getItem('cedula'),
    estado: '1',
    tabla: 'discapacidad_capitulo_3',
    tiempo_sin_revision_general_meses: ''
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
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_3 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setButtonDisabled((transformedPeople[0].oportunamente_diagnosticada) ? false : true);
      } else {
        setItems({
          id_usuario: params.ficha,
          oportunamente_diagnosticada: '',
          orientacion_sobre_discapacidad: '',
          atencion_general_ultimo_año: '',
          atencion_discapacidad_ultimo_año: '',
          ninguna_atencion_ultimo_año: '',
          tiempo_sin_revision_general: '',
          requiere_atencion_a_causa_discapacidad: '',
          debe_usar_silla_de_ruedas: '',
          debe_usar_caminador: '',
          debe_usar_muletas: '',
          debe_usar_baston_de_apoyo: '',
          debe_usar_baston_guia: '',
          debe_usar_audifonos: '',
          debe_usar_insumos_medicos: '',
          debe_usar_protesis: '',
          debe_usar_otros_productos_de_apoyo: '',
          debe_usar_ninguno: '',
          utiliza_actualmente_silla_de_ruedas: '',
          utiliza_actualmente_caminador: '',
          utiliza_actualmente_muletas: '',
          utiliza_actualmente_baston_de_apoyo: '',
          utiliza_actualmente_baston_guia: '',
          utiliza_actualmente_audifonos: '',
          utiliza_actualmente_insumos_medicos: '',
          utiliza_actualmente_protesis: '',
          utiliza_actualmente_otros_productos_de_apoyo: '',
          utiliza_actualmente_ninguno: '',
          cree_necesita_silla_de_ruedas: '',
          cree_necesita_caminador: '',
          cree_necesita_muletas: '',
          cree_necesita_baston_de_apoyo: '',
          cree_necesita_baston_guia: '',
          cree_necesita_audifonos: '',
          cree_necesita_insumos_medicos: '',
          cree_necesita_protesis: '',
          cree_necesita_otros_productos_de_apoyo: '',
          cree_necesita_ninguno: '',
          otras_condiciones_usa_medicamentos: '',
          cuales_medicamentos: '',
          otras_condiciones_tiene_escaras: '',
          otras_condiciones_tiene_traqueotomia: '',
          otras_condiciones_tiene_gastrostomia: '',
          otras_condiciones_requiere_uso_de_pañal: '',
          otras_condiciones_oxigeno_dependiente: '',
          otras_condiciones_dialisis_permanente: '',
          ha_presentado_covid19: '',
          cuantas_veces_covid19: '',
          fecha_ultimo_contagio: '',
          esta_vacunado_contra_covid19: '',
          numero_dosis_aplicadas: '',
          fecha_ultima_dosis_aplicada: '',
          fabricante_de_la_vacuna: '',
          otro_fabricante_cual: '',
          tiene_esquema_de_vacunas_completo: '',
          requiere_apoyo_para_actividades_diarias: '',
          persona_que_ayuda_actividades_diarias: '',
          sexo_persona_que_mas_ayuda: '',
          rehabilitacion_ordenada_fisioterapia: '',
          rehabilitacion_ordenada_fonoaudiologia: '',
          rehabilitacion_ordenada_medic_permanen: '',
          rehabilitacion_ordenada_medici_fisica: '',
          rehabilitacion_ordenada_optometria: '',
          rehabilitacion_ordenada_psicologia: '',
          rehabilitacion_ordenada_psiquiatria: '',
          rehabilitacion_ordenada_terapia_ocupa: '',
          rehabilitacion_ordenada_trabajo_social: '',
          rehabilitacion_ordenada_otro_tipo: '',
          rehabilitacion_ordenada_ninguno: '',
          actualmente_esta_en_rehabilitacion: '',
          quien_paga_rehabilitacion: '',
          quien_paga_rehabilitacion_otro_quien: '',
          establecimiento_rehabilitacion_es: '',
          porque_no_recibe_rehabilitacion: '',
          porque_no_recibe_rehabilitacion_otro: '',
          cuanto_tiempo_sin_rehabilitacion: '',
          conoce_prestadores_rehabilitacion: '',
          a_que_regimen_de_salud_pertenece: '',
          cual_regimen_de_salud: '',
          cual_es_su_eps: '',
          tipo_afiliacion: '',
          otro_tipo_afiliacion_cual: '',
          ultima_hospitalizacion_motivo: '',
          hace_cuanto_ultima_hospitalizacion: '',
          tiempo_de_hospitalizacion: '',
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: '1',
          tabla: 'discapacidad_capitulo_3',
          tiempo_sin_revision_general_meses: null,
        });
      }
    }
  };
  


  useEffect(() => {
    if (people.length > 0) {
      let data = people[0] || {};
      setItems({
        id_usuario: data.id_usuario || params.ficha,
        oportunamente_diagnosticada: data.oportunamente_diagnosticada || '',
        orientacion_sobre_discapacidad: data.orientacion_sobre_discapacidad || '',
        atencion_general_ultimo_año: data.atencion_general_ultimo_año || '',
        atencion_discapacidad_ultimo_año: data.atencion_discapacidad_ultimo_año || '',
        ninguna_atencion_ultimo_año: data.ninguna_atencion_ultimo_año || '',
        tiempo_sin_revision_general: data.tiempo_sin_revision_general || '',
        requiere_atencion_a_causa_discapacidad: data.requiere_atencion_a_causa_discapacidad || '',
        debe_usar_silla_de_ruedas: data.debe_usar_silla_de_ruedas || '',
        debe_usar_caminador: data.debe_usar_caminador || '',
        debe_usar_muletas: data.debe_usar_muletas || '',
        debe_usar_baston_de_apoyo: data.debe_usar_baston_de_apoyo || '',
        debe_usar_baston_guia: data.debe_usar_baston_guia || '',
        debe_usar_audifonos: data.debe_usar_audifonos || '',
        debe_usar_insumos_medicos: data.debe_usar_insumos_medicos || '',
        debe_usar_protesis: data.debe_usar_protesis || '',
        debe_usar_otros_productos_de_apoyo: data.debe_usar_otros_productos_de_apoyo || '',
        debe_usar_ninguno: data.debe_usar_ninguno || '',
        utiliza_actualmente_silla_de_ruedas: data.utiliza_actualmente_silla_de_ruedas || '',
        utiliza_actualmente_caminador: data.utiliza_actualmente_caminador || '',
        utiliza_actualmente_muletas: data.utiliza_actualmente_muletas || '',
        utiliza_actualmente_baston_de_apoyo: data.utiliza_actualmente_baston_de_apoyo || '',
        utiliza_actualmente_baston_guia: data.utiliza_actualmente_baston_guia || '',
        utiliza_actualmente_audifonos: data.utiliza_actualmente_audifonos || '',
        utiliza_actualmente_insumos_medicos: data.utiliza_actualmente_insumos_medicos || '',
        utiliza_actualmente_protesis: data.utiliza_actualmente_protesis || '',
        utiliza_actualmente_otros_productos_de_apoyo: data.utiliza_actualmente_otros_productos_de_apoyo || '',
        utiliza_actualmente_ninguno: data.utiliza_actualmente_ninguno || '',
        cree_necesita_silla_de_ruedas: data.cree_necesita_silla_de_ruedas || '',
        cree_necesita_caminador: data.cree_necesita_caminador || '',
        cree_necesita_muletas: data.cree_necesita_muletas || '',
        cree_necesita_baston_de_apoyo: data.cree_necesita_baston_de_apoyo || '',
        cree_necesita_baston_guia: data.cree_necesita_baston_guia || '',
        cree_necesita_audifonos: data.cree_necesita_audifonos || '',
        cree_necesita_insumos_medicos: data.cree_necesita_insumos_medicos || '',
        cree_necesita_protesis: data.cree_necesita_protesis || '',
        cree_necesita_otros_productos_de_apoyo: data.cree_necesita_otros_productos_de_apoyo || '',
        cree_necesita_ninguno: data.cree_necesita_ninguno || '',
        otras_condiciones_usa_medicamentos: data.otras_condiciones_usa_medicamentos || '',
        cuales_medicamentos: data.cuales_medicamentos || '',
        otras_condiciones_tiene_escaras: data.otras_condiciones_tiene_escaras || '',
        otras_condiciones_tiene_traqueotomia: data.otras_condiciones_tiene_traqueotomia || '',
        otras_condiciones_tiene_gastrostomia: data.otras_condiciones_tiene_gastrostomia || '',
        otras_condiciones_requiere_uso_de_pañal: data.otras_condiciones_requiere_uso_de_pañal || '',
        otras_condiciones_oxigeno_dependiente: data.otras_condiciones_oxigeno_dependiente || '',
        otras_condiciones_dialisis_permanente: data.otras_condiciones_dialisis_permanente || '',
        ha_presentado_covid19: data.ha_presentado_covid19 || '',
        cuantas_veces_covid19: data.cuantas_veces_covid19 || '',
        fecha_ultimo_contagio: data.fecha_ultimo_contagio || '',
        esta_vacunado_contra_covid19: data.esta_vacunado_contra_covid19 || '',
        numero_dosis_aplicadas: data.numero_dosis_aplicadas || '',
        fecha_ultima_dosis_aplicada: data.fecha_ultima_dosis_aplicada || '',
        fabricante_de_la_vacuna: data.fabricante_de_la_vacuna || '',
        otro_fabricante_cual: data.otro_fabricante_cual || '',
        tiene_esquema_de_vacunas_completo: data.tiene_esquema_de_vacunas_completo || '',
        requiere_apoyo_para_actividades_diarias: data.requiere_apoyo_para_actividades_diarias || '',
        persona_que_ayuda_actividades_diarias: data.persona_que_ayuda_actividades_diarias || '',
        sexo_persona_que_mas_ayuda: data.sexo_persona_que_mas_ayuda || '',
        rehabilitacion_ordenada_fisioterapia: data.rehabilitacion_ordenada_fisioterapia || '',
        rehabilitacion_ordenada_fonoaudiologia: data.rehabilitacion_ordenada_fonoaudiologia || '',
        rehabilitacion_ordenada_medic_permanen: data.rehabilitacion_ordenada_medic_permanen || '',
        rehabilitacion_ordenada_medici_fisica: data.rehabilitacion_ordenada_medici_fisica || '',
        rehabilitacion_ordenada_optometria: data.rehabilitacion_ordenada_optometria || '',
        rehabilitacion_ordenada_psicologia: data.rehabilitacion_ordenada_psicologia || '',
        rehabilitacion_ordenada_psiquiatria: data.rehabilitacion_ordenada_psiquiatria || '',
        rehabilitacion_ordenada_terapia_ocupa: data.rehabilitacion_ordenada_terapia_ocupa || '',
        rehabilitacion_ordenada_trabajo_social: data.rehabilitacion_ordenada_trabajo_social || '',
        rehabilitacion_ordenada_otro_tipo: data.rehabilitacion_ordenada_otro_tipo || '',
        rehabilitacion_ordenada_ninguno: data.rehabilitacion_ordenada_ninguno || '',
        actualmente_esta_en_rehabilitacion: data.actualmente_esta_en_rehabilitacion || '',
        quien_paga_rehabilitacion: data.quien_paga_rehabilitacion || '',
        quien_paga_rehabilitacion_otro_quien: data.quien_paga_rehabilitacion_otro_quien || '',
        establecimiento_rehabilitacion_es: data.establecimiento_rehabilitacion_es || '',
        porque_no_recibe_rehabilitacion: data.porque_no_recibe_rehabilitacion || '',
        porque_no_recibe_rehabilitacion_otro: data.porque_no_recibe_rehabilitacion_otro || '',
        cuanto_tiempo_sin_rehabilitacion: data.cuanto_tiempo_sin_rehabilitacion || '',
        conoce_prestadores_rehabilitacion: data.conoce_prestadores_rehabilitacion || '',
        a_que_regimen_de_salud_pertenece: data.a_que_regimen_de_salud_pertenece || '',
        cual_regimen_de_salud: data.cual_regimen_de_salud || '',
        cual_es_su_eps: data.cual_es_su_eps || '',
        tipo_afiliacion: data.tipo_afiliacion || '',
        otro_tipo_afiliacion_cual: data.otro_tipo_afiliacion_cual || '',
        ultima_hospitalizacion_motivo: data.ultima_hospitalizacion_motivo || '',
        hace_cuanto_ultima_hospitalizacion: data.hace_cuanto_ultima_hospitalizacion || '',
        tiempo_de_hospitalizacion: data.tiempo_de_hospitalizacion || '',
        fecharegistro: data.fecharegistro || getCurrentDateTime(),
        usuario: data.usuario || localStorage.getItem('cedula'),
        estado: data.estado || '1',
        tabla: data.tabla || 'discapacidad_capitulo_3',
        tiempo_sin_revision_general_meses: data.tiempo_sin_revision_general_meses || '',
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
      // if (field === 'materialpisos') {
      //   newState.materialpisosotro = value === '6' ? '' : 'NO APLICA';
      // }
      return newState;
    });
  };

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  // const validarCampos = () => {
  //   const camposObligatorios = ['tipovivienda', 'materialpisos', 'materialpisosotro', 'materialparedes', 'materialtechos'];
  //   for (let campo of camposObligatorios) {
  //     if (!items[campo]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const enviar = async (database = db,event: React.MouseEvent<HTMLButtonElement>) => {
    // if (!validarCampos()) {
    //   // alert('Por favor, completa todos los campos obligatorios.');
    //    return;
    //  }
     event.preventDefault();
    console.log(items)
    try {
      await db.exec(
        `INSERT OR REPLACE INTO discapacidad_capitulo_3 
        (id_usuario, oportunamente_diagnosticada, orientacion_sobre_discapacidad, atencion_general_ultimo_año, atencion_discapacidad_ultimo_año, ninguna_atencion_ultimo_año, tiempo_sin_revision_general, requiere_atencion_a_causa_discapacidad, debe_usar_silla_de_ruedas, debe_usar_caminador, debe_usar_muletas, debe_usar_baston_de_apoyo, debe_usar_baston_guia, debe_usar_audifonos, debe_usar_insumos_medicos, debe_usar_protesis, debe_usar_otros_productos_de_apoyo, debe_usar_ninguno, utiliza_actualmente_silla_de_ruedas, utiliza_actualmente_caminador, utiliza_actualmente_muletas, utiliza_actualmente_baston_de_apoyo, utiliza_actualmente_baston_guia, utiliza_actualmente_audifonos, utiliza_actualmente_insumos_medicos, utiliza_actualmente_protesis, utiliza_actualmente_otros_productos_de_apoyo, utiliza_actualmente_ninguno, cree_necesita_silla_de_ruedas, cree_necesita_caminador, cree_necesita_muletas, cree_necesita_baston_de_apoyo, cree_necesita_baston_guia, cree_necesita_audifonos, cree_necesita_insumos_medicos, cree_necesita_protesis, cree_necesita_otros_productos_de_apoyo, cree_necesita_ninguno, otras_condiciones_usa_medicamentos, cuales_medicamentos, otras_condiciones_tiene_escaras, otras_condiciones_tiene_traqueotomia, otras_condiciones_tiene_gastrostomia, otras_condiciones_requiere_uso_de_pañal, otras_condiciones_oxigeno_dependiente, otras_condiciones_dialisis_permanente, ha_presentado_covid19, cuantas_veces_covid19, fecha_ultimo_contagio, esta_vacunado_contra_covid19, numero_dosis_aplicadas, fecha_ultima_dosis_aplicada, fabricante_de_la_vacuna, otro_fabricante_cual, tiene_esquema_de_vacunas_completo, requiere_apoyo_para_actividades_diarias, persona_que_ayuda_actividades_diarias, sexo_persona_que_mas_ayuda, rehabilitacion_ordenada_fisioterapia, rehabilitacion_ordenada_fonoaudiologia, rehabilitacion_ordenada_medic_permanen, rehabilitacion_ordenada_medici_fisica, rehabilitacion_ordenada_optometria, rehabilitacion_ordenada_psicologia, rehabilitacion_ordenada_psiquiatria, rehabilitacion_ordenada_terapia_ocupa, rehabilitacion_ordenada_trabajo_social, rehabilitacion_ordenada_otro_tipo, rehabilitacion_ordenada_ninguno, actualmente_esta_en_rehabilitacion, quien_paga_rehabilitacion, quien_paga_rehabilitacion_otro_quien, establecimiento_rehabilitacion_es, porque_no_recibe_rehabilitacion, porque_no_recibe_rehabilitacion_otro, cuanto_tiempo_sin_rehabilitacion, conoce_prestadores_rehabilitacion, a_que_regimen_de_salud_pertenece, cual_regimen_de_salud, cual_es_su_eps, tipo_afiliacion, otro_tipo_afiliacion_cual, ultima_hospitalizacion_motivo, hace_cuanto_ultima_hospitalizacion, tiempo_de_hospitalizacion, fecharegistro, usuario, estado, tabla, tiempo_sin_revision_general_meses)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?,?);`,
        [
          items.id_usuario,
          items.oportunamente_diagnosticada,
          items.orientacion_sobre_discapacidad,
          items.atencion_general_ultimo_año,
          items.atencion_discapacidad_ultimo_año,
          items.ninguna_atencion_ultimo_año,
          items.tiempo_sin_revision_general,
          items.requiere_atencion_a_causa_discapacidad,
          items.debe_usar_silla_de_ruedas,
          items.debe_usar_caminador,
          items.debe_usar_muletas,
          items.debe_usar_baston_de_apoyo,
          items.debe_usar_baston_guia,
          items.debe_usar_audifonos,
          items.debe_usar_insumos_medicos,
          items.debe_usar_protesis,
          items.debe_usar_otros_productos_de_apoyo,
          items.debe_usar_ninguno,
          items.utiliza_actualmente_silla_de_ruedas,
          items.utiliza_actualmente_caminador,
          items.utiliza_actualmente_muletas,
          items.utiliza_actualmente_baston_de_apoyo,
          items.utiliza_actualmente_baston_guia,
          items.utiliza_actualmente_audifonos,
          items.utiliza_actualmente_insumos_medicos,
          items.utiliza_actualmente_protesis,
          items.utiliza_actualmente_otros_productos_de_apoyo,
          items.utiliza_actualmente_ninguno,
          items.cree_necesita_silla_de_ruedas,
          items.cree_necesita_caminador,
          items.cree_necesita_muletas,
          items.cree_necesita_baston_de_apoyo,
          items.cree_necesita_baston_guia,
          items.cree_necesita_audifonos,
          items.cree_necesita_insumos_medicos,
          items.cree_necesita_protesis,
          items.cree_necesita_otros_productos_de_apoyo,
          items.cree_necesita_ninguno,
          items.otras_condiciones_usa_medicamentos,
          items.cuales_medicamentos,
          items.otras_condiciones_tiene_escaras,
          items.otras_condiciones_tiene_traqueotomia,
          items.otras_condiciones_tiene_gastrostomia,
          items.otras_condiciones_requiere_uso_de_pañal,
          items.otras_condiciones_oxigeno_dependiente,
          items.otras_condiciones_dialisis_permanente,
          items.ha_presentado_covid19,
          items.cuantas_veces_covid19,
          items.fecha_ultimo_contagio,
          items.esta_vacunado_contra_covid19,
          items.numero_dosis_aplicadas,
          items.fecha_ultima_dosis_aplicada,
          items.fabricante_de_la_vacuna,
          items.otro_fabricante_cual,
          items.tiene_esquema_de_vacunas_completo,
          items.requiere_apoyo_para_actividades_diarias,
          items.persona_que_ayuda_actividades_diarias,
          items.sexo_persona_que_mas_ayuda,
          items.rehabilitacion_ordenada_fisioterapia,
          items.rehabilitacion_ordenada_fonoaudiologia,
          items.rehabilitacion_ordenada_medic_permanen,
          items.rehabilitacion_ordenada_medici_fisica,
          items.rehabilitacion_ordenada_optometria,
          items.rehabilitacion_ordenada_psicologia,
          items.rehabilitacion_ordenada_psiquiatria,
          items.rehabilitacion_ordenada_terapia_ocupa,
          items.rehabilitacion_ordenada_trabajo_social,
          items.rehabilitacion_ordenada_otro_tipo,
          items.rehabilitacion_ordenada_ninguno,
          items.actualmente_esta_en_rehabilitacion,
          items.quien_paga_rehabilitacion,
          items.quien_paga_rehabilitacion_otro_quien,
          items.establecimiento_rehabilitacion_es,
          items.porque_no_recibe_rehabilitacion,
          items.porque_no_recibe_rehabilitacion_otro,
          items.cuanto_tiempo_sin_rehabilitacion,
          items.conoce_prestadores_rehabilitacion,
          items.a_que_regimen_de_salud_pertenece,
          items.cual_regimen_de_salud,
          items.cual_es_su_eps,
          items.tipo_afiliacion,
          items.otro_tipo_afiliacion_cual,
          items.ultima_hospitalizacion_motivo,
          items.hace_cuanto_ultima_hospitalizacion,
          items.tiempo_de_hospitalizacion,
          items.fecharegistro,
          items.usuario,
          items.estado,
          items.tabla,
          items.tiempo_sin_revision_general_meses
        ]
      );
    
      const respSelect = await db.exec(`SELECT * FROM "discapacidad_capitulo_3" WHERE id_usuario="${items.id_usuario}";`);
      setButtonDisabled(false);
      saveDatabase();
      alert('Datos Guardados con éxito');
    } catch (err) {
      console.error('Error al exportar los datos JSON:', err);
    }
    
  };

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle slot="start">CAPITULO III. ATENCIÓN EN SALUD</IonTitle>  
        <IonTitle slot="end">ID_USUARIO: <label style={{color:'#17a2b8'}}>{params.ficha}</label> </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
<form>
    {/* <div className="social-card">
      <span className="label">Ficha social:</span>
      <span className="value">{params.ficha}</span>
    </div> */}
   
      <br />

      <div className=' shadow p-3 mb-5 bg-white rounded'>
<IonList>
<div className="row g-3 was-validated ">

        <div className="row pt-2">
  <div className="form-group col-sm">
    <label htmlFor="oportunamente_diagnosticada">3.1 ¿Su condición de discapacidad fue oportunamente diagnosticada?</label>
    <select
      className="form-control form-control-sm"
      id="oportunamente_diagnosticada"
      value={items.oportunamente_diagnosticada}
      onChange={(e) => handleInputChange(e, 'oportunamente_diagnosticada')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="orientacion_sobre_discapacidad">3.2 ¿Usted o su familia han recibido orientación sobre el manejo de la discapacidad?</label>
    <select
      className="form-control form-control-sm"
      id="orientacion_sobre_discapacidad"
      value={items.orientacion_sobre_discapacidad}
      onChange={(e) => handleInputChange(e, 'orientacion_sobre_discapacidad')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    3.3 ¿Ha recibido atención general en salud en el último año?
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="atencion_general_ultimo_año">Atención general en salud</label>
    <select
      className="form-control form-control-sm"
      id="atencion_general_ultimo_año"
      value={items.atencion_general_ultimo_año}
      onChange={(e) => handleInputChange(e, 'atencion_general_ultimo_año')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="atencion_discapacidad_ultimo_año">Atención en salud por causa de su discapacidad</label>
    <select
      className="form-control form-control-sm"
      id="atencion_discapacidad_ultimo_año"
      value={items.atencion_discapacidad_ultimo_año}
      onChange={(e) => handleInputChange(e, 'atencion_discapacidad_ultimo_año')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="ninguna_atencion_ultimo_año">Ninguna</label>
    <select
      className="form-control form-control-sm"
      id="ninguna_atencion_ultimo_año"
      value={items.ninguna_atencion_ultimo_año}
      onChange={(e) => handleInputChange(e, 'ninguna_atencion_ultimo_año')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    3.4 ¿Cuánto tiempo ha transcurrido sin revisión médica general?
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="tiempo_sin_revision_general">Años</label>
    <input
      type="number"
      className="form-control form-control-sm"
      id="tiempo_sin_revision_general"
      value={items.tiempo_sin_revision_general}
      onChange={(e) => handleInputChange(e, 'tiempo_sin_revision_general')}
      required
    />
  </div>
  
  <div className="form-group col-sm">
    <label htmlFor="tiempo_sin_revision_general_meses">Meses</label>
    <input
      type="number"
      className="form-control form-control-sm"
      id="tiempo_sin_revision_general_meses"
      value={items.tiempo_sin_revision_general_meses}
      onChange={(e) => handleInputChange(e, 'tiempo_sin_revision_general_meses')}
      required
    />
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="requiere_atencion_a_causa_discapacidad">3.5 ¿Requiere atención en salud por causa de su discapacidad?</label>
    <select
      className="form-control form-control-sm"
      id="requiere_atencion_a_causa_discapacidad"
      value={items.requiere_atencion_a_causa_discapacidad}
      onChange={(e) => handleInputChange(e, 'requiere_atencion_a_causa_discapacidad')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    3.6 ¿Le ordenaron usar?
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="debe_usar_silla_de_ruedas">Silla de ruedas</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_silla_de_ruedas"
      value={items.debe_usar_silla_de_ruedas}
      onChange={(e) => handleInputChange(e, 'debe_usar_silla_de_ruedas')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="debe_usar_caminador">Caminador</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_caminador"
      value={items.debe_usar_caminador}
      onChange={(e) => handleInputChange(e, 'debe_usar_caminador')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="debe_usar_muletas">Muletas</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_muletas"
      value={items.debe_usar_muletas}
      onChange={(e) => handleInputChange(e, 'debe_usar_muletas')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="debe_usar_baston_de_apoyo">Bastón de apoyo</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_baston_de_apoyo"
      value={items.debe_usar_baston_de_apoyo}
      onChange={(e) => handleInputChange(e, 'debe_usar_baston_de_apoyo')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="debe_usar_baston_guia">Bastón guía</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_baston_guia"
      value={items.debe_usar_baston_guia}
      onChange={(e) => handleInputChange(e, 'debe_usar_baston_guia')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="debe_usar_audifonos">Audífonos</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_audifonos"
      value={items.debe_usar_audifonos}
      onChange={(e) => handleInputChange(e, 'debe_usar_audifonos')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="debe_usar_insumos_medicos">Insumos médicos</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_insumos_medicos"
      value={items.debe_usar_insumos_medicos}
      onChange={(e) => handleInputChange(e, 'debe_usar_insumos_medicos')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="debe_usar_protesis">Prótesis</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_protesis"
      value={items.debe_usar_protesis}
      onChange={(e) => handleInputChange(e, 'debe_usar_protesis')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="debe_usar_otros_productos_de_apoyo">Otros productos de apoyo:</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_otros_productos_de_apoyo"
      value={items.debe_usar_otros_productos_de_apoyo}
      onChange={(e) => handleInputChange(e, 'debe_usar_otros_productos_de_apoyo')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="debe_usar_ninguno">Ninguno</label>
    <select
      className="form-control form-control-sm"
      id="debe_usar_ninguno"
      value={items.debe_usar_ninguno}
      onChange={(e) => handleInputChange(e, 'debe_usar_ninguno')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    3.7 ¿Utiliza actualmente?
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_silla_de_ruedas">Silla de ruedas:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_silla_de_ruedas"
      value={items.utiliza_actualmente_silla_de_ruedas}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_silla_de_ruedas')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_caminador">Caminador:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_caminador"
      value={items.utiliza_actualmente_caminador}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_caminador')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>
<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_muletas">Muletas:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_muletas"
      value={items.utiliza_actualmente_muletas}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_muletas')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_baston_de_apoyo">Bastón de apoyo:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_baston_de_apoyo"
      value={items.utiliza_actualmente_baston_de_apoyo}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_baston_de_apoyo')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_baston_guia">Bastón guía:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_baston_guia"
      value={items.utiliza_actualmente_baston_guia}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_baston_guia')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_audifonos">Audífonos:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_audifonos"
      value={items.utiliza_actualmente_audifonos}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_audifonos')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_insumos_medicos">Insumos médicos:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_insumos_medicos"
      value={items.utiliza_actualmente_insumos_medicos}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_insumos_medicos')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_protesis">Prótesis:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_protesis"
      value={items.utiliza_actualmente_protesis}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_protesis')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_otros_productos_de_apoyo">Otros productos de apoyo:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_otros_productos_de_apoyo"
      value={items.utiliza_actualmente_otros_productos_de_apoyo}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_otros_productos_de_apoyo')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="utiliza_actualmente_ninguno">Ninguno:</label>
    <select
      className="form-control form-control-sm"
      id="utiliza_actualmente_ninguno"
      value={items.utiliza_actualmente_ninguno}
      onChange={(e) => handleInputChange(e, 'utiliza_actualmente_ninguno')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    3.8 ¿Cree que aún necesita?
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_silla_de_ruedas">Silla de ruedas</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_silla_de_ruedas"
      value={items.cree_necesita_silla_de_ruedas}
      onChange={(e) => handleInputChange(e, 'cree_necesita_silla_de_ruedas')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_caminador">Caminador</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_caminador"
      value={items.cree_necesita_caminador}
      onChange={(e) => handleInputChange(e, 'cree_necesita_caminador')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_muletas">Muletas</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_muletas"
      value={items.cree_necesita_muletas}
      onChange={(e) => handleInputChange(e, 'cree_necesita_muletas')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_baston_de_apoyo">Bastón de apoyo</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_baston_de_apoyo"
      value={items.cree_necesita_baston_de_apoyo}
      onChange={(e) => handleInputChange(e, 'cree_necesita_baston_de_apoyo')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_baston_guia">Bastón guía:</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_baston_guia"
      value={items.cree_necesita_baston_guia}
      onChange={(e) => handleInputChange(e, 'cree_necesita_baston_guia')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_audifonos">Audífonos:</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_audifonos"
      value={items.cree_necesita_audifonos}
      onChange={(e) => handleInputChange(e, 'cree_necesita_audifonos')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_insumos_medicos">Insumos médicos</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_insumos_medicos"
      value={items.cree_necesita_insumos_medicos}
      onChange={(e) => handleInputChange(e, 'cree_necesita_insumos_medicos')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_protesis">Prótesis</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_protesis"
      value={items.cree_necesita_protesis}
      onChange={(e) => handleInputChange(e, 'cree_necesita_protesis')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_otros_productos_de_apoyo">Otros productos de apoyo</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_otros_productos_de_apoyo"
      value={items.cree_necesita_otros_productos_de_apoyo}
      onChange={(e) => handleInputChange(e, 'cree_necesita_otros_productos_de_apoyo')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="cree_necesita_ninguno">Ninguno:</label>
    <select
      className="form-control form-control-sm"
      id="cree_necesita_ninguno"
      value={items.cree_necesita_ninguno}
      onChange={(e) => handleInputChange(e, 'cree_necesita_ninguno')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>


<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="otras_condiciones_usa_medicamentos">3.9.1 Usa medicamentos</label>
    <select
      className="form-control form-control-sm"
      id="otras_condiciones_usa_medicamentos"
      value={items.otras_condiciones_usa_medicamentos}
      onChange={(e) => handleInputChange(e, 'otras_condiciones_usa_medicamentos')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="cuales_medicamentos">Cuáles:</label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="cuales_medicamentos"
      value={items.cuales_medicamentos}
      onChange={(e) => handleInputChange(e, 'cuales_medicamentos')}
      style={{ textTransform: 'uppercase' }}
      required
    />
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="otras_condiciones_tiene_escaras">3.9.2 ¿Tiene escaras?</label>
    <select
      className="form-control form-control-sm"
      id="otras_condiciones_tiene_escaras"
      value={items.otras_condiciones_tiene_escaras}
      onChange={(e) => handleInputChange(e, 'otras_condiciones_tiene_escaras')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="otras_condiciones_tiene_traqueotomia">3.9.3 ¿Tiene traqueotomía?</label>
    <select
      className="form-control form-control-sm"
      id="otras_condiciones_tiene_traqueotomia"
      value={items.otras_condiciones_tiene_traqueotomia}
      onChange={(e) => handleInputChange(e, 'otras_condiciones_tiene_traqueotomia')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="otras_condiciones_tiene_gastrostomia">3.9.4 ¿Tiene gastrostomía?</label>
    <select
      className="form-control form-control-sm"
      id="otras_condiciones_tiene_gastrostomia"
      value={items.otras_condiciones_tiene_gastrostomia}
      onChange={(e) => handleInputChange(e, 'otras_condiciones_tiene_gastrostomia')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="otras_condiciones_requiere_uso_de_pañal">3.9.5 ¿Requiere uso permanente de pañal?</label>
    <select
      className="form-control form-control-sm"
      id="otras_condiciones_requiere_uso_de_pañal"
      value={items.otras_condiciones_requiere_uso_de_pañal}
      onChange={(e) => handleInputChange(e, 'otras_condiciones_requiere_uso_de_pañal')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="otras_condiciones_oxigeno_dependiente">3.9.6 ¿Es oxígeno dependiente?</label>
    <select
      className="form-control form-control-sm"
      id="otras_condiciones_oxigeno_dependiente"
      value={items.otras_condiciones_oxigeno_dependiente}
      onChange={(e) => handleInputChange(e, 'otras_condiciones_oxigeno_dependiente')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="otras_condiciones_dialisis_permanente">3.9.7 ¿Requiere diálisis permanente?</label>
    <select
      className="form-control form-control-sm"
      id="otras_condiciones_dialisis_permanente"
      value={items.otras_condiciones_dialisis_permanente}
      onChange={(e) => handleInputChange(e, 'otras_condiciones_dialisis_permanente')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="ha_presentado_covid19">3.10 ¿Ha presentado Covid-19?</label>
    <select
      className="form-control form-control-sm"
      id="ha_presentado_covid19"
      value={items.ha_presentado_covid19}
      onChange={(e) => handleInputChange(e, 'ha_presentado_covid19')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="cuantas_veces_covid19">3.10.1 ¿Cuántas veces?</label>
    <input
      type="number"
      className="form-control form-control-sm"
      id="cuantas_veces_covid19"
      value={items.cuantas_veces_covid19}
      onChange={(e) => handleInputChange(e, 'cuantas_veces_covid19')}
      required
    />
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="fecha_ultimo_contagio">3.10.2 Fecha de último contagio:</label>
    <input
      type="date"
      className="form-control form-control-sm"
      id="fecha_ultimo_contagio"
      value={items.fecha_ultimo_contagio}
      onChange={(e) => handleInputChange(e, 'fecha_ultimo_contagio')}
      required
    />
  </div>

  <div className="form-group col-sm">
    <label htmlFor="esta_vacunado_contra_covid19">3.11 ¿Está vacunado contra Covid-19?</label>
    <select
      className="form-control form-control-sm"
      id="esta_vacunado_contra_covid19"
      value={items.esta_vacunado_contra_covid19}
      onChange={(e) => handleInputChange(e, 'esta_vacunado_contra_covid19')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="numero_dosis_aplicadas">3.11.1 Número de dosis aplicadas</label>
    <input
      type="number"
      className="form-control form-control-sm"
      id="numero_dosis_aplicadas"
      value={items.numero_dosis_aplicadas}
      onChange={(e) => handleInputChange(e, 'numero_dosis_aplicadas')}
      required
    />
  </div>

  <div className="form-group col-sm">
    <label htmlFor="fecha_ultima_dosis_aplicada">3.11.2 Fecha aplicación de última dosis:</label>
    <input
      type="date"
      className="form-control form-control-sm"
      id="fecha_ultima_dosis_aplicada"
      value={items.fecha_ultima_dosis_aplicada}
      onChange={(e) => handleInputChange(e, 'fecha_ultima_dosis_aplicada')}
      required
    />
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="fabricante_de_la_vacuna">3.11.3 Fabricante de la vacuna aplicada</label>
    <select
      className="form-control form-control-sm"
      id="fabricante_de_la_vacuna"
      value={items.fabricante_de_la_vacuna}
      onChange={(e) => handleInputChange(e, 'fabricante_de_la_vacuna')}
      required
    >
      <option value=""> SELECCIONE </option><option value="4"> ASTRA ZENECA </option><option value="5"> JOHNSON Y JOHNSON (JANSSEN) </option><option value="3"> MODERNA </option><option value="6"> OTRO </option><option value="1"> PFIZER </option><option value="2"> SINOVAC </option>    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="otro_fabricante_cual">Otro:</label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="otro_fabricante_cual"
      value={items.otro_fabricante_cual}
      onChange={(e) => handleInputChange(e, 'otro_fabricante_cual')}
      style={{ textTransform: 'uppercase' }}
      required
    />
  </div>
</div>


<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="tiene_esquema_de_vacunas_completo">3.12 ¿Tiene esquema de vacunas completo?</label>
    <select
      className="form-control form-control-sm"
      id="tiene_esquema_de_vacunas_completo"
      value={items.tiene_esquema_de_vacunas_completo}
      onChange={(e) => handleInputChange(e, 'tiene_esquema_de_vacunas_completo')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="requiere_apoyo_para_actividades_diarias">3.13 ¿Requiere apoyo permanente de otra persona para realizar las actividades de su vida diaria?</label>
    <select
      className="form-control form-control-sm"
      id="requiere_apoyo_para_actividades_diarias"
      value={items.requiere_apoyo_para_actividades_diarias}
      onChange={(e) => handleInputChange(e, 'requiere_apoyo_para_actividades_diarias')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="persona_que_ayuda_actividades_diarias">3.14 ¿Cuál es la persona que más le ayuda a desarrollar sus actividades de la vida diaria?</label>
    <select
      className="form-control form-control-sm"
      id="persona_que_ayuda_actividades_diarias"
      value={items.persona_que_ayuda_actividades_diarias}
      onChange={(e) => handleInputChange(e, 'persona_que_ayuda_actividades_diarias')}
      required
    >
      <option value=""> SELECCIONE </option><option value="1"> ALGÚN MIEMBRO DEL HOGAR </option><option value="5"> NINGUNA </option><option value="4"> OTRA </option><option value="3"> PERSONA EXTERNA EMPLEADA PARA AYUDARLO </option><option value="2"> PERSONA EXTERNA NO EMPLEADA </option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="sexo_persona_que_mas_ayuda">3.14.1 ¿Sexo de la persona que más le ayuda a desarrollar sus actividades de la vida diaria?</label>
    <select
      className="form-control form-control-sm"
      id="sexo_persona_que_mas_ayuda"
      value={items.sexo_persona_que_mas_ayuda}
      onChange={(e) => handleInputChange(e, 'sexo_persona_que_mas_ayuda')}
      required
    >
      <option value=""> SELECCIONE </option><option value="1"> HOMBRE </option><option value="2"> MUJER </option>
    </select>
  </div>
</div>


<div className="row pb-3">
  <div className="form-group col-sm">
    3.15 ¿Qué tipo de rehabilitación le han ordenado?
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_fisioterapia">Fisioterapia</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_fisioterapia"
      value={items.rehabilitacion_ordenada_fisioterapia}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_fisioterapia')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_fonoaudiologia">Fonoaudiología</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_fonoaudiologia"
      value={items.rehabilitacion_ordenada_fonoaudiologia}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_fonoaudiologia')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_medic_permanen">Medicamentos permanentes</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_medic_permanen"
      value={items.rehabilitacion_ordenada_medic_permanen}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_medic_permanen')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_medici_fisica">Medicina física y de rehabilitación</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_medici_fisica"
      value={items.rehabilitacion_ordenada_medici_fisica}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_medici_fisica')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_optometria">Optometría</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_optometria"
      value={items.rehabilitacion_ordenada_optometria}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_optometria')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_psicologia">Psicología</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_psicologia"
      value={items.rehabilitacion_ordenada_psicologia}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_psicologia')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_psiquiatria">Psiquiatría</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_psiquiatria"
      value={items.rehabilitacion_ordenada_psiquiatria}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_psiquiatria')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_terapia_ocupa">Terapia ocupacional</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_terapia_ocupa"
      value={items.rehabilitacion_ordenada_terapia_ocupa}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_terapia_ocupa')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_trabajo_social">Trabajo social</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_trabajo_social"
      value={items.rehabilitacion_ordenada_trabajo_social}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_trabajo_social')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_otro_tipo">Otro tipo de rehabilitación</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_otro_tipo"
      value={items.rehabilitacion_ordenada_otro_tipo}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_otro_tipo')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="rehabilitacion_ordenada_ninguno">Ninguno</label>
    <select
      className="form-control form-control-sm"
      id="rehabilitacion_ordenada_ninguno"
      value={items.rehabilitacion_ordenada_ninguno}
      onChange={(e) => handleInputChange(e, 'rehabilitacion_ordenada_ninguno')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<hr />

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="actualmente_esta_en_rehabilitacion">3.16 ¿Actualmente está asistiendo al servicio de rehabilitación?</label>
    <select
      className="form-control form-control-sm"
      id="actualmente_esta_en_rehabilitacion"
      value={items.actualmente_esta_en_rehabilitacion}
      onChange={(e) => handleInputChange(e, 'actualmente_esta_en_rehabilitacion')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>


<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="quien_paga_rehabilitacion">3.17 ¿Quién paga la rehabilitación?:</label>
    <select
      className="form-control form-control-sm"
      id="quien_paga_rehabilitacion"
      value={items.quien_paga_rehabilitacion}
      onChange={(e) => handleInputChange(e, 'quien_paga_rehabilitacion')}
      required
    >
        <option value=""> SELECCIONE </option><option value="5"> EL EMPLEADOR </option><option value="1"> EL SISTEMA GENERAL DE SALUD </option><option value="2"> LA FAMILIA </option><option value="6"> OTRO. ¿QUIEN? </option><option value="3"> PERSONALMENTE </option><option value="4"> UNA ONG </option> 
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="quien_paga_rehabilitacion_otro_quien">Otro ¿Quién?:</label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="quien_paga_rehabilitacion_otro_quien"
      value={items.quien_paga_rehabilitacion_otro_quien}
      onChange={(e) => handleInputChange(e, 'quien_paga_rehabilitacion_otro_quien')}
      style={{ textTransform: 'uppercase' }}
      required
    />
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="establecimiento_rehabilitacion_es">3.18 El establecimiento donde recibe la rehabilitación, es:</label>
    <select
      className="form-control form-control-sm"
      id="establecimiento_rehabilitacion_es"
      value={items.establecimiento_rehabilitacion_es}
      onChange={(e) => handleInputChange(e, 'establecimiento_rehabilitacion_es')}
      required
    >
      <option value=""> SELECCIONE </option><option value="3"> NO SABE (PASE A 3.22) </option><option value="2"> PRIVADO (PASE A 3.22) </option><option value="1"> PÚBLICO (PASE A 3.22) </option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="porque_no_recibe_rehabilitacion">3.19 ¿Por qué no recibe el servicio de rehabilitación?:</label>
    <select
      className="form-control form-control-sm"
      id="porque_no_recibe_rehabilitacion"
      value={items.porque_no_recibe_rehabilitacion}
      onChange={(e) => handleInputChange(e, 'porque_no_recibe_rehabilitacion')}
      required
    >
      <option value=""> SELECCIONE </option><option value="2"> CREE QUE YA NO LO NECESITA </option><option value="5"> EL CENTRO DE ATENCIÓN QUEDA MUY LEJOS </option><option value="4"> FALTA DE DINERO </option><option value="7"> NO HA SIDO AUTORIZADO POR EL ASEGURADOR </option><option value="6"> NO HAY QUIÉN LO LLEVE </option><option value="3"> NO LE GUSTA </option><option value="8"> OTRO. ¿CÚAL? </option><option value="1"> YA TERMINÓ EL SERVICIO DE REHABILITACIÓN </option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="porque_no_recibe_rehabilitacion_otro">Otro ¿Cuál?:</label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="porque_no_recibe_rehabilitacion_otro"
      value={items.porque_no_recibe_rehabilitacion_otro}
      onChange={(e) => handleInputChange(e, 'porque_no_recibe_rehabilitacion_otro')}
      style={{ textTransform: 'uppercase' }}
      required
    />
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="cuanto_tiempo_sin_rehabilitacion">3.20 ¿Cuánto tiempo lleva sin recibir el servicio de rehabilitación?:</label>
    <select
      className="form-control form-control-sm"
      id="cuanto_tiempo_sin_rehabilitacion"
      value={items.cuanto_tiempo_sin_rehabilitacion}
      onChange={(e) => handleInputChange(e, 'cuanto_tiempo_sin_rehabilitacion')}
      required
    >
        <option value=""> SELECCIONE </option><option value="3"> 1 A 3 AÑOS </option><option value="4"> 4 A 6 AÑOS </option><option value="2"> 7 A 11 MESES </option><option value="1"> ENTRE 0 Y 6 MESES </option><option value="5"> MÁS DE 6 AÑOS </option><option value="6"> NUNCA RECIBIÓ REHABILITACIÓN </option>
    </select>
  </div>

  <div className="form-group col-sm">
    <label htmlFor="conoce_prestadores_rehabilitacion">3.21 ¿Conoce prestadores de servicios de rehabilitación acorde a sus necesidades?:</label>
    <select
      className="form-control form-control-sm"
      id="conoce_prestadores_rehabilitacion"
      value={items.conoce_prestadores_rehabilitacion}
      onChange={(e) => handleInputChange(e, 'conoce_prestadores_rehabilitacion')}
      required
    >
      <option value="">SELECCIONE</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="a_que_regimen_de_salud_pertenece">3.22 ¿A qué régimen de salud pertenece?:</label>
    <select
      className="form-control form-control-sm"
      id="a_que_regimen_de_salud_pertenece"
      value={items.a_que_regimen_de_salud_pertenece}
      onChange={(e) => handleInputChange(e, 'a_que_regimen_de_salud_pertenece')}
      required
    >
        <option value=""> SELECCIONE </option><option value="1"> CONTRIBUTIVO </option><option value="3"> ESPECIAL </option><option value="2"> SUBSIDIADO </option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="cual_es_su_eps">3.23 ¿Cuál es su EPS?:</label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="cual_es_su_eps"
      value={items.cual_es_su_eps}
      onChange={(e) => handleInputChange(e, 'cual_es_su_eps')}
      style={{ textTransform: 'uppercase' }}
      required
    />
  </div>

  <div className="form-group col-sm">
    <label htmlFor="tipo_afiliacion">3.24 Tipo de afiliación:</label>
    <select
      className="form-control form-control-sm"
      id="tipo_afiliacion"
      value={items.tipo_afiliacion}
      onChange={(e) => handleInputChange(e, 'tipo_afiliacion')}
      required
    >
      <option value=""> SELECCIONE</option> <option value="1"> BENEFICIARIO </option><option value="4"> CABEZA DE FAMILIA </option><option value="2"> COTIZANTE </option><option value="5"> OTRO. ¿CUÁL? </option><option value="3"> PENSIONADO </option> 
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="otro_tipo_afiliacion_cual">Otro. ¿Cuál?:</label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="otro_tipo_afiliacion_cual"
      value={items.otro_tipo_afiliacion_cual}
      onChange={(e) => handleInputChange(e, 'otro_tipo_afiliacion_cual')}
      style={{ textTransform: 'uppercase' }}
      required
    />
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    3.25 Última hospitalización
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="ultima_hospitalizacion_motivo">Motivo:</label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="ultima_hospitalizacion_motivo"
      value={items.ultima_hospitalizacion_motivo}
      onChange={(e) => handleInputChange(e, 'ultima_hospitalizacion_motivo')}
      style={{ textTransform: 'uppercase' }}
      required
    />
  </div>

  <div className="form-group col-sm">
    <label htmlFor="hace_cuanto_ultima_hospitalizacion">¿Hace cuánto?:</label>
    <select
      className="form-control form-control-sm"
      id="hace_cuanto_ultima_hospitalizacion"
      value={items.hace_cuanto_ultima_hospitalizacion}
      onChange={(e) => handleInputChange(e, 'hace_cuanto_ultima_hospitalizacion')}
      required
    >
      <option value=""> SELECCIONE </option><option value="2"> ENTRE 3 Y 6 MESES </option><option value="3"> ENTRE 6 Y 12 MESES </option><option value="4"> HACE MÁS DE 1 AÑO </option><option value="1"> HACE MENOS DE 3 MESES </option><option value="5"> NO APLICA </option>
    </select>
  </div>
</div>

<div className="row pb-3">
  <div className="form-group col-sm">
    <label htmlFor="tiempo_de_hospitalizacion">Tiempo de hospitalización:</label>
    <input
      type="text"
      className="form-control form-control-sm"
      id="tiempo_de_hospitalizacion"
      value={items.tiempo_de_hospitalizacion}
      onChange={(e) => handleInputChange(e, 'tiempo_de_hospitalizacion')}
      style={{ textTransform: 'uppercase' }}
      required
    />
  </div>
</div>




</div>
</IonList>
</div>

        <br />

    {/* <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton disabled={buttonDisabled} routerLink={`/tabs/tab6/${params.ficha}`}>Siguiente</IonButton></div> */}
    <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
       <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab6/${params.ficha}`;} }}> Siguiente</div>
       </div>
    </form>
    </IonContent>
  </IonPage>
  );
};

export default Tab5;
