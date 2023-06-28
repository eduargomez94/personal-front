export interface IRespuestaDatosCotizacion {
  orden:          number;
  empresa:        string;
  familia:        string;
  plan:           string;
  datosVariables: DatosVariables;
  descuentos:     Descuento[];
  deducibles:     Deducible[];
  factorComparar: any[];
}

export interface DatosVariables {
  listaDeduciblesBase:  any[];
  listaResumenesPrecio: any[];
}

export interface Deducible {
  etiqueta:                string;
  precio:                  string;
  precioVitality:          string;
  listaDetalleDeducibles?: Deducible[];
}

export interface Descuento {
  etiqueta: string;
  valor:    number | string | any;
}

export interface Data {
  factor: {
    codigoFactor: string;
  };
  listaAtributosPrimarios: Atributo[];
  listaAtributosSecundarios: AtributoSecundario[];
}

export interface Atributo {
  etiqueta: string;
  valor: string;
}

export interface AtributoSecundario {
  nombreAtributoSecundario: string;
  listaAtributos: Atributo[];
}
