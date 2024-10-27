document.getElementById("generateBtn").addEventListener("click", generateJoke);

async function generateJoke() {
    const url = "https://v2.jokeapi.dev/joke/Any";  // URL de la JokeAPI
    const jokeText = document.getElementById("jokeText");

    console.log("Botón clicado. Intentando obtener un chiste...");

    try {
        console.log("Realizando la solicitud a la API...");
        
        const response = await fetch(url);

        console.log("Respuesta de la API recibida:", response);

        if (!response.ok) {
            console.error("Error en la respuesta de la API:", response.status);
            throw new Error("Ocurrió un error al obtener el chiste.");
        }

        const data = await response.json();
        console.log("Datos del chiste recibidos:", data);

        displayJoke(data);
    } catch (error) {
        console.error("Error en la solicitud:", error);
        displayJoke({ setup: "Ocurrió un error. Inténtalo de nuevo más tarde.", delivery: "" });
    }
}

// Función para mostrar el chiste en el contenedor
function displayJoke(jokeData) {
    const jokeText = document.getElementById("jokeText");

    // Verificar si el chiste es de una sola parte o de dos partes (setup y delivery)
    if (jokeData.type === "single") {
        jokeText.textContent = `Chiste: ${jokeData.joke}`;
    } else if (jokeData.type === "twopart") {
        jokeText.innerHTML = `<strong>${jokeData.setup}</strong><br>${jokeData.delivery}`;
    }
    
    console.log("Chiste mostrado en pantalla:", jokeData);
}
