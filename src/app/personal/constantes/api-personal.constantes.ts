export class ApiConstantes {

  public static INICIAR_SESION = {
    ingresar: '/v1/ingresar',
    menus: '/v1/menus',

    generaToken: '/api/AuthToken/GeneraToken',
    conexion: 'https://api.ipify.org?format=json',
    iniciar: '/api/AuthToken/IniciarSesion',
    iniciarLdap: '/api/AuthToken/ValidarToken',
    finalizar: '/api/AuthToken/CerrarSesion'
  };
}
