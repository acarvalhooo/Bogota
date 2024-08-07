const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_URL = 'https://api.xxxxxxxxxx.io/v1'; // Censurado
const API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Censurado
const STORE_REFERENCE = 'xxxxxx'; // Censurado

// Rota para verificar a disponibilidade
app.get('/api/availability', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/availability`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      },
      params: {
        store_reference: STORE_REFERENCE,
        latitude: 4.7110, // Latitude de Bogotá
        longitude: -74.0721, // Longitude de Bogotá
        operational_model: 'FULL_SERVICE'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo pedido (JOB)
app.post('/api/create-job', async (req, res) => {
  const { timeSlot } = req.body;

  try {
    const response = await axios.post(
      `${API_URL}/jobs`,
      {
        store_reference: STORE_REFERENCE,
        time_slot: timeSlot,
        latitude: 4.7110, // Latitude de Bogotá
        longitude: -74.0721, // Longitude de Bogotá
        operational_model: 'FULL_SERVICE'
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter detalhes do pedido (JOB)
app.get('/api/job/:id', async (req, res) => {
  const jobId = req.params.id;

  try {
    const response = await axios.get(`${API_URL}/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para faturar um pedido
app.post('/api/invoice', async (req, res) => {
  const { jobId, amount } = req.body;

  try {
    const response = await axios.post(
      `${API_URL}/invoices`,
      {
        job_id: jobId,
        amount: amount
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});