<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <br><br><br>
    <p v-if="show">正在跳转支付宝支付页，请稍等……</p>
    <p v-else>勿重复跳转，请从订单页重新发起</p>
    <router-view/>

  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return{
      show:true
    }
  },
  methods:{
  },
  mounted(){
    // 显不显示跳转
    if(sessionStorage.getItem('StopRedirectPay')==='false'|| sessionStorage.getItem('StopRedirectPay')===null){
      this.show = true
    }else{
      this.show = false
    }
    
    // 假设这里是你获取URL参数的代码
    const id = this.$route.query.id;
    const money = this.$route.query.money;
    const num = this.$route.query.num;
    const name = this.$route.query.name;

    if(this.show){
      // 设置延时跳转
      setTimeout(() => {
        // 防止重复跳转
        sessionStorage.setItem('StopRedirectPay',"true")

        // 电脑网页版扫码支付 手机困难
        if(!this.$store.state.IsMobile)window.location.href = `${process.env.VUE_APP_API_URL}test/pay?outTradeNo=${id}&totalAmount=${money}&subject="${name}等${num}件商品"&productCode=FAST_INSTANT_TRADE_PAY`;
        // 手机支付 productCode=QUICK_WAP_WAY
        else window.location.href = `${process.env.VUE_APP_API_URL}test/pay?outTradeNo=${id}&totalAmount=${money}&subject="${name}等${num}件商品"&productCode=QUICK_WAP_WAY`;
      
      }, 500); // 500毫秒后跳转
    }else{
      this.$message("勿重复跳转，请从订单页重新发起")
    }

      
  }
}
</script>

<style scoped>

</style>
