import axios from 'axios';
import { API, httpsAgent } from './index.js';
import { Router } from "express";

const orders = Router();


orders.get('/', (req, res) => {
  axios.get(`${API}/order`, {httpsAgent})
    .then(orders => {
      res.status(200).json(orders.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
    console.log("Retrieving orders ...");
});

orders.post('/', (req, res) => {
  axios.post(`${API}/orders`, req.body, {httpsAgent})
    .then(order => { 
      res.status(200).send(order.data);
    })
    .catch(error => {
      res.status(500).send(error.response.data);
    });
});

orders.patch('/', (req, res) => {
  axios.patch(`${API}/cart`, req.body, {httpsAgent})
    .then(order => {
      res.status(200).json(order.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


export default orders;