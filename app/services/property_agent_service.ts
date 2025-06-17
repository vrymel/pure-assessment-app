import { PropertyAgent } from '../entities/property_agent.js'

export class PropertyAgentService {
  private agents: PropertyAgent[] = []

  constructor() {
    this.agents = [
      {
        id: 1,
        firstName: 'Vrymel',
        lastName: 'Omandam',
        email: 'vrymel@example.com',
        mobileNumber: '+1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  }

  getAllAgents() {
    return this.agents
  }
}