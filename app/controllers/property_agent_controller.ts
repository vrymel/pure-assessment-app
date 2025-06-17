import type { HttpContext } from '@adonisjs/core/http'

export default class PropertyAgentController {
  public async index({ response }: HttpContext) {
    return response.json({
      data: [
        {
          id: 1,
          name: 'Vrymel Omandam',
          email: 'vrymel@example.com',
        },
      ]
    })
  }
}
