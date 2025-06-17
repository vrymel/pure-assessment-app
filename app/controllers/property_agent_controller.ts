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
    if (allAgents.length === 0) {
      agent = await this.propertyAgentService.createAgent(agentData)
    } else {
      const existingAgent = allAgents[0]
      agent = await this.propertyAgentService.updateAgent(existingAgent.id, agentData)
    }

    return response.json({
      data: this.propertyAgentService.getAllAgents(),
      message: allAgents.length === 0 ? 'Agent created successfully' : 'Agent updated successfully'
    })
  }
}
