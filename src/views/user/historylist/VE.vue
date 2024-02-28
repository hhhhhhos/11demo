<template>
  <div>
    <h1>历史订单</h1>
    <div style="margin: 50px 100px 150px 100px;" class="myborder">
      <ElTable1  :columns="columns1" :geturl="geturl"/>  
    </div>
  </div>
</template>

<script>
import ElTable1 from '/src/components/ElTable1'

export default {
  components: {
    ElTable1
  },
  data() {
    return{
      columns1 : [
        { prop: 'id', label: '订单ID', width: '180' },
        //{ prop: 'user_id', label: 'ID2', width: '180' },
        { prop: 'totalMoney', label: '总额', width: '120',align:'center'},
        { prop: 'totalNum', label: '件数', width: '80' ,align:'center'},
        //{ prop: 'address.info', label: '地址', width: '180' ,align:'center'},
        { prop: 'info', label: '信息' ,align:'center'},
        { prop: 'create_time', label: '时间', width: '180',align:'center'},
        { prop: 'status', label: '状态', width: '100',align:'center' },
        { prop: 'operate', label: '操作', width: '100',align:'center' }
      ],
      geturl:'/order/page'
    }
  },
  mounted(){
    console.log(sessionStorage.getItem('StopRedirectPay'))
  }
}
</script>

<style scoped>

</style>
