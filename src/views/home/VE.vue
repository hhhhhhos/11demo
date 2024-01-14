<template>
  <div style="margin-top: 0;padding-top: 0;margin-bottom: 50px;">
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <img :src="require(`@/assets/B${item}.webp`)" style="object-fit: cover;cursor: pointer;" @click="goto4399">
      </el-carousel-item>
    </el-carousel>
    <el-menu style="background-color:rgb(248,248,248);padding:0 80px;" :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">首页</el-menu-item>
      <el-menu-item index="1">家电</el-menu-item>
      <el-menu-item index="2">食物</el-menu-item>
      <el-menu-item index="3">成人用品</el-menu-item>
      <div style="float:right">
        <el-input style="width:200px;padding:10px;" v-model="input" placeholder="请输入内容"></el-input>
        <el-button @click="clicksearch" round>搜索</el-button>
      </div>
    </el-menu>
    <!-- 左右间距 -->
    <div style="margin:0 auto;width:80%;">
      <!-- 商品架 -->
      <div style="display: flex;flex-wrap: wrap;margin:50px auto;justify-content: space-around;">
        <!-- 商品卡 -->
        <div v-for="(product, index) in tableData" @click="cardclick(product.id)"
          :key="index" class="myborder" style="width:220px;height:190px;display:block;cursor: pointer;margin:30px;" >
          <img :src="require(`@/assets/${product.photo}.jpg`)" style="height:120px;width:200px;object-fit: cover;">
          <div style="padding:8px">
            <div>
              {{ product.name }}
            </div>
            <div style="margin-top:8px;color:red;font-weight:bold;">
              {{ product.price }}元
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8, 16, 24]"
        :page-size=PageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total="TotalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    return{
      activeIndex1:null,
      activeIndex2:'0',
      input:null,
      product:{
        id:1,
        name:"测试",
        price:999,
        photo:'p1.jpg',
        create_tiem:"2022-12-2"
      },
      currentPage:1,
      PageSize:8,
      tableData:[],
      TotalPage:null,
      IsTableLoading:true,
      FName:null,
      FType:null
    }
  },
  methods:{
    // 点商品分类
    handleSelect(key) {
      console.log(key)
      this.FType = key
      if(key==="0")this.FType=null
      this.getproduct()

    },
    // 拿页
    getproduct(){
      axios.get('product/page',{
        params: {
          currentPage: this.currentPage,
          PageSize: this.PageSize,
          FName:this.FName,
          FType:this.FType
        }
      }).then(response=>{
        this.tableData = response.data.data.records
        this.TotalPage = response.data.data.total
        this.IsTableLoading = false
        console.log(response)
      }).catch(error=>{
        console.log(error)
      })
    },
    // 点商品
    cardclick(id){
      console.log("clicked")
      this.$router.push(`/product?id=${id}`)
    },
    goto4399(){
      console.log(4399)
      window.open('https://www.4399.com', '_blank');
    },
    // 页容量变化
    handleSizeChange(val) {
      this.PageSize = val
      this.getproduct()
    },
    // 切页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getproduct()
    },
    // 点搜索
    clicksearch(){
        this.FName = this.input
        this.getproduct()
        this.$message.success('已发起搜索');

    }
  },
  created(){
    this.getproduct()
    //sessionStorage.setItem('Time',new Date().getTime())
    //console.log(sessionStorage.getItem('Time'))
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .myborder {
  border-radius: 5px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
