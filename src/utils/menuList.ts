export const menu = {
  swagger: {
    title: "Swagger",
    index: "/swagger",
    icon: "swagger"
  },
  Home: {
    title: "Home",
    index: "/home",
    icon:'monitor'
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
    icon: "monitor",
    children: [
      {
        title: "Account",
        index: "/monitor?name=acc"
      },
      {
        title: "Strategy",
        index: "/monitor?name=st"
      },
      {
        title: "Configs",
        index: "/monitor?name=cfg"
      },
      {
        title: "Tables",
        index: "/monitor?name=table"
      },
    ]
  }, 
  setting: {
    title: "Setting",
    index: "/setting",
    icon: "settings",
    children: [
      {
        title: "Strategy template",
        index: "/setting-strategy"
      },
      {
        title: "Monitor Config",
        index: "/setting-csv"
      }
    ]
  },
}
