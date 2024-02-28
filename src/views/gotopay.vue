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
    if(sessionStorage.getItem('StopRedirectPay')==='false'){
      this.show = true
    }else{
      this.show = false
    }
    
    // 假设这里是你获取URL参数的代码
    const id = this.$route.query.id;
    const money = this.$route.query.money;
    const num = this.$route.query.num;
    const name = this.$route.query.name;

    if(sessionStorage.getItem('StopRedirectPay')==='false'){
      // 设置延时跳转
      setTimeout(() => {
        // 防止重复跳转
        sessionStorage.setItem('StopRedirectPay',"true")
        window.location.href = `http://localhost:8002/test/pay?outTradeNo=${id}&totalAmount=${money}&subject="${name}等${num}件商品"`;
        }, 500); // 500毫秒后跳转
    }else{
      this.$message("勿重复跳转，请从订单页重新发起")
    }

      
  }
}
</script>

<style scoped>

</style>
