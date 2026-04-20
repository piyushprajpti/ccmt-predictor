
export interface ProgramEligibility {
  paperCode: string;
  allowedKeywords: string[];
  excludedKeywords?: string[];
}

const ELIGIBILITY_RULES: Record<string, ProgramEligibility> = {
  CS: {
    paperCode: "CS",
    allowedKeywords: ["Computer", "Information", "Cyber", "Software", "AI", "Machine Learning", "Data Science", "Cloud", "Network", "IT", "Computation", "Blockchain"],
    excludedKeywords: ["Architecture", "Planning", "Civil", "Mechanical", "Electrical", "Chemical", "Biological", "Structural", "Transportation", "Power System", "Thermal", "Manufacturing"]
  },
  AR: {
    paperCode: "AR",
    allowedKeywords: ["Architecture", "Planning", "Urban", "Regional", "Landscape", "Building Science", "Sustainable Architecture"],
    excludedKeywords: ["Computer", "Electronics", "Electrical", "Mechanical", "Chemical", "VLSI"]
  },
  ME: {
    paperCode: "ME",
    allowedKeywords: ["Mechanical", "Thermal", "Machine Design", "Fluid", "Manufacturing", "Robotics", "Mechatronics", "Automotive", "Industrial", "CAD", "CAM", "CIM", "Turbo", "Solar", "Energy Science", "Maintenance", "Materials Process", "Production", "Smart Manufacturing"],
    excludedKeywords: ["Civil", "Architecture", "Software", "Communication", "VLSI", "Construction Technology"]
  },
  EE: {
    paperCode: "EE",
    allowedKeywords: ["Electrical", "Power System", "Power Electronics", "Control Systems", "Energy Systems", "Electric Vehicle", "Smart Grid", "High Voltage", "Power & Energy", "Electrical Machine"],
    excludedKeywords: ["Civil", "Architecture", "Mechanical Design", "Thermal", "Chemical Process"]
  },
  EC: {
    paperCode: "EC",
    allowedKeywords: ["Electronics", "Communication", "VLSI", "Embedded", "Signal Processing", "RF", "Microwave", "Photonics", "Optoelectronics", "Telecommunication", "Digital System", "Nanoelectronics", "Microelectronics"],
    excludedKeywords: ["Civil", "Architecture", "Mechanical Design", "Thermal", "Chemical Process", "Structural"]
  },
  CE: {
    paperCode: "CE",
    allowedKeywords: ["Civil", "Structural", "Geotechnical", "Transportation", "Water Resources", "Environmental", "Hydraulics", "Construction Technology", "Ocean Engineering", "Earthquake", "Infrastructure", "Geomatics"],
    excludedKeywords: ["Architecture", "Software", "Electronics", "Electrical", "Mechanical Design"]
  },
  CH: {
    paperCode: "CH",
    allowedKeywords: ["Chemical", "Petroleum", "Polymer", "Bio-Chemical", "Process Engineering", "Fertilizer", "Refinery"],
    excludedKeywords: ["Electronics", "Electrical", "Structural", "Architecture"]
  },
  DA: {
    paperCode: "DA",
    allowedKeywords: ["Data Science", "Artificial Intelligence", "Machine Learning", "Computer Science", "Information Technology", "AI"],
    excludedKeywords: ["Civil", "Architecture", "Mechanical", "Electrical"]
  },
  IN: {
    paperCode: "IN",
    allowedKeywords: ["Instrumentation", "Control Engineering", "Process Control", "Signal Processing", "Measurement"],
    excludedKeywords: ["Civil", "Architecture", "Mechanical Design", "Structural"]
  }
};

/**
 * Checks if a program is eligible for a given set of GATE papers.
 * This is a heuristic-based check since official CCMT mappings are institute-specific.
 */
export function checkEligibility(programName: string, paperCodes: string[]): boolean {
  const normalizedName = programName.toLowerCase();
  
  return paperCodes.some(code => {
    const rule = ELIGIBILITY_RULES[code];
    if (!rule) return true; // If no rule, allow it (fallback)

    // Check if any allowed keyword matches
    const hasAllowed = rule.allowedKeywords.some(keyword => 
      normalizedName.includes(keyword.toLowerCase())
    );

    if (!hasAllowed) return false;

    // Check if any excluded keyword matches
    const hasExcluded = rule.excludedKeywords?.some(keyword => 
      normalizedName.includes(keyword.toLowerCase())
    );

    return !hasExcluded;
  });
}
