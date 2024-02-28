<template>
  <div>
    <el-table
      v-loading=IsTableLoading
      :data="tableData"
      style="width: 100%">

      <el-table-column
        type="expand"
        width="25">
        <template slot-scope="props">
          <div style="margin: 0 30px;">
            <ET1 :Datas="props.row.info" :columns="columns1" :showHeader="false"></ET1>
            <el-descriptions title="收货信息" style="margin: 20px 0 20px 20px;">
                <el-descriptions-item label="姓名">{{ props.row.address.name }}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{ props.row.address.phone }}</el-descriptions-item>
                <el-descriptions-item label="居住地">{{props.row.address.info?.[0]}}</el-descriptions-item>
                <el-descriptions-item label="备注">
                  <el-tag v-if="props.row.status==='未支付'" size="small">{{props.row.status}}</el-tag>
                  <el-tag v-else type="success" size="small">{{props.row.status}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="收货地址">{{ props.row.address.info?.[0]+props.row.address.info?.[1]+props.row.address.info?.[2]+props.row.address.detail }}</el-descriptions-item>
              </el-descriptions>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(column, index) in this.columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :align="column.align"
        >
        <template slot-scope="scope" >
          <div v-if="column.label==='时间'">{{ tableData[scope.$index][column.prop].replace(/T/g, ' ') }}</div>
          <div v-if="column.label==='订单ID'">{{ tableData[scope.$index][column.prop]}}</div>
          <div v-if="column.label==='总额'">{{ tableData[scope.$index][column.prop]}}</div>
          <div v-if="column.label==='件数'">{{ tableData[scope.$index][column.prop]}}</div>
          <div v-if="column.label==='信息'">
            <span v-for="(data, index) in tableData[scope.$index][column.prop]" :key="index">
              {{ data.product.name }} &nbsp;
            </span>
          </div>
          <div v-if="column.label==='状态'">
            <el-tag v-if="tableData[scope.$index].status==='未支付'" style="cursor: pointer;" @click="gotopay(tableData[scope.$index].status,tableData[scope.$index].id,tableData[scope.$index].totalMoney,tableData[scope.$index].totalNum,tableData[scope.$index].info?.[0].product.name)">{{ tableData[scope.$index][column.prop]}}
            </el-tag>
            <el-tag v-else type="success" style="cursor: pointer;" @click="gotopay(tableData[scope.$index].status,tableData[scope.$index].id,tableData[scope.$index].totalMoney,tableData[scope.$index].totalNum,tableData[scope.$index].info?.[0].product.name)">{{ tableData[scope.$index][column.prop]}}
            </el-tag>
          </div>
          <div v-if="column.label==='操作'">
            <el-button @click="confirmtodelete(tableData[scope.$index].id,tableData[scope.$index].status)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </div>
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
import axios from '@/utils';
import ET1 from '/src/components/ElTable_buylist_result'

export default {
  props: {
    columns:Array,
    geturl:String,
    PtableData:Array
  },
  components:{

    ET1
  },
  data() {
    return{
      tableData:[],
      columns1 : [
        //{ prop: 'id', label: 'ID', width: '100' },
        //{ prop: 'user_id', label: '用户ID', width: '100' },
        //{ prop: 'product_id', label: '商品ID', width: '100' },
        { prop: 'photo', label: '商品图', width: '180' },
        { prop: 'name', label: '商品名' },
        { prop: 'product_num', label: '购买数量' , width: '120' },
        { prop: 'price', label: '价格', width: '100' },
        { prop: 'create_time', label: '创建时间', width: '180' },
      ],
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
    // 点击删除
    confirmtodelete(id,status){
      this.$confirm("确定删除订单吗", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(status==="未支付")this.confirmtobackbuylist(id)
          else this.deletebyid(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        });
    },
    // 是否返回购物车
    confirmtobackbuylist(id){
      console.log(id)
      this.$confirm("是否将商品返回购物车", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deletebyid(id,true)
        }).catch(() => {
          this.deletebyid(id)
          this.$message({
            type: 'info',
            message: '不返回购物车并删除'
          })
        });
    },
    //删订单
    deletebyid(orderid,backbuylist = false){
      // 根据id删除 请求范例 //是否返回车
      axios.delete('/order/deletebyid',{params: {D_id:orderid,backBuyList:backbuylist}})
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

    },
    // 判断状态,是否跳转支付
    gotopay(status,id,money,num,name){
      if(status==="未支付"){
        // 防止被拦截（因为gotopay为了防止浏览器回退 搞的）
        sessionStorage.setItem('StopRedirectPay',"false")

        this.$router.push(`/gotopay?id=${id}&money=${money}&num=${num}&name=${name}`);
      }else if(status==="已支付"){
        this.$message("订单已支付")
      }else{
        this.$message.error("状态错误")
      }
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
