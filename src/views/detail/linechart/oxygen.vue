<template>
  <!-- <div id="oxyLine" style="width: 760px;height:250px;" /> -->
  <div class="container">
    <div class="dataChange">
      <div class="seven" :class="{seven:isshow,seven1:!isshow}" @click="chooseSeven">7天</div>
      <div class="thirty" :class="{seven:!isshow}" @click="chooseThirty">30天</div>
    </div>
    <div id="oxyLine" style="width: 760px;height:250px;" />
  </div>
</template>

<script>
import echarts from 'echarts'
import { getOxygen } from '@/api/service'
import { dealTime } from '@/utils'

export default {
  data() {
    return {
      days: '7',
      isshow: true,
      oxyLine: '',
      oxyLineOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          name: '百分比/%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0} <br /> {a} : {c0}'
        },
        series: [{
          data: [100, 100, 20, 30, 50, 130, 120],
          name: '含氧量',
          type: 'line',
          areaStyle: {
            color: 'rgba(91, 122, 234,1 )'
          }
        }]
      }
    }
  },
  watch: {
    oxyLineOption: {
      handler(newVal, oldVal) {
        if (this.oxyLine) {
          if (newVal) {
            this.oxyLine.setOption(newVal)
          } else {
            this.oxyLine.setOption(oldVal)
          }
        } else {
          this.getTable()
        }
      },
      deep: true // 对象内部属性的监听  关键！
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getTable()
    })
  },
  created() {
    this.getData()
  },
  methods: {
    getTable() {
      this.oxyLine = echarts.init(document.getElementById('oxyLine'))
      this.oxyLine.setOption(this.oxyLineOption)
    },
    async getData() {
      var query = {}
      var date = new Date()
      var year = date.getFullYear()
      var mouth = date.getMonth() + 1
      var dates = date.getDate()
      const oxygenData = []
      const time = []
      const sectime = date.getTime() - 86400000
      for (var i = 1; i < this.days * 1 + 1; i++) {
        const sectime1 = sectime - i * 86400000
        time.push(dealTime(sectime1))
      }

      query.ge_id = window.sessionStorage.getItem('onServiceId')
      query.input_date = `${year}-${mouth}-${dates}`
      query.number_of_days = '-' + this.days
      const { data: res } = await getOxygen(query)

      res.data.forEach(item => {
        oxygenData.push(item * 1)
      })

      this.oxyLineOption.series[0].data = oxygenData
      this.oxyLineOption.xAxis.data = time.reverse()
    },
    chooseSeven() {
      this.days = '7'
      this.isshow = true
      this.getData()
    },
    chooseThirty() {
      this.days = '30'
      this.isshow = false
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
 .dataChange{
    position: absolute;
    top: 28px;
    right: 15px;
    width: 90px;
    height: 25px;
    background-color: #EEE;
    font-size: 15px;
    .seven,.thirty{
      position: absolute;
      width: 50%;
      height: 100%;
      text-align: center;
      line-height: 25px;
      cursor: pointer;
      z-index: 99;
    }
    .seven{
      background-color: #1f2d3d;
      color: #fff;
    }
    .seven1{
      background-color: #eee;
      color: #000;
    }
    .thirty{
     top:0;
     right:0;
    }
  }
</style>
