<template>
  <div>
    <h1>用户购物车</h1>
    <div style="margin: 50px 100px;" class="myborder">
      <ElTable_buylist @SelectRow="selectrow" :columns="columns1" :geturl="geturl"/>  
    </div>
    <div style="margin: 20px 100px 70px 100px;padding: 10px 0;display: flex;justify-content: right;" class="myborder">
      <div style="margin: 8px 20px 0 200px;">合计：¥ {{ TotalPrice }}</div>
      <el-button type="danger" round style="margin:0 100px 0 200px;" @click="gotoresult">结算</el-button>
    </div>
  </div>
</template>

<script>
import ElTable_buylist from '/src/components/ElTable_buylist'

export default {
  components: {
    ElTable_buylist
  },
  data() {
    return{
      columns1 : [
        { prop: 'id', label: 'ID', width: '100' },
        //{ prop: 'user_id', label: '用户ID', width: '100' },
        //{ prop: 'product_id', label: '商品ID', width: '100' },
        { prop: 'photo', label: '商品图', width: '180' },
        { prop: 'name', label: '商品名' },
        { prop: 'product_num', label: '购买数量' , width: '120' },
        { prop: 'price', label: '价格', width: '100' },
        { prop: 'create_time', label: '创建时间', width: '180' },
        { label: '操作' , width: '180'}
      ],
      geturl:'/buylist/page',
      TotalPrice:0
    }
  },
  methods:{
    // 根据emit更新价格
    selectrow(datas){
      this.TotalPrice = 0
      datas.forEach(data=>{
        this.TotalPrice += data.product.price*data.buylist.product_num
      })
    },
    // 跳转结算页
    gotoresult(){
      if(this.TotalPrice===0)this.$message.error("未选择商品")
      else this.$router.push("/user/buylist_result")
    }
  }
}
</script>

<style scoped>

</style>

