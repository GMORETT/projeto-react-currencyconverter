import React, { useState, useEffect } from 'react';

function App() {
  const [moedas, setMoedas] = useState([]);
  const [valor, setValor] = useState(1);
  const [moedaOrigem, setMoedaOrigem] = useState('USD');
  const [moedaDestino, setMoedaDestino] = useState('BRL');
  const [resultado, setResultado] = useState(0);

  useEffect(() => {
    // Substituir com a URL da API
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => response.json())
      .then((data) => setMoedas(Object.keys(data.rates)));
  }, []);

  const converter = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`)
      .then((response) => response.json())
      .then((data) => {
        const taxa = data.rates[moedaDestino];
        setResultado(valor * taxa);
      });
  };

  return (
    <div>
      <h1>Conversor de Moedas</h1>
      <div>
        <label>Valor: </label>
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>
      <div>
        <label>De: </label>
        <select value={moedaOrigem} onChange={(e) => setMoedaOrigem(e.target.value)}>
          {moedas.map((moeda) => (
            <option key={moeda} value={moeda}>
              {moeda}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Para: </label>
        <select value={moedaDestino} onChange={(e) => setMoedaDestino(e.target.value)}>
          {moedas.map((moeda) => (
            <option key={moeda} value={moeda}>
              {moeda}
            </option>
          ))}
        </select>
      </div>
      <button onClick={converter}>Converter</button>
      <h2>Resultado: {resultado.toFixed(2)}</h2>
    </div>
  );
}

export default App;
