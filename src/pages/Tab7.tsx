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
  sabe_leer_y_escribir_solo_mayores_de_5_años: string | null;
  asiste_actualmente_a_establecimiento_educativo: string | null;
  el_establecimiento_donde_estudia_es: string | null;
  el_establecimiento_cuenta_con_ayuda_pedagogica: string | null;
  el_establecimiento_cuenta_con_ayuda_tecnologicas: string | null;
  el_establecimiento_cuenta_con_ayuda_terapeuticas: string | null;
  el_establecimiento_cuenta_con_ayuda_comunicativos: string | null;
  el_establecimiento_cuenta_con_ayuda_administrativos: string | null;
  el_establecimiento_cuenta_con_ayuda_financieros: string | null;
  el_establecimiento_cuenta_con_ayuda_ninguno: string | null;
  los_docentes_atienden_adecuadamente_necesidades_educ: string | null;
  la_educacion_que_recibe_responde_a_sus_necesidades: string | null;
  hace_cuantos_años_estudio: string | null;
  repitio_algun_año_escolar: string | null;
  repitio_grado_0: string | null;
  repitio_grado_0_numero_veces: number | null;
  repitio_grado_1: string | null;
  repitio_grado_1_numero_veces: number | null;
  repitio_grado_2: string | null;
  repitio_grado_2_numero_veces: number | null;
  repitio_grado_3: string | null;
  repitio_grado_3_numero_veces: number | null;
  repitio_grado_4: string | null;
  repitio_grado_4_numero_veces: number | null;
  repitio_grado_5: string | null;
  repitio_grado_5_numero_veces: number | null;
  repitio_grado_6: string | null;
  repitio_grado_6_numero_veces: number | null;
  repitio_grado_7: string | null;
  repitio_grado_7_numero_veces: number | null;
  repitio_grado_8: string | null;
  repitio_grado_8_numero_veces: number | null;
  repitio_grado_9: string | null;
  repitio_grado_9_numero_veces: number | null;
  repitio_grado_10: string | null;
  repitio_grado_10_numero_veces: number | null;
  repitio_grado_11: string | null;
  repitio_grado_11_numero_veces: number | null;
  cual_es_la_causa_principal_la_cual_no_estudia: string | null;
  si_le_dieran_la_oportunidad_de_estudiar_lo_haria: string | null;
  que_estudiaria: string | null;
  sabe_utilizar_herramientas_tecnologicas: string | null;
  cuales_herramientas_tecnologicas_maneja_computador: string | null;
  cuales_herramientas_tecnologicas_maneja_tablet: string | null;
  cuales_herramientas_tecnologicas_maneja_celular: string | null;
  cuales_herramientas_tecnologicas_maneja_otro: string | null;
  cuales_herramientas_tecnologicas_maneja_otro_cual: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
  ultimo_nivel_educacion_aprobado: string | null;
}


const Tab7: React.FC = () => {
  const params = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [db, setDb] = useState<any>(null);
  const [items, setItems] = useState({
    id_usuario: '',
  sabe_leer_y_escribir_solo_mayores_de_5_años: '',
  asiste_actualmente_a_establecimiento_educativo: '',
  el_establecimiento_donde_estudia_es: '',
  el_establecimiento_cuenta_con_ayuda_pedagogica: '',
  el_establecimiento_cuenta_con_ayuda_tecnologicas: '',
  el_establecimiento_cuenta_con_ayuda_terapeuticas: '',
  el_establecimiento_cuenta_con_ayuda_comunicativos: '',
  el_establecimiento_cuenta_con_ayuda_administrativos: '',
  el_establecimiento_cuenta_con_ayuda_financieros: '',
  el_establecimiento_cuenta_con_ayuda_ninguno: '',
  los_docentes_atienden_adecuadamente_necesidades_educ: '',
  la_educacion_que_recibe_responde_a_sus_necesidades: '',
  hace_cuantos_años_estudio: '',
  repitio_algun_año_escolar: '',
  repitio_grado_0: '',
  repitio_grado_0_numero_veces: '',
  repitio_grado_1: '',
  repitio_grado_1_numero_veces: '',
  repitio_grado_2: '',
  repitio_grado_2_numero_veces: '',
  repitio_grado_3: '',
  repitio_grado_3_numero_veces: '',
  repitio_grado_4: '',
  repitio_grado_4_numero_veces: '',
  repitio_grado_5: '',
  repitio_grado_5_numero_veces: '',
  repitio_grado_6: '',
  repitio_grado_6_numero_veces: '',
  repitio_grado_7: '',
  repitio_grado_7_numero_veces: '',
  repitio_grado_8: '',
  repitio_grado_8_numero_veces: '',
  repitio_grado_9: '',
  repitio_grado_9_numero_veces: '',
  repitio_grado_10: '',
  repitio_grado_10_numero_veces: '',
  repitio_grado_11: '',
  repitio_grado_11_numero_veces: '',
  cual_es_la_causa_principal_la_cual_no_estudia: '',
  si_le_dieran_la_oportunidad_de_estudiar_lo_haria: '',
  que_estudiaria: '',
  sabe_utilizar_herramientas_tecnologicas: '',
  cuales_herramientas_tecnologicas_maneja_computador: '',
  cuales_herramientas_tecnologicas_maneja_tablet: '',
  cuales_herramientas_tecnologicas_maneja_celular: '',
  cuales_herramientas_tecnologicas_maneja_otro: '',
  cuales_herramientas_tecnologicas_maneja_otro_cual: '',
  fecharegistro: '',
  usuario: '',
  estado: '',
  tabla: '',
  ultimo_nivel_educacion_aprobado: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    loadSQL(setDb, fetchUsers);
    // fetchBarrios();
    // fetchComunas();
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
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_5 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setButtonDisabled((transformedPeople[0].sabe_leer_y_escribir_solo_mayores_de_5_años) ? false : true);
      } else {
        setItems({
          id_usuario: params.ficha,
          sabe_leer_y_escribir_solo_mayores_de_5_años: '1',
          asiste_actualmente_a_establecimiento_educativo: '1',
          el_establecimiento_donde_estudia_es: '',
          ultimo_nivel_educacion_aprobado: '',
          el_establecimiento_cuenta_con_ayuda_pedagogica: '1',
          el_establecimiento_cuenta_con_ayuda_tecnologicas: '1',
          el_establecimiento_cuenta_con_ayuda_terapeuticas: '1',
          el_establecimiento_cuenta_con_ayuda_comunicativos: '1',
          el_establecimiento_cuenta_con_ayuda_administrativos: '1',
          el_establecimiento_cuenta_con_ayuda_financieros: '1',
          el_establecimiento_cuenta_con_ayuda_ninguno: '1',
          los_docentes_atienden_adecuadamente_necesidades_educ: '1',
          la_educacion_que_recibe_responde_a_sus_necesidades: '1',
          hace_cuantos_años_estudio: '',
          repitio_algun_año_escolar: '1',
          repitio_grado_0: '1',
          repitio_grado_0_numero_veces: '0',
          repitio_grado_1: '1',
          repitio_grado_1_numero_veces: '0',
          repitio_grado_2: '1',
          repitio_grado_2_numero_veces: '0',
          repitio_grado_3: '1',
          repitio_grado_3_numero_veces: '0',
          repitio_grado_4: '1',
          repitio_grado_4_numero_veces: '0',
          repitio_grado_5: '1',
          repitio_grado_5_numero_veces: '0',
          repitio_grado_6: '1',
          repitio_grado_6_numero_veces: '0',
          repitio_grado_7: '1',
          repitio_grado_7_numero_veces: '0',
          repitio_grado_8: '1',
          repitio_grado_8_numero_veces: '0',
          repitio_grado_9: '1',
          repitio_grado_9_numero_veces: '0',
          repitio_grado_10: '1',
          repitio_grado_10_numero_veces: '0',
          repitio_grado_11: '1',
          repitio_grado_11_numero_veces: '0',
          cual_es_la_causa_principal_la_cual_no_estudia: '',
          si_le_dieran_la_oportunidad_de_estudiar_lo_haria: '',
          que_estudiaria: '',
          sabe_utilizar_herramientas_tecnologicas: '1',
          cuales_herramientas_tecnologicas_maneja_computador: '1',
          cuales_herramientas_tecnologicas_maneja_tablet: '1',
          cuales_herramientas_tecnologicas_maneja_celular: '1',
          cuales_herramientas_tecnologicas_maneja_otro: '1',
          cuales_herramientas_tecnologicas_maneja_otro_cual: '',
          fecharegistro: getCurrentDateTime(),
          usuario: parseInt(localStorage.getItem('cedula') || '0'),
          estado: 1,
          tabla: 'discapacidad_capitulo_5',
          
        });
      }
    }
  };
  

  // const fetchBarrios = async () => {
  //   if (db) {
  //     const res = await db.exec(`SELECT *  FROM t1_barrios`);
  //     if (res[0]?.values && res[0]?.columns) {
  //       const transformedProgramas: Barrio[] = res[0].values.map((row: any[]) => {
  //         return res[0].columns.reduce((obj, col, index) => {
  //           obj[col] = row[index];
  //           return obj;
  //         }, {} as Barrio);
  //       });
  //       setBarrios(transformedProgramas);
  //     }
  //   }
  // };
  // const fetchComunas = async () => {
  //   if (db) {
  //     const res = await db.exec(`SELECT *  FROM t1_comunas`);
  //     if (res[0]?.values && res[0]?.columns) {
  //       const transformedProgramas: Comuna[] = res[0].values.map((row: any[]) => {
  //         return res[0].columns.reduce((obj, col, index) => {
  //           obj[col] = row[index];
  //           return obj;
  //         }, {} as Comuna);
  //       });
  //       setComunas(transformedProgramas);
  //     }
  //   }
  // };

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
        sabe_leer_y_escribir_solo_mayores_de_5_años: data.sabe_leer_y_escribir_solo_mayores_de_5_años || '',
        asiste_actualmente_a_establecimiento_educativo: data.asiste_actualmente_a_establecimiento_educativo || '',
        el_establecimiento_donde_estudia_es: data.el_establecimiento_donde_estudia_es || '',
        el_establecimiento_cuenta_con_ayuda_pedagogica: data.el_establecimiento_cuenta_con_ayuda_pedagogica || '',
        el_establecimiento_cuenta_con_ayuda_tecnologicas: data.el_establecimiento_cuenta_con_ayuda_tecnologicas || '',
        el_establecimiento_cuenta_con_ayuda_terapeuticas: data.el_establecimiento_cuenta_con_ayuda_terapeuticas || '',
        el_establecimiento_cuenta_con_ayuda_comunicativos: data.el_establecimiento_cuenta_con_ayuda_comunicativos || '',
        el_establecimiento_cuenta_con_ayuda_administrativos: data.el_establecimiento_cuenta_con_ayuda_administrativos || '',
        el_establecimiento_cuenta_con_ayuda_financieros: data.el_establecimiento_cuenta_con_ayuda_financieros || '',
        el_establecimiento_cuenta_con_ayuda_ninguno: data.el_establecimiento_cuenta_con_ayuda_ninguno || '',
        los_docentes_atienden_adecuadamente_necesidades_educ: data.los_docentes_atienden_adecuadamente_necesidades_educ || '',
        la_educacion_que_recibe_responde_a_sus_necesidades: data.la_educacion_que_recibe_responde_a_sus_necesidades || '',
        hace_cuantos_años_estudio: data.hace_cuantos_años_estudio || '',
        repitio_algun_año_escolar: data.repitio_algun_año_escolar || '',
        repitio_grado_0: data.repitio_grado_0 || '',
        repitio_grado_0_numero_veces: data.repitio_grado_0_numero_veces || null,
        repitio_grado_1: data.repitio_grado_1 || '',
        repitio_grado_1_numero_veces: data.repitio_grado_1_numero_veces || null,
        repitio_grado_2: data.repitio_grado_2 || '',
        repitio_grado_2_numero_veces: data.repitio_grado_2_numero_veces || null,
        repitio_grado_3: data.repitio_grado_3 || '',
        repitio_grado_3_numero_veces: data.repitio_grado_3_numero_veces || null,
        repitio_grado_4: data.repitio_grado_4 || '',
        repitio_grado_4_numero_veces: data.repitio_grado_4_numero_veces || null,
        repitio_grado_5: data.repitio_grado_5 || '',
        repitio_grado_5_numero_veces: data.repitio_grado_5_numero_veces || null,
        repitio_grado_6: data.repitio_grado_6 || '',
        repitio_grado_6_numero_veces: data.repitio_grado_6_numero_veces || null,
        repitio_grado_7: data.repitio_grado_7 || '',
        repitio_grado_7_numero_veces: data.repitio_grado_7_numero_veces || null,
        repitio_grado_8: data.repitio_grado_8 || '',
        repitio_grado_8_numero_veces: data.repitio_grado_8_numero_veces || null,
        repitio_grado_9: data.repitio_grado_9 || '',
        repitio_grado_9_numero_veces: data.repitio_grado_9_numero_veces || null,
        repitio_grado_10: data.repitio_grado_10 || '',
        repitio_grado_10_numero_veces: data.repitio_grado_10_numero_veces || null,
        repitio_grado_11: data.repitio_grado_11 || '',
        repitio_grado_11_numero_veces: data.repitio_grado_11_numero_veces || null,
        cual_es_la_causa_principal_la_cual_no_estudia: data.cual_es_la_causa_principal_la_cual_no_estudia || '',
        si_le_dieran_la_oportunidad_de_estudiar_lo_haria: data.si_le_dieran_la_oportunidad_de_estudiar_lo_haria || '',
        que_estudiaria: data.que_estudiaria || '',
        sabe_utilizar_herramientas_tecnologicas: data.sabe_utilizar_herramientas_tecnologicas || '',
        cuales_herramientas_tecnologicas_maneja_computador: data.cuales_herramientas_tecnologicas_maneja_computador || '',
        cuales_herramientas_tecnologicas_maneja_tablet: data.cuales_herramientas_tecnologicas_maneja_tablet || '',
        cuales_herramientas_tecnologicas_maneja_celular: data.cuales_herramientas_tecnologicas_maneja_celular || '',
        cuales_herramientas_tecnologicas_maneja_otro: data.cuales_herramientas_tecnologicas_maneja_otro || '',
        cuales_herramientas_tecnologicas_maneja_otro_cual: data.cuales_herramientas_tecnologicas_maneja_otro_cual || '',
        fecharegistro: data.fecharegistro || '',
        usuario: data.usuario || null,
        estado: data.estado || null,
        tabla: data.tabla || '',
        ultimo_nivel_educacion_aprobado: data.ultimo_nivel_educacion_aprobado || '',
      });
    }
  }, [people]);
  

  useEffect(() => {
    fetchUsers();
    // fetchBarrios();
    // fetchComunas();
  }, [db]);

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setItems((prevItems) => {
      const newState = { ...prevItems, [field]: value };
      // if (field === 'dondeviviaantes') {
      //   newState.otrodepartamento = value === '5' ? '' : newState.otrodepartamento;
      //   newState.otropais = value === '6' ? '' : newState.otropais;
      //   newState.otromunicipio = value === '4' ? '' : newState.otromunicipio;
      //   newState.otrobarrio = value === '2' ? '' : newState.otrobarrio;
      //   newState.otracomuna = value === '2' ? '' : newState.otracomuna;
      // }
      return newState;
    });
  };
  

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);
  
  const validarCampos = () => {
    // const camposObligatorios = [
    //   'tiempovivienda', 'tiempoviviendaunidad', 
    //   'tiempomedellin', 'tiempomedellinunidad', 
    //   'dondeviviaantes'
    // ];
  
    // const camposCondicionales = {
    //   '5': 'otrodepartamento',
    //   '6': 'otropais',
    //   '4': 'otromunicipio',
    //   '2': ['otracomuna', 'otrobarrio']
    // };
  
    // // Verificar campos obligatorios
    // for (let campo of camposObligatorios) {
    //   if (!items[campo]) {
    //     return false;
    //   }
    // }
  
    // // Verificar campos condicionales
    // const valorDondeViviaAntes = items.dondeviviaantes;
    // if (camposCondicionales[valorDondeViviaAntes]) {
    //   const campos = Array.isArray(camposCondicionales[valorDondeViviaAntes]) ? camposCondicionales[valorDondeViviaAntes] : [camposCondicionales[valorDondeViviaAntes]];
    //   for (let campo of campos) {
    //     if (!items[campo]) {
    //       return false;
    //     }
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
        `INSERT OR REPLACE INTO discapacidad_capitulo_5 (
          id_usuario,
          sabe_leer_y_escribir_solo_mayores_de_5_años,
          asiste_actualmente_a_establecimiento_educativo,
          el_establecimiento_donde_estudia_es,
          el_establecimiento_cuenta_con_ayuda_pedagogica,
          el_establecimiento_cuenta_con_ayuda_tecnologicas,
          el_establecimiento_cuenta_con_ayuda_terapeuticas,
          el_establecimiento_cuenta_con_ayuda_comunicativos,
          el_establecimiento_cuenta_con_ayuda_administrativos,
          el_establecimiento_cuenta_con_ayuda_financieros,
          el_establecimiento_cuenta_con_ayuda_ninguno,
          los_docentes_atienden_adecuadamente_necesidades_educ,
          la_educacion_que_recibe_responde_a_sus_necesidades,
          hace_cuantos_años_estudio,
          repitio_algun_año_escolar,
          repitio_grado_0,
          repitio_grado_0_numero_veces,
          repitio_grado_1,
          repitio_grado_1_numero_veces,
          repitio_grado_2,
          repitio_grado_2_numero_veces,
          repitio_grado_3,
          repitio_grado_3_numero_veces,
          repitio_grado_4,
          repitio_grado_4_numero_veces,
          repitio_grado_5,
          repitio_grado_5_numero_veces,
          repitio_grado_6,
          repitio_grado_6_numero_veces,
          repitio_grado_7,
          repitio_grado_7_numero_veces,
          repitio_grado_8,
          repitio_grado_8_numero_veces,
          repitio_grado_9,
          repitio_grado_9_numero_veces,
          repitio_grado_10,
          repitio_grado_10_numero_veces,
          repitio_grado_11,
          repitio_grado_11_numero_veces,
          cual_es_la_causa_principal_la_cual_no_estudia,
          si_le_dieran_la_oportunidad_de_estudiar_lo_haria,
          que_estudiaria,
          sabe_utilizar_herramientas_tecnologicas,
          cuales_herramientas_tecnologicas_maneja_computador,
          cuales_herramientas_tecnologicas_maneja_tablet,
          cuales_herramientas_tecnologicas_maneja_celular,
          cuales_herramientas_tecnologicas_maneja_otro,
          cuales_herramientas_tecnologicas_maneja_otro_cual,
          fecharegistro,
          usuario,
          estado,
          tabla,
          ultimo_nivel_educacion_aprobado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          items.id_usuario,
          items.sabe_leer_y_escribir_solo_mayores_de_5_años,
          items.asiste_actualmente_a_establecimiento_educativo,
          items.el_establecimiento_donde_estudia_es,
          items.el_establecimiento_cuenta_con_ayuda_pedagogica,
          items.el_establecimiento_cuenta_con_ayuda_tecnologicas,
          items.el_establecimiento_cuenta_con_ayuda_terapeuticas,
          items.el_establecimiento_cuenta_con_ayuda_comunicativos,
          items.el_establecimiento_cuenta_con_ayuda_administrativos,
          items.el_establecimiento_cuenta_con_ayuda_financieros,
          items.el_establecimiento_cuenta_con_ayuda_ninguno,
          items.los_docentes_atienden_adecuadamente_necesidades_educ,
          items.la_educacion_que_recibe_responde_a_sus_necesidades,
          items.hace_cuantos_años_estudio,
          items.repitio_algun_año_escolar,
          items.repitio_grado_0,
          items.repitio_grado_0_numero_veces,
          items.repitio_grado_1,
          items.repitio_grado_1_numero_veces,
          items.repitio_grado_2,
          items.repitio_grado_2_numero_veces,
          items.repitio_grado_3,
          items.repitio_grado_3_numero_veces,
          items.repitio_grado_4,
          items.repitio_grado_4_numero_veces,
          items.repitio_grado_5,
          items.repitio_grado_5_numero_veces,
          items.repitio_grado_6,
          items.repitio_grado_6_numero_veces,
          items.repitio_grado_7,
          items.repitio_grado_7_numero_veces,
          items.repitio_grado_8,
          items.repitio_grado_8_numero_veces,
          items.repitio_grado_9,
          items.repitio_grado_9_numero_veces,
          items.repitio_grado_10,
          items.repitio_grado_10_numero_veces,
          items.repitio_grado_11,
          items.repitio_grado_11_numero_veces,
          items.cual_es_la_causa_principal_la_cual_no_estudia,
          items.si_le_dieran_la_oportunidad_de_estudiar_lo_haria,
          items.que_estudiaria,
          items.sabe_utilizar_herramientas_tecnologicas,
          items.cuales_herramientas_tecnologicas_maneja_computador,
          items.cuales_herramientas_tecnologicas_maneja_tablet,
          items.cuales_herramientas_tecnologicas_maneja_celular,
          items.cuales_herramientas_tecnologicas_maneja_otro,
          items.cuales_herramientas_tecnologicas_maneja_otro_cual,
          items.fecharegistro,
          items.usuario,
          items.estado,
          items.tabla,
          items.ultimo_nivel_educacion_aprobado,
        ]
      );
    
      const respSelect = db.exec(`SELECT * FROM "discapacidad_capitulo_5" WHERE id_usuario="${items.id_usuario}";`);
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
        <IonTitle slot="start">CAPÍTULO V. EDUCACIÓN</IonTitle>  
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

      <div className=' shadow p-3 mb-5 bg-white rounded'>
      <div className="row g-3 was-validated ">
      <IonList>
    <div className="alert alert-primary" role="alert">
      <span className="badge badge-secondary text-dark">CAPÍTULO V. EDUCACIÓN</span>
    </div>
    
    {/* Primer bloque de preguntas */}
    <div className="row g-3 was-validated">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="sabe_leer_y_escribir_solo_mayores_de_5_años">5.1 ¿Sabe leer y escribir? (Solo para mayores de 5 años):</label>
        <select
          onChange={(e) => handleInputChange(e, 'sabe_leer_y_escribir_solo_mayores_de_5_años')}
          value={items.sabe_leer_y_escribir_solo_mayores_de_5_años}
          className="form-control form-control-sm"
          id="sabe_leer_y_escribir_solo_mayores_de_5_años"
          required
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="asiste_actualmente_a_establecimiento_educativo">5.2 ¿Asiste actualmente a algún establecimiento educativo? (Si la respuesta es No, pase a 5.10)</label>
        <select
          onChange={(e) => handleInputChange(e, 'asiste_actualmente_a_establecimiento_educativo')}
          value={items.asiste_actualmente_a_establecimiento_educativo}
          className="form-control form-control-sm"
          id="asiste_actualmente_a_establecimiento_educativo"
          required
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    {/* Segundo bloque de preguntas */}
    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="el_establecimiento_donde_estudia_es">5.3 ¿El establecimiento donde estudia es?</label>
        <select
          onChange={(e) => handleInputChange(e, 'el_establecimiento_donde_estudia_es')}
          value={items.el_establecimiento_donde_estudia_es}
          className="form-control form-control-sm"
          id="el_establecimiento_donde_estudia_es"
        >
          <option value="1">Público</option>
          <option value="2">Privado</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="ultimo_nivel_educacion_aprobado">5.4 ¿Cuál fue el último nivel y grado de educación que aprobó?</label>
        <select
          onChange={(e) => handleInputChange(e, 'ultimo_nivel_educacion_aprobado')}
          value={items.ultimo_nivel_educacion_aprobado}
          className="form-control form-control-sm"
          id="ultimo_nivel_educacion_aprobado"
          required
        >
          <option value="1">Primaria</option>
          <option value="2">Secundaria</option>
          <option value="3">Bachillerato</option>
          <option value="4">Universidad</option>
        </select>
      </div>
    </div>

    {/* Tercer bloque: Servicios de apoyo */}
    <div className="row g-3">
      <div className="col-sm-12">
        <label>5.5 Para atender a las personas con discapacidad, el establecimiento cuenta con servicios de apoyo:</label>
      </div>
    </div>
    
    {/* Servicios de apoyo */}
    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="el_establecimiento_cuenta_con_ayuda_pedagogica">Pedagógicos</label>
        <select
          onChange={(e) => handleInputChange(e, 'el_establecimiento_cuenta_con_ayuda_pedagogica')}
          value={items.el_establecimiento_cuenta_con_ayuda_pedagogica}
          className="form-control form-control-sm"
          id="el_establecimiento_cuenta_con_ayuda_pedagogica"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="el_establecimiento_cuenta_con_ayuda_tecnologicas">Tecnológicos</label>
        <select
          onChange={(e) => handleInputChange(e, 'el_establecimiento_cuenta_con_ayuda_tecnologicas')}
          value={items.el_establecimiento_cuenta_con_ayuda_tecnologicas}
          className="form-control form-control-sm"
          id="el_establecimiento_cuenta_con_ayuda_tecnologicas"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>
    
    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="el_establecimiento_cuenta_con_ayuda_terapeuticas">Terapéuticos</label>
        <select
          onChange={(e) => handleInputChange(e, 'el_establecimiento_cuenta_con_ayuda_terapeuticas')}
          value={items.el_establecimiento_cuenta_con_ayuda_terapeuticas}
          className="form-control form-control-sm"
          id="el_establecimiento_cuenta_con_ayuda_terapeuticas"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="el_establecimiento_cuenta_con_ayuda_comunicativos">Comunicativos</label>
        <select
          onChange={(e) => handleInputChange(e, 'el_establecimiento_cuenta_con_ayuda_comunicativos')}
          value={items.el_establecimiento_cuenta_con_ayuda_comunicativos}
          className="form-control form-control-sm"
          id="el_establecimiento_cuenta_con_ayuda_comunicativos"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>
    
    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="el_establecimiento_cuenta_con_ayuda_administrativos">Administrativos</label>
        <select
          onChange={(e) => handleInputChange(e, 'el_establecimiento_cuenta_con_ayuda_administrativos')}
          value={items.el_establecimiento_cuenta_con_ayuda_administrativos}
          className="form-control form-control-sm"
          id="el_establecimiento_cuenta_con_ayuda_administrativos"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="el_establecimiento_cuenta_con_ayuda_financieros">Financieros</label>
        <select
          onChange={(e) => handleInputChange(e, 'el_establecimiento_cuenta_con_ayuda_financieros')}
          value={items.el_establecimiento_cuenta_con_ayuda_financieros}
          className="form-control form-control-sm"
          id="el_establecimiento_cuenta_con_ayuda_financieros"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>
    
    {/* Campo Ninguno */}
    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="el_establecimiento_cuenta_con_ayuda_ninguno">Ninguno</label>
        <select
          onChange={(e) => handleInputChange(e, 'el_establecimiento_cuenta_con_ayuda_ninguno')}
          value={items.el_establecimiento_cuenta_con_ayuda_ninguno}
          className="form-control form-control-sm"
          id="el_establecimiento_cuenta_con_ayuda_ninguno"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="los_docentes_atienden_adecuadamente_necesidades_educ">5.6 ¿Los docentes atienden adecuadamente sus necesidades educativas?</label>
        <select
          onChange={(e) => handleInputChange(e, 'los_docentes_atienden_adecuadamente_necesidades_educ')}
          value={items.los_docentes_atienden_adecuadamente_necesidades_educ}
          className="form-control form-control-sm"
          id="los_docentes_atienden_adecuadamente_necesidades_educ"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>
    
    {/* Último bloque de preguntas */}
    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="la_educacion_que_recibe_responde_a_sus_necesidades">5.7 ¿La educación que ha recibido responde a sus necesidades?</label>
        <select
          onChange={(e) => handleInputChange(e, 'la_educacion_que_recibe_responde_a_sus_necesidades')}
          value={items.la_educacion_que_recibe_responde_a_sus_necesidades}
          className="form-control form-control-sm"
          id="la_educacion_que_recibe_responde_a_sus_necesidades"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="hace_cuantos_años_estudio">5.8 ¿Hace cuantos años estudió?:</label>
        <input
          type="number"
          onChange={(e) => handleInputChange(e, 'hace_cuantos_años_estudio')}
          value={items.hace_cuantos_años_estudio}
          className="form-control form-control-sm"
          id="hace_cuantos_años_estudio"
          style={{ textTransform: 'uppercase' }}
          required
        />
      </div>
    </div>

    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="repitio_algun_año_escolar">5.9 ¿Repitió algún año escolar? (Desde transición a grado once de bachillerato)</label>
        <select
          onChange={(e) => handleInputChange(e, 'repitio_algun_año_escolar')}
          value={items.repitio_algun_año_escolar}
          className="form-control form-control-sm"
          id="repitio_algun_año_escolar"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    {/* Grado 0 */}
    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="repitio_grado_0">Grado 0:</label>
        <select
          onChange={(e) => handleInputChange(e, 'repitio_grado_0')}
          value={items.repitio_grado_0}
          className="form-control form-control-sm"
          id="repitio_grado_0"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="repitio_grado_0_numero_veces">N° de Veces</label>
        <input
          type="number"
          onChange={(e) => handleInputChange(e, 'repitio_grado_0_numero_veces')}
          value={items.repitio_grado_0_numero_veces}
          className="form-control form-control-sm"
          id="repitio_grado_0_numero_veces"
          style={{ textTransform: 'uppercase' }}
          required
        />
      </div>
    </div>

    {/* Repetir la estructura para cada grado */}
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((grado) => (
      <div className="row g-3" key={grado}>
        <div className="col-sm-6 pb-2 pt-2">
          <label htmlFor={`repitio_grado_${grado}`}>Grado {grado}:</label>
          <select
            onChange={(e) => handleInputChange(e, `repitio_grado_${grado}`)}
            value={items[`repitio_grado_${grado}`]}
            className="form-control form-control-sm"
            id={`repitio_grado_${grado}`}
          >
            <option value="1">NO</option>
            <option value="2">SÍ</option>
          </select>
        </div>
        <div className="col-sm-6 pb-2 pt-2">
          <label htmlFor={`repitio_grado_${grado}_numero_veces`}>N° de Veces</label>
          <input
            type="number"
            onChange={(e) => handleInputChange(e, `repitio_grado_${grado}_numero_veces`)}
            value={items[`repitio_grado_${grado}_numero_veces`]}
            className="form-control form-control-sm"
            id={`repitio_grado_${grado}_numero_veces`}
            style={{ textTransform: 'uppercase' }}
            required
          />
        </div>
      </div>
    ))}















    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="cual_es_la_causa_principal_la_cual_no_estudia">5.10 ¿Cuál es la causa principal por la cual no estudia?</label>
        <select
          onChange={(e) => handleInputChange(e, 'cual_es_la_causa_principal_la_cual_no_estudia')}
          value={items.cual_es_la_causa_principal_la_cual_no_estudia}
          className="form-control form-control-sm"
          id="cual_es_la_causa_principal_la_cual_no_estudia"
        >
          {/* Aquí puedes agregar las opciones específicas que corresponden a esta pregunta */}
          <option value="1">Falta de recursos económicos</option>
          <option value="2">Problemas de salud</option>
          <option value="3">Desinterés en estudiar</option>
          <option value="4">Otras razones</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="si_le_dieran_la_oportunidad_de_estudiar_lo_haria">5.11 Si le dieran la oportunidad de estudiar o seguir estudiando, ¿Lo haría?</label>
        <select
          onChange={(e) => handleInputChange(e, 'si_le_dieran_la_oportunidad_de_estudiar_lo_haria')}
          value={items.si_le_dieran_la_oportunidad_de_estudiar_lo_haria}
          className="form-control form-control-sm"
          id="si_le_dieran_la_oportunidad_de_estudiar_lo_haria"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="que_estudiaria">5.11.1 ¿Qué estudiaría?</label>
        <input
          type="text"
          onChange={(e) => handleInputChange(e, 'que_estudiaria')}
          value={items.que_estudiaria}
          className="form-control form-control-sm"
          id="que_estudiaria"
          style={{ textTransform: 'uppercase' }}
          required
        />
      </div>
    </div>

    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="sabe_utilizar_herramientas_tecnologicas">5.12 ¿Sabe utilizar herramientas tecnológicas?</label>
        <select
          onChange={(e) => handleInputChange(e, 'sabe_utilizar_herramientas_tecnologicas')}
          value={items.sabe_utilizar_herramientas_tecnologicas}
          className="form-control form-control-sm"
          id="sabe_utilizar_herramientas_tecnologicas"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    {/* Herramientas tecnológicas que maneja */}
    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="cuales_herramientas_tecnologicas_maneja_computador">Computador</label>
        <select
          onChange={(e) => handleInputChange(e, 'cuales_herramientas_tecnologicas_maneja_computador')}
          value={items.cuales_herramientas_tecnologicas_maneja_computador}
          className="form-control form-control-sm"
          id="cuales_herramientas_tecnologicas_maneja_computador"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="cuales_herramientas_tecnologicas_maneja_tablet">Tablet</label>
        <select
          onChange={(e) => handleInputChange(e, 'cuales_herramientas_tecnologicas_maneja_tablet')}
          value={items.cuales_herramientas_tecnologicas_maneja_tablet}
          className="form-control form-control-sm"
          id="cuales_herramientas_tecnologicas_maneja_tablet"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="cuales_herramientas_tecnologicas_maneja_celular">Celular inteligente o Smartphone</label>
        <select
          onChange={(e) => handleInputChange(e, 'cuales_herramientas_tecnologicas_maneja_celular')}
          value={items.cuales_herramientas_tecnologicas_maneja_celular}
          className="form-control form-control-sm"
          id="cuales_herramientas_tecnologicas_maneja_celular"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="cuales_herramientas_tecnologicas_maneja_otro">Otro</label>
        <select
          onChange={(e) => handleInputChange(e, 'cuales_herramientas_tecnologicas_maneja_otro')}
          value={items.cuales_herramientas_tecnologicas_maneja_otro}
          className="form-control form-control-sm"
          id="cuales_herramientas_tecnologicas_maneja_otro"
        >
          <option value="1">NO</option>
          <option value="2">SÍ</option>
        </select>
      </div>
    </div>

    <div className="row g-3">
      <div className="col-sm-6 pb-2 pt-2">
        <label htmlFor="cuales_herramientas_tecnologicas_maneja_otro_cual">¿Cuál?</label>
        <input
          type="text"
          onChange={(e) => handleInputChange(e, 'cuales_herramientas_tecnologicas_maneja_otro_cual')}
          value={items.cuales_herramientas_tecnologicas_maneja_otro_cual}
          className="form-control form-control-sm"
          id="cuales_herramientas_tecnologicas_maneja_otro_cual"
          style={{ textTransform: 'uppercase' }}
          required
        />
      </div>
    </div>











  </IonList>
  </div>

      </div>

        <br />

    {/* <div><IonButton color="success" onClick={enviar}>Guardar</IonButton><IonButton disabled={buttonDisabled} routerLink={`/tabs/tab8/${params.ficha}`} >Siguiente</IonButton></div> */}
    <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
       <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab1/${params.ficha}`;} }}> Siguiente</div>
       </div>
    </form>
    </IonContent>
  </IonPage>
  );
};

export default Tab7;
