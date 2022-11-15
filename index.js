'use strict';

/*
 * PIÑEIRO, CAROLINA | PICART, CATALINA
 */

// Ejemplo de la estructura de un disco:
// let disco = {
//     Nombre: 'El lado oscuro de la Programación',
//     Autor: 'Los Programadores Anónimos',
//     Codigo: 1,
//     Pistas: [
//         {
//             Nombre: 'Esa cajita loca llamada variablecita',
//             Duracion: 200,
//         },
//         {
//             Nombre: 'Nunca quise ser un NaN',
//             Duracion: 180,
//         },
//         {
//             Nombre: 'No quiero programar',
//             Duracion: 90,
//         },
//         {
//             Nombre: 'Bajo presión',
//             Duracion: 240,
//         },
//         {
//             Nombre: 'La odisea de las variables privadas',
//             Duracion: 120,
//         },
//         {
//             Nombre: 'Sr. Programador',
//             Duracion: 720,
//         },
//     ],
// };

// Discos:
let discos = [];

// Función Cargar:
const Cargar = () => {

    document.getElementById('alerta').innerHTML = " ";
    // Cositas:
    let nombre = prompt("Ingrese el nombr del disco");
    nombre = nombre.trim()
    while (nombre === ""){
        alert("El nombre del disco no puede estar vacío");
        nombre = prompt(" Por favor ingrese el nombre");
    }
    

    let autor = prompt("Ingrese autor");
    autor = autor.trim()
    while (autor === ""){
        alert("Debe ingresar el autor");
        autor = prompt("Ingrese autor");
    }
    
    let valido = false;
    let codigo;
    while(!valido){
        valido = true;
        codigo = parseInt(prompt("Ingrese el código. El mismo debe ser un número entre 1 y 999"));
        for(let i=0;i<discos.length;i++){
            if(codigo == discos[i].Codigo){
                valido = false;
                alert("El código ya existe. Por favor ingrese otro código distinto");
            }
        }
        if(codigo < 1 || codigo > 999){
            valido = false;
            alert("El código debe ser un número entre 1 y 999");
        }
        else if(isNaN(codigo)){
            valido=false;
            alert("El código ingresado debe ser un número")
        }
      
    }


//Pistas
    let sigue = 'si';

    let pistas = []
    while (sigue === 'si'){

        let nombrepista = prompt("Ingrese el nombre de la pista");
        nombrepista = nombrepista.trim()
        while (nombrepista === ""){
            alert("Debe ingresar el nombre de la pista");
            nombrepista = prompt("Ingrese el nombre de la pista");
        }

        let duracion = parseInt(prompt("Ingrese la duración"));

        while(duracion < 0 ||  duracion > 7200){
            alert("La duracion debe ser entre 0 y 7200");
            duracion = parseInt(prompt("Ingrese la duración"));
        }
        while(isNaN(duracion)){
            alert("La duración debe ser un número");
            duracion = parseInt(prompt("Ingrese duración"));
        }
        
        let pista = { "Nombre" : nombrepista, "Duracion" : duracion }

        pistas.push(pista);

        sigue = prompt("¿Desea cargar otra pista? si/no");
    }


//Disco
    let disco = { "Nombre" : nombre, "Autor" : autor, "Codigo" : codigo, "Pistas" : pistas }

    discos.push(disco)

    if(discos.length === 1){
        document.getElementById('info').innerHTML = '<h2>' + discos.length + " disco cargado.</h2>";
    }else{
        document.getElementById('info').innerHTML = '<h2>' + discos.length + " discos cargados.</h2>";
    }

};

// Función Mostrar:
const Mostrar = () => {

    document.getElementById('info').innerHTML = '';

    // Cositas:
    for(let i = 0;i<discos.length;i++){
        MostrarDisco(discos[i]);
    }
    
    let duracionmasaltaDisco = " ";
    let duracionmasalta = 0;
    for(let i = 0;i<discos.length;i++){
        for(let j = 0;j<discos[i].Pistas.length;j++){
            if(discos[i].Pistas[j].Duracion > duracionmasalta){
                duracionmasalta = discos[i].Pistas[j].Duracion;
                duracionmasaltaDisco = discos[i].Nombre.toUpperCase();
            }
        }
        
    }
    document.getElementById('info').innerHTML += '<span id="duracion">Duración más alta entre todos los discos: ' + duracionmasalta + ' del disco ' + duracionmasaltaDisco +'</span>'

};

// Todas las funciones que necesites:
/*
*Función que permite buscar código por número
*/
const Buscar = () => {
    let codigo = parseInt(prompt("Ingrese el código que desea buscar: "));
    document.getElementById('info').innerHTML = " "
    for(let i=0;i<discos.length;i++){
        if(discos[i].Codigo===codigo){
            MostrarDisco(discos[i]);
        } else{
            document.getElementById('alerta').innerHTML += '<h4>La búsqueda no coincide con ningún código ingresado</h4>';
        }
    }

    if(discos.length == 0){
        document.getElementById('alerta').innerHTML += '<h4>No hay ningún código ingresado aún</h4>';
    }
    
}

const MostrarDisco = (disco) => {
    document.getElementById('alerta').innerHTML = " ";
    let html = '<div class="contenedor_disco">';
    html += '<div class="imagen"></div>'
    html += '<h1> Nombre: ' + disco.Nombre.toUpperCase() + '</h1>'
    html += '<h2> Autor: ' + disco.Autor.toUpperCase() + '</h2>'
    html += '<h2> Código: ' + disco.Codigo + '</h2>'
    html += '<ul>'
    let duraciontotal = 0;
    let pistamayor = '';
    let mayorduracion = 0;
    for(let j = 0;j<disco.Pistas.length;j++){

        html += '<li class="duracion">' + disco.Pistas[j].Nombre + ' - ';
        duraciontotal = duraciontotal + disco.Pistas[j].Duracion;
        if(disco.Pistas[j].Duracion > 180){
            html += '<span class="colorrojo">' + disco.Pistas[j].Duracion + '</span></li>'
        }else{
            html += disco.Pistas[j].Duracion + '</li>'
        }
        
        if(disco.Pistas[j].Duracion > mayorduracion){
            mayorduracion = disco.Pistas[j].Duracion;
            pistamayor = disco.Pistas[j].Nombre;
        }

    }
    html += '</ul>'
    html += '<div class="detalles"><span>Cantidad de pistas: ' + disco.Pistas.length + '</span><br>'
    html += '<span>La duracion total es: ' + duraciontotal + ' segundos</span><br>'
    html += '<span>El promedio de duración de las pistas es: ' + (duraciontotal/disco.Pistas.length.toFixed(2)) + ' segundos</span><br>'
    html += '<span>La pista con mayor duración es ' + pistamayor + ' con ' + mayorduracion + ' segundos </span><br>';
    html += '</div>';
    html += '</div>';

    document.getElementById('info').innerHTML += html; // <--- ahí es acá

}