<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="filter-container">
        <el-button type="primary" icon="el-icon-download" @click="handleDownload">
          导出为Excel
        </el-button>
        <el-input v-model="handQuery.id" placeholder="输入设备编号" size="large" style="width: 160px; float: right; margin-right: 20px;" clearable />
        <el-input v-model="handQuery.status" placeholder="输入设备状态" size="large" style="width: 160px; float: right; margin-right: 20px;" clearable />
        <el-input v-model="handQuery.address" placeholder="输入设备安装位置" size="large" style="width: 160px; float: right; margin-right: 20px;" clearable />
      </div>

      <el-table
        v-loading="listLoading"
        :data="maintainListData.filter(data => (!handQuery.id && !handQuery.status && !handQuery.address) || (data.id.includes(handQuery.id) && data.status.includes(handQuery.status) && data.address.includes(handQuery.address))).slice((currentPage-1)*size,currentPage*size)"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="index" width="80" label="序号" align="center" />
        <el-table-column label="设备编号" prop="id" align="center" width="150px">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备型号" width="120px" align="center" prop="version">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.version }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备序列号" align="center" min-width="120px" prop="serial">
          <template slot-scope="{row}">
            <span>{{ row.serial }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备状态" width="120px" align="center" prop="status">
          <template slot-scope="{row}">
            <span v-if="row.status==='在线'" style="color:green" class="link-type">{{ row.status }}</span>
            <span v-if="row.status==='离线'" style="color:red" class="link-type">{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="安装位置" min-width="180px" align="center" prop="address">
          <template slot-scope="{row}">
            <span>{{ row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="260px" align="center" prop="remark">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.remark" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                取消
              </el-button>
            </template>
            <span v-else>{{ row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="200px" align="center" prop="address">
          <template slot-scope="{row}">
            <el-button
              v-if="row.edit"
              type="success"
              size="medium"
              @click="confirmEdit(row)"
            >
              成功
            </el-button>
            <el-button
              v-else
              type="primary"
              size="medium"
              @click="row.edit=!row.edit"
            >
              编辑
            </el-button>
            <el-button type="danger" size="medium">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="maintainListData.filter(data => (!handQuery.id && !handQuery.status && !handQuery.address) || (data.id.includes(handQuery.id) && data.status.includes(handQuery.status) && data.address.includes(handQuery.address))).length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { serviceAllBasis, setRemrk } from '@/api/service.js'
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
        address: '',
        status: ''
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
      serviceAllBasis(this.form).then(response => {
        console.log(response)
        // this.maintainListLimit = response.data.data2
        this.total = response.data.data.length
        const c1 = []

        for (var i1 = 0; i1 < response.data.data.length; i1++) {
          if (response.data.data[i1].status_ === '1') {
            c1.push('离线')
          } else {
            c1.push('在线')
          }
        }
        for (var i = 0; i < response.data.data.length; i++) {
          // const c1 = this.maintainListLimit.findIndex(x => x.ge_id === response.data.data[i].ge_id)

          const obj = {
            id: response.data.data[i].ge_id,
            version: response.data.data[i].ge_version,
            serial: response.data.data[i].ge_serial,
            status: c1[i],
            address: response.data.data[i].ge_site,
            remark: response.data.data[i].remark,
            edit: false
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
      this.list = this.maintainListData.filter(data => (!this.handQuery.id && !this.handQuery.status && !this.handQuery.address) || (data.id.includes(this.handQuery.id) && data.status.includes(this.handQuery.status) && data.address.includes(this.handQuery.address))).slice((this.currentPage - 1) * this.size, this.currentPage * this.size)
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['设备编号', '设备型号', '设备序列号', '设备状态', '安装位置', '备注']
        const filterVal = ['id', 'version', 'serial', 'status', 'address', 'remark']
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
    cancelEdit(row) {
      row.remark = row.originalTitle
      row.edit = false
      this.$message({
        message: '标题已恢复到原来的值',
        type: 'warning'
      })
    },
    async confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.remark

      const query = {}
      query.remark = row.remark
      query.ge_id = row.id
      const { data: res } = await setRemrk(query)
      console.log(res)
      console.log(row.id)

      this.$message({
        message: '编辑备注成功',
        type: 'success'
      })
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
  .edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

