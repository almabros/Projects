var DATOS = {};
var RESPUESTA = {};
var _CENTRO;
var _USUARIO;
var _ACCESSTOKEN;
var _RUTCLIENTE;

$(document).ready(function () {

    run_waitMe($('.containerBlock > div'), 1, 'win8', 'Estamos actualizando el estado de las APIS...');

    setTimeout(function () {
        cargarAPIS();
        $('.containerBlock > div').waitMe('hide');
    }, 2000);
});

function run_waitMe(el, num, effect, mensaje) {
    text = mensaje;
    fontSize = '';
    switch (num) {
        case 1:
            maxSize = '';
            textPos = 'vertical';
            break;
        case 2:
            text = '';
            maxSize = 30;
            textPos = 'vertical';
            break;
        case 3:
            maxSize = 30;
            textPos = 'horizontal';
            fontSize = '18px';
            break;
    };
    console.log(effect);
    el.waitMe({
        effect: effect,
        text: text,
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        maxSize: maxSize,
        source: '../img/img.svg',
        textPos: textPos,
        fontSize: fontSize,
        onClose: function () { }
    });
};

function cargarAPIS() {
    //var _rptaB011 = consultaTibco("B011");

    var num_aleatorio = '00000000000';
    while (num_aleatorio <= '00240000000') {
        num_aleatorio = Math.round(Math.random() * (25000000 - 5000000)) + 5000000;
        num_aleatorio = num_aleatorio + getDigito(num_aleatorio);
        num_aleatorio = pad_with_zeroes(num_aleatorio, 11);
    }
    _RUTCLIENTE = num_aleatorio;
    document.getElementById("hRut").innerHTML = _RUTCLIENTE;

    ObtenerOAUth();
    lanzarLogin();
    lanzarPerfilamiento();
    consultaCliente();
    capturaCliente();
};

function getDigito(rut) {
    var dvr = '0';
    suma = 0;
    mul = 2;
    for (i = rut.length - 1; i >= 0; i--) {
        suma = suma + rut.charAt(i) * mul;
        if (mul == 7) {
            mul = 2;
        }
        else {
            mul++;
        }
    }
    res = suma % 11;
    if (res == 1) {
        return 'k';
    }
    else if (res == 0) {
        return '0';
    }
    else {
        return 11 - res;
    }
}

function pad_with_zeroes(number, length) {
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;
}

function ObtenerOAUth() {
    var retorno = false;

    $.ajax({
        url: "https://apideveloper.santander-homo.cl/sancl/privado/oauth/token",
        type: "POST",
        async: false,
        contentType: "application/x-www-form-urlencoded",
        data: {
            grant_type: 'client_credentials',
            scope: 'autenticacion_usuario',
            client_id: '10ce7b00-23cb-4d50-931a-64f863d397f3',
            client_secret: 'kY5kH0oO5tC7yF8xC0uI4lO8tF1nT3eK5iH7fW1qW7kC6cS1sN'
        },
        success: function (resultado) {
            _ACCESSTOKEN = resultado.access_token;
            var salida = JSON.stringify(resultado, null, 2); 

            $('#divOAUTH').addClass('border-left-success')
            document.getElementById('divOAUTH').setAttribute('title', salida);

            retorno = true;
        },
        error: function (jqXHR, exception) {
            var error = jqXHR.responseJSON.errors[0].code + ' ' +
                        jqXHR.responseJSON.errors[0].level + ' ' +
                        jqXHR.responseJSON.errors[0].message;

            $('#DivOAUTH').addClass('card border-left-danger');
            document.getElementById('divOAUTH').setAttribute('title', error);

            retorno = false;
        },
    });

    return retorno;
}

function lanzarLogin() {
    var retorno = false;
    var inputLogin = {
        usuario: "00125848591",
        clave: "temporal01",
        canal: "70",
        app: "BPU"
    };
    //var _access_token;

    $.ajax({
        url: "https://apideveloper.santander-homo.cl/sancl/privado/funcionarios/login",
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(inputLogin),
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _ACCESSTOKEN)
        },
        success: function (data, textStatus, request) {
            _ACCESSTOKEN = request.getResponseHeader('access-token');
            var salida = JSON.stringify(data, null, 2);

            $('#divLogin').addClass('border-left-success')
            document.getElementById('divLogin').setAttribute('title', salida);
                        
            retorno = true;
        },
        error: function (jqXHR, exception) {
            var error = jqXHR.responseJSON.errors[0].code + ' ' +
                        jqXHR.responseJSON.errors[0].level + ' ' +
                        jqXHR.responseJSON.errors[0].message;

            $('#divLogin').addClass('border-left-danger')
            document.getElementById('divLogin').setAttribute('title', error);

            retorno = false;
        },
    });

    return retorno;
}

function lanzarPerfilamiento() {
    var retorno = false;

    $.ajax({
        url: "https://apideveloper.santander-homo.cl/sancl/privado/perfiles/00125848591",
        type: "GET",
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _ACCESSTOKEN)
        },
        success: function (result) {
            var salida = JSON.stringify(result, null, 2);

            $('#divPerfilamiento').addClass('border-left-success')
            document.getElementById('divPerfilamiento').setAttribute('title', salida);

            _CENTRO = result.MATRIZ[1].CCONTA;
            _USUARIO = result.MATRIZ[1].USUARIO;

            retorno = true;
        },
        error: function (xhr, status, error) {
            var error = jqXHR.responseJSON.errors[0].code + ' ' +
                jqXHR.responseJSON.errors[0].level + ' ' +
                jqXHR.responseJSON.errors[0].message;

            $('#divPerfilamiento').addClass('border-left-success')
            document.getElementById('divPerfilamiento').setAttribute('title', error);

            retorno = false;
        },
    });

    return retorno;
}

function consultaCliente() {
    var retorno = false;

    $.ajax({
        url: "https://apideveloper.santander-homo.cl/sancl/privado/clientes/00125848591",
        type: "GET",
        async: false,
        data: {
            centro: _CENTRO,
            usuarioEjecutivo: _USUARIO,
            tipoConsulta: 'C',
            rutEjecutivo: '',
            rutCliente: _RUTCLIENTE,
            fechaSolicitud: '',
            fechaAsignacion: '',
            estado: '',
            sucursal: '',
            empresa: '0035'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _ACCESSTOKEN)
        },
        success: function (result) {
             var salida = JSON.stringify(result, null, 2);

            $('#divConsultaCliente').addClass('border-left-success')
            document.getElementById('divConsultaCliente').setAttribute('title', salida);

            retorno = true;
        },
        error: function (jqXHR, exception) {
            var error = jqXHR.responseJSON.errors[0].code + ' ' +
                        jqXHR.responseJSON.errors[0].level + ' ' +
                        jqXHR.responseJSON.errors[0].message;

            $('#divConsultaCliente').addClass('border-left-danger')
            document.getElementById('divConsultaCliente').setAttribute('title', error);

            retorno = false;
        },
    });

    return retorno;
}

function capturaCliente() {
    var retorno = false;
    var inputLogin = {
        ProcesoNegocio: "OPUC",
        Centro: _CENTRO,
        CanalLogico: "070",
        UsuarioEjecutivo: _USUARIO,
        UsuarioGenerico: "GOBDIGY",
        RutCliente: _RUTCLIENTE,
        TipoContratacion: "B",
        TipoCompraDatosExternos: "N",
        TokenHuella: ""
    };

    $.ajax({
        url: "https://apideveloper.santander-homo.cl/sancl/privado/clientes/clientes/00125848591",
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(inputLogin),
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _ACCESSTOKEN)
        },
        success: function (result) {
            var salida = JSON.stringify(result, null, 2);

            $('#divCapturaCliente').addClass('border-left-success')
            document.getElementById('divCapturaCliente').setAttribute('title', salida);

            retorno = true;
        },
        error: function (jqXHR, exception) {
            var error = jqXHR.responseJSON.httpCode + ' ' +
                jqXHR.responseJSON.httpMessage + ' ' +
                jqXHR.responseJSON.moreInformation;

            $('#divCapturaCliente').addClass('border-left-danger')
            document.getElementById('divCapturaCliente').setAttribute('title', error);

            retorno = false;
        },
    });

    return retorno;
}

function MantenimientoClienteGuardar() {
    var retorno = false;
    var inputLogin = {
        ProcesoNegocio: "OPUC",
        Centro: _CENTRO,
        CanalLogico: "070",
        UsuarioEjecutivo: _USUARIO,
        UsuarioGenerico: "GOBDIGY",
        RutCliente: _RUTCLIENTE,
        TipoContratacion: "B",
        TipoCompraDatosExternos: "N",
        TokenHuella: ""
    };

    $.ajax({
        url: "https://apideveloper.santander-homo.cl/sancl/privado/clientes/clientes/00125848591",
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(inputLogin),
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _ACCESSTOKEN)
        },
        success: function (result) {
            var salida = JSON.stringify(result, null, 2);

            $('#divCapturaCliente').addClass('border-left-success')
            document.getElementById('divCapturaCliente').setAttribute('title', salida);

            retorno = true;
        },
        error: function (jqXHR, exception) {
            var error = jqXHR.responseJSON.httpCode + ' ' +
                jqXHR.responseJSON.httpMessage + ' ' +
                jqXHR.responseJSON.moreInformation;

            $('#divCapturaCliente').addClass('border-left-danger')
            document.getElementById('divCapturaCliente').setAttribute('title', error);

            retorno = false;
        },
    });

    return retorno;
}