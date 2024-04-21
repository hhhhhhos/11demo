<template>
  <div style="margin-top: 0;padding-top: 0;margin-bottom: 50px;">
    
    <!-- 电脑 -->
    <div v-if="!this.$store.state.IsMobile" class="desktop">
      <el-carousel :style="'height:'+ this.$store.state.CURRENT_HEIGHT*0.4 +'px;'">
        <el-carousel-item :style="'height:'+ $store.state.CURRENT_HEIGHT*0.4 +'px;'" v-for="item in 4" :key="item">
          <img :src="require(`@/assets/B${item}.webp`)" style="object-fit: cover;cursor: pointer;height: 100%;" @click="goto4399">
        </el-carousel-item>
      </el-carousel>
      <el-menu style="background-color: white;padding:0 80px;" :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
        <div v-if="tableData.length!==0" v-loading="IsTableLoading" style="display: flex;flex-wrap: wrap;margin:50px auto;justify-content: space-around;">
          <!-- 商品卡 -->
          <div v-for="(product, index) in tableData" @click="cardclick(product.id)"
            :key="index" class="myborder" style="width:220px;height:190px;display:block;cursor: pointer;margin:30px;background-color: white;padding-top: 8px;" >
            <img :src="require(`@/assets/${product.photo}.webp`)" style="height:120px;width:200px;object-fit: cover;border-radius: 5px;">
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
        <div v-else>
          <div style="margin: 50px 0 50px 0;color: gainsboro;">无结果</div>
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

    
    <!-- 手机 -->
    <div v-else style="">

      <div style="height:80px;display: flex;align-items: center;justify-content: center;background-color:#ffffff;"  >
        <Search
          style="width: 90%;"
          v-model=input
          shape="round"
          background="#ffffff"
          placeholder="请输入搜索关键词"
          @search="clicksearch"
        />
      </div>

      
      <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <SwipeItem v-for="item in 4" :key="item" style="display: flex; justify-content: center; align-items: center;height: 170px;background-color: rgb(248,248,248);">
          <img :src="require(`@/assets/B${item}.webp`)" style="object-fit:cover;height:100%;cursor: pointer;" @click="goto4399">
        </SwipeItem>
      </Swipe>
    
      <Tabs v-model="activeIndex2" style="margin-top: 0;" @click="handleSelect" animated swipeable>
        <Tab title="首页"></Tab>
        <Tab title="家电"></Tab>
        <Tab title="食物"></Tab>
        <Tab title="成人用品"></Tab>
      </Tabs>

      <div v-loading=this.IsTableLoading style="min-height: 100px;">
        <div style="margin: 20px 5px 10px 5px;" v-for="(product, index) in tableData" @click="cardclick(product.id)"
              :key="index">
          <Card
            style="border-radius: 10px; overflow: hidden;background-color: white;"
            :num=product.num
            :price=product.price
            :desc=product.info
            :title=product.name
            :thumb="require(`@/assets/${product.photo}.webp`)"
          />
        </div>
    
        <div v-if=!this.IsTableLoading style="margin: 20px 0 60px 0;">
          <Pagination v-model="currentPage" :total-items="TotalPage" :items-per-page="PageSize" />
        </div>

      </div>
    
    </div>

  </div>
</template>

<script>
import axios from '@/utils'
import { Swipe, SwipeItem } from 'vant';
import { Search,Card,Tabs,Tab,Pagination } from 'vant';

export default {
  components:{
    Swipe,
    SwipeItem,
    Search,
    Card,
    Tabs,
    Tab,
    Pagination
  },
  data() {
    return{
      activeIndex1:null,
      activeIndex2:'0',
      input:null,
      product:{
        id:1,
        name:"测试",
        price:999,
        photo:'p1.webp',
        create_tiem:"2022-12-2"
      },
      currentPage:1,
      PageSize:8,
      tableData:[],
      TotalPage:0,
      IsTableLoading:true,
      FName:null,
      FType:null,
      }
  },
  methods:{
    adjustArrowPosition() {
      console.log('adjustArrowPosition')
      // 使用类名选择器找到所有的箭头元素
      const arrows = document.querySelectorAll('.el-carousel__arrow');
      
      arrows.forEach(arrow => {
        // 动态计算并设置箭头的位置
        // 例如，根据某个元素的尺寸或直接使用计算好的值
        arrow.style.top = `${this.$store.state.CURRENT_HEIGHT * 0.15}px`;
      });
    },
    // 点商品分类
    handleSelect(key) {
      console.log(key)
      this.FType = key
      if(key==="0"||key===0)this.FType=null
      this.currentPage = 1
      this.getproduct()

    },
    // 拿页
    getproduct(){
      this.tableData = []
      this.IsTableLoading = true
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

    },
    // mobile
    mobileTagonClick(val1){
      console.log(val1)
    }

  },
  created(){
    this.getproduct()
    //sessionStorage.setItem('Time',new Date().getTime())
    //console.log(sessionStorage.getItem('Time'))
  },
  watch:{
      // 移动端触发翻页
      currentPage:function(){
        // 不是手机不运行
        if(!this.$store.state.IsMobile)return        
        this.handleCurrentChange(this.currentPage)    
    }
  },
  mounted() {
    this.adjustArrowPosition();
    // 监听窗口resize事件，以便动态调整
    window.addEventListener('resize', this.adjustArrowPosition);
  },
  beforeDestroy() {
    // 组件销毁时移除事件监听器
    window.removeEventListener('resize', this.adjustArrowPosition);
  }
}
</script>

<style scoped>
  .el-carousel__arrow {
    top: 50%;
}


  .desktop .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .mobile .el-carousel__item h3 {
    color: #694747;
    font-size: 18px;
    opacity: 0.75;
    line-height: 30px;
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
