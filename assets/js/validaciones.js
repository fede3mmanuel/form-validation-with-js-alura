export function valida(input) {
    const tipoDeInput = input.dataset.input;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classlist.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message--error").innerHTML = ""
    }else {
        input.parentElement.classlist.add("input-container--invalid")
        input.parentElement.querySelector(".input-message--error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMissmatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    }, 
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMissmatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Debe de tener mayusculas"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años"
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(input.validity.error);
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);

    let mensaje = ""
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener almenos 18 años de edad"
    }

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate())
    return diferenciaFechas <= fechaActual;
}