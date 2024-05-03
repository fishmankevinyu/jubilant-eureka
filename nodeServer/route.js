import express from "express";
import controller from "./controller.js";

const { Router } = express;

var { generateUUId, getUserDetails, createUser, randomTone } = controller 
var router = Router();

router.get('/id', generateUUId);

router.get('/user', getUserDetails);

router.post('/user', createUser);

router.get('/tone', randomTone);

export default router;