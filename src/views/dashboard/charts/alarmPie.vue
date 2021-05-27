<template>
  <div id="alarmPie" style="width: 100%;height:240px;" />
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      option: {
        title: {
          text: '报警详情',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
          // data: ['报警设备', '未报警设备']
        },
        // grid: {
        //   bottom: '0%'
        // },
        series: [
          {
            name: '报警设备',
            type: 'pie',
            radius: '65%',
            color: ['#A9A9A9', '#5b7aea'],
            data: [
              { value: 10, name: '报警设备' },
              { value: 246, name: '未报警设备' }

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.getTable()
  },
  methods: {
    getTable() {
      var myChart = echarts.init(document.getElementById('alarmPie'))
      myChart.setOption(this.option)
    }
  }
}
</script>
