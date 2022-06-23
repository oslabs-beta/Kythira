import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
// Allows us to query kubernetes for App/V1 objects like deployments
const appV1Api = kc.makeApiClient(k8s.AppsV1Api);
// Allows us to query kubernetes for core objects like pods and services
const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

interface Pod {
  namespace: string,
  podName: string,
  createdAt: Date,
  status: string,
  nodeName: string,
  containers: object[]
}

interface Service {
  name: string,
  ports: number[],
  selector: string
}

interface Controller {
  name: string,
  kind: string,
  isManaging: boolean
}

interface Deployment {
  name: string,
  replicas: number,
  kind: string,
  status: string,
  namespace: string,
  createdAt: Date,
  labels: Map<string,string>,
  references: Controller[]
}

export const k8Controller = {
  localNamespaces : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
    try {
      const namespaceArr:string[] = [];
      await coreV1Api.listNamespace().then((res:any) => {
        res.body.items.forEach((item:any) => {
          namespaceArr.push(item.metadata.name);
        })
      });
      res.locals.namespaces = namespaceArr;
      console.log(res.locals.namespaces);
      return next();
    }
    catch (err) {
      return next({
        log: `Error in k8Controller.localNamespaces: ${err}`,
        message: { err: 'An error in k8Controller.localNamespaces occurred.'}
      });
    }
  },

  localPods : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
    try {
      const pods : Pod[] = [];
      // Asynchronously gets all pod data in defined namespace, stored in res.body.items as an array (each element is a single pod)
      const { namespace } = req.body;
      await coreV1Api.listNamespacedPod(namespace).then((res:any) => {
        for (let i = 0; i < res.body.items.length; i++) {
          pods.push({ 
            namespace: res.body.items[i].metadata.namespace, 
            podName: res.body.items[i].metadata.name, 
            createdAt: res.body.items[i].metadata.creationTimestamp, 
            status: res.body.items[i].status.containerStatuses[0].state.running ? 'Running': res.body.items[i].status.containerStatuses[0].state.waiting.reason, 
            nodeName: res.body.items[i].spec.nodeName, 
            containers: []
          });
          // Populating container array with list of containers
          for (let j = 0; j < res.body.items[i].spec.containers.length; j++) {
            pods[i].containers.push({
              name: res.body.items[i].spec.containers[j].name,
              image: res.body.items[i].spec.containers[j].image,
            });
          }
        }
      });
      res.locals.pods = pods;
      return next();
    } 
    catch(err){
      return next({
        log: `Error in k8Controller.localPods: ${err}`,
        message: { err: 'An error in k8Controller.localPods occurred.'}
      });
    }
  },

  // localServices : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
  //   try {
  //     const services : Service[] = [];
  //     await coreV1Api.listNamespacedService('default').then((res:any) => {
  //       for (let i = 0; i < res.body.items.length; i++) {
  //         services.push({
  //           name: res.body.items[i].metadata.name,
  //           ports: [],
  //           selector: res.body.items[i].spec.selector || undefined,
  //         });
  //         for (let j = 0; j < res.body.items[i].spec.ports.length; i++) {
  //           services[i].ports.push(res.body.items[i].spec.ports[j].port);
  //         }
  //       }
  //     });
  //     res.locals.services = services;
  //     return next();
  //   }
  //   catch (err) {
  //     return next({
  //       log: `Error in k8Controller.localServices: ${err}`,
  //       message: { err: 'An error in k8Controller.localServices occurred.'}
  //     });
  //   }
  // },

  // localDeployments : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
  //   try {
  //     const deployments: Deployment[] = [];
  //     await appV1Api.listNamespacedDeployment('default').then((res:any) => {
  //       for (let i = 0; i < res.body.items.length; i++) {
  //         deployments.push({
  //           name: res.body.items[i].metadata.name,
  //           replicas: res.body.items[i].spec.replicas,
  //           kind: res.body.items[i].kind,
  //           status: res.body.items[i].status.conditions[0].status,
  //           namespace: res.body.items[i].metadata.namespace,
  //           createdAt: res.body.items[i].metadata.creationTimestamp,
  //           labels: new Map(),
  //           references: []
  //         });
  //         for (const labelTag in res.body.items[i].metadata.labels) {
  //           deployments[i].labels.set(labelTag,res.body.items[i].metadata.labels[labelTag]);
  //         }
  //         for (let j = 0; j < res.body.items[i].metadata.ownerReferences.length; i++) {
  //           deployments[i].references.push(res.body.items[i].metadata.ownerReferences[j]);
  //         }
  //       }
  //     });
  //     res.locals.deployments = deployments;
  //     return next();
  //   }
  //   catch (err) {
  //     return next({
  //       log: `Error in k8Controller.localDeployments: ${err}`,
  //       message: { err: 'An error in k8Controller.localServices occurred.'}
  //     });
  //   }
  // },

  newLocalDeployment : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
    try {
      // name: string
      // ????? kind: string?
      // selectorLabels: obj/map (key-value pair)
      // replicas: number
      // metadataLabels: obj/map
      // containers: array of container objects { name: string, image: string }
      const { name, selectorLabels, replicas, metadataLabels, containers } = req.body;

      // Constructing deployment object
      const newDeployment = {
        metadata: {
          name: name
        },
        spec: {
          selector: {
            matchLabels: selectorLabels
          },
          replicas: replicas,
          template: {
            metadata: {
              labels: metadataLabels
            },
            spec: {
              containers: containers
            }
          }
        }
      };

      // API call

      await appV1Api.createNamespacedDeployment('default', newDeployment).then((res:any) => {
        console.log(`Deployment ${newDeployment.metadata.name} successfully created`);
      });      
      res.locals.deploymentCreated = true;
      return next();
    }
    catch(err) {
      return next({
        log: `Error in k8Controller.newLocalDeployment: ${err}`,
        message: { err: 'An error in k8Controller.newLocalDeployment occurred.'}
      });
    }
  }


};
