<template>
  <div>
    
    <!-- 电脑 -->
    <div v-if="!this.$store.state.IsMobile">
      
      <div style="width: 80%;margin: 50px auto;display: flex;" class="myborder">
        <!--图 -->
        <div>
          <img loading="lazy"  :src="require(`@/assets/${OneData.photo}.webp`)" class="myborder" style="height:320px;width: 320px;object-fit:cover;margin: 30px 100% 30px 30px;">
        </div>
        <!--信息 -->
        <div style="margin: 10px 0 10px 50px;text-align: left;">
          <h1>&lt;&lt;&nbsp;&nbsp;{{OneData.name}}&nbsp;&nbsp;>></h1>
          <h1 style="font-weight:bolder;color: red;"><span style="font-size: x-large;">¥</span>&nbsp;{{OneData.price}}</h1>
          <p>{{OneData.info}}</p>
          
          <!-- 评分 -->
          <div style="margin-top: 30px;">
            <span style="margin: 10px 0px 10px -2px;color: #00000060;">商品评分：</span>
            <van-rate v-model="mobile.rate_click_value" allow-half void-icon="star" void-color="#eee" @change="rateonChange" />
            <span style="font-size: small;margin: -100px 0px 0px 10px;color: #00000060;">({{mobile.rate_value?mobile.rate_value:0}}分,{{mobile.rate_num}}人评价)</span>
          </div>

          

          <!-- 其他 -->
          <div style="margin: 100px 0 40px 0;display: flex;" class="mc2">
            <el-button size="medium" type="warning" style="color:white;width:200px;" @click="addtobuylist">加入购物车</el-button>
            <el-button size="medium"  style="color:white;background-color: red;width:200px;" @click="direct_buy">直接购买</el-button>
            <el-input-number style="top: 0px;font-size: larger;margin-left: 40px;" v-model="product.num" :min="1" :max="OneData.num" label="数量">
            </el-input-number>

            <div style="display: flex;color: #00000060;padding: 40px 0 0 20px;" class="mc2">
              <div>库存：{{OneData.num}}</div> <div style="margin-left: 20px;">浏览量：{{OneData.visited_num}}</div> <div style="margin-left: 20px;">销量：{{OneData.sold_num}}</div>
            </div>
            
          </div>
          <h4 style="">上架日期：{{ OneData.create_time.replace(/T/g, " ") }}</h4>
        </div>
      </div>

      <!--评价 -->
      <div style="width:80%;text-align: left;margin: 10px auto;background-color: white;padding-left: 10px;" class="myborder">
        <h3>商品评论</h3>
        <div style="margin: 10px 10px 10px 10px;color: #00000060;">暂无评论</div>
      </div>

    </div>

    <!-- 手机 -->
    <div v-else>

      <!--图 -->
      <div>
        <img @click="$openURL(require(`@/assets/${OneData.photo}.webp`))" loading="lazy"  :src="require(`@/assets/${OneData.photo}.webp`)"  style="height:90%;width: 100%;object-fit:cover;cursor: pointer;">
      </div>

      <!--信息 -->
      <div style="width:90%;text-align: left;margin: 5px auto;background-color: white;padding-left: 10px;" class="myborder">
        <h1 style="font-weight:bolder;color: red;margin: 10px 0 10px 0;"><span style="font-size:x-large;margin-right: 2px;">¥</span>{{OneData.price}}</h1>
        <h2 style="margin-top: -15px;">{{OneData.name}}&nbsp;&nbsp;</h2>
        <p style="margin-top: -10px;">{{OneData.info}}</p>
        <div style="display: flex;color: #00000060;" class="mc2">
          <div>库存：{{OneData.num}}</div> <div style="margin-left: 20px;">浏览量：{{OneData.visited_num}}</div> <div style="margin-left: 20px;">销量：{{OneData.sold_num}}</div>
        </div>
        <p style="margin: 10px 0 10px -2px;color: #00000060;">上架日期：{{ OneData.create_time.replace(/T/g, " ") }}</p>
        <span style="margin: 10px 0px 10px -2px;color: #00000060;">商品评分：</span>
        <van-rate v-model="mobile.rate_click_value" allow-half void-icon="star" void-color="#eee" @change="rateonChange" />
        <span style="font-size: small;margin: -100px 0px 0px 10px;color: #00000060;">({{mobile.rate_value?mobile.rate_value:0}}分,{{mobile.rate_num}}人评价)</span>
      </div>

      <!--评价 -->
      <div style="width:90%;text-align: left;margin: 10px auto;background-color: white;padding-left: 10px;" class="myborder">
        <h3>商品评论</h3>
        <div style="margin: 10px 10px 10px 10px;color: #00000060;">暂无评论</div>
      </div>

      <!--防被下栏挡 -->
      <div style="height: 60px;width: 100%;"></div>

      <!--商品下栏 -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon(1)"/>
        <van-goods-action-icon v-if="mobile.TotalBuylistNum" icon="cart-o" text="购物车" :badge="mobile.TotalBuylistNum" @click="onClickIcon(2)"/>
        <van-goods-action-icon v-else icon="cart-o" text="购物车" @click="onClickIcon(3)"/>
        <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon(4)"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickIcon(5)"/>
        <van-goods-action-button type="danger" text="立即购买" @click="onClickIcon(6)"/>
      </van-goods-action>

      <!--点加购弹出 -->
      <van-popup v-model="mobile.show" position="bottom" style=" height: 70% ;" closeable>
        
        <!--图 价 -->
        <div style="margin: 7%;display: flex;justify-content: flex-start; /* 左对齐 */">
          <img @click="$openURL(require(`@/assets/${OneData.photo}.webp`))"  loading="lazy"  :src="require(`@/assets/${OneData.photo}.webp`)"  style="height:30%;width: 30%;object-fit:cover;border-radius: 10px;">
          <div style="margin:12% 0 0 5%;">
            <h4 style="text-align: left;font-weight:bolder;color: red;margin:0"><span style="font-size:medium;margin-right: 2px;">¥</span>{{OneData.price}}</h4>
            <div style="background-color: red;border-radius: 15px;margin-top: -10px;">
              <p style="padding: 5px 10px;color: white;font-size: smaller;">预估到手<strong>¥{{OneData.price}}</strong></p>
            </div>
          </div>
        </div>

        <h6 style="text-align: left;margin: 7% 7% 5% 7%;">
          尺码
        </h6>

        <!--选购参数 -->
        <div style="margin: 2%;display: flex;justify-content: flex-start;">
          <div :style="mobile.activeIndex===1?mobile.selected_style:mobile.unselected_style"
          @click="mobile.activeIndex = 1">
            <p style="padding: 0;margin: 8px 15px;font-size: smaller;">{{OneData.name}}</p>
          </div>

          <div :style="mobile.activeIndex===2?mobile.selected_style:mobile.unselected_style"
          @click="mobile.activeIndex = 2">
            <p style="padding: 0;margin: 8px 15px;font-size: smaller;">{{OneData.name}}-B款</p>
          </div>
        </div>

        <!--数量 -->
        <h6 style="text-align: left;margin: 7% 7% 5% 7%;">
          数量
          <el-input-number size="mini" style="border-color: none;float:inline-end;top: 0px;font-size: larger;margin-left: 40px;" v-model="product.num" :min="1" :max="OneData.num" label="数量">
          </el-input-number>
        </h6>

        


        <!--确定 -->
        <div @click="addtobuylist" style="position: absolute;bottom: 0;width: 90%;color: white;background-color:red;border-radius: 25px;margin: 0 5% 2% 5%;">
          <div style="font-size: smaller;padding: 10px 0;">确定</div>
        </div>

      </van-popup>


    </div>



  </div>
</template>

<script>
import axios from '@/utils'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Dialog } from 'vant';
import { Popup } from 'vant';
import { Toast } from 'vant';
import { Rate } from 'vant';


export default {
  components: {
    'van-goods-action': GoodsAction,
    'van-goods-action-icon': GoodsActionIcon,
    'van-goods-action-button': GoodsActionButton,
    'van-popup': Popup,
    'van-rate': Rate,
  },
  data() {
    return{
      OneData:{
        photo:'load',
        create_time:1
      },
      IsTableLoading:true,
      product:{
        num:0
      },
      mobile:{
        TotalBuylistNum:0,
        show:false,
        activeIndex:1,
        unselected_style:"color: black;border: 1px solid white;background-color:ghostwhite;border-radius: 15px;display: inline-block;margin-left: 5%;",
        selected_style:"color: red;border: 1px solid red;background-color:ghostwhite;border-radius: 15px;display: inline-block;margin-left: 5%;",
        direct_buy:false,
        Datas:[],
        rate_click_value:null,
        rate_value:null,
        rate_num:null
      }
    }
  },
  methods:{
    // 手机-商品评分
    rateonChange(value) {
      if(!this.$store.state.IsLogin)
        return Toast.fail("请登录后评分")

      Toast('当前值：' + value)

      // 手机
      Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0, // 持续展示 toast，直到被明确关闭
        });


      // 给商品评分
      axios.post('product-rate/add-or-update',{
        product_id:this.$route.query.id,
        rate:this.mobile.rate_click_value
      }).then(response=>{
        if(response.data.code===0){
          Toast.clear();
          Toast.fail(response.data.msg)
        }
        else {
          Toast.clear();
          Toast.success(response.data.data)
          //this.$router.push('/user/login')
        }
        console.log(response)
      }).catch(error=>{
        Toast.clear();
        Toast.fail(error.data.msg);
        console.log(error)
      })

    },
    // 手机端点击下栏
    onClickIcon(val){
      console.log(val)
      // 1 客服 2 购物车 4 店铺 5 加购 6 立即购买
      if(val === 4)this.$router.push('/home')
      else if(val === 2){
        this.$router.push('/user/buylist')
      }
      else if(val === 5){
        this.mobile.show = true
        this.mobile.direct_buy = false
      }
      else if(val === 6){
        this.mobile.show = true
        this.mobile.direct_buy = true
      }
      else Dialog.alert({message: "<h3>comming soon</h3>"})
    },
    // 初始化加载
    test(){
      console.log(this.$route.query.id)
      axios.get(`product/getone?id=${this.$route.query.id}`).then(response=>{
        if(response.data.data===null)this.$router.push('/404?msg=商品未找到')
        this.OneData = response.data.data
        this.IsTableLoading = false
        this.mobile.rate_value = response.data.map.rate_value
        this.mobile.rate_click_value = response.data.map.rate_value
        this.mobile.rate_num = response.data.map.rate_num
        console.log(response)
      }).catch(error=>{
        console.log(error)
        this.$router.push('/404msg=商品未找到')
      })
      // 获取购物车数量
      this.getbuylist()
    },
    addtobuylist(){
      if(!this.$store.state.IsMobile)
        // 电脑
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
      else{
        // 手机
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0, // 持续展示 toast，直到被明确关闭
        });

        if(this.mobile.direct_buy){
          // 直接购买
          this.direct_buy()
        }else{
          // 加购物车
          axios.post('buylist/add',{
            product_num:this.product.num,
            product_id:this.$route.query.id
          }).then(response=>{
            if(response.data.code===0){
              Toast.clear();
              Toast.fail(response.data.msg)
            }
            else {
              Toast.clear();
              Toast.success(response.data.data)
              this.getbuylist()
              this.mobile.show = false
              //this.$router.push('/user/login')
            }
            console.log(response)
          }).catch(error=>{
            Toast.clear();
            Toast.fail(error.data.msg);
            console.log(error)
          })
        }
      }
        

    },
    // 手机-立刻购买
    direct_buy(){
      if(this.OneData.num === 0){
        Toast.fail('库存不足')
        return
      }
      console.log("直接购买，不加购")
      var buylist = {
                    "id": null,
                    "user_id": null,
                    "product_id": this.$route.query.id,
                    "create_time": null,
                    "product_num": this.product.num,
                    "is_selected": false
                }
      var product = this.OneData
      this.mobile.Datas = [
        {
          buylist,
          product
        }
      ]
      console.log(this.mobile.Datas)
      Toast.clear();
      this.$router.push({name:"userbuylist_result",params:{datas:this.mobile.Datas}})
    },
    // 拿购物车（这里只是为了获取购物车数量）
    getbuylist(){
      axios.get('/buylist/page',{
        params: {
          currentPage: 1,
          PageSize: 10
        }
      }).then(response=>{
        if(response.data.code===0)this.$message.error(response.data.msg)
        else {
          this.mobile.TotalBuylistNum = response.data.data.total
          //this.$message.success("获取成功")
        }
      }).catch(error=>{
        this.$message.error(error.data.msg)
        console.log(error)
      })
    },
  },
  created(){
    this.test()
  },
  mounted(){
    this.$store.state.PAGE_STATE = ""
  },
  beforeDestroy(){
    this.$store.state.PAGE_STATE = "Tabbar"
  }
}
</script>

<style scoped>

.red-border {
  border: 1px solid red;
  color: red;
}

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
.el-input-number__increase, .el-input-number__decrease, .el-input-number .el-input__inner {
  /* 覆盖Element UI默认的聚焦边框颜色 */
  border-color: transparent !important;
}

.el-input-number__increase:focus, .el-input-number__decrease:focus, .el-input-number .el-input__inner:focus {
  /* 确保在聚焦状态下边框颜色被移除 */
  border-color: transparent !important;
  /* 移除外边框阴影 */
  box-shadow: none !important;
  /* 如果还有其他聚焦效果，也在这里移除 */
  outline: none !important;
}

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