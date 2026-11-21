# Experiencia: selección y trazabilidad del contenido

## Alcance

Trabajo limitado a la página de Experiencia y sus subpáginas, en español e inglés.
No se modifica el catálogo compartido de casos de `src/lib/content.ts`, porque
Inicio y los detalles de Servicios lo utilizan. Los nuevos componentes, textos,
estilos y recursos tienen directorios propios de Experiencia.

La integración en archivos compartidos se limita a resolver las rutas, los
metadatos, el cambio de idioma y las entradas de Experiencia en el sitemap.
Se conservan las doce URLs de detalle que ya existían.

La ampliación de noviembre conserva también las siete URLs añadidas en la
primera revisión. El catálogo actual reúne **40 fichas bilingües**, frente a las
19 iniciales. La revisión de los ocho archivos de `INTERVENCIONES FALTANTES/`,
la correspondencia de los 35 registros y las reservas fotográficas se detallan en
[ampliacion-noviembre-2026.md](./ampliacion-noviembre-2026.md).

No se han ejecutado pruebas, lint, build, recorridos del sitio ni capturas de la
web, conforme a la instrucción vigente. Las imágenes de revisión fueron hojas
de contacto y reproducciones de los documentos de origen, no capturas del sitio.

## Material examinado

Carpeta de origen: `Contenido para Pagina experiencia/`, con recorrido recursivo
de sus tres subcarpetas y carpetas anidadas.

| Formato | Archivos | Tratamiento |
| --- | ---: | --- |
| Word | 100 | Extracción de párrafos, tablas, relaciones e imágenes incrustadas. |
| PDF | 10 | Extracción del texto disponible y revisión visual de páginas escaneadas y láminas. |
| Excel | 1 | Lectura de la hoja, celdas y posición de las fotografías. |
| JPG | 30 | Revisión visual y detección de copias, capturas y fotografías técnicas. |
| **Total** | **141** | Los originales se conservan sin cambios. |

Se detectaron copias documentales exactas y versiones próximas. El contenido de
Office se agrupó por texto normalizado para evitar utilizar las copias como
evidencias independientes. Las 418 imágenes raster únicas extraídas de Office,
las fotografías sueltas y las láminas PDF se revisaron mediante hojas de contacto;
los documentos materiales para las fichas se consultaron con mayor detalle.
El recurso WMF diminuto de un borrador de CTA no se utiliza.

Los extractos y archivos intermedios de trabajo quedan fuera del sitio, en la
carpeta temporal de OpenCode. No se publican los Word, el Excel ni el archivo
documental completo.

## Fuentes seleccionadas

Las rutas siguientes son relativas a la carpeta de origen.

- `Brochure_SEAJUSTE_2026_Rediseno.pdf`: identificación de casos, registro gráfico,
  resultados ya publicados y descripción de trabajos en infraestructura y vehículos.
- `WEB ACTUALIZACION/MARINE CARGO/BROCHURE actualizado 28-09-2026 rev 2.pdf`:
  contraste con el original ampliado. Las demás versiones se revisan como
  antecedentes, no como nuevos casos.
- `WEB ACTUALIZACION/MARINE CARGO/BROCHURE CARGA MARITIMA.pdf`: fotografías y
  contrato 048-03 de inspección de TG-5.
- `WEB ACTUALIZACION/MARINE CARGO/BROCHURE CARGO TURBINA UNIVERSO.pdf`:
  publicación de El Universo del 18 de diciembre de 2009.
- `WEB EXPERIENCIA/FOTOS SINIESTROS.xlsx`: seis registros de motores y grupos
  electrógenos, conservando su correspondencia con las imágenes de la hoja.
- `WEB EXPERIENCIA/WEB FOTOS/web fotos.pdf`: informes e identificación de
  equipos, especialmente el autotransformador de Pascuales y la unidad TG-4.
- `WEB EXPERIENCIA/WEB FOTOS/BOMBA TRINITARIA.docx`: referencia fotográfica de
  la bomba; no se utiliza como fotografía del siniestro histórico.
- `WEB EXPERIENCIA/WEB FOTOS/Fuentes_Fotograficas_Trinitaria_CEYM_EPN.docx`:
  corrección de procedencia y fecha de las imágenes de Trinitaria.
- `WEB EXPERIENCIA/WEB FOTOS/Fotos_Turbogenerador_ABB_Trinitaria_SEAJUSTE.docx`:
  identificación técnica, con las reservas expresas de su contenido.
- `WEB EXPERIENCIA/WEB FOTOS/JARAMIJO MOTOR 5 FOTOS.docx` y
  `JARAMIJO MOTORES.docx`: imágenes de referencia de instalación y mantenimiento,
  no prueba visual de los eventos de 2013 o 2014.
- `WEB EXPERIENCIA/WEB MOTORES/WEB FOTOS MOTORES.docx` y
  `SEAJUSTE_Especialidades_Motores_Generadores_Tierra_y_Propulsion_Marina.docx`:
  separación entre equipos terrestres y propulsión marina; reservas sobre
  identificación de modelos y conclusiones causales.
- `WEB REVISION/WEB SERVICIOS  Y EXPERIENCIA.docx`: identificación de encargos
  y antecedentes técnicos. Sus apuntes no se convierten en nuevas indemnizaciones.
- `WEB REVISION/Informe_Organizacion_Siniestros_SEAJUSTE.docx` y
  `SEAJUSTE_Inventario_Experiencia_Documentada_Fotografico_2026.docx`: control de
  duplicados y de reservas documentales, no evidencia de 35 siniestros confirmados.
- Fotografías originales sueltas de maquinaria y cigüeñales: registro técnico
  sin asignarles un buque, modelo o siniestro no identificado.

## Selección pública inicial

La primera revisión presentó **19 fichas**, que reunían casos, inspecciones y
registros técnicos. La tabla conserva esa selección inicial como antecedente;
la ampliación posterior añade 21 fichas y precisa Jaramijó como motor 5.
Ninguna de estas cifras se anuncia como número de siniestros independientes
confirmados ni de éxitos.

| Ficha | Criterio y fuente principal |
| --- | --- |
| TG-5, Dr. Enrique García | Brochure y antecedentes de maquinaria / lucro cesante. No se publica el desglose contradictorio. |
| TV-1, Trinitaria | Resultado del brochure. Fotografías posteriores identificadas como referencia del equipo. |
| TG-4, Gonzalo Zevallos | Resultado del brochure y antecedentes de generador / excitatriz. Imagen real de identificación de la unidad. |
| Artefacta | Referencia agrupada de varios locales. No se asigna el importe a cada fotografía ni se infiere causa de las imágenes. |
| Autotransformador Pauwels, carga | Damage survey marítimo. Se separa de averías posteriores en servicio en Milagro. |
| TG-5, del buque a la central | Survey contractual de 2003, distinto del reclamo de maquinaria TG-5. |
| Autotransformador Mitsubishi, Pascuales | Reporte técnico con fotografías. Sin fecha de ocurrencia ni importe inferidos de notas divergentes. |
| Caldera de Termoesmeraldas | Caso y daños de tubería del brochure. No se deduce causa única de la morfología de rotura. |
| Bomba de alimentación de Trinitaria | Antecedente técnico 097-07. Sin modelo OEM supuesto, sin cuantía y con fotografía contextual de 2023. |
| Motores de Jaramijó | Antecedente técnico general. No se fusionan eventos ni se presentan fotografías de mantenimiento como imágenes del siniestro. |
| Motores diésel y grupos electrógenos | Seis registros de la hoja Excel en una ficha de inspección, sin convertir sus notas en dictámenes definitivos. |
| Maquinaria de propulsión marina | Fotografías de apertura, cigüeñal y bancadas. Sin modelo específico, nombre de buque ni causa no acreditados. |
| Turbogeneradores, Guayaquil, 2009 | Antecedente hemerográfico distinto del contrato TG-5 de 2003. Cita breve; sin reproducir el artículo completo ni su fotografía. |
| Power Barge Survey | Inspección de sistemas a bordo y conexión a tierra. No se presenta como indemnización. |
| Excavadora / equipo caminero | Inspección rural y secuencia de revisión en taller del brochure. |
| Edificios, Guayaquil y Manta | Registro del brochure, sin identificar inmuebles de apuntes insuficientes. |
| Vías del puerto de Esmeraldas | Registro de daños y reparación del brochure. |
| Accidentes urbanos | Registro de reconstrucción e inspección del brochure. |
| Transporte pesado | Registro de diagramas, evidencias e inspección del brochure. |

## Cuantías y datos discrepantes

Se conservan únicamente los cuatro importes ya publicados y aprobados:

| Referencia del brochure | USD |
| --- | ---: |
| TG-5 | 8.253.493,28 |
| TV-1 | 1.947.668,80 |
| TG-4 | 1.624.063,03 |
| Artefacta, varios locales | 2.000.000,00 |

Esto conserva la información publicada; **no constituye una nueva verificación
de actas o comprobantes originales**. Las fichas indican que son importes del
brochure y resultados históricos.

- TG-5: el inventario interno advierte una diferencia de USD 45.000 entre un
  desglose y el total publicado. No se publica ni se reconstruye ese desglose.
- TV-1: existen apuntes con terminación decimal `,90`; se mantiene `,80`, que
  consta en el brochure y en el contenido previamente aprobado.
- Pascuales, Milagro, transporte ABB, Guangopolo y líneas de transmisión:
  se distinguen valores reclamados, liquidados e indemnizados, y no se suman.
- No se mezclan honorarios, impuestos, presupuestos de repuestos, deducibles o
  intereses con indemnizaciones.
- La potencia aparente del generador, la potencia activa de una central y la
  potencia del motor no se usan como magnitudes intercambiables.

## Material excluido o reservado

1. **Contenido de terceros.** Los apartados de Criteria y E-tec en
   `WEB FOTOS/WEB Y BROCHURE.docx` y en la parte posterior de
   `WEB REVISION/WEB Y BROCHURE(2).docx` son referencias ajenas. No se utilizan
   como experiencia, equipo, cobertura territorial, servicios ni cifras de SEAJUSTE.
2. **Borradores de otras páginas.** Textos de empresa, misión, visión, historia,
   Servicios, Equipo, Contacto, formularios, carrusel y CTA se clasifican como
   fuera del alcance. Sus instrucciones antiguas no sustituyen las decisiones
   posteriores del usuario.
3. **Material administrativo.** Manuales de dominios/hosting, conversaciones
   sobre CTA y logística de viaje/inscripción a ALSUM no alimentan las fichas.
   Una intención de asistir no se presenta como asistencia ni acreditación.
4. **Cifras sin respaldo.** Se descartan contadores de borradores como `15k`
   casos, porcentajes promocionales, supuestos resultados globales y la suma
   propuesta de importes de distinta naturaleza.
5. **Fotografías sin identificación suficiente.** No se usan capturas de LinkedIn
   de un incendio como evidencia del incendio de Pascuales. Se excluyen imágenes
   comerciales con marca de agua y las fotografías personales incrustadas al
   final del Excel.
6. **Imágenes de Trinitaria.** La fuente advierte que una imagen del brochure
   era provisional y no correspondía a la central. En Experiencia se sustituye
   por referencias identificadas y con fecha/aclaración. No se alteran las
   fotografías que otras páginas utilizan.
7. **Modelos supuestos.** No se identifica la bomba histórica como Flowserve WDX
   por semejanza de manuales. No se asigna una variante 3516C ni una ficha de
   fabricante a las fotografías navales sin verificación.
8. **Antecedentes por completar.** La reserva inicial sobre La Propicia, Manta II,
   Guangopolo, transmisión y varios transformadores se reconsideró en la
   ampliación de noviembre: se incorporan como referencias históricas con límites
   expresos, no como nuevas indemnizaciones acreditadas. Papallacta, trigo a
   granel y trabajos genéricos para La Nacional siguen sin individualizarse.
   Paute/Pelton y boroscopía tampoco se convierten en encargos independientes por
   la sola mención de fotografías o de un procedimiento. El inventario preliminar
   no sustituye contratos, informes, actas ni autorización.
9. **Historia ya desarrollada.** Paute / The Salvage Association, gestiones en
   Londres y acta de finiquito de ex INECEL no se vuelven a desarrollar como
   bloques duplicados de Nosotros ni se suman a los cuatro casos publicados.

## Recursos publicados y conservación

- Fotografías nuevas optimizadas como WebP en `public/images/experience/`.
- Un extracto de la cláusula de objeto del contrato TG-5 en
  `public/documents/experience/`, identificado como extracto y no contrato completo.
- Las fotografías históricas preexistentes se reutilizan sin sobrescribirlas.
- Las imágenes conservan pies que distinguen siniestro, inspección, instalación
  y mantenimiento posterior.
- No se publican firmas del contrato, cuentas, honorarios, documentación de
  reclamación íntegra ni datos personales del Excel.
- La ampliación agrega una fotografía de la portada del informe de Milagro de
  2010 y un extracto de identificación en PDF/WebP, sin el listado de personas.
  La vista de Milagro ya existente se reutiliza solo como referencia de
  instalación, no como fotografía del evento de 2006.
