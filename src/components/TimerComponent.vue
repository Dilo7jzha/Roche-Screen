<template>
  <div>
    <h1>timer</h1>
  </div>
</template>

<script>
export default {
  name: 'TimerComponent',
  data() {
    return {
      timer: null, // 用于存储定时器的ID
    };
  },
  methods: {
    startTimer() {
      // 设置一个60秒的定时器
      this.timer = setTimeout(() => {
        alert('6 seconds passed');
        // 定时器触发后，再次调用startTimer方法以循环定时器
        this.startTimer();
      }, 60000); // 60000 毫秒 = 60 秒
    },
  },
  mounted() {
    // 在组件挂载时启动定时器
    this.startTimer();
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，防止内存泄漏
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
};
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>