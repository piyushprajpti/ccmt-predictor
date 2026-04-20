export type Institute = {
  name: string;
  category: "NIT" | "IIIT" | "State University" | "Other";
  programs: string[];
};

export type Program = {
  name: string;
  institutes: string[];
};
