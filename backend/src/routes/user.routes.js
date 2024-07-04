import { Router } from 'express';
import {    postUser, 
            postUserlogin, 
            putUser, 
            deleteUser, 
            putDeleteUser, 
            ensuretoken, 
            getCurrentUser, 
            protectedLogin,
            getEditUser
        } from '../controllers/user.controller.js';

const router = Router();

router.post('/postUser', postUser);
router.post('/login', postUserlogin);

router.get ("/protected",  protectedLogin)
router.get ("/home", ensuretoken, getCurrentUser)
router.get ('/getEditUser/:id', getEditUser)

router.put('/putUser/:id', putUser);
router.put('/putDeleteUser/:id', putDeleteUser);

router.delete('/deleteUser/:id', deleteUser);

export default router;