<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="filter-container">
        <el-button type="primary" icon="el-icon-download" @click="handleDownload">
          导出为Excel
        </el-button>
        <el-date-picker v-model="handQuery.date" type="date" placeholder="选择设备操作时间" value-format="yyyy-MM-dd" style="float: right" clearable @change="change" />
        <el-input v-model="handQuery.id" placeholder="输入设备编号" size="large" style="width: 160px; float: right; margin-right: 20px;" clearable />
      </div>

      <el-table
        v-loading="listLoading"
        :data="maintainListData.filter(data => (!handQuery.id && !handQuery.date) || (data.id.toLowerCase().includes(handQuery.id.toLowerCase()) && data.date.toLowerCase().includes(handQuery.date.toLowerCase()))).slice((currentPage-1)*size,currentPage*size)"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="index" width="80" label="序号" align="center" />
        <el-table-column label="设备编号" prop="id" align="center" width="200px">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作日期及时间" width="200px" align="center" prop="date">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="安装地址" align="center" min-width="200px">
          <template slot-scope="{row}">
            <span>{{ row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人员" width="230px" align="center" prop="message">
          <template slot-scope="{row}">
            <span class="link-type" style="color:#F00">{{ row.person }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作内容" min-width="200px" align="center">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.message }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="maintainListData.filter(data => (!handQuery.id && !handQuery.date) || (data.id.toLowerCase().includes(handQuery.id.toLowerCase()) && data.date.toLowerCase().includes(handQuery.date.toLowerCase()))).length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { getMaintain } from '@/api/user.js'
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      downloadLoading: false,
      token: null,
      handQuery: {
        identity: 1,
        id: '',
        message: '',
        date: ''
      },
      form: {
        account: ''
      },
      total: null,
      currentPage: 1,
      size: 10,
      maintainListData: [],
      maintainListLimit: null
    }
  },
  watch: {
    'handQuery.date'(newValue, oldValue) {
      // console.log(newValue, oldValue)
      if (newValue === null) {
        this.handQuery.date = ''
      }
    }
  },
  created() {
    // this.token = getToken()
    this.getList()
    // console.log(this.token)
  },
  methods: {
    getList() {
      this.form.account = this.$store.getters.userAccount
      this.listLoading = true
      getMaintain(this.form).then(response => {
        // console.log(response)
        this.maintainListLimit = response.data.data2
        this.total = response.data.data1.length
        for (var i = 0; i < response.data.data1.length; i++) {
          const c1 = this.maintainListLimit.findIndex(x => x.ge_id === response.data.data1[i].ge_id)
          const obj = {
            id: response.data.data1[i].ge_id,
            date: response.data.data1[i].maintenance_date,
            address: this.maintainListLimit[c1].ge_site,
            person: response.data.data1[i].maintenance_person,
            message: response.data.data1[i].maintenance_content
          }
          this.maintainListData.push(obj)
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
    handleDownload() {
      this.list = this.maintainListData.filter(data => (!this.handQuery.id && !this.handQuery.date) || (data.id.toLowerCase().includes(this.handQuery.id.toLowerCase()) && data.date.toLowerCase().includes(this.handQuery.date.toLowerCase()))).slice((this.currentPage - 1) * this.size, this.currentPage * this.size)
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['设备编号', '报警日期及时间', '安装地址', '操作人员', '操作内容']
        const filterVal = ['id', 'date', 'address', 'person', 'message']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'EXCEL-LIST',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return (jsonData || []).map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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

<style scoped>
  .pagination{
    float: right;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .filter-container{
    margin-bottom: 20px;
  }
</style>

