<template>
  <div>
    <el-table
      v-loading=IsTableLoading
      :data="tableData"
      style="width: 100%"
      :show-header="showHeader">
      <el-table-column
        v-for="(column, index) in this.columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width">
        <template slot-scope="scope">
          <div v-if="column.label=='创建时间'">{{ tableData[scope.$index]['buylist'][column.prop].replace(/T/g, ' ') }}</div>
          <div v-else-if="column.label=='商品图'"><img :src="require(`@/assets/${tableData[scope.$index]['product'][column.prop]}.jpg`)" style="height:100px;object-fit:contain;"></div>
          <div v-else-if="column.label=='购买数量'" style="display: flex;" class="myc1">
            <div style="width: 25px;text-align: center;margin-top: 2px;">{{ tableData[scope.$index].buylist[column.prop] }}</div>
          </div>
          <div v-else-if="column.label=='ID'">{{ tableData[scope.$index]['buylist'][column.prop] }}</div>
          <div v-else-if="column.label=='价格'" style="color: rgba(255,80,0);font-weight: bolder;font-size:medium;">{{ tableData[scope.$index]['product'][column.prop] }}</div>
          <div v-else>{{ tableData[scope.$index]['product'][column.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from '@/utils';

export default {
  props: {
    columns:Array,
    geturl:String,
    Datas:Array,
    showHeader:{
      default:true
    }
  },
  data() {
    return{
      tableData:[],
      currentPage:1,
      TotalPage:null,
      PageSize:10000,
      IsTableLoading:true,
      val:[]
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

    // 更新表格
    updatetable(){
      axios.post('/buylist/update',this.tableData)
      .then(response=>{
        if(response.data.code)this.$message.success(response.data.data)
        else this.$message.error(response.data.msg)
        console.log(response)
      }).catch(error=>{
        this.$message.error(error.data.msg);
        console.log(error)
      })
    },
    // 点击删除
    confirmtodelete(str,id){
      this.$confirm('确定删除'+str+"吗", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deletebyid(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        });
    },
    // 根据id删除 请求范例
    deletebyid(id){
      axios.delete('/buylist/deletebyid',{params: {D_id:id}})
      .then(response=>{
        if(response.data.code){
          this.$message.success(response.data.data)
          setTimeout(() => {window.location.reload()}, 500);
        }
        else this.$message.error(response.data.msg)
        console.log(response)
      }).catch(error=>{
        this.$message.error(error.data.msg);
        console.log(error)
      })
    }
  },
  created(){
    if(!this.Datas)this.gettable()
    else {
      this.IsTableLoading = false
      this.tableData = JSON.parse(JSON.stringify(this.Datas))
    }
  },
  // 页面关闭或者刷新不会触发beforeDestroy
  beforeDestroy(){

  },
  mounted() {
    // 刷新或关闭网页触发
    window.onbeforeunload = () => {
        this.updatetable();
    } 
  },
  // 深层监听器
  watch:{
    // 点加减时触发
    tableData:{
      deep: true,
      handler:function(){
        for(let i=0;i<this.val.length;i++){
        for(let j=0;j<this.tableData.length;j++){
          if(this.val[i].id===this.tableData[j].id){
            this.val[i].product_num = this.tableData[j].product_num;
            break;
          }
        }
      }

      //console.log("watch!")
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myc1 .el-button:focus {
  background-color: white;
  color: black;
  border-color: #DCDFE6;
}
.myc1 .el-button:hover{
  background-color: white;
}

</style>
