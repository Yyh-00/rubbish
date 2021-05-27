<template>
  <div class="container">
    <div class="dataChange">
      <div class="seven" :class="{seven:isshow,seven1:!isshow}" @click="chooseSeven">7天</div>
      <div class="thirty" :class="{seven:!isshow}" @click="chooseThirty">30天</div>
    </div>
    <div id="rubOut" style="width: 760px;height:250px;" />
  </div>
</template>

<script>
import echarts from 'echarts'
import { getDisCharge } from '@/api/service'
import { dealTime } from '@/utils'

export default {
  data() {
    return {
      days: '7',
      isshow: true,
      rubOut: '',
      rubOutOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          name: '重量/kg'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b0} <br /> {a} : {c0}'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          name: '垃圾出料量',
          type: 'line',
          areaStyle: {
            color: 'rgba(91, 122, 234,1 )'
          }
        }]
      }
    }
  },
  watch: {
    rubOutOption: {
      handler(newVal, oldVal) {
        if (this.rubOut) {
          if (newVal) {
            this.rubOut.setOption(newVal)
          } else {
            this.rubOut.setOption(oldVal)
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
      this.rubOut = echarts.init(document.getElementById('rubOut'))
      this.rubOut.setOption(this.rubOutOption)
    },
    async getData() {
      var query = {}
      var date = new Date()
      var year = date.getFullYear()
      var mouth = date.getMonth() + 1
      var dates = date.getDate()
      const rubOutData = []
      const time = []
      const sectime = date.getTime() - 86400000
      for (var i = 1; i < this.days * 1 + 1; i++) {
        const sectime1 = sectime - i * 86400000
        time.push(dealTime(sectime1))
      }

      query.ge_id = window.sessionStorage.getItem('onServiceId')
      query.input_date = `${year}-${mouth}-${dates}`
      query.number_of_days = '-' + this.days
      const { data: res } = await getDisCharge(query)

      res.data.forEach(item => {
        rubOutData.push(item * 1)
      })

      this.rubOutOption.series[0].data = rubOutData
      this.rubOutOption.xAxis.data = time.reverse()
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

