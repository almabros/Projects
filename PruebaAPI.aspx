<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PruebaAPI.aspx.cs" Inherits="MonitoreoPUC.PruebaAPI" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <title>Monitoreo OBM</title>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <%--<meta http-equiv="refresh" content="60" />--%>

    <link href="Styles/all.min.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
    <link href="Styles/sb-admin-2.min.css" rel="stylesheet" />
    <link href="Styles/waitMe.css" rel="stylesheet" />

    <script type="text/javascript" src="Script/jquery.min.js"></script>
    <script type="text/javascript" src="Script/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="Script/jquery.easing.min.js"></script>
    <script type="text/javascript" src="Script/sb-admin-2.min.js"></script>
    <script type="text/javascript" src="Script/waitMe.js"></script>

    <style>
        .tooltip {
          position: relative;
          display: inline-block;
          border-bottom: 1px dotted black;
        }

        .tooltip .tooltiptext {
          visibility: hidden;
          width: 120px;
          background-color: #555;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px 0;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          left: 50%;
          margin-left: -60px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .tooltip .tooltiptext::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #555 transparent transparent transparent;
        }

        .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
    </style>

</head>

<body>
    
  <div class="containerBlock">
    <div id="wrapper">

        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <div class="container-fluid">
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 id="hRut" class="h3 mb-0 text-gray-800"></h1>
              </div>
              <div class="row">

                <div class="col-xl-3 col-md-6 mb-3">
                  <div id="divOAUTH" class="card shadow h-100 py-2" data-toggle="tooltip">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">  OAUTH</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">  </div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-3">
                  <div id="divLogin" class="card shadow h-100 py-2" data-toggle="tooltip">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">  Login</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800"> </div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-3">
                  <div id="divPerfilamiento" class="card shadow h-100 py-2" data-toggle="tooltip">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">  Perfilamiento</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">  </div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-3">
                    <div id="divConsultaCliente" class="card shadow h-100 py-2" data-toggle="tooltip">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">  ConsultaCliente</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">  </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

              </div>

                <div class="row">
                    
                    <div class="col-xl-3 col-md-6 mb-3">
                      <div id="divCapturaCliente" class="card shadow h-100 py-2" data-toggle="tooltip">
                        <div class="card-body">
                          <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                              <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">  CapturaCliente</div>
                              <div class="h5 mb-0 font-weight-bold text-gray-800">  </div>
                            </div>
                            <div class="col-auto">
                              <i class="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-3">
                      <div id="divMantenimientoClienteGuardar" class="card shadow h-100 py-2" data-toggle="tooltip">
                        <div class="card-body">
                          <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                              <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">  MantenimientoCliente</div>
                              <div class="h5 mb-0 font-weight-bold text-gray-800">  Guardar</div>
                            </div>
                            <div class="col-auto">
                              <i class="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-3">
                      <div id="divRentaCliente" class="card shadow h-100 py-2" data-toggle="tooltip">
                        <div class="card-body">
                          <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                              <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">  RentaCliente</div>
                              <div class="h5 mb-0 font-weight-bold text-gray-800">  </div>
                            </div>
                            <div class="col-auto">
                              <i class="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-3">
                      <div id="divManenimientoClienteAlta" class="card shadow h-100 py-2" data-toggle="tooltip">
                        <div class="card-body">
                          <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                              <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">  MantenimientoCliente</div>
                              <div class="h5 mb-0 font-weight-bold text-gray-800">  Alta</div>
                            </div>
                            <div class="col-auto">
                              <i class="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    
</body>

    <script src="Script/Negocio/validacionAPI.js" type="text/javascript"></script>

</html>
