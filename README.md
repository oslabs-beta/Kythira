# Kythira

# Quick Start
If you do not have a Kubernetes cluster up and running, use Minikube to quickly set one up. The instructions are laid out below.

# Mac
1. Make sure you have Docker installed on your local machine. https://www.docker.com/products/docker-desktop/

2. Once Docker is installed and running, run the following command:
  * `brew install minikube`
  * Note: it may take a while to fully install. Please be patient.

3. Confirm that minikube is successfully installed by running the following command: 
  * `which minikube`

4. Start the minikube service with the following command:
  * `minikube start`

5. Make sure you have kubectl installed to add deployments (should we add this as a stretch feature if we're trying to abstract the command line away from the user?):
  * `brew install kubectl` 
7. To generate pods, run the following commands:
  * `kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4`
  * `kubectl expose deployment hello-minikube --type=NodePort --port=9090`

8. This will create a deployment that will genereate a pod with the provided image. Exposing the deployment simply means we are able to access the port. 


ONLY NEED TO DO THE BELOW ONCE

globally install helm

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

DO THIS EVERY TIME

minikube start

helm install prometheus prometheus-community/kube-prometheus-stack

(Both port forwarding commands will need independent terminals)

kubectl port-forward pod/prometheus-prometheus-kube-prometheus-prometheus-0 9090

kubectl port-forward deployment/prometheus-grafana 3000

npm start

Grafana login is:
admin
prom-operator

Figure out how to have the grafana defaults.ini deployed to the helm chart
or figure out how to have the iframe's cookies work