# K3s Local Image Deployment

This setup is intended for testing on a K3s cluster without Docker Hub, GitHub
Container Registry, or a private registry.

## Build and Export

Build the image on a machine with Docker:

```bash
docker build -t gregflix-client:test .
docker save gregflix-client:test -o gregflix-client-test.tar
```

Copy the image archive to the K3s node:

```bash
scp gregflix-client-test.tar user@k3-node:/tmp/
```

## Import on the K3s Node

Run this on the K3s node:

```bash
sudo k3s ctr images import /tmp/gregflix-client-test.tar
sudo k3s ctr images list | grep gregflix-client
```

The deployment uses:

```yaml
image: gregflix-client:test
imagePullPolicy: Never
```

That means Kubernetes will only use the image already present on the node.

## Deploy

From a machine with `kubectl` access to the cluster:

```bash
kubectl apply -k k8s/
kubectl -n gregflix get pods
kubectl -n gregflix get svc
kubectl -n gregflix get ingress
```

## Access

The included ingress uses `gregflix.local` and assumes K3s Traefik is enabled.
Point `gregflix.local` at your K3s node IP through DNS or a hosts file entry.

For a quick test without DNS:

```bash
kubectl -n gregflix port-forward svc/gregflix-client 3000:80
```

Then open:

```text
http://localhost:3000
```
