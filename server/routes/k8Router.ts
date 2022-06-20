import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { k8Controller }  from "../controllers/k8Controller";

const router = express.Router();

// Router to fetch the data from clusters
router.get('/pods', k8Controller.localPods, (req:Request, res:Response) => {
    return res.status(200).json(res.locals.pods);
});

router.get('/deployments', k8Controller.localDeployments, (req:Request, res:Response) => {
  return res.status(200).json(res.locals.deployments);
});

router.get('/services', k8Controller.localServices, (req:Request, res:Response) => {
  return res.status(200).json(res.locals.services);
});

// router.post('/deployment', k8Controller.localPods, (req:Request, res:Response) => {
//   return res.status(200).json(res.locals.deploymentCreated);
// });

export default router;