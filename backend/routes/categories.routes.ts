import axios from 'axios';
import { API, httpsAgent } from './index.js';
import { Router } from "express";

const categories = Router();


categories.get('/', (req, res) => {
  axios.get(`${API}/ProductCategory`, {httpsAgent})
    .then(categories => {
      res.status(200).json(categories.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
    console.log("Retrieving categories dat ...");
});
categories.get('/:searchTerm', (req, res) => {
  axios.get(`${API}/Products/${req.params.searchTerm}/filter`, {httpsAgent})
    .then(categories => {
      res.status(200).json(categories.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
    console.log("Retrieving categories dat ...");
});

export default categories;
