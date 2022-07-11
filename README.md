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

4. Make sure you have Helm installed on your local machine

5. Add the Prometheus repo to your Helm repos using the command
  * `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`

6. Start the minikube service with the following command:
  * `minikube start`

7. To generate pods, run the following command:
  * `kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4`

8. Install the prometheus chart to your cluster with the following command:
  * `helm install prometheus prometheus-community/kube-prometheus-stack`

9. In a new terminal, run the following command to expose Prometheus:
  * `kubectl port-forward pod/prometheus-prometheus-kube-prometheus-prometheus-0 9090`

10. In a new terminal, run the following command to expose Grafana:
  * `kubectl port-forward deployment/prometheus-grafana 3000`

11. Run the following command to start the application:
  * `npm start`