/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PropertyAgentController = () => import('#controllers/property_agent_controller')

router.group(() => {
  router.post('/property-agents', [PropertyAgentController, 'store'])
  router.get('/property-agents', [PropertyAgentController, 'index'])
}).prefix('/api')
