import { UserInputError } from "apollo-server";
import { v4 as uuidv4 } from "uuid";

export const Mutations = {
  addApp: (parent: any, args: any, { apps }: any) => {
    if (args.name) {
      let newApp = {
        id: uuidv4(),
        name: args.name,
      };
      apps.push(newApp);
      return newApp;
    } else {
      throw new UserInputError("Name field but cannot be blank.");
    }
  },
  updateApp: (parent: any, args: any, { apps }: any) => {
    if (args.id) {
      let index = apps.findIndex((app: { id: string }) => {
        return app.id === args.id;
      });
      apps[index].name = args.name;
      return apps[index];
    } else {
      throw new UserInputError("Pass in all fields in order to update an app.");
    }
  },
  removeApp: (parent: any, args: any, { apps }: any) => {
    if (args.id) {
      let index = apps.findIndex((app: { id: string }) => {
        return app.id === args.id;
      });
      apps.splice(index, 1);
      return true;
    } else {
      throw new UserInputError(
        "A valid ID must be submitted in order to delete a app."
      );
    }
  },
  addStage: (parent: any, args: any, { stages }: any) => {
    if (args.name) {
      let newStage = {
        id: uuidv4(),
        name: args.name,
      };
      stages.push(newStage);
      return newStage;
    } else {
      throw new UserInputError("Name field cannot be blank.");
    }
  },
  updateStage: (parent: any, args: any, { stages }: any) => {
    if (args.id) {
      let index = stages.findIndex((stage: { id: number }) => {
        return stage.id === args.id;
      });
      stages[index].name = args.name;
      return stages[index];
    } else {
      throw new UserInputError(
        "Pass in all fields in order to update an stage."
      );
    }
  },
  removeStage: (parent: any, args: any, { stages }: any) => {
    if (args.id) {
      let index = stages.findIndex((stage: { id: number }) => {
        return stage.id === args.id;
      });
      stages.splice(index, 1);
      return true;
    } else {
      throw new UserInputError(
        "A valid ID must be submitted in order to delete a stage."
      );
    }
  },
  addEvent: (parent: any, args: any, { events }: any) => {
    if (
      args.name &&
      args.description &&
      args.image &&
      args.startsAt &&
      args.endsAt
    ) {
      let newEvent = {
        id: uuidv4(),
        appId: uuidv4(),
        stageId: uuidv4(),
        name: args.name,
        description: args.description,
        image: args.image,
        startsAt: args.startsAt,
        endsAt: args.endsAt,
      };
      events.push(newEvent);
      return newEvent;
    } else {
      throw new UserInputError(
        "All fields must be entered to create a new event."
      );
    }
  },
  removeEvent: (parent: any, args: any, { events }: any) => {
    if (args.id) {
      let index = events.findIndex((event: { id: number }) => {
        return event.id === args.id;
      });
      events.splice(index, 1);
      return true;
    } else {
      throw new UserInputError(
        "A valid ID must be submitted in order to delete a event."
      );
    }
  },
  updateEvent: (parent: any, args: any, { events }: any) => {
    if (args.id) {
      let index = events.findIndex((event: { id: string }) => {
        return event.id === args.id;
      });
      if (args.appId) {
        events[index].appId = args.appId;
      }
      if (args.stageId) {
        events[index].stageId = args.stageId;
      }
      events[index].name = args.name;
      events[index].description = args.description;
      events[index].image = args.image;
      events[index].startsAt = args.startsAt;
      events[index].endsAt = args.endsAt;
      return events[index];
    } else {
      throw new UserInputError(
        "Pass in all fields in order to update an event."
      );
    }
  },
};
