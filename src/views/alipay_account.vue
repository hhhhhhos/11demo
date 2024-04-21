<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <br><br><br>
    <p>
      <strong>支付宝沙箱测试账户:</strong>chhmyv5582@sandbox.com
    </p>
    <p>
      <strong>登录密码:</strong>111111
    </p>
    <p>
      <strong>支付密码:</strong>111111
    </p>
    <p>
      沙箱环境无法登录正常账户
    </p>

    
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return{
    }
  },
  methods:{

  },
  mounted(){
    // 假设这里是你获取URL参数的代码
    const id = this.$route.query.id;
    const money = this.$route.query.money;
    const num = this.$route.query.num;
    const name = this.$route.query.name;

    
    setTimeout(() => {
      window.open(this.$router.resolve(`/gotopay?id=${id}&money=${money}&num=${num}&name=${name}`).href, '_blank');
      }, 500); // 1000毫秒后跳转
  }
}
</script>

<style scoped>

</style>
