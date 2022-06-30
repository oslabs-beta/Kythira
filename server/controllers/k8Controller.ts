import { Request, Response, NextFunction } from 'express';
import * as k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
// Allows us to query kubernetes for App/V1 objects like deployments
const appV1Api = kc.makeApiClient(k8s.AppsV1Api);
// Allows us to query kubernetes for core objects like pods and services
const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);

import {Pool} from 'pg';
console.log("Environment Variable", process.env.NODE_ENV)
let PG_URI = '';

if(process.env.NODE_ENV === "test"){
  PG_URI = 'postgres://vwfofczb:Jy7dhkeZsVCm5HhzcWJaF1DkCGRBALB4@queenie.db.elephantsql.com/vwfofczb';
  console.log("NOW WE ARE IN THE TEST ENVIRONMENT");
}else PG_URI =  'postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq';

export const pool = new Pool({
  connectionString: PG_URI,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit : 0
});

const deploymentTable = `CREATE TABLE IF NOT EXISTS "deployment"(
  _id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  pw VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL
  );`;
pool.query(deploymentTable);
console.log("Deployment Table is created!");

interface Pod {
  namespace: string,
  podName: string,
  createdAt: Date,
  status: string,
  nodeName: string,
  containers: object[]
}

// interface Service {
//   name: string,
//   ports: number[],
//   selector: string
// }

// interface Controller {
//   name: string,
//   kind: string,
//   isManaging: boolean
// }

// interface Deployment {
//   name: string,
//   replicas: number,
//   kind: string,
//   status: string,
//   namespace: string,
//   createdAt: Date,
//   labels: Map<string,string>,
//   references: Controller[]
// }

export const k8Controller = {
  localNamespaces : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
    console.log('Fetching local namespaces');    
    try {
      // console.log('Entered try block')
      const namespaceArr:string[] = [];
      await coreV1Api.listNamespace().then((APIres: any) => {
        // console.log('res.body.items index 0: ', APIres.body.items[0]);
        APIres.body.items.forEach((item:any) => {
          namespaceArr.push(item.metadata.name);
        })
      });
      res.locals.namespaces = namespaceArr;
      return next();
      
      // console.log(res.locals.namespaces);
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
      await coreV1Api.listNamespacedPod(namespace).then((APIres:any) => {
        for (let i = 0; i < APIres.body.items.length; i++) {
          pods.push({ 
            namespace: APIres.body.items[i].metadata.namespace, 
            podName: APIres.body.items[i].metadata.name, 
            createdAt: APIres.body.items[i].metadata.creationTimestamp, 
            status: APIres.body.items[i].status.containerStatuses[0].state.running ? 'Running': APIres.body.items[i].status.containerStatuses[0].state.waiting.reason, 
            nodeName: APIres.body.items[i].spec.nodeName, 
            containers: []
          });
          // Populating container array with list of containers
          for (let j = 0; j < APIres.body.items[i].spec.containers.length; j++) {
            pods[i].containers.push({
              name: APIres.body.items[i].spec.containers[j].name,
              image: APIres.body.items[i].spec.containers[j].image,
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
///dasfjsaiodfjioasfdj
  // localDeployments : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
  //   try {
  //     const deployments: any[] = [];
  //     await appV1Api.listNamespacedDeployment('default').then((APIres:any) => {
  //       for (let i = 0; i < APIres.body.items.length; i++) {
  //         deployments.push({
  //           name: APIres.body.items[i].metadata.name,
  //           replicas: APIres.body.items[i].spec.replicas,
  //           kind: APIres.body.items[i].kind,
  //           status: APIres.body.items[i].status.conditions[0].status,
  //           namespace: APIres.body.items[i].metadata.namespace,
  //           createdAt: APIres.body.items[i].metadata.creationTimestamp,
  //           labels: new Map(),
  //           references: []
  //         });
  //         for (const labelTag in APIres.body.items[i].metadata.labels) {
  //           deployments[i].labels.set(labelTag,APIres.body.items[i].metadata.labels[labelTag]);
  //         }
  //         for (let j = 0; j < APIres.body.items[i].metadata.ownerReferences.length; i++) {
  //           deployments[i].references.push(APIres.body.items[i].metadata.ownerReferences[j]);
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
  },

//   deleteLocalDeployment : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
//     try{
//       const { name, namespace } = req.body;
//       const deletedDeployment = await appV1Api.deleteNamespacedDeployment(name, namespace); //deleteCollectionNamespacedDeployment
//       res.locals.deploymentDeleted = true;
//       return next();
//     }catch(err) {
//       return next({
//         log: `Error in k8Controller.deleteLocalDeployment: ${err}`,
//         message: { err: 'An error in k8Controller.deleteLocalDeployment occurred.'}
//       });
//   }
// }


};
