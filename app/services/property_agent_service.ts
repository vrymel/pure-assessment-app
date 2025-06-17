import { v4 as uuidv4 } from 'uuid'
import { PropertyAgent } from '../entities/property_agent.js'

export class PropertyAgentService {
  private agents: PropertyAgent[] = []

  constructor() {
    this.agents = []
  }

  getAllAgents() {
    return this.agents
  }

  searchAgent(email: string) : PropertyAgent | null {
    return this.agents.find(agent => {
      return agent.email.toLowerCase() === email.toLowerCase()
    })
  }

  createAgent(agentData: Partial<PropertyAgent>) {
    const newAgent: PropertyAgent = {
      id: uuidv4(),
      firstName: agentData.firstName || '',
      lastName: agentData.lastName || '',
      email: agentData.email || '',
      mobileNumber: agentData.mobileNumber || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.agents.push(newAgent)

    return newAgent
  }

  updateAgent(id: string, updatedData: Partial<PropertyAgent>) {
    const agentIndex = this.agents.findIndex(agent => agent.id === id)
    if (agentIndex === -1) {
      throw new Error('Agent not found')
    }

    const updatedAgent = { ...this.agents[agentIndex], ...updatedData, updatedAt: new Date() }
    this.agents[agentIndex] = updatedAgent

    return updatedAgent
  }
}