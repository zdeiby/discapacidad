import React, { useEffect, useState, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, useIonViewDidEnter, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonSearchbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import loadSQL from '../models/database';
import './ProgressBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { isPlatform } from '@ionic/react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

interface InclusionCiudadano {
  id_usuario: number;
  yearpostulacion: number;
  nacionalidad: number | null;
  tipodedocumento: number | null;
  numerodedocumento: string | null;
  nombre1: string | null;
  nombre2: string | null;
  apellido1: string | null;
  apellido2: string | null;
  fechadenacimiento: string | null;
  sexo: number | null;
  orientacionsexual: number | null;
  identidaddegenero: number | null;
  etnia: number | null;
  estadocivil: number | null;
  gestantelactante: string | null;
  escolaridad: number | null;
  parentesco: number | null;
  discapacidad: number | null;
  regimendesalud: number | null;
  enfermedades: number | null;
  actividad: number | null;
  ocupacion: number | null;
  campesino: number | null;
  victima: number | null;
  sisbenizado: number | null;
  fecharegistro: string | null;
  usuario: string | null;
  estado: number | null;
  tabla: string | null;
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
  fechadenacimiento_verificada: number | null;
}

interface InclusionUbicacion {
  id_usuario: number;
  yearpostulacion: number;
  direccion: string | null;
  comuna: number | null;
  barrio: number | null;
  ruralurbano: number | null;
  sector: string | null;
  estrato: number | null;
  fecharegistro: string | null;
  usuario: string | null;
  estado: number | null;
  tabla: string | null;
  dirCampo1: string | null;
  dirCampo2: string | null;
  dirCampo3: string | null;
  dirCampo4: string | null;
  dirCampo5: string | null;
  dirCampo6: string | null;
  dirCampo7: string | null;
  dirCampo8: string | null;
  dirCampo9: string | null;
  longitud: string | null;
  latitud: string | null;
  tenenciadelavivienda: string | null;
}

interface DiscapacidadCapitulo0 {
  id_usuario: number;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
  año_diligenciamiento: number | null;
  mes_diligenciamiento: number | null;
  dia_diligenciamiento: number | null;
  fechadiligencia: string | null;
  persona_brinda_informacion: string | null;
  nombre_persona_brinda_informacion: string | null;
  relacion_persona_discapacidad: string | null;
  modalidad_atencion: string | null;
  origen_visita: string | null;
  otro_origen_visita: string | null;
  origen_visita_cual: string | null;
  proyecto: string | null;
}

interface DiscapacidadCapitulo1 {
  id_usuario: number;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
  cuantas_personas_viven_hogar: number | null;
  cuantas_personas_viven_hogar_discapacidad: number | null;
  tiene_personas_a_cargo: number | null;
  numero_personas_a_cargo: number | null;
  recibe_servicio_icbf: number | null;
  beneficiario_programa: number | null;
  beneficiario_programa_otro: string | null;
  numero_personas_a_cargo_mayor60: number | null;
  numero_personas_a_cargo_menor12: number | null;
  con_quien_vive: string | null;
}

interface DiscapacidadCapitulo2 {
  id_usuario: number;
  cual_es_el_diagnostico: string | null;
  permanentes_sistema_nervioso: string | null;
  permanentes_los_ojos: string | null;
  permanentes_los_oidos: string | null;
  permanentes_demas_sentidos: string | null;
  permanentes_la_voz_el_habla: string | null;
  permanentes_cardiorrespiratorio_defensas: string | null;
  permanentes_digestion_metabolismo: string | null;
  permanentes_sistema_genital: string | null;
  permanentes_movimiento_del_cuerpo: string | null;
  permanentes_la_piel_unas_cabello: string | null;
  permanentes_ninguno: string | null;
  cual_afecta_mas: string | null;
  hace_cuanto_años: string | null;
  origen_discapacidad: string | null;
  consecuencia_discapacidad: string | null;
  enfermedad_profesional: string | null;
  consumo_psicoactivos: string | null;
  desastres_naturales: string | null;
  por_accidente: string | null;
  victima_de_violencia: string | null;
  del_conflicto_armado_por: string | null;
  dificultades_prestacion_servicios: string | null;
  en_la_familia_existen_personas_con_discapacidad: string | null;
  en_cual_pais_adquirio_discapacidad: string | null;
  en_cual_departamento_adquirio_discapacidad: string | null;
  en_cual_municipio_adquirio_discapacidad: string | null;
  discapacidad_auditiva: string | null;
  discapacidad_fisica: string | null;
  discapacidad_intelectual: string | null;
  discapacidad_mental: string | null;
  discapacidad_sordoceguera: string | null;
  discapacidad_visual: string | null;
  discapacidad_multiple: string | null;
  adicionales_a_las_anteriores: string | null;
  grado_discapacidad_intelectual: string | null;
  actividades_dificultades_pensar: string | null;
  actividades_dificultades_percibir_luz: string | null;
  actividades_dificultades_oir: string | null;
  actividades_dificultades_sabores: string | null;
  actividades_dificultades_hablar: string | null;
  actividades_dificultades_desplazarse: string | null;
  actividades_dificultades_masticar: string | null;
  actividades_dificultades_retener_expulsar: string | null;
  actividades_dificultades_caminar: string | null;
  actividades_dificultades_piel_sana: string | null;
  actividades_dificultades_relacionarse: string | null;
  actividades_dificultades_mover_objetos: string | null;
  actividades_dificultades_posturas: string | null;
  actividades_dificultades_alimentarse: string | null;
  actividades_dificultades_otra: string | null;
  actitudes_negativos_familiares: string | null;
  actitudes_negativos_vecinos: string | null;
  actitudes_negativos_amigos: string | null;
  actitudes_negativos_empleados: string | null;
  actitudes_negativos_otras: string | null;
  actitudes_negativos_nadie: string | null;
  lugares_barreras_dormitorio: string | null;
  lugares_barreras_sala: string | null;
  lugares_barreras_baño: string | null;
  lugares_barreras_escaleras: string | null;
  lugares_barreras_pasillos: string | null;
  lugares_barreras_andenes: string | null;
  lugares_barreras_calles: string | null;
  lugares_barreras_centros_edu: string | null;
  lugares_barreras_lug_trabajo: string | null;
  lugares_barreras_parques: string | null;
  lugares_barreras_paraderos: string | null;
  lugares_barreras_trans_publico: string | null;
  lugares_barreras_hospitales: string | null;
  lugares_barreras_tiendas: string | null;
  lugares_barreras_otros: string | null;
  lugares_barreras_ninguno: number | null;
  medios_comunicacion_escritos: string | null;
  medios_comunicacion_radio: string | null;
  medios_comunicacion_television: string | null;
  medios_comunicacion_senas: string | null;
  medios_comunicacion_senas_naturales: string | null;
  medios_comunicacion_telefono: string | null;
  medios_comunicacion_internet: string | null;
  medios_comunicacion_braille: string | null;
  medios_comunicacion_ninguno: string | null;
  derechos_deberes_pcd: string | null;
  derechos_deberes_pcd_cuales: string | null;
  certificado_discapacidad: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
  consecuencia_discapacidad_cual: string | null;
  hace_cuantos_meses: string | null;
}

interface DiscapacidadCapitulo3 {
  id_usuario: number;
  oportunamente_diagnosticada: string | null;
  orientacion_sobre_discapacidad: string | null;
  atencion_general_ultimo_año: string | null;
  atencion_discapacidad_ultimo_año: string | null;
  ninguna_atencion_ultimo_año: string | null;
  tiempo_sin_revision_general: number | null;
  requiere_atencion_a_causa_discapacidad: string | null;
  debe_usar_silla_de_ruedas: string | null;
  debe_usar_caminador: string | null;
  debe_usar_muletas: string | null;
  debe_usar_baston_de_apoyo: string | null;
  debe_usar_baston_guia: string | null;
  debe_usar_audifonos: string | null;
  debe_usar_insumos_medicos: string | null;
  debe_usar_protesis: string | null;
  debe_usar_otros_productos_de_apoyo: string | null;
  debe_usar_ninguno: string | null;
  utiliza_actualmente_silla_de_ruedas: string | null;
  utiliza_actualmente_caminador: string | null;
  utiliza_actualmente_muletas: string | null;
  utiliza_actualmente_baston_de_apoyo: string | null;
  utiliza_actualmente_baston_guia: string | null;
  utiliza_actualmente_audifonos: string | null;
  utiliza_actualmente_insumos_medicos: string | null;
  utiliza_actualmente_protesis: string | null;
  utiliza_actualmente_otros_productos_de_apoyo: string | null;
  utiliza_actualmente_ninguno: string | null;
  cree_necesita_silla_de_ruedas: string | null;
  cree_necesita_caminador: string | null;
  cree_necesita_muletas: string | null;
  cree_necesita_baston_de_apoyo: string | null;
  cree_necesita_baston_guia: string | null;
  cree_necesita_audifonos: string | null;
  cree_necesita_insumos_medicos: string | null;
  cree_necesita_protesis: string | null;
  cree_necesita_otros_productos_de_apoyo: string | null;
  cree_necesita_ninguno: string | null;
  otras_condiciones_usa_medicamentos: string | null;
  cuales_medicamentos: string | null;
  otras_condiciones_tiene_escaras: string | null;
  otras_condiciones_tiene_traqueotomia: string | null;
  otras_condiciones_tiene_gastrostomia: string | null;
  otras_condiciones_requiere_uso_de_pañal: string | null;
  otras_condiciones_oxigeno_dependiente: string | null;
  otras_condiciones_dialisis_permanente: string | null;
  ha_presentado_covid19: string | null;
  cuantas_veces_covid19: string | null;
  fecha_ultimo_contagio: string | null;
  esta_vacunado_contra_covid19: string | null;
  numero_dosis_aplicadas: string | null;
  fecha_ultima_dosis_aplicada: string | null;
  fabricante_de_la_vacuna: string | null;
  otro_fabricante_cual: string | null;
  tiene_esquema_de_vacunas_completo: string | null;
  requiere_apoyo_para_actividades_diarias: string | null;
  persona_que_ayuda_actividades_diarias: string | null;
  sexo_persona_que_mas_ayuda: string | null;
  rehabilitacion_ordenada_fisioterapia: string | null;
  rehabilitacion_ordenada_fonoaudiologia: string | null;
  rehabilitacion_ordenada_medic_permanen: string | null;
  rehabilitacion_ordenada_medici_fisica: string | null;
  rehabilitacion_ordenada_optometria: string | null;
  rehabilitacion_ordenada_psicologia: string | null;
  rehabilitacion_ordenada_psiquiatria: string | null;
  rehabilitacion_ordenada_terapia_ocupa: string | null;
  rehabilitacion_ordenada_trabajo_social: string | null;
  rehabilitacion_ordenada_otro_tipo: string | null;
  rehabilitacion_ordenada_ninguno: string | null;
  actualmente_esta_en_rehabilitacion: string | null;
  quien_paga_rehabilitacion: string | null;
  quien_paga_rehabilitacion_otro_quien: string | null;
  establecimiento_rehabilitacion_es: string | null;
  porque_no_recibe_rehabilitacion: string | null;
  porque_no_recibe_rehabilitacion_otro: string | null;
  cuanto_tiempo_sin_rehabilitacion: string | null;
  conoce_prestadores_rehabilitacion: string | null;
  a_que_regimen_de_salud_pertenece: string | null;
  cual_regimen_de_salud: string | null;
  cual_es_su_eps: string | null;
  tipo_afiliacion: string | null;
  otro_tipo_afiliacion_cual: string | null;
  ultima_hospitalizacion_motivo: string | null;
  hace_cuanto_ultima_hospitalizacion: string | null;
  tiempo_de_hospitalizacion: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
  tiempo_sin_revision_general_meses: number | null;
}

interface DiscapacidadCapitulo4 {
  id_usuario: number;
  ideas_suicidas: string | null;
  intento_de_suicidio: string | null;
  hospitalizacion_por_psiquiatria: string | null;
  tristeza_extrema_y_permanente: string | null;
  ansiedad_constante_que_afecta_desarrollo: string | null;
  trastornos_alimenticios: string | null;
  consumo_sustancias_psicoactivas: string | null;
  cambios_importantes_en_la_personalidad: string | null;
  alteraciones_permanentes_estado_del_sueño: string | null;
  otro_cuales: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}

interface DiscapacidadCapitulo5 {
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

interface DiscapacidadCapitulo6 {
  id_usuario: number;
  participa_actividades_con_familia_amigos: string | null;
  participa_actividades_con_comunidad: string | null;
  participa_actividades_religiosas: string | null;
  participa_actividades_productivas: string | null;
  participa_actividades_deportivas_recreacion: string | null;
  participa_actividades_culturales: string | null;
  participa_actividades_trabajo_des_humano: string | null;
  participa_actividades_ciudadanas: string | null;
  participa_actividades_otras: string | null;
  participa_actividades_ninguna: string | null;
  participa_programas_del_inder: string | null;
  participa__en_alguna_organizacion: string | null;
  señale_porque_no_participa_en_organizacion: string | null;
  participa_en_org_personas_discapacidad: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}


interface DiscapacidadCapitulo7 {
  id_usuario: number;
  durante_los_ultimos_6_meses_ha_estado: string | null;
  usted_tiene_contrato_de_trabajo: string | null;
  la_actividad_economica_en_la_cual_trabaja: string | null;
  en_el_trabajo_se_desempeña_como: string | null;
  le_interesa_el_emprendimiento: string | null;
  tiene_alguna_idea_de_negocio: string | null;
  en_que_sector_se_inscribe_su_idea_de_negocio: string | null;
  otro_sector_cual: string | null;
  su_capacidad_laboral_afectada_por_discapacidad: string | null;
  cuenta_con_calificacion_perdida_capacidad_laboral: string | null;
  porcentaje_de_perdida_laboral: string | null;
  cual_es_su_ingreso_mensual_promedio: string | null;
  ha_recibido_capacitacion_despues_de_discapacidad: string | null;
  donde_recibio_capacitacion: string | null;
  necesita_capacitacion_para: string | null;
  necesidades_de_capacitacion_de_pers_discapacidad: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}

interface InclusionGrupoFamiliar {
  integrantes: number;
  id_usuario: number;
  fecharegistro: string | null;
  usuario: string | null;
  estado: number | null;
  tabla: string | null;
}

interface DiscapacidadCapitulo8 {
  id_usuario: number;
  neceidades_de_capacitacion_de_la_familia: string | null;
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


interface DiscapacidadCapitulo9 {
  id_usuario: number;
  registre_relacion_familiar_con_persona_con_discapacidad: string | null;
  la_famiilia_es_red_de_apoyo_para_la_pcd: string | null;
  la_familia_acepta_el_diagnostico_de_la_pcd: string | null;
  la_pcd_participa_en_la_toma_de_decisiones: string | null;
  comunicacion_asertiva_en_el_hogar: string | null;
  habitos_de_vida_saludables: string | null;
  riesgo_por_violencia_intrafamiliar: string | null;
  riesgo_por_desconocimiento_del_manejo_diagnostico: string | null;
  riesgo_por_consumo_de_sustancias_psicoactivas_en_hogar: string | null;
  riesgo_en_el_territorio_por_dinamicas_del_contexto: string | null;
  riesgo_por_presunta_vulneracion_de_derechos: string | null;
  tiene_representante_legal: number | null;
  fecharegistro: string | null;
  usuario: string | null;
  estado: number | null;
  tabla: string | null;
}

interface DiscapacidadCapitulo10 {
  id_usuario: number;
  persona_entidad: string | null;
  persona_parentesco: string | null;
  persona_procedencia: string | null;
  valor: number | null;
  persona_entidad2: string | null;
  persona_parentesco2: string | null;
  direccion_persona_parentesco: string | null;
  persona_procedencia2: string | null;
  valor2: number | null;
  persona_entidad3: string | null;
  persona_parentesco3: string | null;
  persona_procedencia3: string | null;
  valor3: number | null;
  persona_entidad4: string | null;
  persona_parentesco4: string | null;
  persona_procedencia4: string | null;
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
  usuario: string | null;
  estado: number | null;
  tabla: string | null;
}

interface DiscapacidadIngresosMensuales {
  id: number;
  id_usuario: number | null;
  nombres_y_apellidos: string | null;
  parentesco: string | null;
  procedencia: string | null;
  ingresos_mensuales: number | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
}

interface DiscapacidadCapitulo11 {
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

interface DiscapacidadCapitulo12 {
  id_usuario: number;
  conclusiones_y_observaciones: string | null;
  necesidades_alimentacion_vivienda_satisfechas: number | null;
  presenta_discapacidad: number | null;
  requiere_ser_analizada: number | null;
  requiere_activar_rutas: number | null;
  se_orienta_a: string | null;
  se_remite_a: string | null;
  firma_persona_discapacidad: string | null;
  documento_persona_discapacidad: string | null;
  firma_cuidador: string | null;
  documento_ciudador: string | null;
  parentesco_cuidador: string | null;
  nombre_completo_profesional: string | null;
  profesion_profesional: string | null;
  numero_tarjeta_profesional: string | null;
  proyecto: string | null;
  firma_profesional: string | null;
  fecharegistro: string | null;
  usuario: number | null;
  estado: number | null;
  tabla: string | null;
  es_prioritario: number | null;
  firma: string | null;
  dondeadjunto: string | null;
  id_profesional: string | null;
  draw_dataUrl: Blob | null;
  draw_dataUrl2: Blob | null;
  draw_dataUrl3: Blob | null;
  nameFirma: string | null;
  nameFirma2: string | null;
  nameFirma3: string | null;
}




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

      if (!db.objectStoreNames.contains('sqliteStore')) {
        resolve(null);
        return;
      }

      const transaction = db.transaction(['sqliteStore'], 'readonly');
      const store = transaction.objectStore('sqliteStore');
      const getRequest = store.get('sqliteDb');

      getRequest.onsuccess = (event) => {
        const data = event.target.result;
        if (data) {
          resolve(data);
        } else {
          resolve(null);
        }
      };

      getRequest.onerror = (event) => {
        reject(event.target.error);
      };
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}


const Cobertura: React.FC = () => {

  const [db, setDb] = useState<any>(null);
  const [inclusionCiudadano, setInclusionCiudadano] = useState<InclusionCiudadano[]>([]);  
  const [inclusionCiudadanoJoin, setInclusionCiudadanoJoin] = useState<InclusionCiudadano[]>([]); 
  const [inclusionUbicacion, setInclusionUbicacion] = useState<InclusionUbicacion[]>([]);
  const [discapacidadCapitulo0, setDiscapacidadCapitulo0] = useState<DiscapacidadCapitulo0[]>([]);
  const [discapacidadCapitulo1, setDiscapacidadCapitulo1] = useState<DiscapacidadCapitulo1[]>([]);
  const [discapacidadCapitulo2, setDiscapacidadCapitulo2] = useState<DiscapacidadCapitulo2[]>([]);
  const [discapacidadCapitulo3, setDiscapacidadCapitulo3] = useState<DiscapacidadCapitulo3[]>([]);
  const [discapacidadCapitulo4, setDiscapacidadCapitulo4] = useState<DiscapacidadCapitulo4[]>([]);
  const [discapacidadCapitulo5, setDiscapacidadCapitulo5] = useState<DiscapacidadCapitulo5[]>([]);
  const [discapacidadCapitulo6, setDiscapacidadCapitulo6] = useState<DiscapacidadCapitulo6[]>([]);
  const [discapacidadCapitulo7, setDiscapacidadCapitulo7] = useState<DiscapacidadCapitulo7[]>([]);
  const [inclusionGrupoFamiliar, setInclusionGrupoFamiliar] = useState<InclusionGrupoFamiliar[]>([]);
  const [discapacidadCapitulo8, setDiscapacidadCapitulo8] = useState<DiscapacidadCapitulo8[]>([]);
  const [discapacidadCapitulo9, setDiscapacidadCapitulo9] = useState<DiscapacidadCapitulo9[]>([]);
  const [discapacidadCapitulo10, setDiscapacidadCapitulo10] = useState<DiscapacidadCapitulo10[]>([]);
  const [discapacidadIngresosMensuales, setDiscapacidadIngresosMensuales] = useState<DiscapacidadIngresosMensuales[]>([]);
  const [discapacidadCapitulo11, setDiscapacidadCapitulo11] = useState<DiscapacidadCapitulo11[]>([]);
  const [discapacidadCapitulo12, setDiscapacidadCapitulo12] = useState<DiscapacidadCapitulo12[]>([]);
  

  const [sincro, setSincro] = useState<any>(false);
  const [porcentaje, setPorcentaje] = useState<any>(1);
  const [showModal, setShowModal] = useState(false);
  const [dbContent, setDbContent] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const fetchDatabaseContent = async () => {
      const savedDb = await getFromIndexedDB();
      if (savedDb) {
        setDbContent(new Uint8Array(savedDb));
      } else {
        console.error('No database found in IndexedDB');
      }
    };

    fetchDatabaseContent();
  }, []);

  const getCurrentDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  };

  const downloadFile = async () => {
    if (!dbContent) {
      console.error('No database content to download');
      return;
    }

    const fileName = `${localStorage.getItem('cedula')}_${getCurrentDateTime()}.sqlite`;
    const blob = new Blob([dbContent], { type: 'application/octet-stream' });

    if (isPlatform('hybrid')) {
      try {
        const base64Data = await convertBlobToBase64(blob);
        await Filesystem.writeFile({
          path: fileName,
          data: base64Data as string,
          directory: Directory.Documents,
        });

        alert('Archivo descargado exitosamente, busque el archivo en almacenamiento Documents');
      } catch (error) {
        console.error('Error al guardar el archivo:', error);
        alert('Error al guardar el archivo');
      }
    } else {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const convertBlobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };


  // hook for sqlite db


  useEffect(() => {
    const syncData = async () => {
      await loadSQL(setDb, fetchInclusionCiudadanoJoin);
      await fetchInclusionCiudadano();
      await fetchInclusionUbicacion();
      await fetchDiscapacidadCapitulo0();
      await fetchDiscapacidadCapitulo1();
      await fetchDiscapacidadCapitulo2();
      await fetchDiscapacidadCapitulo3();
      await fetchDiscapacidadCapitulo4();
      await fetchDiscapacidadCapitulo5();
      await fetchDiscapacidadCapitulo6();
      await fetchDiscapacidadCapitulo7();
      await fetchInclusionGrupoFamiliar();
      await fetchDiscapacidadCapitulo8();
      await fetchDiscapacidadCapitulo9();
      await fetchDiscapacidadCapitulo10();
      await fetchDiscapacidadIngresosMensuales();
      await fetchDiscapacidadCapitulo11();
      await fetchDiscapacidadCapitulo12();
 
    };
    syncData();
  }, []);

  useEffect(() => {
    const syncData = async () => {
     await fetchInclusionCiudadano();
     await fetchInclusionCiudadanoJoin();
     await fetchInclusionUbicacion();
     await fetchDiscapacidadCapitulo0();
     await fetchDiscapacidadCapitulo1();
     await fetchDiscapacidadCapitulo2();
     await fetchDiscapacidadCapitulo3();
     await fetchDiscapacidadCapitulo4();
     await fetchDiscapacidadCapitulo5();
     await fetchDiscapacidadCapitulo6();
     await fetchDiscapacidadCapitulo7();
     await fetchInclusionGrupoFamiliar();
     await fetchDiscapacidadCapitulo8();
     await fetchDiscapacidadCapitulo9();
     await fetchDiscapacidadCapitulo10();
     await fetchDiscapacidadIngresosMensuales();
     await fetchDiscapacidadCapitulo11();
     await fetchDiscapacidadCapitulo12();
 
    };
    syncData();
  }, [db]);



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


           const fetchInclusionCiudadanoJoin = async (database = db) => {
            if (database) {
              const res = await database.exec(`SELECT 
                *, inclusion_ciudadano.id_usuario as id_usuariociu
              FROM 
                  inclusion_ciudadano
              LEFT JOIN 
                  inclusion_grupofamiliar 
              ON 
                  inclusion_ciudadano.id_usuario = inclusion_grupofamiliar.integrantes
               
              ;`);
              if (res[0]?.values && res[0]?.columns) {
                const transformedData: InclusionCiudadano[] = res[0].values.map((row: any[]) => {
                  return res[0].columns.reduce((obj, col, index) => {
                    obj[col] = row[index];
                    return obj;
                  }, {} as InclusionCiudadano);
                });
                setInclusionCiudadanoJoin(transformedData); // Asegúrate de que `setInclusionCiudadano` es la función correcta para actualizar el estado
              }
            }
          };

  const fetchInclusionCiudadano = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "inclusion_ciudadano";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: InclusionCiudadano[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as InclusionCiudadano);
        });
        setInclusionCiudadano(transformedData); // Asegúrate de que `setInclusionCiudadano` es la función correcta para actualizar el estado
      }
    }
  };
  
  const fetchInclusionUbicacion = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "inclusion_ubicacion";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: InclusionUbicacion[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as InclusionUbicacion);
        });
        setInclusionUbicacion(transformedData); // Asegúrate de que `setInclusionUbicacion` es la función correcta para actualizar el estado
      }
    }
  };

  const fetchDiscapacidadCapitulo0 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_0";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo0[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo0);
        });
        setDiscapacidadCapitulo0(transformedData); // Asegúrate de que `setDiscapacidadCapitulo0` es la función correcta para actualizar el estado
      }
    }
  };
  
  
  const fetchDiscapacidadCapitulo1 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_1";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo1[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo1);
        });
        setDiscapacidadCapitulo1(transformedData);
      }
    }
  };
  
  const fetchDiscapacidadCapitulo2 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_2";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo2[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo2);
        });
        setDiscapacidadCapitulo2(transformedData);
      }
    }
  };
  
  const fetchDiscapacidadCapitulo3 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_3";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo3[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo3);
        });
        setDiscapacidadCapitulo3(transformedData);
      }
    }
  };

  const fetchDiscapacidadCapitulo4 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_4";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo4[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo4);
        });
        setDiscapacidadCapitulo4(transformedData); // Asegúrate de que `setDiscapacidadCapitulo4` es la función correcta para actualizar el estado
      }
    }
  };
  

  const fetchDiscapacidadCapitulo5 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_5";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo5[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo5);
        });
        setDiscapacidadCapitulo5(transformedData);
      }
    }
  };
  
  const fetchDiscapacidadCapitulo6 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_6";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo6[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo6);
        });
        setDiscapacidadCapitulo6(transformedData);
      }
    }
  };

  const fetchDiscapacidadCapitulo7 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_7";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo7[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo7);
        });
        setDiscapacidadCapitulo7(transformedData); // Asegúrate de que `setDiscapacidadCapitulo7` es la función correcta para actualizar el estado
      }
    }
  };
  
  
  const fetchInclusionGrupoFamiliar = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "inclusion_grupofamiliar";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: InclusionGrupoFamiliar[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as InclusionGrupoFamiliar);
        });
        setInclusionGrupoFamiliar(transformedData);
      }
    }
  };
  
  const fetchDiscapacidadCapitulo8 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_8";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo8[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo8);
        });
        setDiscapacidadCapitulo8(transformedData);
      }
    }
  };
  
  const fetchDiscapacidadCapitulo9 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_9";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo9[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo9);
        });
        setDiscapacidadCapitulo9(transformedData);
      }
    }
  };
  
  const fetchDiscapacidadCapitulo10 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_10";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo10[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo10);
        });
        setDiscapacidadCapitulo10(transformedData);
      }
    }
  };
  
  const fetchDiscapacidadIngresosMensuales = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "dicapacidad_ingresos_mensuales";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadIngresosMensuales[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadIngresosMensuales);
        });
        setDiscapacidadIngresosMensuales(transformedData);
      }
    }
  };
  
  const fetchDiscapacidadCapitulo11 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_11";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo11[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo11);
        });
        setDiscapacidadCapitulo11(transformedData);
      }
    }
  };
  
  const fetchDiscapacidadCapitulo12 = async (database = db) => {
    if (database) {
      const res = await database.exec('SELECT * FROM "discapacidad_capitulo_12";');
      if (res[0]?.values && res[0]?.columns) {
        const transformedData: DiscapacidadCapitulo12[] = res[0].values.map((row: any[]) => {
          return res[0].columns.reduce((obj, col, index) => {
            obj[col] = row[index];
            return obj;
          }, {} as DiscapacidadCapitulo12);
        });
        setDiscapacidadCapitulo12(transformedData);
      }
    }
  };
  


  const sincronizacion = async () => {
    await saveDatabase();
    await fetchInclusionCiudadano();
    await fetchInclusionCiudadanoJoin();
    await fetchInclusionUbicacion();
    await fetchDiscapacidadCapitulo0();
    await fetchDiscapacidadCapitulo1();
    await fetchDiscapacidadCapitulo2();
    await fetchDiscapacidadCapitulo3();
    await fetchDiscapacidadCapitulo4();
    await fetchDiscapacidadCapitulo5();
    await fetchDiscapacidadCapitulo6();
    await fetchDiscapacidadCapitulo7();
    await fetchInclusionGrupoFamiliar();
    await fetchDiscapacidadCapitulo8();
    await fetchDiscapacidadCapitulo9();
    await fetchDiscapacidadCapitulo10();
    await fetchDiscapacidadIngresosMensuales();
    await fetchDiscapacidadCapitulo11();
    await fetchDiscapacidadCapitulo12();


    setSincro(true);
    setPorcentaje(0);
    closeModal();
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_inclusion_ciudadano', inclusionCiudadano, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(10);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de InclusionCiudadano', error);
      await openModal('Error al guardar InclusionCiudadano', 'danger', 'light');
      alert('Error al guardar los datos de InclusionCiudadano');
    }
    

    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_inclusion_ubicacion', inclusionUbicacion, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(10);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de InclusionUbicacion', error);
      await openModal('Error al guardar InclusionUbicacion', 'danger', 'light');
      alert('Error al guardar los datos de InclusionUbicacion');
    }
    

    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_0', discapacidadCapitulo0, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(15);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo0', error);
      await openModal('Error al guardar DiscapacidadCapitulo0', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo0');
    }
    
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_1', discapacidadCapitulo1, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(20);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo1', error);
      await openModal('Error al guardar DiscapacidadCapitulo1', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo1');
    }
    
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_2', discapacidadCapitulo2, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(30);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo2', error);
      await openModal('Error al guardar DiscapacidadCapitulo2', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo2');
    }
    
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_3', discapacidadCapitulo3, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(35);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo3', error);
      await openModal('Error al guardar DiscapacidadCapitulo3', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo3');
    }

    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_4', discapacidadCapitulo4, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(40);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo4', error);
      await openModal('Error al guardar DiscapacidadCapitulo4', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo4');
    }

    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_5', discapacidadCapitulo5, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(50);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo5', error);
      await openModal('Error al guardar DiscapacidadCapitulo5', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo5');
    }
    
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_6', discapacidadCapitulo6, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(60);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo6', error);
      await openModal('Error al guardar DiscapacidadCapitulo6', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo6');
    }
    
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_7', discapacidadCapitulo7, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(70);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo7', error);
      await openModal('Error al guardar DiscapacidadCapitulo7', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo7');
    }
    
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_inclusion_grupo_familiar', inclusionGrupoFamiliar, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(80);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de InclusionGrupoFamiliar', error);
      await openModal('Error al guardar InclusionGrupoFamiliar', 'danger', 'light');
      alert('Error al guardar los datos de InclusionGrupoFamiliar');
    }
    
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_8', discapacidadCapitulo8, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(90);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo8', error);
      await openModal('Error al guardar DiscapacidadCapitulo8', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo8');
    }
    
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_9', discapacidadCapitulo9, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(95);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo9', error);
      await openModal('Error al guardar DiscapacidadCapitulo9', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo9');
    }
    
    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_10', discapacidadCapitulo10, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(96);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo10', error);
      await openModal('Error al guardar DiscapacidadCapitulo10', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo10');
    }

    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_ingresos_mensuales', discapacidadIngresosMensuales, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(97);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadIngresosMensuales', error);
      await openModal('Error al guardar DiscapacidadIngresosMensuales', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadIngresosMensuales');
    }

    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_11', discapacidadCapitulo11, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(98);
      console.log(response.data);
    } catch (error) {
      console.error('Error al guardar los datos de DiscapacidadCapitulo11', error);
      await openModal('Error al guardar DiscapacidadCapitulo11', 'danger', 'light');
      alert('Error al guardar los datos de DiscapacidadCapitulo11');
    }

    try {
      const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_discapacidad_capitulo_12', discapacidadCapitulo12, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPorcentaje(100)
      console.log(response.data);
      await openModal('Sincronización efectiva', 'success','light','none');
    } catch (error) {
      console.error('Error al guardar los datos', error);
      await openModal('Error al guardar', 'danger','ligth');
      alert('Error al guardar los datos');
    }
    

// SINCRONIZAR DE BAJADA USUARIOS
    try {
      const response = await axios.get('https://aws.cah.org.co/comision/cah/index.php/app_comisionsocial/welcome/fc_info');
      const jsonData = response.data;
     // setProgramas(jsonData);
     console.log(jsonData)
      for (const item of jsonData) {
        await db.run(`INSERT OR REPLACE INTO t1_comision (id_usuario, cedula, contrasena, estado) VALUES (?, ?, ?, ?);`, [
          item.ID_USUARIO, item.CEDULA, item.CONTRASENA,item.ESTADO
        ]);
      }

      saveDatabase();
     // fetchLocalizacionEvento();
    } catch (err) {
      console.error('Error al exportar los datos JSON: t1_programas', err);
    }

    // try {
    //   const response = await axios.post('https://zdeiby.castelancarpinteyro.com/apicomision/index.php/Welcome/fc_guardar_infraccion_autorizacion', autorizacion, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   //await openModal('Error al guardar', 'danger','ligth');
    //   setPorcentaje(100)
    //   console.log(response.data);
    //   await openModal('Sincronización efectiva', 'success','light','none');
    // } catch (error) {
    //   console.error('Error al guardar los datos', error);
    //   await openModal('Error al guardar', 'danger','ligth');
    //   alert('Error al guardar los datos');
    // }

    setSincro(false);


  }




  const history = useHistory();
  const cedula = localStorage.getItem('cedula'); // Obtener 'cedula' de localStorage

  useEffect(() => {
    // Comprobar si 'cedula' existe, si no, redirigir a 'login'
    if (!cedula) {
      history.push('/login');
    }
  }, [cedula, history]); // Dependencias del efecto



  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);
  const toggleAccordion = () => {
    if (!accordionGroup.current) {
      return;
    }
    const nativeEl = accordionGroup.current;

    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };

  const handleEditClick = (idfiu: string) => {
    window.location.href = `/tabs/ciudadano/${idfiu}`;
  };

  const [searchText, setSearchText] = useState('');


  const filteredPeople = inclusionCiudadanoJoin.filter((inclusionCiudadanoJoin) => {
    return (
      ((inclusionCiudadanoJoin.estado === 1 ? 'Abierto' : 'Cerrado').toLowerCase().includes(searchText.toLowerCase())) ||
      (inclusionCiudadanoJoin.id_usuario || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
      (inclusionCiudadanoJoin.yearpostulacion || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
      (inclusionCiudadanoJoin.tipodedocumento || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
      (inclusionCiudadanoJoin.numerodedocumento || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
      (inclusionCiudadanoJoin.nombre1 || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
      (inclusionCiudadanoJoin.apellido1 || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
      (inclusionCiudadanoJoin.correoelectronico || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
      (inclusionCiudadanoJoin.telcontactouno || '').toString().toLowerCase().includes(searchText.toLowerCase()) ||
      (inclusionCiudadanoJoin.fecharegistro || '').toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });
  

  const [modalResolve, setModalResolve] = useState<null | (() => void)>(null);
  const [texto, setTextoModal] = useState<null | (() => void)>(null);
  const [color, setColorModal] = useState<null | (() => void)>(null);
  const [mensaje, setMensaje] = useState<null | (() => void)>(null);
  const [displaymodal, setDisplaymodal] = useState<null | (() => void)>(null);

  const openModal = (mensaje,color,texto,displaymodal='') => {
    setTextoModal(texto);
    setColorModal(color);
    setMensaje(mensaje);
    setDisplaymodal(displaymodal);
    return new Promise<void>((resolve) => {
      setModalResolve(() => resolve);
      setShowModal(true);
    });
  };

  const closeModal = () => {
    setShowModal(false);
    
    if (modalResolve) {
      modalResolve();
    }
  };

  const aceptar = () => {
   setSincro(false)
  };

 
  return (

    <IonPage>
      {(sincro) ? <>
        <div className="container">
          <div className="progress-container">
            <label htmlFor="">Sincronizando</label>
            <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${porcentaje}%` }}></div>
            </div>
          </div>
        </div>
        <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'} `} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className={`modal-content bg-${color} text-light`}>
          
              <h1 className="modal-title fs-5" id="staticBackdropLabel"></h1>
            
            <div className="modal-body">
              {mensaje}
            </div>
            <div className="d-flex pt-2 pb-2 p-2 text-right d-flex justify-content-end">
              {/* <button type="button" className="btn btn-light" style={{ display: `${displaymodal}` }} onClick={aceptar}>Cancelar</button>&nbsp;  */}
              <button type="button" className={`btn btn-${color}`}  onClick={closeModal}>Continuar</button>
            </div>
          </div>
        </div>
      </div>
  
        </>


        : <>
          {cedula ? (

            <>
              <IonHeader>
                <IonToolbar>
                  <IonTitle slot="start">Cobertura</IonTitle>
                  <IonButton color="danger" slot="end" onClick={() => {
                    //localStorage.removeItem('cedula');
                    window.location.href = `/tabs/ciudadano/${Math.random().toString().substr(2, 5)}${cedula}`;
                  }}>Caracterizar nuevo</IonButton>
                  <IonButton slot="end" color="success" onClick={downloadFile}>Descargar bd</IonButton>
                  <IonButton slot="end" onClick={() => {
                    localStorage.removeItem('cedula');
                    history.push('/login'); // Redirigir a login después de borrar 'cedula'
                  }}>Cerrar Sesión</IonButton>
                </IonToolbar>
              </IonHeader>
              <IonContent fullscreen>

                <IonList>
                  <IonItem lines="none">
                    <div className="ion-align-items-center" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                      <IonLabel style={{ width: '20%' }}>Opciones</IonLabel>
                      <IonLabel style={{ width: '25%' }}>Estado</IonLabel>
                      <IonLabel style={{ width: '25%' }}>Nombre</IonLabel>
                      <IonLabel style={{ width: '25%' }}>Profesional</IonLabel>
                    </div>
                  </IonItem>
                </IonList>

                <IonList>
                {filteredPeople.map((inclusion_ciudadano, idx) =>
                  <IonAccordionGroup key={idx}>
                    <IonAccordion value="first">
                      <IonItem slot="header" color="light">
                        <IonLabel>
                          <IonButton onClick={() => handleEditClick(inclusion_ciudadano.id_usuariociu)}>
                            Editar
                          </IonButton>
                        </IonLabel>
                        <IonLabel>
                          <h2>{(inclusion_ciudadano.estado === 1) ? 'Abierto' : 'Cerrado'}</h2>
                        </IonLabel>
                        <IonLabel>
                        <h2>{inclusion_ciudadano.nombre1} {inclusion_ciudadano.nombre2} {inclusion_ciudadano.apellido1} {inclusion_ciudadano.apellido2}</h2>
                        </IonLabel>
                        <IonLabel>
                          <h2>{inclusion_ciudadano.usuario}</h2>
                        </IonLabel>
                      </IonItem>

                      <div className="ion-padding" slot="content">
                        <IonList>
                          <IonItem>
                            <IonLabel>
                              <p>Año de Postulación</p>
                              <h2>{inclusion_ciudadano.yearpostulacion}</h2>
                            </IonLabel>
                          </IonItem>
                          {/*<IonItem>
                             <IonLabel>
                              <p>Documento</p>
                              <h2>{inclusion_ciudadano.tipodedocumento}</h2>
                            </IonLabel> 
                          </IonItem>*/}
                          <IonItem>
                            <IonLabel>
                              <p>Número de Documento</p>
                              <h2>{inclusion_ciudadano.numerodedocumento}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>ID Usuario</p>
                              <h2> {inclusion_ciudadano.id_usuario}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Fecha de Nacimiento</p>
                              <h2>{inclusion_ciudadano.fechadenacimiento}</h2>
                            </IonLabel>
                          </IonItem>
                          {/* <IonItem>
                            <IonLabel>
                              <p>Sexo</p>
                              <h2>{inclusion_ciudadano.sexo}</h2>
                            </IonLabel>
                          </IonItem> */}
                         {/* <IonItem>
                             <IonLabel>
                              <p>Nacionalidad</p>
                              <h2>{inclusion_ciudadano.nacionalidad}</h2>
                            </IonLabel> 
                          </IonItem>*/}
                          <IonItem>
                            <IonLabel>
                              <p>Correo Electrónico</p>
                              <h2>{inclusion_ciudadano.correoelectronico}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Teléfono 1</p>
                              <h2>{inclusion_ciudadano.telcontactouno}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Teléfono 2</p>
                              <h2>{inclusion_ciudadano.telcontactodos}</h2>
                            </IonLabel>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <p>Fecha de Registro</p>
                              <h2>{inclusion_ciudadano.fecharegistro}</h2>
                            </IonLabel>
                          </IonItem>
                        </IonList>
                      </div>
                    </IonAccordion>
                  </IonAccordionGroup>
                )}

                </IonList>

              </IonContent>
              <IonSearchbar
                value={searchText}
                onIonInput={(e) => setSearchText(e.detail.value)}
                placeholder="Buscar por estado, año, nombre, etc."
              />
              <IonButton onClick={sincronizacion}>Sincronización subida de información</IonButton>

            </>
          ) : ''}

        </>}
    </IonPage>
  );
};

export default Cobertura;
