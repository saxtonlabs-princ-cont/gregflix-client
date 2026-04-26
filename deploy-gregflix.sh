#!/usr/bin/env bash
set -euo pipefail

# ---- GregFlix local K3s deployment script ----
#
# Assumptions:
# - You are running this from the root of the Next.js project.
# - Docker is installed and usable with sudo.
# - kubectl is installed and usable with sudo.
# - registry.home.arpa already points to your K3s node.
# - K3s/containerd is configured to pull from registry.home.arpa over HTTP.
# - Your Kubernetes Deployment is already using:
#     image: registry.home.arpa/gregflix/gregflix-client:<tag>
#     imagePullPolicy: Always
#
# Usage:
#   ./deploy-gregflix.sh
#   ./deploy-gregflix.sh dev
#   ./deploy-gregflix.sh 0.1.0

APP_NAME="gregflix-client"
NAMESPACE="gregflix"
DEPLOYMENT_NAME="gregflix-client"
REGISTRY_HOST="registry.home.arpa"
IMAGE_REPO="${REGISTRY_HOST}/gregflix/${APP_NAME}"

TAG="${1:-dev}"
IMAGE="${IMAGE_REPO}:${TAG}"

echo "Deploying GregFlix"
echo "Image:      ${IMAGE}"
echo "Namespace:  ${NAMESPACE}"
echo "Deployment: ${DEPLOYMENT_NAME}"
echo

echo "Checking required commands..."
command -v docker >/dev/null 2>&1 || {
  echo "ERROR: docker is not installed or not in PATH."
  exit 1
}

command -v kubectl >/dev/null 2>&1 || {
  echo "ERROR: kubectl is not installed or not in PATH."
  exit 1
}

echo "Checking Docker daemon..."
sudo docker info >/dev/null

echo "Checking Kubernetes access..."
sudo kubectl get namespace "${NAMESPACE}" >/dev/null

echo "Building Docker image..."
sudo docker build -t "${IMAGE}" .

echo "Pushing Docker image to local registry..."
sudo docker push "${IMAGE}"

echo "Updating Kubernetes Deployment image..."
sudo kubectl -n "${NAMESPACE}" set image \
  "deployment/${DEPLOYMENT_NAME}" \
  "${APP_NAME}=${IMAGE}"

echo "Waiting for rollout..."
sudo kubectl -n "${NAMESPACE}" rollout status "deployment/${DEPLOYMENT_NAME}"

echo
echo "Current pods:"
sudo kubectl -n "${NAMESPACE}" get pods -o wide

echo
echo "Current service:"
sudo kubectl -n "${NAMESPACE}" get svc

echo
echo "Current ingress:"
sudo kubectl -n "${NAMESPACE}" get ingress

echo
echo "Testing GregFlix through ingress..."
if curl -fsS "http://gregflix.home.arpa/" >/dev/null; then
  echo "SUCCESS: GregFlix is reachable at http://gregflix.home.arpa/"
else
  echo "WARNING: Deployment succeeded, but curl to http://gregflix.home.arpa/ failed."
  echo "Check DNS, Traefik, ingress, and service routing."
fi