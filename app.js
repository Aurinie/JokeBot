document.getElementById("generateBtn").addEventListener("click", generateJoke);

// Función asincrónica que realiza la solicitud a la API de chistes y obtiene un chiste
async function generateJoke() {
    const url = "https://v2.jokeapi.dev/joke/Any";  // URL de la JokeAPI
    const jokeText = document.getElementById("jokeText");

    console.log("Botón clicado. Intentando obtener un chiste...");

    try {
        console.log("Realizando la solicitud a la API...");
        
        // Se hizo la solicitud a la API usando fetch
        const response = await fetch(url);

        console.log("Respuesta de la API recibida:", response);

        // Verificación de la respuesta de la API para asegurar que no haya errores
        if (!response.ok) {
            console.error("Error en la respuesta de la API:", response.status);
            throw new Error("Ocurrió un error al obtener el chiste.");
        }
        // Se transforman los datos de la respuesta en formato JSON
        const data = await response.json();
        console.log("Datos del chiste recibidos:", data);

        // Se acumula la función displayJoke para mostrar el chiste en pantalla
        displayJoke(data);
    } catch (error) {
        console.error("Error en la solicitud:", error);
        displayJoke({ setup: "Ocurrió un error. Inténtalo de nuevo más tarde.", delivery: "" });
    }
}

// Función para mostrar el chiste en el contenedor
function displayJoke(jokeData) {
    const jokeText = document.getElementById("jokeText");

      // Verificación de si el chiste es de una sola parte o de dos partes (setup y delivery)
    if (jokeData.type === "single") {
        jokeText.textContent = `Chiste: ${jokeData.joke}`;
    } else if (jokeData.type === "twopart") {
        jokeText.innerHTML = `<strong>${jokeData.setup}</strong><br>${jokeData.delivery}`;
    }
    
    console.log("El duende cortes", jokeData);
}
