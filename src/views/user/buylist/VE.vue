<template>
  <div>
    <h1>用户购物车</h1>
    <div style="margin: 50px 100px;" class="myborder">
      <ElTable_buylist :columns="columns1" :geturl="geturl"/>  
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
        { prop: 'user_id', label: '用户ID', width: '100' },
        { prop: 'product_id', label: '商品ID', width: '100' },
        { prop: 'product_photo', label: '商品图', width: '180' },
        { prop: 'product_name', label: '商品名', width: '180' },
        { prop: 'product_num', label: '购买数量' , width: '120' },
        { prop: 'product_price', label: '价格', width: '100' },
        { prop: 'create_time', label: '创建时间', width: '180' },
        { label: '操作' }
      ],
      geturl:'/buylist/page'
    }
  }
}
</script>

<style scoped>

</style>

