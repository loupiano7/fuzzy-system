# fuzzy-system
REPO

## Google GKE workflow configuration

The workflow at `.github/workflows/google.yml` expects the following repository variables:

- `GCP_PROJECT_ID`
- `GAR_LOCATION`
- `GKE_CLUSTER`
- `GKE_LOCATION`
- `GKE_DEPLOYMENT_NAME`
- `GAR_REPOSITORY`
- `IMAGE_NAME`
- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`
- `KUSTOMIZE_PATH` (optional, defaults to `.`)
- `KUBERNETES_NAMESPACE` (optional; if omitted, workflow auto-detects the deployment namespace when unambiguous)
- `KUSTOMIZE_IMAGE` (optional, defaults to `IMAGE_NAME`; set this to the existing image reference Kustomize should replace)

Required repository contents for deployment:

- A `Dockerfile` in the repository root
- Kubernetes manifests managed by Kustomize in `KUSTOMIZE_PATH` (with `kustomization.yaml` or `kustomization.yml`)
