import { gql } from "apollo-server";

export const typeDefs = gql`
  type App {
    id: ID!
    name: String
  }

  type Stage {
    id: ID!
    name: String
  }

  type Event {
    id: ID!
    appId: String
    stageId: String
    name: String
    description: String
    image: String
    startsAt: Int
    endsAt: Int
  }

  type Query {
    apps: [App]
    stages: [Stage]
    events: [Event]
    singleApp(id: ID!): App
    singleStage(id: ID!): Stage
    searchByStageName(name: String!): Stage
    allStagesInApp(id: ID!): [Stage]!
    singleEvent(id: ID!): Event
    searchByEventName(name: String!): Event
    allEventsBetweenDates(startsAt: String!, endsAt: String!): [Event]!
    allEventsInApp(id: ID!): [Event]!
    stageInAnEvent(id: ID!): Stage!
    eventsUsingSameStage(id: ID!): [Event]!
  }

  type Mutation {
    addApp(name: String): App
    removeApp(id: ID!): Boolean
    updateApp(id: ID!, name: String!): App
    addStage(name: String): Stage
    updateStage(id: ID!, name: String!): Stage
    removeStage(id: ID!): Boolean
    addEvent(
      appId: String
      stageId: String
      name: String!
      description: String!
      image: String!
      startsAt: Int!
      endsAt: Int!
    ): Event
    removeEvent(id: ID!): Boolean
    updateEvent(
      id: ID!
      appId: String
      stageId: String
      name: String!
      description: String
      image: String
      startsAt: Int
      endsAt: Int
    ): Event
  }
`;
