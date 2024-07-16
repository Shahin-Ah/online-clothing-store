import * as express from 'express';
import https from 'https';

export const router = express.Router();
export const API = 'https://host.docker.internal:5001/api';
export const httpsAgent = new https.Agent({rejectUnauthorized: false});
import itemsRoutes from './item.routes.js';
import categoriesRoutes from './categories.routes.js'
import brandsRoutes from './brands.routes.js';
import cartItemsRoutes from './cartItems.routes.js';
import ordersRoutes from './orders.routes.js';

router.use('/products/:ctg', itemsRoutes);
router.use('/ProductCategory', categoriesRoutes);
router.use('/brands', brandsRoutes);
router.use('/cart', cartItemsRoutes);
router.use('/order', ordersRoutes);


export default router;