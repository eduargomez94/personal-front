export interface Cliente {
  id: number;
  contacto?: string;
  descripcion?: string;
  direccion?: string;
  email?: string;
  estado?: string;
  id_ciudad?: number;
  id_depto?: number;
  id_pais?: number;
  logo?: number;
  no_documento?: string;
  nombre?: string;
  nombre_ciudad?: string;
  nombre_depto?: string;
  nombre_logo?: string;
  nombre_pais?: string;
  pagina_web?: string;
  telefono?: string;
  tipo_documento?: number;
  file_logo?: string;
  ubicacion: string;
}
