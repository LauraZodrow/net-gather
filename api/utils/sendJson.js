const sendJson = (res, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
}

module.exports = sendJson;
