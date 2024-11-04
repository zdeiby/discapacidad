
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
          participa__en_alguna_organizacion VARCHAR(45) DEFAULT NULL,
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
      
      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_8 (
          id_usuario INTEGER NOT NULL,
          neceidades_de_capacitacion_de_la_familia TEXT,
          personas_hogar_ocupacion_sin_dato INTEGER DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          personas_hogar_parentesco_abuelo INTEGER DEFAULT NULL,
          personas_hogar_parentesco_acudiente INTEGER DEFAULT NULL,
          personas_hogar_parentesco_bisabuelos INTEGER DEFAULT NULL,
          personas_hogar_parentesco_bisnietos INTEGER DEFAULT NULL,
          personas_hogar_parentesco_conyuge INTEGER DEFAULT NULL,
          personas_hogar_parentesco_cuniada INTEGER DEFAULT NULL,
          personas_hogar_parentesco_hermano INTEGER DEFAULT NULL,
          personas_hogar_parentesco_hijastro INTEGER DEFAULT NULL,
          personas_hogar_parentesco_hijo INTEGER DEFAULT NULL,
          personas_hogar_parentesco_hijo_adoptivo INTEGER DEFAULT NULL,
          personas_hogar_parentesco_jefe_hogar INTEGER DEFAULT NULL,
          personas_hogar_parentesco_madrastra INTEGER DEFAULT NULL,
          personas_hogar_parentesco_nieto INTEGER DEFAULT NULL,
          personas_hogar_parentesco_nuera INTEGER DEFAULT NULL,
          personas_hogar_parentesco_otros_no_parientes INTEGER DEFAULT NULL,
          personas_hogar_parentesco_otros_parientes INTEGER DEFAULT NULL,
          personas_hogar_parentesco_padrastro INTEGER DEFAULT NULL,
          personas_hogar_parentesco_padres INTEGER DEFAULT NULL,
          personas_hogar_parentesco_padres_adoptantes INTEGER DEFAULT NULL,
          personas_hogar_parentesco_rep_legal INTEGER DEFAULT NULL,
          personas_hogar_parentesco_sobrinos INTEGER DEFAULT NULL,
          personas_hogar_parentesco_suegros INTEGER DEFAULT NULL,
          personas_hogar_parentesco_tios INTEGER DEFAULT NULL,
          personas_hogar_parentesco_yerno INTEGER DEFAULT NULL,
          numero_personas_hogar_discapacidad INTEGER DEFAULT NULL,
          personas_hogar_ciclo_primera_infancia INTEGER DEFAULT NULL,
          personas_hogar_ciclo_infancia INTEGER DEFAULT NULL,
          personas_hogar_ciclo_primera_adolescencia INTEGER DEFAULT NULL,
          personas_hogar_ciclo_juventud INTEGER DEFAULT NULL,
          personas_hogar_ciclo_adultez INTEGER DEFAULT NULL,
          personas_hogar_ciclo_persona_mayor INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_inicial INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_ninguna INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_posgrado INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_preescolar INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_pregrado_completo INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_pregrado_incompleto INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_primaria_completa INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_primaria_incompleta INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_secundaria_completa INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_secundaria_incompleta INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_tecnica_completa INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_tecnica_incompleta INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_tecnologia_completa INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_tecnologia_incompleta INTEGER DEFAULT NULL,
          personas_hogar_escolaridad_sin_dato INTEGER DEFAULT NULL,
          personas_hogar_ocupacion_sobrevivencia INTEGER DEFAULT NULL,
          personas_hogar_ocupacion_ama_de_casa INTEGER DEFAULT NULL,
          personas_hogar_ocupacion_desempleado INTEGER DEFAULT NULL,
          personas_hogar_ocupacion_empleado INTEGER DEFAULT NULL,
          personas_hogar_ocupacion_estudiante INTEGER DEFAULT NULL,
          personas_hogar_ocupacion_independiente INTEGER DEFAULT NULL,
          personas_hogar_ocupacion_ninguna INTEGER DEFAULT NULL,
          personas_hogar_ocupacion_trabajador_informal INTEGER DEFAULT NULL,
          PRIMARY KEY (id_usuario)
        );
      `);


      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_9 (
          id_usuario INTEGER NOT NULL,
          registre_relacion_familiar_con_persona_con_discapacidad TEXT,
          la_famiilia_es_red_de_apoyo_para_la_pcd VARCHAR(45) DEFAULT NULL,
          la_familia_acepta_el_diagnostico_de_la_pcd VARCHAR(45) DEFAULT NULL,
          la_pcd_participa_en_la_toma_de_decisiones VARCHAR(45) DEFAULT NULL,
          comunicacion_asertiva_en_el_hogar VARCHAR(45) DEFAULT NULL,
          habitos_de_vida_saludables VARCHAR(45) DEFAULT NULL,
          riesgo_por_violencia_intrafamiliar VARCHAR(45) DEFAULT NULL,
          riesgo_por_desconocimiento_del_manejo_diagnostico VARCHAR(45) DEFAULT NULL,
          riesgo_por_consumo_de_sustancias_psicoactivas_en_hogar VARCHAR(45) DEFAULT NULL,
          riesgo_en_el_territorio_por_dinamicas_del_contexto VARCHAR(45) DEFAULT NULL,
          riesgo_por_presunta_vulneracion_de_derechos VARCHAR(45) DEFAULT NULL,
          tiene_representante_legal INTEGER DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario VARCHAR(45) DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          PRIMARY KEY (id_usuario)
        );
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_10 (
          id_usuario INTEGER NOT NULL,
          persona_entidad TEXT,
          persona_parentesco VARCHAR(45) DEFAULT NULL,
          persona_procedencia TEXT,
          valor INTEGER DEFAULT NULL,
          persona_entidad2 TEXT,
          persona_parentesco2 VARCHAR(45) DEFAULT NULL,
          direccion_persona_parentesco TEXT,
          persona_procedencia2 TEXT,
          valor2 INTEGER DEFAULT NULL,
          persona_entidad3 TEXT,
          persona_parentesco3 VARCHAR(45) DEFAULT NULL,
          persona_procedencia3 TEXT,
          valor3 INTEGER DEFAULT NULL,
          persona_entidad4 TEXT,
          persona_parentesco4 VARCHAR(45) DEFAULT NULL,
          persona_procedencia4 TEXT,
          valor4 INTEGER DEFAULT NULL,
          total_ingresos VARCHAR(45) DEFAULT NULL,
          egresos_mensuales_salud VARCHAR(45) DEFAULT NULL,
          egresos_mensuales_arriendo VARCHAR(45) DEFAULT NULL,
          egresos_mensuales_alimentacion VARCHAR(45) DEFAULT NULL,
          egresos_mensuales_servicios_publicos VARCHAR(45) DEFAULT NULL,
          egresos_mensuales_subsidio VARCHAR(45) DEFAULT NULL,
          egresos_mensuales_transporte VARCHAR(45) DEFAULT NULL,
          egresos_mensuales_otros VARCHAR(45) DEFAULT NULL,
          egresos_familiar_total VARCHAR(45) DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario VARCHAR(45) DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          PRIMARY KEY (id_usuario)
        );
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS dicapacidad_ingresos_mensuales (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_usuario INTEGER DEFAULT NULL,
          nombres_y_apellidos TEXT,
          parentesco TEXT,
          procedencia TEXT,
          ingresos_mensuales DOUBLE DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL
        );
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_11 (
          id_usuario INTEGER NOT NULL,
          actualmente_vive_en VARCHAR(45) DEFAULT NULL,
          en_que_condicion_posee_vivienda VARCHAR(45) DEFAULT NULL,
          otra_condicion_cual TEXT,
          numero_de_espacios_vivienda_cocina VARCHAR(45) DEFAULT NULL,
          numero_de_espacios_vivienda_comedor VARCHAR(45) DEFAULT NULL,
          numero_de_espacios_vivienda_sala VARCHAR(45) DEFAULT NULL,
          numero_de_espacios_vivienda_baño VARCHAR(45) DEFAULT NULL,
          numero_de_espacios_vivienda_habitaciones VARCHAR(45) DEFAULT NULL,
          numero_de_espacios_vivienda_balcon VARCHAR(45) DEFAULT NULL,
          numero_de_espacios_vivienda_parqueadero VARCHAR(45) DEFAULT NULL,
          numero_de_espacios_vivienda_otras VARCHAR(45) DEFAULT NULL,
          cual_es_el_estrato_de_la_vivienda VARCHAR(45) DEFAULT NULL,
          acceso_vivienda_por_trocha VARCHAR(45) DEFAULT NULL,
          acceso_vivienda_por_medio_de_escalas VARCHAR(45) DEFAULT NULL,
          acceso_vivienda_por_medio_de_callejon VARCHAR(45) DEFAULT NULL,
          acceso_vivienda_por_via_pavimentada VARCHAR(45) DEFAULT NULL,
          acceso_vivienda_por_via_sin_pavimentar VARCHAR(45) DEFAULT NULL,
          condiciones_higienicas VARCHAR(45) DEFAULT NULL,
          condiciones_enseres_basicos_adecuados VARCHAR(45) DEFAULT NULL,
          condiciones_enseres_basicos_en_sobreuso VARCHAR(45) DEFAULT NULL,
          condiciones_enseres_basicos_reducidos VARCHAR(45) DEFAULT NULL,
          condiciones_ambientales_aireadas_iluminadas VARCHAR(45) DEFAULT NULL,
          condiciones_ambientales_aireadas_poca_ilumi VARCHAR(45) DEFAULT NULL,
          condiciones_ambientales_iluminacion_poco_airea VARCHAR(45) DEFAULT NULL,
          condiciones_ambientales_vivienda_con_humedades VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_adobe VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_bareque VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_madera_tabla VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_piso_en_baldosa VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_piso_obra_negra VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_piso_en_tierra VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_techo_teja_asbesto VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_techo_teja_barro VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_techo_teja_zinc VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_techo_teja_plasticas VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_techo_madera VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_techo_plancha_cemento VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_otro VARCHAR(45) DEFAULT NULL,
          vivienda_construida_en_otro_cual TEXT,
          vivienda_cuenta_servicios_publ_energia_elec VARCHAR(45) DEFAULT NULL,
          vivienda_cuenta_servicios_publ_alcantarillado VARCHAR(45) DEFAULT NULL,
          vivienda_cuenta_servicios_publ_telefono VARCHAR(45) DEFAULT NULL,
          vivienda_cuenta_servicios_publ_acueducto VARCHAR(45) DEFAULT NULL,
          vivienda_cuenta_servicios_publ_gas_natural VARCHAR(45) DEFAULT NULL,
          vivienda_cuenta_servicios_publ_recoleccion_basura VARCHAR(45) DEFAULT NULL,
          vivienda_cuenta_servicios_publ_internet VARCHAR(45) DEFAULT NULL,
          vivienda_cuenta_servicios_publ_ninguno VARCHAR(45) DEFAULT NULL,
          preparacion_alimentos_agua_potable VARCHAR(45) DEFAULT NULL,
          dispositivos_tecnologicos_televisor VARCHAR(45) DEFAULT NULL,
          dispositivos_tecnologicos_computador VARCHAR(45) DEFAULT NULL,
          dispositivos_tecnologicos_tablet VARCHAR(45) DEFAULT NULL,
          dispositivos_tecnologicos_celular VARCHAR(45) DEFAULT NULL,
          dispositivos_tecnologicos_otros VARCHAR(45) DEFAULT NULL,
          dispositivos_tecnologicos_otros_cuales TEXT,
          dispositivos_tecnologicos_ninguno VARCHAR(45) DEFAULT NULL,
          riesgos_vivienda_por_deslizamiento VARCHAR(45) DEFAULT NULL,
          riesgos_vivienda_por_inundaciones VARCHAR(45) DEFAULT NULL,
          riesgos_vivienda_por_techo_paredes_mal_estado VARCHAR(45) DEFAULT NULL,
          riesgos_vivienda_por_fallas_geologicas VARCHAR(45) DEFAULT NULL,
          riesgos_vivienda_por_otro VARCHAR(45) DEFAULT NULL,
          riesgos_vivienda_por_otro_cual TEXT,
          riesgos_vivienda_por_ninguno VARCHAR(45) DEFAULT NULL,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          PRIMARY KEY (id_usuario)
        );
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS discapacidad_capitulo_12 (
          id_usuario INTEGER NOT NULL,
          conclusiones_y_observaciones TEXT,
          necesidades_alimentacion_vivienda_satisfechas INTEGER DEFAULT NULL,
          presenta_discapacidad INTEGER DEFAULT NULL,
          requiere_ser_analizada INTEGER DEFAULT NULL,
          requiere_activar_rutas INTEGER DEFAULT NULL,
          se_orienta_a TEXT,
          se_remite_a TEXT,
          firma_persona_discapacidad LONGTEXT,
          documento_persona_discapacidad TEXT,
          firma_cuidador LONGTEXT,
          documento_ciudador TEXT,
          parentesco_cuidador TEXT,
          nombre_completo_profesional TEXT,
          profesion_profesional TEXT,
          numero_tarjeta_profesional TEXT,
          proyecto TEXT,
          firma_profesional TEXT,
          fecharegistro DATETIME DEFAULT NULL,
          usuario INTEGER DEFAULT NULL,
          estado INTEGER DEFAULT NULL,
          tabla VARCHAR(100) DEFAULT NULL,
          es_prioritario INTEGER DEFAULT NULL,
          firma TEXT,
          dondeadjunto TEXT,
          id_profesional VARCHAR(45) DEFAULT NULL,
          draw_dataUrl BLOB,
          draw_dataUrl2 BLOB,
          draw_dataUrl3 BLOB,
          nameFirma VARCHAR(255) DEFAULT NULL,
          nameFirma2 VARCHAR(255) DEFAULT NULL,
          nameFirma3 VARCHAR(255) DEFAULT NULL,
          PRIMARY KEY (id_usuario)
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
    }

    setDb(database);
    fetchUsers(database);
  } catch (err) {
    console.error('Error loading SQL.js:', err);
  }
};

export default loadSQL;