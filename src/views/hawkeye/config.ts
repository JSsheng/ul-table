import AgHtml from "@/components/AgHtml/index.vue"
import AgLog from "@/components/AgLog/index.vue"

export const config = {
  "app": [
    {
      headerName: 'AppName', field: 'appName', filter: true, width: 180, resizable: true, sortable: true
    }, {
      headerName: 'State',
      field: 'isExist',
      width: 80,
      cellStyle: (params: any) => {
        if (params.value === 'OFF') {
          return { backgroundColor: 'lightpink' };
        }

        if (params.value === 'UNKNOWN') {
          return { backgroundColor: 'yellow' };
        }
        if (params.value === 'ON') {
          return { backgroundColor: '#95d475' };
        }
      }
    }, {
      headerName: 'ResponsiblePerson', field: 'programmer', filter: true, width: 100, sortable: true
    }, {
      headerName: 'StartTime', field: 'startTime',
    }, {
      headerName: "Log", field: "tailLogs", cellRenderer: AgHtml, autoHeight: true, resizable: true, minWidth: 300, maxWidth:2000,
    }, {
      headerName: "Operations", field: "custom", cellRenderer: AgLog, width: 100
    }, {
      headerName: 'WorkerId', field: 'workerId', minWidth: 220
    }, {
      headerName: "AppPath", field: "workPath", minWidth: 300
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
