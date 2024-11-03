import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonInput, IonButton,
  IonIcon,
  IonAlert,
  IonToast
} from '@ionic/react';

import React, { useEffect, useState } from 'react';
import loadSQL from '../models/database';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { informationCircleOutline, trash } from 'ionicons/icons';

interface Person {
  id_usuario: number;
  persona_entidad: string;
  persona_parentesco: string | null;
  persona_procedencia: string;
  valor: number | null;
  persona_entidad2: string;
  persona_parentesco2: string | null;
  direccion_persona_parentesco: string;
  persona_procedencia2: string;
  valor2: number | null;
  persona_entidad3: string;
  persona_parentesco3: string | null;
  persona_procedencia3: string;
  valor3: number | null;
  persona_entidad4: string;
  persona_parentesco4: string | null;
  persona_procedencia4: string;
  valor4: number | null;
  total_ingresos: string | null;
  egresos_mensuales_salud: string | null;
  egresos_mensuales_arriendo: string | null;
  egresos_mensuales_alimentacion: string | null;
  egresos_mensuales_servicios_publicos: string | null;
  egresos_mensuales_subsidio: string | null;
  egresos_mensuales_transporte: string | null;
  egresos_mensuales_otros: string | null;
  egresos_familiar_total: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}

interface IngresoMensual {
  id?: number; // Opcional debido a AUTO_INCREMENT
  id_usuario: number | null;
  nombres_y_apellidos: string;
  parentesco: string  | null;
  procedencia: string  | null;
  ingresos_mensuales?: number | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}




const Tab10: React.FC = () => {
  const getCurrentDateTime = () => {
      const date = new Date();
      return date.toISOString().slice(0, 19).replace('T', ' ');
    };
  
  const params = useParams<{ ficha: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [ingresosMensuales, setIngresosMensuales] = useState<IngresoMensual[]>([]);
  const [db, setDb] = useState<any>(null);
  const [formattedValue, setFormattedValue] = useState('');
  const [ingresosFamiliares, setIngresosFamiliares] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const [items, setItems] = useState<Person>({
    id_usuario: Number(params.ficha),
    persona_entidad: '',
    persona_parentesco: '',
    persona_procedencia: '',
    valor: 0,
    persona_entidad2: '',
    persona_parentesco2: '',
    direccion_persona_parentesco: '',
    persona_procedencia2: '',
    valor2: 0,
    persona_entidad3: '',
    persona_parentesco3: '',
    persona_procedencia3: '',
    valor3: 0,
    persona_entidad4: '',
    persona_parentesco4: '',
    persona_procedencia4: '',
    valor4: 0,
    total_ingresos: '0',
    egresos_mensuales_salud: '0',
    egresos_mensuales_arriendo: '0',
    egresos_mensuales_alimentacion: '0',
    egresos_mensuales_servicios_publicos: '0',
    egresos_mensuales_subsidio: '0',
    egresos_mensuales_transporte: '0',
    egresos_mensuales_otros: '0',
    egresos_familiar_total: '0',
    fecharegistro: getCurrentDateTime(),
    usuario: localStorage.getItem('cedula') || '',
    estado: '1',
    tabla: 'discapacidad_capitulo_10',
  });

  const [itemsMensual, setItemsMensual] = useState<IngresoMensual>({
    id_usuario: Number(params.ficha),
    nombres_y_apellidos: '',
    parentesco: '',
    procedencia: '',
    ingresos_mensuales: 0,
    usuario: Number(localStorage.getItem('cedula')) || null,
    estado: 1,
    tabla: 'dicapacidad_ingresos_mensuales',
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
        persona_entidad: data.persona_entidad || '',
        persona_parentesco: data.persona_parentesco || '',
        persona_procedencia: data.persona_procedencia || '',
        valor: data.valor || 0,
        persona_entidad2: data.persona_entidad2 || '',
        persona_parentesco2: data.persona_parentesco2 || '',
        direccion_persona_parentesco: data.direccion_persona_parentesco || '',
        persona_procedencia2: data.persona_procedencia2 || '',
        valor2: data.valor2 || 0,
        persona_entidad3: data.persona_entidad3 || '',
        persona_parentesco3: data.persona_parentesco3 || '',
        persona_procedencia3: data.persona_procedencia3 || '',
        valor3: data.valor3 || 0,
        persona_entidad4: data.persona_entidad4 || '',
        persona_parentesco4: data.persona_parentesco4 || '',
        persona_procedencia4: data.persona_procedencia4 || '',
        valor4: data.valor4 || 0,
        total_ingresos: data.total_ingresos || '0',
        egresos_mensuales_salud: data.egresos_mensuales_salud || '0',
        egresos_mensuales_arriendo: data.egresos_mensuales_arriendo || '0',
        egresos_mensuales_alimentacion: data.egresos_mensuales_alimentacion || '0',
        egresos_mensuales_servicios_publicos: data.egresos_mensuales_servicios_publicos || '0',
        egresos_mensuales_subsidio: data.egresos_mensuales_subsidio || '0',
        egresos_mensuales_transporte: data.egresos_mensuales_transporte || '0',
        egresos_mensuales_otros: data.egresos_mensuales_otros || '0',
        egresos_familiar_total: data.egresos_familiar_total || '0',
        fecharegistro: data.fecharegistro || getCurrentDateTime(),
        usuario: data.usuario || localStorage.getItem('cedula') || '',
        estado: data.estado || '1',
        tabla: data.tabla || 'discapacidad_capitulo_10',
      });
    }
  }, [people]);

  useEffect(() => {
    if (people.length > 0) {
      const data = people[0];
      setItemsMensual({
        id_usuario: data.id_usuario || Number(params.ficha),
        nombres_y_apellidos: data.nombres_y_apellidos || '',
        parentesco: data.parentesco || '',
        procedencia: data.procedencia || '',
        ingresos_mensuales: data.ingresos_mensuales || 0,
        usuario: data.usuario || Number(localStorage.getItem('cedula')) || null,
        estado: data.estado || 1,
        tabla: data.tabla || 'dicapacidad_ingresos_mensuales',
      });
    }
  }, [people]);
  
  
  

  const fetchDiscapacidadCapitulo10 = async (database) => {
    try {
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_10 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index] !== '' ? row[index].toString() : '0'; // Convertir valores null a '0'
            return obj;
          }, {} as Person);
        });
        setPeople(transformedPeople);
        setButtonDisabled(!transformedPeople[0]?.id_usuario);
      }
    } catch (error) {
      console.error("Error fetching data from discapacidad_capitulo_10:", error);
    }
  };
  
  const fetchDicapacidadIngresosMensuales = async (database) => {
    try {
      const resultado = await database.exec(`SELECT * FROM dicapacidad_ingresos_mensuales WHERE id_usuario=${params.ficha}`);
      if (resultado[0]?.values && resultado[0]?.columns) {
        const ingresosTransformados: IngresoMensual[] = resultado[0].values.map((fila: any[]) => {
          return resultado[0].columns.reduce((obj, columna, indice) => {
            obj[columna] = fila[indice] !== '' ? fila[indice].toString() : '0'; // Convertir valores null a '0'
            return obj;
          }, {} as IngresoMensual);
        });
        setIngresosMensuales(ingresosTransformados);
      }
    } catch (error) {
      console.error("Error fetching data from dicapacidad_ingresos_mensuales:", error);
    }
  };

  const fetchUsers = async (database = db) => {
    if (database) {
      await fetchDiscapacidadCapitulo10(database);
      await fetchDicapacidadIngresosMensuales(database);
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

  const columns = [
   
    {
      name: 'Nombres y Apellidos',
      selector: row => row.nombres_y_apellidos,
      sortable: true,
    },
    {
      name: 'Parentesco',
      selector: row => row.parentesco,
      sortable: true,
    },
    {
      name: 'Procedencia',
      selector: row => row.procedencia,
      sortable: true,
    },
    {
      name: 'Ingresos',
      selector: row => `$ ${parseFloat(row.ingresos_mensuales).toLocaleString('de-DE')}`,
      sortable: true,
    },
    {
      name: 'Eliminar',
      cell: (row) => (
          <button
              className="btn btn-danger btn-sm"
              onClick={(e) => handleDeleteIngreso(e, row)}
          >
              <IonIcon slot="start" icon={trash} /> Eliminar
          </button>
      ),
  },
  ];
  


  const enviar = async (database = db, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
    try {
      await database.exec(`INSERT OR REPLACE INTO discapacidad_capitulo_10 (
        id_usuario, persona_entidad, persona_parentesco, persona_procedencia, valor, persona_entidad2, persona_parentesco2,
        direccion_persona_parentesco, persona_procedencia2, valor2, persona_entidad3, persona_parentesco3, persona_procedencia3,
        valor3, persona_entidad4, persona_parentesco4, persona_procedencia4, valor4, total_ingresos, egresos_mensuales_salud,
        egresos_mensuales_arriendo, egresos_mensuales_alimentacion, egresos_mensuales_servicios_publicos, egresos_mensuales_subsidio,
        egresos_mensuales_transporte, egresos_mensuales_otros, egresos_familiar_total, fecharegistro, usuario, estado, tabla
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
        [
          items.id_usuario, items.persona_entidad, items.persona_parentesco, items.persona_procedencia, items.valor, items.persona_entidad2,
          items.persona_parentesco2, items.direccion_persona_parentesco, items.persona_procedencia2, items.valor2, items.persona_entidad3,
          items.persona_parentesco3, items.persona_procedencia3, items.valor3, items.persona_entidad4, items.persona_parentesco4,
          items.persona_procedencia4, items.valor4, items.total_ingresos, items.egresos_mensuales_salud, items.egresos_mensuales_arriendo,
          items.egresos_mensuales_alimentacion, items.egresos_mensuales_servicios_publicos, items.egresos_mensuales_subsidio,
          items.egresos_mensuales_transporte, items.egresos_mensuales_otros, items.egresos_familiar_total, items.fecharegistro,
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

  const registraringresosfamiliares = async (database = db, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
    const newIngreso = {
        id_usuario: items.id_usuario,
        nombres_y_apellidos: items.persona_entidad,
        parentesco: items.persona_parentesco,
        procedencia: items.persona_procedencia,
        ingresos_mensuales: items.valor,
        usuario: items.usuario,
        estado: items.estado,
        tabla: items.tabla,
    };
  
    // Verifica que todos los campos necesarios estén llenos
    if (!newIngreso.nombres_y_apellidos || !newIngreso.parentesco || !newIngreso.procedencia || !newIngreso.ingresos_mensuales) {
        return setShowAlert(true);
    }

    try {
        await database.exec(
            `INSERT OR REPLACE INTO dicapacidad_ingresos_mensuales (
                id_usuario, nombres_y_apellidos, parentesco, procedencia, ingresos_mensuales, usuario, estado, tabla
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                newIngreso.id_usuario, newIngreso.nombres_y_apellidos, newIngreso.parentesco,
                newIngreso.procedencia, newIngreso.ingresos_mensuales, newIngreso.usuario,
                newIngreso.estado, newIngreso.tabla,
            ]
        );
        
        // Guarda en IndexedDB
        saveDatabase();

        // Actualiza la lista de ingresos con todos los registros desde la base de datos
        const resultado = await database.exec(`SELECT * FROM dicapacidad_ingresos_mensuales WHERE id_usuario = ?`, [newIngreso.id_usuario]);
        if (resultado[0]?.values && resultado[0]?.columns) {
            const ingresosTransformados: IngresoMensual[] = resultado[0].values.map((fila: any[]) => {
                return resultado[0].columns.reduce((obj, columna, indice) => {
                    obj[columna] = fila[indice] !== '' ? fila[indice].toString() : '0';
                    return obj;
                }, {} as IngresoMensual);
            });
            setIngresosMensuales(ingresosTransformados);
        }

        // Limpia los campos del formulario
        setItems((prevItems) => ({
            ...prevItems,
            persona_entidad: '',
            persona_parentesco: '',
            persona_procedencia: '',
            valor: '',
        }));
        
        console.log('Datos guardados con éxito');
    } catch (err) {
        console.error('Error al guardar los datos en la base de datos:', err);
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
// Calcula el total de ingresos sumando el campo ingresos_mensuales
const totalIngresos = ingresosMensuales.reduce((total, item) => total + Number(item.ingresos_mensuales || 0), 0);

// Formatea el total de ingresos con dos decimales en formato europeo
const formattedTotalIngresos = totalIngresos.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });



const sumaringresos = () => {
    const total =
      (items.valor ? parseInt(items.valor) : 0) +
      (items.valor2 ? parseInt(items.valor2) : 0) +
      (items.valor3 ? parseInt(items.valor3) : 0) +
      (items.valor4 ? parseInt(items.valor4) : 0);
    setItems((prev) => ({
      ...prev,
      total_ingresos: total.toString(),
    }));
    ingresosformato(total); // Actualizar el formato de ingresos totales
  };

  const ingresosformato = (value) => {
    const formatted = `$ ${new Intl.NumberFormat('de-DE').format(value)}`;
    setFormattedValue(formatted);
  };
  const sumaregresos = () => {
    const totalEgresos = [
      'egresos_mensuales_arriendo',
      'egresos_mensuales_alimentacion',
      'egresos_mensuales_salud',
      'egresos_mensuales_servicios_publicos',
      'egresos_mensuales_subsidio',
      'egresos_mensuales_transporte',
      'egresos_mensuales_otros',
    ]
      .map((key) => parseInt(items[key] || '0'))
      .reduce((a, b) => a + b, 0);
    setItems((prev) => ({ ...prev, egresos_familiar_total: totalEgresos.toString() }));
  };

  useEffect(() => {
    sumaringresos();
    sumaregresos();
  }, [items.valor, items.valor2, items.valor3, items.valor4, items.egresos_mensuales_arriendo, items.egresos_mensuales_alimentacion, items.egresos_mensuales_salud, items.egresos_mensuales_servicios_publicos, items.egresos_mensuales_subsidio, items.egresos_mensuales_transporte, items.egresos_mensuales_otros]);

  const handleDeleteIngreso = async (e, ingreso) => {
    e.preventDefault();

    // Verifica si el ingreso tiene un ID válido antes de intentar eliminarlo
    if (!ingreso.id) {
        console.error('No se encontró el ID del ingreso a eliminar.');
        return;
    }

    // Elimina el registro de la base de datos
    try {
        await db.exec(
            `DELETE FROM dicapacidad_ingresos_mensuales WHERE id = ? AND id_usuario = ?`,
            [ingreso.id, items.id_usuario]
        );

        // Actualiza la lista en el estado después de eliminar el ingreso de la base de datos
        setIngresosMensuales((prevIngresos) =>
            prevIngresos.filter((item) => item.id !== ingreso.id)
        );

        console.log(`Ingreso con ID ${ingreso.id} eliminado exitosamente.`);
        saveDatabase();
    } catch (err) {
        console.error('Error al eliminar el ingreso de la base de datos:', err);
    }
};

  
  

  const customFooter = () => (
    <div style={{ padding: '10px', fontWeight: 'bold', textAlign: 'right' }}>
      Total ingresos: ${formattedTotalIngresos}
    </div>
  );
  

  return (
    <IonPage>
      <IonHeader><div className='col-12'>
        <IonToolbar>
          <IonTitle slot="start">CAPITULO X. INGRESOS Y EGRESOS MENSUALES</IonTitle>
          <IonTitle slot="end">FICHA: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar></div>
      </IonHeader>
      <IonContent fullscreen ><form>
        
    
      <div className=' shadow p-3 mb-5 bg-white rounded'>
<div className="row g-3 was-validated">

<IonList>
        {/* Ingresos Familiares */}
        <div className="row">
          <div className="form-group col-sm pt-2">
            <label htmlFor="persona_entidad">NOMBRES Y APELLIDOS:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="persona_entidad"
              style={{ textTransform: 'uppercase' }}
              value={items.persona_entidad || ''}
              onChange={(e) => handleInputChange(e, 'persona_entidad')} required
            />
          </div>
          <div className="form-group col-sm pt-2">
            <label htmlFor="persona_parentesco">PARENTESCO:</label>
            <select
              className="form-control form-control-sm"
              id="persona_parentesco"
              value={items.persona_parentesco || ''}
              onChange={(e) => handleInputChange(e, 'persona_parentesco')} required
            >
               <option value=""> SELECCIONE </option><option value="6"> ABUELO(A) </option><option value="24"> ACUDIENTE </option><option value="10"> BISABUELO(A) </option><option value="11"> BISNIETO(A) </option><option value="3"> CÓNYUGE O COMPAÑERO(A) PERMANENTE </option><option value="18"> CUÑADO(A) </option><option value="25"> EL MISMO </option><option value="5"> HERMANO(A) </option><option value="15"> HIJASTRO(A) </option><option value="4"> HIJO(A) </option><option value="20"> HIJO(A)S ADOPTIVOS </option><option value="1"> JEFE(A) DEL HOGAR </option><option value="17"> MADRASTRA </option><option value="7"> NIETO(A) </option><option value="14"> NUERA </option><option value="22"> OTROS NO PARIENTES </option><option value="21"> OTROS PARIENTES </option><option value="16"> PADRASTRO </option><option value="2"> PADRES </option><option value="19"> PADRES ADOPTANTES </option><option value="23"> REPRESENTANTE LEGAL - PERSONA CUIDADORA </option><option value="26"> SIN DATO </option><option value="9"> SOBRINO(A) </option><option value="12"> SUEGRO(A) </option><option value="8"> TÍOS O TÍAS </option><option value="13"> YERNO </option>  
            </select>
          </div>
          <div className="form-group col-sm pt-2">
            <label htmlFor="persona_procedencia">PROCEDENCIA:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="persona_procedencia"
              style={{ textTransform: 'uppercase' }}
              value={items.persona_procedencia || ''}
              onChange={(e) => handleInputChange(e, 'persona_procedencia')} required
            />
          </div>
          <div className="form-group col-sm pt-2">
            <label htmlFor="valor">INGRESOS MENSUALES:</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="valor"
              style={{ textTransform: 'uppercase' }}
              value={items.valor || ''}
              onChange={(e) => handleInputChange(e, 'valor')}
              onBlur={() => {  sumaringresos() }}
              onKeyUp={() => { ingresosformato(items.valor) }} required
            />
            <small id="valformato"></small>
          </div>
          <div className="form-group col-sm">
        <br />

          <button className="btn btn-info " onClick={(e) => registraringresosfamiliares(db,e)}>Registrar</button>
          </div>
        </div>

        <hr />
        <div className="row" id="resumeningresos">
          <div className="form-group col-sm">
            <DataTable
                    title="Resumen de Ingresos Mensuales"
                    columns={columns}
                    data={ingresosMensuales}
                    pagination
                  />
                   {customFooter()}
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="form-group col-sm pb-2 ">
            EGRESOS MENSUALES:
          </div>
        </div>

        {/* Formulario de Egresos Mensuales */}
          <div className="row">
            <div className="form-group col-sm pb-3">
              <label htmlFor="egresos_mensuales_servicios_publicos">SERVICIOS PÚBLICOS:</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="egresos_mensuales_servicios_publicos"
                style={{ textTransform: 'uppercase' }}
                value={items.egresos_mensuales_servicios_publicos || ''}
                onChange={(e) => handleInputChange(e, 'egresos_mensuales_servicios_publicos')}
                onBlur={() => { sumaregresos() }}
                onKeyUp={() => { ingresosformato(items.valor)}}
              />
              <small id="egresos_mensuales_servicios_publicosformato"></small>
            </div>
            <div className="form-group col-sm pb-3">
              <label htmlFor="egresos_mensuales_arriendo">ARRIENDO:</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="egresos_mensuales_arriendo"
                style={{ textTransform: 'uppercase' }}
                value={items.egresos_mensuales_arriendo || ''}
                onChange={(e) => handleInputChange(e, 'egresos_mensuales_arriendo')}
                onBlur={() => { sumaregresos()}}
                onKeyUp={() => {  ingresosformato(items.valor)}}
              />
              <small id="egresos_mensuales_arriendoformato"></small>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm pb-3">
              <label htmlFor="egresos_mensuales_salud">SALUD:</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="egresos_mensuales_salud"
                style={{ textTransform: 'uppercase' }}
                value={items.egresos_mensuales_salud || ''}
                onChange={(e) => handleInputChange(e, 'egresos_mensuales_salud')}
                onBlur={() => { sumaregresos()}}
                onKeyUp={() => { ingresosformato(items.valor)}}
              />
              <small id="egresos_mensuales_saludformato"></small>
            </div>
            <div className="form-group col-sm pb-3">
              <label htmlFor="egresos_mensuales_alimentacion">ALIMENTACIÓN:</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="egresos_mensuales_alimentacion"
                style={{ textTransform: 'uppercase' }}
                value={items.egresos_mensuales_alimentacion || ''}
                onChange={(e) => handleInputChange(e, 'egresos_mensuales_alimentacion')}
                onBlur={() => { sumaregresos()}}
                onKeyUp={() => { ingresosformato(items.valor)}}
              />
              <small id="egresos_mensuales_alimentacionformato"></small>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm pb-3">
              <label htmlFor="egresos_mensuales_subsidio">SUBSIDIO:</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="egresos_mensuales_subsidio"
                style={{ textTransform: 'uppercase' }}
                value={items.egresos_mensuales_subsidio || ''}
                onChange={(e) => handleInputChange(e, 'egresos_mensuales_subsidio')}
                onBlur={() => { sumaregresos()}}
                onKeyUp={() => {  ingresosformato(items.valor) }}
              />
              <small id="egresos_mensuales_subsidioformato"></small>
            </div>
            <div className="form-group col-sm pb-3">
              <label htmlFor="egresos_mensuales_transporte">TRANSPORTE:</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="egresos_mensuales_transporte"
                style={{ textTransform: 'uppercase' }}
                value={items.egresos_mensuales_transporte || ''}
                onChange={(e) => handleInputChange(e, 'egresos_mensuales_transporte')}
                onBlur={() => { sumaregresos() }}
                onKeyUp={() => { ingresosformato(items.valor) }}
              />
              <small id="egresos_mensuales_transporteformato"></small>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm pb-3">
              <label htmlFor="egresos_mensuales_otros">OTROS:</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="egresos_mensuales_otros"
                style={{ textTransform: 'uppercase' }}
                value={items.egresos_mensuales_otros || ''}
                onChange={(e) => handleInputChange(e, 'egresos_mensuales_otros')}
                onBlur={() => {sumaregresos()}}
                onKeyUp={() => { ingresosformato(items.valor)}}
              />
              <small id="egresos_mensuales_otrosformato"></small>
            </div>
            <div className="form-group col-sm pb-3">
              <label htmlFor="egresos_familiar_total">TOTAL EGRESOS:</label>
              <input
                type="number"
                className="form-control form-control-sm"
                id="egresos_familiar_total"
                style={{ textTransform: 'uppercase' }}
                value={items.egresos_familiar_total || ''}
                onChange={(e) => handleInputChange(e, 'egresos_familiar_total')}
                disabled
              />
              <small id="egresos_familiar_totalformato"></small>
            </div>
          </div>
      </IonList>
    </div>
</div>

<IonToast
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message="Llena los campos obligatorios antes de ingresar un ingreso."
        duration={1000} // 1000 ms = 1 segundo
        color="primary"
        icon={informationCircleOutline}
        position="bottom"
        buttons={[
          {
            side: 'start',
            icon: informationCircleOutline,
          }
        ]}
      />

    <br />
       <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
       <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/tabs/tab15/${params.ficha}`;} }}> Siguiente</div>
       </div> 
           </form>
      </IonContent>
    </IonPage>

  );
};

export default Tab10;
