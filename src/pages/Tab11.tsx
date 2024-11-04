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
  actualmente_vive_en: string | null;
  en_que_condicion_posee_vivienda: string | null;
  otra_condicion_cual: string | null;
  numero_de_espacios_vivienda_cocina: string | null;
  numero_de_espacios_vivienda_comedor: string | null;
  numero_de_espacios_vivienda_sala: string | null;
  numero_de_espacios_vivienda_baño: string | null;
  numero_de_espacios_vivienda_habitaciones: string | null;
  numero_de_espacios_vivienda_balcon: string | null;
  numero_de_espacios_vivienda_parqueadero: string | null;
  numero_de_espacios_vivienda_otras: string | null;
  cual_es_el_estrato_de_la_vivienda: string | null;
  acceso_vivienda_por_trocha: string | null;
  acceso_vivienda_por_medio_de_escalas: string | null;
  acceso_vivienda_por_medio_de_callejon: string | null;
  acceso_vivienda_por_via_pavimentada: string | null;
  acceso_vivienda_por_via_sin_pavimentar: string | null;
  condiciones_higienicas: string | null;
  condiciones_enseres_basicos_adecuados: string | null;
  condiciones_enseres_basicos_en_sobreuso: string | null;
  condiciones_enseres_basicos_reducidos: string | null;
  condiciones_ambientales_aireadas_iluminadas: string | null;
  condiciones_ambientales_aireadas_poca_ilumi: string | null;
  condiciones_ambientales_iluminacion_poco_airea: string | null;
  condiciones_ambientales_vivienda_con_humedades: string | null;
  vivienda_construida_en_adobe: string | null;
  vivienda_construida_en_bareque: string | null;
  vivienda_construida_en_madera_tabla: string | null;
  vivienda_construida_en_piso_en_baldosa: string | null;
  vivienda_construida_en_piso_obra_negra: string | null;
  vivienda_construida_en_piso_en_tierra: string | null;
  vivienda_construida_en_techo_teja_asbesto: string | null;
  vivienda_construida_en_techo_teja_barro: string | null;
  vivienda_construida_en_techo_teja_zinc: string | null;
  vivienda_construida_en_techo_teja_plasticas: string | null;
  vivienda_construida_en_techo_madera: string | null;
  vivienda_construida_en_techo_plancha_cemento: string | null;
  vivienda_construida_en_otro: string | null;
  vivienda_construida_en_otro_cual: string | null;
  vivienda_cuenta_servicios_publ_energia_elec: string | null;
  vivienda_cuenta_servicios_publ_alcantarillado: string | null;
  vivienda_cuenta_servicios_publ_telefono: string | null;
  vivienda_cuenta_servicios_publ_acueducto: string | null;
  vivienda_cuenta_servicios_publ_gas_natural: string | null;
  vivienda_cuenta_servicios_publ_recoleccion_basura: string | null;
  vivienda_cuenta_servicios_publ_internet: string | null;
  vivienda_cuenta_servicios_publ_ninguno: string | null;
  preparacion_alimentos_agua_potable: string | null;
  dispositivos_tecnologicos_televisor: string | null;
  dispositivos_tecnologicos_computador: string | null;
  dispositivos_tecnologicos_tablet: string | null;
  dispositivos_tecnologicos_celular: string | null;
  dispositivos_tecnologicos_otros: string | null;
  dispositivos_tecnologicos_otros_cuales: string | null;
  dispositivos_tecnologicos_ninguno: string | null;
  riesgos_vivienda_por_deslizamiento: string | null;
  riesgos_vivienda_por_inundaciones: string | null;
  riesgos_vivienda_por_techo_paredes_mal_estado: string | null;
  riesgos_vivienda_por_fallas_geologicas: string | null;
  riesgos_vivienda_por_otro: string | null;
  riesgos_vivienda_por_otro_cual: string | null;
  riesgos_vivienda_por_ninguno: string | null;
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
    actualmente_vive_en: '',
    en_que_condicion_posee_vivienda: '',
    otra_condicion_cual: '',
    numero_de_espacios_vivienda_cocina: '',
    numero_de_espacios_vivienda_comedor: '',
    numero_de_espacios_vivienda_sala: '',
    numero_de_espacios_vivienda_baño: '',
    numero_de_espacios_vivienda_habitaciones: '',
    numero_de_espacios_vivienda_balcon: '',
    numero_de_espacios_vivienda_parqueadero: '',
    numero_de_espacios_vivienda_otras: '',
    cual_es_el_estrato_de_la_vivienda: '',
    acceso_vivienda_por_trocha: '1',
    acceso_vivienda_por_medio_de_escalas: '1',
    acceso_vivienda_por_medio_de_callejon: '1',
    acceso_vivienda_por_via_pavimentada: '1',
    acceso_vivienda_por_via_sin_pavimentar: '1',
    condiciones_higienicas: '1',
    condiciones_enseres_basicos_adecuados: '1',
    condiciones_enseres_basicos_en_sobreuso: '1',
    condiciones_enseres_basicos_reducidos: '1',
    condiciones_ambientales_aireadas_iluminadas: '1',
    condiciones_ambientales_aireadas_poca_ilumi: '1',
    condiciones_ambientales_iluminacion_poco_airea: '1',
    condiciones_ambientales_vivienda_con_humedades: '1',
    vivienda_construida_en_adobe: '1',
    vivienda_construida_en_bareque: '1',
    vivienda_construida_en_madera_tabla: '1',
    vivienda_construida_en_piso_en_baldosa: '1',
    vivienda_construida_en_piso_obra_negra: '1',
    vivienda_construida_en_piso_en_tierra: '1',
    vivienda_construida_en_techo_teja_asbesto: '1',
    vivienda_construida_en_techo_teja_barro: '1',
    vivienda_construida_en_techo_teja_zinc: '1',
    vivienda_construida_en_techo_teja_plasticas: '1',
    vivienda_construida_en_techo_madera: '1',
    vivienda_construida_en_techo_plancha_cemento: '1',
    vivienda_construida_en_otro: '1',
    vivienda_construida_en_otro_cual: '',
    vivienda_cuenta_servicios_publ_energia_elec: '1',
    vivienda_cuenta_servicios_publ_alcantarillado: '1',
    vivienda_cuenta_servicios_publ_telefono: '1',
    vivienda_cuenta_servicios_publ_acueducto: '1',
    vivienda_cuenta_servicios_publ_gas_natural: '1',
    vivienda_cuenta_servicios_publ_recoleccion_basura: '1',
    vivienda_cuenta_servicios_publ_internet: '1',
    vivienda_cuenta_servicios_publ_ninguno: '1',
    preparacion_alimentos_agua_potable: '1',
    dispositivos_tecnologicos_televisor: '1',
    dispositivos_tecnologicos_computador: '1',
    dispositivos_tecnologicos_tablet: '1',
    dispositivos_tecnologicos_celular: '1',
    dispositivos_tecnologicos_otros: '1',
    dispositivos_tecnologicos_otros_cuales: '',
    dispositivos_tecnologicos_ninguno: '1',
    riesgos_vivienda_por_deslizamiento: '1',
    riesgos_vivienda_por_inundaciones: '1',
    riesgos_vivienda_por_techo_paredes_mal_estado: '1',
    riesgos_vivienda_por_fallas_geologicas: '1',
    riesgos_vivienda_por_otro: '1',
    riesgos_vivienda_por_otro_cual: '',
    riesgos_vivienda_por_ninguno: '1',
    fecharegistro: getCurrentDateTime(),
    usuario: Number(localStorage.getItem('cedula')) || 0,
    estado: 1,
    tabla: 'discapacidad_capitulo_11',
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
        actualmente_vive_en: data.actualmente_vive_en || '',
        en_que_condicion_posee_vivienda: data.en_que_condicion_posee_vivienda || '',
        otra_condicion_cual: data.otra_condicion_cual || '',
        numero_de_espacios_vivienda_cocina: data.numero_de_espacios_vivienda_cocina || '',
        numero_de_espacios_vivienda_comedor: data.numero_de_espacios_vivienda_comedor || '',
        numero_de_espacios_vivienda_sala: data.numero_de_espacios_vivienda_sala || '',
        numero_de_espacios_vivienda_baño: data.numero_de_espacios_vivienda_baño || '',
        numero_de_espacios_vivienda_habitaciones: data.numero_de_espacios_vivienda_habitaciones || '',
        numero_de_espacios_vivienda_balcon: data.numero_de_espacios_vivienda_balcon || '',
        numero_de_espacios_vivienda_parqueadero: data.numero_de_espacios_vivienda_parqueadero || '',
        numero_de_espacios_vivienda_otras: data.numero_de_espacios_vivienda_otras || '',
        cual_es_el_estrato_de_la_vivienda: data.cual_es_el_estrato_de_la_vivienda || '',
        acceso_vivienda_por_trocha: data.acceso_vivienda_por_trocha || '0',
        acceso_vivienda_por_medio_de_escalas: data.acceso_vivienda_por_medio_de_escalas || '0',
        acceso_vivienda_por_medio_de_callejon: data.acceso_vivienda_por_medio_de_callejon || '0',
        acceso_vivienda_por_via_pavimentada: data.acceso_vivienda_por_via_pavimentada || '0',
        acceso_vivienda_por_via_sin_pavimentar: data.acceso_vivienda_por_via_sin_pavimentar || '0',
        condiciones_higienicas: data.condiciones_higienicas || '0',
        condiciones_enseres_basicos_adecuados: data.condiciones_enseres_basicos_adecuados || '0',
        condiciones_enseres_basicos_en_sobreuso: data.condiciones_enseres_basicos_en_sobreuso || '0',
        condiciones_enseres_basicos_reducidos: data.condiciones_enseres_basicos_reducidos || '0',
        condiciones_ambientales_aireadas_iluminadas: data.condiciones_ambientales_aireadas_iluminadas || '0',
        condiciones_ambientales_aireadas_poca_ilumi: data.condiciones_ambientales_aireadas_poca_ilumi || '0',
        condiciones_ambientales_iluminacion_poco_airea: data.condiciones_ambientales_iluminacion_poco_airea || '0',
        condiciones_ambientales_vivienda_con_humedades: data.condiciones_ambientales_vivienda_con_humedades || '0',
        vivienda_construida_en_adobe: data.vivienda_construida_en_adobe || '0',
        vivienda_construida_en_bareque: data.vivienda_construida_en_bareque || '0',
        vivienda_construida_en_madera_tabla: data.vivienda_construida_en_madera_tabla || '0',
        vivienda_construida_en_piso_en_baldosa: data.vivienda_construida_en_piso_en_baldosa || '0',
        vivienda_construida_en_piso_obra_negra: data.vivienda_construida_en_piso_obra_negra || '0',
        vivienda_construida_en_piso_en_tierra: data.vivienda_construida_en_piso_en_tierra || '0',
        vivienda_construida_en_techo_teja_asbesto: data.vivienda_construida_en_techo_teja_asbesto || '0',
        vivienda_construida_en_techo_teja_barro: data.vivienda_construida_en_techo_teja_barro || '0',
        vivienda_construida_en_techo_teja_zinc: data.vivienda_construida_en_techo_teja_zinc || '0',
        vivienda_construida_en_techo_teja_plasticas: data.vivienda_construida_en_techo_teja_plasticas || '0',
        vivienda_construida_en_techo_madera: data.vivienda_construida_en_techo_madera || '0',
        vivienda_construida_en_techo_plancha_cemento: data.vivienda_construida_en_techo_plancha_cemento || '0',
        vivienda_construida_en_otro: data.vivienda_construida_en_otro || '0',
        vivienda_construida_en_otro_cual: data.vivienda_construida_en_otro_cual || '',
        vivienda_cuenta_servicios_publ_energia_elec: data.vivienda_cuenta_servicios_publ_energia_elec || '0',
        vivienda_cuenta_servicios_publ_alcantarillado: data.vivienda_cuenta_servicios_publ_alcantarillado || '0',
        vivienda_cuenta_servicios_publ_telefono: data.vivienda_cuenta_servicios_publ_telefono || '0',
        vivienda_cuenta_servicios_publ_acueducto: data.vivienda_cuenta_servicios_publ_acueducto || '0',
        vivienda_cuenta_servicios_publ_gas_natural: data.vivienda_cuenta_servicios_publ_gas_natural || '0',
        vivienda_cuenta_servicios_publ_recoleccion_basura: data.vivienda_cuenta_servicios_publ_recoleccion_basura || '0',
        vivienda_cuenta_servicios_publ_internet: data.vivienda_cuenta_servicios_publ_internet || '0',
        vivienda_cuenta_servicios_publ_ninguno: data.vivienda_cuenta_servicios_publ_ninguno || '0',
        preparacion_alimentos_agua_potable: data.preparacion_alimentos_agua_potable || '0',
        dispositivos_tecnologicos_televisor: data.dispositivos_tecnologicos_televisor || '0',
        dispositivos_tecnologicos_computador: data.dispositivos_tecnologicos_computador || '0',
        dispositivos_tecnologicos_tablet: data.dispositivos_tecnologicos_tablet || '0',
        dispositivos_tecnologicos_celular: data.dispositivos_tecnologicos_celular || '0',
        dispositivos_tecnologicos_otros: data.dispositivos_tecnologicos_otros || '0',
        dispositivos_tecnologicos_otros_cuales: data.dispositivos_tecnologicos_otros_cuales || '',
        dispositivos_tecnologicos_ninguno: data.dispositivos_tecnologicos_ninguno || '0',
        riesgos_vivienda_por_deslizamiento: data.riesgos_vivienda_por_deslizamiento || '0',
        riesgos_vivienda_por_inundaciones: data.riesgos_vivienda_por_inundaciones || '0',
        riesgos_vivienda_por_techo_paredes_mal_estado: data.riesgos_vivienda_por_techo_paredes_mal_estado || '0',
        riesgos_vivienda_por_fallas_geologicas: data.riesgos_vivienda_por_fallas_geologicas || '0',
        riesgos_vivienda_por_otro: data.riesgos_vivienda_por_otro || '0',
        riesgos_vivienda_por_otro_cual: data.riesgos_vivienda_por_otro_cual || '',
        riesgos_vivienda_por_ninguno: data.riesgos_vivienda_por_ninguno || '0',
        fecharegistro: data.fecharegistro || getCurrentDateTime(),
        usuario: data.usuario || Number(localStorage.getItem('cedula')) || 0,
        estado: data.estado || 1,
        tabla: data.tabla || 'discapacidad_capitulo_11',
      });
    }
  }, [people]);
  
  

  const fetchUsers = async (database = db) => {
    if (database) {
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_11 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index] !== null && row[index] !== '' ? row[index].toString() : '0'; // Convertir valores null o vacíos a '0'
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
      await database.exec(`INSERT OR REPLACE INTO discapacidad_capitulo_11 (
        id_usuario, actualmente_vive_en, en_que_condicion_posee_vivienda, otra_condicion_cual,
        numero_de_espacios_vivienda_cocina, numero_de_espacios_vivienda_comedor, numero_de_espacios_vivienda_sala,
        numero_de_espacios_vivienda_baño, numero_de_espacios_vivienda_habitaciones, numero_de_espacios_vivienda_balcon,
        numero_de_espacios_vivienda_parqueadero, numero_de_espacios_vivienda_otras, cual_es_el_estrato_de_la_vivienda,
        acceso_vivienda_por_trocha, acceso_vivienda_por_medio_de_escalas, acceso_vivienda_por_medio_de_callejon,
        acceso_vivienda_por_via_pavimentada, acceso_vivienda_por_via_sin_pavimentar, condiciones_higienicas,
        condiciones_enseres_basicos_adecuados, condiciones_enseres_basicos_en_sobreuso, condiciones_enseres_basicos_reducidos,
        condiciones_ambientales_aireadas_iluminadas, condiciones_ambientales_aireadas_poca_ilumi,
        condiciones_ambientales_iluminacion_poco_airea, condiciones_ambientales_vivienda_con_humedades,
        vivienda_construida_en_adobe, vivienda_construida_en_bareque, vivienda_construida_en_madera_tabla,
        vivienda_construida_en_piso_en_baldosa, vivienda_construida_en_piso_obra_negra, vivienda_construida_en_piso_en_tierra,
        vivienda_construida_en_techo_teja_asbesto, vivienda_construida_en_techo_teja_barro, vivienda_construida_en_techo_teja_zinc,
        vivienda_construida_en_techo_teja_plasticas, vivienda_construida_en_techo_madera, vivienda_construida_en_techo_plancha_cemento,
        vivienda_construida_en_otro, vivienda_construida_en_otro_cual, vivienda_cuenta_servicios_publ_energia_elec,
        vivienda_cuenta_servicios_publ_alcantarillado, vivienda_cuenta_servicios_publ_telefono, vivienda_cuenta_servicios_publ_acueducto,
        vivienda_cuenta_servicios_publ_gas_natural, vivienda_cuenta_servicios_publ_recoleccion_basura, vivienda_cuenta_servicios_publ_internet,
        vivienda_cuenta_servicios_publ_ninguno, preparacion_alimentos_agua_potable, dispositivos_tecnologicos_televisor,
        dispositivos_tecnologicos_computador, dispositivos_tecnologicos_tablet, dispositivos_tecnologicos_celular,
        dispositivos_tecnologicos_otros, dispositivos_tecnologicos_otros_cuales, dispositivos_tecnologicos_ninguno,
        riesgos_vivienda_por_deslizamiento, riesgos_vivienda_por_inundaciones, riesgos_vivienda_por_techo_paredes_mal_estado,
        riesgos_vivienda_por_fallas_geologicas, riesgos_vivienda_por_otro, riesgos_vivienda_por_otro_cual, riesgos_vivienda_por_ninguno,
        fecharegistro, usuario, estado, tabla
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
        [
          items.id_usuario, items.actualmente_vive_en, items.en_que_condicion_posee_vivienda, items.otra_condicion_cual,
          items.numero_de_espacios_vivienda_cocina, items.numero_de_espacios_vivienda_comedor, items.numero_de_espacios_vivienda_sala,
          items.numero_de_espacios_vivienda_baño, items.numero_de_espacios_vivienda_habitaciones, items.numero_de_espacios_vivienda_balcon,
          items.numero_de_espacios_vivienda_parqueadero, items.numero_de_espacios_vivienda_otras, items.cual_es_el_estrato_de_la_vivienda,
          items.acceso_vivienda_por_trocha, items.acceso_vivienda_por_medio_de_escalas, items.acceso_vivienda_por_medio_de_callejon,
          items.acceso_vivienda_por_via_pavimentada, items.acceso_vivienda_por_via_sin_pavimentar, items.condiciones_higienicas,
          items.condiciones_enseres_basicos_adecuados, items.condiciones_enseres_basicos_en_sobreuso, items.condiciones_enseres_basicos_reducidos,
          items.condiciones_ambientales_aireadas_iluminadas, items.condiciones_ambientales_aireadas_poca_ilumi,
          items.condiciones_ambientales_iluminacion_poco_airea, items.condiciones_ambientales_vivienda_con_humedades,
          items.vivienda_construida_en_adobe, items.vivienda_construida_en_bareque, items.vivienda_construida_en_madera_tabla,
          items.vivienda_construida_en_piso_en_baldosa, items.vivienda_construida_en_piso_obra_negra, items.vivienda_construida_en_piso_en_tierra,
          items.vivienda_construida_en_techo_teja_asbesto, items.vivienda_construida_en_techo_teja_barro, items.vivienda_construida_en_techo_teja_zinc,
          items.vivienda_construida_en_techo_teja_plasticas, items.vivienda_construida_en_techo_madera, items.vivienda_construida_en_techo_plancha_cemento,
          items.vivienda_construida_en_otro, items.vivienda_construida_en_otro_cual, items.vivienda_cuenta_servicios_publ_energia_elec,
          items.vivienda_cuenta_servicios_publ_alcantarillado, items.vivienda_cuenta_servicios_publ_telefono, items.vivienda_cuenta_servicios_publ_acueducto,
          items.vivienda_cuenta_servicios_publ_gas_natural, items.vivienda_cuenta_servicios_publ_recoleccion_basura, items.vivienda_cuenta_servicios_publ_internet,
          items.vivienda_cuenta_servicios_publ_ninguno, items.preparacion_alimentos_agua_potable, items.dispositivos_tecnologicos_televisor,
          items.dispositivos_tecnologicos_computador, items.dispositivos_tecnologicos_tablet, items.dispositivos_tecnologicos_celular,
          items.dispositivos_tecnologicos_otros, items.dispositivos_tecnologicos_otros_cuales, items.dispositivos_tecnologicos_ninguno,
          items.riesgos_vivienda_por_deslizamiento, items.riesgos_vivienda_por_inundaciones, items.riesgos_vivienda_por_techo_paredes_mal_estado,
          items.riesgos_vivienda_por_fallas_geologicas, items.riesgos_vivienda_por_otro, items.riesgos_vivienda_por_otro_cual, items.riesgos_vivienda_por_ninguno,
          items.fecharegistro, items.usuario, items.estado, items.tabla
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
    { value: "1", label: "NO" },
    { value: "2", label: "SI" }
  ];


  const t1_condiciones_higienicas = [
    { value: "1", label: "Adecuadas" },
    { value: "2", label: "Inadecuadas" }
  ];

  return (
    <IonPage>
      <IonHeader><div className='col-12'>
        <IonToolbar>
          <IonTitle slot="start">CAPITULO XI. TIPO Y CARACTERIZACIÓN DE LA VIVIENDA</IonTitle>
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
       <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab16/${params.ficha}`;} }}> Siguiente</div>
       </div> 
           </form>
      </IonContent>
    </IonPage>

  );
};

export default Tab17;
