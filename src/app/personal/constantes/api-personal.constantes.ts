export class ApiConstantes {
  public static CONSTANTES_ENTIDADES = {
    pension: 'p',
    salud: 's',
    arl: 'r',
  };

  public static INICIAR_SESION = {
    ingresar: '/ingresar',
    menus: '/v1/menus',
  };

  public static EMPLEADOS = {
    empleados: '/v1/empleados',
    empleado: '/v1/empleado',
    misDatos: '/v1/empleado/mis-datos',
    pais: '/v1/pais',
    departamentos: '/v1/departamentos',
    ciudades: '/v1/ciudades',
  };

  public static ENTIDAD = {
    entidades: '/v1/entidades/',
  };

  public static PROYECTOS = {
    proyectos: '/v1/proyectos',
    activos: '/v1/proyectos/activos',
    proyecto: '/v1/proyecto',
    tipoProyecto: '/v1/tipo-proyectos',
  };

  public static ASIGNACIONES = {
    asignaciones: '/v1/asignaciones',
    asignacion: '/v1/asignacion',
    tabla: '/v1/asignaciones/tabla',
  };

  public static CLIENTES = {
    clientes: '/v1/clientes',
    clientesActivos: '/v1/clientes/activos',
    cliente: '/v1/cliente',
  };

  public static TIPOS_DOCUMENTO = {
    tiposdocumento: '/v1/tiposdocumento',
    tipodocumento: '/v1/tipodocumento',
  };
}
