import type { ApplicationService } from '@adonisjs/core/types'
import { PropertyAgentService } from '#services/property_agent_service'

export default class PropertyAgentProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(PropertyAgentService, () => {
      return new PropertyAgentService()
    })
  }
}