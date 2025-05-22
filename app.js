//Configuración de proyecto de Firebase

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA43oDxDNgRWKSPsG4F1SI9p8a06Ev3u0Q",
  authDomain: "fir-8f31a.firebaseapp.com",
  projectId: "fir-8f31a",
  storageBucket: "fir-8f31a.firebasestorage.app",
  messagingSenderId: "1087452740043",
  appId: "1:1087452740043:web:c41746dd5d89d583de1e4e",
  measurementId: "G-3Z4ZVGY1J4"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// obtener una instancia de la Realtime Database
const db = app.database();

function crearUsuario(userId, nombre, email) {

    // crea un nodo en la ruta usuarios/userId con los datos nombre 
    // y email
    db.ref('usuarios/' + userId).set({
        nombre_usuario: nombre,
        email_usuario: email
    }).then(() => {
        // mostrar mensaje
        console.log("Usuario creado correctamente");
        limpiar();

        alert("Usuario creado correctamente");
    }).catch((ver_error) => {
        //mostrar mensaje de error
        console.log("Error al guardar datos:", ver_error)
    })
}

function setCrearusuario(){
    // obtiene los valores desde los unput 
    const useId = document.getElementById("userId").value; 
    const nombre = document.getElementById("nombre").value; 
    const email = document.getElementById("email").value;
    crearUsuario(useId,nombre,email);
}

function actualizarUsuario(userId, nombre, email) {
    //actualiza los campos nombre, email
    db.ref('usuarios/' + userId).update({
        nombre_usuario: nombre,
        email_usuario: email
    }).then(() => {
        console.log("Usuario actualizado")
    }).catch((ver_error) => {
        console.log("Error al actualizar datos: ", ver_error)
    })
}

function borrarUsuario(userId) {
    db.ref('usuarios/' + userId).remove().then(
        () => { console.log("Usuario borrado") }
    ).catch((ver_error) => {
        console.log("Error al borrar ususario: ", ver_error);
    })
}

function leerTodosLosUsuario() {
    db.ref('usuarios/').get().then((snapshot) => {
        if (snapshot.exists()) {
            const datos = [];
            snapshot.forEach(childSnapshot => {
                const id = childSnapshot.key;
                const usuario = childSnapshot.val();

                if (usuario !== null) {
                    datos.push({ id, ...usuario })
                }
            });
            let datosf = JSON.stringify(datos, null, 2)
            console.log(datosf);

            let tablaHTML = `
               <table border="1">
               <thead>
               <tr>
               <th>ID</th> 
               <th>Nombre</th>
               <th>Email</th>
               </tr>
               </thead>
               <body>

            `;
            datos.forEach((usuario) =>{
                tablaHTML += `
                <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre_usuario}</td>
                <td>${usuario.email_usuario}</td>
                </tr>
                `;
            })
            tablaHTML += `
            </tbody>
            </table>
            `;
            mostrarResultado(tablaHTML);
        }
  
    }).catch((ver_error) => {
        console.log("No se puede leer datos: ", ver_error);
    })
}

function leerUsuario(userId) {
    db.ref('usuarios/' + userId).get().then((snapshot) => {
        if (snapshot.exists()) {
            const datos = snapshot.val();
            console.log(JSON.stringify(datos, null, 2))
        }
    }).catch((ver_error) => {
        console.log("No se puede leer datos: ", ver_error);
    })
}

function mostrarResultado(texto) {
    document.getElementById("resultado").innerHTML = texto
}

function limpiar(){
    const userId = document.getElementById("userId");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    userId.value = "";
    nombre.value = "";
    email.value = "";
mostrarResultado("");
}
