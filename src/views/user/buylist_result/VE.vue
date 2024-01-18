<template>
  <div>
    <h1>购物车结算</h1>
    <div style="margin: 50px 100px;" class="myborder">
      <h3 style="text-align:left;margin-left:30px;">确认收货信息</h3> 
      <E2 style="text-align:left;margin-left:20px;margin-bottom:20px;"></E2>
    </div>
    <div style="margin: 50px 100px;" class="myborder">
      <h3 style="text-align:left;margin-left:30px;">确认订单信息</h3> 
    </div>
  </div>
</template>

<script>
import E2 from '@/components/ElAddress2.vue'

export default {
  components:{
    E2
  },
  data() {
    return{

    }
  },
  methods:{

  },
  mounted() {

  },
  created(){

  }
}
</script>

<style scoped>

</style>
