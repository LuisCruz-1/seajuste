import "server-only";
import aboutPdfs from "../../public/documents/nosotros/manifest.json";
import { text, type Localized, type DetailId } from "./i18n";

export const company = {
  name: "SEAJUSTE",
  legalName: "SEAJUSTE S.A. Ajustadores de Siniestros",
  taxId: "0991501487001",
  phone: "+593 99 966 6167",
  phoneHref: "tel:+593999666167",
  whatsapp: "https://wa.me/593999666167",
  email: "seajuste@gmail.com",
  linkedin: "https://www.linkedin.com/search/results/people/?keywords=Carlos%20Quevedo%20Seajuste",
  brochure: "/documents/seajuste-brochure.pdf",
  offices: [
    {
      city: "Guayaquil",
      building: text("Parque Empresarial Colón · Edificio Pacific Plaza", "Colón Business Park · Pacific Plaza Building"),
      office: text("Piso 3, oficina 306", "3rd floor, office 306"),
      street: "Av. Chávez Franco y Av. J. Tanca Marengo",
      map: "https://www.google.com/maps/search/?api=1&query=Pacific+Plaza+Parque+Empresarial+Colon+Guayaquil+Ecuador",
    },
    {
      city: "Quito",
      building: text("Edificio Amazonas Park", "Amazonas Park Building"),
      office: text("Piso 16", "16th floor"),
      street: "Av. Amazonas N35-135 y Japón",
      map: "https://www.google.com/maps/search/?api=1&query=Edificio+Amazonas+Park+Amazonas+N35-135+Japon+Quito+Ecuador",
    },
  ],
};

export type Service = {
  id: DetailId;
  title: Localized;
  shortTitle: Localized;
  discipline: Localized;
  summary: Localized;
  paragraphs: Localized[];
  scope: Localized[];
  image: string;
  icon: "search" | "energy" | "marine" | "engineering" | "chart" | "equipment" | "civil" | "vehicles" | "risk";
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "adjusting", icon: "search", featured: true,
    title: text("Peritaje técnico y ajuste de siniestros", "Technical surveys & loss adjusting"),
    shortTitle: text("Peritaje y ajuste", "Loss adjusting"),
    discipline: text("Nuestra especialidad central", "Our core expertise"),
    summary: text("La experiencia en seguros y el criterio de ingeniería, integrados para investigar, evaluar y ajustar cada siniestro.", "Insurance expertise and engineering judgment, brought together to investigate, assess and adjust each loss."),
    paragraphs: [
      text("Integramos más de 38 años de experiencia en seguros con ingeniería especializada y análisis técnico para la investigación, evaluación y ajuste de siniestros. Verificamos los hechos y circunstancias, analizamos causa y origen y determinamos la naturaleza y extensión de los daños.", "We combine more than 38 years of insurance experience with specialist engineering and technical analysis to investigate, assess and adjust losses. We verify facts and circumstances, analyse cause and origin, and establish the nature and extent of damage."),
      text("Evaluamos la reparabilidad o reposición, cuantificamos las pérdidas y revisamos técnicamente coberturas, exclusiones y deducibles. Acompañamos el reclamo hasta su conclusión con trazabilidad documental e independencia de criterio.", "We assess repairability or replacement, quantify losses and review policy coverage, exclusions and deductibles from a technical perspective. We follow the claim through to its conclusion, maintaining documentary traceability and independent judgment."),
      text("Cuando la complejidad del caso lo requiere, conformamos equipos multidisciplinarios e incorporamos especialistas, pruebas técnicas, análisis de costos, medidas de mitigación, salvamento y recuperos.", "Where a case requires it, we assemble multidisciplinary teams and involve specialists, technical testing, cost analysis, mitigation measures, salvage and recoveries."),
    ],
    scope: [text("Inspección y evaluación exhaustiva de daños", "On-site inspection and thorough damage assessment"), text("Investigación de causa raíz", "Root-cause investigation"), text("Cuantificación y valoración de pérdidas", "Loss quantification and valuation"), text("Análisis técnico de la póliza", "Technical policy analysis"), text("Informes de peritaje y seguimiento del reclamo", "Survey reports and claim follow-up")],
    image: "transformer-inspection",
  },
  {
    id: "energy", icon: "energy", featured: true,
    title: text("Energía y generación eléctrica", "Energy & power loss adjusting"),
    shortTitle: text("Energy & Power", "Energy & Power"),
    discipline: text("Energía e industria", "Energy & industry"),
    summary: text("Análisis especializado de fallas y pérdidas en equipos críticos de generación y transmisión de energía.", "Specialist failure and loss analysis for critical power generation and transmission equipment."),
    paragraphs: [
      text("Nuestra experiencia técnica se aplica a siniestros del sector eléctrico y de generación de energía: turbinas a gas e hidráulicas, generadores, transformadores de potencia, calderas, bombas y maquinaria crítica.", "Our technical experience addresses losses in the electricity and power generation sector: gas and hydraulic turbines, generators, power transformers, boilers, pumps and critical machinery."),
      text("Integramos la evaluación de daños, el análisis técnico de fallas, la rotura de maquinaria y la determinación de los efectos de la paralización cuando corresponda. La experiencia documentada incluye turbinas a gas y a vapor de Electroguayas.", "We integrate damage assessment, technical failure analysis, machinery breakdown and, where applicable, evaluation of the effects of downtime. Documented experience includes Electroguayas gas and steam turbines."),
    ],
    scope: [text("Turbinas, turbogeneradores y generadores", "Turbines, turbogenerators and generators"), text("Transformadores y sistemas de potencia", "Transformers and power systems"), text("Calderas, vapor, bombas y equipos auxiliares", "Boilers, steam, pumps and auxiliary equipment"), text("Rotura de maquinaria y efectos de paralización", "Machinery breakdown and downtime effects")],
    image: "trinitaria-turbine",
  },
  {
    id: "marine", icon: "marine", featured: true,
    title: text("Casco, maquinaria y carga marítima", "Ship’s hull, machinery & marine cargo"),
    shortTitle: text("Marine & Cargo", "Marine & Cargo"),
    discipline: text("Marítimo y transporte", "Marine & transport"),
    summary: text("Inspecciones y peritajes a bordo, en puerto y durante el transporte, montaje y puesta en servicio de equipos de alto valor.", "Surveys aboard vessels, at port and throughout transport, assembly and commissioning of high-value equipment."),
    paragraphs: [
      text("Realizamos inspecciones, peritajes y evaluación técnica de daños en casco, maquinaria y equipos de embarcaciones, así como inspecciones y seguimiento de carga marítima y equipos sofisticados.", "We conduct inspections, surveys and technical damage assessments of ships’ hulls, machinery and equipment, as well as marine cargo inspections and monitoring of sophisticated equipment."),
      text("Nuestra experiencia comprende operaciones a bordo, verificación de condición y daños, estiba y descarga, izaje, transporte terrestre y seguimiento técnico hasta el destino, montaje y puesta en servicio, según el alcance de cada asignación.", "Our experience covers onboard operations, condition and damage verification, stowage and unloading, lifting, land transport and technical monitoring through to destination, assembly and commissioning, according to each assignment’s scope."),
      text("Esta capacidad se complementa con Energy & Power cuando la carga o el riesgo marítimo involucra equipos de generación y transmisión, turbogeneradores, transformadores, maquinaria pesada y otros componentes de alto valor.", "This capability complements Energy & Power where cargo or marine risks involve generation and transmission equipment, turbogenerators, transformers, heavy machinery and other high-value components."),
      text("En barcazas de generación inspeccionamos motores de combustión interna, calderas, abastecimiento y estiba de combustible, protección contra incendios, subestaciones a bordo y conexión de subtransmisión a subestaciones en tierra.", "On power barges, we inspect internal combustion engines, boilers, fuel supply and stowage, fire protection, onboard substations and subtransmission connections to onshore substations."),
    ],
    scope: [text("Hull & Machinery Survey", "Hull & Machinery Survey"), text("Marine Cargo Damage Survey", "Marine Cargo Damage Survey"), text("Cargo Shore & Land Transport Survey", "Cargo Shore & Land Transport Survey"), text("Cargo Montage & Assembly Survey", "Cargo Montage & Assembly Survey"), text("Power Barge Survey", "Power Barge Survey")],
    image: "cargo-unloading-2",
  },
  {
    id: "engineering", icon: "engineering", featured: true,
    title: text("Ingeniería para siniestros complejos", "Engineering for complex claims"),
    shortTitle: text("Siniestros complejos", "Complex claims"),
    discipline: text("Ingeniería especializada", "Specialist engineering"),
    summary: text("Una metodología transversal que conecta causa, daños, costos y retorno a operación en pérdidas técnicas e industriales.", "A cross-disciplinary methodology connecting cause, damage, costs and return to operation in technical and industrial losses."),
    paragraphs: [
      text("Aplicamos ingeniería al proceso de ajuste para integrar análisis mecánico y eléctrico, investigación de causa, evaluación de daños y pruebas especializadas. Esta capacidad es transversal a las pérdidas industriales y técnicas de alta complejidad.", "We apply engineering to the adjusting process, integrating mechanical and electrical analysis, cause investigation, damage assessment and specialist testing. This capability cuts across highly complex industrial and technical losses."),
      text("Analizamos reparabilidad, reposición, costos, tiempos de reparación y retorno a operación. Los hallazgos técnicos, las pruebas de campo y la documentación permiten formular y contrastar hipótesis hasta determinar la causa raíz y valorar el daño.", "We analyse repairability, replacement, costs, repair timelines and return to operation. Technical findings, field tests and documentation allow us to develop and test hypotheses, establish root cause and value the damage."),
      text("El informe de peritaje sirve de soporte al reclamo y considera coberturas, exclusiones y deducibles, para que las partes involucradas puedan utilizarlo en defensa de sus legítimos derechos.", "The survey report supports the claim and considers coverage, exclusions and deductibles, so the parties involved can use it to protect their legitimate rights."),
    ],
    scope: [text("Análisis mecánico y eléctrico", "Mechanical and electrical analysis"), text("Pruebas de campo y ensayos especializados", "Field tests and specialist testing"), text("Investigación y contrastación de hipótesis", "Investigation and hypothesis testing"), text("Reparabilidad, costos y tiempos de recuperación", "Repairability, costs and recovery timelines")],
    image: "electrical-testing",
  },
  {
    id: "interruption", icon: "chart", featured: true,
    title: text("Lucro cesante e interrupción de negocio", "Business interruption"),
    shortTitle: text("Lucro cesante", "Business interruption"),
    discipline: text("Continuidad de la operación", "Operational continuity"),
    summary: text("El daño material y sus consecuencias operativas, analizados junto con la cuantificación económica correspondiente.", "Material damage and its operational consequences, assessed alongside the corresponding economic quantification."),
    paragraphs: [
      text("Analizamos técnicamente la interrupción derivada del daño material, el período razonable de reparación o reposición, las restricciones operativas y su relación con la recuperación de la actividad.", "We technically analyse interruption resulting from material damage, the reasonable repair or replacement period, operational restrictions and their relationship with business recovery."),
      text("Coordinamos el análisis técnico con la cuantificación económica correspondiente. El equipo integra conocimientos de ingeniería, seguros y economía; el brochure documenta intervenciones por lucro cesante a consecuencia de rotura de maquinaria e incendio.", "We coordinate technical analysis with the corresponding economic quantification. The team combines engineering, insurance and economics expertise; the brochure documents business interruption work following machinery breakdown and fire."),
    ],
    scope: [text("Lucro cesante a consecuencia de incendio y líneas aliadas", "Business interruption following fire and allied perils"), text("Pérdida de beneficio por rotura de maquinaria", "Loss of profit following machinery breakdown"), text("Períodos de reparación o reposición", "Repair or replacement periods"), text("Restricciones y recuperación de la actividad", "Restrictions and business recovery")],
    image: "trinitaria-plant",
  },
  {
    id: "equipment", icon: "equipment",
    title: text("Peritaje de equipo y maquinaria", "Plant & equipment surveys"),
    shortTitle: text("Equipo y maquinaria", "Plant & equipment"),
    discipline: text("Maquinaria y construcción", "Machinery & construction"),
    summary: text("Inspección y valoración de daños de equipo caminero, sistemas hidráulicos, motores y mecanismos de operación.", "Inspection and damage valuation of earthmoving equipment, hydraulic systems, engines and operating mechanisms."),
    paragraphs: [
      text("Realizamos inspección física en el lugar del siniestro, incluso en áreas rurales, y verificamos los daños del equipo caminero asegurado. Supervisamos el desmontaje de estructura, sistema hidráulico, mecanismos de operación y componentes del motor y sus sistemas auxiliares.", "We inspect the loss site, including rural locations, and verify damage to insured earthmoving equipment. We supervise dismantling of structures, hydraulic systems, operating mechanisms, engine components and auxiliary systems."),
      text("El análisis técnico y la cuantificación de la pérdida se coordinan con el taller autorizado por el fabricante y los técnicos de la empresa representante de la marca, hasta completar el ajuste del siniestro.", "Technical analysis and loss quantification are coordinated with the manufacturer-authorised workshop and the brand representative’s technicians through to completion of the loss adjustment."),
    ],
    scope: [text("Equipo caminero y maquinaria de contratistas", "Earthmoving equipment and contractors’ plant"), text("Supervisión de desmontaje y revisión de componentes", "Dismantling supervision and component inspection"), text("Evaluación conjunta con técnicos de la marca", "Joint assessment with the brand’s technicians")],
    image: "equipment-inspection-1",
  },
  {
    id: "civil", icon: "civil",
    title: text("Edificios, vías e infraestructura", "Buildings, roads & infrastructure"),
    shortTitle: text("Ingeniería civil", "Civil engineering"),
    discipline: text("Patrimonio e infraestructura", "Property & infrastructure"),
    summary: text("Evaluación de daños sísmicos en estructuras y vías, valoración del reclamo y supervisión técnica de reparaciones.", "Seismic damage assessment of structures and roads, claim valuation and technical repair supervision."),
    paragraphs: [
      text("Inspeccionamos daños en edificios a consecuencia de sismos bajo pólizas de incendio y líneas aliadas. Revisamos fisuras, grietas y daños estructurales en exteriores e interiores, cuantificamos los daños y valoramos el reclamo y su liquidación.", "We inspect earthquake damage to buildings under fire and allied perils policies. We examine fissures, cracks and structural damage inside and outside buildings, quantify damage, and assess the claim and its settlement."),
      text("En vías y carreteras realizamos revisión de fisuras, grietas y calicatas, supervisión de trabajos de reparación, cuantificación de daños, valoración del reclamo y ajuste del siniestro. El archivo incluye trabajos en Guayaquil, Manta y la Autoridad Portuaria de Esmeraldas.", "For roads and highways, we examine fissures, cracks and trial pits, supervise repairs, quantify damage, value the claim and adjust the loss. The archive includes work in Guayaquil, Manta and at the Esmeraldas Port Authority."),
    ],
    scope: [text("Daños estructurales y no estructurales en edificios", "Structural and non-structural building damage"), text("Obras civiles terminadas y vías de tránsito", "Completed civil works and roads"), text("Evaluación de daños sísmicos", "Earthquake damage assessment"), text("Cuantificación y supervisión de reparaciones", "Quantification and repair supervision")],
    image: "manta-building-1",
  },
  {
    id: "vehicles", icon: "vehicles",
    title: text("Peritaje y reconstrucción de accidentes", "Vehicle surveys & accident reconstruction"),
    shortTitle: text("Vehículos", "Vehicles"),
    discipline: text("Movilidad y transporte", "Mobility & transport"),
    summary: text("Reconstrucción técnica de accidentes de vehículos livianos en zona urbana y transporte pesado en carretera.", "Technical reconstruction of light-vehicle accidents in urban areas and heavy-vehicle accidents on highways."),
    paragraphs: [
      text("En vehículos livianos inspeccionamos el lugar del siniestro y levantamos medidas para reconstruir los hechos. Analizamos impactos, documentación policial y causa raíz, con cuantificación y valoración de daños. En vehículos de alta gama podemos contar con el apoyo técnico de talleres de la concesionaria.", "For light vehicles, we inspect the loss site and take measurements to reconstruct events. We analyse impacts, police documentation and root cause, and quantify and value damage. For high-end vehicles, we may involve technical support from dealership workshops."),
      text("En transporte pesado tomamos como referencia los datos y diagramas del parte policial, la inspección física del vehículo y el lugar del accidente, para analizar el impacto, cuantificar la pérdida y ajustar el siniestro.", "For heavy vehicles, we use police report data and diagrams together with vehicle and site inspections to analyse the impact, quantify the loss and adjust the claim."),
      text("La metodología utiliza tecnología de reconstrucción y análisis de deformaciones por impacto para contrastar los hechos documentados.", "The methodology uses reconstruction technology and impact deformation analysis to assess documented events."),
    ],
    scope: [text("Vehículos livianos en zona urbana", "Light vehicles in urban areas"), text("Vehículos pesados en carretera", "Heavy vehicles on highways"), text("Mediciones, diagramas y reconstrucción técnica", "Measurements, diagrams and technical reconstruction"), text("Análisis de impactos y valoración de daños", "Impact analysis and damage valuation")],
    image: "urban-reconstruction-2",
  },
  {
    id: "risk", icon: "risk",
    title: text("Riesgos, asesoría y asistencia técnica", "Risk, advisory & technical assistance"),
    shortTitle: text("Riesgos y asesoría", "Risk & advisory"),
    discipline: text("Prevención y soporte especializado", "Prevention & specialist support"),
    summary: text("Auditoría de riesgos, revisión de pólizas y verificación de sistemas de protección, con soporte técnico y legal.", "Risk auditing, policy review and protection-system verification, with technical and legal support."),
    paragraphs: [
      text("La experiencia del equipo incluye asistencia técnica y legal en reclamos de seguros, análisis de coberturas de pólizas, auditoría de riesgos y reducción y mitigación de riesgos.", "The team’s experience includes technical and legal assistance in insurance claims, policy coverage analysis, risk auditing, and risk reduction and mitigation."),
      text("Verificamos sistemas de protección contra incendio, sistemas de vapor y generación eléctrica. El soporte se complementa con asesoría, avalúos, recuperos, salvatajes, subrogaciones, control, custodia y transporte, conforme al objeto social y al alcance de cada asignación.", "We verify fire protection, steam and power generation systems. Support also includes advisory services, valuations, recoveries, salvage, subrogation, control, custody and transport, in accordance with the company’s corporate purpose and each assignment’s scope."),
      text("La trayectoria incluye asesoría técnica de pólizas de valores significativos que requerían reaseguro facultativo y gestión de reclamos ante reaseguradores en Londres.", "The company’s track record includes technical advice on high-value policies requiring facultative reinsurance and handling claims with reinsurers in London."),
    ],
    scope: [text("Análisis de coberturas y asistencia técnico-legal", "Coverage analysis and technical-legal assistance"), text("Auditoría, evaluación y mitigación de riesgos", "Risk auditing, assessment and mitigation"), text("Verificación de protección contra incendios", "Fire protection verification"), text("Avalúos, recuperos, salvatajes y subrogaciones", "Valuations, recoveries, salvage and subrogation")],
    image: "power-modules-3",
  },
];

export type CaseCategory = "energy" | "marine" | "equipment" | "civil" | "vehicles";
export type CaseStudy = {
  id: DetailId;
  title: Localized;
  category: CaseCategory;
  client: string;
  location: Localized;
  summary: Localized;
  paragraphs: Localized[];
  value?: number;
  images: string[];
  facts?: { label: Localized; value: Localized }[];
  documents?: { title: Localized; href: string }[];
};
const sequence = (prefix: string, count: number) => Array.from({ length: count }, (_, i) => `${prefix}-${i + 1}`);

export const cases: CaseStudy[] = [
  {
    id: "tg5", category: "energy", client: "ELECTROGUAYAS", value: 8253493.28,
    title: text("Turbina a gas TG-5", "TG-5 gas turbine"),
    location: text("Central Térmica Dr. Enrique García", "Dr. Enrique García Thermal Power Plant"),
    summary: text("Peritaje especializado de rotura de maquinaria y lucro cesante en generación eléctrica.", "Specialist machinery breakdown and business interruption assessment in power generation."),
    paragraphs: [text("El brochure documenta el peritaje de la turbina a gas TG-5 de la Central Térmica Dr. Enrique García, con una indemnización de USD 8.253.493,28.", "The brochure documents the survey of the TG-5 gas turbine at the Dr. Enrique García Thermal Power Plant, with a settlement of USD 8,253,493.28."), text("La experiencia se enmarca en la rotura de maquinaria y el lucro cesante por rotura de maquinaria de Electroguayas, combinando ingeniería y ajuste de seguros a nivel internacional.", "This experience forms part of Electroguayas machinery breakdown and related business interruption work, combining engineering and insurance adjusting at an international level.")],
    images: ["tg5-generator", "tg5-turbine", "claims-5"],
  },
  {
    id: "tv1", category: "energy", client: "ELECTROGUAYAS", value: 1947668.8,
    title: text("Turbina a vapor TV-1", "TV-1 steam turbine"),
    location: text("Central Térmica Trinitaria", "Trinitaria Thermal Power Plant"),
    summary: text("Experiencia técnica en maquinaria crítica de la Central Térmica Trinitaria.", "Technical experience with critical machinery at the Trinitaria Thermal Power Plant."),
    paragraphs: [text("El caso de la turbina a vapor TV-1 de la Central Térmica Trinitaria registra una indemnización de USD 1.947.668,80 en el brochure de la compañía.", "The TV-1 steam turbine case at the Trinitaria Thermal Power Plant records a settlement of USD 1,947,668.80 in the company brochure."), text("El trabajo integra la experiencia en peritaje especializado de rotura de maquinaria y análisis de los efectos de la interrupción de la operación.", "The work draws on specialist machinery breakdown surveying and analysis of the effects of operational interruption.")],
    images: ["trinitaria-turbine", "trinitaria-plant"],
  },
  {
    id: "tg4", category: "energy", client: "ELECTROGUAYAS", value: 1624063.03,
    title: text("Turbina a gas TG-4", "TG-4 gas turbine"),
    location: text("Central Ing. Gonzalo Zevallos", "Ing. Gonzalo Zevallos Power Plant"),
    summary: text("Ajuste de un siniestro de generación con indemnización documentada superior al millón de dólares.", "Power generation loss adjusting with a documented settlement exceeding one million dollars."),
    paragraphs: [text("La turbina a gas TG-4 de la Central Ing. Gonzalo Zevallos figura entre los casos destacados con una indemnización de USD 1.624.063,03.", "The TG-4 gas turbine at the Ing. Gonzalo Zevallos Power Plant is among the featured cases, with a settlement of USD 1,624,063.03."), text("El caso forma parte de la experiencia en rotura de maquinaria y lucro cesante de Electroguayas presentada en el brochure. Las fotografías de esta página muestran el archivo técnico general de generación de la compañía.", "The case is part of the Electroguayas machinery breakdown and business interruption experience presented in the brochure. Images on this page show the company’s general power generation technical archive.")],
    images: ["tg5-turbine", "trinitaria-turbine"],
  },
  {
    id: "artefacta", category: "civil", client: "ARTEFACTA", value: 2000000,
    title: text("Locales comerciales Artefacta", "Artefacta retail premises"),
    location: text("Manabí y Esmeraldas", "Manabí & Esmeraldas"),
    summary: text("Experiencia en reclamos de daños y lucro cesante en locales comerciales.", "Experience in property damage and business interruption claims for retail premises."),
    paragraphs: [text("El brochure presenta una indemnización de USD 2.000.000,00 para varios locales comerciales de Artefacta en las provincias de Manabí y Esmeraldas.", "The brochure presents a settlement of USD 2,000,000.00 for several Artefacta retail premises in the provinces of Manabí and Esmeraldas."), text("La referencia se incluye dentro de la experiencia de incendio y lucro cesante a consecuencia de incendio. El archivo fotográfico del documento muestra los daños observados en los locales.", "The reference is included in the company’s fire and resulting business interruption experience. The document’s photographic archive shows damage observed at the premises.")],
    images: ["artefacta-damage", "artefacta-store", "claims-1"],
  },
  {
    id: "transformer", category: "marine", client: "TRANSELECTRIC S.A.",
    title: text("Autotransformador de potencia Pauwels", "Pauwels power autotransformer"),
    location: text("Autoridad Portuaria de Guayaquil", "Guayaquil Port Authority"),
    summary: text("Marine Cargo Damage Survey de un autotransformador trifásico de 225 MVA.", "Marine Cargo Damage Survey of a 225 MVA three-phase autotransformer."),
    paragraphs: [text("Peritaje de daños de carga marítima en un autotransformador trifásico de potencia Pauwels Contracting, propiedad de Transelectric S.A., transportado en el buque CCNI Chagres, viaje 0711.", "Marine cargo damage survey of a Pauwels Contracting three-phase power autotransformer, owned by Transelectric S.A. and carried aboard CCNI Chagres, voyage 0711."), text("La causa raíz indicada en el brochure es la falla de grúas telescópicas de Mamut Andino. La inspección y el archivo fotográfico documentan la condición del equipo, su embalaje y las maniobras en la Autoridad Portuaria de Guayaquil.", "The root cause identified in the brochure is failure of Mamut Andino telescopic cranes. The inspection and photographic archive document the equipment’s condition, packaging and handling at the Guayaquil Port Authority."), text("El brochure también incluye un informe de inspección del transformador Pauwels de 225 MVA, fechado el 22 de marzo de 2010, para Colonial Compañía de Seguros y Reaseguros S.A. / CELEC-Transelectric, subestación Milagro.", "The brochure also includes a 225 MVA Pauwels transformer inspection report dated 22 March 2010, for Colonial Compañía de Seguros y Reaseguros S.A. / CELEC-Transelectric, Milagro substation.")],
    facts: [{ label: text("Tensión", "Voltage"), value: text("230 / 138 / 13,8 kV", "230 / 138 / 13.8 kV") }, { label: text("Potencia", "Power rating"), value: text("138 / 180 / 225 MVA", "138 / 180 / 225 MVA") }, { label: text("Buque / viaje", "Vessel / voyage"), value: text("CCNI Chagres · 0711", "CCNI Chagres · 0711") }],
    images: [...sequence("marine-transformer", 6), ...sequence("crane-incident", 4), "claims-2", "claims-3", "claims-4", "claims-6"],
    documents: [{ title: text("Informe de inspección · 2010", "Inspection report · 2010"), href: "/documents/brochure-page-8.webp" }],
  },
  {
    id: "cargo", category: "marine", client: "ELECTROGUAYAS",
    title: text("Del puerto a la puesta en servicio", "From port to commissioning"),
    location: text("Guayaquil → Central Dr. Enrique García, Pascuales", "Guayaquil → Dr. Enrique García Plant, Pascuales"),
    summary: text("Seguimiento de descarga, transporte terrestre, montaje y pruebas de turbogeneradores.", "Monitoring of turbogenerator unloading, land transport, assembly and testing."),
    paragraphs: [text("Inspección de estiba de turbogeneradores a bordo, survey de descarga del buque, izaje y montaje en tráiler plataforma cama baja, y transporte desde la Autoridad Portuaria de Guayaquil hasta la Central Térmica Dr. Enrique García.", "Inspection of onboard turbogenerator stowage, vessel unloading survey, lifting and loading onto low-bed platform trailers, and transport from the Guayaquil Port Authority to the Dr. Enrique García Thermal Power Plant."), text("El seguimiento comprende montaje y anclaje del equipo, acoplamiento y pruebas de generación eléctrica sin carga y con carga, de acuerdo con el alcance contratado.", "Monitoring includes equipment assembly and anchoring, coupling, and no-load and load power generation testing, in accordance with the contracted scope."), text("El contrato histórico de 2003 incluido en el brochure documenta inspección de trincada, descarga a muelle, almacenamiento, estiba en camión, transporte carretero, ingreso a la central, destrincada, desmontaje y maniobra de puesta en sitio de la turbina TG-5.", "The historical 2003 contract included in the brochure documents inspections of lashing, unloading to the quay, storage, truck stowage, road transport, entry to the plant, unlashing, dismantling and positioning of the TG-5 turbine."), text("Una nota de El Universo del 18 de diciembre de 2009 sobre la llegada de tres turbogeneradores al Puerto Marítimo cita a Carlos Quevedo como inspector de Seajuste/Seariesgo. El archivo también incluye módulos de generación TM4 y TM6 y sistemas de protección contra incendios.", "An El Universo article dated 18 December 2009 on the arrival of three turbogenerators at the seaport quotes Carlos Quevedo as a Seajuste/Seariesgo inspector. The archive also includes TM4 and TM6 generation modules and fire protection systems.")],
    images: [...sequence("cargo-unloading", 6), ...sequence("land-transport", 3), ...sequence("cargo-shore", 5), ...sequence("cargo-assembly", 6), ...sequence("power-modules", 3), "assembly-overview"],
    documents: [{ title: text("Nota de El Universo · 18/12/2009", "El Universo article · 18/12/2009"), href: "/documents/brochure-page-17.webp" }, { title: text("Contrato de inspección TG-5 · 2003", "TG-5 inspection contract · 2003"), href: "/documents/brochure-page-19.webp" }],
  },
  {
    id: "barge", category: "marine", client: "POWER BARGE SURVEY",
    title: text("Barcazas de generación eléctrica", "Power generation barges"),
    location: text("Inspecciones a bordo y conexión en tierra", "Onboard surveys & onshore connection"),
    summary: text("Inspección integral de generación, combustible, protección contra incendios y subestaciones.", "Integrated surveys of generation, fuel, fire protection and substations."),
    paragraphs: [text("Inspección a bordo de barcazas con sistemas de generación eléctrica mediante motores de combustión interna, calderas y sus sistemas auxiliares.", "Onboard inspections of barges with power generation systems using internal combustion engines, boilers and auxiliary systems."), text("El alcance documentado incluye abastecimiento y plan de estiba de combustible, sistemas de protección contra incendio, subestación eléctrica a bordo y acoplamiento de línea de subtransmisión a la subestación en tierra.", "The documented scope includes fuel supply and stowage planning, fire protection systems, the onboard electrical substation and connection of the subtransmission line to the onshore substation.")],
    images: ["power-barge-overview", ...sequence("power-barge", 4), ...sequence("barge-engine", 4), "power-barge-detail", "barge-systems"],
  },
  {
    id: "excavator", category: "equipment", client: "EQUIPO Y MAQUINARIA",
    title: text("Peritaje de equipo caminero", "Earthmoving equipment survey"),
    location: text("Inspección en área rural y taller autorizado", "Rural-site & authorised workshop inspection"),
    summary: text("De la verificación en campo al desmontaje, la revisión técnica y la cuantificación de la pérdida.", "From field verification to dismantling, technical inspection and loss quantification."),
    paragraphs: [text("Inspección física del lugar del siniestro y verificación de daños del equipo caminero asegurado. El archivo muestra las inspecciones en campo y las revisiones posteriores en taller.", "Physical inspection of the loss site and verification of damage to insured earthmoving equipment. The archive shows field inspections and subsequent workshop examinations."), text("Supervisión del desmontaje de estructura, sistemas hidráulicos, mecanismos de operación, componentes de motor y sistemas auxiliares; análisis y cuantificación junto con técnicos del taller autorizado y de la empresa representante de la marca.", "Supervision of dismantling of structures, hydraulic systems, operating mechanisms, engine components and auxiliary systems; analysis and quantification with authorised workshop and brand representative technicians.")],
    images: [...sequence("excavator-field", 6), ...sequence("equipment-inspection", 6), "equipment-overview"],
  },
  {
    id: "buildings", category: "civil", client: "PERITAJE DE EDIFICIOS",
    title: text("Evaluación de daños sísmicos en edificios", "Seismic damage assessment of buildings"),
    location: text("Guayaquil y Manta", "Guayaquil & Manta"),
    summary: text("Inspección de fisuras, grietas y daños estructurales, con valoración del reclamo.", "Inspection of fissures, cracks and structural damage, with claim valuation."),
    paragraphs: [text("Inspección técnica de daños por sismos amparados por pólizas de incendio y líneas aliadas. Revisión exterior e interior de estructuras, fisuras y grietas, cuantificación de daños y valoración del reclamo.", "Technical inspection of earthquake damage covered by fire and allied perils policies. Examination of structures, fissures and cracks inside and outside buildings, damage quantification and claim valuation."), text("El proceso comprende la discusión de liquidación del reclamo y el ajuste del siniestro. El brochure incluye fotografías de edificios inspeccionados en Guayaquil y Manta.", "The process includes discussion of the claim settlement and loss adjustment. The brochure includes photographs of inspected buildings in Guayaquil and Manta.")],
    images: [...sequence("manta-building", 4), ...sequence("guayaquil-building", 6), "building-overview"],
  },
  {
    id: "roads", category: "civil", client: "AUTORIDAD PORTUARIA DE ESMERALDAS",
    title: text("Vías e infraestructura portuaria", "Port roads & infrastructure"),
    location: text("Esmeraldas, Ecuador", "Esmeraldas, Ecuador"),
    summary: text("Daños sísmicos en vías de tránsito y seguimiento técnico de su reparación.", "Earthquake damage to roads and technical monitoring of repairs."),
    paragraphs: [text("Inspección técnica de daños en vías de tránsito a consecuencia de sismos, bajo pólizas de incendio y líneas aliadas. Revisión de fisuras, grietas y calicatas para documentar el alcance del daño.", "Technical inspection of earthquake damage to roads under fire and allied perils policies. Examination of fissures, cracks and trial pits to document the extent of damage."), text("La intervención incluye supervisión de trabajos de reparación, cuantificación de daños, valoración del reclamo y ajuste del siniestro. El archivo fotográfico corresponde a la Autoridad Portuaria de Esmeraldas.", "The assignment includes supervision of repair works, damage quantification, claim valuation and loss adjustment. The photographic archive relates to the Esmeraldas Port Authority.")],
    images: [...sequence("esmeraldas-roads", 4), ...sequence("road-repairs", 5)],
  },
  {
    id: "urban", category: "vehicles", client: "PERITAJE DE VEHÍCULOS",
    title: text("Reconstrucción de accidentes urbanos", "Urban accident reconstruction"),
    location: text("Vehículos livianos en zona urbana", "Light vehicles in urban areas"),
    summary: text("Mediciones de campo, análisis de impactos y reconstrucción técnica de los hechos.", "Field measurements, impact analysis and technical reconstruction of events."),
    paragraphs: [text("Reconstrucción de accidentes de vehículos livianos mediante inspección física del lugar, levantamiento de medidas, revisión del parte policial y análisis de impactos y deformaciones.", "Reconstruction of light-vehicle accidents through site inspection, measurements, police report review and analysis of impacts and deformation."), text("El análisis busca establecer la causa raíz, cuantificar y valorar daños y ajustar el siniestro. Para vehículos de alta gama se puede incorporar soporte técnico de talleres de la concesionaria.", "The analysis seeks to establish root cause, quantify and value damage, and adjust the loss. For high-end vehicles, technical support from dealership workshops may be involved.")],
    images: [...sequence("urban-reconstruction", 8), ...sequence("urban-measurements", 4)],
  },
  {
    id: "highway", category: "vehicles", client: "TRANSPORTE PESADO",
    title: text("Accidentes de vehículos pesados", "Heavy-vehicle accidents"),
    location: text("Reconstrucción en carretera", "Highway reconstruction"),
    summary: text("Análisis de datos y diagramas policiales, inspección del vehículo y cuantificación de la pérdida.", "Analysis of police data and diagrams, vehicle inspection and loss quantification."),
    paragraphs: [text("Reconstrucción técnica de accidentes de vehículos pesados en carretera mediante tecnología de análisis de impactos y deformaciones, tomando como referencia los datos y diagramas del parte policial.", "Technical reconstruction of heavy-vehicle highway accidents using impact and deformation analysis technology, based on police report data and diagrams."), text("La inspección física del vehículo y del lugar del siniestro sustenta el análisis del impacto, la cuantificación de la pérdida y el ajuste. El brochure incluye esquemas de reconstrucción y referencias del lugar y de las mediciones.", "Physical inspection of the vehicle and loss site supports impact analysis, loss quantification and adjusting. The brochure includes reconstruction diagrams and site and measurement references.")],
    images: [...sequence("highway-reconstruction", 4), ...sequence("highway-evidence", 3), ...sequence("highway-analysis", 3)],
  },
];

export const team = [
  { id: "carlos-quevedo", name: "Carlos Quevedo", role: text("Gerente general · Perito de seguros", "General Manager · Insurance loss adjuster"), specialty: text("Dirección y ajuste de siniestros", "Management & loss adjusting"), background: "SEAJUSTE S.A.", lead: true },
  { id: "josue-gavilanez", name: "Josué Gavilánez", role: text("Ingeniero mecánico", "Mechanical engineer"), specialty: text("Turbogeneradores", "Turbogenerators"), background: text("Ex CELEC", "Former CELEC") },
  { id: "ana-zambrano", name: "Ana Zambrano", role: text("Ingeniera química", "Chemical engineer"), specialty: text("Calderas y sistemas de vapor", "Boilers & steam systems"), background: "" },
  { id: "cristian-chauca", name: "Cristian Chauca", role: text("Magíster en Ciencias Ambientales", "Master’s degree in Environmental Sciences"), specialty: text("Ciencias ambientales", "Environmental sciences"), background: "" },
  { id: "andres-coronel", name: "Andrés Coronel", role: text("Máster en Ingeniería en Seguridad contra Incendios", "Master’s degree in Fire Safety Engineering"), specialty: text("Protección contra incendios", "Fire protection"), background: text("Miembro NFPA", "NFPA member") },
  { id: "gustavo-gonzaga", name: "Gustavo Gonzaga", role: text("Ingeniero eléctrico", "Electrical engineer"), specialty: text("Sistemas de potencia", "Power systems"), background: text("Ex gerente E.E. Milagro", "Former E.E. Milagro Manager") },
  { id: "manuel-patino", name: "Manuel Patiño", role: text("Ingeniero mecánico", "Mechanical engineer"), specialty: text("Equipo y maquinaria", "Plant & machinery"), background: text("Ex gerente de Servicios · IIASA–Caterpillar", "Former Services Manager · IIASA–Caterpillar") },
  { id: "emily-quevedo", name: "Emily Quevedo", role: text("Economista", "Economist"), specialty: text("Lucro cesante y seguros", "Business interruption & insurance"), background: "" },
  { id: "pablo-ramirez", name: "Pablo Ramírez", role: text("Abogado", "Lawyer"), specialty: text("Soporte legal en seguros", "Insurance legal support"), background: "" },
  { id: "miguel-chavez", name: "Miguel Chávez", role: text("Ingeniero civil y geólogo", "Civil engineer & geologist"), specialty: text("Ingeniería civil y ciencias de la tierra", "Civil engineering & earth sciences"), background: text("Ex decano de Ciencias de la Tierra · ESPOL", "Former Dean of Earth Sciences · ESPOL") },
  { id: "miguel-yapur", name: "Miguel Yapur", role: text("Ingeniero eléctrico", "Electrical engineer"), specialty: text("Ingeniería eléctrica", "Electrical engineering"), background: text("Ex decano de la Facultad Eléctrica · ESPOL", "Former Dean of the Electrical Faculty · ESPOL") },
  { id: "ricardo-gallegos", name: "Ricardo Gallegos", role: text("Ingeniero en petróleos", "Petroleum engineer"), specialty: text("Petróleo y ciencias de la tierra", "Petroleum & earth sciences"), background: text("Ex decano de Ciencias de la Tierra · ESPOL", "Former Dean of Earth Sciences · ESPOL") },
  { id: "marco-leiva", name: "Marco Leiva", role: text("Ingeniero naval · Capitán de Navío SP", "Naval engineer · Retired Navy Captain"), specialty: text("Ingeniería naval", "Naval engineering"), background: text("Armada del Ecuador", "Ecuadorian Navy") },
  { id: "jorge-loor", name: "Jorge Loor", role: text("Magíster en Administración de Empresas", "Master’s degree in Business Administration"), specialty: text("Poliductos, oleoductos y terminales", "Product pipelines, oil pipelines & terminals"), background: text("Ex gerente de Transportes · EP Petroecuador", "Former Transport Manager · EP Petroecuador") },
  { id: "carla-garcia", name: "Carla García L.", role: text("Ingeniera agrícola", "Agricultural engineer"), specialty: text("Sector agropecuario", "Agricultural sector"), background: text("Ex directora ejecutiva · Asociación Zamorano", "Former Executive Director · Asociación Zamorano") },
];

export const companyHistory = {
  pdf: aboutPdfs.history,
  paragraphs: [
    text("Nuestra trayectoria en seguros se inicia en 1987, cuando Carlos Quevedo comenzó a ejercer como ajustador independiente, incorporando al análisis de siniestros una formación técnica desarrollada previamente en ingeniería mecánica, mantenimiento, protección contra incendios y control de averías.", "Our insurance history began in 1987, when Carlos Quevedo started practising as an independent loss adjuster, bringing to loss analysis a technical background developed in mechanical engineering, maintenance, fire protection and damage control."),
    text("Desde sus primeros años, la actividad evolucionó hacia reclamos de creciente complejidad. En 1990, antecedentes documentales del Proyecto Hidroeléctrico Paute registran participación junto a The Salvage Association de Londres en inspecciones de daños, revisión de reclamos y preparación de información técnica. En 1992 la experiencia se institucionalizó con la constitución de Servicios Especializados Asociados SEAJUSTE S.A., y desde 1999 continuó bajo la denominación SEAJUSTE S.A. Ajustadores de Siniestros.", "From its early years, the practice evolved towards increasingly complex claims. In 1990, records of the Paute Hydroelectric Project document participation alongside The Salvage Association of London in damage surveys, claims review and the preparation of technical information. In 1992, this experience was formalised with the incorporation of Servicios Especializados Asociados SEAJUSTE S.A., continuing from 1999 under the name SEAJUSTE S.A. Ajustadores de Siniestros."),
    text("Con una trayectoria profesional iniciada en 1987, y más de una década de experiencia en el ajuste de siniestros de carácter técnico, SEAJUSTE fue convocada por empresas del sector eléctrico ecuatoriano para presentar sus servicios profesionales especializados.", "With a professional career that began in 1987 and more than a decade of experience in adjusting technical losses, SEAJUSTE was invited by companies in Ecuador’s electricity sector to present its specialist professional services."),
    text("En el marco del ex-INECEL —Instituto Ecuatoriano de Electrificación— y de los programas de seguros y reaseguros correspondientes, las empresas eléctricas contrataron directamente los servicios de SEAJUSTE S.A. para la evaluación, preparación y gestión técnica de reclamos y siniestros, intervención que incluía gestiones ante reaseguradores y ajustadores internacionales, al amparo de la cláusula Cut Through.", "Within the framework of the former INECEL —Instituto Ecuatoriano de Electrificación— and the corresponding insurance and reinsurance programmes, the electricity companies directly engaged SEAJUSTE S.A. to assess, prepare and technically manage claims and losses. This involvement included coordination with international reinsurers and adjusters under the Cut Through clause."),
    text("Esta etapa consolidó la experiencia de SEAJUSTE en siniestros complejos del sector energético y su participación profesional en gestiones relacionadas con el mercado reasegurador internacional.", "This stage consolidated SEAJUSTE’s experience in complex energy-sector losses and its professional involvement in matters relating to the international reinsurance market."),
    text("A lo largo de esta trayectoria se han desarrollado asignaciones en generación y transmisión eléctrica, maquinaria, equipos críticos, carga marítima y pérdidas por interrupción de negocio. Contratos, informes técnicos, actas de finiquito y antecedentes de gestiones ante reaseguradores en Londres constituyen evidencia documental de una práctica construida sobre ingeniería, investigación de causa, cuantificación y dominio de seguros.", "Throughout this history, assignments have covered power generation and transmission, machinery, critical equipment, marine cargo and business interruption losses. Contracts, technical reports, settlement documents and records of claims coordination with reinsurers in London provide documentary evidence of a practice built on engineering, cause investigation, quantification and insurance expertise."),
    text("Hoy esa experiencia se proyecta bajo un mismo principio: ingeniería especializada aplicada al peritaje y ajuste de reclamos y siniestros complejos.", "Today, that experience continues under the same principle: specialist engineering applied to the surveying and adjustment of complex claims and losses."),
  ],
};

type CompanyHistoryText = Localized | { text: Localized; emphasis?: boolean }[];

type CompanyHistoryDocument = {
  id: string;
  section: "review" | "claims" | "reinsurance";
  date: string;
  endDate?: string;
  dateLabel: Localized;
  pdf: typeof aboutPdfs.history;
  title: Localized;
  details: { heading?: Localized; text: CompanyHistoryText }[];
  excerpts?: Localized[];
  settlement?: number;
  reference: Localized;
};

export const companyHistoryDocuments: CompanyHistoryDocument[] = [
  {
    id: "paute-1990", section: "review", date: "1990-12", dateLabel: text("Diciembre de 1990", "December 1990"),
    pdf: aboutPdfs.paute,
    title: text("Proyecto hidroeléctrico Paute · Fase B", "Paute hydroelectric project · Phase B"),
    details: [{ text: text("Informe de inspección de daños de carga marítima del Proyecto Hidroeléctrico Paute para The Salvage Association, Londres. La documentación menciona al Ing. Carlos Quevedo, SEA Loss Adjusters, y recoge la intervención de los ajustadores en el acceso a los buques, la inspección y el registro fotográfico de los equipos, así como en las acciones para minimizar las pérdidas con el acuerdo previo de La Nacional.", "Marine project cargo damage survey report for the Paute Hydroelectric Project, prepared for The Salvage Association, London. The records name engineer Carlos Quevedo, SEA Loss Adjusters, and describe the adjusters’ role in gaining access to vessels, surveying and photographing equipment, and taking loss-minimisation measures with La Nacional’s prior agreement.") }],
    excerpts: [
      text("G.I.E. señaló dificultades para acceder al puerto y a los buques que llegaban a Guayaquil. Esto no pareció afectar a los ajustadores S.E.A., quienes no solo lograron acceder a los buques, sino que tomaron fotografías de los equipos en las bodegas.", "G.I.E. claimed that they had difficulty in obtaining access to the Port and had no access to vessels arriving at Guayaquil. This did not seem to effect the loss Adjustors S.E.A. who not only managed to obtain access to the vessels but took photographs of equipment in ship hold."),
      text("Al revisar los resultados de la inspección de daños respecto de los reclamos, se hizo evidente que la mayoría de las acciones para minimizar las pérdidas fueron tomadas por los ajustadores con el acuerdo previo de La Nacional.", "On reviewing the results of damage survey in respect of the claims, it became apparent that most of the action to minimize loss were taken by the loss adjustors with the prior agreement of La Nacional."),
    ],
    reference: text("The Salvage Association · Londres · Marine Project Cargo & Damage Survey Report · Ing. Carlos Quevedo, SEA Loss Adjusters", "The Salvage Association · London · Marine Project Cargo & Damage Survey Report · Eng. Carlos Quevedo, SEA Loss Adjusters"),
  },
  {
    id: "transelectric-2000", section: "claims", date: "2000-02-01", endDate: "2000-03-28", dateLabel: text("1 de febrero y 28 de marzo de 2000", "1 February and 28 March 2000"),
    pdf: aboutPdfs.london,
    title: text("Gestión de reclamos en el mercado reasegurador de Londres", "Claims coordination in the London reinsurance market"),
    details: [
      {
        heading: text("Memorando N.º 09-00 · Comisión de servicio al exterior", "Memorandum No. 09-00 · Overseas assignment"),
        text: [
          { text: text("El 1 de febrero de 2000, el Directorio de Transelectric S.A. autorizó el viaje a Londres de su ", "On 1 February 2000, Transelectric S.A.’s board authorised its ") },
          { text: text("Presidente ejecutivo", "Executive president"), emphasis: true },
          { text: text(", en compañía del ", " to travel to London with ") },
          { text: text("Ing. Carlos Quevedo", "engineer Carlos Quevedo"), emphasis: true },
          { text: text(", gerente de SEAJUSTE, para gestionar ante reaseguradores y ajustadores internacionales la recuperación de valores de siniestros de autotransformadores.", ", SEAJUSTE’s manager, to pursue recovery of autotransformer loss claims with international reinsurers and adjusters.") },
        ],
      },
      { heading: text("Correo del 28 de marzo de 2000 · AON Group Ltd., Londres", "Email dated 28 March 2000 · AON Group Ltd., London"), text: text("La comunicación dirigida a Energy Claims Division de AON Group Ltd., Londres, detalla en tres numerales los puntos sobre el trámite e indemnización de reclamos que se tratarían en una reunión de trabajo en sus oficinas. El correo fue copiado al Ing. Carlos Quevedo, SEAJUSTE S.A.", "Correspondence addressed to the Energy Claims Division of AON Group Ltd., London, sets out three numbered points concerning claims handling and settlement for discussion at a working meeting in its offices. Engineer Carlos Quevedo, SEAJUSTE S.A., was copied on the email.") },
    ],
    reference: text("Transelectric S.A. · Memorando N.º 09-00 y correspondencia con Energy Claims Division, AON Group Ltd.", "Transelectric S.A. · Memorandum No. 09-00 and correspondence with Energy Claims Division, AON Group Ltd."),
  },
  {
    id: "settlement-2000", section: "reinsurance", date: "2000-03", dateLabel: text("Marzo de 2000", "March 2000"),
    pdf: aboutPdfs.settlement,
    title: text("Gestiones en el mercado reasegurador · Reclamos y siniestros del ex INECEL", "Reinsurance market coordination · Former INECEL claims and losses"),
    details: [
      { heading: text("Acta de finiquito y renuncia", "Release and settlement agreement"), text: text("Documento de marzo de 2000 relativo a reclamos del ex Instituto Ecuatoriano de Electrificación (INECEL) y del Fondo de Solidaridad. Registra el acuerdo con el mercado de reaseguradores de Londres para el cierre de reclamos de generación y transmisión eléctrica.", "March 2000 document concerning claims of the former Instituto Ecuatoriano de Electrificación (INECEL) and the Solidarity Fund. It records an agreement with the London reinsurance market to settle power generation and transmission claims.") },
      { heading: text("Intervinientes", "Participants"), text: text("Progreso Compañía de Seguros y Reaseguros S.A.; el mercado de reaseguradores de Londres; el Fondo de Solidaridad, representado por el vicepresidente de la República del Ecuador. Presidentes Ejecutivos de: Hidropaute S.A., Hidroagoyán S.A., Hidropucará S.A., Termoesmeraldas S.A., Termopichincha S.A., Electroguayas S.A. y Transelectric S.A. SEAJUSTE S.A. empresa contratada que intervino por el sector eléctrico.", "Progreso Compañía de Seguros y Reaseguros S.A.; the London reinsurance market; the Solidarity Fund, represented by Ecuador’s vice president. Executive Presidents of: Hidropaute S.A., Hidroagoyán S.A., Hidropucará S.A., Termoesmeraldas S.A., Termopichincha S.A., Electroguayas S.A. and Transelectric S.A. SEAJUSTE S.A., the company contracted to act on behalf of the electricity sector.") },
    ],
    settlement: 1294981,
    reference: text("Acta de finiquito y renuncia · Fondo de Solidaridad · Sector eléctrico", "Release and settlement agreement · Solidarity Fund · Electricity sector"),
  },
];

export const clients = [
  ["aseguradora-del-sur", "Aseguradora del Sur"], ["colonial", "Seguros Colonial"], ["atlas", "Atlas Compañía de Seguros"],
  ["sul-america", "Sul América Seguros"], ["el-fenix", "El Fénix del Ecuador"], ["generali", "Generali"],
  ["artefacta", "Artefacta"], ["espol", "ESPOL"], ["ciat", "CIAT Colombia S.A.S."],
  ["puerto-esmeraldas", "Autoridad Portuaria de Esmeraldas"], ["transelectric", "CELEC EP Transelectric"], ["cnel", "CNEL EP"],
  ["electroguayas", "CELEC EP Electroguayas"], ["termoesmeraldas", "CELEC EP Termoesmeraldas"], ["hidroagoyan", "CELEC EP Hidroagoyán"],
  ["hidronacion", "CELEC EP Hidronación"], ["hidroabanico", "Hidroabanico"],
] as const;

export const timeline = [
  { year: "1975", title: text("La ingeniería como punto de partida", "An engineering foundation"), detail: text("Jefatura de talleres del Consejo Provincial del Guayas: mantenimiento de equipo caminero y transporte pesado.", "Head of workshops at the Guayas Provincial Council: maintenance of earthmoving equipment and heavy transport.") },
  { year: "1975–1978", title: text("Protección contra incendios", "Fire protection"), detail: text("Ingeniería de planta en el Benemérito Cuerpo de Bomberos de Guayaquil. Formación en Estados Unidos, incluidas empresas privadas y la Fire Academy de Nueva York.", "Plant engineering at the Guayaquil Fire Department. Training in the United States, including private companies and the New York Fire Academy.") },
  { year: "1978–1987", title: text("Ingeniería mecánica y control de averías", "Mechanical engineering & damage control"), detail: text("Jefatura del Departamento de Ingeniería Mecánica y Control de Averías en la Armada del Ecuador.", "Head of the Mechanical Engineering and Damage Control Department in the Ecuadorian Navy.") },
  { year: "1987", title: text("Ingreso al mercado de seguros", "Entering the insurance market"), detail: text("Inicio de la actividad en seguros como profesional independiente, aplicando experiencia de ingeniería al análisis de siniestros.", "Insurance practice began as an independent professional, applying engineering experience to loss analysis.") },
  { year: "1992", title: text("Constitución de SEAJUSTE", "SEAJUSTE established"), detail: text("Constitución de Servicios Especializados Asociados SEAJUSTE S.A., denominación utilizada entre 1992 y 1999.", "Establishment of Servicios Especializados Asociados SEAJUSTE S.A., the company name used from 1992 to 1999.") },
  { year: "1999", title: text("SEAJUSTE S.A. Ajustadores de Siniestros", "SEAJUSTE S.A. Ajustadores de Siniestros"), detail: text("Cambio de razón social por las regulaciones de la Superintendencia de Bancos y Seguros. Escritura emitida el 5 de marzo de 1999, Notaría Vigésima de Guayaquil.", "Corporate name change under the regulations of the Superintendency of Banks and Insurance. Deed issued on 5 March 1999 at the Twentieth Notary’s Office in Guayaquil.") },
];

export const methodology = [
  { title: text("Inspeccionar y documentar", "Inspect & document"), description: text("Verificamos hechos, circunstancias, condición de los bienes y documentación del siniestro.", "We verify facts, circumstances, asset condition and loss documentation.") },
  { title: text("Investigar la causa", "Investigate the cause"), description: text("Contrastamos hipótesis con pruebas de campo y análisis mecánico, eléctrico y técnico.", "We test hypotheses against field evidence and mechanical, electrical and technical analysis.") },
  { title: text("Evaluar y cuantificar", "Assess & quantify"), description: text("Determinamos alcance de daños, reparabilidad, reposición, costos y efectos de la interrupción.", "We establish damage extent, repairability, replacement, costs and interruption effects.") },
  { title: text("Informar y acompañar", "Report & follow through"), description: text("Integramos la revisión de la póliza, el informe técnico y el seguimiento hasta la conclusión del reclamo.", "We bring together policy review, the technical report and follow-up through to claim conclusion.") },
];

export const authorizations = [
  text("Incendio y líneas aliadas", "Fire and allied perils"),
  text("Lucro cesante a consecuencia de incendio y líneas aliadas", "Business interruption following fire and allied perils"),
  text("Rotura de maquinaria", "Machinery breakdown"),
  text("Pérdida de beneficio por rotura de maquinaria", "Loss of profit following machinery breakdown"),
  text("Multiriesgo", "Multi-risk"), text("Montaje de maquinaria", "Machinery erection"),
  text("Equipo y maquinaria de contratistas", "Contractors’ plant and machinery"),
  text("Todo riesgo para contratistas", "Contractors’ all risks"), text("Obras civiles terminadas", "Completed civil works"),
  text("Todo riesgo petrolero", "Oil all risks"), text("Equipo electrónico", "Electronic equipment"),
  text("Transporte", "Cargo transport"), text("Vehículos", "Motor vehicles"), text("Marítimo", "Marine"),
  text("Responsabilidad civil", "Civil liability"), text("Agropecuario", "Agricultural insurance"),
];

export const corporatePurpose = [
  text("Investigación, análisis, ajuste y liquidación de averías, siniestros, reclamos y convenios de ajuste.", "Investigation, analysis, adjustment and settlement of damage, losses, claims and adjustment agreements."),
  text("Asistencia técnica, servicios técnicos y actos legales o técnicos.", "Technical assistance, technical services and legal or technical acts."),
  text("Servicios de carácter técnico y de ingeniería.", "Technical and engineering services."),
  text("Reclamos y subrogaciones.", "Claims and subrogation."), text("Recuperos y salvatajes.", "Recoveries and salvage."),
  text("Control, custodia y transporte.", "Control, custody and transport."),
  text("Liquidación de averías, actas de protesto y comisarios de averías.", "Damage settlement, protest statements and average agents."),
  text("Asesoría, auditoría y avalúos.", "Advisory services, auditing and valuations."),
  text("Corresponsalías y representación nacional e internacional.", "National and international correspondence and representation."),
];

export const economicActivities = [
  { code: "K66210001", description: text("Servicios administrativos relacionados con seguros: evaluación de reclamaciones, tasación de indemnizaciones, evaluación de riesgos y daños, tasación de averías y pérdidas y liquidación de solicitudes de indemnización.", "Insurance-related administrative services: claims assessment, compensation appraisal, risk and damage assessment, damage and loss valuation, and settlement of compensation applications.") },
  { code: "M74902901", description: text("Otros tipos de consultoría técnica.", "Other types of technical consultancy.") },
  { code: "M74902101", description: text("Actividades de consultoría de seguridad.", "Security consultancy activities.") },
  { code: "M71102405", description: text("Elaboración y realización de proyectos de ingeniería eléctrica y electrónica.", "Development and execution of electrical and electronic engineering projects.") },
  { code: "M71201101", description: text("Ensayos físicos, químicos y analíticos de materiales y productos: acústica, vibraciones, calificación, fiabilidad y análisis de defectos.", "Physical, chemical and analytical testing of materials and products: acoustics, vibration, qualification, reliability and defect analysis.") },
  { code: "M71201601", description: text("Ensayos radiográficos de soldaduras y juntas y ensayos de rendimiento de maquinaria completa, motores, automóviles y equipo electrónico.", "Radiographic testing of welds and joints, and performance testing of complete machinery, engines, vehicles and electronic equipment.") },
  { code: "N80200101", description: text("Supervisión a distancia de sistemas electrónicos de seguridad, alarmas contra robo e incendio, incluida instalación, mantenimiento y venta de estos sistemas.", "Remote monitoring of electronic security systems and theft and fire alarms, including installation, maintenance and sale of these systems.") },
  { code: "F43220101", description: text("Instalación, ampliación, reparación, reforma y mantenimiento de calefacción eléctrica, de gas y gasóleo; calderas, torres de refrigeración, colectores solares no eléctricos, fontanería y sanitarios, ventilación, gas, vapor, aspersores contra incendio y riego por aspersión.", "Installation, extension, repair, alteration and maintenance of electric, gas and oil heating; boilers, cooling towers, non-electric solar collectors, plumbing and sanitation, ventilation, gas, steam, fire sprinklers and sprinkler irrigation.") },
  { code: "C33140101", description: text("Reparación y mantenimiento por contrato de transformadores de fuerza, distribución y usos especiales, motores eléctricos, generadores, motores-generadores y convertidores eléctricos como rectificadores e inversores.", "Contract repair and maintenance of power, distribution and special-purpose transformers, electric motors, generators, motor-generators and electrical converters such as rectifiers and inverters.") },
  { code: "F43210101", description: text("Instalación y mantenimiento de accesorios eléctricos, telecomunicaciones, redes informáticas, televisión por cable, fibra óptica, antenas parabólicas y conexiones de aparatos eléctricos, equipo doméstico y calefacción radiante.", "Installation and maintenance of electrical fittings, telecommunications, computer networks, cable television, fibre optics, satellite antennas and connections for electrical appliances, household equipment and radiant heating.") },
];

export const supplierProducts = [
  ["71620", text("Tasación de reclamaciones al seguro", "Insurance claims appraisal")],
  ["71334", text("Otros servicios de seguros contra daños a los bienes", "Other property damage insurance services")],
  ["71339", text("Otros servicios de seguros distintos de vida", "Other non-life insurance services")],
  ["71335", text("Servicios de seguros de responsabilidad civil general", "General liability insurance services")],
  ["71336", text("Servicios de seguros de créditos y fianzas", "Credit and surety insurance services")],
  ["83313", text("Ingeniería integrada para plantas y procesos industriales", "Integrated engineering for industrial plants and processes")],
  ["83323", text("Gestión de proyectos de construcción de plantas y procesos industriales", "Project management for construction of industrial plants and processes")],
  ["48270", text("Sistemas automáticos de control de procesos industriales", "Automatic industrial process control systems")],
  ["86340", text("Distribución de vapor de agua y agua caliente por tubería", "Distribution of steam and hot water through pipelines")],
  ["87152", text("Reparación de maquinaria y aparatos eléctricos n.c.p.", "Repair of electrical machinery and apparatus n.e.c.")],
  ["87159", text("Mantenimiento y reparación de maquinaria y equipo n.c.p.", "Maintenance and repair of machinery and equipment n.e.c.")],
  ["88232", text("Servicios industriales de maquinaria y aparatos eléctricos", "Industrial services for electrical machinery and apparatus")],
  ["88239", text("Otros servicios industriales de maquinaria y equipo", "Other industrial machinery and equipment services")],
  ["83563", text("Ensayo y análisis de sistemas mecánicos y eléctricos", "Testing and analysis of mechanical and electrical systems")],
  ["83319", text("Ingeniería integrada para otros proyectos", "Integrated engineering for other projects")],
  ["54290", text("Construcción de otras obras de ingeniería n.c.p.", "Construction of other engineering works n.e.c.")],
  ["83311", text("Ingeniería integrada para edificios", "Integrated engineering for buildings")],
  ["42190", text("Estructuras y partes de hierro, acero o aluminio; planchas, varillas, ángulos, perfiles, secciones y tuberías para estructuras metálicas, excepto edificios prefabricados", "Iron, steel or aluminium structures and parts; plates, rods, angles, profiles, sections and pipes for metal structures, excluding prefabricated buildings")],
  ["54612", text("Instalación de equipos de alarma contra incendios", "Installation of fire alarm equipment")],
  ["91260", text("Servicios de policía y protección contra incendios", "Police and fire protection services")],
  ["17100", text("Energía eléctrica", "Electrical energy")],
  ["86311", text("Servicios relacionados con transmisión de electricidad", "Electricity transmission-related services")],
  ["86312", text("Servicios relacionados con distribución de electricidad", "Electricity distribution-related services")],
  ["54242", text("Construcción de líneas de comunicación y energía de larga distancia", "Construction of long-distance communication and power lines")],
  ["54611", text("Instalación de cables y otros dispositivos eléctricos", "Installation of cables and other electrical devices")],
  ["46121", text("Transformadores eléctricos", "Electrical transformers")],
  ["46132", text("Partes de transformadores eléctricos, convertidores estáticos y bobinas de inductancia", "Parts for electrical transformers, static converters and inductors")],
  ["46113", text("Grupos electrógenos y convertidores eléctricos rotativos", "Generating sets and rotary electrical converters")],
  ["46131", text("Partes y piezas de motores, generadores y aparatos eléctricos", "Parts for motors, generators and electrical apparatus")],
  ["46211", text("Aparatos de conexión o protección de circuitos para voltajes superiores a 1.000 V", "Electrical circuit connection or protection apparatus above 1,000 V")],
  ["46212", text("Aparatos de conexión o protección de circuitos para voltajes no superiores a 1.000 V", "Electrical circuit connection or protection apparatus not exceeding 1,000 V")],
  ["46213", text("Cuadros, consolas, mesas y bases para control o distribución eléctrica, voltajes no superiores a 1.000 V", "Boards, consoles, desks and bases for electrical control or distribution, not exceeding 1,000 V")],
  ["45214", text("Tableros, consolas, mesas y bases para control o distribución eléctrica, voltajes superiores a 1.000 V", "Boards, consoles, desks and bases for electrical control or distribution, above 1,000 V")],
  ["46111", text("Motores de potencia no superior a 37,5 W, otros motores y generadores de corriente continua", "Motors not exceeding 37.5 W, other DC motors and DC generators")],
  ["46112", text("Motores universales de corriente continua y alterna de más de 37,5 W, otros motores de corriente alterna y alternadores", "Universal AC/DC motors above 37.5 W, other AC motors and alternators")],
  ["84160", text("Otros servicios de telecomunicaciones n.c.p.", "Other telecommunications services n.e.c.")],
  ["87153", text("Reparación de equipo y aparatos de comunicaciones", "Repair of communications equipment and apparatus")],
] as const;
