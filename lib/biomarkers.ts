export type BiomarkerCategory =
  | "Blood Count"
  | "Heart Health"
  | "Metabolism"
  | "Kidney Health"
  | "Liver Health"
  | "Vitamins & Minerals"
  | "Thyroid"
  | "Hormones"
  | "Inflammation";

export interface Biomarker {
  slug: string;
  name: string;
  category: BiomarkerCategory;
  aliases: string[];
  unit: string;
  description: string;
  normalRange: { general?: string; male?: string; female?: string };
  lowMeaning: string;
  highMeaning: string;
  howToImprove: string[];
  relatedTests: string[];
  seoDescription: string;
}

export const CATEGORY_META: Record<
  BiomarkerCategory,
  { icon: string; color: string; description: string }
> = {
  "Blood Count": {
    icon: "bloodtype",
    color: "#EF4444",
    description: "Tests that evaluate the cells in your blood — red cells, white cells, and platelets.",
  },
  "Heart Health": {
    icon: "favorite",
    color: "#F97316",
    description: "Markers that assess cardiovascular risk including cholesterol, triglycerides, and more.",
  },
  Metabolism: {
    icon: "local_fire_department",
    color: "#F59E0B",
    description: "Blood sugar, insulin, and metabolic markers that reflect how your body uses energy.",
  },
  "Kidney Health": {
    icon: "water_drop",
    color: "#3B82F6",
    description: "Markers that show how well your kidneys filter waste and maintain fluid balance.",
  },
  "Liver Health": {
    icon: "health_and_safety",
    color: "#10B981",
    description: "Enzymes and proteins produced by the liver, used to detect damage or disease.",
  },
  "Vitamins & Minerals": {
    icon: "nutrition",
    color: "#8B5CF6",
    description: "Essential nutrients your body needs for energy, immunity, bones, and nerve function.",
  },
  Thyroid: {
    icon: "psychology_alt",
    color: "#EC4899",
    description: "Hormones that regulate metabolism, energy, mood, and virtually every organ system.",
  },
  Hormones: {
    icon: "self_improvement",
    color: "#6366F1",
    description: "Chemical messengers controlling reproduction, stress response, and body composition.",
  },
  Inflammation: {
    icon: "thermostat",
    color: "#F43F5E",
    description: "Markers that detect acute or chronic inflammation anywhere in the body.",
  },
};

export const BIOMARKERS: Biomarker[] = [
  /* ── BLOOD COUNT ────────────────────────────────── */
  {
    slug: "hemoglobin",
    name: "Hemoglobin",
    category: "Blood Count",
    aliases: ["Hgb", "Hb"],
    unit: "g/dL",
    description:
      "Hemoglobin is the iron-containing protein inside red blood cells that carries oxygen from the lungs to every tissue in the body. It also transports carbon dioxide back to the lungs for exhalation. Hemoglobin levels are one of the most important indicators of anemia.",
    normalRange: { male: "13.5–17.5 g/dL", female: "12.0–15.5 g/dL" },
    lowMeaning:
      "Low hemoglobin (anemia) means your tissues may not be getting enough oxygen, causing fatigue, shortness of breath, pale skin, and dizziness. Common causes include iron deficiency, vitamin B12 or folate deficiency, chronic disease, or blood loss.",
    highMeaning:
      "High hemoglobin can occur in dehydration, chronic lung disease, sleep apnea, or polycythemia vera. It can thicken the blood and raise the risk of clots, stroke, and heart attack.",
    howToImprove: [
      "Eat iron-rich foods: red meat, liver, spinach, lentils, tofu",
      "Pair iron foods with vitamin C to boost absorption",
      "Take iron or B12 supplements if deficient (confirm with testing first)",
      "Stay well hydrated to prevent false elevations",
      "Treat underlying causes like heavy menstruation or GI bleeding",
    ],
    relatedTests: ["hematocrit", "rbc", "ferritin", "vitamin-b12", "folate"],
    seoDescription:
      "Learn what hemoglobin is, what normal hemoglobin levels are, and what low or high hemoglobin means for your health.",
  },
  {
    slug: "hematocrit",
    name: "Hematocrit",
    category: "Blood Count",
    aliases: ["Hct", "PCV", "Packed Cell Volume"],
    unit: "%",
    description:
      "Hematocrit measures the percentage of your blood volume made up of red blood cells. It is closely related to hemoglobin and is often reported together as part of a complete blood count (CBC). It reflects your blood's capacity to carry oxygen.",
    normalRange: { male: "41–53%", female: "36–46%" },
    lowMeaning:
      "A low hematocrit indicates anemia — too few red blood cells. This leads to reduced oxygen delivery, causing fatigue, weakness, and difficulty concentrating. It may stem from bleeding, nutritional deficiencies, bone marrow problems, or chronic illness.",
    highMeaning:
      "High hematocrit is seen with dehydration (blood becomes more concentrated), high-altitude living, heavy smoking, or polycythemia vera. It can increase the risk of blood clots and stroke.",
    howToImprove: [
      "Address the root cause (iron, B12, or folate deficiency)",
      "Drink plenty of fluids if dehydrated",
      "Avoid excessive exercise-induced dehydration",
      "Stop smoking to reduce erythropoietin-driven elevation",
      "Work with a doctor if polycythemia is suspected",
    ],
    relatedTests: ["hemoglobin", "rbc", "mcv", "iron", "ferritin"],
    seoDescription:
      "Understand your hematocrit result — what it measures, normal ranges, and what high or low values indicate.",
  },
  {
    slug: "rbc",
    name: "Red Blood Cell Count",
    category: "Blood Count",
    aliases: ["RBC", "Erythrocytes"],
    unit: "million/µL",
    description:
      "The red blood cell (RBC) count measures the number of erythrocytes in a volume of blood. Red blood cells contain hemoglobin and are responsible for oxygen transport throughout the body. An abnormal RBC count is always interpreted alongside hemoglobin and hematocrit.",
    normalRange: { male: "4.5–5.9 million/µL", female: "4.0–5.2 million/µL" },
    lowMeaning:
      "A low RBC count confirms anemia and indicates the body is not producing enough red blood cells, or they are being destroyed or lost faster than they are made. Symptoms include tiredness, paleness, and breathlessness.",
    highMeaning:
      "A high RBC count (erythrocytosis) can result from dehydration, high-altitude adaptation, smoking, or conditions like polycythemia vera. It raises blood viscosity and clot risk.",
    howToImprove: [
      "Eat iron-rich foods and lean protein",
      "Ensure adequate vitamin B12 and folate",
      "Stay hydrated",
      "Exercise moderately to stimulate healthy RBC production",
      "Consult a hematologist if persistently elevated or very low",
    ],
    relatedTests: ["hemoglobin", "hematocrit", "mcv", "mch", "ferritin"],
    seoDescription:
      "Find out what red blood cell count (RBC) means, normal RBC ranges, and what abnormal levels indicate.",
  },
  {
    slug: "wbc",
    name: "White Blood Cell Count",
    category: "Blood Count",
    aliases: ["WBC", "Leukocyte Count"],
    unit: "thousand/µL",
    description:
      "White blood cells (WBCs) are the immune system's army, defending the body against infections, viruses, and foreign substances. The WBC count is often the first signal of an infection, inflammation, or a blood disorder. A differential count identifies which specific types are elevated or low.",
    normalRange: { general: "4.5–11.0 thousand/µL" },
    lowMeaning:
      "Low WBC (leukopenia) means weakened immune defenses, making you vulnerable to infections. Causes include viral infections (HIV, hepatitis), bone marrow disorders, autoimmune diseases, chemotherapy, and certain medications.",
    highMeaning:
      "High WBC (leukocytosis) usually signals an active infection, inflammation, stress, or tissue damage. It can also indicate leukemia or other bone marrow disorders in extreme cases.",
    howToImprove: [
      "Maintain a balanced diet rich in antioxidants",
      "Get adequate sleep (7–9 hours)",
      "Manage stress with exercise and relaxation techniques",
      "Avoid smoking",
      "Treatment depends on the underlying cause — always consult your doctor",
    ],
    relatedTests: ["neutrophils", "lymphocytes", "monocytes", "eosinophils", "crp"],
    seoDescription:
      "Learn what your white blood cell (WBC) count means, normal ranges, and what high or low WBCs indicate.",
  },
  {
    slug: "platelets",
    name: "Platelet Count",
    category: "Blood Count",
    aliases: ["PLT", "Thrombocytes"],
    unit: "thousand/µL",
    description:
      "Platelets are tiny cell fragments that clump together to form clots and stop bleeding. They are produced in the bone marrow and are essential for wound healing. Both very low and very high platelet counts carry serious health risks.",
    normalRange: { general: "150–400 thousand/µL" },
    lowMeaning:
      "Low platelets (thrombocytopenia) increase the risk of bruising, prolonged bleeding, and internal hemorrhage. Causes include autoimmune conditions (ITP), viral infections, medications, liver disease, or bone marrow failure.",
    highMeaning:
      "High platelets (thrombocytosis) can raise the risk of abnormal clotting. Reactive thrombocytosis is common after infection, surgery, or iron deficiency. Primary thrombocytosis is caused by bone marrow disorders.",
    howToImprove: [
      "Eat leafy greens, papaya, and vitamin C-rich foods to support platelet production",
      "Avoid aspirin and NSAIDs if platelets are low",
      "Stay well hydrated",
      "Limit alcohol (it suppresses platelet production)",
      "Treat underlying infections or inflammatory conditions",
    ],
    relatedTests: ["wbc", "hemoglobin", "fibrinogen"],
    seoDescription:
      "Understand platelet count — what it measures, normal platelet ranges, and what high or low platelets mean.",
  },
  {
    slug: "mcv",
    name: "Mean Corpuscular Volume",
    category: "Blood Count",
    aliases: ["MCV"],
    unit: "fL",
    description:
      "MCV measures the average size of your red blood cells. It helps identify the type and likely cause of anemia. Large (macrocytic) cells suggest B12 or folate deficiency; small (microcytic) cells suggest iron deficiency or thalassemia.",
    normalRange: { general: "80–100 fL" },
    lowMeaning:
      "Low MCV (microcytic anemia) indicates small red blood cells, most commonly caused by iron deficiency anemia or thalassemia. These cells carry less oxygen per cell, causing tiredness and pallor.",
    highMeaning:
      "High MCV (macrocytic anemia) means red cells are abnormally large, typically due to vitamin B12 or folate deficiency, liver disease, hypothyroidism, or alcohol use.",
    howToImprove: [
      "If low: increase dietary iron and vitamin C",
      "If high: supplement vitamin B12 and folate after testing",
      "Reduce or eliminate alcohol consumption",
      "Screen for hypothyroidism if persistently high",
      "Follow up with a complete iron panel and vitamin levels",
    ],
    relatedTests: ["hemoglobin", "mch", "mchc", "ferritin", "vitamin-b12", "folate"],
    seoDescription:
      "Discover what MCV (Mean Corpuscular Volume) means in a blood test and what low or high MCV levels indicate.",
  },
  {
    slug: "mch",
    name: "Mean Corpuscular Hemoglobin",
    category: "Blood Count",
    aliases: ["MCH"],
    unit: "pg",
    description:
      "MCH is the average amount of hemoglobin contained in a single red blood cell. It is calculated from the hemoglobin and RBC count. MCH changes in parallel with MCV — low MCH accompanies microcytic anemia and high MCH accompanies macrocytic anemia.",
    normalRange: { general: "27–33 pg" },
    lowMeaning:
      "Low MCH means red cells contain less hemoglobin than normal, reducing their oxygen-carrying capacity. This is most often caused by iron deficiency or thalassemia.",
    highMeaning:
      "High MCH reflects large, hemoglobin-rich cells, typically due to vitamin B12 or folate deficiency. Liver disease and alcohol use are also common causes.",
    howToImprove: [
      "Treat the underlying deficiency (iron, B12, or folate)",
      "Eat a diverse diet with meats, legumes, and leafy greens",
      "Recheck levels 2–3 months after starting supplementation",
      "Avoid heavy alcohol use",
    ],
    relatedTests: ["mcv", "mchc", "hemoglobin", "ferritin", "vitamin-b12"],
    seoDescription:
      "What is MCH in a blood test? Learn about Mean Corpuscular Hemoglobin, normal ranges, and what abnormal values mean.",
  },
  {
    slug: "mchc",
    name: "Mean Corpuscular Hemoglobin Concentration",
    category: "Blood Count",
    aliases: ["MCHC"],
    unit: "g/dL",
    description:
      "MCHC measures the average concentration of hemoglobin within red blood cells — essentially how packed with hemoglobin each cell is. It completes the picture of red blood cell characteristics alongside MCV and MCH.",
    normalRange: { general: "32–36 g/dL" },
    lowMeaning:
      "Low MCHC (hypochromia) means red cells are pale and contain diluted hemoglobin. This is a classic sign of iron-deficiency anemia or thalassemia, and may cause fatigue and pallor.",
    highMeaning:
      "High MCHC is uncommon but can occur in hereditary spherocytosis (a condition where red cells are spherical and fragile) or severe dehydration.",
    howToImprove: [
      "Treat iron deficiency with dietary changes or supplements",
      "Get a hemoglobin electrophoresis if thalassemia is suspected",
      "Ensure adequate hydration",
      "Work with a hematologist for hereditary spherocytosis",
    ],
    relatedTests: ["mcv", "mch", "hemoglobin", "hematocrit"],
    seoDescription:
      "Learn what MCHC means in blood tests, its normal range, and what low or high MCHC indicates.",
  },
  {
    slug: "neutrophils",
    name: "Neutrophils",
    category: "Blood Count",
    aliases: ["Neutrophil Count", "PMNs", "Granulocytes"],
    unit: "% or ×10³/µL",
    description:
      "Neutrophils are the most abundant white blood cells and the first responders to bacterial infections and tissue injury. They engulf and destroy bacteria through phagocytosis. The neutrophil count is a key component of the WBC differential.",
    normalRange: { general: "50–70% of WBC (1.8–7.7 ×10³/µL)" },
    lowMeaning:
      "Low neutrophils (neutropenia) severely impair the ability to fight bacterial infections. Causes include chemotherapy, radiation, autoimmune disease, viral infections, and some medications.",
    highMeaning:
      "High neutrophils (neutrophilia) usually signal a bacterial infection, physical or emotional stress, inflammation, or steroid use. It is a normal response when the body is under attack.",
    howToImprove: [
      "Treat underlying infections with appropriate antibiotics or antivirals",
      "Review medications — some drugs cause neutropenia",
      "Eat a balanced diet including zinc and selenium",
      "Manage stress and get sufficient sleep",
      "Avoid exposure to infections if neutrophils are critically low",
    ],
    relatedTests: ["wbc", "lymphocytes", "crp", "esr"],
    seoDescription:
      "What do neutrophil levels mean? Learn about neutrophils, normal ranges, and what high or low neutrophils indicate.",
  },
  {
    slug: "lymphocytes",
    name: "Lymphocytes",
    category: "Blood Count",
    aliases: ["Lymphocyte Count"],
    unit: "% or ×10³/µL",
    description:
      "Lymphocytes are white blood cells that are central to the adaptive immune response. There are two main types: B cells (which produce antibodies) and T cells (which attack infected cells directly). Lymphocyte counts shift significantly during viral infections and immune disorders.",
    normalRange: { general: "20–40% of WBC (1.0–4.8 ×10³/µL)" },
    lowMeaning:
      "Low lymphocytes (lymphopenia) weaken the immune response to viral infections and some cancers. Causes include HIV, steroid use, chemotherapy, severe stress, and autoimmune diseases.",
    highMeaning:
      "High lymphocytes (lymphocytosis) are most often seen during viral infections like mononucleosis, CMV, or pertussis. Chronic lymphocytic leukemia (CLL) is a less common but important cause in older adults.",
    howToImprove: [
      "Support immune health with vitamins C, D, and zinc",
      "Get adequate sleep and reduce chronic stress",
      "Exercise moderately",
      "Avoid unnecessary immunosuppressant medications",
      "If HIV-positive, take antiretroviral therapy as prescribed",
    ],
    relatedTests: ["wbc", "neutrophils", "monocytes"],
    seoDescription:
      "Understand lymphocyte counts — what they mean, normal ranges, and why they might be high or low.",
  },
  {
    slug: "monocytes",
    name: "Monocytes",
    category: "Blood Count",
    aliases: ["Monocyte Count"],
    unit: "% or ×10³/µL",
    description:
      "Monocytes are large white blood cells that mature into macrophages when they enter tissues. They play a key role in fighting chronic infections, clearing cellular debris, and regulating inflammation. Elevated monocytes often reflect long-standing or systemic inflammation.",
    normalRange: { general: "2–8% of WBC (0.2–0.8 ×10³/µL)" },
    lowMeaning:
      "Low monocytes (monocytopenia) are uncommon but can occur after steroid treatment, chemotherapy, or in hairy cell leukemia. It may impair the clearance of chronic infections.",
    highMeaning:
      "High monocytes (monocytosis) suggest chronic inflammation, tuberculosis, inflammatory bowel disease, sarcoidosis, or recovery from acute infection.",
    howToImprove: [
      "Address chronic infections (TB, fungal, bacterial)",
      "Treat inflammatory conditions (IBD, autoimmune disease)",
      "Anti-inflammatory lifestyle: exercise, Mediterranean diet, stress reduction",
      "Stop smoking — it raises monocytes",
    ],
    relatedTests: ["wbc", "neutrophils", "crp", "esr"],
    seoDescription:
      "Learn what monocyte count means in a blood test, normal ranges, and what high or low monocytes indicate.",
  },
  {
    slug: "eosinophils",
    name: "Eosinophils",
    category: "Blood Count",
    aliases: ["Eosinophil Count", "Eos"],
    unit: "% or ×10³/µL",
    description:
      "Eosinophils are white blood cells that combat parasites and play a major role in allergic reactions and asthma. They release toxic proteins and inflammatory mediators that can damage tissues when overactivated.",
    normalRange: { general: "1–4% of WBC (0.0–0.5 ×10³/µL)" },
    lowMeaning:
      "Low eosinophils are rarely significant on their own. They may be seen with acute stress responses or corticosteroid treatment and generally do not require specific treatment.",
    highMeaning:
      "High eosinophils (eosinophilia) strongly suggest allergies, asthma, or parasitic infections. Severe elevations can indicate eosinophilic disorders that damage the heart and lungs.",
    howToImprove: [
      "Test for and treat parasitic infections if suspected",
      "Manage allergies and asthma with appropriate medications",
      "Identify and avoid allergen triggers",
      "Review medications — some cause drug-induced eosinophilia",
    ],
    relatedTests: ["wbc", "lymphocytes", "crp"],
    seoDescription:
      "What does a high eosinophil count mean? Learn about eosinophils, their normal range, and causes of eosinophilia.",
  },
  {
    slug: "basophils",
    name: "Basophils",
    category: "Blood Count",
    aliases: ["Basophil Count", "Baso"],
    unit: "% or ×10³/µL",
    description:
      "Basophils are the rarest type of white blood cell and play a role in allergic reactions and inflammation by releasing histamine and heparin. Although present in very small numbers, abnormal levels can signal important health conditions.",
    normalRange: { general: "0–1% of WBC (0.0–0.1 ×10³/µL)" },
    lowMeaning:
      "Low basophil counts are common and rarely clinically significant. They can be seen with acute allergic reactions, steroid use, or hyperthyroidism.",
    highMeaning:
      "High basophils (basophilia) are uncommon. When present, they may indicate allergic reactions, inflammation, hypothyroidism, or myeloproliferative disorders like chronic myeloid leukemia.",
    howToImprove: [
      "Manage allergic or inflammatory conditions",
      "Screen for thyroid disease if basophils are persistently elevated",
      "Seek hematology evaluation if a bone marrow disorder is suspected",
    ],
    relatedTests: ["wbc", "eosinophils", "tsh"],
    seoDescription:
      "What are basophils and what does basophilia mean? Learn the role of basophils and what abnormal counts indicate.",
  },

  /* ── HEART HEALTH ───────────────────────────────── */
  {
    slug: "ldl-cholesterol",
    name: "LDL Cholesterol",
    category: "Heart Health",
    aliases: ["LDL", "Low-Density Lipoprotein", "Bad Cholesterol"],
    unit: "mg/dL",
    description:
      "LDL (low-density lipoprotein) is often called 'bad' cholesterol because excess amounts build up in artery walls, forming plaques that narrow arteries (atherosclerosis). It is the primary driver of coronary artery disease and heart attacks.",
    normalRange: { general: "<100 mg/dL (optimal); 100–129 (near-optimal); 130–159 (borderline high); ≥160 (high)" },
    lowMeaning:
      "LDL is generally lower-is-better. Very low LDL (<40 mg/dL) is uncommon and may be associated with genetic conditions or extremely low-fat diets. It is rarely a clinical concern unless caused by severe malnutrition or liver disease.",
    highMeaning:
      "High LDL is one of the strongest risk factors for heart attack and stroke. It promotes plaque buildup in coronary arteries. Values above 160 mg/dL are considered high; above 190 mg/dL requires aggressive treatment.",
    howToImprove: [
      "Reduce saturated fat (red meat, full-fat dairy, fried foods)",
      "Eliminate trans fats (partially hydrogenated oils)",
      "Increase soluble fiber: oats, beans, lentils, apples, flaxseed",
      "Exercise 30+ minutes most days",
      "Statins or other lipid-lowering medications if lifestyle changes are insufficient",
    ],
    relatedTests: ["hdl-cholesterol", "total-cholesterol", "triglycerides", "crp", "homocysteine"],
    seoDescription:
      "What is LDL cholesterol and what does a high LDL level mean? Learn optimal LDL ranges and how to lower LDL naturally.",
  },
  {
    slug: "hdl-cholesterol",
    name: "HDL Cholesterol",
    category: "Heart Health",
    aliases: ["HDL", "High-Density Lipoprotein", "Good Cholesterol"],
    unit: "mg/dL",
    description:
      "HDL (high-density lipoprotein) is known as 'good' cholesterol because it transports excess cholesterol from arteries back to the liver for elimination. Higher HDL levels are associated with lower cardiovascular risk. HDL also has anti-inflammatory and antioxidant properties.",
    normalRange: { male: "≥40 mg/dL (>60 mg/dL is protective)", female: "≥50 mg/dL (>60 mg/dL is protective)" },
    lowMeaning:
      "Low HDL significantly increases the risk of heart disease because the reverse cholesterol transport mechanism is impaired. It is associated with metabolic syndrome, type 2 diabetes, obesity, smoking, and physical inactivity.",
    highMeaning:
      "Higher HDL is generally protective for the heart. Very high HDL (>100 mg/dL) is unusual and may in some cases reflect genetic conditions (dysfunctional HDL) that do not confer the expected protection.",
    howToImprove: [
      "Exercise regularly — aerobic exercise is the most effective way to raise HDL",
      "Quit smoking — HDL rises within weeks of stopping",
      "Consume healthy fats: olive oil, avocados, nuts, fatty fish",
      "Maintain a healthy weight",
      "Limit refined carbohydrates and sugar",
    ],
    relatedTests: ["ldl-cholesterol", "total-cholesterol", "triglycerides"],
    seoDescription:
      "Learn what HDL (good cholesterol) is, what a low HDL level means, and how to raise HDL naturally.",
  },
  {
    slug: "total-cholesterol",
    name: "Total Cholesterol",
    category: "Heart Health",
    aliases: ["TC", "Cholesterol"],
    unit: "mg/dL",
    description:
      "Total cholesterol is the combined measurement of all cholesterol in the blood: LDL, HDL, VLDL, and other lipoproteins. While it provides a quick snapshot, it must be interpreted alongside LDL, HDL, and triglycerides for a full cardiovascular risk picture.",
    normalRange: { general: "<200 mg/dL (desirable); 200–239 (borderline); ≥240 (high)" },
    lowMeaning:
      "Very low total cholesterol (<150 mg/dL) may be associated with malnutrition, hyperthyroidism, liver disease, or cancer. Some studies link very low cholesterol with increased risk of depression and hemorrhagic stroke.",
    highMeaning:
      "High total cholesterol is associated with increased risk of atherosclerosis, coronary artery disease, and stroke — especially when driven by elevated LDL rather than high HDL.",
    howToImprove: [
      "Follow a heart-healthy diet (Mediterranean or DASH diet)",
      "Increase physical activity",
      "Maintain a healthy body weight",
      "Avoid trans fats and limit saturated fats",
      "Medications (statins) if lifestyle changes are insufficient",
    ],
    relatedTests: ["ldl-cholesterol", "hdl-cholesterol", "triglycerides"],
    seoDescription:
      "Understand what total cholesterol means, desirable cholesterol levels, and how to improve your cholesterol numbers.",
  },
  {
    slug: "triglycerides",
    name: "Triglycerides",
    category: "Heart Health",
    aliases: ["TG", "Trigs", "TRIG"],
    unit: "mg/dL",
    description:
      "Triglycerides are the most common type of fat in the body, stored in fat cells and used for energy. High triglycerides are associated with metabolic syndrome, insulin resistance, and cardiovascular disease. They are strongly affected by diet, especially sugar and refined carbohydrates.",
    normalRange: { general: "<150 mg/dL (normal); 150–199 (borderline); 200–499 (high); ≥500 (very high)" },
    lowMeaning:
      "Low triglycerides (<100 mg/dL) are generally favorable and associated with low cardiovascular risk and good metabolic health. Very low levels can occasionally be seen with fat malabsorption.",
    highMeaning:
      "High triglycerides increase the risk of pancreatitis (especially >500 mg/dL) and contribute to cardiovascular disease and fatty liver. They are often a sign of metabolic syndrome, diabetes, or excessive alcohol or sugar intake.",
    howToImprove: [
      "Dramatically cut sugar and refined carbohydrates",
      "Limit alcohol — even small amounts raise triglycerides significantly",
      "Eat omega-3 rich fatty fish (salmon, mackerel) 2–3x per week",
      "Exercise regularly",
      "Lose weight if overweight — even 5–10% weight loss helps",
    ],
    relatedTests: ["ldl-cholesterol", "hdl-cholesterol", "glucose", "hba1c"],
    seoDescription:
      "What are triglycerides and what does a high triglyceride level mean? Learn causes, normal ranges, and how to lower them.",
  },
  {
    slug: "crp",
    name: "C-Reactive Protein",
    category: "Heart Health",
    aliases: ["CRP", "hs-CRP", "High-Sensitivity CRP"],
    unit: "mg/L",
    description:
      "C-reactive protein (CRP) is a protein produced by the liver in response to inflammation. High-sensitivity CRP (hs-CRP) is used to assess cardiovascular risk. CRP is a non-specific marker — it rises with any type of inflammation, infection, or injury.",
    normalRange: { general: "<1.0 mg/L (low CV risk); 1.0–3.0 (average risk); >3.0 (high risk)" },
    lowMeaning:
      "Low CRP is a sign of low systemic inflammation and is associated with reduced cardiovascular risk. There is no clinical significance to CRP being very low.",
    highMeaning:
      "Elevated CRP signals inflammation that may be caused by infection, autoimmune disease, obesity, metabolic syndrome, or heart disease. Chronically elevated hs-CRP (>3 mg/L) is an independent risk factor for heart attack and stroke.",
    howToImprove: [
      "Follow an anti-inflammatory diet (Mediterranean diet, omega-3s)",
      "Lose weight if obese — fat tissue produces inflammatory cytokines",
      "Exercise regularly",
      "Quit smoking",
      "Treat infections and inflammatory conditions",
    ],
    relatedTests: ["esr", "fibrinogen", "ldl-cholesterol", "wbc"],
    seoDescription:
      "What does high C-reactive protein (CRP) mean? Learn about CRP, hs-CRP, normal ranges, and how to lower inflammation.",
  },
  {
    slug: "homocysteine",
    name: "Homocysteine",
    category: "Heart Health",
    aliases: ["Hcy", "Total Homocysteine"],
    unit: "µmol/L",
    description:
      "Homocysteine is an amino acid produced during protein metabolism. Elevated levels damage blood vessel walls, promote clot formation, and are an independent risk factor for cardiovascular disease, stroke, and dementia. Levels are strongly influenced by folate, B12, and B6 status.",
    normalRange: { general: "5–15 µmol/L (optimal <10 µmol/L)" },
    lowMeaning:
      "Low homocysteine is generally beneficial and is associated with adequate B-vitamin intake and lower cardiovascular risk.",
    highMeaning:
      "Elevated homocysteine (hyperhomocysteinemia) damages arteries, promotes inflammation, and increases the risk of blood clots, heart attack, stroke, and cognitive decline. It is most commonly caused by B12, B6, or folate deficiency.",
    howToImprove: [
      "Supplement vitamin B12 (especially if vegan or vegetarian)",
      "Increase folate: leafy greens, legumes, fortified foods",
      "Ensure adequate vitamin B6: poultry, fish, potatoes, bananas",
      "Test for MTHFR gene variants if resistant to B-vitamin treatment",
      "Treat kidney disease (kidneys help clear homocysteine)",
    ],
    relatedTests: ["vitamin-b12", "folate", "crp", "ldl-cholesterol"],
    seoDescription:
      "Learn what homocysteine levels mean, why high homocysteine is dangerous, and how to lower it with B vitamins.",
  },

  /* ── METABOLISM ─────────────────────────────────── */
  {
    slug: "glucose",
    name: "Blood Glucose",
    category: "Metabolism",
    aliases: ["Blood Sugar", "Fasting Glucose", "FBG", "GLU"],
    unit: "mg/dL",
    description:
      "Blood glucose measures the amount of sugar (glucose) in the bloodstream. It is the primary energy source for the body's cells. Fasting glucose (after 8–12 hours without eating) is the standard test used to screen for diabetes and prediabetes.",
    normalRange: { general: "70–99 mg/dL (fasting normal); 100–125 (prediabetes); ≥126 (diabetes)" },
    lowMeaning:
      "Low blood sugar (hypoglycemia, <70 mg/dL) can cause shakiness, sweating, confusion, and in severe cases, loss of consciousness. It is most common in diabetics taking insulin or certain medications, or in people who skip meals.",
    highMeaning:
      "Chronically high blood glucose (hyperglycemia) damages blood vessels and nerves throughout the body, leading to diabetes complications including kidney disease, blindness, neuropathy, and heart disease.",
    howToImprove: [
      "Reduce refined carbohydrates, sugar, and sugary drinks",
      "Eat high-fiber foods that slow glucose absorption",
      "Exercise regularly — muscles use glucose without needing insulin",
      "Lose weight if overweight",
      "Monitor glucose regularly if diabetic or prediabetic",
    ],
    relatedTests: ["hba1c", "insulin", "triglycerides"],
    seoDescription:
      "What does blood glucose mean? Learn normal fasting blood sugar ranges, diabetes thresholds, and how to control blood sugar.",
  },
  {
    slug: "hba1c",
    name: "HbA1c",
    category: "Metabolism",
    aliases: ["Glycated Hemoglobin", "A1C", "Hemoglobin A1c"],
    unit: "%",
    description:
      "HbA1c measures the average blood glucose level over the past 2–3 months. Glucose attaches to hemoglobin in red blood cells, and since red cells live about 3 months, the test reflects long-term glucose control. It is the gold-standard test for diagnosing diabetes and monitoring treatment.",
    normalRange: { general: "<5.7% (normal); 5.7–6.4% (prediabetes); ≥6.5% (diabetes)" },
    lowMeaning:
      "Very low HbA1c (<4%) is rare and may indicate shortened red blood cell lifespan, hemolytic anemia, or very strict blood sugar control in diabetics.",
    highMeaning:
      "High HbA1c confirms prolonged elevated blood sugar. Diabetes is diagnosed at ≥6.5%. Higher values (8%, 9%, 10%+) indicate progressively worse blood sugar control and a higher risk of long-term complications.",
    howToImprove: [
      "Follow a low-glycemic diet",
      "Exercise daily — even a 30-minute walk reduces A1c",
      "Lose 5–10% of body weight if overweight",
      "Take prescribed diabetes medications consistently",
      "Monitor blood glucose at home regularly",
    ],
    relatedTests: ["glucose", "insulin", "triglycerides"],
    seoDescription:
      "What is HbA1c and what does your A1c result mean? Understand normal A1c levels, prediabetes, and diabetes ranges.",
  },
  {
    slug: "insulin",
    name: "Insulin",
    category: "Metabolism",
    aliases: ["Fasting Insulin", "Serum Insulin"],
    unit: "µIU/mL",
    description:
      "Insulin is a hormone produced by the pancreas that allows cells to absorb glucose from the blood. Fasting insulin is tested alongside fasting glucose to detect insulin resistance — a condition where cells stop responding properly to insulin, a precursor to type 2 diabetes.",
    normalRange: { general: "2–25 µIU/mL (fasting); optimal <10 µIU/mL" },
    lowMeaning:
      "Very low insulin levels in the context of high blood sugar suggest type 1 diabetes (the pancreas has stopped producing insulin) or advanced type 2 diabetes with beta cell failure.",
    highMeaning:
      "High fasting insulin with normal or elevated glucose is the hallmark of insulin resistance. This is associated with metabolic syndrome, obesity, PCOS, fatty liver, and is a strong predictor of future type 2 diabetes.",
    howToImprove: [
      "Reduce sugar and refined carbs drastically",
      "Practice intermittent fasting to lower fasting insulin",
      "Increase physical activity — especially strength training",
      "Lose weight, particularly visceral (belly) fat",
      "Metformin or other medications may be recommended by your doctor",
    ],
    relatedTests: ["glucose", "hba1c", "triglycerides"],
    seoDescription:
      "What does fasting insulin level mean? Learn about insulin resistance, normal insulin ranges, and how to lower high insulin.",
  },
  {
    slug: "uric-acid",
    name: "Uric Acid",
    category: "Metabolism",
    aliases: ["Serum Urate", "UA"],
    unit: "mg/dL",
    description:
      "Uric acid is a waste product formed when the body breaks down purines, compounds found in certain foods and body cells. When levels become too high, uric acid crystals can deposit in joints (causing gout) or in the kidneys (causing kidney stones).",
    normalRange: { male: "3.4–7.0 mg/dL", female: "2.4–6.0 mg/dL" },
    lowMeaning:
      "Low uric acid is uncommon and may occur with certain medications, a very low-purine diet, or rare genetic disorders. It is rarely clinically significant.",
    highMeaning:
      "Elevated uric acid (hyperuricemia) increases the risk of gout attacks (sudden, severe joint pain), kidney stones, and may be associated with hypertension and metabolic syndrome.",
    howToImprove: [
      "Reduce red meat, organ meats, and shellfish (high purine foods)",
      "Limit alcohol — especially beer and spirits",
      "Drink at least 2–3 liters of water daily",
      "Cut sugary drinks and fructose",
      "Allopurinol or febuxostat if gout is recurrent",
    ],
    relatedTests: ["creatinine", "egfr", "glucose"],
    seoDescription:
      "What is uric acid and what does high uric acid mean? Learn about gout, normal uric acid levels, and how to reduce them.",
  },

  /* ── KIDNEY HEALTH ──────────────────────────────── */
  {
    slug: "creatinine",
    name: "Creatinine",
    category: "Kidney Health",
    aliases: ["SCr", "Serum Creatinine", "Creat"],
    unit: "mg/dL",
    description:
      "Creatinine is a waste product from normal muscle metabolism. Healthy kidneys continuously filter creatinine out of the blood into urine. When kidneys are damaged or not working efficiently, creatinine accumulates in the blood. It is one of the most important markers of kidney function.",
    normalRange: { male: "0.74–1.35 mg/dL", female: "0.59–1.04 mg/dL" },
    lowMeaning:
      "Low creatinine can result from low muscle mass, advanced age, malnutrition, or during pregnancy. It is generally not a cause for concern on its own.",
    highMeaning:
      "Elevated creatinine indicates the kidneys are not filtering waste efficiently. Causes include dehydration, kidney disease (acute or chronic), urinary tract obstruction, or medications toxic to the kidneys.",
    howToImprove: [
      "Stay well hydrated",
      "Control blood pressure and blood sugar (major causes of CKD)",
      "Avoid NSAIDs and nephrotoxic medications",
      "Limit very high-protein diets if kidney disease is present",
      "Nephrology referral for significantly elevated or rising creatinine",
    ],
    relatedTests: ["bun", "egfr", "albumin", "potassium", "sodium"],
    seoDescription:
      "What does creatinine measure and what does a high creatinine level mean? Learn about kidney function and normal creatinine ranges.",
  },
  {
    slug: "bun",
    name: "Blood Urea Nitrogen",
    category: "Kidney Health",
    aliases: ["BUN", "Urea Nitrogen"],
    unit: "mg/dL",
    description:
      "BUN measures the amount of urea nitrogen in the blood. Urea is a waste product formed in the liver from the breakdown of protein and is normally filtered by the kidneys. BUN is often tested alongside creatinine to assess kidney function and hydration status.",
    normalRange: { general: "7–25 mg/dL" },
    lowMeaning:
      "Low BUN can reflect liver disease, malnutrition (insufficient protein intake), or overhydration. It is not typically concerning on its own.",
    highMeaning:
      "Elevated BUN suggests impaired kidney filtration, dehydration, high-protein intake, gastrointestinal bleeding, or catabolic states. The BUN-to-creatinine ratio helps distinguish kidney disease from pre-renal causes.",
    howToImprove: [
      "Drink adequate water daily",
      "Moderate protein intake if kidney disease is present",
      "Control underlying causes (diabetes, hypertension)",
      "Treat GI bleeding promptly",
    ],
    relatedTests: ["creatinine", "egfr", "sodium", "potassium"],
    seoDescription:
      "What is BUN (Blood Urea Nitrogen)? Learn what high or low BUN levels mean and how they relate to kidney function.",
  },
  {
    slug: "egfr",
    name: "eGFR",
    category: "Kidney Health",
    aliases: ["Estimated Glomerular Filtration Rate", "GFR", "Kidney Filtration Rate"],
    unit: "mL/min/1.73m²",
    description:
      "eGFR estimates how much blood your kidneys filter per minute. It is calculated from creatinine, age, and sex and is the primary measure used to stage chronic kidney disease (CKD). Higher is better — a value of 90+ means kidneys are functioning normally.",
    normalRange: { general: "≥90 (normal); 60–89 (mildly reduced); 30–59 (moderate CKD); <30 (severe CKD)" },
    lowMeaning:
      "A low eGFR indicates reduced kidney function. It is staged from G2 to G5, where G5 (<15) represents kidney failure requiring dialysis or transplant.",
    highMeaning:
      "eGFR above 90 is normal. There is no clinical concern with a high eGFR.",
    howToImprove: [
      "Control blood pressure to <130/80 mmHg",
      "Keep blood sugar (HbA1c) in target range",
      "Avoid NSAID pain relievers",
      "Stay hydrated",
      "Follow a kidney-friendly diet if CKD is diagnosed",
    ],
    relatedTests: ["creatinine", "bun", "albumin", "potassium"],
    seoDescription:
      "What is eGFR and what does a low eGFR mean? Understand kidney filtration rate, CKD stages, and how to protect kidney function.",
  },
  {
    slug: "albumin",
    name: "Albumin",
    category: "Kidney Health",
    aliases: ["Serum Albumin", "ALB"],
    unit: "g/dL",
    description:
      "Albumin is the most abundant protein in the blood, produced by the liver. It maintains osmotic pressure (keeping fluid inside blood vessels), transports hormones and drugs, and is a marker of nutritional status, liver function, and kidney health.",
    normalRange: { general: "3.4–5.4 g/dL" },
    lowMeaning:
      "Low albumin (hypoalbuminemia) is associated with liver disease (reduced production), kidney disease (protein leaking into urine), severe malnutrition, or chronic inflammation.",
    highMeaning:
      "High albumin is uncommon and usually reflects dehydration rather than a primary albumin problem.",
    howToImprove: [
      "Eat adequate protein (0.8–1.2g/kg body weight daily)",
      "Treat underlying liver or kidney disease",
      "Address malnutrition with a registered dietitian",
      "Reduce inflammation",
    ],
    relatedTests: ["creatinine", "egfr", "alt", "total-protein"],
    seoDescription:
      "What is serum albumin? Learn what low albumin means, why it matters for health, and normal albumin levels.",
  },

  /* ── LIVER HEALTH ───────────────────────────────── */
  {
    slug: "alt",
    name: "ALT",
    category: "Liver Health",
    aliases: ["Alanine Aminotransferase", "SGPT", "Alanine Transaminase"],
    unit: "U/L",
    description:
      "ALT (alanine aminotransferase) is an enzyme found primarily in liver cells. When liver cells are damaged or inflamed, ALT leaks into the bloodstream. It is the most liver-specific enzyme and the primary marker used to detect liver injury from hepatitis, fatty liver, medications, or alcohol.",
    normalRange: { male: "7–56 U/L", female: "7–45 U/L" },
    lowMeaning:
      "Low ALT has no clinical significance and below-normal levels are not associated with any known health problems.",
    highMeaning:
      "Elevated ALT signals liver cell damage. Mild elevations (1–3x normal) are commonly caused by fatty liver disease (NAFLD), alcohol, or medications. Markedly elevated ALT (>10x normal) suggests acute hepatitis, drug-induced liver injury, or ischemia.",
    howToImprove: [
      "Eliminate or drastically reduce alcohol",
      "Lose weight if overweight — even 5–10% loss reduces liver fat",
      "Review medications with your doctor (statins, acetaminophen, some supplements)",
      "Eat a liver-healthy diet: reduce fructose, refined carbs, and fried foods",
      "Screen for viral hepatitis (B and C)",
    ],
    relatedTests: ["ast", "alp", "ggt", "total-bilirubin", "albumin"],
    seoDescription:
      "What does a high ALT level mean? Learn about liver enzymes, normal ALT ranges, and what elevated ALT indicates.",
  },
  {
    slug: "ast",
    name: "AST",
    category: "Liver Health",
    aliases: ["Aspartate Aminotransferase", "SGOT", "Aspartate Transaminase"],
    unit: "U/L",
    description:
      "AST (aspartate aminotransferase) is an enzyme found in the liver, heart, muscles, and kidneys. It is less liver-specific than ALT — elevated AST can come from liver or muscle damage. The AST/ALT ratio helps doctors distinguish alcoholic liver disease (ratio >2) from other liver conditions.",
    normalRange: { male: "10–40 U/L", female: "9–32 U/L" },
    lowMeaning:
      "Low AST has no clinical significance and requires no treatment.",
    highMeaning:
      "Elevated AST can indicate liver disease, heart attack, muscle damage (rhabdomyolysis), or vigorous exercise. It is always interpreted alongside ALT and other liver markers.",
    howToImprove: [
      "Avoid alcohol",
      "Follow the same liver-health strategies as for ALT",
      "If AST is disproportionately high vs ALT, consider cardiac and muscle causes",
      "Rest after heavy exercise if levels are mildly elevated",
    ],
    relatedTests: ["alt", "alp", "ggt", "total-bilirubin", "creatinine"],
    seoDescription:
      "What is AST and what does high AST mean? Learn about this liver enzyme, normal ranges, and causes of elevated AST.",
  },
  {
    slug: "alp",
    name: "Alkaline Phosphatase",
    category: "Liver Health",
    aliases: ["ALP", "Alk Phos"],
    unit: "U/L",
    description:
      "Alkaline phosphatase (ALP) is an enzyme present in the liver, bile ducts, and bones. Elevated ALP most often indicates liver or bone disease. It is particularly useful for detecting bile duct obstruction (cholestasis) and bone disorders like Paget's disease.",
    normalRange: { general: "44–147 U/L (adults; higher in children and pregnant women)" },
    lowMeaning:
      "Low ALP can be associated with zinc deficiency, hypothyroidism, pernicious anemia, or rare genetic conditions. It is rarely clinically significant in isolation.",
    highMeaning:
      "Elevated ALP points to liver, bile duct, or bone pathology. Liver causes include bile duct obstruction (gallstones, tumors), primary biliary cholangitis, and drug toxicity. Bone causes include active bone growth, fractures, Paget's disease, and bone metastases.",
    howToImprove: [
      "Identify whether the elevation comes from liver or bone (GGT helps differentiate)",
      "Treat bile duct obstruction with surgery or endoscopy if needed",
      "Ensure adequate zinc and vitamin D",
      "Treat underlying bone diseases appropriately",
    ],
    relatedTests: ["alt", "ast", "ggt", "total-bilirubin", "calcium"],
    seoDescription:
      "What does elevated alkaline phosphatase (ALP) mean? Learn about this enzyme and what high ALP indicates for liver and bone health.",
  },
  {
    slug: "ggt",
    name: "GGT",
    category: "Liver Health",
    aliases: ["Gamma-Glutamyl Transferase", "Gamma GT", "Gamma-Glutamyl Transpeptidase"],
    unit: "U/L",
    description:
      "GGT (gamma-glutamyl transferase) is a liver enzyme that is extremely sensitive to alcohol consumption and bile duct disease. It is often used alongside ALP — if both are high, liver/bile duct disease is likely; if only ALP is high, a bone cause is suspected.",
    normalRange: { male: "10–71 U/L", female: "6–42 U/L" },
    lowMeaning:
      "Low GGT has no clinical significance.",
    highMeaning:
      "Elevated GGT is strongly associated with alcohol use, fatty liver disease (NAFLD), bile duct disease, certain medications, and metabolic syndrome. Persistently high GGT is associated with increased cardiovascular mortality.",
    howToImprove: [
      "Eliminate or dramatically reduce alcohol",
      "Lose weight if overweight",
      "Exercise regularly",
      "Review medications with hepatotoxic potential",
    ],
    relatedTests: ["alt", "ast", "alp", "total-bilirubin"],
    seoDescription:
      "What does a high GGT level mean? Learn about gamma-glutamyl transferase, normal ranges, and the link between GGT and alcohol.",
  },
  {
    slug: "total-bilirubin",
    name: "Total Bilirubin",
    category: "Liver Health",
    aliases: ["Bilirubin", "TBIL"],
    unit: "mg/dL",
    description:
      "Bilirubin is a yellow pigment created when red blood cells break down. The liver processes it into bile. Total bilirubin includes direct (conjugated) and indirect (unconjugated) bilirubin. High levels cause jaundice — yellowing of the skin and whites of the eyes.",
    normalRange: { general: "0.1–1.2 mg/dL" },
    lowMeaning:
      "Low bilirubin is normal and not clinically significant.",
    highMeaning:
      "Elevated bilirubin (jaundice) can result from excessive red blood cell breakdown (hemolytic anemia), liver disease (hepatitis, cirrhosis), or bile duct obstruction (gallstones, tumors).",
    howToImprove: [
      "Treat underlying liver disease",
      "Address bile duct obstruction medically or surgically",
      "Treat hemolytic conditions causing excess RBC breakdown",
      "Gilbert's syndrome (mild unconjugated elevation) is benign and requires no treatment",
    ],
    relatedTests: ["alt", "ast", "alp", "albumin"],
    seoDescription:
      "What does high bilirubin mean? Learn what total bilirubin measures, normal ranges, and what causes jaundice.",
  },
  {
    slug: "total-protein",
    name: "Total Protein",
    category: "Liver Health",
    aliases: ["TP", "Serum Total Protein"],
    unit: "g/dL",
    description:
      "Total protein measures the combined amount of albumin and globulin proteins in the blood. The liver produces albumin; globulins include antibodies and transport proteins. This test reflects liver function, nutritional status, immune activity, and hydration.",
    normalRange: { general: "6.3–8.2 g/dL" },
    lowMeaning:
      "Low total protein indicates either insufficient protein production (liver disease, malnutrition) or excessive protein loss (kidney disease, protein-losing enteropathy). It is associated with edema, impaired immunity, and poor wound healing.",
    highMeaning:
      "High total protein can result from dehydration (relative increase) or overproduction of globulins in conditions like multiple myeloma, chronic inflammation, or HIV.",
    howToImprove: [
      "Eat adequate dietary protein from diverse sources",
      "Treat underlying liver or kidney disease",
      "Investigate with protein electrophoresis if markedly elevated",
    ],
    relatedTests: ["albumin", "alt", "creatinine"],
    seoDescription:
      "What does total protein in a blood test measure? Learn about normal total protein levels and what low or high values indicate.",
  },

  /* ── VITAMINS & MINERALS ────────────────────────── */
  {
    slug: "vitamin-d",
    name: "Vitamin D",
    category: "Vitamins & Minerals",
    aliases: ["25-OH Vitamin D", "25-Hydroxyvitamin D", "Calcidiol"],
    unit: "ng/mL",
    description:
      "Vitamin D is a fat-soluble vitamin that functions like a hormone, regulating calcium absorption, bone mineralization, immune function, and cell growth. The 25-OH vitamin D test is the best measure of overall vitamin D status, reflecting sun exposure, dietary intake, and supplementation.",
    normalRange: { general: "≥30 ng/mL (sufficient); 20–29 (insufficient); <20 (deficient)" },
    lowMeaning:
      "Vitamin D deficiency is extremely common worldwide. It causes rickets in children, osteomalacia in adults, and is associated with increased risk of osteoporosis, fractures, infections, autoimmune diseases, depression, and cardiovascular disease.",
    highMeaning:
      "Vitamin D toxicity (>100 ng/mL) is rare and almost always caused by excessive supplementation. It can cause hypercalcemia, leading to kidney damage, calcification of soft tissues, and heart problems.",
    howToImprove: [
      "Get 15–30 minutes of midday sun exposure on bare skin daily",
      "Supplement with vitamin D3 (1000–4000 IU/day; confirm dose with your doctor)",
      "Eat fatty fish, egg yolks, and fortified dairy",
      "Take D3 with K2 and magnesium for optimal bone and vascular effects",
      "Retest in 3–6 months after supplementation",
    ],
    relatedTests: ["calcium", "magnesium"],
    seoDescription:
      "What is vitamin D deficiency and what does your 25-OH vitamin D level mean? Learn normal ranges and how to optimize vitamin D.",
  },
  {
    slug: "vitamin-b12",
    name: "Vitamin B12",
    category: "Vitamins & Minerals",
    aliases: ["Cobalamin", "B12", "Cyanocobalamin"],
    unit: "pg/mL",
    description:
      "Vitamin B12 is essential for DNA synthesis, red blood cell formation, nerve function, and brain health. It is found almost exclusively in animal products. Deficiency is common in vegans, vegetarians, and older adults who produce less stomach acid (needed to absorb B12).",
    normalRange: { general: "200–900 pg/mL (optimal >400 pg/mL)" },
    lowMeaning:
      "B12 deficiency causes megaloblastic anemia, fatigue, numbness and tingling in hands and feet, memory problems, and mood changes. Severe long-term deficiency can cause irreversible nerve damage.",
    highMeaning:
      "High B12 is often seen with supplementation and is generally harmless. Unexpectedly high B12 without supplementation may indicate liver disease, myeloproliferative disorders, or solid tumors.",
    howToImprove: [
      "Supplement with B12 (methylcobalamin or cyanocobalamin)",
      "Vegans and vegetarians need regular supplementation or fortified foods",
      "B12 injections for those with pernicious anemia (absorption disorder)",
      "Eat meat, fish, eggs, and dairy if not vegan",
      "Take B12 with folate for homocysteine reduction",
    ],
    relatedTests: ["folate", "hemoglobin", "mcv", "homocysteine"],
    seoDescription:
      "What does low vitamin B12 mean and what are the symptoms? Learn about B12 deficiency, normal ranges, and best supplements.",
  },
  {
    slug: "folate",
    name: "Folate",
    category: "Vitamins & Minerals",
    aliases: ["Folic Acid", "Vitamin B9", "Serum Folate"],
    unit: "ng/mL",
    description:
      "Folate (vitamin B9) is essential for DNA synthesis and cell division, making it critically important during pregnancy for neural tube development. It also works with B12 to lower homocysteine levels. Folate is found in leafy greens, legumes, and fortified foods.",
    normalRange: { general: "3.1–17.5 ng/mL (optimal >6 ng/mL)" },
    lowMeaning:
      "Low folate causes megaloblastic anemia, fatigue, and elevated homocysteine. During pregnancy, folate deficiency dramatically increases the risk of neural tube defects (spina bifida).",
    highMeaning:
      "High folate from supplementation is generally safe. Very high folate without adequate B12 can mask B12 deficiency and worsen neurological damage.",
    howToImprove: [
      "Eat leafy vegetables (spinach, kale, asparagus, broccoli)",
      "Eat legumes: lentils, chickpeas, black beans",
      "Take folic acid 400–800 mcg/day (especially if pregnant or planning to conceive)",
      "Avoid cooking vegetables at high temperatures (destroys folate)",
    ],
    relatedTests: ["vitamin-b12", "hemoglobin", "mcv", "homocysteine"],
    seoDescription:
      "What is folate and what does low folate mean? Learn about folate deficiency, normal levels, and folic acid supplementation.",
  },
  {
    slug: "iron",
    name: "Serum Iron",
    category: "Vitamins & Minerals",
    aliases: ["Fe", "Iron Level", "Serum Fe"],
    unit: "µg/dL",
    description:
      "Serum iron measures the amount of iron circulating in the blood bound to transferrin. It fluctuates with meals and time of day, so it is usually interpreted together with ferritin, TIBC, and transferrin saturation for a complete picture of iron status.",
    normalRange: { male: "65–175 µg/dL", female: "50–170 µg/dL" },
    lowMeaning:
      "Low serum iron is a sign of iron deficiency, most commonly from inadequate dietary intake, poor absorption, or blood loss (heavy periods, GI bleeding). It contributes to iron-deficiency anemia, the world's most common nutritional deficiency.",
    highMeaning:
      "High serum iron can result from iron supplements, repeated blood transfusions, hemolytic anemia, or hereditary hemochromatosis — a genetic condition of iron overload that can damage the liver, heart, and pancreas.",
    howToImprove: [
      "Eat heme iron (most absorbable): red meat, poultry, fish",
      "Eat non-heme iron: lentils, spinach, tofu, fortified cereals",
      "Pair with vitamin C to enhance absorption",
      "Avoid tea, coffee, and calcium with iron-rich meals",
      "Iron supplements if dietary intake is insufficient",
    ],
    relatedTests: ["ferritin", "tibc", "hemoglobin", "mcv"],
    seoDescription:
      "What does serum iron level mean? Learn about iron deficiency and overload, normal iron ranges, and how to correct low iron.",
  },
  {
    slug: "ferritin",
    name: "Ferritin",
    category: "Vitamins & Minerals",
    aliases: ["Serum Ferritin", "Storage Iron"],
    unit: "ng/mL",
    description:
      "Ferritin is the body's iron storage protein and the most sensitive indicator of iron stores. It is the first marker to drop in iron deficiency, often weeks before hemoglobin falls. It is also an acute-phase reactant that rises with inflammation.",
    normalRange: { male: "24–336 ng/mL", female: "11–307 ng/mL (optimal >30 ng/mL)" },
    lowMeaning:
      "Low ferritin definitively indicates iron deficiency, even if hemoglobin is still normal. Symptoms include fatigue, hair loss, restless legs syndrome, brain fog, and poor exercise tolerance.",
    highMeaning:
      "Elevated ferritin can indicate iron overload (hemochromatosis), liver disease, inflammatory conditions, or malignancy. High ferritin always needs context from other tests.",
    howToImprove: [
      "Increase dietary iron, especially heme iron from meat",
      "Take iron supplements (ferrous bisglycinate) with vitamin C",
      "Treat underlying cause of blood loss",
      "Regular phlebotomy (blood removal) for hemochromatosis",
      "Monitor both ferritin AND CRP together to distinguish iron overload from inflammation",
    ],
    relatedTests: ["iron", "tibc", "hemoglobin", "mcv", "crp"],
    seoDescription:
      "What does low ferritin mean? Learn about ferritin (iron stores), normal ferritin levels, and symptoms of low iron stores.",
  },
  {
    slug: "tibc",
    name: "TIBC",
    category: "Vitamins & Minerals",
    aliases: ["Total Iron-Binding Capacity", "Transferrin"],
    unit: "µg/dL",
    description:
      "TIBC (total iron-binding capacity) measures the blood's ability to bind and transport iron via transferrin. When iron stores are low, the body makes more transferrin to capture whatever iron is available, raising TIBC. It is always interpreted alongside serum iron and ferritin.",
    normalRange: { general: "250–370 µg/dL" },
    lowMeaning:
      "Low TIBC (with high ferritin) suggests iron overload or chronic disease. Combined with low serum iron, it may indicate liver disease or malnutrition reducing transferrin production.",
    highMeaning:
      "High TIBC with low serum iron and low ferritin is the classic pattern of iron-deficiency anemia — the body has upregulated its iron-transport capacity to capture more iron.",
    howToImprove: [
      "Follow iron-repletion strategies (diet and supplements)",
      "Retest the full iron panel in 2–3 months after starting treatment",
      "Rule out chronic inflammatory disease as a cause",
    ],
    relatedTests: ["iron", "ferritin", "hemoglobin"],
    seoDescription:
      "What is TIBC (Total Iron-Binding Capacity) and what does high TIBC mean? Learn how TIBC helps diagnose iron deficiency.",
  },
  {
    slug: "calcium",
    name: "Calcium",
    category: "Vitamins & Minerals",
    aliases: ["Serum Calcium", "Ca", "Total Calcium"],
    unit: "mg/dL",
    description:
      "Calcium is the most abundant mineral in the body. About 99% is stored in bones and teeth. The remaining 1% in the blood regulates muscle contraction, nerve signaling, blood clotting, and heart rhythm. Blood calcium is tightly regulated by parathyroid hormone (PTH) and vitamin D.",
    normalRange: { general: "8.5–10.5 mg/dL" },
    lowMeaning:
      "Low blood calcium (hypocalcemia) can cause muscle cramps, numbness, tingling, seizures, and abnormal heart rhythms. Common causes include vitamin D deficiency, hypoparathyroidism, and kidney failure.",
    highMeaning:
      "High blood calcium (hypercalcemia) commonly results from primary hyperparathyroidism or malignancy. Symptoms include fatigue, depression, kidney stones, bone pain, and digestive issues.",
    howToImprove: [
      "Ensure adequate vitamin D (required for calcium absorption)",
      "Eat calcium-rich foods: dairy, leafy greens, almonds, tofu, sardines",
      "Supplement with calcium + D3 + K2 if deficient",
      "Treat hyperparathyroidism medically or surgically",
      "Stay hydrated to prevent kidney stones",
    ],
    relatedTests: ["vitamin-d", "magnesium", "alp"],
    seoDescription:
      "What does blood calcium level mean? Learn about hypocalcemia, hypercalcemia, normal calcium ranges, and their health effects.",
  },
  {
    slug: "magnesium",
    name: "Magnesium",
    category: "Vitamins & Minerals",
    aliases: ["Mg", "Serum Magnesium"],
    unit: "mg/dL",
    description:
      "Magnesium is involved in over 300 enzymatic reactions in the body, including energy production, protein synthesis, muscle and nerve function, blood sugar control, and blood pressure regulation. It is one of the most underdiagnosed deficiencies in Western populations.",
    normalRange: { general: "1.7–2.4 mg/dL" },
    lowMeaning:
      "Low magnesium (hypomagnesemia) causes muscle cramps, tremors, insomnia, anxiety, irregular heartbeat, and worsens insulin resistance. It is common with poor diet, chronic alcohol use, diabetes, and prolonged use of PPIs or diuretics.",
    highMeaning:
      "High magnesium (hypermagnesemia) is uncommon with normal kidney function and usually results from excessive supplementation. It can cause weakness, low blood pressure, and in severe cases, cardiac arrest.",
    howToImprove: [
      "Eat magnesium-rich foods: dark chocolate, nuts, seeds, leafy greens, legumes",
      "Supplement with magnesium glycinate or citrate (better absorbed than oxide)",
      "Reduce alcohol and caffeine (both deplete magnesium)",
      "Review medications that deplete magnesium (proton pump inhibitors, diuretics)",
    ],
    relatedTests: ["calcium", "potassium", "glucose"],
    seoDescription:
      "What does low magnesium mean? Learn about magnesium deficiency symptoms, normal serum magnesium ranges, and supplementation.",
  },
  {
    slug: "potassium",
    name: "Potassium",
    category: "Vitamins & Minerals",
    aliases: ["K", "Serum Potassium"],
    unit: "mEq/L",
    description:
      "Potassium is the main positively charged ion inside cells. It is essential for heart rhythm, nerve impulses, and muscle contraction. The body carefully maintains blood potassium within a narrow range. Both high and low potassium can cause life-threatening cardiac arrhythmias.",
    normalRange: { general: "3.5–5.1 mEq/L" },
    lowMeaning:
      "Low potassium (hypokalemia) causes muscle weakness, cramps, constipation, and cardiac arrhythmias. It is common with diuretic use, vomiting, diarrhea, poor intake, or certain kidney conditions.",
    highMeaning:
      "High potassium (hyperkalemia) can cause fatal cardiac arrhythmias. Causes include kidney failure (can't excrete potassium), ACE inhibitor or ARB medications, and acidosis.",
    howToImprove: [
      "Eat potassium-rich foods: bananas, avocados, sweet potatoes, leafy greens, oranges",
      "Supplement if prescribed — always under medical supervision",
      "Treat kidney disease to normalize potassium handling",
      "Review diuretic use with your doctor",
      "Restrict potassium in food if hyperkalemic with kidney disease",
    ],
    relatedTests: ["sodium", "creatinine", "egfr"],
    seoDescription:
      "What are normal potassium levels and what do high or low potassium mean? Learn about potassium's role in heart health.",
  },
  {
    slug: "sodium",
    name: "Sodium",
    category: "Vitamins & Minerals",
    aliases: ["Na", "Serum Sodium"],
    unit: "mEq/L",
    description:
      "Sodium is the main ion in the fluid outside cells. It regulates fluid balance, blood pressure, and nerve and muscle function. Blood sodium levels reflect the balance between sodium intake and water — it is more of a water-regulation marker than a salt-intake marker.",
    normalRange: { general: "136–145 mEq/L" },
    lowMeaning:
      "Low sodium (hyponatremia) causes headache, confusion, nausea, and in severe cases, brain swelling, seizures, and coma. Common causes include overhydration, heart failure, liver cirrhosis, kidney disease, or SIADH.",
    highMeaning:
      "High sodium (hypernatremia) usually indicates dehydration. Symptoms include intense thirst, confusion, and neurological changes.",
    howToImprove: [
      "Stay adequately hydrated — not over or under",
      "Treat the underlying cause of imbalance",
      "If hyponatremic: restrict water intake, treat heart/liver/kidney disease",
      "If hypernatremic: rehydrate carefully under medical supervision",
    ],
    relatedTests: ["potassium", "creatinine", "bun"],
    seoDescription:
      "What does blood sodium (Na) level mean? Learn about hyponatremia, hypernatremia, normal sodium ranges, and causes.",
  },
  {
    slug: "zinc",
    name: "Zinc",
    category: "Vitamins & Minerals",
    aliases: ["Serum Zinc", "Plasma Zinc", "Zn"],
    unit: "µg/dL",
    description:
      "Zinc is a trace mineral essential for immune function, wound healing, DNA synthesis, cell division, and smell and taste sensation. It is the second most abundant trace mineral in the body after iron.",
    normalRange: { general: "60–130 µg/dL" },
    lowMeaning:
      "Zinc deficiency causes impaired immunity, delayed wound healing, hair loss, loss of taste and smell, skin rashes, and poor growth. It is common with poor diet, GI malabsorption, and alcoholism.",
    highMeaning:
      "High zinc is almost always from excessive supplementation. Toxicity causes nausea, vomiting, copper deficiency (which can cause anemia and neurological problems), and suppressed immune function.",
    howToImprove: [
      "Eat zinc-rich foods: oysters, beef, pumpkin seeds, chickpeas, cashews",
      "Supplement with 15–30mg zinc gluconate or picolinate",
      "Balance zinc with copper (take together or ensure dietary copper intake)",
      "Avoid phytates (from raw grains and legumes) that block zinc absorption",
    ],
    relatedTests: ["iron", "ferritin", "wbc"],
    seoDescription:
      "What does zinc level in blood mean? Learn about zinc deficiency, normal zinc ranges, and foods and supplements to correct it.",
  },

  /* ── THYROID ────────────────────────────────────── */
  {
    slug: "tsh",
    name: "TSH",
    category: "Thyroid",
    aliases: ["Thyroid Stimulating Hormone", "Thyrotropin"],
    unit: "mIU/L",
    description:
      "TSH (thyroid-stimulating hormone) is secreted by the pituitary gland and signals the thyroid to produce thyroid hormones (T4 and T3). It is the most sensitive and reliable test for thyroid function. High TSH means the pituitary is working hard because the thyroid isn't producing enough hormones; low TSH means thyroid hormone levels are too high.",
    normalRange: { general: "0.4–4.0 mIU/L (optimal 1.0–2.5 mIU/L)" },
    lowMeaning:
      "Low TSH indicates hyperthyroidism (overactive thyroid) — excess thyroid hormone suppresses TSH production. Causes include Graves' disease, toxic multinodular goiter, and excessive thyroid hormone supplementation.",
    highMeaning:
      "High TSH indicates hypothyroidism (underactive thyroid). Causes include Hashimoto's thyroiditis, iodine deficiency, thyroid surgery, or radiation. Symptoms include fatigue, weight gain, cold intolerance, and depression.",
    howToImprove: [
      "Ensure adequate iodine intake (iodized salt, seafood, dairy)",
      "Supplement selenium — supports thyroid enzyme function",
      "Levothyroxine (T4) for hypothyroidism",
      "Antithyroid medications or radioactive iodine for hyperthyroidism",
    ],
    relatedTests: ["free-t4", "free-t3"],
    seoDescription:
      "What does TSH level mean? Learn about thyroid stimulating hormone, normal TSH ranges, and what high or low TSH indicates.",
  },
  {
    slug: "free-t4",
    name: "Free T4",
    category: "Thyroid",
    aliases: ["FT4", "Free Thyroxine", "Thyroxine"],
    unit: "ng/dL",
    description:
      "Free T4 (free thyroxine) is the biologically active, unbound form of the thyroid hormone thyroxine. T4 is the main hormone produced by the thyroid gland and is converted to the more active T3 in peripheral tissues. Free T4 is measured when TSH is abnormal to confirm whether thyroid hormone levels are truly high or low.",
    normalRange: { general: "0.8–1.8 ng/dL" },
    lowMeaning:
      "Low free T4 with high TSH confirms primary hypothyroidism — the thyroid cannot produce enough hormone. Causes include Hashimoto's thyroiditis, thyroid surgery, radioiodine treatment, and severe iodine deficiency.",
    highMeaning:
      "High free T4 with low TSH confirms hyperthyroidism. Symptoms include rapid heart rate, weight loss, heat intolerance, tremors, and anxiety. Graves' disease is the most common cause.",
    howToImprove: [
      "Hypothyroidism: levothyroxine replacement therapy",
      "Hyperthyroidism: methimazole, propylthiouracil, or radioactive iodine ablation",
      "Follow up with endocrinology for complex thyroid disease",
    ],
    relatedTests: ["tsh", "free-t3"],
    seoDescription:
      "What does free T4 mean in a thyroid test? Learn about thyroxine, normal free T4 levels, and what abnormal results indicate.",
  },
  {
    slug: "free-t3",
    name: "Free T3",
    category: "Thyroid",
    aliases: ["FT3", "Free Triiodothyronine", "Triiodothyronine"],
    unit: "pg/mL",
    description:
      "Free T3 is the most biologically active form of thyroid hormone. Most T3 comes from peripheral conversion of T4 to T3 in tissues. T3 drives metabolism, energy production, heart rate, and temperature regulation.",
    normalRange: { general: "2.3–4.2 pg/mL" },
    lowMeaning:
      "Low free T3 occurs in hypothyroidism, severe illness (low T3 syndrome), poor T4-to-T3 conversion (selenium deficiency, stress), or starvation. It causes fatigue, cold intolerance, weight gain, and depression.",
    highMeaning:
      "High free T3 is seen in hyperthyroidism, particularly T3 thyrotoxicosis. It can also be elevated from thyroid hormone supplementation.",
    howToImprove: [
      "If low T3 with normal TSH/T4: optimize selenium, zinc, and iodine",
      "Reduce extreme caloric restriction",
      "T3/T4 combination therapy for hypothyroid patients not converting well on T4 alone",
      "Manage chronic illness and stress",
    ],
    relatedTests: ["tsh", "free-t4"],
    seoDescription:
      "What is free T3 and what does it measure? Learn about T3 thyroid hormone, normal ranges, and what low or high T3 means.",
  },

  /* ── HORMONES ───────────────────────────────────── */
  {
    slug: "testosterone",
    name: "Testosterone",
    category: "Hormones",
    aliases: ["Total Testosterone", "T-Level", "Serum Testosterone"],
    unit: "ng/dL",
    description:
      "Testosterone is the primary male sex hormone and an important hormone for women too. It regulates libido, muscle mass, bone density, fat distribution, red blood cell production, and mood. Levels follow a diurnal rhythm — highest in the morning — so testing should ideally be done before 10 AM.",
    normalRange: { male: "300–1000 ng/dL", female: "15–70 ng/dL" },
    lowMeaning:
      "Low testosterone (hypogonadism) in men causes low libido, erectile dysfunction, fatigue, loss of muscle mass, increased body fat, depression, and reduced bone density. In women, low testosterone causes fatigue, low libido, and decreased muscle strength.",
    highMeaning:
      "High testosterone in men is usually from anabolic steroid use. In women, elevated testosterone suggests PCOS, adrenal or ovarian tumors, or congenital adrenal hyperplasia.",
    howToImprove: [
      "Exercise, especially resistance training and HIIT",
      "Optimize sleep — most testosterone is produced during sleep",
      "Lose excess body fat (adipose tissue converts testosterone to estrogen)",
      "Ensure adequate zinc, magnesium, and vitamin D",
      "Testosterone replacement therapy (TRT) for confirmed hypogonadism",
    ],
    relatedTests: ["dhea-s", "estradiol", "tsh", "cortisol"],
    seoDescription:
      "What does testosterone level mean? Learn normal testosterone ranges, low testosterone symptoms, and how to boost testosterone naturally.",
  },
  {
    slug: "estradiol",
    name: "Estradiol",
    category: "Hormones",
    aliases: ["E2", "17β-Estradiol", "Estrogen"],
    unit: "pg/mL",
    description:
      "Estradiol is the most potent form of estrogen and the primary female sex hormone. It regulates the menstrual cycle, pregnancy, bone density, cardiovascular health, mood, and cognitive function. In men, small amounts are essential for bone health and libido.",
    normalRange: {
      male: "10–40 pg/mL",
      female: "Follicular: 20–150 pg/mL; Midcycle: 150–750; Luteal: 30–450; Postmenopause: <25",
    },
    lowMeaning:
      "Low estradiol in women causes irregular or absent periods, hot flashes, vaginal dryness, bone loss, and mood changes. In men, very low estradiol may impair libido and bone density.",
    highMeaning:
      "High estradiol in women can worsen PMS, endometriosis, and uterine fibroids. In men, high estradiol causes gynecomastia (breast tissue growth), low libido, and water retention.",
    howToImprove: [
      "Maintain a healthy weight — excess adipose tissue converts androgens to estrogen",
      "Eat cruciferous vegetables (broccoli, cauliflower) — contain DIM that supports healthy estrogen metabolism",
      "Avoid xenoestrogens (BPA, phthalates) from plastics",
      "Hormone replacement therapy (HRT) for menopausal women with low estradiol",
    ],
    relatedTests: ["testosterone", "dhea-s", "tsh"],
    seoDescription:
      "What does estradiol level mean? Learn about normal estradiol ranges, low estrogen symptoms, and estradiol in menopause.",
  },
  {
    slug: "cortisol",
    name: "Cortisol",
    category: "Hormones",
    aliases: ["Serum Cortisol", "Hydrocortisone", "Stress Hormone"],
    unit: "µg/dL",
    description:
      "Cortisol is the body's primary stress hormone, produced by the adrenal glands. It regulates blood sugar, immune response, blood pressure, metabolism, and the sleep-wake cycle. Cortisol follows a diurnal rhythm — highest in the morning, lowest at midnight.",
    normalRange: { general: "AM (8am): 6–23 µg/dL; PM (4pm): 2–11 µg/dL" },
    lowMeaning:
      "Chronically low cortisol suggests adrenal insufficiency (Addison's disease). Symptoms include extreme fatigue, low blood pressure, weight loss, and darkening of the skin.",
    highMeaning:
      "Chronically high cortisol (Cushing's syndrome) causes weight gain (especially face and abdomen), high blood pressure, diabetes, bone loss, poor wound healing, and mood disorders.",
    howToImprove: [
      "Manage stress with meditation, deep breathing, yoga",
      "Prioritize 7–9 hours of quality sleep",
      "Exercise regularly but avoid overtraining (which spikes cortisol)",
      "Limit caffeine and alcohol",
      "Ashwagandha, phosphatidylserine, and rhodiola are evidence-based adaptogenic supplements",
    ],
    relatedTests: ["glucose", "testosterone", "dhea-s"],
    seoDescription:
      "What does cortisol level mean? Learn about normal cortisol ranges, what high cortisol causes, and how to lower stress hormones.",
  },
  {
    slug: "dhea-s",
    name: "DHEA-S",
    category: "Hormones",
    aliases: ["Dehydroepiandrosterone Sulfate", "DHEAS", "Adrenal Androgen"],
    unit: "µg/dL",
    description:
      "DHEA-S is the most abundant steroid hormone in the blood, produced mainly by the adrenal glands. It serves as a precursor to both testosterone and estrogen. DHEA-S declines steadily from the late 20s onward and is considered a marker of adrenal function and biological aging.",
    normalRange: {
      male: "Ages 20–29: 280–640 µg/dL; Ages 40–49: 180–440; Ages 60+: 100–300",
      female: "Ages 20–29: 150–380 µg/dL; Ages 40–49: 80–260; Ages 60+: 40–190",
    },
    lowMeaning:
      "Low DHEA-S is associated with adrenal insufficiency, advanced age, chronic stress, and chronic illness. It may contribute to fatigue, low libido, muscle weakness, and reduced immune function.",
    highMeaning:
      "High DHEA-S in adults may indicate congenital adrenal hyperplasia, adrenal tumors, or PCOS. In women, it can cause acne, hirsutism (excess body hair), and irregular periods.",
    howToImprove: [
      "Manage chronic stress and improve sleep",
      "DHEA supplementation (25–50 mg) for confirmed deficiency under medical supervision",
      "Optimize vitamin D (supports adrenal steroidogenesis)",
      "Treat underlying adrenal or pituitary conditions",
    ],
    relatedTests: ["testosterone", "cortisol", "estradiol"],
    seoDescription:
      "What does DHEA-S level mean? Learn about DHEA-S (adrenal hormone), normal ranges, and what low DHEA-S indicates.",
  },

  /* ── INFLAMMATION ───────────────────────────────── */
  {
    slug: "esr",
    name: "ESR",
    category: "Inflammation",
    aliases: ["Erythrocyte Sedimentation Rate", "Sed Rate"],
    unit: "mm/hr",
    description:
      "ESR (erythrocyte sedimentation rate) measures how quickly red blood cells sink in a test tube over one hour. Inflammation causes proteins to accumulate in the blood, making red cells clump together and fall faster. It is a non-specific marker of inflammation used to detect and monitor inflammatory and autoimmune conditions.",
    normalRange: { male: "<15 mm/hr", female: "<20 mm/hr (increases with age)" },
    lowMeaning:
      "Low ESR is normal and indicates the absence of significant inflammation. Very low ESR can occasionally be seen in sickle cell disease or polycythemia.",
    highMeaning:
      "Elevated ESR indicates systemic inflammation, infection, autoimmune disease (rheumatoid arthritis, lupus, vasculitis), or malignancy. Very high ESR (>100 mm/hr) strongly suggests conditions like polymyalgia rheumatica, giant cell arteritis, or multiple myeloma.",
    howToImprove: [
      "Treat the underlying inflammatory or infectious condition",
      "Anti-inflammatory diet (Mediterranean, eliminate ultra-processed foods)",
      "Exercise regularly",
      "Achieve and maintain a healthy weight",
    ],
    relatedTests: ["crp", "wbc", "fibrinogen"],
    seoDescription:
      "What is ESR (sed rate) and what does a high ESR mean? Learn about sedimentation rate, normal values, and causes of elevated ESR.",
  },
  {
    slug: "fibrinogen",
    name: "Fibrinogen",
    category: "Inflammation",
    aliases: ["Plasma Fibrinogen", "Factor I"],
    unit: "mg/dL",
    description:
      "Fibrinogen is a blood clotting protein (coagulation factor I) produced by the liver. It is converted to fibrin during clot formation. Fibrinogen is also an acute-phase reactant that rises significantly with inflammation. Elevated fibrinogen is an independent risk factor for cardiovascular disease and stroke.",
    normalRange: { general: "200–400 mg/dL" },
    lowMeaning:
      "Low fibrinogen (hypofibrinogenemia) impairs blood clotting and causes excessive bleeding. Causes include inherited disorders, severe liver disease, or consumption in massive clotting events (DIC).",
    highMeaning:
      "High fibrinogen is associated with smoking, obesity, metabolic syndrome, infection, and chronic inflammation. It thickens the blood, increases clot risk, and is associated with atherosclerosis and cardiovascular events.",
    howToImprove: [
      "Quit smoking — the single biggest modifiable cause of high fibrinogen",
      "Follow an anti-inflammatory diet",
      "Exercise regularly",
      "Lose weight",
      "Treat underlying inflammatory conditions",
    ],
    relatedTests: ["crp", "esr", "platelets", "ldl-cholesterol"],
    seoDescription:
      "What does high fibrinogen mean? Learn about this clotting protein, normal fibrinogen levels, and how it relates to heart disease.",
  },
];

export function getBiomarker(slug: string): Biomarker | undefined {
  return BIOMARKERS.find((b) => b.slug === slug);
}

export function getBiomarkersByCategory(): Record<BiomarkerCategory, Biomarker[]> {
  return BIOMARKERS.reduce(
    (acc, b) => {
      if (!acc[b.category]) acc[b.category] = [];
      acc[b.category].push(b);
      return acc;
    },
    {} as Record<BiomarkerCategory, Biomarker[]>
  );
}

export const ALL_CATEGORIES = Object.keys(CATEGORY_META) as BiomarkerCategory[];
