# Pure Assessment

This project is my solution to the PURE Property Management assessment.

## Setup

This is an [adonisjs](https://adonisjs.com/) project. So to be able to run this in your machine you must install the dependencies. Run the command below to install:

```bash
npm install
```

### Node version

The node version I used for this is v22.12.0

## Development server

Run the development server.

```
npm run dev
```

The application is accessible via http://localhost:3333 by default.


## Routes

### API

Get list of property agents - `GET /api/property-agents/`

```bash
curl --location 'http://localhost:3333/api/property-agents/'
```

Get a property agent - `GET /api/property-agents/:id/`

```bash
curl --location 'http://localhost:3333/api/property-agents/215c082e-9943-40dc-a94b-0221fe5374d1/'
```

Upsert property agent - `POST /api/property-agents/`

Delete a property agent - `DELETE /api/property-agents/:id/`


## Relevant files

### Controller

The controller used to perform the Property Agent CRUD.

```
app/controllers/property_agent_controller.ts
```

### Entity

The type definition for the Property Agent.

```
app/entities/property_agent.ts
```

### Service

The service class definition to manage the storage of Property Agents in memory.

```
app/services/property_agent_service.ts
```

### Provider

To make the PropertyAgentService as a singleton, we must register it in the container by creating a corresponding provider, PropertyAgentProvider.

```
app/providers/property_agent_provider.ts
```

### Router

Route register to be able to access `/api/property-agents/` routes.

```
start/routes.ts
```

### Vue Form

Display the form for the Property Agent via InertiaJS.

```
inertia/pages/home.vue
```