Aloompa GraphQL API take home challenge

First of all thank you for giving me a chance to prove my coding skills. I hope you find this readme easy to use.

I have included the queries / mutations for each bullet point.
1. Project was done in Typescript it is recommended to install ts-node to compile the project
2. Type "yarn" or "npm install" to install all the packages
3. Starting the project is done by doing "npm run start" or "yarn start"
4. Follow the link it will take you to **http://localhost:4000/** and ask you to query your graphql server
5. Have fun, plug in the queriers / mutations below

Queries that have parameters just replace with whatever data you need to activate the query

Under resolvers/index.ts - this file holds and runs all of the querieres and mutations
The other files in the folder are broken down files to show off the use of context.
I tried to use the broken down files in addition with a schema file but ran into errors. 

API Requirements: <br/>
● You should be able to list all of the apps [X] <br/>
query getAllApps { <br/>
  apps { <br/>
    id<br/>
    name<br/>
  }<br/>
}<br/>

● You should be able to query a single app [X]
query {
  singleApp(id: "b810bf6d-d81d-4104-bc1a-3b21d5154076") {
    id
    name
  }
}

● You should be able to list all the stages [X]
query getAllStages {
  stages {
    id
    name
  }
}

● You should be able to query a single stage [X]
query {
  singleStage(id: "a4087686-ee6c-49d8-a4f0-d67f5931df3a") {
    id
    name
  }
}

● You should be able to search the stages by name [X]
query {
  searchByStageName(name: "Tizzle Stage") {
    id
    name
  }
}

● You should be able to list all of the events [X]
query getAllEvents {
  events {
    appId
    stageId
    name
    description
    image
    startsAt
    endsAt
  }
}

● You should be able to query a single event [X]
query {
  singleEvent(id: "b4781407-da92-475e-8d87-596aee0d7f2d") {
    id
    appId
    stageId
    name
    description
    image
    startAt
    endsAt
  }
}

● You should be able to search the events by name [X]
query {
  searchByEventName(name: "Kanye West") {
    id
    appId
    stageId
    name
    description
    image
    startsAt
    endsAt
  }
}

● You should be able to query the events that occur between two dates [X]
query {
  allEventsBetweenDates(startsAt: "1577916000", endsAt: "1577919600") {
    name
    startsAt
    endsAt
  }
}

● You should be able to list all of the events in an app [X]
query {
  allEventsInApp(id: "b810bf6d-d81d-4104-bc1a-3b21d5154076") {
    id
    appId
    stageId
    name
    description
    image
    startsAt
    endsAt
  }
}

● You should be able to list all the stages in an app
Parameter is the app ID
This will take the app ID, go into each event, filter based on the event.appId and the args.id
Then it will loop through the stages and loop through the filteredEvents and push any stage that matches
the stage.id and event.stageId into a Set. Using a set to prevent duplicates showing up.
query {
  allStagesInApp(id: "b810bf6d-d81d-4104-bc1a-3b21d5154076") {
    id
    name
  }
}

● You should be able to get the stage in an event [X]
Parameter is the event id
query {
  stageInAnEvent(id: "d4cec773-c287-4efe-aca5-4274accb6656") {
    id
    name
  }
}

● You should be able to list the events at a stage [X]
Parameter is the stage id
query {
  eventsUsingSameStage(id: "89be560f-6905-471a-8096-102e29a84e77") {
    id
    name
    description
    image
    startsAt
    endsAt
  }
}
● You should be able to add, update and remove all entities [X]

Mutations will be similar for all entities.
Removing an app, stage or event will return true

**Apps**
- Add app
mutation {
  addApp (name: "Telegraph Stage"){
    id
    name
  }
}

- Update app
mutation {
  updateApp(id: "b810bf6d-d81d-4104-bc1a-3b21d5154076", name: "Updated app"){
    id
    name
  }
}

- Delete app
mutation {
  removeApp (id: "8a01d003-0821-4756-baaa-f19d62092cbb")
}

**Stages**
- Add Stage
mutation {
  addStage (name: "Telegraph Stage"){
    id
    name
  }
}

- Update Stage
mutation {
  updateStage(id: "a6bb97dc-224c-4f8f-9af7-fd8b5731840f", name: "Updated Stage"){
    id
    name
  }
}

- Delete Stage
mutation {
  removeStage(id: "a6bb97dc-224c-4f8f-9af7-fd8b5731840f")
}

**Events**
- Add Event
mutation {
  addEvent (name: "Fallout Boy", description: "One of a kind rock band, still delivering great music!", image: "https://media.gettyimages.com/photos/musicians-patrick-stump-andy-hurley-pete-wentz-and-joe-trohman-of-picture-id453620755?s=612x612", startsAt: 1577916000, endsAt: 1577919600){
    id
    appId
    stageId
    name
    description
    image
    startsAt
    endsAt
  }
}

- Update Event
mutation {
  updateEvent(id: "b4781407-da92-475e-8d87-596aee0d7f2d" name: "Tobu", description: "Come and enjoy some great techno music!", image: "https://yt3.ggpht.com/ytc/AKedOLQ6SgMCJCuZGtYOp6BpANad0sHOW9UIMdrwpU9UFA=s900-c-k-c0x00ffffff-no-rj", startsAt: 1577916000, endsAt: 1577919600){
    id
    appId
    stageId
    name
    description
    image
    startsAt
    endsAt
  }
}

- Delete Event
mutation {
  removeEvent(id: "d4cec773-c287-4efe-aca5-4274accb6656")
}

This take home challenge was a lot of fun. Thank you for reading through the readme and reading through my code!