import React from "react";
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
import { Redirect, Route,useParams } from 'react-router-dom';
import { analytics, chatbox, clipboard, ellipse, heart, home, information, logoOctocat, navigate, newspaper, people, peopleCircle, person, square, text, time, triangle, warning } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

const MenuLat: React.FC = () => {
  const location = useLocation();
  const ficha2 = location.pathname.split('/').pop(); 
  console.log(ficha2)
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
      <IonItem button routerLink={`/tabs/tab18/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>0&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>INFORMACIÓN DILIGENCIAMIENTO</IonLabel>
      </IonItem>
        <IonItem button routerLink={`/tabs/tab2/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>1&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>INFORMACIÓN PERSONAL</IonLabel>
      </IonItem>
        <IonItem button routerLink={`/tabs/tab4/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>2&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>CARACTERIZACIÓN Y ORIGEN DE LA DISCAPACIDAD</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab5/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>3&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>ATENCIÓN EN SALUD</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab8/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>4&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>SALUD MENTAL</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab7/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>5&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>EDUCACIÓN</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab1/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>6&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>PARTICIPACIÓN EN ACTIVIDADES</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab6/${ficha2}`}>
        <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>7&nbsp;&nbsp;&nbsp;</IonBadge>
        <IonLabel>OCUPACIÓN Y TRABAJO</IonLabel>
      </IonItem>
      {/* <IonItem button routerLink={`/tabs/tab6/${ficha2}`}>
        <IonIcon slot="start" icon={newspaper} />
        <IonLabel>5 - SERVICIOS PUBLICOS</IonLabel>
      </IonItem>*/}
      <IonItem button routerLink={`/tabs/tab9/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>8&nbsp;&nbsp;&nbsp;</IonBadge>
      <IonLabel>ASPECTOS SOCIO-FAMILIAR</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab17/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>9&nbsp;&nbsp;&nbsp;</IonBadge>
      <IonLabel>DINÁMICA FAMILIAR</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab10/${ficha2}`}>
      <IonBadge slot="start" color="ligth" style={{ fontSize: '22px', color:'gray'}}>10&nbsp;</IonBadge>
      <IonLabel>INGRESOS Y EGRESOS MENSUALES</IonLabel>
      </IonItem>
      {/* <IonItem button routerLink={`/tabs/tab10/${ficha2}`}>
        <IonIcon slot="start" icon={clipboard} />
        <IonLabel>10 - DATOS GENERALES (REMISIONES)</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab11/${ficha2}`}>
        <IonIcon slot="start" icon={peopleCircle} />
        <IonLabel>11 - RED DE APOYO</IonLabel>
      </IonItem><IonItem button routerLink={`/tabs/tab12/${ficha2}`}>
        <IonIcon slot="start" icon={heart} />
        <IonLabel>12 - AYUDAS HUMANITARIAS ENTREGADAS</IonLabel>
      </IonItem> */}
      <IonItem button routerLink={`/tabs/tab13/${ficha2}`}>
        <IonIcon slot="start" icon={logoOctocat} />
        <IonLabel>7 - MASCOTAS</IonLabel>
      </IonItem>
      <IonItem button routerLink={`/tabs/tab11/${ficha2}`}>
        <IonIcon slot="start" icon={peopleCircle} />
        <IonLabel>8 - RED DE APOYO</IonLabel>
      </IonItem>
      {/* <IonItem button routerLink={`/tabs/tab17/${ficha2}`}>
        <IonIcon slot="start" icon={home} />
        <IonLabel>10 - ASPECTOS SOCIOECONÓMICOS DEL GRUPO FAMILIAR</IonLabel>
      </IonItem>  */}
      {/* <IonItem button routerLink={`/tabs/tab14/${ficha2}`}>
        <IonIcon slot="start" icon={home} />
        <IonLabel>15 - UBICACION DE LA FAMILIA POSTERIOR A LA ATENCION SOCIAL</IonLabel>
      </IonItem> */}
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
      </IonItem>

    </IonMenuToggle>
  </IonList>
</IonContent>
</IonMenu>
);
};
export default MenuLat;