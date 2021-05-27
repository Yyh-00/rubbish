<template>
  <div class="container">
    <el-card>
      <el-row class="crumbs">
        <div class="returnMap">
          <div class="tringle" />
          <span @click="returnMap">返回</span>
        </div>
        <span>当前设备:</span>
        <span class="onservice">{{ '宁波'+ onServiceId +'号设备' }}</span>
        <span>设备状态:</span>
        <span class="onservice">{{ status }}</span>
      </el-row>
      <el-row :gutter="20" class="pannel">
        <el-col :xs="12" :sm="8" :lg="4">
          <div class="serviceData">
            <span>温度</span>
            <div>{{ onServiceInfo.realtime_tem+'℃' }}</div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="4">
          <div class="serviceData">
            <span>湿度</span>
            <div>{{ onServiceInfo.realtime_hum+'%' }}</div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="4">
          <div class="serviceData">
            <span>含氧量</span>
            <div>{{ onServiceInfo.realtime_oxygen+'%' }}</div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="4">
          <div class="serviceData">
            <span>当日能耗</span>
            <div>{{ onServiceInfo.today_electricity+'kW·h' }}</div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="4">
          <div class="serviceData">
            <span>当日垃圾收入量</span>
            <div>{{ onServiceInfo.put_garbage+'kg' }}</div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="4">
          <div class="serviceData">
            <span>当前仓内重量</span>
            <div>{{ onServiceInfo.garbage_weight+'Kg' }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :lg="10">
        <el-card class="detectionData">
          <span style="font-weight:700;font-size:18px;display:inline-block;margin-bottom:16px;">臭气检测数据</span>
          <div class="gasData">
            <div class="gas">
              <span>氨气(NH3)入口实时浓度</span>
              <div>20%</div>
            </div>
            <div class="gas">
              <span>氨气(NH3)出口实时浓度</span>
              <div>20%</div>
            </div>
            <div class="hr" />
            <!-- <hr> -->
            <div class="gas">
              <span>硫化氢(H2S)入口浓度</span>
              <div>10%</div>
            </div>
            <div class="gas">
              <span>硫化氢(H2S)出口浓度</span>
              <div>10%</div>
            </div>
            <div class="hr" />
            <div class="gas">
              <span>PH实时数据</span>
              <div>6.7</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="14">
        <el-card class="detectionData">
          <div class="detectionDataTitle">
            <span style="font-weight:700;font-size:18px">设备能耗</span>
            <!-- <div class="dataChange">
              <span class="seven">7天</span>
              <span>30天</span>
            </div> -->
          </div>
          <el-tabs type="border-card" class="energy">
            <el-tab-pane label="温度">
              <temLine />
            </el-tab-pane>
            <el-tab-pane label="湿度">
              <humLine />
            </el-tab-pane>
            <el-tab-pane label="含氧量">
              <oxyLine />
            </el-tab-pane>
            <el-tab-pane label="仓内重量">
              <weiLine />
            </el-tab-pane>
            <el-tab-pane label="垃圾投入量">
              <rubInLine />
            </el-tab-pane>
            <el-tab-pane label="垃圾处理量">
              <rubOutLine />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="alarmDetails">
          <span style="font-weight:700;font-size:18px;display:inline-block;margin-bottom:16px;">设备报警详情</span>
          <el-table
            v-loading="listLoading"
            :data="alarmListData.filter(data => (!handQuery.id && !handQuery.message && !handQuery.date) || (data.message.toLowerCase().includes(handQuery.message.toLowerCase()) && data.id.toLowerCase().includes(handQuery.id.toLowerCase()) && data.date.toLowerCase().includes(handQuery.date.toLowerCase()))).slice((currentPage-1)*size,currentPage*size)"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column type="index" width="80" label="序号" align="center" />
            <!-- <el-table-column label="设备编号" prop="id" align="center" width="200px">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="报警日期及时间" width="200px" align="center" prop="date">
              <template slot-scope="{row}">
                <span class="link-type">{{ row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="报警原因" width="210px" align="center" prop="message">
              <template slot-scope="{row}">
                <span class="link-type" style="color:#F00">{{ row.message }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否处理" width="124px" align="center">
              <template slot-scope="{row}">
                <span class="link-type">{{ row.status }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            :current-page="currentPage"
            :page-sizes="[5,10, 20]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="alarmListData.filter(data => (!handQuery.id && !handQuery.message && !handQuery.date) || (data.message.toLowerCase().includes(handQuery.message.toLowerCase()) && data.id.toLowerCase().includes(handQuery.id.toLowerCase()) && data.date.toLowerCase().includes(handQuery.date.toLowerCase()))).length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="alarmDetails"> <span style="font-weight:700;font-size:18px;display:inline-block;margin-bottom:16px;">臭气报警详情</span>
          <el-table
            v-loading="listLoading"
            :data="alarmListData.filter(data => (!handQuery.id && !handQuery.message && !handQuery.date) || (data.message.toLowerCase().includes(handQuery.message.toLowerCase()) && data.id.toLowerCase().includes(handQuery.id.toLowerCase()) && data.date.toLowerCase().includes(handQuery.date.toLowerCase()))).slice((currentPage-1)*size,currentPage*size)"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column type="index" width="80" label="序号" align="center" />
            <!-- <el-table-column label="设备编号" prop="id" align="center" width="200px">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="报警日期及时间" width="200px" align="center" prop="date">
              <template slot-scope="{row}">
                <span class="link-type">{{ row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="报警原因" width="210px" align="center" prop="message">
              <template slot-scope="{row}">
                <span class="link-type" style="color:#F00">{{ row.message }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否处理" width="124px" align="center">
              <template slot-scope="{row}">
                <span class="link-type">{{ row.status }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            :current-page="currentPage"
            :page-sizes="[5,10, 20]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="alarmListData.filter(data => (!handQuery.id && !handQuery.message && !handQuery.date) || (data.message.toLowerCase().includes(handQuery.message.toLowerCase()) && data.id.toLowerCase().includes(handQuery.id.toLowerCase()) && data.date.toLowerCase().includes(handQuery.date.toLowerCase()))).length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          /></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onServiceInfo, getPH } from '@/api/service'
import { getAlarmData } from '@/api/user.js'
import temLine from './linechart/temperature'
import humLine from './linechart/humidity'
import oxyLine from './linechart/oxygen'
import weiLine from './linechart/weight'
import rubInLine from './linechart/rubbishIn'
import rubOutLine from './linechart/rubbishOut'

export default {
  components: { temLine, humLine, oxyLine, weiLine, rubInLine, rubOutLine },
  data() {
    return {
      onServiceId: window.sessionStorage.getItem('onServiceId'),
      onServiceStatus: window.sessionStorage.getItem('onServiceStatus'),
      onServiceInfo: {},
      status: '',
      servicePH: '',
      list: null,
      listLoading: true,
      downloadLoading: false,
      token: null,
      form: {
        account: ''
      },
      handQuery: {
        identity: 1,
        id: window.sessionStorage.getItem('onServiceId'),
        message: '',
        date: ''
      },
      alarmLimit: null,
      alarmListData: [],
      total: null,
      currentPage: 1,
      size: 5
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getServiceInfo()
    this.judgeStatus()
  },
  destroyed() {
    window.sessionStorage.removeItem('onServiceId')
    window.sessionStorage.removeItem('onServiceStatus')
  },
  methods: {
    judgeStatus() {
      if (this.onServiceStatus === '1') {
        this.status = '离线'
      } else {
        this.status = '在线'
      }
    },
    returnMap() {
      this.$router.push('distribution')
    },
    async getServiceInfo() {
      const query = { ge_id: this.onServiceId }
      const { data: res } = await onServiceInfo(query)
      if (res.data.put_garbage === null || res.data.realtime_oxygen === null || res.data.today_electricity === null) {
        res.data.put_garbage = 0
        res.data.realtime_oxygen = 0
        res.data.today_electricity = 0
      }
      console.log()
      this.onServiceInfo = res.data
      console.log(res.data)
      const { data: res1 } = await getPH(query)
      this.servicePH = res1.garbage_ph
    },
    getList() {
      this.form.account = this.$store.getters.userAccount
      this.listLoading = true
      getAlarmData(this.form).then(response => {
        this.alarmLimit = response.data.data2
        // console.log(this.alarmLimit)
        // console.log(response.data.data1)
        this.total = response.data.data1.length
        for (var i = 0; i < response.data.data1.length; i++) {
          const c1 = this.alarmLimit.findIndex(x => x.ge_id === response.data.data1[i].ge_id)
          var alarmMessage = ''
          if (this.alarmLimit[c1].tem_max < response.data.data1[i].history_tem) {
            alarmMessage = '温度过高 '
          }
          if (this.alarmLimit[c1].tem_min > response.data.data1[i].history_tem) {
            alarmMessage = alarmMessage + '温度过低 '
          }
          if (this.alarmLimit[c1].hum_max < response.data.data1[i].history_hum) {
            alarmMessage = alarmMessage + '湿度过高 '
          }
          if (this.alarmLimit[c1].oxygen_min > response.data.data1[i].history_oxygen) {
            alarmMessage = alarmMessage + '含氧量过低 '
          }
          const obj = {
            id: response.data.data1[i].ge_id,
            date: response.data.data1[i].abnormal_time,
            address: this.alarmLimit[c1].ge_site,
            message: alarmMessage,
            status: response.data.data1[i].status === '0' ? '未处理' : '已处理'
          }
          this.alarmListData.push(obj)
        }
        this.listLoading = false
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1 * 1000)
      })
    },
    change() {
      if (this.handQuery.date === null) {
        // console.log(this.handQuery.date)
      }
      // console.log(this.alarmListData.filter(data => data.date.toLowerCase().includes(this.handQuery.date.toLowerCase())))
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
    }
  }

}
</script>

<style lang="scss" scoped>
.container{
  padding: 15px;
}

.crumbs{
  margin-bottom: 15px;
  .returnMap{
    display: inline-block;
    cursor: pointer;
    margin-right: 5px;
    .tringle{
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 1px solid #000;
      transform: rotate(45deg);
      border-top: none;
      border-right: none;
    }
    >span{
      margin-left: 2px;
    }
  }
  span{
    display: inline-block;
    margin: 0 6px;
    color: #000;
  }
  .onservice{
    color: #5b7aea;
  }
}
.pannel{
  margin: 20px 0;
}
.serviceData{
  width: 100%;
  height: 120px;
  padding: 26px 0 0;
  text-align: center;
  color: #fff;
  background-color: #5b7aea;
  border-radius: 12px;
  span{
    font-size: 17px;
  }
  div{
    margin-top: 23px;
    font-size: 25px;
  }
}
.detectionData{
  margin-top: 20px;
  color: #000;
  .gasData{
    border: 1px solid #DCDFE6;
    padding: 10px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  }
  .gas{
    display: flex;
    justify-content: space-between;
    margin: 19px 0;
    span{
      letter-spacing: 2px;
    }
    div{
      display: inline-block;
      width: 160px;
      height: 24px;
      background-color: #eee;
      vertical-align: middle;
      text-align: center;
      line-height: 24px;
      border: 1px solid #ccc;
    }
  }
}
.hr{
  width: 100%;
  height: 5px;
  background-color: #eee;
  margin: 31px 0;
}
.detectionDataTitle{
  display: flex;
  justify-content: space-between;
  // .dataChange{
  //   width: 90px;
  //   height: 25px;
  //   background-color: #EEE;
  //   font-size: 15px;
  //   span{
  //     display: inline-block;
  //     width: 50%;
  //     height: 100%;
  //     text-align: center;
  //     line-height: 25px;
  //   }
  //   .seven{
  //     background-color: #1f2d3d;
  //     color: #fff;
  //   }
  // }
}
.alarmDetails{
  margin-top: 20px;
}
</style>

<style lang="scss">
.energy{
  margin-top: 15px;
}
</style>
