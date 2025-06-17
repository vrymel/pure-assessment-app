# Pure Assessment

This project is my solution to the PURE Property Management assessment.

## Setup

### Node version

The node version I used for this is v22.12.0

### Dependency install

This is an [adonisjs](https://adonisjs.com/) project. So to be able to run this in your machine you must install the dependencies. Run the command below to install:

```bash
npm install
```

### Create environment file

Run the following commands to initialize the `.env` file.

```
cp .env.example .env
node ace generate:key
```

## Development server

Run the development server.

```
npm run dev
```

The application is accessible via http://localhost:3333 by default.


## Routes

### API

#### Get list of property agents

`GET /api/property-agents/`

Example:

```bash
curl --location 'http://localhost:3333/api/property-agents/'
```

#### Get a property agent

`GET /api/property-agents/:id/`

Example:

```bash
curl --location 'http://localhost:3333/api/property-agents/215c082e-9943-40dc-a94b-0221fe5374d1/'
```

#### Upsert property agent

`POST /api/property-agents/`

Example:

```
curl --location 'http://localhost:3333/api/property-agents/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Vrymel",
    "lastName": "Omandam",
    "email": "vrymel@example.com",
    "mobileNumber": "+1234567890"
}'
```

#### Delete a property agent

`DELETE /api/property-agents/:id/`

Example:

```
curl --location --request DELETE 'http://localhost:3333/api/property-agents/4ad589d4-b425-4d6b-b5ec-29caf532e911/'
```

### Web

#### Vue Form for Property Agent

```
http://localhost:3333/
```

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