export interface INiveau {
  id?: number;
  libelle?: string;
  option?: string;
  capaciteClasse?: number;
}

export class Niveau implements INiveau {
  constructor(public id?: number, public libelle?: string, public option?: string, public capaciteClasse?: number) {}
}
