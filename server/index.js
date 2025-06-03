const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// Rota para buscar endereço via CEP
app.get('/cep/:cep', async (req, res) => {
  const cep = req.params.cep;
  try {
    const response = await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o CEP' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
