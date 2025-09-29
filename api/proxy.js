export default async function handler(request, response) {
  // Leer los datos de la petición que viene del frontend
  const { url, method, headers, body } = request.body;

  try {
    // Hacer la llamada real a la API externa (Notion o IA)
    const apiResponse = await fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await apiResponse.text();

    // Enviar la respuesta de vuelta al frontend
    // Primero, establecer los headers de CORS para permitir la comunicación
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Enviar la respuesta
    response.status(apiResponse.status).send(data);

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
