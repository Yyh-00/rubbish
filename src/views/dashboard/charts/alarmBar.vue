<template>
  <div id="alarmBar" style="width: 100%;height:252px;" />
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      option: {
        title: {
          text: '设备报警累计数量',
          subtext: '前十设备',
          textStyle: {
            fontSize: 17
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // legend: {
        //   data: ['2011年', '2012年']
        // },
        grid: {
          left: '15%',
          right: '6%',
          bottom: '8%'
          // containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          // boundaryGap: false,
          // name: '垃圾累计投入量/吨',
          nameLocation: 'middle'

        },
        yAxis: {
          type: 'category',
          data: ['宁波万达001', '宁波理工002', '宁波万里003', '宁波城院004', '宁波卫院005', '宁波市政府006', '杭州浙大007', '杭州紫金港008', '杭州银泰009', '杭州建桥010']
        },
        series: [
          {
            name: '垃圾累计投入量',
            type: 'bar',
            color: '#5b7aea',
            data: [20, 60, 40, 20, 20, 20, 30, 60, 30, 20]
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
      var myChart = echarts.init(document.getElementById('alarmBar'))
      myChart.setOption(this.option)
    }
  }
}
</script>

