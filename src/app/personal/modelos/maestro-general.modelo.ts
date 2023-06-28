export interface IDatos {
  codigo            : string;
  tipo              : string;
  padre             : number | null;
  nombre            : string;
  valor1            : string | null;
  valor2            : string | null;
  valor3            : string | null;
  valor4            : string | null;
  id                : number;
  estado            : number;
  fechaCreacion     : string;
  fechaModificacion : string | null;
  codigoFactores?            : string;
}
