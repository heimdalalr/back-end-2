const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const ctrl = require('./controller.js');

const endpoint = '/api/house';
app.get(endpoint, ctrl.getHouses);
app.post(endpoint, ctrl.createHouse);
app.put(`${endpoint}:id`, ctrl.updateHouse);
app.delete(`${endpoint}:id`, ctrl.deleteHouse);

const port = 4004;
app.listen(port, () => {console.log(`Listening on Port: ${port}`)});