import './Tab4.css';
import React, { useEffect, useState, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonButton } from '@ionic/react';
import { useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TouchPad from '../components/TouchPad';
import loadSQL from '../models/database';

interface Autorizacion {
  id_usuario: number;
  conclusiones_y_observaciones: string;
  necesidades_alimentacion_vivienda_satisfechas: number | null;
  presenta_discapacidad: number | null;
  requiere_ser_analizada: number | null;
  requiere_activar_rutas: number | null;
  se_orienta_a: string;
  se_remite_a: string;
  firma_persona_discapacidad: string;
  documento_persona_discapacidad: string;
  firma_cuidador: string;
  documento_ciudador: string;
  parentesco_cuidador: string;
  nombre_completo_profesional: string;
  profesion_profesional: string;
  numero_tarjeta_profesional: string;
  proyecto: string;
  firma_profesional: string;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
  es_prioritario: number | null;
  firma: string;
  dondeadjunto: string;
  id_profesional: string | null;
  draw_dataUrl: Blob | null;
  draw_dataUrl2: Blob | null;
  draw_dataUrl3: Blob | null;
  nameFirma: string | null;
  nameFirma2: string | null;
  nameFirma3: string | null;
}


const Tab16: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(location.search);
  const idayuda = queryParams.get('idayuda');
  const [db, setDb] = useState<any>(null);
  const [autorizacion, setAutorizacion] = useState<Autorizacion | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    loadSQL(setDb, fetchAutorizacion);
    //fetchIntegrantes(); 
  }, []);

  useEffect(() => {
   // fetchIntegrantes(); 
  }, [params.ficha,db]);

  const fetchAutorizacion = async (database = db) => {
    if (database) {
      const res = await database.exec(`SELECT * FROM discapacidad_capitulo_12 WHERE id_usuario=${params.ficha}`);
      if (res[0]?.values && res[0]?.columns) {
        const transformedData = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as Autorizacion);
        });
        setAutorizacion(transformedData[0] || null);
        setButtonDisabled(transformedData[0]?.id_usuario ? false : true);
        if (transformedData[0]?.draw_dataUrl) {
          setPreview(transformedData[0].draw_dataUrl3);
        }
      } else {
        setAutorizacion({
          id_usuario: parseInt(params.ficha),
          conclusiones_y_observaciones: '',
          necesidades_alimentacion_vivienda_satisfechas: null,
          presenta_discapacidad: null,
          requiere_ser_analizada: null,
          requiere_activar_rutas: null,
          se_orienta_a: '',
          se_remite_a: '',
          firma_persona_discapacidad: '',
          documento_persona_discapacidad: '',
          firma_cuidador: '',
          documento_ciudador: '',
          parentesco_cuidador: '',
          nombre_completo_profesional: '',
          profesion_profesional: '',
          numero_tarjeta_profesional: '',
          proyecto: '',
          firma_profesional: '',
          fecharegistro: getCurrentDateTime(),
          usuario: parseInt(localStorage.getItem('cedula') || '0', 10),
          estado: 2,
          tabla: 'discapacidad_capitulo_12',
          es_prioritario: null,
          firma: '',
          dondeadjunto: '',
          id_profesional: '',
          draw_dataUrl: null,
          draw_dataUrl2: null,
          draw_dataUrl3: null,
          nameFirma: `discapacidad_capitulo_12_${params.ficha}`,
          nameFirma2: null,
          nameFirma3: null,
        });
      }
    }
  };
  

  // const fetchIntegrantes = async (database = db) => {
  //   if (database) {
  //     const res = await database.exec(`SELECT idintegrante, nombre1, nombre2, apellido1, apellido2 FROM infraccion_integrante_familiar WHERE idfiu=${params.ficha}`);
  //     if (res[0]?.values && res[0]?.columns) {
  //       const transformedIntegrantes: Integrante[] = res[0].values.map((row: any[]) => {
  //         return res[0].columns.reduce((obj, col, index) => {
  //           obj[col] = row[index];
  //           return obj;
  //         }, {} as Integrante);
  //       });
  //       setIntegrantes(transformedIntegrantes);
  //     }
  //   }
  // };
  

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Autorizacion) => {
    const { value } = event.target;
    setAutorizacion((prev) => {
      if (!prev) return prev;
  
      const newState = { ...prev, [field]: value };
  
      // if (field === 'diligenciadopor') {
      //   newState.entidad = value === '24' ? '' : 'COMISION SOCIAL';
      // } 
      // if (field === 'autorizofirma') {
      //   newState.firmatitular = value === '2' ? '' : '';
      //   newState.draw_dataUrl= value === '2' ? '' : '';
      // }
  
      return newState;
    });
  };

  function dataURLToBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type.startsWith("image")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setPreview(base64data);
        setAutorizacion((prev) => prev ? { ...prev, draw_dataUrl3: base64data, nameFirma3: file.name } : prev);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };
  

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview('');
    }
  }, [image]);

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

  const validarCampos = () => {
    const camposObligatorios = ['se_orienta_a', 'se_remite_a', 'id_profesional'];
  
   
    // if (autorizacion?.autorizofirma === '2') {
    //   camposObligatorios.push('firmatitular');
    // }
  
    for (let campo of camposObligatorios) {
      if (!autorizacion[campo]) {
        return false;
      }
    }
    return true;
  };
  

  const enviar = async (database = db, event: React.MouseEvent<HTMLButtonElement>) => {
    if (!validarCampos()) {
      return;
    }
    event.preventDefault();
  
    if (!autorizacion) return;
    try {
      await db.exec(`INSERT OR REPLACE INTO discapacidad_capitulo_12 
        (id_usuario, conclusiones_y_observaciones, necesidades_alimentacion_vivienda_satisfechas, presenta_discapacidad, requiere_ser_analizada, requiere_activar_rutas,
         se_orienta_a, se_remite_a, firma_persona_discapacidad, documento_persona_discapacidad, firma_cuidador, documento_ciudador, parentesco_cuidador, 
         nombre_completo_profesional, profesion_profesional, numero_tarjeta_profesional, proyecto, firma_profesional, fecharegistro, usuario, estado, 
         tabla, es_prioritario, firma, dondeadjunto, id_profesional, draw_dataUrl, draw_dataUrl2, draw_dataUrl3, nameFirma, nameFirma2, nameFirma3) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          autorizacion.id_usuario, autorizacion.conclusiones_y_observaciones, autorizacion.necesidades_alimentacion_vivienda_satisfechas,
          autorizacion.presenta_discapacidad, autorizacion.requiere_ser_analizada, autorizacion.requiere_activar_rutas,
          autorizacion.se_orienta_a, autorizacion.se_remite_a, autorizacion.firma_persona_discapacidad, autorizacion.documento_persona_discapacidad,
          autorizacion.firma_cuidador, autorizacion.documento_ciudador, autorizacion.parentesco_cuidador, autorizacion.nombre_completo_profesional,
          autorizacion.profesion_profesional, autorizacion.numero_tarjeta_profesional, autorizacion.proyecto, autorizacion.firma_profesional,
          autorizacion.fecharegistro, autorizacion.usuario, autorizacion.estado, autorizacion.tabla, autorizacion.es_prioritario,
          autorizacion.firma, autorizacion.dondeadjunto, autorizacion.id_profesional, autorizacion.draw_dataUrl, autorizacion.draw_dataUrl2,
          autorizacion.draw_dataUrl3, autorizacion.nameFirma, autorizacion.nameFirma2, autorizacion.nameFirma3,
        ]);
  
      saveDatabase();
      fetchAutorizacion(); // Actualizar los datos después de guardar
    } catch (err) {
      console.error('Error al guardar los datos:', err);
    }
  
    try {
      await db.exec(`UPDATE discapacidad_capitulo_12 
        SET estado = 2 
        WHERE id_usuario = ?;`,
        [
          autorizacion.id_usuario
        ]);
  
      saveDatabase();
      alert('Estado actualizado con éxito');
      fetchAutorizacion(); // Actualizar los datos después de guardar
    } catch (err) {
      console.error('Error al actualizar el estado:', err);
    }
  };
  
  const handleSave = (url: Blob) => {
    setAutorizacion((prev) => prev ? { ...prev, draw_dataUrl: url } : prev);
  };

  const handleSave2 = (url: Blob) => {
    setAutorizacion((prev) => prev ? { ...prev, draw_dataUrl2: url } : prev);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">CAPITULO XII. CONCEPTO DEL PROFESIONAL QUE REALIZÓ LA VISITA</IonTitle>
          <IonTitle slot="end">FICHA: <label style={{ color: '#17a2b8' }}>{params.ficha}</label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
 <form>
        {/* <div className="social-card">
          <span className="label">Ficha: {params.ficha}</span>
          <span className="value"></span>
        </div> */}

 
        <div className='shadow p-3 bg-white rounded'>
          <IonList> 
            <div className="row g-3 pt-2 was-validated ">
          <div className="row">
            <div className="form-group col-sm pb-3">
              <label htmlFor="conclusiones_y_observaciones">Conclusiones y observaciones:</label>
              <textarea
                className="form-control"
                id="conclusiones_y_observaciones"
                rows="5"
                value={autorizacion?.conclusiones_y_observaciones || ''}
                onChange={(e) => handleInputChange(e, 'conclusiones_y_observaciones')}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm pb-3">
              <label htmlFor="necesidades_alimentacion_vivienda_satisfechas">
                Según lo evidenciado en la visita, ¿la persona y su familia tienen sus necesidades de alimentacion y vivienda satisfechas?:
              </label>
              <select
                className="form-control form-control-sm"
                id="necesidades_alimentacion_vivienda_satisfechas"
                value={autorizacion?.necesidades_alimentacion_vivienda_satisfechas || ''}
                onChange={(e) => handleInputChange(e, 'necesidades_alimentacion_vivienda_satisfechas')}
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="form-group col-sm pb-3">
              <label htmlFor="presenta_discapacidad">
                ¿La persona visitada presenta discapacidad acorde a los criterios establecidos en la CIF y en la Convención internacional sobre los derechos de las personas con discapacidad?
              </label>
              <select
                className="form-control form-control-sm"
                id="presenta_discapacidad"
                value={autorizacion?.presenta_discapacidad || ''}
                onChange={(e) => handleInputChange(e, 'presenta_discapacidad')}
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm pb-3">
              <label htmlFor="requiere_ser_analizada">¿Esta visita requiere ser analizada?</label>
              <select
                className="form-control form-control-sm"
                id="requiere_ser_analizada"
                value={autorizacion?.requiere_ser_analizada || ''}
                onChange={(e) => handleInputChange(e, 'requiere_ser_analizada')}
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="form-group col-sm pb-3">
              <label htmlFor="requiere_activar_rutas">¿Se requiere activación de rutas de acceso a derechos?</label>
              <select
                className="form-control form-control-sm"
                id="requiere_activar_rutas"
                value={autorizacion?.requiere_activar_rutas || ''}
                onChange={(e) => handleInputChange(e, 'requiere_activar_rutas')}
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm pb-3">
              <label htmlFor="es_prioritario">¿Es prioritario?</label>
              <select
                className="form-control form-control-sm"
                id="es_prioritario"
                value={autorizacion?.es_prioritario || ''}
                onChange={(e) => handleInputChange(e, 'es_prioritario')}
                required
              >
                <option value="1">NO</option>
                <option value="2">SÍ</option>
              </select>
            </div>
            <div className="form-group col-sm pb-3"></div>
          </div>

          <div className="row">
            <div className="form-group col-sm pb-3">
              <label htmlFor="se_orienta_a">Se orienta a:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="se_orienta_a"
                value={autorizacion?.se_orienta_a || ''}
                onChange={(e) => handleInputChange(e, 'se_orienta_a')}
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>
            <div className="form-group col-sm pb-3">
              <label htmlFor="se_remite_a">Se remite a:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="se_remite_a"
                value={autorizacion?.se_remite_a || ''}
                onChange={(e) => handleInputChange(e, 'se_remite_a')}
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>
          </div>  
          </div>
          </IonList>
        
          <IonList>
            <div className="row g-3 was-validated ">
              <div className="col-sm-6">
                <label className="form-label">Profesional que realiza la visita:</label>
                <select value={autorizacion?.id_profesional || ''} onChange={(e) => handleInputChange(e, 'id_profesional')} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                  {/* <option value=""> SELECCIONE </option>
                  {integrantes.map((integrante) => (
                    <option key={integrante.idintegrante} value={integrante.idintegrante}>
                      {`${integrante.nombre1} ${integrante.nombre2} ${integrante.apellido1} ${integrante.apellido2}`}
                    </option>
                  ))} */}
                  <option value=""> SELECCIONE </option><option value="136"> ANDREA MUÑOZ FIGUEROA </option><option value="137"> CAROLINA PADIERNA AVENDAÑO </option><option value="134"> CLARITA INES MANTILLA SILVA </option><option value="146"> CLAUDIA PATRICIA SEPULVEDA ARDILA </option><option value="145"> CRISTIAN JULIAN SANCHEZ MUÑOZ </option><option value="126"> DIANA MARCELA CAÑAS TORRES </option><option value="138"> JOSE DANIEL PALACIO BETANCUR </option><option value="144"> JOSE LUIS SALDARRIAGA ORTIZ </option><option value="148"> JUAN CAMILO VARGAS CARDONA </option><option value="132"> JULIANA MARIA FRANCO MORENO </option><option value="131"> LEIDY MARCELA ECHEVERRI ORREGO </option><option value="143"> LORENA  SALAZAR MATEUS </option><option value="139"> LUZ AIDE PELAEZ RESTREPO </option><option value="140"> MANUELA POSADA MEJÍA </option><option value="135"> MELISSA MOSQUERA CASTAÑO </option><option value="147"> MÓNICA LILIANA TREJO ORTEGA </option><option value="125"> NATALIA CADAVID DIAZ </option><option value="130"> NATALIA DIEZ ACOSTA </option><option value="133"> SANDRA LUCIA IBARRA GOYES </option><option value="128"> SARA CAROLINA COMAS CASTAÑEDA </option><option value="129"> YENNY DAZA PAMPLONA </option> 
                </select>
              </div>

              <div className="form-group col-sm pb-3">
                <label>Adjuntar archivo:</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div onClick={() => fileInputRef.current?.click()} className="btn btn-info btn-sm text-light">
                      Cargar Imagen
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <div className="btn btn-info btn-sm text-light" type="button" onClick={() => (preview ? setShowModal(true) : alert('Cargar un archivo'))}>
                      Ver
                    </div>
                  </div>
                  <input type="text" id="nameFile" className="form-control form-control-sm" placeholder="" value={autorizacion?.nameFirma3 || ''} disabled />
                </div>
              </div>
            </div>
          </IonList>
          <IonList>
            <div className="row g-3 was-validated ">
              {/* <div className="col-sm-4">
                <label className="form-label">Quien diligencia la ficha:</label>
                <select value={autorizacion?.diligenciadopor || ''} onChange={(e) => handleInputChange(e, 'diligenciadopor')} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                <option value=""> SELECCIONE </option><option value="76"> ANA BEATRIZ FIGUEROA TORRES </option><option value="24"> APOYO  SOCIAL </option><option value="34"> APOYO SOCIAL DOS </option><option value="8"> BEATRIZ EUGENIA MONCADA GONZALEZ </option><option value="6"> DANIEL  TORO VASQUEZ </option><option value="29"> DANIELA SANDOVAL GARZON </option><option value="7"> DEISY YOHANA GIRALDO ZULUAGA </option><option value="5"> ESTER LUCIA ROJAS ARENAS </option><option value="13"> JOHANA ANDREA CIFUENTES LONGAS </option><option value="21"> LINA MARCELA PEREZ ARAQUE </option><option value="87"> MARITZA  OROZCO MARTINEZ </option><option value="4"> MARYORY LINDEY ABELLO LONDOÑO </option><option value="32"> PAULA ANDREA MIRA MENESES </option><option value="33"> SANDRA JULIANA HERRERA HENAO </option><option value="88"> VIVIANA YANET CALLEJAS DUQUE </option><option value="22"> YEIDY TATIANA HIGUITA </option><option value="9"> YULIET ANDREA LOPEZ RODRIGUEZ </option>
                </select>
              </div> */}
              {/* <div className="col-sm-4">
                <label className="form-label" >Nombre apoyo social:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'apoyosocial')} value={autorizacion?.apoyosocial || ''} placeholder="" className="form-control form-control-sm" required />
              </div> */}
              {/* <div className="col-sm-4">
                <label className="form-label" >Entidad:</label>
                <input type="text" onChange={(e) => handleInputChange(e, 'entidad')} value={autorizacion?.entidad || ''} placeholder="" className="form-control form-control-sm" required />
              </div> */}
              {/* <div className="col-sm">
                <label className="form-label">Requiere seguimiento:</label>
                <select value={autorizacion?.requerieseguimiento || ''} onChange={(e) => handleInputChange(e, 'requerieseguimiento')} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="1"> NO </option>
                  <option value="2"> SI </option>
                </select>
              </div> */}
             {/* {(autorizacion?.requerieseguimiento == '2' )?
              <div className="col">
                <label className="form-label" >Fecha probable:</label>
                <input type="date" onChange={(e) => handleInputChange(e, 'fechaprobable')} value={autorizacion?.fechaprobable || ''} placeholder="" className="form-control form-control-sm" required />
                <small className="form-text text-muted">La fecha para el primer seguimiento no puede ser superior a un mes.</small>
              </div> :''} */}
            </div>
          </IonList>
        </div>
        <div className='shadow p-3 mb-5 bg-white rounded'>
          {/* <IonList>
            <div className="social-card2">
              <span className="label2">AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES:</span>
              <span className="value2">
              Los datos que contiene el presente formato podrán ser tratados de acuerdo con la Política de Tratamiento de Datos Personales en el Distrito Especial de Ciencia, Tecnología e Innovación de Medellín, que se puede consultar en www.medellin.gov.co, dando cumplimiento a la ley 1583 de 2012, el Decreto Reglamentario 1377 de 2013 y, el Decreto 1096 de 2013, mediante el cual se adopta la política para el tratamiento de datos personales en el Distrito de Medellín y las demás normas concordantes                <br /><br />
                Con la firma de este documento se garantiza que la información consignada en la atención es veraz y corresponde a la brindada por mí.
              </span>
            </div>
            <br />
            <div className="row g-3 was-validated ">
              <div className="col-sm-6">
                <label className="form-label">Autorizo el tratamiento de datos:</label>
                <select value={autorizacion?.autorizofirma || ''} onChange={(e) => handleInputChange(e, 'autorizofirma')} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="1"> NO </option>
                  <option value="2"> SI </option>
                </select>
              </div>
              {(autorizacion?.autorizofirma == '2' )?
              <div className="col-sm-6">
                <label className="form-label">Firma el representante del hogar:</label>
                <select value={autorizacion?.firmatitular || ''} onChange={(e) => handleInputChange(e, 'firmatitular')} className="form-control form-control-sm" aria-describedby="validationServer04Feedback" required>
                  <option value=""> SELECCIONE </option>
                  <option value="1"> NO </option>
                  <option value="2"> SI </option>
                </select>
              </div>:''}
            </div>
          </IonList> */}
        </div>

        <div className='shadow p-3 mb-5 bg-white rounded'>
          <div className="col-sm">
            <div className="alert alert-info" role="alert">
              <strong>FIRMA PERSONA CON DISCAPACIDAD: </strong> 
              En el siguiente cuadro realiza la firma y cuando este firmado oprime el botón
              <strong> Cargar Firma</strong>
            </div>
          </div>
          <div className="social-card2">
              <span className="value2">
              Los datos que contiene el presente formato podrán ser tratados de acuerdo con la Política de Tratamiento de Datos Personales en el Distrito Especial de Ciencia, Tecnología e Innovación de Medellín, que se puede consultar en www.medellin.gov.co, dando cumplimiento a la ley 1583 de 2012, el Decreto Reglamentario 1377 de 2013 y, el Decreto 1096 de 2013, mediante el cual se adopta la política para el tratamiento de datos personales en el Distrito de Medellín y las demás normas concordantes                <br /><br />
                Con la firma de este documento se garantiza que la información consignada en la atención es veraz y corresponde a la brindada por mí.
              </span>
            </div>
          <div className=' text-center pb-4 pt-4'>
          <img src={autorizacion?.draw_dataUrl}  alt="" />
          </div>

          <TouchPad onSave={handleSave} />
        </div>


        <div className='shadow p-3 mb-5 bg-white rounded'>
          <div className="col-sm">
            <div className="alert alert-info" role="alert">
              <strong>FIRMA REPRESENTANTE LEGAL / PERSONA CUIDADORA / FAMILIAR </strong> 
              En el siguiente cuadro realiza la firma y cuando este firmado oprime el botón
              <strong> Cargar Firma</strong>
            </div>
          </div>
          <div className="social-card2">
              <span className="value2">
              En el siguiente cuadro realiza la firma y cuando este firmado oprime el botón Cargar Firma
              </span>
            </div>
          <div className=' text-center pb-4 pt-4'>
          <img src={autorizacion?.draw_dataUrl2}  alt="" />
          </div>

          <TouchPad onSave={handleSave2} />
        </div>

        {/* <div>
          <IonButton color="success" onClick={enviar}>Guardar</IonButton>
          <IonButton routerLink={'/cobertura'}>Siguiente</IonButton>
        </div> */}
         <div><button className='btn btn-success' type="submit" onClick={(e)=>(enviar(db,e))}>Guardar</button>&nbsp;
       <div className={`btn btn-primary ${buttonDisabled ? 'disabled' : ''}`} onClick={() => { if (!buttonDisabled) {  window.location.href = `/cobertura`;} }}> Siguiente</div> 
       </div>
       </form>
        {preview && (
          <>
            <div className={`modal ${showModal ? "d-block" : "d-none"} modalnew modal-backdropnew`} tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document"><br /><br /><br />
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <img src={preview} alt="Preview" style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab16;