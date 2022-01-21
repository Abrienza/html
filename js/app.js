function login(){
    let name = prompt("Ingrese su nombre: ");
    let edad = parseInt(prompt(name + " ingrese su edad: "));
    if(edad >= 18){
        let nombre = "ayelen";
        let usuario = "";
        while(nombre !== usuario) {
            usuario = prompt("Ingrese nombre de usuario: ").toLowerCase();
            console.log("Usuario renonocido: " + usuario);
        }
        alert("Bienvenido/a: " + usuario);
    }else {
        alert("Solo permitido para mayores de 18 años");
    }
}

function elegiPlan(){
    let productos = parseInt(prompt(" elegir tu plan \n" + "1 - plan running\n" + "2 - plan aguas abiertas\n" + "3 - plan fitness: "));
    console.log(productos);
    switch(productos) {
        case 1:
            alert("Bienvenido a tu plan 01");
            break;
        case 2:
            alert("Bienvenidon a tu plan 02");
            break;
        case 3:
            alert("Bienvenido a tu plan 03");
            break;
        default:
            alert("No contamos con ese plan");
            break;
    }
}