export const option = {
  axis: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    }
  },
  circle: {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
      selectedMode: false
    },
    series: [
      {
        name: 'Delta',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start angle
        startAngle: 180,
        label: {
          show: true,
          formatter(param: any) {
            // correct the percentage
            return param.name + ' (' + param.percent * 2 + '%)';
          }
        },
        data: []
      }
    ]
  }
}