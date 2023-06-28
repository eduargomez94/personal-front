export interface IRespuestaIngresar<T> {
  success: number;
  esAutenticado: boolean;
  token: string;
  roles: []
}

export interface IRespuestaMenus<T> {
  data: []
}
