export default async function handler(request, response) {
  const { url, method, headers, body } = request.body;
  try {
    const apiResponse = await fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await apiResponse.text();
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.status(apiResponse.status).send(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
