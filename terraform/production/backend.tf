terraform {

  cloud {
    organization = "insightpulse-org"

    workspaces {
      name = "insightpulse-production"
    }
  }
}
