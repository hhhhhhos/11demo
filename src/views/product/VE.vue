<template>
  <div>
    <div style="width: 80%;margin: 50px auto;display: flex;" class="myborder">
      <!--图 -->
      <div>
        <img :src="require(`@/assets/${OneData.photo}.jpg`)" class="myborder" style="height:320px;object-fit:contain;margin: 30px 100% 30px 30px;">
      </div>
      <!--信息 -->
      <div style="margin: 10px 0 10px 50px;text-align: left;">
        <h1>&lt;&lt;&nbsp;&nbsp;{{OneData.name}}&nbsp;&nbsp;>></h1>
        <h1 style="font-weight:bolder;color: red;">&nbsp;{{OneData.price}}元</h1>
        <p>{{OneData.info}}</p>
        <div style="margin: 100px 0 40px 0;display: flex;" class="mc2">
          <el-button size="medium" type="warning"  style="color:white;" @click="addtobuylist">加入购物车</el-button>
          <el-input-number style="top: 0px;font-size: larger;margin-left: 40px;" v-model="product.num" :min="1" :max="OneData.num" label="数量">
          </el-input-number>
          <div style="padding: 40px 0 0 20px;color: #00000060;">库存：{{OneData.num}}</div>
        </div>
        <h4 style="">上架日期：{{ OneData.create_time.replace(/T/g, " ") }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    return{
      OneData:{
        photo:'load',
        create_time:1
      },
      IsTableLoading:true,
      product:{
        num:0
      }
    }
  },
  methods:{
    // 初始化加载
    test(){
      console.log(this.$route.query.id)
      axios.get(`product/getone?id=${this.$route.query.id}`).then(response=>{
        this.OneData = response.data.data
        this.IsTableLoading = false
        console.log(response)
      }).catch(error=>{
        console.log(error)
        this.$router.push('/404?msg=商品未找到')
      })
    },
    addtobuylist(){
      axios.post('buylist/add',{
        product_num:this.product.num,
        product_id:this.$route.query.id
      }).then(response=>{
        if(response.data.code===0)this.$message.error(response.data.msg)
        else {
          this.$message.success(response.data.data)
          //this.$router.push('/user/login')
        }
        console.log(response)
      }).catch(error=>{
        this.$message.error(error.data.msg);
        console.log(error)
      })
    }
  },
  created(){
    this.test()
  }
}
</script>

<style scoped>
  .myborder {
  border-radius: 5px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.el-button--medium {
    padding: 20px 40px;
    font-size: 24px;
    border-radius: 4px;
}
.el-button--warning {
    color: #FFF;
    background-color:darkorange;
    border-color: darkorange;
}
.el-button--warning:hover {
    color: #FFF;
    background-color:rgba(255, 140, 0, 0.647);
    border-color: rgba(255, 140, 0, 0.647);
}
</style>

<style>
.mc2 .el-input__inner{
  height: 65px;
  padding: 0;
}
.mc2 .el-input-number__decrease,.mc2 .el-input-number__increase{
  width: 40px;
  height: 63px;
  position: absolute;
  top:1px;
}

.mc2 .el-input-number {
  line-height: 65px;
  width:130px;
}
</style>