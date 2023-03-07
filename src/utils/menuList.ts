export const menu = {
  swagger: {
    title: "Swagger",
    index: "/swagger",
    icon: "swagger"
  },
  baseCamp: {
    title: "BaseCamp",
    index: "/instrument-base",
    icon: "swagger",
    children: [
      {
        title: "Instrument",
        index: "/instrument?name=base"
      },
      {
        title: "Strategy Instrument",
        index: "/instrument?name=strategy"
      },
      {
        title: "Account Instrument",
        index: "/instrument?name=account"
      }
    ]
  },
  strategy: {
    title: "Strategy Template",
    index: "/strategy-template",
    icon: "swagger"
  },
  hawkeye: {
    title: "HawkEye",
    index: "/hawkeye-base",
    icon: "swagger",
    children: [
      {
        title: "Apps",
        index: "/hawkeye?name=app"
      },
      {
        title: "Workers",
        index: "/hawkeye?name=worker"
      }
    ]
  },
  monitor: {
    title: "Monitor",
    index: "/monitor",
    icon: "swagger",
    children: [
      {
        title: "Account",
        index: "/monitor?name=acc"
      },
      {
        title: "Strategy",
        index: "/monitor?name=st"
      }
    ]
  }
}
