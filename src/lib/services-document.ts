import { text, type Localized } from "./i18n";

export type ServiceDocumentPhoto = { image: string; caption: Localized; alt: Localized };
type ServiceDocumentSpecialty = {
  id: string;
  title: Localized;
  subtitle: Localized;
  note?: Localized;
  description: Localized;
  photos: ServiceDocumentPhoto[];
};

// Content and photograph order follow the eight-page servicios.pdf reference.
export const servicesDocument = {
  introduction: {
    title: text("Peritaje técnico-legal de reclamos y siniestros", "Technical and legal surveying of claims and losses"),
    statement: text("Ingeniería especializada aplicada a seguros · Investigación de causas y evaluación de pérdidas", "Specialist engineering applied to insurance · Cause investigation and loss assessment"),
    paragraphs: [
      text(
        "SEAJUSTE S.A. presta servicios de peritaje, investigación técnica, evaluación de daños y ajuste de reclamos y siniestros, integrando ingeniería especializada con conocimiento de pólizas y experiencia profesional en el mercado asegurador desde 1987. Intervenimos en riesgos industriales, energéticos, marítimos y otros bienes e instalaciones que requieren análisis técnico riguroso y criterios de seguros debidamente sustentados.",
        "SEAJUSTE S.A. provides surveying, technical investigation, damage assessment and claims and loss adjusting services, combining specialist engineering with policy knowledge and professional experience in the insurance market since 1987. We work on industrial, energy and marine risks, as well as other property and facilities requiring rigorous technical analysis and substantiated insurance judgement.",
      ),
      text(
        "Cada encargo se aborda a partir de la verificación de hechos y circunstancias, la identificación de evidencias, el análisis de causa y origen, la determinación de la naturaleza y extensión de los daños y la evaluación de alternativas de reparación, reposición o recuperación. Cuando corresponde, incorporamos pruebas especializadas, análisis de costos, cuantificación de pérdidas y revisión técnica de las condiciones de póliza, coberturas, exclusiones, límites y deducibles aplicables.",
        "Each assignment begins with verification of the facts and circumstances, identification of evidence, cause and origin analysis, determination of the nature and extent of damage, and assessment of repair, replacement or recovery options. Where appropriate, we incorporate specialist testing, cost analysis, loss quantification and technical review of the applicable policy conditions, coverage, exclusions, limits and deductibles.",
      ),
      text(
        "Distinguimos entre un siniestro reciente —en el que la inspección oportuna puede ser decisiva para documentar y preservar evidencias— y un reclamo en curso, cuya evaluación puede requerir el examen retrospectivo de informes, fotografías, registros operativos, ensayos, reparaciones y antecedentes disponibles. El alcance, los especialistas y los entregables se determinan conforme a las circunstancias y condiciones de cada contratación, con independencia de criterio, confidencialidad y trazabilidad documental.",
        "We distinguish between a recent loss —where timely inspection can be decisive in documenting and preserving evidence— and an ongoing claim, whose assessment may require retrospective examination of reports, photographs, operating records, tests, repairs and available background information. The scope, specialists and deliverables are determined according to the circumstances and terms of each engagement, with independent judgement, confidentiality and documentary traceability.",
      ),
    ],
    photos: [
      { image: "thermal-power-plant", caption: text("Central termoeléctrica", "Thermal power plant"), alt: text("Turbina y generador instalados en una central termoeléctrica", "Turbine and generator installed at a thermal power plant") },
      { image: "power-transmission", caption: text("Transmisión de energía", "Power transmission"), alt: text("Incendio en equipos de una instalación de transmisión eléctrica", "Fire affecting equipment at a power transmission facility") },
      { image: "damage-survey", caption: text("Damage survey", "Damage survey"), alt: text("Inspección de carga industrial estibada en la bodega de un buque", "Survey of industrial cargo stowed in a vessel’s hold") },
    ] satisfies ServiceDocumentPhoto[],
  },
  traceability: {
    title: text("Trazabilidad: de la evidencia a la conclusión", "Traceability: from evidence to conclusion"),
    steps: [
      { title: text("Recepción y alcance", "Intake and scope"), description: text("Identificamos al solicitante, el tipo de evento, su urgencia, la información disponible y las condiciones del encargo.", "We identify the requesting party, the type of event, its urgency, the information available and the terms of the assignment.") },
      { title: text("Inspección y documentación", "Inspection and documentation"), description: text("Inspeccionamos cuando resulta posible; registramos condiciones, daños y evidencias, y recomendamos medidas de preservación.", "We inspect where possible, record conditions, damage and evidence, and recommend preservation measures.") },
      { title: text("Investigación y causalidad", "Investigation and causation"), description: text("Contrastamos hipótesis con hechos, registros, pruebas y documentación para establecer mecanismos de falla y origen del daño.", "We test hypotheses against facts, records, testing and documentation to establish failure mechanisms and the origin of damage.") },
      { title: text("Evaluación y cuantificación", "Assessment and quantification"), description: text("Determinamos la extensión de daños, reparabilidad, alternativas técnicas, costos y consecuencias operativas.", "We determine the extent of damage, repairability, technical alternatives, costs and operational consequences.") },
      { title: text("Análisis de póliza e informe", "Policy analysis and reporting"), description: text("Según el encargo, examinamos técnicamente condiciones contractuales y presentamos conclusiones fundamentadas en informes trazables.", "Depending on the assignment, we technically examine contractual conditions and present substantiated conclusions in traceable reports.") },
    ],
    scopeLabel: text("Alcance", "Scope"),
    scope: text("El análisis técnico de una póliza no constituye por sí solo una garantía de cobertura ni de indemnización. Las conclusiones dependen de los hechos acreditados, del clausulado aplicable y del alcance del encargo profesional.", "Technical analysis of a policy does not, by itself, guarantee coverage or indemnification. Conclusions depend on the established facts, the applicable wording and the scope of the professional assignment."),
    photos: [
      { image: "damaged-transformer", caption: text("Equipo siniestrado", "Damaged equipment"), alt: text("Transformador de potencia en una subestación eléctrica", "Power transformer at an electrical substation") },
      { image: "technical-inspection", caption: text("Inspección técnica y pruebas", "Technical inspection and testing"), alt: text("Inspección de la parte activa de un transformador de potencia", "Inspection of a power transformer’s active part") },
      { image: "inspection-report", caption: text("Reporte de inspección técnica", "Technical inspection report"), alt: text("Portada del informe de inspección de un transformador Pauwels", "Cover of a Pauwels transformer inspection report") },
    ] satisfies ServiceDocumentPhoto[],
  },
  relevantTitle: text("Servicios relevantes", "Key services"),
  relevantIntroduction: text("Especialidades para reclamos y siniestros complejos. Concentramos nuestras capacidades en cuatro áreas en las que la investigación de ingeniería, el conocimiento asegurador y la coordinación de especialistas aportan especial valor.", "Specialist expertise for complex claims and losses. We focus our capabilities on four areas where engineering investigation, insurance knowledge and specialist coordination add particular value."),
  coverageTitle: text("Ramos de seguros autorizados", "Authorised insurance classes"),
  consultation: {
    motto: text("Rigor técnico.\nConfianza que permanece.", "Technical rigor.\nTrust that endures."),
    trust: text("Confianza mutua", "Mutual trust"),
    title: text("Conversemos sobre el alcance de su consulta", "Let’s discuss the scope of your enquiry"),
    paragraphs: [
      text(
        "Cada reclamo o siniestro requiere una evaluación acorde con su naturaleza, complejidad y oportunidad de intervención. Si se trata de un evento reciente, una comunicación temprana puede facilitar la coordinación de una inspección y la documentación de evidencias. Si el reclamo ya está en curso, podríamos revisar inicialmente sus antecedentes y la documentación disponible para identificar el tipo de asistencia técnico-legal que podría resultar pertinente, dentro del alcance de nuestras competencias profesionales.",
        "Each claim or loss requires an assessment suited to its nature, complexity and the timing of our involvement. For a recent event, early communication can help coordinate an inspection and the documentation of evidence. If a claim is already ongoing, we could initially review its background and the available documentation to identify the type of technical and legal assistance that may be appropriate within our professional competence.",
      ),
      text(
        "Compártanos sus inquietudes y los datos esenciales del caso. A partir de esa información podríamos definir los siguientes pasos y, de ser conveniente, coordinar una reunión profesional. La recepción y revisión preliminar de la consulta no supone por sí sola la aceptación del encargo ni la prestación de asesoría especializada; cualquier trabajo posterior se acordará previamente en cuanto a alcance y honorarios.",
        "Share your questions and the essential details of the case. Based on that information, we could define the next steps and, where appropriate, arrange a professional meeting. Receiving and preliminarily reviewing an enquiry does not, by itself, constitute acceptance of the assignment or the provision of specialist advice; the scope and fees of any subsequent work will be agreed in advance.",
      ),
    ],
  },
};

export const serviceDocumentSpecialties: ServiceDocumentSpecialty[] = [
  {
    id: "engineering",
    title: text("Engineering for complex claims", "Engineering for complex claims"),
    subtitle: text("Ingeniería para reclamos y siniestros complejos", "Engineering for complex claims and losses"),
    description: text(
      "Investigamos siniestros que comprometen maquinaria, equipos electromecánicos, instalaciones industriales e infraestructura. Reconstruimos las circunstancias del evento, analizamos mecanismos de falla y causas, evaluamos daños directos y alternativas de reparación o reposición, y examinamos costos y tiempos de recuperación. Según la naturaleza del caso, integramos inspecciones, ensayos de materiales, pruebas eléctricas o mecánicas, registros operativos y especialistas complementarios. El resultado es un análisis verificable, documentado y compatible con el alcance técnico del ajuste.",
      "We investigate losses involving machinery, electromechanical equipment, industrial facilities and infrastructure. We reconstruct the circumstances of the event, analyse failure mechanisms and causes, assess direct damage and repair or replacement options, and examine recovery costs and timescales. Depending on the case, we integrate inspections, materials testing, electrical or mechanical tests, operating records and complementary specialists. The result is a verifiable, documented analysis consistent with the technical scope of loss adjusting.",
    ),
    photos: [
      { image: "overturned-machinery", caption: text("Volcamiento de maquinaria", "Overturned machinery"), alt: text("Maquinaria pesada volcada en un terreno de trabajo", "Heavy machinery overturned on a work site") },
      { image: "transformer-fire", caption: text("Incendio transformador de potencia", "Power transformer fire"), alt: text("Intervención de extinción en un transformador de potencia incendiado", "Firefighting response at a burning power transformer") },
      { image: "structural-damage", caption: text("Daño estructural de edificio", "Structural building damage"), alt: text("Grietas en la fachada y estructura de un edificio", "Cracks in a building’s facade and structure") },
    ],
  },
  {
    id: "energy",
    title: text("Energy & power loss adjusting", "Energy & power loss adjusting"),
    subtitle: text("Generación, transmisión y distribución de energía eléctrica", "Electricity generation, transmission and distribution"),
    description: text(
      "Aplicamos ingeniería especializada al peritaje y ajuste de siniestros en instalaciones de generación, transmisión y distribución de energía eléctrica: turbinas a gas y vapor, turbinas hidráulicas, generadores, motores de generación, transformadores, subestaciones, calderas, bombas y sistemas auxiliares. Examinamos secuencias de falla, condiciones de operación y mantenimiento, daños mecánicos y eléctricos, alternativas de recuperación y tiempos de indisponibilidad. La evaluación considera la criticidad de los equipos, las recomendaciones del fabricante y, cuando corresponde, los efectos de la interrupción operativa.",
      "We apply specialist engineering to surveying and loss adjusting at electricity generation, transmission and distribution facilities: gas and steam turbines, hydraulic turbines, generators, generating engines, transformers, substations, boilers, pumps and auxiliary systems. We examine failure sequences, operating and maintenance conditions, mechanical and electrical damage, recovery options and downtime. The assessment considers equipment criticality, manufacturers’ recommendations and, where appropriate, the effects of operational interruption.",
    ),
    photos: [
      { image: "boiler", caption: text("Caldera", "Boiler"), alt: text("Caldera industrial y chimenea de una instalación de generación", "Industrial boiler and stack at a generation facility") },
      { image: "generator-engine", caption: text("Motor generador", "Generator engine"), alt: text("Motor de generación eléctrica con componentes abiertos para inspección", "Power generating engine with components opened for inspection") },
      { image: "gas-turbine", caption: text("Turbina a gas", "Gas turbine"), alt: text("Rotor y álabes de una turbina a gas", "Gas turbine rotor and blades") },
      { image: "power-transformer", caption: text("Transformador de potencia", "Power transformer"), alt: text("Parte activa de un transformador de potencia durante su evaluación", "Active part of a power transformer during assessment") },
    ],
  },
  {
    id: "marine",
    title: text("Marine: hull & machinery – cargo / project cargo", "Marine: hull & machinery – cargo / project cargo"),
    subtitle: text("Casco, maquinaria, transporte y carga de proyecto", "Hull, machinery, transport and project cargo"),
    note: text("Survey & ajuste de siniestros", "Survey & loss adjusting"),
    description: text(
      "Realizamos evaluaciones técnicas relacionadas con daños en casco y maquinaria naval, mercancías transportadas y equipos industriales de alto valor. Según el encargo, intervenimos en inspecciones de carga, descarga, izaje, transporte terrestre, montaje y puesta en servicio, documentando condiciones de manipulación, daños, causas y alternativas de reparación o recuperación. En cargas de proyecto —como transformadores y turbogeneradores— integramos criterios logísticos y electromecánicos. Se diferencia expresamente el alcance de un survey preventivo o de seguimiento del ajuste de un siniestro.",
      "We carry out technical assessments relating to damage to hull and marine machinery, goods in transit and high-value industrial equipment. Depending on the assignment, we undertake surveys during loading, unloading, lifting, land transport, assembly and commissioning, documenting handling conditions, damage, causes and repair or recovery options. For project cargo —such as transformers and turbogenerators— we integrate logistical and electromechanical criteria. The scope of a preventive or monitoring survey is expressly distinguished from the adjustment of a loss.",
    ),
    photos: [
      { image: "onboard-unloading", caption: text("Descarga a bordo", "Onboard unloading"), alt: text("Izaje de una turbina Siemens desde un buque con una grúa portuaria", "Lifting a Siemens turbine from a vessel with a port crane") },
      { image: "platform-unloading", caption: text("Descarga en plataforma", "Platform unloading"), alt: text("Descarga de una turbina sobre una plataforma de transporte terrestre", "Unloading a turbine onto a road transport platform") },
      { image: "project-transformer", caption: text("Transformador de potencia", "Power transformer"), alt: text("Inspección de un transformador con daños durante el transporte", "Survey of a transformer damaged during transport") },
      { image: "port-crane", caption: text("Maniobra grúa portuaria", "Port crane operation"), alt: text("Grúa móvil durante una maniobra de carga en puerto", "Mobile crane during a port cargo operation") },
      { image: "onboard-turbines", caption: text("Estiba de turbinas a bordo", "Turbines stowed on board"), alt: text("Equipos industriales embalados y estibados en la bodega de un buque", "Packed industrial equipment stowed in a vessel’s hold") },
      { image: "power-barge", caption: text("Generator power barge", "Generator power barge"), alt: text("Barcazas de generación eléctrica atracadas en puerto", "Power generation barges moored at port") },
    ],
  },
  {
    id: "interruption",
    title: text("Business interruption / lucro cesante", "Business interruption / loss of profits"),
    subtitle: text("Interrupción de operaciones y pérdida de beneficios", "Operational interruption and loss of profits"),
    note: text("Tipos de cobertura: Forma americana y forma inglesa", "Types of cover: American form and English form"),
    description: text(
      "Analizamos las consecuencias operativas y económicas de la interrupción de actividades derivadas de daños materiales, integrando criterios de ingeniería, información financiera y condiciones de seguros. Evaluamos el período de duración de reparación o reposición, el período de indemnización aplicable, la capacidad de recuperación, la producción o ventas afectadas. La cuantificación se desarrolla conforme a la base de indemnización prevista en la póliza de seguro afectada, incluyendo, cuando corresponda, las modalidades usualmente denominadas: forma inglesa o forma americana, sus períodos de espera, deducibles y demás condiciones contractuales.",
      "We analyse the operational and economic consequences of business interruption arising from material damage, combining engineering criteria, financial information and insurance conditions. We assess the repair or replacement period, the applicable indemnity period, recovery capacity and affected production or sales. Quantification follows the basis of indemnification provided by the relevant insurance policy, including, where applicable, the forms commonly known as the English form or American form, their waiting periods, deductibles and other contractual conditions.",
    ),
    photos: [
      { image: "damaged-equipment", caption: text("Equipo siniestrado", "Damaged equipment"), alt: text("Instalación industrial asociada al análisis de un siniestro", "Industrial facility associated with a loss investigation") },
      { image: "damage-and-shutdown", caption: text("Daños & paralización", "Damage & shutdown"), alt: text("Detalle de daños en los componentes de un equipo industrial", "Damage detail on industrial equipment components") },
      { image: "return-to-operation", caption: text("Retorno a operación", "Return to operation"), alt: text("Equipo industrial reparado para su retorno a operación", "Repaired industrial equipment prepared for return to operation") },
    ],
  },
];

// Preserve the two-column pairings and the two colour groups shown on PDF page 7.
export const serviceDocumentCoverage: [Localized, Localized][] = [
  [text("Incendio y líneas aliadas", "Fire and allied perils"), text("Lucro cesante a consecuencia de incendio y líneas aliadas", "Business interruption following fire and allied perils")],
  [text("Rotura de maquinaria", "Machinery breakdown"), text("Pérdida de beneficio por rotura de maquinaria", "Loss of profits following machinery breakdown")],
  [text("Marítimo: casco & maquinaria", "Marine: hull & machinery"), text("Transporte marítimo y terrestre", "Sea and land transport")],
  [text("Montaje de maquinaria", "Erection all risks"), text("Todo riesgo petrolero", "Oil and gas all risks")],
  [text("Multiriesgo", "Multi-risk"), text("Equipo y maquinaria de contratistas", "Contractors’ plant and machinery")],
  [text("Obras civiles terminadas", "Completed civil engineering works"), text("Todo riesgo para contratistas", "Contractors’ all risks")],
  [text("Agropecuario", "Agricultural risks"), text("Equipo electrónico", "Electronic equipment")],
  [text("Responsabilidad civil", "Liability"), text("Casco aéreo", "Aircraft hull")],
  [text("Robo", "Theft"), text("Vehículos", "Motor vehicles")],
];
