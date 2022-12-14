import { Group, Unit } from "@prisma/client"

export const units: Record<Group["movement"], Partial<Record<Unit, string>>> = {
  SGDF: {
    FARFADETS: "FARFADETS",
    LOUVETEAUX: "LOUVETEAUX",
    JEANNETTES: "JEANNETTES",
    SCOUTS: "SCOUTS",
    GUIDES: "GUIDES",
    PIONNIERS: "PIONNERS",
    CARAVELLES: "CARAVELLES",
    COMPAGNONS: "COMPAGNONS",
    GROUPE: "NON ATTRIBUÉE",
  },
  AGSE: {
    LOUVETEAUX: "LOUVETEAUX",
    JEANNETTES: "LOUVETTES",
    ECLAIREURS: "ÉCLAIREURS",
    ECLAIREUSES: "ÉCLAIREUSES",
    EQUIPIERES: "ÉQUIPIÈRES PILOTES",
    EQUIPIERS: "ÉQUIPIERS PILOTES",
    GROUPE: "NON ATTRIBUÉE",
  },
  SUF: {
    LOUVETEAUX: "LOUVETEAUX",
    JEANNETTES: "JEANNETTES",
    ECLAIREURS: "ÉCLAIREURS",
    GUIDES: "GUIDES",
    ROUTIERS: "ROUTIER",
    GUIDESAINNES: "GUIDES-AÎNÉES",
    GROUPE: "NON ATTRIBUÉE",
  },
  EEUDF: {
    LOUVETEAUX: "LOUVETEAUX",
    LOUVETTES: "LOUVETTES",
    ECLAIREURS: "ÉCLAIREURS",
    ECLAIREUSES: "ÉCLAIREUSES",
    AINES: "AÎNÉS",
    AINEES: "AÎNÉES",
    RESPONSABLES: "RESPONSABLES",
    GROUPE: "NON ATTRIBUÉE",
  },
  EEDF: {
    LUTINS: "LUTINS",
    LUTINES: "LUTINES",
    LOUVETEAUX: "LOUVETEAUX",
    LOUVETTES: "LOUVETTES",
    ECLAIREURS: "ÉCLAIREURS",
    ECLAIREUSES: "ÉCLAIREUSES",
    AINES: "AÎNÉS",
    AINEES: "AÎNÉES",
    GROUPE: "NON ATTRIBUÉE",
  },
  EEIDF: {
    BATISSEURS: "BÂTISSEURS",
    ECLAIREURS: "ÉCLAIREURS",
    ECLAIREUSES: "ÉCLAIREUSES",
    PERSPECTIVES: "PERSPECTIVES",
    GROUPE: "NON ATTRIBUÉE",
  },
  SGDFM: {
    FARFADETS: "FARFADETS",
    MOUSSAILLONS: "MOUSSAILLONS",
    MOUSSES: "MOUSSES",
    MARINS: "MARINS",
    COMPAGNONS: "COMPAGNONS",
    RESPONSABLES: "RESPONSABLES",
    GROUPE: "NON ATTRIBUÉE",
  },
}

export const movements: Record<Group["movement"], string> = {
  SGDF: "Scouts et Guides de France",
  SGDFM: "Scouts et Guides de France Marins",
  SUF: "Scouts unitaire de France",
  AGSE: "Association des Guides et Scouts d'Europe",
  EEUDF: "Éclaireuses et Éclaireurs unionistes de France",
  EEDF: "Éclaireuses et Éclaireurs de France",
  EEIDF: "Éclaireuses et Éclaireurs Israélites de France",
}
