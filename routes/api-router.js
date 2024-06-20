import express from 'express';
import validateJwtToken from '../middlewares/jwt-auth-middleware.js'
import * as UserController from '../controllers/user-controller.js'
import * as ProductController from '../controllers/product-controller.js';


const router = express.Router();

router.post('/register', UserController.createUser);
router.post('/login', UserController.authenticateUser);
router.get('/profile', validateJwtToken, UserController.getUserInfo);
router.post('/products', validateJwtToken, ProductController.createProduct);
router.get('/products', ProductController.getAllProducts)

export default router;
