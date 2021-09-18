import { apps, stages, events } from "../data";
import { UserInputError } from "apollo-server";
import { v4 as uuidv4 } from "uuid";

export const resolvers = {
  Query: {
    apps: () => apps,
    singleApp: (parent: any, args: any, ctx: any) => {
      let singleApp = apps.find((app) => {
        return app.id === args.id;
      });
      return singleApp;
    },
    stages: () => stages,
    singleStage: (parent: any, args: any, ctx: any) => {
      let singleStage = stages.find((stage) => {
        return stage.id === args.id;
      });
      return singleStage;
    },
    searchByStageName: (parent: any, args: any, ctx: any) => {
      let singleStageByName = stages.find((stage) => {
        return stage.name === args.name;
      });
      return singleStageByName;
    },
    // Paramerter takes app ID and returns any stages where the stage id equals the app ID
    allStagesInApp: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        let filteredEvents: any = events.filter(
          (event) => event.appId === args.id
        );
        let stagesInApp = new Set();
        stages.forEach((stage: any) => {
          filteredEvents.forEach((event: any) => {
            if (stage.id === event.stageId) {
              stagesInApp.add(stage);
            }
          });
        });
        return stagesInApp;
      } else {
        throw new UserInputError("Please provide an App ID that matches.");
      }
    },
    events: () => events,
    singleEvent: (parent: any, args: any, ctx: any) => {
      let singleEvent = events.find((event) => {
        return event.id === args.id;
      });
      return singleEvent;
    },
    searchByEventName: (parent: any, args: any, ctx: any) => {
      let singleEventByName = events.find((event) => {
        return event.name === args.name;
      });
      return singleEventByName;
    },
    allEventsBetweenDates: (parent: any, args: any, ctx: any) => {
      if (args.startsAt && args.endsAt) {
        /*
            Test case #1
            startsAt: 1577916000,
            endsAt: 1577919600,
        */
        return events.filter(
          (event) =>
            event.startsAt >= parseInt(args.startsAt) &&
            event.endsAt <= parseInt(args.endsAt)
        );
      } else {
        throw new UserInputError(
          "Please two dates to check what events fall in between."
        );
      }
    },
    allEventsInApp: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        return events.filter((event) => event.appId === args.id);
      } else {
        throw new UserInputError("Please provide an ID that matches.");
      }
    },
    // Parameter is the event ID
    stageInAnEvent: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        let singleEvent = events.find((event) => {
          return event.id === args.id;
        });
        let singleStage = stages.find((stage) => {
          return stage.id === singleEvent?.stageId; // Optional chaining incase object is null or underfined
        });
        return singleStage;
      } else {
        throw new UserInputError(
          "Please provide an event ID to find the stage that matches the event."
        );
      }
    },
    // Parameter is the stage ID
    eventsUsingSameStage: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        let singleStage = stages.find((stage) => {
          return stage.id === args.id;
        });
        return events.filter((event) => event.stageId === singleStage?.id); // Optional chaining
      } else {
        throw new UserInputError(
          "Please provide an stage ID to find all the events that use that stage."
        );
      }
    },
  },
  Mutation: {
    addApp: (parent: any, args: any, ctx: any) => {
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
    updateApp: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        let index = apps.findIndex((app) => {
          return app.id === args.id;
        });
        apps[index].name = args.name;
        return apps[index];
      } else {
        throw new UserInputError(
          "Pass in all fields in order to update an app."
        );
      }
    },
    removeApp: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        let index = apps.findIndex((app) => {
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
    addStage: (parent: any, args: any, ctx: any) => {
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
    updateStage: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        let index = stages.findIndex((app) => {
          return app.id === args.id;
        });
        stages[index].name = args.name;
        return stages[index];
      } else {
        throw new UserInputError(
          "Pass in all fields in order to update an stage."
        );
      }
    },
    removeStage: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        let index = stages.findIndex((app) => {
          return app.id === args.id;
        });
        stages.splice(index, 1);
        return true;
      } else {
        throw new UserInputError(
          "A valid ID must be submitted in order to delete a stage."
        );
      }
    },
    addEvent: (parent: any, args: any, ctx: any) => {
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
    removeEvent: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        let index = events.findIndex((app) => {
          return app.id === args.id;
        });
        events.splice(index, 1);
        return true;
      } else {
        throw new UserInputError(
          "A valid ID must be submitted in order to delete a event."
        );
      }
    },
    updateEvent: (parent: any, args: any, ctx: any) => {
      if (args.id) {
        let index = events.findIndex((app) => {
          return app.id === args.id;
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
  },
};
