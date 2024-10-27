
import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

async function getFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('myDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('sqliteStore')) {
        db.createObjectStore('sqliteStore');
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Verificar si la tienda de objetos (tabla) existe
      if (!db.objectStoreNames.contains('sqliteStore')) {
        console.log('Object store "sqliteStore" does not exist');
        resolve(null);
        return;
      }

      const transaction = db.transaction(['sqliteStore'], 'readonly');
      const store = transaction.objectStore('sqliteStore');
      const getRequest = store.get('sqliteDb');

      getRequest.onsuccess = (event) => {
        const data = event.target.result;
        if (data) {
          console.log('Data retrieved from IndexedDB:', data);
          resolve(data);
        } else {
          console.log('No data found in IndexedDB');
          resolve(null);
        }
      };

      getRequest.onerror = (event) => {
        console.error('Error retrieving data from IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    };

    request.onerror = (event) => {
      console.error('Failed to open IndexedDB:', event.target.error);
      reject(event.target.error);
    };
  });
}

// Usar la función de recuperación y almacenar el resultado en una variable




const loadSQL = async (setDb, fetchUsers) => {

  try {
    const config = {
      locateFile: (file: string) => `/assets/${file}`,
    };
    const SQL = await initSqlJs(config);

    let database;
    //const savedDb = localStorage.getItem('sqliteDb');

    const savedDb = await getFromIndexedDB();
    if (savedDb) {
      const uint8Array = new Uint8Array(savedDb);
      database = new SQL.Database(uint8Array);
    } else {
      database = new SQL.Database();
        database.run(`
        CREATE TABLE IF NOT EXISTS t1_comision (
        id_usuario INTEGER PRIMARY KEY ,
        cedula TEXT NOT NULL,
        contrasena TEXT NOT NULL,
        estado TEXT NOT NULL
      );
        `);
     
        database.run(`CREATE TABLE IF NOT EXISTS inclusion_ciudadano (
          id_usuario INTEGER PRIMARY KEY NOT NULL,
          yearpostulacion INTEGER NOT NULL,
          nacionalidad INTEGER DEFAULT NULL,
          tipodedocumento INTEGER DEFAULT NULL,
          numerodedocumento TEXT,
          nombre1 TEXT,
          nombre2 TEXT,
          apellido1 TEXT,
          apellido2 TEXT,
          fechadenacimiento DATE DEFAULT NULL,
          sexo INTEGER DEFAULT NULL,
          orientacionsexual INTEGER DEFAULT NULL,
          identidaddegenero INTEGER DEFAULT NULL,
          etnia INTEGER DEFAULT NULL,
          estadocivil INTEGER DEFAULT NULL,
          gestantelactante VARCHAR(45) DEFAULT NULL,
          escolaridad INTEGER DEFAULT NULL,
          parentesco INTEGER DEFAULT NULL,
          discapacidad INTEGER DEFAULT NULL,
          regimendesalud INTEGER DEFAULT NULL,
          enfermedades INTEGER DEFAULT NULL,
          actividad INTEGER DEFAULT NULL,
          ocupacion INTEGER DEFAULT NULL,
          campesino INTEGER DEFAULT NULL,
          victima INTEGER DEFAULT NULL,
          sisbenizado INTEGER DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario VARCHAR(45) DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          auditiva VARCHAR(45) DEFAULT NULL,
          mental VARCHAR(45) DEFAULT NULL,
          fisica VARCHAR(45) DEFAULT NULL,
          sordoceguera VARCHAR(45) DEFAULT NULL,
          visual VARCHAR(45) DEFAULT NULL,
          intelectual VARCHAR(45) DEFAULT NULL,
          habitanzacalle VARCHAR(45) DEFAULT NULL,
          correoelectronico TEXT,
          telcontactouno VARCHAR(45) DEFAULT NULL,
          telcontactodos VARCHAR(45) DEFAULT NULL,
          fechadenacimiento_verificada INTEGER DEFAULT NULL
        );`);


        database.run(`CREATE TABLE IF NOT EXISTS inclusion_ubicacion (
          id_usuario INT NOT NULL,
          yearpostulacion INT NOT NULL,
          direccion TEXT DEFAULT NULL,
          comuna INT DEFAULT NULL,
          barrio INT DEFAULT NULL,
          ruralurbano INT DEFAULT NULL,
          sector TEXT DEFAULT NULL,
          estrato INT DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario VARCHAR(45) DEFAULT NULL,
          estado INT DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          dirCampo1 VARCHAR(45) DEFAULT NULL,
          dirCampo2 VARCHAR(45) DEFAULT NULL,
          dirCampo3 VARCHAR(100) DEFAULT NULL,
          dirCampo4 VARCHAR(10) DEFAULT NULL,
          dirCampo5 VARCHAR(45) DEFAULT NULL,
          dirCampo6 VARCHAR(100) DEFAULT NULL,
          dirCampo7 VARCHAR(10) DEFAULT NULL,
          dirCampo8 VARCHAR(45) DEFAULT NULL,
          dirCampo9 TEXT DEFAULT NULL,
          longitud VARCHAR(100) DEFAULT NULL,
          latitud VARCHAR(100) DEFAULT NULL,
          tenenciadelavivienda VARCHAR(45) DEFAULT NULL,
          PRIMARY KEY (id_usuario, yearpostulacion)
        );`);


        database.run(`
          CREATE TABLE IF NOT EXISTS discapacidad_capitulo_0 (
            id_usuario INTEGER PRIMARY KEY NOT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla TEXT DEFAULT NULL,
            año_diligenciamiento INTEGER DEFAULT NULL,
            mes_diligenciamiento INTEGER DEFAULT NULL,
            dia_diligenciamiento INTEGER DEFAULT NULL,
            fechadiligencia DATE DEFAULT NULL,
            persona_brinda_informacion TEXT DEFAULT NULL,
            nombre_persona_brinda_informacion TEXT DEFAULT NULL,
            relacion_persona_discapacidad TEXT DEFAULT NULL,
            modalidad_atencion TEXT DEFAULT NULL,
            origen_visita TEXT DEFAULT NULL,
            otro_origen_visita TEXT DEFAULT NULL,
            origen_visita_cual TEXT DEFAULT NULL,
            proyecto TEXT DEFAULT NULL
          );
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_1 (
          id_usuario INTEGER PRIMARY KEY NOT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          cuantas_personas_viven_hogar INTEGER DEFAULT NULL,
          cuantas_personas_viven_hogar_discapacidad INTEGER DEFAULT NULL,
          tiene_personas_a_cargo INTEGER DEFAULT NULL,
          numero_personas_a_cargo INTEGER DEFAULT NULL,
          recibe_servicio_icbf INTEGER DEFAULT NULL,
          beneficiario_programa INTEGER DEFAULT NULL,
          beneficiario_programa_otro TEXT DEFAULT NULL,
          numero_personas_a_cargo_mayor60 INTEGER DEFAULT NULL,
          numero_personas_a_cargo_menor12 INTEGER DEFAULT NULL,
          con_quien_vive TEXT DEFAULT NULL
        );
      `);


      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_2 (
          id_usuario int NOT NULL,
          cual_es_el_diagnostico text,
          permanentes_sistema_nervioso varchar(45) DEFAULT NULL,
          permanentes_los_ojos varchar(45) DEFAULT NULL,
          permanentes_los_oidos varchar(45) DEFAULT NULL,
          permanentes_demas_sentidos varchar(45) DEFAULT NULL,
          permanentes_la_voz_el_habla varchar(45) DEFAULT NULL,
          permanentes_cardiorrespiratorio_defensas varchar(45) DEFAULT NULL,
          permanentes_digestion_metabolismo varchar(45) DEFAULT NULL,
          permanentes_sistema_genital varchar(45) DEFAULT NULL,
          permanentes_movimiento_del_cuerpo varchar(45) DEFAULT NULL,
          permanentes_la_piel_unas_cabello varchar(45) DEFAULT NULL,
          permanentes_ninguno varchar(45) DEFAULT NULL,
          cual_afecta_mas text,
          hace_cuanto_años varchar(45) DEFAULT NULL,
          origen_discapacidad varchar(45) DEFAULT NULL,
          consecuencia_discapacidad varchar(45) DEFAULT NULL,
          enfermedad_profesional varchar(45) DEFAULT NULL,
          consumo_psicoactivos varchar(45) DEFAULT NULL,
          desastres_naturales varchar(45) DEFAULT NULL,
          por_accidente varchar(45) DEFAULT NULL,
          victima_de_violencia varchar(45) DEFAULT NULL,
          del_conflicto_armado_por varchar(45) DEFAULT NULL,
          dificultades_prestacion_servicios varchar(45) DEFAULT NULL,
          en_la_familia_existen_personas_con_discapacidad varchar(45) DEFAULT NULL,
          en_cual_pais_adquirio_discapacidad text,
          en_cual_departamento_adquirio_discapacidad text,
          en_cual_municipio_adquirio_discapacidad text,
          discapacidad_auditiva varchar(45) DEFAULT NULL,
          discapacidad_fisica varchar(45) DEFAULT NULL,
          discapacidad_intelectual varchar(45) DEFAULT NULL,
          discapacidad_mental varchar(45) DEFAULT NULL,
          discapacidad_sordoceguera varchar(45) DEFAULT NULL,
          discapacidad_visual varchar(45) DEFAULT NULL,
          discapacidad_multiple varchar(45) DEFAULT NULL,
          adicionales_a_las_anteriores varchar(45) DEFAULT NULL,
          grado_discapacidad_intelectual varchar(45) DEFAULT NULL,
          actividades_dificultades_pensar varchar(45) DEFAULT NULL,
          actividades_dificultades_percibir_luz varchar(45) DEFAULT NULL,
          actividades_dificultades_oir varchar(45) DEFAULT NULL,
          actividades_dificultades_sabores varchar(45) DEFAULT NULL,
          actividades_dificultades_hablar varchar(45) DEFAULT NULL,
          actividades_dificultades_desplazarse varchar(45) DEFAULT NULL,
          actividades_dificultades_masticar varchar(45) DEFAULT NULL,
          actividades_dificultades_retener_expulsar varchar(45) DEFAULT NULL,
          actividades_dificultades_caminar varchar(45) DEFAULT NULL,
          actividades_dificultades_piel_sana varchar(45) DEFAULT NULL,
          actividades_dificultades_relacionarse varchar(45) DEFAULT NULL,
          actividades_dificultades_mover_objetos varchar(45) DEFAULT NULL,
          actividades_dificultades_posturas varchar(45) DEFAULT NULL,
          actividades_dificultades_alimentarse varchar(45) DEFAULT NULL,
          actividades_dificultades_otra varchar(45) DEFAULT NULL,
          actitudes_negativos_familiares varchar(45) DEFAULT NULL,
          actitudes_negativos_vecinos varchar(45) DEFAULT NULL,
          actitudes_negativos_amigos varchar(45) DEFAULT NULL,
          actitudes_negativos_empleados varchar(45) DEFAULT NULL,
          actitudes_negativos_otras varchar(45) DEFAULT NULL,
          actitudes_negativos_nadie varchar(45) DEFAULT NULL,
          lugares_barreras_dormitorio varchar(45) DEFAULT NULL,
          lugares_barreras_sala varchar(45) DEFAULT NULL,
          lugares_barreras_baño varchar(45) DEFAULT NULL,
          lugares_barreras_escaleras varchar(45) DEFAULT NULL,
          lugares_barreras_pasillos varchar(45) DEFAULT NULL,
          lugares_barreras_andenes varchar(45) DEFAULT NULL,
          lugares_barreras_calles varchar(45) DEFAULT NULL,
          lugares_barreras_centros_edu varchar(45) DEFAULT NULL,
          lugares_barreras_lug_trabajo varchar(45) DEFAULT NULL,
          lugares_barreras_parques varchar(45) DEFAULT NULL,
          lugares_barreras_paraderos varchar(45) DEFAULT NULL,
          lugares_barreras_trans_publico varchar(45) DEFAULT NULL,
          lugares_barreras_hospitales varchar(45) DEFAULT NULL,
          lugares_barreras_tiendas varchar(45) DEFAULT NULL,
          lugares_barreras_otros varchar(45) DEFAULT NULL,
          lugares_barreras_ninguno int DEFAULT NULL,
          medios_comunicacion_escritos varchar(45) DEFAULT NULL,
          medios_comunicacion_radio varchar(45) DEFAULT NULL,
          medios_comunicacion_television varchar(45) DEFAULT NULL,
          medios_comunicacion_senas varchar(45) DEFAULT NULL,
          medios_comunicacion_senas_naturales varchar(45) DEFAULT NULL,
          medios_comunicacion_telefono varchar(45) DEFAULT NULL,
          medios_comunicacion_internet varchar(45) DEFAULT NULL,
          medios_comunicacion_braille varchar(45) DEFAULT NULL,
          medios_comunicacion_ninguno varchar(45) DEFAULT NULL,
          derechos_deberes_pcd varchar(45) DEFAULT NULL,
          derechos_deberes_pcd_cuales text,
          certificado_discapacidad varchar(45) DEFAULT NULL,
          fecharegistro datetime DEFAULT NULL,
          usuario int DEFAULT NULL,
          estado int DEFAULT NULL,
          tabla varchar(100) DEFAULT NULL,
          consecuencia_discapacidad_cual text,
          hace_cuantos_meses varchar(45) DEFAULT NULL,
          PRIMARY KEY (id_usuario)
        )
      `);
      
      
      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_3 (
          id_usuario INT NOT NULL,
          oportunamente_diagnosticada VARCHAR(45) DEFAULT NULL,
          orientacion_sobre_discapacidad VARCHAR(45) DEFAULT NULL,
          atencion_general_ultimo_año VARCHAR(45) DEFAULT NULL,
          atencion_discapacidad_ultimo_año VARCHAR(45) DEFAULT NULL,
          ninguna_atencion_ultimo_año VARCHAR(45) DEFAULT NULL,
          tiempo_sin_revision_general INT DEFAULT NULL,
          requiere_atencion_a_causa_discapacidad VARCHAR(45) DEFAULT NULL,
          debe_usar_silla_de_ruedas VARCHAR(45) DEFAULT NULL,
          debe_usar_caminador VARCHAR(45) DEFAULT NULL,
          debe_usar_muletas VARCHAR(45) DEFAULT NULL,
          debe_usar_baston_de_apoyo VARCHAR(45) DEFAULT NULL,
          debe_usar_baston_guia VARCHAR(45) DEFAULT NULL,
          debe_usar_audifonos VARCHAR(45) DEFAULT NULL,
          debe_usar_insumos_medicos VARCHAR(45) DEFAULT NULL,
          debe_usar_protesis VARCHAR(45) DEFAULT NULL,
          debe_usar_otros_productos_de_apoyo VARCHAR(45) DEFAULT NULL,
          debe_usar_ninguno VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_silla_de_ruedas VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_caminador VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_muletas VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_baston_de_apoyo VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_baston_guia VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_audifonos VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_insumos_medicos VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_protesis VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_otros_productos_de_apoyo VARCHAR(45) DEFAULT NULL,
          utiliza_actualmente_ninguno VARCHAR(45) DEFAULT NULL,
          cree_necesita_silla_de_ruedas VARCHAR(45) DEFAULT NULL,
          cree_necesita_caminador VARCHAR(45) DEFAULT NULL,
          cree_necesita_muletas VARCHAR(45) DEFAULT NULL,
          cree_necesita_baston_de_apoyo VARCHAR(45) DEFAULT NULL,
          cree_necesita_baston_guia VARCHAR(45) DEFAULT NULL,
          cree_necesita_audifonos VARCHAR(45) DEFAULT NULL,
          cree_necesita_insumos_medicos VARCHAR(45) DEFAULT NULL,
          cree_necesita_protesis VARCHAR(45) DEFAULT NULL,
          cree_necesita_otros_productos_de_apoyo VARCHAR(45) DEFAULT NULL,
          cree_necesita_ninguno VARCHAR(45) DEFAULT NULL,
          otras_condiciones_usa_medicamentos VARCHAR(45) DEFAULT NULL,
          cuales_medicamentos TEXT DEFAULT NULL,
          otras_condiciones_tiene_escaras VARCHAR(45) DEFAULT NULL,
          otras_condiciones_tiene_traqueotomia VARCHAR(45) DEFAULT NULL,
          otras_condiciones_tiene_gastrostomia VARCHAR(45) DEFAULT NULL,
          otras_condiciones_requiere_uso_de_pañal VARCHAR(45) DEFAULT NULL,
          otras_condiciones_oxigeno_dependiente VARCHAR(45) DEFAULT NULL,
          otras_condiciones_dialisis_permanente VARCHAR(45) DEFAULT NULL,
          ha_presentado_covid19 VARCHAR(45) DEFAULT NULL,
          cuantas_veces_covid19 VARCHAR(45) DEFAULT NULL,
          fecha_ultimo_contagio VARCHAR(45) DEFAULT NULL,
          esta_vacunado_contra_covid19 VARCHAR(45) DEFAULT NULL,
          numero_dosis_aplicadas VARCHAR(45) DEFAULT NULL,
          fecha_ultima_dosis_aplicada VARCHAR(45) DEFAULT NULL,
          fabricante_de_la_vacuna VARCHAR(45) DEFAULT NULL,
          otro_fabricante_cual TEXT DEFAULT NULL,
          tiene_esquema_de_vacunas_completo VARCHAR(45) DEFAULT NULL,
          requiere_apoyo_para_actividades_diarias VARCHAR(45) DEFAULT NULL,
          persona_que_ayuda_actividades_diarias VARCHAR(45) DEFAULT NULL,
          sexo_persona_que_mas_ayuda VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_fisioterapia VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_fonoaudiologia VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_medic_permanen VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_medici_fisica VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_optometria VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_psicologia VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_psiquiatria VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_terapia_ocupa VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_trabajo_social VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_otro_tipo VARCHAR(45) DEFAULT NULL,
          rehabilitacion_ordenada_ninguno VARCHAR(45) DEFAULT NULL,
          actualmente_esta_en_rehabilitacion VARCHAR(45) DEFAULT NULL,
          quien_paga_rehabilitacion VARCHAR(45) DEFAULT NULL,
          quien_paga_rehabilitacion_otro_quien TEXT DEFAULT NULL,
          establecimiento_rehabilitacion_es VARCHAR(45) DEFAULT NULL,
          porque_no_recibe_rehabilitacion VARCHAR(45) DEFAULT NULL,
          porque_no_recibe_rehabilitacion_otro TEXT DEFAULT NULL,
          cuanto_tiempo_sin_rehabilitacion VARCHAR(45) DEFAULT NULL,
          conoce_prestadores_rehabilitacion VARCHAR(45) DEFAULT NULL,
          a_que_regimen_de_salud_pertenece VARCHAR(45) DEFAULT NULL,
          cual_regimen_de_salud TEXT DEFAULT NULL,
          cual_es_su_eps TEXT DEFAULT NULL,
          tipo_afiliacion VARCHAR(45) DEFAULT NULL,
          otro_tipo_afiliacion_cual TEXT DEFAULT NULL,
          ultima_hospitalizacion_motivo TEXT DEFAULT NULL,
          hace_cuanto_ultima_hospitalizacion VARCHAR(45) DEFAULT NULL,
          tiempo_de_hospitalizacion TEXT DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INT DEFAULT NULL,
          estado INT DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          tiempo_sin_revision_general_meses INT DEFAULT NULL,
          PRIMARY KEY (id_usuario)
        );
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_4 (
         id_usuario INTEGER PRIMARY KEY NOT NULL,
         ideas_suicidas VARCHAR(45) DEFAULT NULL,
         intento_de_suicidio VARCHAR(45) DEFAULT NULL,
         hospitalizacion_por_psiquiatria VARCHAR(45) DEFAULT NULL,
         tristeza_extrema_y_permanente VARCHAR(45) DEFAULT NULL,
         ansiedad_constante_que_afecta_desarrollo VARCHAR(45) DEFAULT NULL,
         trastornos_alimenticios VARCHAR(45) DEFAULT NULL,
         consumo_sustancias_psicoactivas VARCHAR(45) DEFAULT NULL,
         cambios_importantes_en_la_personalidad VARCHAR(45) DEFAULT NULL,
         alteraciones_permanentes_estado_del_sueño VARCHAR(45) DEFAULT NULL,
         otro_cuales TEXT DEFAULT NULL,
         fecharegistro DATETIME DEFAULT NULL,
         usuario INTEGER DEFAULT NULL,
         estado INTEGER DEFAULT NULL,
         tabla VARCHAR(100) DEFAULT NULL
       );
   `);

      database.run(` 
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_5 (
          id_usuario INTEGER PRIMARY KEY NOT NULL,
          sabe_leer_y_escribir_solo_mayores_de_5_años VARCHAR(45) DEFAULT NULL,
          asiste_actualmente_a_establecimiento_educativo VARCHAR(45) DEFAULT NULL,
          el_establecimiento_donde_estudia_es VARCHAR(45) DEFAULT NULL,
          el_establecimiento_cuenta_con_ayuda_pedagogica VARCHAR(45) DEFAULT NULL,
          el_establecimiento_cuenta_con_ayuda_tecnologicas VARCHAR(45) DEFAULT NULL,
          el_establecimiento_cuenta_con_ayuda_terapeuticas VARCHAR(45) DEFAULT NULL,
          el_establecimiento_cuenta_con_ayuda_comunicativos VARCHAR(45) DEFAULT NULL,
          el_establecimiento_cuenta_con_ayuda_administrativos VARCHAR(45) DEFAULT NULL,
          el_establecimiento_cuenta_con_ayuda_financieros VARCHAR(45) DEFAULT NULL,
          el_establecimiento_cuenta_con_ayuda_ninguno VARCHAR(45) DEFAULT NULL,
          los_docentes_atienden_adecuadamente_necesidades_educ VARCHAR(45) DEFAULT NULL,
          la_educacion_que_recibe_responde_a_sus_necesidades VARCHAR(45) DEFAULT NULL,
          hace_cuantos_años_estudio TEXT DEFAULT NULL,
          repitio_algun_año_escolar VARCHAR(45) DEFAULT NULL,
          repitio_grado_0 VARCHAR(45) DEFAULT NULL,
          repitio_grado_0_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_1 VARCHAR(45) DEFAULT NULL,
          repitio_grado_1_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_2 VARCHAR(45) DEFAULT NULL,
          repitio_grado_2_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_3 VARCHAR(45) DEFAULT NULL,
          repitio_grado_3_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_4 VARCHAR(45) DEFAULT NULL,
          repitio_grado_4_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_5 VARCHAR(45) DEFAULT NULL,
          repitio_grado_5_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_6 VARCHAR(45) DEFAULT NULL,
          repitio_grado_6_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_7 VARCHAR(45) DEFAULT NULL,
          repitio_grado_7_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_8 VARCHAR(45) DEFAULT NULL,
          repitio_grado_8_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_9 VARCHAR(45) DEFAULT NULL,
          repitio_grado_9_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_10 VARCHAR(45) DEFAULT NULL,
          repitio_grado_10_numero_veces INTEGER DEFAULT NULL,
          repitio_grado_11 VARCHAR(45) DEFAULT NULL,
          repitio_grado_11_numero_veces INTEGER DEFAULT NULL,
          cual_es_la_causa_principal_la_cual_no_estudia VARCHAR(45) DEFAULT NULL,
          si_le_dieran_la_oportunidad_de_estudiar_lo_haria VARCHAR(45) DEFAULT NULL,
          que_estudiaria TEXT DEFAULT NULL,
          sabe_utilizar_herramientas_tecnologicas VARCHAR(45) DEFAULT NULL,
          cuales_herramientas_tecnologicas_maneja_computador VARCHAR(45) DEFAULT NULL,
          cuales_herramientas_tecnologicas_maneja_tablet VARCHAR(45) DEFAULT NULL,
          cuales_herramientas_tecnologicas_maneja_celular VARCHAR(45) DEFAULT NULL,
          cuales_herramientas_tecnologicas_maneja_otro VARCHAR(45) DEFAULT NULL,
          cuales_herramientas_tecnologicas_maneja_otro_cual TEXT DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          ultimo_nivel_educacion_aprobado VARCHAR(100) DEFAULT NULL
        );
      `);


      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_6 (
          id_usuario INTEGER PRIMARY KEY NOT NULL,
          participa_actividades_con_familia_amigos VARCHAR(45) DEFAULT NULL,
          participa_actividades_con_comunidad VARCHAR(45) DEFAULT NULL,
          participa_actividades_religiosas VARCHAR(45) DEFAULT NULL,
          participa_actividades_productivas VARCHAR(45) DEFAULT NULL,
          participa_actividades_deportivas_recreacion VARCHAR(45) DEFAULT NULL,
          participa_actividades_culturales VARCHAR(45) DEFAULT NULL,
          participa_actividades_trabajo_des_humano VARCHAR(45) DEFAULT NULL,
          participa_actividades_ciudadanas VARCHAR(45) DEFAULT NULL,
          participa_actividades_otras VARCHAR(45) DEFAULT NULL,
          participa_actividades_ninguna VARCHAR(45) DEFAULT NULL,
          participa_programas_del_inder VARCHAR(45) DEFAULT NULL,
          participa_en_alguna_organizacion VARCHAR(45) DEFAULT NULL,
          señale_porque_no_participa_en_organizacion VARCHAR(45) DEFAULT NULL,
          participa_en_org_personas_discapacidad VARCHAR(45) DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL
        );
      `);
      
      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_7 (
          id_usuario INTEGER PRIMARY KEY NOT NULL,
          durante_los_ultimos_6_meses_ha_estado VARCHAR(45) DEFAULT NULL,
          usted_tiene_contrato_de_trabajo VARCHAR(45) DEFAULT NULL,
          la_actividad_economica_en_la_cual_trabaja VARCHAR(45) DEFAULT NULL,
          en_el_trabajo_se_desempeña_como VARCHAR(45) DEFAULT NULL,
          le_interesa_el_emprendimiento VARCHAR(45) DEFAULT NULL,
          tiene_alguna_idea_de_negocio VARCHAR(45) DEFAULT NULL,
          en_que_sector_se_inscribe_su_idea_de_negocio VARCHAR(45) DEFAULT NULL,
          otro_sector_cual TEXT DEFAULT NULL,
          su_capacidad_laboral_afectada_por_discapacidad VARCHAR(45) DEFAULT NULL,
          cuenta_con_calificacion_perdida_capacidad_laboral VARCHAR(45) DEFAULT NULL,
          porcentaje_de_perdida_laboral TEXT DEFAULT NULL,
          cual_es_su_ingreso_mensual_promedio VARCHAR(45) DEFAULT NULL,
          ha_recibido_capacitacion_despues_de_discapacidad VARCHAR(45) DEFAULT NULL,
          donde_recibio_capacitacion VARCHAR(45) DEFAULT NULL,
          necesita_capacitacion_para VARCHAR(45) DEFAULT NULL,
          necesidades_de_capacitacion_de_pers_discapacidad TEXT DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL
        );
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS inclusion_grupofamiliar (
          integrantes INTEGER NOT NULL, 
          id_usuario INTEGER NOT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario VARCHAR(45) DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(45) DEFAULT NULL,
          PRIMARY KEY (integrantes, id_usuario)
        );
      `);
      
      
   
      
        

        // tablas de otra app
      database.run(`
            CREATE TABLE IF NOT EXISTS infraccion_localizacion (
            idfiu INTEGER PRIMARY KEY NOT NULL,
            fechaentrevista DATE DEFAULT NULL,
            codigosticker TEXT DEFAULT NULL,
            solicitudrequerimiento TEXT DEFAULT NULL,
            direccion TEXT DEFAULT NULL,
            comuna INTEGER DEFAULT NULL,
            barrio INTEGER DEFAULT NULL,
            ruralurbano INTEGER DEFAULT NULL,
            sector TEXT DEFAULT NULL,
            telefono1 VARCHAR(25) DEFAULT NULL,
            telefono2 VARCHAR(25) DEFAULT NULL,
            correo VARCHAR(100) DEFAULT NULL,
            estrato INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            dirCampo1 VARCHAR(25) DEFAULT NULL,
            dirCampo2 VARCHAR(25) DEFAULT NULL,
            dirCampo3 VARCHAR(100) DEFAULT NULL,
            dirCampo4 VARCHAR(10) DEFAULT NULL,
            dirCampo5 VARCHAR(25) DEFAULT NULL,
            dirCampo6 VARCHAR(100) DEFAULT NULL,
            dirCampo7 VARCHAR(10) DEFAULT NULL,
            dirCampo8 VARCHAR(25) DEFAULT NULL,
            dirCampo9 TEXT DEFAULT NULL,
            longitud VARCHAR(100) DEFAULT NULL,
            latitud VARCHAR(100) DEFAULT NULL
          );
          `);
      // database.run(`
      //      CREATE TABLE IF NOT EXISTS c3_evacuacionydanos (
      //       fichasocial INTEGER PRIMARY KEY NOT NULL,
      //       tipoevacuacion INTEGER DEFAULT NULL,
      //       danosvivienda INTEGER DEFAULT NULL,
      //       danosenseres INTEGER DEFAULT NULL,
      //       fecharegistro DATETIME DEFAULT NULL,
      //       usuario INTEGER DEFAULT NULL,
      //       estado INTEGER DEFAULT NULL,
      //       tabla VARCHAR(100) DEFAULT NULL
      //     );
      //     `);
          //  database.run(`
          //   CREATE TABLE IF NOT EXISTS c4_datosdelavivienda (
          //   fichasocial INTEGER PRIMARY KEY NOT NULL,
          //   tipovivienda INTEGER DEFAULT NULL,
          //   materialpisos INTEGER DEFAULT NULL,
          //   materialpisosotro TEXT DEFAULT NULL,
          //   materialparedes INTEGER DEFAULT NULL,
          //   materialtechos INTEGER DEFAULT NULL,
          //   fecharegistro DATETIME DEFAULT NULL,
          //   usuario INTEGER DEFAULT NULL,
          //   estado INTEGER DEFAULT NULL,
          //   tabla VARCHAR(100) DEFAULT NULL
          // );
          // `);
           database.run(`
            CREATE TABLE IF NOT EXISTS infraccion_servicios_publicos (
            idfiu INTEGER PRIMARY KEY NOT NULL,
            energia INTEGER DEFAULT NULL,
            acueducto INTEGER DEFAULT NULL,
            alcantarillado INTEGER DEFAULT NULL,
            gas INTEGER DEFAULT NULL,
            telefono INTEGER DEFAULT NULL,
            telefonofijo VARCHAR(25) DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS  infraccion_tiempo_vivienda (
            idfiu INTEGER PRIMARY KEY NOT NULL,
            tiempovivienda INTEGER DEFAULT NULL,
            tiempoviviendaunidad TEXT DEFAULT NULL,
            tiempomedellin INTEGER DEFAULT NULL,
            tiempomedellinunidad TEXT DEFAULT NULL,
            dondeviviaantes INTEGER DEFAULT NULL,
            otrodepartamento TEXT DEFAULT NULL,
            otropais TEXT DEFAULT NULL,
            otromunicipio TEXT DEFAULT NULL,
            otracomuna TEXT DEFAULT NULL,
            otrobarrio TEXT DEFAULT NULL,
            fecharegistro TEXT DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla TEXT DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS infraccion_tenencia_vivienda (
            idfiu INTEGER PRIMARY KEY NOT NULL,
            tenenciadelavivienda INTEGER DEFAULT NULL,
            propietario TEXT DEFAULT NULL,
            propietariotel1 VARCHAR(25) DEFAULT NULL,
            propietariotel2 VARCHAR(25) DEFAULT NULL,
            escritura INTEGER DEFAULT NULL,
            compraventa INTEGER DEFAULT NULL,
            promesa INTEGER DEFAULT NULL,
            posesion INTEGER DEFAULT NULL,
            impuestopredial INTEGER DEFAULT NULL,
            serviciospublicos INTEGER DEFAULT NULL,
            matriculapredial INTEGER DEFAULT NULL,
            extrajuicio INTEGER DEFAULT NULL,
            ninguno INTEGER DEFAULT NULL,
            otro INTEGER DEFAULT NULL,
            cualdocumentos TEXT DEFAULT NULL,
            unidadproductuva INTEGER DEFAULT NULL,
            cualunidadproductiva TEXT DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
          `); database.run(`
            CREATE TABLE IF NOT EXISTS infraccion_conformacion_familiar (
            idfiu INTEGER PRIMARY KEY NOT NULL,
            tipodefamilia INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla TEXT DEFAULT NULL,
            observacion TEXT DEFAULT NULL,
            nameFile TEXT DEFAULT NULL
          );
          `);
        //    database.run(`
        //    CREATE TABLE IF NOT EXISTS c10_datosgeneralesremisiones (
        //      idintegrante INTEGER NOT NULL,
        //       fichasocial INTEGER NOT NULL,
        //       programa INTEGER NOT NULL,
        //       fecharegistro DATETIME DEFAULT NULL,
        //       usuario INTEGER DEFAULT NULL,
        //       estado INTEGER DEFAULT NULL,
        //       tabla VARCHAR(100) DEFAULT NULL,
        //       observacion TEXT DEFAULT NULL,
        //       motivo VARCHAR(25) DEFAULT NULL,
        //       PRIMARY KEY (idintegrante, fichasocial, programa)
        // );
        //   `); 
          database.run(`
            CREATE TABLE IF NOT EXISTS infraccion_integrante_red_apoyo (
            idredapoyo INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            idfiu INTEGER DEFAULT NULL,
            ubicacion VARCHAR(25) DEFAULT NULL,
            nombreauto TEXT DEFAULT NULL,
            parentesco TEXT DEFAULT NULL,
            direccion TEXT DEFAULT NULL,
            comuna TEXT DEFAULT NULL,
            barrio TEXT DEFAULT NULL,
            ruralurbano VARCHAR(25) DEFAULT NULL,
            sector TEXT DEFAULT NULL,
            telefono1 VARCHAR(25) DEFAULT NULL,
            telefono2 VARCHAR(25) DEFAULT NULL,
            dirCampo1 VARCHAR(25) DEFAULT NULL,
            dirCampo2 VARCHAR(25) DEFAULT NULL,
            dirCampo3 VARCHAR(100) DEFAULT NULL,
            dirCampo4 VARCHAR(10) DEFAULT NULL,
            dirCampo5 VARCHAR(25) DEFAULT NULL,
            dirCampo6 VARCHAR(100) DEFAULT NULL,
            dirCampo7 VARCHAR(10) DEFAULT NULL,
            dirCampo8 VARCHAR(25) DEFAULT NULL,
            dirCampo9 TEXT DEFAULT NULL,
            pais VARCHAR(25) DEFAULT NULL,
            departamento VARCHAR(25) DEFAULT NULL,
            municipio VARCHAR(25) DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
          `); 
          // database.run(`
          //   CREATE TABLE IF NOT EXISTS c12_ayudasentregadas (
          //   idayudas INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          //   fichasocial INTEGER NOT NULL,
          //   paquetealimentario INTEGER DEFAULT NULL,
          //   tipoa INTEGER DEFAULT NULL,
          //   tipob INTEGER DEFAULT NULL,
          //   tipoc INTEGER DEFAULT NULL,
          //   noalimentarias INTEGER DEFAULT NULL,
          //   quiendoa VARCHAR(25) DEFAULT NULL,
          //   factura VARCHAR(25) DEFAULT NULL,
          //   dcocina INTEGER DEFAULT NULL,
          //   daseohogar INTEGER DEFAULT NULL,
          //   daseofamiliar INTEGER DEFAULT NULL,
          //   dasehombre INTEGER DEFAULT NULL,
          //   daseomujer INTEGER DEFAULT NULL,
          //   daseonna INTEGER DEFAULT NULL,
          //   daseoinfantil INTEGER DEFAULT NULL,
          //   daseoespecial INTEGER DEFAULT NULL,
          //   dcolchonetas INTEGER DEFAULT NULL,
          //   dcobijas INTEGER DEFAULT NULL,
          //   dsabanas INTEGER DEFAULT NULL,
          //   dalmohadas INTEGER DEFAULT NULL,
          //   enitdad TEXT DEFAULT NULL,
          //   otros INTEGER DEFAULT NULL,
          //   cuales TEXT DEFAULT NULL,
          //   entidadotros TEXT DEFAULT NULL,
          //   fechadeentrega DATE DEFAULT NULL,
          //   idintegrante VARCHAR(25) DEFAULT NULL,
          //   fecharegistro DATETIME DEFAULT NULL,
          //   usuario INTEGER DEFAULT NULL,
          //   estado INTEGER DEFAULT NULL,
          //   tabla VARCHAR(100) DEFAULT NULL,
          //   tipoentraga INTEGER DEFAULT NULL,
          //   ococina INTEGER DEFAULT NULL,
          //   acocina INTEGER DEFAULT NULL,
          //   oaseohogar INTEGER DEFAULT NULL,
          //   aaseohogar INTEGER DEFAULT NULL,
          //   oaseofamiliar INTEGER DEFAULT NULL,
          //   aaseofamiliar INTEGER DEFAULT NULL,
          //   oasehombre INTEGER DEFAULT NULL,
          //   aasehombre INTEGER DEFAULT NULL,
          //   oaseomujer INTEGER DEFAULT NULL,
          //   aaseomujer INTEGER DEFAULT NULL,
          //   oaseonna INTEGER DEFAULT NULL,
          //   aaseonna INTEGER DEFAULT NULL,
          //   oaseoinfantil INTEGER DEFAULT NULL,
          //   aaseoinfantil INTEGER DEFAULT NULL,
          //   oaseoespecial INTEGER DEFAULT NULL,
          //   aaseoespecial INTEGER DEFAULT NULL,
          //   ocolchonetas INTEGER DEFAULT NULL,
          //   acolchonetas INTEGER DEFAULT NULL,
          //   ocobijas INTEGER DEFAULT NULL,
          //   acobijas INTEGER DEFAULT NULL,
          //   osabanas INTEGER DEFAULT NULL,
          //   asabanas INTEGER DEFAULT NULL,
          //   oalmohadas INTEGER DEFAULT NULL,
          //   aalmohadas INTEGER DEFAULT NULL,
          //   quienpaq VARCHAR(25) DEFAULT NULL,
          //   cualpaq TEXT DEFAULT NULL,
          //   quienasis VARCHAR(25) DEFAULT NULL,
          //   cualasis TEXT DEFAULT NULL,
          //   asistencialiamentaria INTEGER DEFAULT NULL,
          //   redentrega INTEGER DEFAULT NULL,
          //   entregado INTEGER DEFAULT NULL,
          //   observacion TEXT DEFAULT NULL,
          //   paquete1 VARCHAR(25) DEFAULT NULL,
          //   paquete2 VARCHAR(25) DEFAULT NULL,
          //   paquete3 VARCHAR(25) DEFAULT NULL,
          //   paquete4 VARCHAR(25) DEFAULT NULL,
          //   documentorecibeayuda VARCHAR(25) DEFAULT NULL,
          //   nombrerecibeayuda TEXT DEFAULT NULL,
          //   nameFirma TEXT DEFAULT NULL,
          //   draw_dataUrl BLOB DEFAULT NULL
          // );
         // `); 
          database.run(`
            CREATE TABLE IF NOT EXISTS infraccion_integrante_familiar (
            idintegrante INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            idfiu INTEGER DEFAULT NULL,
            codigosibis VARCHAR(25) DEFAULT NULL,
            tipodedocumento INTEGER DEFAULT NULL,
            nacionalidad INTEGER DEFAULT NULL,
            condicionmigratoria  TEXT DEFAULT NULL,
            numerodedocumento TEXT DEFAULT NULL,
            nombre1 TEXT DEFAULT NULL,
            nombre2 TEXT DEFAULT NULL,
            apellido1 TEXT DEFAULT NULL,
            apellido2 TEXT DEFAULT NULL,
            fechadenacimiento DATE DEFAULT NULL,
            sexo INTEGER DEFAULT NULL,
            orientacionsexual INTEGER DEFAULT NULL,
            identidaddegenero INTEGER DEFAULT NULL,
            etnia INTEGER DEFAULT NULL,
            estadocivil INTEGER DEFAULT NULL,
            gestantelactante VARCHAR(25) DEFAULT NULL,
            escolaridad INTEGER DEFAULT NULL,
            parentesco INTEGER DEFAULT NULL,
            discapacidad INTEGER DEFAULT NULL,
            regimendesalud INTEGER DEFAULT NULL,
            enfermedades INTEGER DEFAULT NULL,
            actividad INTEGER DEFAULT NULL,
            ocupacion INTEGER DEFAULT NULL,
            estadousuario INTEGER DEFAULT NULL,
            campesino INTEGER DEFAULT NULL,
            desplazado INTEGER DEFAULT NULL,
            sisbenizado INTEGER DEFAULT NULL,
            victima INTEGER DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            origen VARCHAR(25) DEFAULT NULL,
            condicionespecial VARCHAR(100) DEFAULT NULL,
            otrocondicionespecial VARCHAR(25) DEFAULT NULL
          );
          `); database.run(`
           CREATE TABLE IF NOT EXISTS infraccion_mascotas (
            idfiu INTEGER PRIMARY KEY NOT NULL,
            tienemascotas INTEGER DEFAULT NULL,
            cuantos INTEGER DEFAULT NULL,
            cuales TEXT DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL
          );
  
          `); 
          // database.run(`
          //   CREATE TABLE IF NOT EXISTS c15_ubicacionposterioratencionsocial (
          //   fichasocial INTEGER NOT NULL,
          //   ubicacionposterior INTEGER NOT NULL,
          //   cualtemporal TEXT DEFAULT NULL,
          //   dondeauxilio TEXT DEFAULT NULL,
          //   nombreauto TEXT DEFAULT NULL,
          //   parentesco VARCHAR(25) DEFAULT NULL,
          //   prestada VARCHAR(25) DEFAULT NULL,
          //   cuallugardistinto TEXT DEFAULT NULL,
          //   direccion TEXT DEFAULT NULL,
          //   comuna VARCHAR(25) DEFAULT NULL,
          //   barrio VARCHAR(25) DEFAULT NULL,
          //   ruralurbano VARCHAR(25) DEFAULT NULL,
          //   sector TEXT DEFAULT NULL,
          //   telefono1 VARCHAR(25) DEFAULT NULL,
          //   telefono2 VARCHAR(25) DEFAULT NULL,
          //   dirCampo1 VARCHAR(25) DEFAULT NULL,
          //   dirCampo2 VARCHAR(25) DEFAULT NULL,
          //   dirCampo3 VARCHAR(100) DEFAULT NULL,
          //   dirCampo4 VARCHAR(10) DEFAULT NULL,
          //   dirCampo5 VARCHAR(25) DEFAULT NULL,
          //   dirCampo6 VARCHAR(100) DEFAULT NULL,
          //   dirCampo7 VARCHAR(10) DEFAULT NULL,
          //   dirCampo8 VARCHAR(25) DEFAULT NULL,
          //   dirCampo9 TEXT DEFAULT NULL,
          //   ubicacion VARCHAR(25) DEFAULT NULL,
          //   pais VARCHAR(25) DEFAULT NULL,
          //   departamento VARCHAR(25) DEFAULT NULL,
          //   municipio VARCHAR(25) DEFAULT NULL,
          //   fecharegistro DATETIME DEFAULT NULL,
          //   usuario INTEGER DEFAULT NULL,
          //   estado INTEGER DEFAULT NULL,
          //   tabla VARCHAR(100) DEFAULT NULL,
          //   PRIMARY KEY (fichasocial, ubicacionposterior)
          // );
  
          // `); 
          // database.run(`
          //   CREATE TABLE IF NOT EXISTS c151_integrantesubicaciopos (
          //   idintegrante INTEGER NOT NULL,
          //   fichasocial INTEGER NOT NULL,
          //   ubicacionposterior INTEGER DEFAULT NULL,
          //   fecharegistro DATETIME DEFAULT NULL,
          //   usuario INTEGER DEFAULT NULL,
          //   estado INTEGER DEFAULT NULL,
          //   tabla VARCHAR(100) DEFAULT NULL,
          //   PRIMARY KEY (idintegrante, fichasocial)
          // );
          // `);

      database.run(`
            CREATE TABLE IF NOT EXISTS infraccion_observaciones (
            idfiu INTEGER NOT NULL,
            observacion LONGTEXT DEFAULT NULL,
            fecharegistro DATETIME DEFAULT NULL,
            usuario INTEGER DEFAULT NULL,
            estado INTEGER DEFAULT NULL,
            tabla VARCHAR(100) DEFAULT NULL,
            PRIMARY KEY (idfiu)
          );
  
          `);
      database.run(`
           CREATE TABLE IF NOT EXISTS infraccion_autorizacion (
          idfiu INTEGER NOT NULL,
          idintegrante INTEGER DEFAULT NULL,
          entidad TEXT DEFAULT NULL,
          diligenciadopor INTEGER DEFAULT NULL,
          acepto VARCHAR(25) DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          draw_dataUrlImage BLOB DEFAULT NULL,
          nameFile TEXT DEFAULT NULL,
          apoyosocial TEXT DEFAULT NULL,
          draw_dataUrl BLOB DEFAULT NULL,
          nameFirma TEXT DEFAULT NULL,
          autorizofirma VARCHAR(25) DEFAULT NULL,
          idseguimiento INTEGER DEFAULT NULL,
          firmatitular VARCHAR(25) DEFAULT NULL,
          PRIMARY KEY (idfiu)
        );
          `);
       database.run(`
            CREATE TABLE IF NOT EXISTS infraccion_no_integrantes (
              id INTEGER NOT NULL, 
              idfiu INTEGER   NOT NULL,
              tipodefamilia TEXT,
              nacionalidad TEXT,
              condicionmigrante TEXT,
              etpv TEXT,
              tipodedocumento TEXT,
              numerodedocumento TEXT,
              nombre1 TEXT,
              nombre2 TEXT,
              apellido1 TEXT,
              apellido2 TEXT,
              fechadenacimiento DATE,
              telefono TEXT,
              relacion TEXT,
              fecharegistro DATETIME,
              usuario INTEGER,
              estado INTEGER,
              tabla TEXT,
              PRIMARY KEY (idfiu, id) 
            );
      
             `);

      database.run(`
            CREATE TABLE IF NOT EXISTS t1_programas (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              descripcion TEXT,
              estado INTEGER,
              tipo INTEGER,
              usuario INTEGER,
              tabla TEXT,
              fecharegistro DATE
            );
              `);
      database.run(`
                CREATE TABLE IF NOT EXISTS infraccion_red_apoyo (
                  idfiu int(11) NOT NULL,
                  reddeapoyo int(11) DEFAULT NULL,
                  fecharegistro datetime DEFAULT NULL,
                  usuario int(11) DEFAULT NULL,
                  estado int(11) DEFAULT NULL,
                  tabla varchar(100) DEFAULT NULL,
                  PRIMARY KEY (idfiu)
                )
                  `);


      database.run(`
                    CREATE TABLE IF NOT EXISTS t1_parentesco (
                      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                      descripcion VARCHAR(25) DEFAULT NULL,
                      estado INTEGER DEFAULT NULL
                    );
                                          `);

      database.run(`
                   CREATE TABLE IF NOT EXISTS t1_comunas (
                      id INTEGER PRIMARY KEY NOT NULL,
                      descripcion TEXT DEFAULT NULL,
                      estado INTEGER DEFAULT NULL
                    );
                      `);

      database.run(`
                  CREATE TABLE IF NOT EXISTS t1_barrios (
                    id INTEGER PRIMARY KEY NOT NULL,
                    descripcion TEXT DEFAULT NULL,
                    comuna INTEGER DEFAULT NULL,
                    estado INTEGER DEFAULT NULL
                  );
                      `);
                      database.run(`
                        CREATE TABLE IF NOT EXISTS t1_paises (
                          id INTEGER PRIMARY KEY NOT NULL,
                          descripcion TEXT DEFAULT NULL,
                          codigo INTEGER DEFAULT NULL,
                          estado INTEGER DEFAULT NULL
                        );
                            `);

                      database.run(`
                        CREATE TABLE IF NOT EXISTS t1_ubicacionposterior (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          descripcion TEXT DEFAULT NULL,
                          estado INTEGER DEFAULT NULL
                        );
                            `);


    }

    setDb(database);
    fetchUsers(database);
  } catch (err) {
    console.error('Error loading SQL.js:', err);
  }
};

export default loadSQL;