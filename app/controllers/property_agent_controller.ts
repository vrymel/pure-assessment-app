import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { PropertyAgentService } from '#services/property_agent_service'

@inject()
export default class PropertyAgentController {
  constructor(private propertyAgentService: PropertyAgentService) { }

  public async index({ response }: HttpContext) {
    const agents = this.propertyAgentService.getAllAgents()

    return response.json({
      data: agents,
    })
  }

  public async store({ request, response }: HttpContext) {
    const agentData = request.body()
    const allAgents = await this.propertyAgentService.getAllAgents()

    let agent
    let existing = this.propertyAgentService.searchAgent(agentData.email)
    if (existing) {
      agent = this.propertyAgentService.updateAgent(existing.id, agentData)
    } else {
      agent = await this.propertyAgentService.createAgent(agentData)
    }

    return response.json({
      data: agent,
      message: existing ? 'Agent updated successfully' : 'Agent created successfully',
    })
  }
}
