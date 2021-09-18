export const appResolver = {
  apps: (parent: any, args: any, { apps }: any) => apps,
  singleApp: (parent: any, args: any, { apps }: any) => {
    let singleApp = apps.find((app: { id: string }) => {
      return app.id === args.id;
    });
    return singleApp;
  },
};
