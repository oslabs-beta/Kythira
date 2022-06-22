import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { k8Controller }  from "../controllers/k8Controller";

const router = express.Router();

interface D3Response {
  name?: string,
  children?: D3Response[]
}

router.get('/namespaces',k8Controller.localNamespaces, (req:Request,res:Response) => {
  // First 4 namespaces are always (in order): 
  // 1. 'default': self explanatory
  // 2. 'kube-node-lease': holds Lease objects (every time a Node status updates, Lease objects are generated - could be useful for monitoring)
  // 3. 'kube-public': contains configMap that is readable by all users (does not require authentication)
  // 4. 'kube-system': we literally will never need this. Contains system resources for Kubernetes' operations
  return res.status(200).json(res.locals.namespaces);
});

// Router to fetch the data from clusters
router.get('/pods', k8Controller.localPods, (req:Request, res:Response) => {
  const response:any = {};
  for (let i = 0; i < res.locals.pods.length; i++) {
    // Current pods' information destructured
    const { namespace, podName, containers, nodeName } = res.locals.pods[i];

    // Namespace level - (first-time initialization of top-level structure for each namespace)
    if (!response[namespace]) {  
      response[namespace] = {
        name: `Namespace: ${namespace}`,
        children: []
      } as D3Response;
    }
    // Node level - (adding node to given namespace)
    let nodeFound = false;
    // Checking if node object is already present in response
    response[namespace].children.forEach((node: { name: string; children: []; }) => {
      if (node.name === `Node: ${nodeName}`) {
        nodeFound = true;
      } 
    });
    // Case if response[namespace].children array is empty or does not contain node
    if (!nodeFound) {
      response[namespace].children.push({
        name: `Node: ${nodeName}`,
        children: []
      } as D3Response);
    }
    
    // Pod level - (adding pod to given node)
    response[namespace].children.forEach((node: { name: string; children: D3Response[]; }) => {
      if (node.name === `Node: ${nodeName}`) {
        // Container level - (adding container(s) to given pod)
        node.children.push({
          name: `Pod: ${podName}`,
          children: containers
        } as D3Response);
      }
    });
  } 
  res.locals.clusters = response;
  return res.status(200).json(res.locals.clusters);
});

router.get('/deployments', k8Controller.localDeployments, (req:Request, res:Response) => {
  return res.status(200).json(res.locals.deployments);
});

router.get('/services', k8Controller.localServices, (req:Request, res:Response) => {
  return res.status(200).json(res.locals.services);
});

router.post('/newDeployment', k8Controller.newLocalDeployment, (req:Request, res:Response) => {
  return res.status(200).json(res.locals.deploymentCreated);
});

export default router;