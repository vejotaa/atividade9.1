import React, { useState } from 'react';
import './App.css';

function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [clima, setClima] = useState(null);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarCep = async () => {
    setLoading(true);
    setErro(null);
    setEndereco(null);
    setClima(null);

    try {
      // Buscar dados do endereço
      const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
      if (!response.ok) throw new Error('CEP não encontrado');
      const data = await response.json();
      setEndereco(data);

      // Buscar dados do clima
      const climaResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lng}&current_weather=true`
      );
      const climaData = await climaResponse.json();
      setClima(climaData.current_weather);

    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Consulta de Endereço e Clima</h1>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <button onClick={buscarCep}>Buscar</button>

      {loading && <p>Carregando...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {endereco && (
        <div className="resultado">
          <h2>Endereço</h2>
          <p><strong>Cidade:</strong> {endereco.city}</p>
          <p><strong>Estado:</strong> {endereco.state}</p>
          <p><strong>Bairro:</strong> {endereco.district}</p>
          <p><strong>Rua:</strong> {endereco.address}</p>
          <p><strong>Coordenadas:</strong> {endereco.lat}, {endereco.lng}</p>
        </div>
      )}

      {clima && (
        <div className="resultado">
          <h2>Clima Atual</h2>
          <p><strong>Temperatura:</strong> {clima.temperature}°C</p>
          <p><strong>Vento:</strong> {clima.windspeed} km/h</p>
          <p><strong>Condição:</strong> Código {clima.weathercode}</p>
        </div>
      )}
    </div>
  );
}

export default App;
