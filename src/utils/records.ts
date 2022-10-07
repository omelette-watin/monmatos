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
    GROUPE: "GROUPE",
  },
  AGSE: {
    LOUVETEAUX: "LOUVETEAUX",
    JEANNETTES: "LOUVETTES",
    ECLAIREURS: "ÉCLAIREURS",
    ECLAIREUSES: "ÉCLAIREUSES",
    EQUIPIERES: "ÉQUIPIÈRES PILOTES",
    EQUIPIERS: "ÉQUIPIERS PILOTES",
    GROUPE: "GROUPE",
  },
  SUF: {
    LOUVETEAUX: "LOUVETEAUX",
    JEANNETTES: "JEANNETTES",
    ECLAIREURS: "ÉCLAIREURS",
    GUIDES: "GUIDES",
    ROUTIERS: "ROUTIER",
    GUIDESAINNES: "GUIDES-AÎNÉES",
    GROUPE: "GROUPE",
  },
  EEUDF: {
    LOUVETEAUX: "LOUVETEAUX",
    LOUVETTES: "LOUVETTES",
    ECLAIREURS: "ÉCLAIREURS",
    ECLAIREUSES: "ÉCLAIREUSES",
    AINES: "AÎNÉS",
    AINEES: "AÎNÉES",
    RESPONSABLES: "RESPONSABLES",
  },
}

export const movements: Record<Group["movement"], string> = {
  SGDF: "Scouts et Guides de France",
  SUF: "Scouts unitaire de France",
  AGSE: "Association des Guides et Scouts d'Europe",
  EEUDF: "Éclaireuses et Éclaireurs unionistes de France",
}
