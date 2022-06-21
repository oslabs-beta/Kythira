import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { k8Controller }  from "../controllers/k8Controller";

const router = express.Router();



// Router to fetch the data from clusters
router.get('/pods', k8Controller.localPods, (req:Request, res:Response) => {
  const response = {};
  for (let i = 0; i < res.locals.pods.length; i++) {
    const { namespace, podName, createdAt, status, containers, nodeName } = res.locals.pods[i];
    // Namespace level - (first-time initialization of top-level structure for each namespace)
    if (!response[namespace]) {
      response[namespace] = {
        type: 'namespace',
        name: namespace,
        children: []
      };
    }
    // Node level - (adding node to given namespace)
    response[namespace].children.push({
      type: 'node',
      name: nodeName,
      children: []
    });
    // Pod level - (adding pod to given node)
    response[namespace].children.children.push({
      type: 'pod',
      name: podName,
      children: []
    });
    // Container level - (adding container(s) to given pod)
    containers.forEach(container => {
      container.type = 'container';
      response[namespace].children.children.push(container)
    });
  } 
  console.log('Response: -------------------------- \n',response);
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