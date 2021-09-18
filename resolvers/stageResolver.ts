import { UserInputError } from "apollo-server";

export const stageResolver = {
  stages: (parent: any, args: any, { stages }: any) => stages,
  singleStage: (parent: any, args: any, { stages }: any) => {
    let singleStage = stages.find((stage: { id: any }) => {
      return stage.id === args.id;
    });
    return singleStage;
  },
  searchByStageName: (parent: any, args: any, { stages }: any) => {
    let singleStageByName = stages.find((stage: { name: string }) => {
      return stage.name === args.name;
    });
    return singleStageByName;
  },
  // Parameter is the event ID
  stageInAnEvent: (parent: any, args: any, { events, stages }: any) => {
    if (args.id) {
      let singleEvent = events.find((event: { id: string }) => {
        return event.id === args.id;
      });
      let singleStage = stages.find((stage: { id: string }) => {
        return stage.id === singleEvent?.stageId; // Optional chaining incase object is null or underfined
      });
      return singleStage;
    } else {
      throw new UserInputError(
        "Please provide an event ID to find the stage that matches the event."
      );
    }
  },
};
