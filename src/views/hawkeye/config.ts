import AgHtml from "../../components/AgHtml/index.vue"

export const config = {
  "app": [
    { 
      headerName: 'AppName', field: 'appName', filter: true
    }, { 
      headerName: 'State',
      field: 'isExist',
      cellStyle: (params: any) => {
        if (params.value === 'OFF') {
          return { backgroundColor: 'lightpink' };
        }
        return null;
      }
    }, { 
      headerName: 'ResponsiblePerson', field: 'programmer' 
    }, { 
      headerName: 'StartTime', field: 'startTime' 
    }, { 
      headerName: 'WorkerId', field: 'workerId', minWidth: 220 
    }, { 
      headerName: "AppPath", field: "workPath", minWidth: 300, flex: 1
    }
  ],
  "worker": [
    { 
      headerName:'workerId',
      field: 'workerId',
      minWidth: 250,
      filter: true
    },
    { 
      headerName:'disk infomation',
      field: 'diskInfo',
      cellRenderer: AgHtml,
      cellStyle: (params: any) => {
        const { value } = params;
        if (value && value.raw) {
          return Object.keys(value.raw).some((key) => value.raw[key]?.usedPercent > 90) ? { backgroundColor: 'lightpink' } : null;
        }
        return null;
      },
      autoHeight: true,
      flex: 1
    }
  ]
}
