import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PropertyAgentService } from '#services/property_agent_service'

@inject()
export default class PropertyAgentController {
  constructor(private propertyAgentService: PropertyAgentService) {}

  public async index({ response }: HttpContext) {
    const agents = this.propertyAgentService.getAllAgents()

    return response.json({
      data: agents,
    })
  }
}
