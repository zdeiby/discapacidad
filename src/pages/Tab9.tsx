import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonButton
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomDataTable from '../components/DataTable';
import loadSQL from '../models/database';

interface Person {
  id_usuario: number;
  neceidades_de_capacitacion_de_la_familia: string;
  personas_hogar_ocupacion_sin_dato: number | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
  personas_hogar_parentesco_abuelo: number | null;
  personas_hogar_parentesco_acudiente: number | null;
  personas_hogar_parentesco_bisabuelos: number | null;
  personas_hogar_parentesco_bisnietos: number | null;
  personas_hogar_parentesco_conyuge: number | null;
  personas_hogar_parentesco_cuniada: number | null;
  personas_hogar_parentesco_hermano: number | null;
  personas_hogar_parentesco_hijastro: number | null;
  personas_hogar_parentesco_hijo: number | null;
  personas_hogar_parentesco_hijo_adoptivo: number | null;
  personas_hogar_parentesco_jefe_hogar: number | null;
  personas_hogar_parentesco_madrastra: number | null;
  personas_hogar_parentesco_nieto: number | null;
  personas_hogar_parentesco_nuera: number | null;
  personas_hogar_parentesco_otros_no_parientes: number | null;
  personas_hogar_parentesco_otros_parientes: number | null;
  personas_hogar_parentesco_padrastro: number | null;
  personas_hogar_parentesco_padres: number | null;
  personas_hogar_parentesco_padres_adoptantes: number | null;
  personas_hogar_parentesco_rep_legal: number | null;
  personas_hogar_parentesco_sobrinos: number | null;
  personas_hogar_parentesco_suegros: number | null;
  personas_hogar_parentesco_tios: number | null;
  personas_hogar_parentesco_yerno: number | null;
  numero_personas_hogar_discapacidad: number | null;
  personas_hogar_ciclo_primera_infancia: number | null;
  personas_hogar_ciclo_infancia: number | null;
  personas_hogar_ciclo_primera_adolescencia: number | null;
  personas_hogar_ciclo_juventud: number | null;
  personas_hogar_ciclo_adultez: number | null;
  personas_hogar_ciclo_persona_mayor: number | null;
  personas_hogar_escolaridad_inicial: number | null;
  personas_hogar_escolaridad_ninguna: number | null;
  personas_hogar_escolaridad_posgrado: number | null;
  personas_hogar_escolaridad_preescolar: number | null;
  personas_hogar_escolaridad_pregrado_completo: number | null;
  personas_hogar_escolaridad_pregrado_incompleto: number | null;
  personas_hogar_escolaridad_primaria_completa: number | null;
  personas_hogar_escolaridad_primaria_incompleta: number | null;
  personas_hogar_escolaridad_secundaria_completa: number | null;
  personas_hogar_escolaridad_secundaria_incompleta: number | null;
  personas_hogar_escolaridad_tecnica_completa: number | null;
  personas_hogar_escolaridad_tecnica_incompleta: number | null;
  personas_hogar_escolaridad_tecnologia_completa: number | null;
  personas_hogar_escolaridad_tecnologia_incompleta: number | null;
  personas_hogar_escolaridad_sin_dato: number | null;
  personas_hogar_ocupacion_sobrevivencia: number | null;
  personas_hogar_ocupacion_ama_de_casa: number | null;
  personas_hogar_ocupacion_desempleado: number | null;
  personas_hogar_ocupacion_empleado: number | null;
  personas_hogar_ocupacion_estudiante: number | null;
  personas_hogar_ocupacion_independiente: number | null;
  personas_hogar_ocupacion_ninguna: number | null;
  personas_hogar_ocupacion_trabajador_informal: number | null;
}



const Tab9: React.FC = () => {

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
  const history = useHistory();

  const [people, setPeople] = useState<Person[]>([]);
  const [integrantes, setIntegrantes] = useState([]);
  const [db, setDb] = useState<any>(null);
  const [jefe, setJefe] = useState(false);
  const [items, setItems] = useState({
    id_usuario: params.ficha || '', // Asignando params.ficha o un valor vacío como predeterminado
    neceidades_de_capacitacion_de_la_familia: '',
    personas_hogar_ocupacion_sin_dato: 0,
    fecharegistro: getCurrentDateTime(), // Asigna la fecha y hora actual
    usuario: localStorage.getItem('cedula') || '', // Obtiene el valor de cédula almacenado o un valor vacío
    estado: '1', // Estado inicial configurado en '1' por defecto
    tabla: 'discapacidad_capitulo_8', // Especifica la tabla correspondiente
    personas_hogar_parentesco_abuelo: 0,
    personas_hogar_parentesco_acudiente: 0,
    personas_hogar_parentesco_bisabuelos: 0,
    personas_hogar_parentesco_bisnietos: 0,
    personas_hogar_parentesco_conyuge: 0,
    personas_hogar_parentesco_cuniada: 0,
    personas_hogar_parentesco_hermano: 0,
    personas_hogar_parentesco_hijastro: 0,
    personas_hogar_parentesco_hijo: 0,
    personas_hogar_parentesco_hijo_adoptivo: 0,
    personas_hogar_parentesco_jefe_hogar: 0,
    personas_hogar_parentesco_madrastra: 0,
    personas_hogar_parentesco_nieto: 0,
    personas_hogar_parentesco_nuera: 0,
    personas_hogar_parentesco_otros_no_parientes: 0,
    personas_hogar_parentesco_otros_parientes: 0,
    personas_hogar_parentesco_padrastro: 0,
    personas_hogar_parentesco_padres: 0,
    personas_hogar_parentesco_padres_adoptantes: 0,
    personas_hogar_parentesco_rep_legal: 0,
    personas_hogar_parentesco_sobrinos: 0,
    personas_hogar_parentesco_suegros: 0,
    personas_hogar_parentesco_tios: 0,
    personas_hogar_parentesco_yerno: 0,
    numero_personas_hogar_discapacidad: 0,
    personas_hogar_ciclo_primera_infancia: 0,
    personas_hogar_ciclo_infancia: 0,
    personas_hogar_ciclo_primera_adolescencia: 0,
    personas_hogar_ciclo_juventud: 0,
    personas_hogar_ciclo_adultez: 0,
    personas_hogar_ciclo_persona_mayor: 0,
    personas_hogar_escolaridad_inicial: 0,
    personas_hogar_escolaridad_ninguna: 0,
    personas_hogar_escolaridad_posgrado: 0,
    personas_hogar_escolaridad_preescolar: 0,
    personas_hogar_escolaridad_pregrado_completo: 0,
    personas_hogar_escolaridad_pregrado_incompleto: 0,
    personas_hogar_escolaridad_primaria_completa: 0,
    personas_hogar_escolaridad_primaria_incompleta: 0,
    personas_hogar_escolaridad_secundaria_completa: 0,
    personas_hogar_escolaridad_secundaria_incompleta: 0,
    personas_hogar_escolaridad_tecnica_completa: 0,
    personas_hogar_escolaridad_tecnica_incompleta: 0,
    personas_hogar_escolaridad_tecnologia_completa: 0,
    personas_hogar_escolaridad_tecnologia_incompleta: 0,
    personas_hogar_escolaridad_sin_dato: 0,
    personas_hogar_ocupacion_sobrevivencia: 0,
    personas_hogar_ocupacion_ama_de_casa: 0,
    personas_hogar_ocupacion_desempleado: 0,
    personas_hogar_ocupacion_empleado: 0,
    personas_hogar_ocupacion_estudiante: 0,
    personas_hogar_ocupacion_independiente: 0,
    personas_hogar_ocupacion_ninguna: 0,
    personas_hogar_ocupacion_trabajador_informal: 0,
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
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_8 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setButtonDisabled((transformedPeople[0].neceidades_de_capacitacion_de_la_familia) ? false : true);

      } else {
       setItems({
          id_usuario: params.ficha,
          neceidades_de_capacitacion_de_la_familia: '',
          personas_hogar_ocupacion_sin_dato: 0,
          fecharegistro: getCurrentDateTime(),
          usuario: localStorage.getItem('cedula'),
          estado: 1,
          tabla: 'discapacidad_capitulo_8',
          personas_hogar_parentesco_abuelo: 0,
          personas_hogar_parentesco_acudiente: 0,
          personas_hogar_parentesco_bisabuelos: 0,
          personas_hogar_parentesco_bisnietos: 0,
          personas_hogar_parentesco_conyuge: 0,
          personas_hogar_parentesco_cuniada: 0,
          personas_hogar_parentesco_hermano: 0,
          personas_hogar_parentesco_hijastro: 0,
          personas_hogar_parentesco_hijo: 0,
          personas_hogar_parentesco_hijo_adoptivo: 0,
          personas_hogar_parentesco_jefe_hogar: 0,
          personas_hogar_parentesco_madrastra: 0,
          personas_hogar_parentesco_nieto: 0,
          personas_hogar_parentesco_nuera: 0,
          personas_hogar_parentesco_otros_no_parientes: 0,
          personas_hogar_parentesco_otros_parientes: 0,
          personas_hogar_parentesco_padrastro: 0,
          personas_hogar_parentesco_padres: 0,
          personas_hogar_parentesco_padres_adoptantes: 0,
          personas_hogar_parentesco_rep_legal: 0,
          personas_hogar_parentesco_sobrinos: 0,
          personas_hogar_parentesco_suegros: 0,
          personas_hogar_parentesco_tios: 0,
          personas_hogar_parentesco_yerno: 0,
          numero_personas_hogar_discapacidad: 0,
          personas_hogar_ciclo_primera_infancia: 0,
          personas_hogar_ciclo_infancia: 0,
          personas_hogar_ciclo_primera_adolescencia: 0,
          personas_hogar_ciclo_juventud: 0,
          personas_hogar_ciclo_adultez: 0,
          personas_hogar_ciclo_persona_mayor: 0,
          personas_hogar_escolaridad_inicial: 0,
          personas_hogar_escolaridad_ninguna: 0,
          personas_hogar_escolaridad_posgrado: 0,
          personas_hogar_escolaridad_preescolar: 0,
          personas_hogar_escolaridad_pregrado_completo: 0,
          personas_hogar_escolaridad_pregrado_incompleto: 0,
          personas_hogar_escolaridad_primaria_completa: 0,
          personas_hogar_escolaridad_primaria_incompleta: 0,
          personas_hogar_escolaridad_secundaria_completa: 0,
          personas_hogar_escolaridad_secundaria_incompleta: 0,
          personas_hogar_escolaridad_tecnica_completa: 0,
          personas_hogar_escolaridad_tecnica_incompleta: 0,
          personas_hogar_escolaridad_tecnologia_completa: 0,
          personas_hogar_escolaridad_tecnologia_incompleta: 0,
          personas_hogar_escolaridad_sin_dato: 0,
          personas_hogar_ocupacion_sobrevivencia: 0,
          personas_hogar_ocupacion_ama_de_casa: 0,
          personas_hogar_ocupacion_desempleado: 0,
          personas_hogar_ocupacion_empleado: 0,
          personas_hogar_ocupacion_estudiante: 0,
          personas_hogar_ocupacion_independiente: 0,
          personas_hogar_ocupacion_ninguna: 0,
          personas_hogar_ocupacion_trabajador_informal: 0
        });
      }

      const integrantesRes = await database.exec(`SELECT 
        *, inclusion_ciudadano.id_usuario as id_usuariociu
       FROM 
           inclusion_ciudadano
       LEFT JOIN 
           inclusion_grupofamiliar 
       ON 
           inclusion_ciudadano.id_usuario = inclusion_grupofamiliar.integrantes
       WHERE 
           inclusion_grupofamiliar.id_usuario = ${params.ficha}
           OR inclusion_ciudadano.id_usuario = ${params.ficha};`);
      if (integrantesRes[0]?.values && integrantesRes[0]?.columns) {
        const transformedIntegrantes = integrantesRes[0].values.map((row: any[]) => {
          return integrantesRes[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {});
        });
        setIntegrantes(transformedIntegrantes);
      }
    }
  };



  useEffect(() => {
    if (people.length > 0) {
      let data = people[0] || {};
      setItems({
        id_usuario: data.id_usuario || params.ficha,
        neceidades_de_capacitacion_de_la_familia: data.neceidades_de_capacitacion_de_la_familia || '',
        personas_hogar_ocupacion_sin_dato: data.personas_hogar_ocupacion_sin_dato || 0,
        fecharegistro: data.fecharegistro || getCurrentDateTime(),
        usuario: data.usuario || localStorage.getItem('cedula'),
        estado: data.estado || '1',
        tabla: data.tabla || 'discapacidad_capitulo_8',
        personas_hogar_parentesco_abuelo: data.personas_hogar_parentesco_abuelo || 0,
        personas_hogar_parentesco_acudiente: data.personas_hogar_parentesco_acudiente || 0,
        personas_hogar_parentesco_bisabuelos: data.personas_hogar_parentesco_bisabuelos || 0,
        personas_hogar_parentesco_bisnietos: data.personas_hogar_parentesco_bisnietos || 0,
        personas_hogar_parentesco_conyuge: data.personas_hogar_parentesco_conyuge || 0,
        personas_hogar_parentesco_cuniada: data.personas_hogar_parentesco_cuniada || 0,
        personas_hogar_parentesco_hermano: data.personas_hogar_parentesco_hermano || 0,
        personas_hogar_parentesco_hijastro: data.personas_hogar_parentesco_hijastro || 0,
        personas_hogar_parentesco_hijo: data.personas_hogar_parentesco_hijo || 0,
        personas_hogar_parentesco_hijo_adoptivo: data.personas_hogar_parentesco_hijo_adoptivo || 0,
        personas_hogar_parentesco_jefe_hogar: data.personas_hogar_parentesco_jefe_hogar || 0,
        personas_hogar_parentesco_madrastra: data.personas_hogar_parentesco_madrastra || 0,
        personas_hogar_parentesco_nieto: data.personas_hogar_parentesco_nieto || 0,
        personas_hogar_parentesco_nuera: data.personas_hogar_parentesco_nuera || 0,
        personas_hogar_parentesco_otros_no_parientes: data.personas_hogar_parentesco_otros_no_parientes || 0,
        personas_hogar_parentesco_otros_parientes: data.personas_hogar_parentesco_otros_parientes || 0,
        personas_hogar_parentesco_padrastro: data.personas_hogar_parentesco_padrastro || 0,
        personas_hogar_parentesco_padres: data.personas_hogar_parentesco_padres || 0,
        personas_hogar_parentesco_padres_adoptantes: data.personas_hogar_parentesco_padres_adoptantes || 0,
        personas_hogar_parentesco_rep_legal: data.personas_hogar_parentesco_rep_legal || 0,
        personas_hogar_parentesco_sobrinos: data.personas_hogar_parentesco_sobrinos || 0,
        personas_hogar_parentesco_suegros: data.personas_hogar_parentesco_suegros || 0,
        personas_hogar_parentesco_tios: data.personas_hogar_parentesco_tios || 0,
        personas_hogar_parentesco_yerno: data.personas_hogar_parentesco_yerno || 0,
        numero_personas_hogar_discapacidad: data.numero_personas_hogar_discapacidad || 0,
        personas_hogar_ciclo_primera_infancia: data.personas_hogar_ciclo_primera_infancia || 0,
        personas_hogar_ciclo_infancia: data.personas_hogar_ciclo_infancia || 0,
        personas_hogar_ciclo_primera_adolescencia: data.personas_hogar_ciclo_primera_adolescencia || 0,
        personas_hogar_ciclo_juventud: data.personas_hogar_ciclo_juventud || 0,
        personas_hogar_ciclo_adultez: data.personas_hogar_ciclo_adultez || 0,
        personas_hogar_ciclo_persona_mayor: data.personas_hogar_ciclo_persona_mayor || 0,
        personas_hogar_escolaridad_inicial: data.personas_hogar_escolaridad_inicial || 0,
        personas_hogar_escolaridad_ninguna: data.personas_hogar_escolaridad_ninguna || 0,
        personas_hogar_escolaridad_posgrado: data.personas_hogar_escolaridad_posgrado || 0,
        personas_hogar_escolaridad_preescolar: data.personas_hogar_escolaridad_preescolar || 0,
        personas_hogar_escolaridad_pregrado_completo: data.personas_hogar_escolaridad_pregrado_completo || 0,
        personas_hogar_escolaridad_pregrado_incompleto: data.personas_hogar_escolaridad_pregrado_incompleto || 0,
        personas_hogar_escolaridad_primaria_completa: data.personas_hogar_escolaridad_primaria_completa || 0,
        personas_hogar_escolaridad_primaria_incompleta: data.personas_hogar_escolaridad_primaria_incompleta || 0,
        personas_hogar_escolaridad_secundaria_completa: data.personas_hogar_escolaridad_secundaria_completa || 0,
        personas_hogar_escolaridad_secundaria_incompleta: data.personas_hogar_escolaridad_secundaria_incompleta || 0,
        personas_hogar_escolaridad_tecnica_completa: data.personas_hogar_escolaridad_tecnica_completa || 0,
        personas_hogar_escolaridad_tecnica_incompleta: data.personas_hogar_escolaridad_tecnica_incompleta || 0,
        personas_hogar_escolaridad_tecnologia_completa: data.personas_hogar_escolaridad_tecnologia_completa || 0,
        personas_hogar_escolaridad_tecnologia_incompleta: data.personas_hogar_escolaridad_tecnologia_incompleta || 0,
        personas_hogar_escolaridad_sin_dato: data.personas_hogar_escolaridad_sin_dato || 0,
        personas_hogar_ocupacion_sobrevivencia: data.personas_hogar_ocupacion_sobrevivencia || 0,
        personas_hogar_ocupacion_ama_de_casa: data.personas_hogar_ocupacion_ama_de_casa || 0,
        personas_hogar_ocupacion_desempleado: data.personas_hogar_ocupacion_desempleado || 0,
        personas_hogar_ocupacion_empleado: data.personas_hogar_ocupacion_empleado || 0,
        personas_hogar_ocupacion_estudiante: data.personas_hogar_ocupacion_estudiante || 0,
        personas_hogar_ocupacion_independiente: data.personas_hogar_ocupacion_independiente || 0,
        personas_hogar_ocupacion_ninguna: data.personas_hogar_ocupacion_ninguna || 0,
        personas_hogar_ocupacion_trabajador_informal: data.personas_hogar_ocupacion_trabajador_informal || 0,
      });
    }
  }, [people]);
  

  useEffect(() => {
    fetchUsers();
   
  }, [db]);

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setItems((prevItems) => ({
      ...prevItems,
      [field]: value,
    }));
    console.log(items);
    
  };
  

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  const enviar = async (database = db) => {
    console.log(items);
    try {
      await db.exec(`INSERT OR REPLACE INTO discapacidad_capitulo_8 (
        id_usuario, 
        neceidades_de_capacitacion_de_la_familia, 
        personas_hogar_ocupacion_sin_dato, 
        fecharegistro, 
        usuario, 
        estado, 
        tabla, 
        personas_hogar_parentesco_abuelo, 
        personas_hogar_parentesco_acudiente, 
        personas_hogar_parentesco_bisabuelos, 
        personas_hogar_parentesco_bisnietos, 
        personas_hogar_parentesco_conyuge, 
        personas_hogar_parentesco_cuniada, 
        personas_hogar_parentesco_hermano, 
        personas_hogar_parentesco_hijastro, 
        personas_hogar_parentesco_hijo, 
        personas_hogar_parentesco_hijo_adoptivo, 
        personas_hogar_parentesco_jefe_hogar, 
        personas_hogar_parentesco_madrastra, 
        personas_hogar_parentesco_nieto, 
        personas_hogar_parentesco_nuera, 
        personas_hogar_parentesco_otros_no_parientes, 
        personas_hogar_parentesco_otros_parientes, 
        personas_hogar_parentesco_padrastro, 
        personas_hogar_parentesco_padres, 
        personas_hogar_parentesco_padres_adoptantes, 
        personas_hogar_parentesco_rep_legal, 
        personas_hogar_parentesco_sobrinos, 
        personas_hogar_parentesco_suegros, 
        personas_hogar_parentesco_tios, 
        personas_hogar_parentesco_yerno, 
        numero_personas_hogar_discapacidad, 
        personas_hogar_ciclo_primera_infancia, 
        personas_hogar_ciclo_infancia, 
        personas_hogar_ciclo_primera_adolescencia, 
        personas_hogar_ciclo_juventud, 
        personas_hogar_ciclo_adultez, 
        personas_hogar_ciclo_persona_mayor, 
        personas_hogar_escolaridad_inicial, 
        personas_hogar_escolaridad_ninguna, 
        personas_hogar_escolaridad_posgrado, 
        personas_hogar_escolaridad_preescolar, 
        personas_hogar_escolaridad_pregrado_completo, 
        personas_hogar_escolaridad_pregrado_incompleto, 
        personas_hogar_escolaridad_primaria_completa, 
        personas_hogar_escolaridad_primaria_incompleta, 
        personas_hogar_escolaridad_secundaria_completa, 
        personas_hogar_escolaridad_secundaria_incompleta, 
        personas_hogar_escolaridad_tecnica_completa, 
        personas_hogar_escolaridad_tecnica_incompleta, 
        personas_hogar_escolaridad_tecnologia_completa, 
        personas_hogar_escolaridad_tecnologia_incompleta, 
        personas_hogar_escolaridad_sin_dato, 
        personas_hogar_ocupacion_sobrevivencia, 
        personas_hogar_ocupacion_ama_de_casa, 
        personas_hogar_ocupacion_desempleado, 
        personas_hogar_ocupacion_empleado, 
        personas_hogar_ocupacion_estudiante, 
        personas_hogar_ocupacion_independiente, 
        personas_hogar_ocupacion_ninguna, 
        personas_hogar_ocupacion_trabajador_informal
      ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          items.id_usuario, 
          items.neceidades_de_capacitacion_de_la_familia, 
          items.personas_hogar_ocupacion_sin_dato, 
          items.fecharegistro, 
          items.usuario, 
          items.estado, 
          items.tabla, 
          items.personas_hogar_parentesco_abuelo, 
          items.personas_hogar_parentesco_acudiente, 
          items.personas_hogar_parentesco_bisabuelos, 
          items.personas_hogar_parentesco_bisnietos, 
          items.personas_hogar_parentesco_conyuge, 
          items.personas_hogar_parentesco_cuniada, 
          items.personas_hogar_parentesco_hermano, 
          items.personas_hogar_parentesco_hijastro, 
          items.personas_hogar_parentesco_hijo, 
          items.personas_hogar_parentesco_hijo_adoptivo, 
          items.personas_hogar_parentesco_jefe_hogar, 
          items.personas_hogar_parentesco_madrastra, 
          items.personas_hogar_parentesco_nieto, 
          items.personas_hogar_parentesco_nuera, 
          items.personas_hogar_parentesco_otros_no_parientes, 
          items.personas_hogar_parentesco_otros_parientes, 
          items.personas_hogar_parentesco_padrastro, 
          items.personas_hogar_parentesco_padres, 
          items.personas_hogar_parentesco_padres_adoptantes, 
          items.personas_hogar_parentesco_rep_legal, 
          items.personas_hogar_parentesco_sobrinos, 
          items.personas_hogar_parentesco_suegros, 
          items.personas_hogar_parentesco_tios, 
          items.personas_hogar_parentesco_yerno, 
          items.numero_personas_hogar_discapacidad, 
          items.personas_hogar_ciclo_primera_infancia, 
          items.personas_hogar_ciclo_infancia, 
          items.personas_hogar_ciclo_primera_adolescencia, 
          items.personas_hogar_ciclo_juventud, 
          items.personas_hogar_ciclo_adultez, 
          items.personas_hogar_ciclo_persona_mayor, 
          items.personas_hogar_escolaridad_inicial, 
          items.personas_hogar_escolaridad_ninguna, 
          items.personas_hogar_escolaridad_posgrado, 
          items.personas_hogar_escolaridad_preescolar, 
          items.personas_hogar_escolaridad_pregrado_completo, 
          items.personas_hogar_escolaridad_pregrado_incompleto, 
          items.personas_hogar_escolaridad_primaria_completa, 
          items.personas_hogar_escolaridad_primaria_incompleta, 
          items.personas_hogar_escolaridad_secundaria_completa, 
          items.personas_hogar_escolaridad_secundaria_incompleta, 
          items.personas_hogar_escolaridad_tecnica_completa, 
          items.personas_hogar_escolaridad_tecnica_incompleta, 
          items.personas_hogar_escolaridad_tecnologia_completa, 
          items.personas_hogar_escolaridad_tecnologia_incompleta, 
          items.personas_hogar_escolaridad_sin_dato, 
          items.personas_hogar_ocupacion_sobrevivencia, 
          items.personas_hogar_ocupacion_ama_de_casa, 
          items.personas_hogar_ocupacion_desempleado, 
          items.personas_hogar_ocupacion_empleado, 
          items.personas_hogar_ocupacion_estudiante, 
          items.personas_hogar_ocupacion_independiente, 
          items.personas_hogar_ocupacion_ninguna, 
          items.personas_hogar_ocupacion_trabajador_informal
        ]);
  
      setButtonDisabled(false);
      saveDatabase();
      alert('Datos Guardados con éxito');
    } catch (err) {
      console.error('Error al exportar los datos JSON:', err);
    }
  };
  

  const columns = [
    {
      name: 'Editar',
      selector: row => <button className='btn btn-success btn-sm' onClick={() => history.push(`/tabs/tabintegrantes/${params.ficha}?idintegrante=${`${row.integrantes || row.id_usuariociu}`}`)}>Editar</button>,
      sortable: true,
    },
    // {
    //   name: 'Eliminar',
    //   selector: row => <button className='btn btn-danger btn-sm' onClick={() => handleDelete(row.idintegrante)}>Eliminar</button>,
    //   sortable: true,
    // },
    {
      name: 'Nombre',
      selector: row => `${row.nombre1} ${row.nombre2} ${row.apellido1} ${row.apellido2}`,
      sortable: true,
        minWidth: '230px'
    },
    {
      name: 'Documento',
      selector: row => `${row.numerodedocumento}`,
      sortable: true,
         minWidth: '150px'
    },
    {
      name: 'Fecha de Nacimiento',
      selector: row => `${row.fechadenacimiento}`,
      sortable: true,
          minWidth: '180px'
    },
    {
      name: 'Sexo',
      selector: row => {
        switch (row.sexo) {
          case 1:
            return 'HOMBRE';
          case 2:
            return 'MUJER';
          case 3:
            return 'INTERSEXUAL';
          case 4:
            return 'INDEFINIDO';
          case 5:
            return 'SIN DATO';
          
        }
      },
      sortable: true,
        minWidth: '180px'
    }
  ];

  const handleDelete = async (id) => {
    if (db) {
      try {
        await db.exec(`DELETE FROM infraccion_integrante_familiar WHERE idintegrante=${id}`);
        setIntegrantes(prevIntegrantes => prevIntegrantes.filter(integrante => integrante.idintegrante !== id));
        saveDatabase(); // Guarda la base de datos después de eliminar
        alert('Registro eliminado con éxito');
      } catch (err) {
        console.error('Error al eliminar el registro:', err);
        alert('Error al eliminar el registro');
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">CAPITULO VIII. ASPECTOS SOCIO-FAMILIAR</IonTitle>
          <IonTitle slot="end">FICHA: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="social-card">
          <span className="label">Ficha:</span>
          <span className="value">{params.ficha}</span>
        </div>

        <div className=' shadow p-3 mb-5 bg-white rounded'>
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">CAPITULO VIII. ASPECTOS SOCIO-FAMILIAR</span>
            </div>
            <div className="row g-3 was-validated ">
              {/* <div className="col-sm">
                <label className="form-label">Tipo de Familia</label>
                <select onChange={(e) => {handleInputChange(e, 'tipodefamilia')}} value={items.tipodefamilia} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="9"> AMPLIADA (FAMILIA CON UN MIEMBRO NO CONSANGUÍNEO) </option>
                  <option value="4"> DÍADA CONYUGAL (PAREJA SIN HIJOS) </option>
                  <option value="8"> EXTENSA (GENERACIONES CON LAZOS CONSANGUÍNEOS) </option>
                  <option value="7"> FRATERNA (SOLO HERMANOS) </option>
                  <option value="10"> HOMOPARENTAL (PAREJAS DEL MISMO SEXO) </option>
                  <option value="1"> MONO PARENTAL MATERNA (MADRE E HIJOS) </option>
                  <option value="2"> MONO PARENTAL PATERNA (PADRE E HIJOS) </option>
                  <option value="5"> NUCLEAR (PADRE MADRE E HIJOS) </option>
                  <option value="6"> SIMULTÁNEA (HIJOS PADRE, HIJOS MADRE E HIJOS EN COMUN) </option>
                  <option value="3"> UNIPERSONAL (UNA SOLA PERSONA) </option>
                </select>
              </div> */}
              <div className="col-sm">
                <blockquote className="blockquote text-center">
                  <p className="mb-0"></p>
                  <h6>Numero de integrantes:</h6>
                  <p></p>
                  <p className="mb-0"></p>
                  <h5 id="numerointegrantes">{integrantes.length}</h5>
                  <p></p>
                </blockquote>
              </div>
            </div>
          </IonList>
        </div>


        <div className='shadow p-3 mb-2 pt-0 bg-white rounded'>
        <div className="row g-3 was-validated ">
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">CAPÍTULO VIII. INFORMACIÓN DEL HOGAR</span>
            </div>

            {/* Necesidades de capacitación de la familia */}
            <div className="row g-3">
              <div className="col-sm-12">
                <label htmlFor="neceidades_de_capacitacion_de_la_familia">Necesidades de capacitación de la familia:</label>
                <textarea
                  onChange={(e) => handleInputChange(e, 'neceidades_de_capacitacion_de_la_familia')}
                  value={items.neceidades_de_capacitacion_de_la_familia}
                  className="form-control"
                  id="neceidades_de_capacitacion_de_la_familia"
                  style={{ textTransform: 'uppercase' }}
                  rows="10"
                  required
                />
              </div>
            </div>

            {/* N° de personas en el hogar según parentesco */}
            <div className="row g-3">
              <div className="col-sm-12">
                <h6>N° de personas en el hogar según parentesco:</h6>
              </div>

              {[
                { label: 'Abuelo (a)', key: 'personas_hogar_parentesco_abuelo' },
                { label: 'Acudiente', key: 'personas_hogar_parentesco_acudiente' },
                { label: 'Bisabuelo (a)', key: 'personas_hogar_parentesco_bisabuelos' },
                { label: 'Bisnietos', key: 'personas_hogar_parentesco_bisnietos' },
                { label: 'Cónyuge o compañero (a) permanente', key: 'personas_hogar_parentesco_conyuge' },
                { label: 'Cuñada', key: 'personas_hogar_parentesco_cuniada' },
                { label: 'Hermano (a)', key: 'personas_hogar_parentesco_hermano' },
                { label: 'Hijastro (a)', key: 'personas_hogar_parentesco_hijastro' },
                { label: 'Hijo (a)', key: 'personas_hogar_parentesco_hijo' },
                { label: 'Hijos adoptivos', key: 'personas_hogar_parentesco_hijo_adoptivo' },
                { label: 'Jefe del hogar', key: 'personas_hogar_parentesco_jefe_hogar' },
                { label: 'Madrastra', key: 'personas_hogar_parentesco_madrastra' },
                { label: 'Nieto (a)', key: 'personas_hogar_parentesco_nieto' },
                { label: 'Nuera', key: 'personas_hogar_parentesco_nuera' },
                { label: 'Otros no parientes', key: 'personas_hogar_parentesco_otros_no_parientes' },
                { label: 'Otros parientes', key: 'personas_hogar_parentesco_otros_parientes' },
                { label: 'Padrastro', key: 'personas_hogar_parentesco_padrastro' },
                { label: 'Padres', key: 'personas_hogar_parentesco_padres' },
                { label: 'Padres adoptantes', key: 'personas_hogar_parentesco_padres_adoptantes' },
                { label: 'Representante legal', key: 'personas_hogar_parentesco_rep_legal' },
                { label: 'Sobrinos', key: 'personas_hogar_parentesco_sobrinos' },
                { label: 'Suegros', key: 'personas_hogar_parentesco_suegros' },
                { label: 'Tíos', key: 'personas_hogar_parentesco_tios' },
                { label: 'Yerno', key: 'personas_hogar_parentesco_yerno' },
              ].map(({ label, key }, index) => (
                <div className="col-sm-6" key={index}>
                  <label htmlFor={key}>{label}</label>
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(e, key)}
                    value={items[key]}
                    className="form-control form-control-sm"
                    id={key}
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                </div>
              ))}
            </div>

            {/* N° de personas en el hogar según ciclo de vida */}
            <div className="row g-3">
              <div className="col-sm-12">
                <h6>N° de personas en el hogar según ciclo de vida:</h6>
              </div>

              {[
                { label: 'Primera infancia (0 - 5 años)', key: 'personas_hogar_ciclo_primera_infancia' },
                { label: 'Infancia (6 - 11 años)', key: 'personas_hogar_ciclo_infancia' },
                { label: 'Adolescencia (12-18 años)', key: 'personas_hogar_ciclo_primera_adolescencia' },
                { label: 'Juventud (14-26 años)', key: 'personas_hogar_ciclo_juventud' },
                { label: 'Adultez (27-59 años)', key: 'personas_hogar_ciclo_adultez' },
                { label: 'Persona mayor (60 años o más)', key: 'personas_hogar_ciclo_persona_mayor' },
              ].map(({ label, key }, index) => (
                <div className="col-sm-6" key={index}>
                  <label htmlFor={key}>{label}</label>
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(e, key)}
                    value={items[key]}
                    className="form-control form-control-sm"
                    id={key}
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                </div>
              ))}
            </div>

            {/* N° de personas en el hogar según escolaridad */}
            <div className="row g-3">
              <div className="col-sm-12">
                <h6>N° de personas en el hogar según escolaridad:</h6>
              </div>

              {[
                { label: 'Educación inicial (menores de 0 a 5 años)', key: 'personas_hogar_escolaridad_inicial' },
                { label: 'Ninguna', key: 'personas_hogar_escolaridad_ninguna' },
                { label: 'Posgrado', key: 'personas_hogar_escolaridad_posgrado' },
                { label: 'Preescolar', key: 'personas_hogar_escolaridad_preescolar' },
                { label: 'Pregrado completo', key: 'personas_hogar_escolaridad_pregrado_completo' },
                { label: 'Pregrado incompleto', key: 'personas_hogar_escolaridad_pregrado_incompleto' },
                { label: 'Primaria completa', key: 'personas_hogar_escolaridad_primaria_completa' },
                { label: 'Primaria incompleta', key: 'personas_hogar_escolaridad_primaria_incompleta' },
                { label: 'Secundaria completa', key: 'personas_hogar_escolaridad_secundaria_completa' },
                { label: 'Secundaria incompleta', key: 'personas_hogar_escolaridad_secundaria_incompleta' },
                { label: 'Técnica completa', key: 'personas_hogar_escolaridad_tecnica_completa' },
                { label: 'Técnica incompleta', key: 'personas_hogar_escolaridad_tecnica_incompleta' },
                { label: 'Tecnología completa', key: 'personas_hogar_escolaridad_tecnologia_completa' },
                { label: 'Tecnología incompleta', key: 'personas_hogar_escolaridad_tecnologia_incompleta' },
                { label: 'Sin dato', key: 'personas_hogar_escolaridad_sin_dato' },
              ].map(({ label, key }, index) => (
                <div className="col-sm-6" key={index}>
                  <label htmlFor={key}>{label}</label>
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(e, key)}
                    value={items[key]}
                    className="form-control form-control-sm"
                    id={key}
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                </div>
              ))}
            </div>

            {/* N° de personas en el hogar según ocupación */}
            <div className="row g-3">
              <div className="col-sm-12">
                <h6>N° de personas en el hogar según ocupación:</h6>
              </div>

              {[
                { label: 'Actividades de sobrevivencia', key: 'personas_hogar_ocupacion_sobrevivencia' },
                { label: 'Ama de casa', key: 'personas_hogar_ocupacion_ama_de_casa' },
                { label: 'Desempleado (a)', key: 'personas_hogar_ocupacion_desempleado' },
                { label: 'Empleado', key: 'personas_hogar_ocupacion_empleado' },
                { label: 'Estudiante', key: 'personas_hogar_ocupacion_estudiante' },
                { label: 'Independiente', key: 'personas_hogar_ocupacion_independiente' },
                { label: 'Ninguna', key: 'personas_hogar_ocupacion_ninguna' },
                { label: 'Trabajador (a) informal', key: 'personas_hogar_ocupacion_trabajador_informal' },
                { label: 'Sin dato', key: 'personas_hogar_ocupacion_sin_dato' },
              ].map(({ label, key }, index) => (
                <div className="col-sm-6" key={index}>
                  <label htmlFor={key}>{label}</label>
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(e, key)}
                    value={items[key]}
                    className="form-control form-control-sm"
                    id={key}
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                </div>
              ))}
            </div>

            {/* Confirmación de número de personas en el hogar */}
            <div className="row g-3">
              <div className="col-sm-12">
                <blockquote className="blockquote text-center">
                  <p className="mb-0">
                    <h6>N° de personas en el hogar, incluyendo la persona caracterizada:</h6>
                  </p>
                  <p className="mb-0">
                    <h5>{parseInt(items.numero_personas_hogar_discapacidad, 10) + 1}</h5>
                  </p>
                </blockquote>
              </div>
            </div>
          </IonList>
          </div>
        </div>


















        
        <div className=' shadow p-3 mb-2 pt-0 bg-white rounded'>
          <IonList>
            <div className="alert alert-primary" role="alert">
              <span className="badge badge-secondary text-dark">13 - GRUPO FAMILIAR</span>
              <IonButton routerLink={`/tabs/tabintegrantes/${params.ficha}`}>
                Ingresar un nuevo integrante
              </IonButton>
            </div>
            <CustomDataTable
              title="Integrantes"
              data={integrantes}
              columns={columns}
            />
          </IonList>
        </div>

        <br />

        <div><IonButton color="success" onClick={enviar}>Guardar</IonButton>
        <IonButton routerLink={`/tabs/tab17/${params.ficha}`} disabled={buttonDisabled}>Siguiente</IonButton></div>
        

      </IonContent>
    </IonPage>
  );
};

export default Tab9;


