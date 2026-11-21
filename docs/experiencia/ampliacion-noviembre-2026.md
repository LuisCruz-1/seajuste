# Experiencia: ampliación documental de noviembre de 2026

## Resultado y límites

- Catálogo inicial: 19 fichas. Se añaden **21** y quedan **40**, en español e inglés.
- La ficha existente `jaramijo` pasa de referencia general a **motor 5, 2014**,
  conservando su URL. El motor 10 de 2013 tiene una ficha distinta; no queda una
  tercera ficha general contada como otro caso de Jaramijó.
- Veinte altas proceden de la conciliación del inventario de 35 registros. La
  alta restante es la inspección de Milagro documentada en una portada de 2010.
- Las fichas no equivalen a 40 siniestros independientes confirmados, pagos
  verificados o resultados favorables. Se distinguen reclamos, surveys y
  evaluaciones técnicas; algunas fichas conservan antecedentes agrupados.
- Se mantienen los cuatro importes previamente publicados en el brochure. No se
  incorporan nuevas cuantías, causas definitivas ni cambios de cobertura desde
  los apuntes.
- No se ejecutaron pruebas, lint, build, recorridos ni capturas del sitio.
  Las reproducciones y hojas de contacto utilizadas pertenecen a documentos y
  fotografías de origen, no al sitio.
- No se efectuó commit ni push para esta ampliación.

## Revisión completa de la carpeta nueva

Se recorrió `INTERVENCIONES FALTANTES/` recursivamente. En esta entrega contiene
ocho archivos en su raíz y ninguna subcarpeta. Todos se abrieron y extrajeron
individualmente antes de establecer equivalencias por contenido o SHA-256.
Los originales no se modificaron.

Los identificadores `M` y `N` son referencias editoriales usadas en `sourceIds`;
no son números de contrato. Los identificadores `D`, `P` y `J` pertenecen a la
revisión anterior y conservan su significado.

| ID | Archivo | Bytes | Tratamiento y hallazgos |
| --- | --- | ---: | --- |
| N01 | `BROCHURE 05-10-2026 V2.pdf` | 38.413.742 | Lectura del texto de sus 53 páginas y revisión visual de todas las láminas. Se ampliaron las pp. 8–11 y 28–29 para verificar identificación de transformadores y fechas. |
| M001 | `Informe_Organizacion_Siniestros_SEAJUSTE.docx` | 41.303 | Lectura íntegra de categorías, registros, discrepancias y reservas. No tiene imágenes. Coincide por SHA-256 con D083, pero se revisó su contenido en esta entrega. |
| M002 | `SEAJUSTE_Inventario_Experiencia_Documentada_Fotografico_2026.docx` | 42.519 | Lectura de las 35 fichas en tablas y sus controles internos. Sus recuadros fotográficos están vacíos. Coincide por SHA-256 con D091. |
| M003 | `SEAJUSTE_Trazabilidad_Detallada_35_Registros_y_Fotografias.docx` | 38.537 | Lectura individual de los 35 registros, ubicaciones, estado de imagen y conclusión metodológica. No contiene fotografías. |
| M004 | `WEB Y BROCHURE (1) docx.docx` | 23.192 | Lectura completa de las notas históricas. No contiene imágenes. Incluye contratos, adendas, cronologías y cifras contradictorias; no se descartó por su nombre parecido a otras versiones. |
| M005 | `WEB Y BROCHURE(2) (1).docx` | 6.859.136 | Lectura de notas y secciones posteriores; extracción y revisión de 79 recursos incrustados. Añade detalle de designaciones, motores de Jaramijó, Manta II y unidad 2 de La Propicia respecto de M004. |
| M006 | `WEB Y BROCHURE(2).docx` | 6.859.136 | Extracción individual de texto y 79 recursos. Solo después se comprobó igualdad binaria con M005 y equivalencia del texto y las imágenes. No constituye evidencia independiente adicional. |
| M007 | `WEB Y BROCHURE.docx` | 6.056.867 | Lectura del documento completo y revisión de sus 78 recursos. Son principalmente capturas y textos de Criteria/E-tec y otras referencias ajenas; no se convierten en experiencia de SEAJUSTE. Coincide por SHA-256 con D080. |

M005 y M006 coinciden además con D101 del material anterior. M004 es una versión
sin imágenes ni varias de las notas finales de aquellos documentos: **no** se
consideró equivalente ni se omitió. M005/M006 contienen una imagen cartográfica
junto a los apuntes de transmisión; su posición no acredita una fotografía de
daños de la línea ni de otro equipo próximo en el texto.

### Huellas de los originales

| ID | SHA-256 |
| --- | --- |
| N01 | `8d0496c5dc4f4c15e99cd4b1f17462f4f769980d8699c2105083c38c7072c6dd` |
| M001 | `1c8b89428d907678f179e82fe8c38bfc236748bb1da0f8a11c37e7097a99e8be` |
| M002 | `acf49ee69809d63bd47a9a8bfceca728e9cfbf71c050e6ac47d1288ba48b1922` |
| M003 | `8a3f627173d27fce8c7401f80b1e6c14c335ee730843b8da76056315437c3a43` |
| M004 | `4220fd2456ee59d69496242aac93cd986b7934b773adac98188dbb7e241ba513` |
| M005 | `2bef0618cecb355cd67dcfb35013f1eb117665de3cc0cca4c561f99a69e1402f` |
| M006 | `2bef0618cecb355cd67dcfb35013f1eb117665de3cc0cca4c561f99a69e1402f` |
| M007 | `ec4b6b037df24b98ca6bdd92ffbdd50949dbffdb6a97b8c1eff4e9f867333559` |

## Correspondencia de los 35 registros, sin omisiones

La numeración corresponde al orden de M002/M003, no al orden de tarjetas del
sitio. «Existente» no convierte las reservas del nuevo inventario en un dictamen
favorable; la fuente pública anterior conserva su propia evidencia.

| N.º | Registro | Destino en el catálogo | Decisión y reserva |
| ---: | --- | --- | --- |
| 01 | T-01 · Mitsubishi, Pascuales | Existente `pascuales` | Se conserva el reporte técnico y sus fotos identificadas. No se trasladan esas imágenes a bancos Westinghouse. |
| 02 | T-02 · Pauwels, Milagro | **Nueva `milagro`** | Reclamo de diciembre de 2006, sin elegir entre días 3/4/6 ni publicar importes. Vista de instalación contextual, no del daño de 2006. |
| 03 | T-03 · Mitsubishi, Machala | **Nueva `machala`** | Evento referido a mayo de 2005 y convenio de ajuste. No se afirma un cambio de cobertura ni un pago. |
| 04 | T-04 · CENEMESA fase C | **Nueva `trinitariaPhaseC`** | Encargo 022-99. Se declara la discrepancia 1998/1999; no se escoge un año por conveniencia. |
| 05 | T-05 · CENEMESA fase B | **Nueva `trinitariaTransport`**, junto con TR-01 | Conserva las dos líneas documentales sin afirmar que sean idénticas ni contar dos pérdidas antes del cotejo. |
| 06 | T-06 · Westinghouse fase B | **Nueva `pascualesPhaseB`** | Mayo de 1997, contrato 019-99 y adenda 077-2000. Distinto del Mitsubishi de 2006. |
| 07 | T-07 · Westinghouse fases A/C | **Nueva `pascualesPhasesAC`** | Un registro agrupado; las notas no resuelven la asignación individual de contratos 020-99/021-99 y fases. No se suman cifras. |
| 08 | T-08 · Transformador auxiliar | **Nueva `auxiliaryTransformer`** | Referencia 102-07, sin fecha o causa inferidas. Separado de TG-5, 103-07. |
| 09 | G-01 · TG-5 | Existente `tg5` | Importe del brochure conservado; no se reconstruye el desglose con diferencia de USD 45.000. |
| 10 | G-02 · TG-4 | Existente `tg4` | Se conserva la referencia 096-07 y el resultado publicado, sin sumar un lucro cesante aparte. |
| 11 | G-03 · Generador Trinitaria | Existente `tv1`, precisada | Se explican las menciones de febrero/mayo de 2001 sin contarlas como dos eventos confirmados. Se separa de 078-99. |
| 12 | G-04 · Unidad Trinitaria, 1998 | **Nueva `trinitaria1998`** | Referencia 078-99 y gestiones de reaseguro en notas. No hereda la cuantía de TV-1. |
| 13 | G-05 · TG-3, Santa Rosa | **Nueva `santaRosaTg3`** | Se conserva 1998, sin resolver octubre/diciembre ni presentar una indemnización favorable. |
| 14 | G-07 · Generador Hidroagoyán | **Nueva `agoyan`** | Evaluación técnica de acuñado y aislamiento. No se clasifica como ajuste de un siniestro ni se atribuye a SEAJUSTE la ejecución de ensayos. |
| 15 | TR-01 · Transporte Trinitaria–Pascuales | Integrada en **`trinitariaTransport`** | Se explicita la relación pendiente con T-05. No se suman capital e intereses. |
| 16 | TR-02 · Transporte ABB | **Nueva `abbTransport`** | 33 MVA, 138/69 kV, referencia 123-2007. Junio de 2006 sin escoger día 22/23. |
| 17 | C-01 · Sistema B de alimentación | **Nueva `feedwaterSystem`** | Referencia 008-01, diciembre de 2000. No se asimila a 097-07 por pertenecer a la misma central. |
| 18 | C-02 · Bomba multietapas | Existente `pump` | Referencia 097-07. La fecha del informe no se convierte en fecha de ocurrencia. |
| 19 | C-03 · Bomba, referencia 2007 | Integrada como nota en `pump` | No hay elementos para contar un segundo siniestro; se conservan propuesta y menciones de 2007 sin afirmarlo idéntico a C-02. |
| 20 | C-04 · Caldera Termoesmeraldas | Existente `boiler` | Referencia 00086-11 y registro del brochure; sin nueva cuantía. |
| 21 | M-01 · Motor 5, Guangopolo | **Nueva `guangopolo`** | Se conserva embalamiento, daño material y lucro cesante. Contratos 0001/0004 con relación de alcance pendiente, sin sumas ni marca supuesta. |
| 22 | M-02 · Motor 5, Jaramijó | Existente `jaramijo`, precisada | Referencia de 2014, memorando y contratación en notas. No se añaden causa, cilindro o repuestos supuestamente vinculados. |
| 23 | M-03 · Motor, La Propicia | **Nueva `propicia`** | M005/M006 completan unidad 2, Mirrlees Blackstone, 6707-2, 4.100 kW y noviembre de 2008. No se publica la cifra transcrita. |
| 24 | M-04 · Motor 10, Jaramijó | **Nueva `jaramijo10`** | Julio de 2013, convenio 006-2016. Se omiten causas definitivas, culpa de mantenimiento y conclusiones de garantía. Unidades 11/12 no se cuentan como dos casos más. |
| 25 | M-05 · MDU 6, Manta II | **Nueva `manta2`** | Referencia histórica de alcance limitado, identificada por central y unidad. Sin marca, fecha, reparación o resultado inventados. |
| 26 | E-01 · Paute–Pascuales | **Nueva `pauteLine`** | Estructuras 118–123, contrato 048-2000 y resolución JB-2001-346. Se mantiene la variante cronológica; no se publica la suma contradictoria. |
| 27 | E-02 · Alimentador 13,8 kV | **Nueva `trinitariaFeeder`** | Referencia 077-99, evento de 1998 y contratación posterior diferenciados. |
| 28 | E-03 · Seccionador 13,8 kV | **Nueva `trinitariaDisconnector`** | Identificación independiente del alimentador, sin fecha, contrato o causa supuestos. |
| 29 | E-04 · Disyuntor y pararrayos | **Nueva `santaRosaSwitchgear`** | Referencia 039-99 y marzo de 1999. No se confunde con el rotor TG-3. |
| 30 | O-01 · Artefacta | Existente `artefacta` | La mención escueta del inventario no sustituye la evidencia y el importe del brochure ya publicados. No se crea otro caso de Artefacta. |
| 31 | O-02 · Torre/Punta Centinela/Manta | Nota de identificación en `buildings`; nombres pendientes | El brochure respalda las inspecciones en Guayaquil/Manta, pero no identifica sus fotos como Torre Centinela o Punta Centinela. No se afirma que sean los mismos expedientes ni se crean tres reclamos. |
| 32 | S-01 · Survey TG-5 | Existente `cargo` | Contrato 048-03 de 2003, distinto del reclamo de maquinaria y de la operación portuaria de 2009. |
| 33 | S-02 · Barcaza Ulises | Referencia nominal en `barge` | Se conserva el nombre del inventario, pero no se atribuye a las fotografías un buque que no identifican. No se contabiliza otro survey de identidad incierta. |
| 34 | S-03 · Paute, impulsor Pelton | **Reservado, sin ficha independiente** | La nota «fotos» y el inventario no identifican por sí solos fecha, unidad, alcance o imagen concreta de una intervención. No se reutilizan las cartas históricas de Paute como si fueran fotos del rodete. |
| 35 | S-04 · Boroscopía | **Reservado, sin ficha independiente** | Se menciona un procedimiento, pero no se identifica equipo, instalación ni encargo. No se inventa un caso para completar una cifra. |

### Registro adicional: inspección de Milagro de 2010

La página 11 de N01 reproduce una portada de Crompton Greaves:

- «Inspection Report», 22 de marzo de 2010.
- Autotransformador Pauwels, 225 MVA, 230/138/13,8 kV.
- Serie 99.4.0053; subestación Milagro.
- Carlos Quevedo figura entre los participantes en sitio.

Se incorpora como **`milagro2010`**, de naturaleza survey. La portada acredita
esa identificación y participación, pero no permite atribuir a SEAJUSTE la
autoría del informe del fabricante, detallar ensayos o afirmar sus conclusiones.
No se identifica el reporte de 2010 como acta o fotografía del reclamo de 2006.
La fotografía se describe como imagen incluida en la portada, no como una toma
con fecha de captura verificada.

## Búsqueda y asociación de imágenes

Se contrastaron las tres ubicaciones solicitadas:

| Ubicación | Material localizado y tratamiento |
| --- | --- |
| `INTERVENCIONES FALTANTES/` | Sin fotografías sueltas. Los siete Word contienen 236 referencias a medios, con 79 recursos binarios únicos; M001–M004 no contienen imágenes. Se revisaron los recursos de M005–M007 y las 53 páginas del PDF. |
| `Contenido para Pagina experiencia/` | Se retomaron la extracción y trazabilidad previas de documentos, imágenes incrustadas y PDF. Se revisaron de nuevo las 30 fotografías JPG sueltas, los documentos de identificación y los antecedentes específicos de Jaramijó. |
| `public/` | Se inventariaron 255 recursos raster ya existentes. Se revisaron mediante hojas de contacto los 178 de `images/projects/`, `images/services/` e `images/experience/`, contrastándolos con páginas y pies de origen; no se dedujo un caso desde un nombre de archivo. |

Los recuentos de `public/` son previos a los dos WebP de esta ampliación; incluyen
variantes y recortes y **no** son un recuento de fotografías originales únicas.
La repetición binaria o visual se utilizó para localizar procedencia, nunca para
deducir que dos siniestros eran el mismo.

### Asociaciones añadidas

| Ficha | Recurso | Correspondencia y límite |
| --- | --- | --- |
| `milagro` | `/images/services/damaged-transformer.webp`, ya existente | La misma vista está identificada en N01, p. 10, como S/E Milagro. Solo referencia de instalación, marcada contextual; no prueba de daño ni de fecha de 2006. |
| `milagro2010` | `/images/experience/milagro-inspection-2010.webp`, nuevo | Recorte de la fotografía incluida en la portada de N01, p. 11. Su correspondencia con ese informe está documentada en la misma lámina. |
| `milagro2010` | `/documents/experience/milagro-inspection-2010.pdf` y `.webp`, nuevos | Extracto de identificación de portada, 1296 × 1651 px. Conserva equipo, serie, fecha, cliente y lugar; omite el listado de personas. No es el informe completo. |

Las otras **19 fichas nuevas** mantienen `images: []`. No se les asignan
fotografías similares de transformadores, motores, maquinaria o instalaciones.
Las tarjetas y páginas utilizan la presentación documental ya existente.

Las imágenes contextuales anteriores de Jaramijó se conservan con aclaración:
identifican la central y mantenimiento posterior, no el motor 5 siniestrado.
No se copian a la ficha del motor 10. Las imágenes de bomba de 2023 tampoco
se trasladan al sistema B de 2000.

### Asociaciones descartadas o pendientes

- N01, pp. 8–9: muestran transformadores dañados, pero no identifican
  inequívocamente Westinghouse/CENEMESA, fase y expediente. No se asignan a los
  reclamos nuevos por parecido visual.
- N01, p. 10: los detalles DTC se identifican como archivo de Milagro, pero no
  acreditan pertenecer al evento de 2006. No se publican como daños de ese evento
  ni se les atribuye automáticamente la fecha del reporte de la página siguiente.
- N01, pp. 28–29: la secuencia de transporte e instalación Pauwels no documenta
  el transporte ABB Pascuales–Machala ni el CENEMESA de julio de 1999.
- Capturas de incendio de LinkedIn y recursos con marca de agua: no constituyen
  evidencia identificada de los nuevos reclamos.
- Fotografías de Caterpillar/Cummins y cigüeñales navales: no se asignan a
  Guangopolo, La Propicia, Manta II o Jaramijó por ser también motores.
- Capturas y textos de Criteria, E-tec y otras firmas: referencias de terceros,
  excluidas de la experiencia y fotografías atribuidas a SEAJUSTE.

## Otras menciones de los documentos, fuera del inventario

Se conservaron en sus originales, sin crear fichas adicionales por falta de
identidad suficiente:

- Disyuntor Westinghouse en SF6: sin correspondencia inequívoca de instalación,
  fecha o contrato; no se asimila automáticamente al disyuntor de Santa Rosa.
- TG-4, contrato 074-2000: mención aislada sin cronología de evento que permita
  separarlo del resto de apuntes; no se cuenta como un nuevo reclamo confirmado.
- Reparación por Babcock Wilcox: sin unidad, fecha y encargo individualizados;
  no se asigna a una turbina por proximidad textual.
- Unidades TM1–TM6 de Bajo Alto y fichas generales de fabricantes: describen
  instalaciones o tecnología, no demuestran por sí solas otro encargo.
- Textos de Inicio, Servicios, Nosotros, Equipo, Contacto y acreditaciones:
  revisados como parte de los documentos, pero fuera del alcance de esta edición.

## Implementación y conservación

La ampliación utiliza únicamente:

- `src/lib/experience/cases.ts`: catálogo, textos bilingües y relaciones.
- `src/lib/experience/routes.ts`: 21 pares de slugs nuevos; se conservan las
  19 URLs anteriores en ambos idiomas.
- `src/lib/experience/types.ts` y `copy.ts`: filtro bilingüe de transmisión y
  equipos eléctricos, y aclaraciones de lectura del archivo.
- Los tres recursos nuevos de Milagro y esta documentación editorial.

El sitemap, los metadatos y el cambio de idioma ya consumen el registro propio
de Experiencia; no se cambia el catálogo compartido `src/lib/content.ts`, los
componentes, los estilos ni las demás páginas.

La revisión del grafo se acompañó de lectura directa porque la cobertura
indicaba cambios de metadatos. No se interpreta «sin incidencia registrada»
como garantía de exhaustividad, ni se presenta la revisión de fuentes como una
prueba del funcionamiento del sitio.
