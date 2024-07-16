import axios from 'axios';
import { API, httpsAgent } from './index.js';
import { Router } from "express";

const brands = Router();


brands.get('/', (req, res) => {
  axios.get(`${API}/brands`, {httpsAgent})
    .then(brands => {
      res.status(200).json(brands.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
    console.log("Retrieving brands dat ...");
});


export default brands;
