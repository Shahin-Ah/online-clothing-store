import axios from 'axios';
import { API, httpsAgent } from './index.js';
import { Router } from "express";

const cartItems = Router();


cartItems.get('/', (req, res) => {
  axios.get(`${API}/cart`, {httpsAgent})
    .then(cartItems => {
      res.status(200).json(cartItems.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
    console.log("Retrieving cart items ...");
});

cartItems.post('/', (req, res) => {
  axios.post(`${API}/cart`, req.body, {httpsAgent})
    .then(product => {
      res.status(200).json(product.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

cartItems.patch('/', (req, res) => {
  axios.patch(`${API}/cart`, req.body, {httpsAgent})
    .then(product => {
      res.status(200).json(product.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

cartItems.delete('/:id', (req, res) => {
  const {params: {id}} = req;
  axios.delete(`${API}/cart/${req.params.id}`, {httpsAgent})
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


export default cartItems;