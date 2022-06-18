import { Request, Response, NextFunction } from 'express';
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
// Allows us to query kubernetes for App/V1 objects like pods and deployments
// const appV1Api = kc.makeApiClient(k8s.AppsV1Api);
// Allows us to query kubernetes for core objects like services
const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

interface podObject {
  clusterName: string,
  podName: string,
  createdAt: Date,
  namespace: string,
  status: string,
  nodeName: string,
  containers: object[]
};

interface serviceObject {
  name: string,
  ports: number[],
  selector: string
};
export const k8Controller = {
  localPods : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
    console.log('Getting pods...');
    try {
      const pods : podObject[] = [];    
      // Asynchronously gets all pod data in default namespace, stored in res.body.items as an array (each element is a single pod)
      await coreV1Api.listNamespacedPod('default').then((res) => {
        console.log('Pods found.');
        for (let i = 0; i < res.body.items.length; i++) {
          pods.push({ 
            clusterName: res.body.items[i].metadata.clusterName, 
            podName: res.body.items[i].metadata.name, 
            createdAt: res.body.items[i].metadata.creationTimestamp, 
            namespace: res.body.items[i].metadata.namespace, 
            status: res.body.items[i].status.containerStatuses[0].state.running ? 'Running': res.body.items[i].status.containerStatuses[0].state.waiting.reason, 
            nodeName: res.body.items[i].spec.nodeName, 
            containers: []
          });
          console.log("Pods ==> ", pods);
          // Populating container array with list of containers
          for (let j = 0; j < res.body.items[i].spec.containers.length; j++) {
            pods[i].containers.push({
              name: res.body.items[i].spec.containers[j].name,
              image: res.body.items[i].spec.containers[j].image,
            });
          }
        }
      });
      console.log('Pods: \n', pods);
      res.locals.pods = pods;
      return next();
    } 
    catch(err){
      return next({
        log: `Error in k8Controller.localPods: ${err}`,
        message: { err: 'An error in k8Controller.localPods'}
    })
    }
  },

  localServices : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
    try {
      const services : serviceObject[] = [];
      await coreV1Api.listNameSpacedService('default').then((res) => {
        for (let i = 0; i < res.body.items.length; i++) {
          services.push({
            name: res.body.items[i].metadata.name,
            ports: [],
            selector: res.body.items[i].spec.selector || undefined,
          });
          for (let j = 0; j < res.body.items[i].spec.ports.length; i++) {
            services[i].ports.push(res.body.items[i].spec.ports[j].port);
          }
        }
      });
      res.locals.services = services;
      return next();
    }
    catch(err){
      return next({
        log: `Error in k8Controller.localServices: ${err}`,
        message: { err: 'An error in k8Controller.localServices'}
      });
    }
  }
};
