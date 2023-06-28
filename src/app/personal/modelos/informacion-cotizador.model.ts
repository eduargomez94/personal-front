export interface IRequestInfoCotizador {
    listaBeneficiarios: IBeneficiarios[];
    region: IRegion;
    listaFactores: IFactores[];
    listaPlanes: IPlanes[];
}

export interface IBeneficiarios {
    genero: string;
    edad: number;
    maternidad: boolean;
}

export interface IRegion {
    codigoRegion: string;
}

export interface IFactores {
    codigoFactor: string;
}

export interface IPlanes {
    empresa: IEmpresa;
    familiaPlan: IFamiliaPlan;
    plan: IPlan;
    esPlanBase: boolean;
}

export interface IEmpresa {
    codigoEmpresa: string;
}

export interface IFamiliaPlan {
    codigoFamiliaPlan: string;
}

export interface IPlan {
    codigoPlan: string;
}
