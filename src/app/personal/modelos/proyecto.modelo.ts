export interface Proyecto {
    Id_proyecto?: number;
    Id_cliente?: number;
    Fecha_terminacion_pres?: string;
    Id_tipo_proyecto?: number;
    Fecha_terminacion_real?: string;
    Fecha_inicio?: string;
    Nombre_proyecto?: string;
    Descripcion?: string;
    Valor_presupuestado?: number;
    Valor_real?: number;
    Estado?: string;
}