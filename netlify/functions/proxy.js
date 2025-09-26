exports.handler = async (event) => {
  const { url, method, headers, body } = JSON.parse(event.body);

  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
