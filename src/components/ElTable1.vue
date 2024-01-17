<template>
  <div>
    <el-table
      v-loading=IsTableLoading
      :data="tableData"
      style="width: 100%">
      <el-table-column
        v-for="(column, index) in this.columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width">
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size=PageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total="TotalPage">
    </el-pagination>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  props: {
    columns:Array,
    geturl:String,
    PtableData:Array
  },
  data() {
    return{
      tableData:[],
      currentPage:1,
      TotalPage:null,
      PageSize:10,
      IsTableLoading:true
    }
  },
  methods:{
    // 拿表
    gettable(){
      axios.get(this.geturl,{
        params: {
          currentPage: this.currentPage,
          PageSize: this.PageSize
        }
      }).then(response=>{
        if(response.data.code===0)this.$message.error(response.data.msg)
        else {
          this.tableData = response.data.data.records
          this.TotalPage = response.data.data.total
          this.IsTableLoading = false
          console.log(response)
          this.$message.success("获取成功")
        }
      }).catch(error=>{
        this.$message.error(error.data.msg)
        console.log(error)
      })
    },
    // 页容量变化
    handleSizeChange(val) {
      this.PageSize = val
      this.gettable()
    },
    // 切页
    handleCurrentChange(val) {
      this.currentPage = val
      this.gettable()
    }
  },
  created(){
    // 没数据才请求
    if(!this.PtableData)this.gettable()
    else {
      this.IsTableLoading = false
      this.tableData=  this.PtableData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
