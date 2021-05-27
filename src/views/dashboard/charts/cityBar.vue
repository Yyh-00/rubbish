<template>
  <div id="main" style="width:100%;height:236px;" />
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      option: {
        title: {
          text: '城区分布柱状图'
          // textAlign: 'middle'
          // left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0} <br /> {a0} : {c0}<br />{a1} : {c1}'
          // formatter: '{b0}: {c0}<br />{b1}: {c1}'
        },
        legend: {
          data: ['在线', '离线']
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['浙江', '江苏', '安徽', '贵州', '广东']
        },
        yAxis: {
          type: 'value',
          name: '设备数量/台'
        },
        series: [{
          name: '在线',
          type: 'bar',
          color: '#5b7aea',
          data: [90, 32, 22, 18, 8]
        }, {
          name: '离线',
          type: 'bar',
          color: '#A9A9A9',
          data: [4, 4, 2, 2, 2]
        }]
      }
    }
  },
  mounted() {
    this.getTable()
  },
  methods: {
    getTable() {
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
