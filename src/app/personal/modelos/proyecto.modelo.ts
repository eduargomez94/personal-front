export interface Proyecto {
    id?: number;    
    nombre?: string;
    descripcion?: string;
    fecha_inicio?: string;
    fecha_fin_proyectada?: string;
    fecha_fin_real?: string;
    estado?: string;
    id_tipo_proyecto?: number;
    nombre_tipo_proyecto?: string;
    id_cliente?: number;
    no_documento?: string;
    nombre_cliente?: string;
    valor_presupuestado?: number;
}