const pathSimulador = "administracion/simulador/registro";
const pathGrafico = "administracion/grafico";
const pathManual = "manual";
const iconType1 = "fa fa-file-invoice-dollar fa-2xl";
const iconType2 = "fas fa-chart-pie fa-2xl";
const iconType3 = "fa fa-youtube fa-2xl";
const title1 = "Cotizador";
const title2 = "Generador gráfico";
const title3 = "Manual de Usuario";
const type = "link";
const type2 = "href";
const hrefManual = "https://saludsacomec.sharepoint.com/sites/Sales-360";

export class RutasConstantes {

  public static RUTAS_ADMIN_SALES360 = [
    {
      path: pathSimulador,
      title: title1,
      type: type,
      icontype: iconType1,
      enable: true
    },
    {
      path: pathGrafico,
      title: title2,
      type: type,
      icontype: iconType2,
      enable: true
    },
    {
      path: pathManual,
      title: title3,
      type: type2,
      icontype: iconType3,
      enable: true,
      href: hrefManual
    }
  ];

  public static RUTAS_SALES360 = [
    {
      path: pathSimulador,
      title: title1,
      type: type,
      icontype: iconType1,
      enable: true
    },
    {
      path: pathGrafico,
      title: title2,
      type: type,
      icontype: iconType2,
      enable: true
    },
    {
      path: pathManual,
      title: title3,
      type: type2,
      icontype: iconType3,
      enable: true,
      href: hrefManual
    }
  ];

  public static RUTAS_ADMIN_SALES360_DIS_GRAFICOS = [
    {
      path: pathSimulador,
      title: title1,
      type: type,
      icontype: iconType1,
      enable: true
    },
    {
      path: pathGrafico,
      title: title2,
      type: type,
      icontype: iconType2,
      enable: false
    },
    {
      path: pathManual,
      title: title3,
      type: type2,
      icontype: iconType3,
      enable: true,
      href: hrefManual
    }
  ];

  public static RUTAS_SALES360_DIS_GRAFICOS = [
    {
      path: pathSimulador,
      title: title1,
      type: type,
      icontype: iconType1,
      enable: true
    },
    {
      path: pathGrafico,
      title: title2,
      type: type,
      icontype: iconType2,
      enable: false
    },
    {
      path: pathManual,
      title: title3,
      type: type2,
      icontype: iconType3,
      enable: true,
      href: hrefManual
    }
  ];
}
