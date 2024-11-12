import React, { useEffect, useState } from "react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact, IonButton,
  IonBadge
} from '@ionic/react';
import { analytics, chatbox, clipboard, ellipse, heart, home, information, logoOctocat, navigate, newspaper, people, peopleCircle, person, square, text, time, triangle, warning } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import loadSQL from "../models/database";


const MenuLat: React.FC = () => {
  const location = useLocation();

  const ficha2 = location.pathname.split('/').pop(); 
  const [db, setDb] = useState<any>(null);
  console.log(ficha2);
  const [tableResults, setTableResults] = useState<Record<string, any[]>>({});
console.log(tableResults)
  useEffect(() => {
    loadSQL(setDb, fetchTables);
  }, []);

  useEffect(() => {
    fetchTables(); // Asegúrate de que `fetchTables` es invocado correctamente
  }, [db, ficha2]);

  const fetchTables = async () => {
    const tables = [
      "discapacidad_capitulo_0",
      "discapacidad_capitulo_1",
      "discapacidad_capitulo_2",
      "discapacidad_capitulo_3",
      "discapacidad_capitulo_4",
      "discapacidad_capitulo_5",
      "discapacidad_capitulo_6",
      "discapacidad_capitulo_7",
      "discapacidad_capitulo_8",
      "discapacidad_capitulo_9",
      "discapacidad_capitulo_10",
      "discapacidad_capitulo_11",
      "discapacidad_capitulo_12"
    ];
    const results: Record<string, any[]> = {};

    try {
      for (const table of tables) {
        const query = `SELECT * FROM ${table} WHERE  id_usuario = ${ficha2}`;
        const response = await db.exec(query);
        if (response && response[0] && response[0].values) {
          results[table] = response[0].values.map((row: any[]) => {
            return response[0].columns.reduce((obj: any, col: string, index: number) => {
              obj[col] = row[index];
              return obj;
            }, {});
          });
          setTableResults(results); 
        } else {
          results[table] = []; // Asigna un arreglo vacío si no hay datos
        }
      }
      //setTableResults(results); // Actualiza el estado una vez que todas las tablas han sido procesadas
    } catch (error) {
      console.error("Error al leer las tablas:", error);
    }
  };


    return(
<IonMenu contentId="main" type="overlay">
<IonHeader>
  <IonToolbar>
    <IonTitle>Numerales Realizados</IonTitle>
  </IonToolbar>
</IonHeader>
<IonContent>
  <IonList>
    <IonMenuToggle auto-hide="false">
      <IonItem button routerLink={`/tabs/ciudadano/${ficha2}`}>
        <IonIcon slot="start" icon={person} />
        <IonLabel>CIUDADANO</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab3/${ficha2}`}>
        <IonIcon slot="start" icon={navigate} />
        <IonLabel>LOCALIZACION</IonLabel>
      </IonItem>
     { tableResults['discapacidad_capitulo_0'] && tableResults['discapacidad_capitulo_0'].length > 0 && tableResults['discapacidad_capitulo_0'][0].estado === 1 ? 
      <IonItem button routerLink={`/tabs/tab18/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>0&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>INFORMACIÓN DILIGENCIAMIENTO</IonLabel>
      </IonItem>:''}
      { tableResults['discapacidad_capitulo_1'] && tableResults['discapacidad_capitulo_1'].length > 0 && tableResults['discapacidad_capitulo_1'][0].estado === 1 ? 
        <IonItem button routerLink={`/tabs/tab2/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>1&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>INFORMACIÓN PERSONAL</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_2'] && tableResults['discapacidad_capitulo_2'].length > 0 && tableResults['discapacidad_capitulo_2'][0].estado === 1 ? 

        <IonItem button routerLink={`/tabs/tab4/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>2&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>CARACTERIZACIÓN Y ORIGEN DE LA DISCAPACIDAD</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_3'] && tableResults['discapacidad_capitulo_3'].length > 0 && tableResults['discapacidad_capitulo_3'][0].estado === 1 ? 

      <IonItem button routerLink={`/tabs/tab5/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>3&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>ATENCIÓN EN SALUD</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_4'] && tableResults['discapacidad_capitulo_4'].length > 0 && tableResults['discapacidad_capitulo_4'][0].estado === 1 ? 

      <IonItem button routerLink={`/tabs/tab8/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>4&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>SALUD MENTAL</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_5'] && tableResults['discapacidad_capitulo_5'].length > 0 && tableResults['discapacidad_capitulo_5'][0].estado === 1 ? 

      <IonItem button routerLink={`/tabs/tab7/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>5&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>EDUCACIÓN</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_6'] && tableResults['discapacidad_capitulo_6'].length > 0 && tableResults['discapacidad_capitulo_6'][0].estado === 1 ? 

      <IonItem button routerLink={`/tabs/tab1/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>6&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>PARTICIPACIÓN EN ACTIVIDADES</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_7'] && tableResults['discapacidad_capitulo_7'].length > 0 && tableResults['discapacidad_capitulo_7'][0].estado === 1 ? 

      <IonItem button routerLink={`/tabs/tab6/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>7&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>OCUPACIÓN Y TRABAJO</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_8'] && tableResults['discapacidad_capitulo_8'].length > 0 && tableResults['discapacidad_capitulo_8'][0].estado === 1 ? 
      <IonItem button routerLink={`/tabs/tab9/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>8&nbsp;&nbsp;&nbsp;</IonBadge>
      <IonLabel>ASPECTOS SOCIO-FAMILIAR</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_9'] && tableResults['discapacidad_capitulo_9'].length > 0 && tableResults['discapacidad_capitulo_9'][0].estado === 1 ? 

      <IonItem button routerLink={`/tabs/tab17/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>9&nbsp;&nbsp;&nbsp;</IonBadge>
      <IonLabel>DINÁMICA FAMILIAR</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_10'] && tableResults['discapacidad_capitulo_10'].length > 0 && tableResults['discapacidad_capitulo_10'][0].estado === 1 ? 

      <IonItem button routerLink={`/tabs/tab10/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>10&nbsp;</IonBadge>
      <IonLabel>INGRESOS Y EGRESOS MENSUALES</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_11'] && tableResults['discapacidad_capitulo_11'].length > 0 && tableResults['discapacidad_capitulo_11'][0].estado === 1 ? 

      <IonItem button routerLink={`/tabs/tab11/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>11&nbsp;</IonBadge>
      <IonLabel>TIPO Y CARACTERIZACIÓN DE LA VIVIENDA</IonLabel>
      </IonItem>
      :''}
            { tableResults['discapacidad_capitulo_12'] && tableResults['discapacidad_capitulo_12'].length > 0 && tableResults['discapacidad_capitulo_12'][0].estado == 2 ? 
      <IonItem button routerLink={`/tabs/tab16/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>12&nbsp;</IonBadge>
      <IonLabel>CONCEPTO DEL PROFESIONAL QUE REALIZÓ LA VISITA</IonLabel>
      </IonItem>
      :''}
      {/* <IonItem button routerLink={`/tabs/tab10/${ficha2}`}>
        <IonIcon slot="start" icon={clipboard} />
        <IonLabel>10 - DATOS GENERALES (REMISIONES)</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab11/${ficha2}`}>
        <IonIcon slot="start" icon={peopleCircle} />
        <IonLabel>11 - RED DE APOYO</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab12/${ficha2}`}>
        <IonIcon slot="start" icon={heart} />
        <IonLabel>12 - AYUDAS HUMANITARIAS ENTREGADAS</IonLabel>
      </IonItem> 
     <IonItem button routerLink={`/tabs/tab13/${ficha2}`}>
        <IonIcon slot="start" icon={logoOctocat} />
        <IonLabel>7 - MASCOTAS</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab11/${ficha2}`}>
        <IonIcon slot="start" icon={peopleCircle} />
        <IonLabel>8 - RED DE APOYO</IonLabel>
      </IonItem>
       <IonItem button routerLink={`/tabs/tab17/${ficha2}`}>
        <IonIcon slot="start" icon={home} />
        <IonLabel>10 - ASPECTOS SOCIOECONÓMICOS DEL GRUPO FAMILIAR</IonLabel>
      </IonItem>  
      <IonItem button routerLink={`/tabs/tab14/${ficha2}`}>
        <IonIcon slot="start" icon={home} />
        <IonLabel>15 - UBICACION DE LA FAMILIA POSTERIOR A LA ATENCION SOCIAL</IonLabel>
      </IonItem> 
      <IonItem button routerLink={`/tabs/tab15/${ficha2}`}>
        <IonIcon slot="start" icon={text} />
        <IonLabel>11 - OBSERVACIONES</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab18/${ficha2}`}>
        <IonIcon slot="start" icon={information} />
        <IonLabel>12 -PERSONAS NO HACEN PARTE DEL HOGAR</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab16/${ficha2}`}>
        <IonIcon slot="start" icon={information} />
        <IonLabel>13 - INFORMACION DE QUIEN RESPONDE LA ENCUENTA</IonLabel>
      </IonItem> */}

    </IonMenuToggle>
  </IonList>
</IonContent>
</IonMenu>
);
};
export default MenuLat;