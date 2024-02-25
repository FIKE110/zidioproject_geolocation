import express from "express";
import getIpController from "../controller/getIpController.js";
import getLocationFromDbController from "../controller/dashboardController.js"

const IPRouter=express.Router()
IPRouter.get("/ip/getlochistory",getLocationFromDbController)
IPRouter.get("/ip/:ip",getIpController)

export default IPRouter