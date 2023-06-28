export class ApiConstantes {

  public static API_KEY = {
    key: 'ZX$JMv6ddlOiCId5PxHpTfewrisfrg5w4Zl4GOX#RN5EyYxA5q@vp0gJ!$CX3HSXba$ofXi64rrdHq4GYw6mt&vUe0ibIYs%2Yz0*Bv',
    apiKey: 'h%DY7tPw*MG22lBMdcnbri27STCJR9S#JfnY5hfYH1D26z9QhFnI#',
  };

  public static INICIAR_SESION = {
    generaToken: '/api/AuthToken/GeneraToken',
    conexion: 'https://api.ipify.org?format=json',
    iniciar: '/api/AuthToken/IniciarSesion',
    iniciarLdap: '/api/AuthToken/ValidarToken',
    finalizar: '/api/AuthToken/CerrarSesion'
  };

  public static MAESTRO_GENERAL = {
    obtenerTodos: '/api/MestroGeneral/ObtenerTodos',
    obtenerPorId: '/api/MestroGeneral/ObtenerPorId',
    obtenerPorTipo: '/api/MestroGeneral/ObtenerPorTipo',
    obtenerPorTipoPadre: '/api/MestroGeneral/ObtenerPorTipoPadre'
  };

  public static COTIZADOR = {
    ObtenerInformacionCotizador: '/api/Cotizador/ObtenerInformacionCotizadorPersonalizado',
    ObtenerInformacionCotizadorPrecio: '/api/Cotizador/ObtenerInformacionCotizadorPrecio',
    ObtenerPLanesAComparar: '/api/PlanesAComparar/ObtenerPlanesAComparar',
    ObtenerPLanesACompararSmart: '/api/PlanesAComparar/ObtenerPlanesACompararSmart'
  };

  public static AYUDA = {
    ObtenerTextosAyuda: '/api/TextosAyuda/ObtenerPorCodigo'
  }
}
