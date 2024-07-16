import * as qs from 'qs';
import axios from 'axios'
import { API, httpsAgent } from './index.js';
import { Router } from "express";


const items = Router({mergeParams: true});
const addHeaders = (req) => ({'authorization': req.headers['authorization']});
const Axios = axios.create({
  paramsSerializer: {serialize: params => qs.stringify(params, {arrayFormat: 'repeat'})}});
  Axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log('axios', error?.response?.statusText);
    const errorMessage = error?.response?.statusText;
    let errorObj = {title: ""};
    if(errorMessage === 'Unauthorized' || errorMessage === 'Forbidden')
      return Promise.reject(errorObj = {title: errorMessage});
  });
  items.get('/', (req, res) => {
  Axios.get(`${API}/products/${req.params['ctg']}`,
             {params: {...req.query},
             httpsAgent, headers: addHeaders(req)})
      .then(item => {
        res.set({
          'Pagination': item.headers.pagination,
          'Content-Type': item.headers['content-type'],
          'Content-Length': item.headers['content-length']
        });
        res.status(200).json(item.data);
      })
      .catch(error => {
        res.status(500).send(error.response.data);
      });
      console.log("Retrieving products data ...");
  });

  items.get('/popular', (req, res) => {
    //const {params: {ctg}} = req;
    Axios.get(`${API}/products/${req.params['ctg']}/popular`, {httpsAgent})
      .then(popularProducts => {
        console.log(popularProducts.data);
        res.status(200).json(popularProducts.data);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });

  items.get('/:productId', (req, res) => {
    const {params: {productId}} = req;

    Axios.get(`${API}/products/${req.params.productId}`,
                  {httpsAgent, headers: addHeaders(req)})
      .then(product => {
        res.status(200).json(product.data);
      })
      .catch(error => {
        console.log('get-id', error);
        res.status(500).send(error);
      });
  });

  items.put('/:productId', (req, res) => {
    const {params: {productId}} = req;
    Axios.put(`${API}/items/${req.params.productId}`)
      .then(product => {
        res.status(200).json(product.data);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });



export default items;
