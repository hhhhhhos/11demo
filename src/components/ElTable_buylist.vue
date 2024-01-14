<template>
  <div>
    <el-table
      v-loading=IsTableLoading
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-for="(column, index) in this.columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width">
        <template slot-scope="scope">
          <div v-if="column.label=='创建时间'">{{ tableData[scope.$index][column.prop].replace(/T/g, ' ') }}</div>
          <div v-else-if="column.label=='商品图'"><img :src="require(`@/assets/${tableData[scope.$index][column.prop]}.jpg`)" style="height:100px;object-fit:contain;"></div>
          <div v-else-if="column.label=='购买数量'" style="display: flex;">
             <el-button icon="el-icon-plus" circle size="mini" @click="tableData[scope.$index][column.prop]++"></el-button>
                <div style="width: 25px;text-align: center;margin-top: 2px;">{{ tableData[scope.$index][column.prop] }}</div>
             <el-button icon="el-icon-minus" circle size="mini" @click="tableData[scope.$index][column.prop]>1?tableData[scope.$index][column.prop]--:tableData[scope.$index][column.prop]"></el-button>
          </div>
          <div v-else-if="column.label=='操作'"></div>
          <div v-else>{{ tableData[scope.$index][column.prop] }}</div>
        </template>
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
    geturl:String
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
    },
    // 表格列选择
    handleSelectionChange(val){
      console.log(val)
    },
    // 更新表格
    updatetable(){
      
    }
  },
  created(){
    this.gettable()
  },
  beforeDestroy(){
    this.updatetable()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button:focus {
  background-color: white;
  color: black;
  border-color: #DCDFE6;
}
.el-button:hover{
  background-color: white;
}

</style>
