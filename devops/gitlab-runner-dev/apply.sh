# deploy gitlab runner:
# helm repo add gitlab https://charts.gitlab.io/
export NAMESPACE=devops

kubectl create secret docker-registry \
  --namespace $NAMESPACE \
  --docker-username=$GITLAB_DOCKER_USERNAME \
  --docker-password=$GITLAB_DOCKER_PASSWORD \
  --docker-server=registry.gitlab.com \
  gitlab

kubectl apply --namespace $NAMESPACE -f devops/gitlab-runner/rbac.yaml
#helm init --tiller-namespace $NAMESPACE --service-account gitlab-runner --history-max 1
helm upgrade gitlab-runner-dev gitlab/gitlab-runner --install --namespace $NAMESPACE -f devops/gitlab-runner-dev/values.yaml
