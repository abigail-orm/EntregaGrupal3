const requestURL = 'https://images-api.nasa.gov/';

const buscador = document.getElementById('searchForm')
buscador.addEventListener('submit', traerImagenes);

function traerImagenes(e) {
    e.preventDefault()
    var valor = document.getElementById("inputBuscar").value;

    const request = new XMLHttpRequest();
    request.open('GET', requestURL + 'search?q=' + valor);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        respuesta = request.response.collection.items;
        showResults(respuesta);
    }
}

function showResults(results){
    let htmlContentToAppend = "";
    for(let i = 0; i < results.length; i++){
        let item = results[i];
        let image = 'https://media.istockphoto.com/vectors/vector-play-button-icon-vector-id1066846868?k=20&m=1066846868&s=612x612&w=0&h=BikDjIPuOmb08aDFeDiEwDiKosX7EgnvtdQyLUvb3eA='

        if(item.data[0].media_type == 'image'){
            image = item.links[0].href
        }

console.log(item)

        htmlContentToAppend += `
            <div onclick="setCatID(${item.data[0].nasa_id})" class="card">
                <div>
                    <div class="imageContainer">
                        <img src="${image}">
                    </div>
                    <div>
                        <h4>${item.data[0].title}</h4>
                    </div>
                    <div class="descriptionContainer">
                        <p>${item.data[0].description}</p>
                    </div>
                </div>
                <p>${item.data[0].date_created}</p>
            </div>
            `
        //}
        document.getElementById("contenedor").innerHTML = htmlContentToAppend;
    }

}

// funcion para cuando la llamada es exitosa
function exito() {
    var datos = JSON.parse(this.responseText); //convertir a JSON
    console.log(datos);
}

// funcion para la llamada fallida
function error(err) {
    console.log('Solicitud fallida', err); //los detalles en el objecto "err"
}


var xhr = new XMLHttpRequest(); //invocar nueva instancia de XMLHttpRequest
xhr.onload = exito; // llamar a la funcion exito si exitosa
xhr.onerror = error;  // llamar a la funcion error si fallida
xhr.open('GET', 'https://images-api.nasa.gov/'); // Abrir solicitud GET
xhr.send(); // mandar la solicitud al vervidor.