
const express = require('express');
const port = 3000;

const app = express();
app.get("/", (req, res) => {
  const html = `
  <h1>Welcome</h1>
  <a href="https://github.com/login/oauth/authorize?client_id=288f2c59a63f6cde2761&scope=user">login with github</a>
  `;
  res.send(html);
});

app.get("/callback", (req, res) => {
  const code = req.query.code;
  const body = {
    client_id: "288f2c59a63f6cde2761",
    client_secret: "fd36191919d35e147f4534ebe5a785596c1809d5",
    code
  };
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    Accept: "application/json",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(json => {
    fetch(`https://api.github.com/user`, {headers: {Authorization: `Bearer ${json.access_token}`}})
    .then(response => response.json())
    .then(userJson => res.send(userJson));
  })
  .catch(err => res.send(err)) 
})
app.listen(port, () => console.log(`server is listening on port ${port}`));