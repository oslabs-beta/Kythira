
import * as k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();

// Using the default credentials for kubectl
kc.loadFromDefault();
const appsV1API = kc.makeApiClient(k8s.AppsV1Api);


const removeGrafanaLogin = async function(namespace, name) {

  const res = await appsV1API.readNamespacedDeployment('prometheus-grafana', 'default')
    .then(res => {
      const deployment = res.body;
    
      let push_GF_SECURITY_ALLOW_EMBEDDING = true;
      let push_GF_AUTH_ANONYMOUS_ENABLED = true;
      let push_GF_AUTH_ANONYMOUS_ORG_ROLE = true;

      //Find which container holds our grafana image. This is where the config changes need to be made
      let grafanaContainerIndex;
      deployment.spec.template.spec.containers.forEach((container, index) => {
        if(container.image.includes('grafana')){
          grafanaContainerIndex = index;
        }
      })

      deployment.spec.template.spec.containers[grafanaContainerIndex].env.forEach(obj => {
        if (obj.name === 'GF_SECURITY_ALLOW_EMBEDDING') push_GF_SECURITY_ALLOW_EMBEDDING = false;
        if (obj.name === 'GF_AUTH_ANONYMOUS_ENABLED') push_GF_AUTH_ANONYMOUS_ENABLED = false;
        if (obj.name === 'GF_AUTH_ANONYMOUS_ORG_ROLE') push_GF_AUTH_ANONYMOUS_ORG_ROLE = false;
      });

      if (push_GF_SECURITY_ALLOW_EMBEDDING) deployment.spec.template.spec.containers[grafanaContainerIndex].env.push(
        { 
          'name': 'GF_SECURITY_ALLOW_EMBEDDING',
          'value': 'true'
        }
      );
      if (push_GF_AUTH_ANONYMOUS_ENABLED) deployment.spec.template.spec.containers[grafanaContainerIndex].env.push(
        { 
          'name': 'GF_AUTH_ANONYMOUS_ENABLED',
          'value': 'true'
        }
      );
      if (push_GF_AUTH_ANONYMOUS_ORG_ROLE) deployment.spec.template.spec.containers[grafanaContainerIndex].env.push(
        { 
          'name': 'GF_AUTH_ANONYMOUS_ORG_ROLE',
          'value': 'Admin'
        }
      );

      appsV1API.replaceNamespacedDeployment('prometheus-grafana', 'default', deployment)
        .then(res => {
          console.log('new deployment:', res.body.spec.template.spec.containers[1].env);
        });
    })

    .catch(err => {console.log(`Remove Grafana Login Error: ${err}`);
    });

};

export default removeGrafanaLogin;