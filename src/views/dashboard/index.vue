<template>
  <div class="container">
    <el-card>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="9">
          <div class="allService">
            <div>管理设备总量</div>
            <span>256&nbsp;&nbsp;&nbsp;&nbsp;台</span>
          </div>
          <div class="onService">
            <span class="point" />
            <span>在线设备数量</span>
            <span class="num">242</span>
            <span>台</span>
          </div>
          <div class="offService">
            <span class="point" />
            <span>在线设备数量</span>
            <span class="num">14</span>
            <span>台</span>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="15">
          <el-row>
            <el-col :span="7">
              <div ref="cities" class="cities">
                <span>所属设备分布数量</span>
                <h5>TOP5</h5>
                <div v-for="(item,i) in cityObj" :key="i" class="cityNum">
                  <span>{{ 'No.'+item.rank }}</span>
                  <span>{{ item.name+'省' }}</span>
                  <span>{{ item.num+'台' }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="17">
              <city-bar />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <span style="font-weight:700;">所属设备垃圾累计投入总量</span>
          <span class="allIn">360吨</span>
          <rubbish-all-in />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <span style="font-weight:700;">所属设备垃圾累计处理总量</span>
          <span class="allOut">350吨</span>
          <rubbish-all-out />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="6">
        <div ref="cities" class="powers">
          <span>设备能耗</span>
          <h5>TOP5</h5>
          <div v-for="(item,i) in powerObj" :key="i" class="powerNum">
            <span>{{ 'No.'+item.rank }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.num+'kW·h' }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="18">
        <el-card class="serviceAlarm">
          <el-row :gutter="20">
            <el-col :span="8">
              <alarmPie />
            </el-col>
            <el-col :span="16">
              <alarmBar />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cityBar from './charts/cityBar'
import rubbishAllIn from './charts/rubbishAllIn'
import rubbishAllOut from './charts/rubbishAllOut'
import alarmPie from './charts/alarmPie'
import alarmBar from './charts/alarmBar'

export default {
  components: {
    cityBar,
    rubbishAllIn,
    rubbishAllOut,
    alarmPie,
    alarmBar
  },
  data() {
    return {
      rows: [
        ['浙江', 98],
        ['江苏', 36],
        ['安徽', 28],
        ['贵州', 20],
        ['广东', 10]
      ],
      power: [['宁波万里003', 99], ['宁波万达001', 90], ['杭州浙大007', 75], ['杭州银泰009', 70], ['宁波理工002', 50]],
      cityObj: [],
      powerObj: []
    }
  },
  created() {
    // location.reload()
    // window.location.reload()
    this.getCityObj()
    this.getPowerObj(this.power)
  },
  mounted() {
    // location.reload()
  },
  methods: {
    getCityObj() {
      this.rows.forEach((item, i) => {
        if (i <= 8) {
          const obj = {}
          obj.name = item[0]
          obj.num = item[1]
          obj.rank = i + 1
          this.cityObj.push(obj)
        }
      })
    },
    getPowerObj() {
      // location.reload()
      this.power.forEach((item, i) => {
        if (i <= 8) {
          const obj = {}
          obj.name = item[0]
          obj.num = item[1]
          obj.rank = i + 1
          this.powerObj.push(obj)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 20px
  }
  .el-card{
    margin-bottom: 25px;
  }
  .cities{
      background-color: #3a4268;
      color: #fff;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      >span{
        display: inline-block;
        margin-bottom: 5px;
        font-weight: 700;
      }
      h5{
        margin: 10px 0;
      }
      .cityNum{
        display: flex;
        justify-content: space-between;
        margin-top: 7px;
        font-size: 14px;
        padding: 5px 25px;
      }
  }
  .powers{
      background-color: #3a4268;
      color: #fff;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      height: 280px;
      >span{
        display: inline-block;
        margin-bottom: 5px;
      }
      h5{
        margin: 10px 0;
      }
      .powerNum{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 14px;
        padding: 5px 25px;
      }
  }
  .allService{
    width: 90%;
    height: 100px;
    background-color: #5b7aea;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    padding: 20px;
    span{
      display: block;
      margin-top: 10px;
      font-size: 24px;
    }
  }
  .onService{
    margin-top: 20px;
    .point{
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: #5b7aea;
      border-radius: 7.5px;
      margin-right: 10px;
    }
    .num{
      display:inline-block;
      margin: 0 10px;
      font-size: 20px;
      color: #000;
    }
    span{
      font-size: 15px;
      color: #5b7aea
    }
  }
  .offService{
    margin-top: 20px;
    .point{
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: #A9A9A9;
      border-radius: 7.5px;
      margin-right: 10px;
    }
    .num{
      display:inline-block;
      margin: 0 10px;
      font-size: 20px;
      color: #000;
    }
    span{
      font-size: 15px;
      color: #A9A9A9;
    }
  }
  .allIn{
    display: inline-block;
    font-size: 24px;
    color: #5b7aea;
    margin-left: 30px;
    vertical-align: middle;
  }
  .allOut{
    display: inline-block;
    font-size: 24px;
    color: #5b7aea;
    margin-left: 30px;
    vertical-align: middle;
  }
  .serviceAlarm{
    margin-left: 30px;
  }
</style>
