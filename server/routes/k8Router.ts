import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { k8Controller }  from "../controllers/k8Controller";

const router = express.Router();

// Router to fetch the data from clusters
router.get('/pods', k8Controller.localPods, (req:Request, res:Response) => {
    return res.status(200).json(res.locals.pods);
});

export default router;