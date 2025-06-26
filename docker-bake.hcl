# Populated from GitHub Action
variable "REPO" {
  default = ""
}

group "default" {
  targets = [
    "portal-public-api-docs",
  ]
}

# Populated from GitHub Action
target "docker-metadata-action" {
  tags = []
}

target "bootstrap" {
  platforms = [ "linux/amd64" ]
  no-cache = true
}

target "portal-public-api-docs" {
  inherits = ["bootstrap", "docker-metadata-action"]
  tags = [for tag in target.docker-metadata-action.tags : tag]
  dockerfile = "Dockerfile"
}
