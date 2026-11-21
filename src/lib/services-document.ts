import { text, type Localized } from "./i18n";

export type ServiceDocumentPhoto = { image: string; caption: Localized; alt: Localized };
type ServiceDocumentSpecialty = {
  id: string;
  title: Localized;
  subtitle: Localized;
  note?: Localized;
  description: Localized | Localized[];
  photos: ServiceDocumentPhoto[];
};

// Based on the eight-page servicios.pdf reference, with subsequent editorial updates.
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
    title: text("¿En qué podemos ayudarte?", "How can we help you?"),
    action: text("Contáctenos", "Contact us"),
    paragraphs: [
      text(
        "Cuéntenos el motivo de su consulta o necesidad.",
        "Tell us about your enquiry or what you need.",
      ),
      text(
        "Estamos disponibles para conocer su requerimiento y evaluar la mejor manera de atenderlo.",
        "We are available to understand your requirements and assess the best way to assist you.",
      ),
    ],
  },
};

export const serviceDocumentSpecialties: ServiceDocumentSpecialty[] = [
  {
    id: "engineering",
    title: text("Engineering for complex claims", "Engineering for complex claims"),
    subtitle: text("Ingeniería para reclamos y siniestros complejos", "Engineering for complex claims and losses"),
    description: [
      text(
        "Realizamos peritajes e investigaciones técnicas de siniestros que afectan maquinaria industrial, motores y generadores instalados en tierra, equipos electromecánicos, instalaciones, edificios e infraestructura. Analizamos las circunstancias del evento, sus posibles causas y la extensión de los daños, así como las alternativas de reparación, recuperación o reposición y la evaluación de las pérdidas.",
        "We carry out surveys and technical investigations of losses affecting industrial machinery, land-based engines and generators, electromechanical equipment, facilities, buildings and infrastructure. We analyse the circumstances of the event, its possible causes and the extent of the damage, as well as repair, recovery or replacement options and the assessment of losses.",
      ),
      text(
        "Según la naturaleza del caso, incorporamos inspecciones, pruebas y análisis especializados cuando resultan necesarios. Nuestros informes integran criterios de ingeniería, evidencia documentada y evaluación de las condiciones de la póliza de seguro aplicable.",
        "Depending on the nature of the case, we incorporate inspections, specialist testing and analysis where necessary. Our reports combine engineering criteria, documented evidence and an assessment of the terms and conditions of the applicable insurance policy.",
      ),
    ],
    photos: [
      { image: "overturned-machinery", caption: text("Volcamiento de maquinaria", "Overturned machinery"), alt: text("Maquinaria pesada volcada en un terreno de trabajo", "Heavy machinery overturned on a work site") },
      { image: "industrial-engines", caption: text("Motores industriales", "Industrial engines"), alt: text("Motor industrial con panel de control", "Industrial engine with a control panel") },
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
    description: [
      text(
        "Realizamos peritajes e investigaciones técnicas de siniestros que afectan embarcaciones, su casco, motores de propulsión marina, maquinaria y equipos de a bordo. Evaluamos las circunstancias y posibles causas de las averías, la extensión de los daños, las alternativas de reparación o reposición y sus efectos sobre la operación de la embarcación. Asimismo, atendemos, reclamaciones relacionadas con responsabilidades marítimas (P&I).",
        "We carry out surveys and technical investigations of losses affecting vessels, their hulls, marine propulsion engines, machinery and onboard equipment. We assess the circumstances and possible causes of breakdowns, the extent of damage, repair or replacement options and their effects on vessel operations. We also handle claims relating to marine liabilities (P&I).",
      ),
      text(
        "Desarrollamos inspecciones de carga (surveys) y evaluaciones de pérdidas relacionadas con el transporte marítimo de mercancías, equipos industriales y cargas de proyecto, incluidas operaciones de embarque, descarga, izaje y transporte asociado. Cuando corresponde, examinamos aspectos técnicos de salvamento y documentamos evidencias relevantes para eventuales acciones de recobro o subrogación.",
        "We carry out cargo surveys and loss assessments relating to the maritime transport of goods, industrial equipment and project cargo, including loading, unloading, lifting and associated transport operations. Where appropriate, we examine technical aspects of salvage and document evidence relevant to potential recovery or subrogation actions.",
      ),
    ],
    photos: [
      { image: "onboard-unloading", caption: text("Descarga de a bordo", "Unloading from the vessel"), alt: text("Izaje de una turbina Siemens desde un buque con una grúa portuaria", "Lifting a Siemens turbine from a vessel with a port crane") },
      { image: "platform-unloading", caption: text("Descarga en plataforma", "Platform unloading"), alt: text("Descarga de una turbina sobre una plataforma de transporte terrestre", "Unloading a turbine onto a road transport platform") },
      { image: "project-transformer", caption: text("Siniestro transformador a bordo", "Transformer loss on board"), alt: text("Inspección de un transformador con daños durante el transporte", "Survey of a transformer damaged during transport") },
      { image: "port-crane", caption: text("Maniobra grúa portuaria", "Port crane operation"), alt: text("Grúa móvil durante una maniobra de carga en puerto", "Mobile crane during a port cargo operation") },
      { image: "marine-propulsion-engine", caption: text("Motor de propulsión marino", "Marine propulsion engine"), alt: text("Motor de propulsión marino", "Marine propulsion engine") },
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
