<template>
  <div class="container">
    <div class="dataChange">
      <div class="seven" :class="{seven:isshow,seven1:!isshow}" @click="chooseSeven">7天</div>
      <div class="thirty" :class="{seven:!isshow}" @click="chooseThirty">30天</div>
    </div>
    <div id="temLine" style="width: 760px;height:250px;" />
  </div>
</template>

<script>
import echarts from 'echarts'
import { getTemperature } from '@/api/service'
import { dealTime } from '@/utils'

export default {
  data() {
    return {
      days: '7',
      isshow: true,
      temLine: '',
      temLineOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['5.6', '5.7', '5.8', '5.10', '5.11', '5.12', '5.13']
        },
        yAxis: {
          type: 'value',
          name: '温度℃'
        },
        legend: {
          data: ['最高温度', '最低温度']
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0} <br /> {a0} : {c0}<br />{a1} : {c1}'
        },
        series: [{
          name: '最高温度',
          data: [],
          type: 'line',
          areaStyle: {
            color: 'rgba(91, 122, 234,1 )'
          }
        },
        {
          name: '最低温度',
          data: [],
          type: 'line',
          areaStyle: {
            color: 'rgba(91, 122, 234,1 )'
          }
        }]
      }
    }
  },
  watch: {
    temLineOption: {
      handler(newVal, oldVal) {
        if (this.temLine) {
          if (newVal) {
            this.temLine.setOption(newVal)
          } else {
            this.temLine.setOption(oldVal)
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
      this.temLine = echarts.init(document.getElementById('temLine'))
      this.temLine.setOption(this.temLineOption)
    },
    async getData() {
      var query = {}
      var date = new Date()
      var year = date.getFullYear()
      var mouth = date.getMonth() + 1
      var dates = date.getDate()
      const max = []
      const min = []
      const time = []
      const sectime = date.getTime() - 86400000
      for (var i = 1; i < this.days * 1 + 1; i++) {
        const sectime1 = sectime - i * 86400000
        time.push(dealTime(sectime1))
      }

      query.ge_id = window.sessionStorage.getItem('onServiceId')
      query.input_date = `${year}-${mouth}-${dates}`
      query.number_of_days = '-' + this.days
      const { data: res } = await getTemperature(query)

      res.maxtem.forEach(item => {
        max.push(item * 1)
      })
      res.mintem.forEach(item => {
        min.push(item * 1)
      })

      this.temLineOption.series[0].data = max
      this.temLineOption.series[1].data = min
      this.temLineOption.xAxis.data = time.reverse()
      // console.log(max)
      // console.log(min)
      // console.log(this.temLineOption.series[0].data)
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
