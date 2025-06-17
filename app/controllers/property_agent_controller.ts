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

  public async show({ params, response }: HttpContext) {
    const { id } = params

    const agent = this.propertyAgentService.findAgentById(id)

    if (!agent) {
      return response.status(404).json({
        message: 'Agent not found',
      })
    }

    return response.json({
      data: agent,
    })
  }

  public async store({ request, response }: HttpContext) {
    const agentData = request.body()

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

  public async destroy({ params, response }: HttpContext) {
    const { id } = params

    // Check if agent exists first
    const existingAgent = this.propertyAgentService.findAgentById(id)
    if (!existingAgent) {
      return response.status(404).json({
        message: 'Agent not found',
      })
    }

    const deletedAgent = this.propertyAgentService.deleteAgent(id)

    return response.json({
      data: deletedAgent,
      message: 'Agent deleted successfully',
    })
  }
}
