import { UserInputError } from "apollo-server";

export const eventResolver = {
  events: (parent: any, args: any, { events }: any) => events,
  singleEvent: (parent: any, args: any, { events }: any) => {
    let singleEvent = events.find((event: { id: string }) => {
      return event.id === args.id;
    });
    return singleEvent;
  },
  searchByEventName: (parent: any, args: any, { events }: any) => {
    let singleEventByName = events.find((event: { name: string }) => {
      return event.name === args.name;
    });
    return singleEventByName;
  },
  allEventsBetweenDates: (parent: any, args: any, { events }: any) => {
    if (args.startsAt && args.endsAt) {
      /*
          Test case #1
          startsAt: 1577916000,
          endsAt: 1577919600,
      */
      return events.filter(
        (event: { startsAt: number; endsAt: number }) =>
          event.startsAt >= parseInt(args.startsAt) &&
          event.endsAt <= parseInt(args.endsAt)
      );
    } else {
      throw new UserInputError(
        "Please two dates to check what events fall in between."
      );
    }
  },
  allEventsInApp: (parent: any, args: any, { events }: any) => {
    if (args.id) {
      return events.filter(
        (event: { appId: string }) => event.appId === args.id
      );
    } else {
      throw new UserInputError("Please provide an ID that matches.");
    }
  },
  // Parameter is the stage ID
  eventsUsingSameStage: (parent: any, args: any, { stages, events }: any) => {
    if (args.id) {
      let singleStage = stages.find((stage: { id: string }) => {
        return stage.id === args.id;
      });
      return events.filter(
        (event: { stageId: string }) => event.stageId === singleStage?.id // Optional chaining
      );
    } else {
      throw new UserInputError(
        "Please provide an stage ID to find all the events that use that stage."
      );
    }
  },
};
