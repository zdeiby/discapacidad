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
  yearpostulacion: string | null;
  tipodedocumento: string | null;
  nacionalidad: string | null;
  numerodedocumento: string | null;
  nombre1: string | null;
  nombre2: string | null;
  apellido1: string | null;
  apellido2: string | null;
  fechadenacimiento: string | null;
  sexo: string | null;
  orientacionsexual: string | null;
  identidaddegenero: string | null;
  etnia: string | null;
  estadocivil: string | null;
  gestantelactante: string | null;
  escolaridad: string | null;
  parentesco: string | null;
  discapacidad: string | null;
  regimendesalud: string | null;
  enfermedades: string | null;
  actividad: string | null;
  ocupacion: string | null;
  sisbenizado: string | null;
  campesino: string | null;
  victima: string | null;
  fecharegistro: string | null;
  auditiva: string | null;
  mental: string | null;
  fisica: string | null;
  sordoceguera: string | null;
  visual: string | null;
  intelectual: string | null;
  habitanzacalle: string | null;
  correoelectronico: string | null;
  telcontactouno: string | null;
  telcontactodos: string | null;
  fechadenacimiento_verificada: string | null;
  tabla: string | null;
  usuario: string | null;  
  estado: string | null;  
}




const Ciudadano: React.FC = () => {
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
    yearpostulacion: getCurrentYear(),
    tipodedocumento: '',
    nacionalidad: '',
    numerodedocumento: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    fechadenacimiento: '',
    sexo: '',
    orientacionsexual: '',
    identidaddegenero: '',
    etnia: '',
    estadocivil: '',
    gestantelactante: '',
    escolaridad: '',
    parentesco: '',
    discapacidad: '',
    regimendesalud: '',
    enfermedades: '',
    actividad: '',
    ocupacion: '',
    sisbenizado: '',
    campesino: '',
    victima: '',
    fecharegistro: getCurrentDateTime(),
    auditiva: '1',
    mental: '1',
    fisica: '1',
    sordoceguera: '1',
    visual: '1',
    intelectual: '1',
    habitanzacalle: '',
    correoelectronico: '',
    telcontactouno: '',
    telcontactodos: '',
    fechadenacimiento_verificada: '',
    tabla: 'inclusion_ciudadano',
    usuario: localStorage.getItem('cedula') ,
    estado:'1',   
  });
  
  
  

  useEffect(() => {
    loadSQL(setDb, fetchUsers);
    
  }, []);

  useEffect(() => {
    console.log('Componente montado o actualizado');
    fetchUsers();
  }, [db, params.ficha]);
  
  
  
  const buscarPorNumeroDocumento = async (numeroDocumento) => {
    if (db && numeroDocumento) {
      try {
        // Consulta en la base de datos utilizando el número de documento
        const res = await db.exec(`SELECT * FROM inclusion_ciudadano WHERE numerodedocumento = ?`, [numeroDocumento]);
  
        if (res[0]?.values && res[0]?.columns) {
          // Transforma los resultados de la consulta en un objeto tipo Person
          const transformedPeople: Person[] = res[0].values.map((row: any[]) => {
            return res[0].columns.reduce((obj, col, index) => {
              obj[col] = row[index];
              return obj;
            }, {} as Person);
          });
  
          if (transformedPeople.length > 0) {
            setItems(transformedPeople[0]); // Guardar el primer objeto en items
            console.log('Datos encontrados:', transformedPeople[0]); // Verifica los datos
            window.location.href = `/tabs/ciudadano/${transformedPeople[0].id_usuario}`;
          } else {
            //alert('No se encontraron registros con ese número de documento.');
          }
        } else {
         // alert('No se encontraron registros con ese número de documento.');
        }
      } catch (err) {
        console.error("Error en la consulta SQL:", err);
      }
    }
  };
  
  

  const fetchUsers = async (database = db) => {
    if (db) {
      try {
        const res = await database.exec(`SELECT * FROM inclusion_ciudadano WHERE id_usuario=${params.ficha}`);
        
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
            yearpostulacion: new Date().getFullYear(),
            tipodedocumento: '',
            nacionalidad: '',
            numerodedocumento: '',
            nombre1: '',
            nombre2: '',
            apellido1: '',
            apellido2: '',
            fechadenacimiento: '',
            sexo: '',
            orientacionsexual: '',
            identidaddegenero: '',
            etnia: '',
            estadocivil: '',
            gestantelactante: '',
            escolaridad: '',
            parentesco: '',
            discapacidad: '',
            regimendesalud: '',
            enfermedades: '',
            actividad: '',
            ocupacion: '',
            sisbenizado: '',
            campesino: '',
            victima: '',
            auditiva: '',
            mental: '',
            fisica: '',
            sordoceguera: '',
            visual: '',
            intelectual: '',
            habitanzacalle: '',
            correoelectronico: '',
            telcontactouno: '',
            telcontactodos: '',
            fechadenacimiento_verificada: '',
            fecharegistro: getCurrentDateTime(),
            usuario: localStorage.getItem('cedula'),
            tabla: 'inclusion_ciudadano',
            estado: '1'
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
      if (field === 'numerodedocumento' && value) {
          buscarPorNumeroDocumento(value);
        }
      if (field === 'discapacidad') {
        
        if (value === '7') {
          // Si es múltiple, no cambiamos los valores, pero los requerimos.
          // (Puedes resetearlos si lo prefieres.)
        } else {
          // Si no es múltiple, limpiar los valores de discapacidad adicional
          newState.auditiva = '';
          newState.mental = '';
          newState.fisica = '';
          newState.sordoceguera = '';
          newState.intelectual = '';
          newState.visual = '';
        }
      }
  
      return newState;
    });
  };
  

  const enviar = async (database = db, event: React.MouseEvent<HTMLButtonElement>) => {
    if (!validarCampos()) {
      return;
    }
    event.preventDefault();
    try {
      await db.exec(`
        INSERT OR REPLACE INTO inclusion_ciudadano 
        (id_usuario, yearpostulacion, tipodedocumento, nacionalidad, numerodedocumento, nombre1, nombre2, apellido1, apellido2, fechadenacimiento, sexo, orientacionsexual, identidaddegenero, etnia, estadocivil, gestantelactante, escolaridad, parentesco, discapacidad, regimendesalud, enfermedades, actividad, ocupacion, sisbenizado, campesino, victima, auditiva, mental, fisica, sordoceguera, visual, intelectual, habitanzacalle, correoelectronico, telcontactouno, telcontactodos, fechadenacimiento_verificada, fecharegistro, tabla, usuario, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?);
      `, [
        items.id_usuario, items.yearpostulacion, items.tipodedocumento, items.nacionalidad, items.numerodedocumento, items.nombre1, items.nombre2, items.apellido1, items.apellido2,
        items.fechadenacimiento, items.sexo, items.orientacionsexual, items.identidaddegenero, items.etnia, items.estadocivil, items.gestantelactante, items.escolaridad,
        items.parentesco, items.discapacidad, items.regimendesalud, items.enfermedades, items.actividad, items.ocupacion, items.sisbenizado, items.campesino, items.victima,
        items.auditiva, items.mental, items.fisica, items.sordoceguera, items.visual, items.intelectual, items.habitanzacalle, items.correoelectronico, items.telcontactouno,
        items.telcontactodos, items.fechadenacimiento_verificada, items.fecharegistro, items.tabla, items.usuario, items.estado  // Añadido 'usuario' y 'estado'
      ]);
      saveDatabase();
      alert('Datos guardados correctamente');
    } catch (err) {
      console.error('Error al guardar los datos:', err);
    }
    
    
    
    
  };

 

  const validarCampos = () => {
    const camposObligatorios = [
      'nacionalidad', 'tipodedocumento', 'numerodedocumento', 'nombre1', 'apellido1',
      'fechadenacimiento', 'sexo', 'orientacionsexual', 'identidaddegenero', 'estadocivil',
      'escolaridad', 'parentesco', 'regimendesalud', 'actividad', 'ocupacion', 'victima', 'sisbenizado'
    ];

    if (items.discapacidad === '7') { // Si es múltiple, agregar los campos adicionales
      camposObligatorios.push('auditiva', 'mental', 'fisica', 'sordoceguera', 'intelectual', 'visual');
    }


    for (let campo of camposObligatorios) {
      if (!items[campo]) {
        return false;
      }
    }
    return true;
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
          <IonTitle slot="start">CARACTERIZACIÓN DEL CIUDADANO</IonTitle>
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
            <div className="row g-3 was-validated ">
              <div className="col-sm-12">
                <label className="form-label">Nacionalidad:</label>
                <select onChange={(e) => handleInputChange(e, 'nacionalidad')} value={items.nacionalidad} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="3"> AFGANISTAN </option>
                  <option value="4"> ALBANIA </option>
                  <option value="5"> ALEMANIA </option>
                  <option value="6"> ANDORRA </option>
                  <option value="7"> ANGOLA </option>
                  <option value="8"> ANGUILLA </option>
                  <option value="9"> ANTIGUA Y BARBUDA </option>
                  <option value="10"> ANTILLAS HOLANDESAS </option>
                  <option value="11"> ARABIA SAUDI </option>
                  <option value="12"> ARGELIA </option>
                  <option value="13"> ARGENTINA </option>
                  <option value="14"> ARMENIA </option>
                  <option value="15"> ARUBA </option>
                  <option value="16"> AUSTRALIA </option>
                  <option value="17"> AUSTRIA </option>
                  <option value="18"> AZERBAIYAN </option><option value="19"> BAHAMAS </option><option value="20"> BAHREIN </option><option value="21"> BANGLADESH </option><option value="22"> BARBADOS </option><option value="23"> BELARUS </option><option value="24"> BELGICA </option><option value="25"> BELICE </option><option value="26"> BENIN </option><option value="27"> BERMUDAS </option><option value="28"> BHUTÁN </option><option value="29"> BOLIVIA </option><option value="30"> BOSNIA Y HERZEGOVINA </option><option value="31"> BOTSWANA </option><option value="32"> BRASIL </option><option value="33"> BRUNEI </option><option value="34"> BULGARIA </option><option value="35"> BURKINA FASO </option><option value="36"> BURUNDI </option><option value="37"> CABO VERDE </option><option value="38"> CAMBOYA </option><option value="39"> CAMERUN </option><option value="40"> CANADA </option><option value="41"> CHAD </option><option value="42"> CHILE </option><option value="43"> CHINA </option><option value="44"> CHIPRE </option><option value="1"> COLOMBIA </option><option value="45"> COMORES </option><option value="46"> CONGO </option><option value="47"> COREA </option><option value="48"> COREA DEL NORTE  </option><option value="49"> COSTA DE MARFIL </option><option value="50"> COSTA RICA </option><option value="51"> CROACIA </option><option value="52"> CUBA </option><option value="53"> DINAMARCA </option><option value="54"> DJIBOUTI </option><option value="55"> DOMINICA </option><option value="56"> ECUADOR </option><option value="57"> EGIPTO </option><option value="58"> EL SALVADOR </option><option value="59"> EMIRATOS ARABES UNIDOS </option><option value="60"> ERITREA </option><option value="61"> ESLOVENIA </option><option value="62"> ESPAÑA </option><option value="63"> ESTADOS UNIDOS DE AMERICA </option><option value="64"> ESTONIA </option><option value="65"> ETIOPIA </option><option value="66"> FIJI </option><option value="67"> FILIPINAS </option><option value="68"> FINLANDIA </option><option value="69"> FRANCIA </option><option value="70"> GABON </option><option value="71"> GAMBIA </option><option value="72"> GEORGIA </option><option value="73"> GHANA </option><option value="74"> GIBRALTAR </option><option value="75"> GRANADA </option><option value="76"> GRECIA </option><option value="77"> GROENLANDIA </option><option value="78"> GUADALUPE </option><option value="79"> GUAM </option><option value="80"> GUATEMALA </option><option value="81"> GUAYANA FRANCESA </option><option value="82"> GUERNESEY </option><option value="83"> GUINEA </option><option value="84"> GUINEA ECUATORIAL </option><option value="85"> GUINEA-BISSAU </option><option value="86"> GUYANA </option><option value="87"> HAITI </option><option value="88"> HONDURAS </option><option value="89"> HONG KONG </option><option value="90"> HUNGRIA </option><option value="91"> INDIA </option><option value="92"> INDONESIA </option><option value="93"> IRAN </option><option value="94"> IRAQ </option><option value="95"> IRLANDA </option><option value="96"> ISLA DE MAN </option><option value="97"> ISLA NORFOLK </option><option value="98"> ISLANDIA </option><option value="99"> ISLAS ALAND </option><option value="100"> ISLAS CAIMÁN </option><option value="101"> ISLAS COOK </option><option value="102"> ISLAS DEL CANAL </option><option value="103"> ISLAS FEROE </option><option value="104"> ISLAS MALVINAS </option><option value="105"> ISLAS MARIANAS DEL NORTE </option><option value="106"> ISLAS MARSHALL </option><option value="107"> ISLAS PITCAIRN </option><option value="108"> ISLAS SALOMON </option><option value="109"> ISLAS TURCAS Y CAICOS </option><option value="110"> ISLAS VIRGENES BRITANICAS </option><option value="111"> ISLAS VÍRGENES DE LOS ESTADOS UNIDOS </option><option value="112"> ISRAEL </option><option value="113"> ITALIA </option><option value="114"> JAMAICA </option><option value="115"> JAPON </option><option value="116"> JERSEY </option><option value="117"> JORDANIA </option><option value="118"> KAZAJSTAN </option><option value="119"> KENIA </option><option value="120"> KIRGUISTAN </option><option value="121"> KIRIBATI </option><option value="122"> KUWAIT </option><option value="123"> LAOS </option><option value="124"> LESOTHO </option><option value="125"> LETONIA </option><option value="126"> LIBANO </option><option value="127"> LIBERIA </option><option value="128"> LIBIA </option><option value="129"> LIECHTENSTEIN </option><option value="130"> LITUANIA </option><option value="131"> LUXEMBURGO </option><option value="132"> MACAO </option><option value="133"> MACEDONIA  </option><option value="134"> MADAGASCAR </option><option value="135"> MALASIA </option><option value="136"> MALAWI </option><option value="137"> MALDIVAS </option><option value="138"> MALI </option><option value="139"> MALTA </option><option value="140"> MARRUECOS </option><option value="141"> MARTINICA </option><option value="142"> MAURICIO </option><option value="143"> MAURITANIA </option><option value="144"> MAYOTTE </option><option value="145"> MEXICO </option><option value="146"> MICRONESIA </option><option value="147"> MOLDAVIA </option><option value="148"> MONACO </option><option value="149"> MONGOLIA </option><option value="150"> MONTENEGRO </option><option value="151"> MONTSERRAT </option><option value="152"> MOZAMBIQUE </option><option value="153"> MYANMAR </option><option value="154"> NAMIBIA </option><option value="155"> NAURU </option><option value="156"> NEPAL </option><option value="157"> NICARAGUA </option><option value="158"> NIGER </option><option value="159"> NIGERIA </option><option value="160"> NIUE </option><option value="161"> NORUEGA </option><option value="162"> NUEVA CALEDONIA </option><option value="163"> NUEVA ZELANDA </option><option value="164"> OMAN </option><option value="165"> OTROS PAISES  O TERRITORIOS DE AMERICA DEL NORTE </option><option value="166"> OTROS PAISES O TERRITORIOS  DE SUDAMERICA </option><option value="167"> OTROS PAISES O TERRITORIOS DE AFRICA </option><option value="168"> OTROS PAISES O TERRITORIOS DE ASIA </option><option value="169"> OTROS PAISES O TERRITORIOS DE LA UNION EUROPEA </option><option value="170"> OTROS PAISES O TERRITORIOS DE OCEANIA </option><option value="171"> OTROS PAISES O TERRITORIOS DEL CARIBE Y AMERICA CENTRAL </option><option value="172"> OTROS PAISES O TERRITORIOS DEL RESTO DE EUROPA </option><option value="173"> PAISES BAJOS </option><option value="174"> PAKISTAN </option><option value="175"> PALAOS </option><option value="176"> PALESTINA </option><option value="177"> PANAMA </option><option value="178"> PAPUA NUEVA GUINEA </option><option value="179"> PARAGUAY </option><option value="180"> PERU </option><option value="181"> POLINESIA FRANCESA </option><option value="182"> POLONIA </option><option value="183"> PORTUGAL </option><option value="184"> PUERTO RICO </option><option value="185"> QATAR </option><option value="186"> REINO UNIDO </option><option value="187"> REP.DEMOCRATICA DEL CONGO </option><option value="188"> REPUBLICA CENTROAFRICANA </option><option value="189"> REPUBLICA CHECA </option><option value="190"> REPUBLICA DOMINICANA </option><option value="191"> REPUBLICA ESLOVACA </option><option value="192"> REUNION </option><option value="193"> RUANDA </option><option value="194"> RUMANIA </option><option value="195"> RUSIA </option><option value="196"> SAHARA OCCIDENTAL </option><option value="197"> SAMOA </option><option value="198"> SAMOA AMERICANA </option><option value="199"> SAN BARTOLOME </option><option value="200"> SAN CRISTOBAL Y NIEVES </option><option value="201"> SAN MARINO </option><option value="202"> SAN MARTIN (PARTE FRANCESA) </option><option value="203"> SAN PEDRO Y MIQUELON  </option><option value="204"> SAN VICENTE Y LAS GRANADINAS </option><option value="205"> SANTA HELENA </option><option value="206"> SANTA LUCIA </option><option value="207"> SANTA SEDE </option><option value="208"> SANTO TOME Y PRINCIPE </option><option value="209"> SENEGAL </option><option value="210"> SERBIA </option><option value="211"> SEYCHELLES </option><option value="212"> SIERRA LEONA </option><option value="213"> SINGAPUR </option><option value="214"> SIRIA </option><option value="215"> SOMALIA </option><option value="216"> SRI LANKA </option><option value="217"> SUDAFRICA </option><option value="218"> SUDAN </option><option value="219"> SUECIA </option><option value="220"> SUIZA </option><option value="221"> SURINAM </option><option value="222"> SVALBARD Y JAN MAYEN </option><option value="223"> SWAZILANDIA </option><option value="224"> TADYIKISTAN </option><option value="225"> TAILANDIA </option><option value="226"> TANZANIA </option><option value="227"> TIMOR ORIENTAL </option><option value="228"> TOGO </option><option value="229"> TOKELAU </option><option value="230"> TONGA </option><option value="231"> TRINIDAD Y TOBAGO </option><option value="232"> TUNEZ </option><option value="233"> TURKMENISTAN </option><option value="234"> TURQUIA </option><option value="235"> TUVALU </option><option value="236"> UCRANIA </option><option value="237"> UGANDA </option><option value="238"> URUGUAY </option><option value="239"> UZBEKISTAN </option><option value="240"> VANUATU </option><option value="2"> VENEZUELA </option><option value="241"> VIETNAM </option><option value="242"> WALLIS Y FORTUNA </option><option value="243"> YEMEN </option><option value="244"> ZAMBIA </option><option value="245"> ZIMBABWE </option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Tipo de documento:</label>
                <select onChange={(e) => handleInputChange(e, 'tipodedocumento')} value={items.tipodedocumento} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="15"> ACTA DE NACIMIENTO </option>
                  <option value="1"> CÉDULA DE CIUDADANÍA </option>
                  <option value="4"> CÉDULA DE EXTRANJERÍA </option>
                  <option value="8"> CÉDULA VENEZOLANA </option>
                  <option value="12"> DNI -DOCUMENTO NACIONAL DE IDENTIDAD </option>
                  <option value="10"> NES-NÚMERO ESTABLECIDO POR LA SECRETARÍA DE EDUCACIÓN </option>
                  <option value="9"> NIT: NÚMERO ÚNICO DE IDENTIFICACIÓN TRIBUTARIA </option>
                  <option value="13"> NO TIENE -NO POSEE DOCUMENTOS DE IDENTIDAD </option>
                  <option value="11"> NUIP: NÚMERO ÚNICO DE IDENTIFICACIÓN PERSONAL </option>
                  <option value="5"> PASAPORTE </option>
                  <option value="6"> PET-PERMISO ESPECIAL DE PERMANENCIA </option>
                  <option value="7"> PPT-PERMISO POR PROTECCIÓN TEMPORAL </option>
                  <option value="3"> REGISTRO CIVIL </option>
                  <option value="16"> SALVOCONDUCTO </option>
                  <option value="14"> SIN DATO - NO INFORMA SOBRE DOCUMENTO DE IDENTIDAD </option>
                  <option value="2"> TARJETA DE IDENTIDAD </option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label" >Numero de documento:</label>
                <input type="number" onChange={(e) => handleInputChange(e, 'numerodedocumento')} value={items.numerodedocumento} placeholder="" className="form-control form-control-sm  " required />
              </div>
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">

              <div className="col-sm-3">
                <label className="form-label" >Primer nombre:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'nombre1')} value={items.nombre1} placeholder="" className="form-control form-control-sm  " required />
              </div>
              <div className="col-sm-3">
                <label className="form-label" >Segundo nombre:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'nombre2')} value={items.nombre2} placeholder="" className="form-control form-control-sm  " />
              </div>
              <div className="col-sm-3">
                <label className="form-label" >Primer apellido:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'apellido1')} value={items.apellido1} placeholder="" className="form-control form-control-sm  " required />
              </div>
              <div className="col-sm-3">
                <label className="form-label" >Segundo apellido:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'apellido2')} value={items.apellido2} placeholder="" className="form-control form-control-sm  " />
              </div>
            </div>
          </IonList>

          <IonList>
            <div className="row g-3 was-validated ">

              <div className="col-sm">
                <label className="form-label" >Fecha de nacimiento</label>
                <input type="date" onChange={(e) => handleInputChange(e, 'fechadenacimiento')} value={items.fechadenacimiento} placeholder="" className="form-control form-control-sm  " required />
              </div>
              <div className="form-group col-sm">
                <blockquote className="blockquote text-center">
                  <p className="mb-0"></p><h6>Edad:</h6><p></p>
                  <p className="mb-0"></p><h5 id="edad">{calculateAge(items.fechadenacimiento) || '0'}</h5><p></p>
                </blockquote>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Fecha de nacimiento verificada:</label>
                <select onChange={(e) => handleInputChange(e, 'fechadenacimiento_verificada')} value={items.fechadenacimiento_verificada} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option></select>
              </div>
            </div>
          </IonList>

          <IonList>
            <div className="row g-3 was-validated ">

              <div className="col-sm">
                <label className="form-label" >Teléfono de contacto 1:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'telcontactouno')} value={items.telcontactouno} placeholder="" className="form-control form-control-sm  " required />
              </div>
              <div className="col-sm">
                <label className="form-label" >Teléfono de contacto 2:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'telcontactodos')} value={items.telcontactodos} placeholder="" className="form-control form-control-sm  " required />
              </div>
              <div className="col-sm">
                <label className="form-label" >Correo electrónico:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'correoelectronico')} value={items.correoelectronico} placeholder="" className="form-control form-control-sm  " required />
              </div>
            </div>
          </IonList>

          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm-6">
                <label className="form-label">Sexo:</label>
                <select onChange={(e) => handleInputChange(e, 'sexo')} value={items.sexo} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="1"> HOMBRE </option><option value="4"> INDEFINIDO </option><option value="3"> INTERSEXUAL </option><option value="2"> MUJER </option>                  </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Orientacion sexual:</label>
                <select onChange={(e) => handleInputChange(e, 'orientacionsexual')} value={items.orientacionsexual} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="5"> ASEXUAL </option><option value="3"> BISEXUAL </option><option value="4"> GAY </option><option value="1"> HETEROSEXUAL </option><option value="2"> LESBIANA </option><option value="8"> NINGUNA </option><option value="6"> PANSEXUAL </option><option value="7"> SIN DATO </option>                                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Identidad de genero:</label>
                <select onChange={(e) => handleInputChange(e, 'identidaddegenero')} value={items.identidaddegenero} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="11"> FLUIDO </option><option value="5"> HOMBRE CIS </option><option value="2"> HOMBRE TRANS </option><option value="4"> MUJER CIS </option><option value="1"> MUJER TRANS </option><option value="7"> NINGUNA </option><option value="3"> NO BINARIO </option><option value="10"> NO SABE NO RESPONDE </option><option value="8"> OTRO </option><option value="9"> SIN DATO </option><option value="6"> TRAVESTI </option>                                 </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Etnia:</label>
                <select onChange={(e) => handleInputChange(e, 'etnia')} value={items.etnia} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="1"> AFRODESCENDIENTE O AFROCOLOMBIANO </option><option value="6"> INDÍGENA </option><option value="2"> NEGRO </option><option value="7"> NINGUNA </option><option value="3"> PALENQUERO </option><option value="4"> RAIZAL </option><option value="5"> ROM O GITANO </option><option value="8"> SIN DATO </option>                                 </select>
              </div>
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Estado civil:</label>
                <select onChange={(e) => handleInputChange(e, 'estadocivil')} value={items.estadocivil} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="2"> CASADO </option><option value="6"> DIVORCIADO </option><option value="4"> SEPARADO </option><option value="1"> SOLTERO </option><option value="3"> UNIÓN LIBRE </option><option value="5"> VIUDO </option>                                </select>
              </div>
            </div>
          </IonList>
          <IonList>
          {(items.sexo =='2')? 
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Gestante y lactante:</label>
                <select onChange={(e) => handleInputChange(e, 'gestantelactante')} value={items.gestantelactante} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="1"> GESTANTE </option><option value="3"> GESTANTE Y LACTANTE </option><option value="2"> LACTANTE </option><option value="4"> NINGUNA </option>
                </select>
              </div>
            </div>:''}
          </IonList>

          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm-6">
                <label className="form-label">Escolaridad:</label>
                <select onChange={(e) => handleInputChange(e, 'escolaridad')} value={items.escolaridad} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="18"> DOCTORADO </option><option value="2"> EDUCACIÓN INICIAL (MENORES DE 0 A 5 AÑOS) </option><option value="16"> ESPECIALIZACIÓN </option><option value="17"> MAESTRÍA </option><option value="1"> NINGUNA </option><option value="14"> POSGRADO </option><option value="3"> PREESCOLAR </option><option value="12"> PREGRADO COMPLETO </option><option value="13"> PREGRADO INCOMPLETO </option><option value="4"> PRIMARIA COMPLETA </option><option value="5"> PRIMARIA INCOMPLETA </option><option value="6"> SECUNDARIA COMPLETA </option><option value="7"> SECUNDARIA INCOMPLETA </option><option value="15"> SIN DATO </option><option value="8"> TÉCNICA COMPLETA </option><option value="9"> TÉCNICA INCOMPLETA </option><option value="10"> TECNOLOGÍA COMPLETA </option><option value="11"> TECNOLOGÍA INCOMPLETA </option>                                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Parentesco:</label>
                <select onChange={(e) => handleInputChange(e, 'parentesco')} value={items.parentesco} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="6"> ABUELO(A) </option><option value="10"> BISABUELO(A) </option><option value="11"> BISNIETO(A) </option><option value="3"> CÓNYUGE O COMPAÑERO(A) PERMANENTE </option><option value="18"> CUÑADO(A) </option><option value="5"> HERMANO(A) </option><option value="15"> HIJASTRO(A) </option><option value="4"> HIJO(A) </option><option value="20"> HIJOS(A) ADOPTIVOS </option><option value="1"> JEFE DEL HOGAR </option><option value="17"> MADRASTRA </option><option value="7"> NIETO(A) </option><option value="14"> NUERA </option><option value="22"> OTROS NO PARIENTES </option><option value="21"> OTROS PARIENTES </option><option value="16"> PADRASTRO </option><option value="2"> PADRES </option><option value="19"> PADRES ADOPTANTES </option><option value="9"> SOBRINO(A) </option><option value="12"> SUEGRO(A) </option><option value="8"> TÍO(A) </option><option value="13"> YERNO </option>
                </select>
              </div>
              <div className="col-sm-12">
                <label className="form-label">Discapacidad:</label>
                <select onChange={(e) => handleInputChange(e, 'discapacidad')} value={items.discapacidad} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="5"> AUDITIVA </option><option value="2"> FÍSICA </option><option value="4"> INTELECTUAL </option><option value="7"> MÚLTIPLE </option><option value="1"> NO TIENE DISCAPACIDAD </option><option value="3"> PSICOSOCIAL (MENTAL) </option><option value="8"> SI, SE DESCONOCE </option><option value="10"> SIN DATO </option><option value="9"> SORDOCEGUERA </option><option value="6"> VISUAL </option>
                </select>
              </div>

              <hr />


              <div className="col-sm-6">
                <label className="form-label">Regimen de salud:</label>
                <select onChange={(e) => handleInputChange(e, 'regimendesalud')} value={items.regimendesalud} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="2"> CONTRIBUTIVO </option><option value="4"> ESPECIAL </option><option value="3"> NINGUNO </option><option value="6"> SIN DATO </option><option value="1"> SUBSIDIADO </option>
                </select>
              </div>
            </div>
          </IonList>

          <IonList>
          {(items.discapacidad =='7')?
          <>  <div className="row g-3 was-validated ">
              <div className="row">
                    <div className="col-sm-12">
                        <div className="alert alert-info" role="alert">
                            <strong>¿Cuáles categorías de discapacidad presenta?</strong> Selecciones SI o NO en cada categoría.
                        </div>
                    </div>
                    <div className="col-sm">
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-12 pb-2">
                        <label >Auditiva:</label>
                        <select  onChange={(e) => handleInputChange(e, 'auditiva')} value={items.auditiva} className="form-control form-control-sm" id="auditiva" required>
                            <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>                    </select>
                    </div>
                    <div className="form-group col-sm-12 pb-2">
                        <label >Mental:</label>
                        <select  onChange={(e) => handleInputChange(e, 'mental')} value={items.mental} className="form-control form-control-sm" id="mental" required>
                            <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>                    </select>
                    </div>
                    <div className="form-group col-sm-12 pb-2">
                        <label>Física:</label>
                        <select  onChange={(e) => handleInputChange(e, 'fisica')} value={items.fisica} className="form-control form-control-sm" id="fisica" required>
                            <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>                    </select>
                    </div>
                    <div className="form-group col-sm-12 pb-2">
                        <label>Sordoceguera:</label>
                        <select  onChange={(e) => handleInputChange(e, 'sordoceguera')} value={items.sordoceguera} className="form-control form-control-sm" id="sordoceguera" required>
                            <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>                    </select>
                    </div>
                    <div className="form-group col-sm-12 pb-2">
                        <label>Intelectual:</label>
                        <select  onChange={(e) => handleInputChange(e, 'intelectual')} value={items.intelectual} className="form-control form-control-sm" id="intelectual" required>
                            <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>                    </select>
                    </div>
                    <div className="form-group col-sm-12 pb-2">
                        <label>Visual:</label>
                        <select  onChange={(e) => handleInputChange(e, 'visual')} value={items.visual} className="form-control form-control-sm" id="visual" required>
                            <option value=""> SELECCIONE </option><option value="1"> NO </option><option value="2"> SI </option>                    </select>
                    </div>
                <hr/>
            </div>
            </div>
            </>  :''}
           
          </IonList>

          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm-6">
                <label className="form-label">Enfermedades catastroficas: ¿Ha tenido o tiene?</label>
                <select onChange={(e) => handleInputChange(e, 'enfermedades')} value={items.enfermedades} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="1"> ALGÚN TIPO DE CÁNCER </option><option value="7"> DIABETES </option><option value="8"> ENFERMEDAD NEUROLÓGICA </option><option value="2"> ENFERMEDAD RENAL CRÓNICA </option><option value="9"> ENFERMEDAD RESPIRATORIA CRÓNICA </option><option value="6"> NINGUNA </option><option value="5"> OTRA </option><option value="3"> PROBLEMAS DE HIPERTENSIÓN O INFARTO </option><option value="4"> VIH-SIDA </option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Actividad:</label>
                <select onChange={(e) => handleInputChange(e, 'actividad')} value={items.actividad} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="13"> ACCIONES DE MENDICIDAD </option>
                  <option value="10"> AGRICULTOR </option>
                  <option value="2"> AMA DE CASA </option>
                  {/* <option value="38"> ARTESANO </option>
                  <option value="32"> ARTISTA CALLEJERO  </option>
                  <option value="22"> ASEO EN CASAS DE FAMILIA </option>
                  <option value="34"> ATENCION AL CLIENTE </option>
                  <option value="39"> AYUDANTE DE CARGA Y DESCARGA </option>
                  <option value="28"> BISUTERIA </option>
                  <option value="15"> CARPINTERIA </option>
                  <option value="25"> COCINERO(A) - AUXILIAR </option>
                  <option value="36"> CONDUCTOR </option>
                  <option value="29"> CONFECCIONES  </option>
                  <option value="27"> CONSTRUCCION- ALBAÑIL-AYUDANTE </option>
                  <option value="30"> CUIDADOR CARROS - ALISTADOR </option>
                  <option value="24"> CUIDADOR(A) </option> */}
                  <option value="12"> EN BÚSQUEDA DE EMPLEO </option>
                  <option value="6"> ESTUDIA </option>
                  <option value="7"> ESTUDIA Y TRABAJA </option>
                  <option value="11"> JUBILADO </option>
                  {/* <option value="17"> LIMPIA VIDRIOS </option>
                  <option value="16"> MECANICA </option>
                  <option value="26"> MESERO(A) </option> */}
                  <option value="8"> NINGUNA </option>
                  {/* <option value="35"> OPERADOR LOGISTICO </option> */}
                  <option value="5"> PENSIONADO </option>
                  <option value="9"> PRIVADO DE LA LIBERTAD </option>
                  {/* <option value="33"> RECICLAJE </option> */}
                  <option value="4"> RENTISTA </option>
                  <option value="3"> SERVICIO MILITAR </option>
                  {/* <option value="23"> SERVICIOS DE BELLEZA -BARBERIA </option>
                  <option value="31"> SERVICIOS SEXUALES  </option> */}
                  <option value="14"> SIN DATO </option>
                  <option value="1"> TRABAJA </option>
                  {/* <option value="19"> VENTA DE COMIDAS RAPIDAS </option>
                  <option value="20"> VENTA DE DULCES </option>
                  <option value="21"> VENTA DE MERCANCIA  </option>
                  <option value="18"> VENTA DE VERDURAS Y FRUTAS </option>
                  <option value="37"> VOLANTERO </option>
                  <option value="40"> ZAPATERÍA </option> */}
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Ocupacion:</label>
                <select onChange={(e) => handleInputChange(e, 'ocupacion')} value={items.ocupacion} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="8"> ACTIVIDADES DE SOBREVIVENCIA </option><option value="7"> AMA DE CASA </option><option value="4"> DESEMPLEADO </option><option value="1"> EMPLEADO </option><option value="6"> ESTUDIANTE </option><option value="2"> INDEPENDIENTE </option><option value="3"> INFORMAL </option><option value="5"> NINGUNA </option><option value="9"> SIN DATO </option>                               </select>
              </div>
              <div className="col-sm">
                <label className="form-label">Sisbenizado:</label>
                <select onChange={(e) => handleInputChange(e, 'sisbenizado')} value={items.sisbenizado} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="2"> NO </option><option value="1"> SI </option><option value="3"> SIN DATO </option>

                </select>
              </div>

              <div className="col-sm-6">
                <label className="form-label">Campesino:</label>
                <select onChange={(e) => handleInputChange(e, 'campesino')} value={items.campesino} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="2"> NO </option><option value="1"> SI </option><option value="3"> SIN DATO </option>                                 </select>
              </div>
              
            </div>
          </IonList>

          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm">
                <label className="form-label">Condición de víctima / hecho victimizante:</label>
                <select  onChange={(e) => handleInputChange(e, 'victima')} value={items.victima} className="form-control form-control-sm" id="pregunta2_3" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option><option value="8"> ABANDONO O DESPOJO FORZADO </option><option value="10"> AMENAZA A LA VIDA, INTEGRIDAD Y SEGURIDAD PERSONAL </option><option value="9"> DAÑO EN BIENES MUEBLES O INMUEBLES (TERRORISMO) </option><option value="7"> DELITOS CONTRA LA INTEGRIDAD Y LIBERTAD SEXUAL </option><option value="1"> DESAPARICIÓN FORZADA </option><option value="4"> DESPLAZAMIENTO FORZADO </option><option value="15"> HOMICIDIO </option><option value="6"> LESIONES PERSONALES (PERMANENTES O TRANSITORIAS) </option><option value="11"> MÁS DE UN HECHO VICTIMIZANTE </option><option value="12"> NINGUNA </option><option value="16"> OTRO </option><option value="3"> RECLUTAMIENTO FORZADO Y UTILIZACIÓN </option><option value="2"> SECUESTRO </option><option value="13"> SIN DATO </option><option value="14"> TORTURA O TRATOS CRUELES, INHUMANOS O DEGRADANTES </option><option value="5"> VÍCTIMAS DE MINAS ANTIPERSONAL (MAP), MUNICIONES SIN EXPLOSIONAR (MUSE) Y ARTEFACTOS EXPLOSIVOS IMPROVISADOS (AEI) </option>
                </select>
              </div>
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
            <div className="col-sm">
                <label className="form-label">Habitanza en calle:</label>
                <select className="form-control form-control-sm" onChange={(e) => handleInputChange(e, 'habitanzacalle')} value={items.habitanzacalle} id="habitanzacalle" required>
                <option value=""> SELECCIONE </option><option value="1"> HABITANTE DE LA CALLE </option><option value="2"> HABITANTE EN LA CALLE </option><option value="3"> NINGUNA </option><option value="5"> RIESGO DE HABITAR LA CALLE </option><option value="4"> SIN DATO </option>                
                </select>              
                </div>

            </div>
          </IonList>



          <br />

        </div>

        <br />

        <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
          <div className="btn btn-primary" onClick={() => window.location.href = `/tabs/tab3/${params.ficha}`}>Siguiente</div>
        </div>
         </form> 

      </IonContent>
    </IonPage>
  );
};

export default Ciudadano;
