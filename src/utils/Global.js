export default {
  methods: {
    getMatUrl (url) {
      if (!url) {
        return ''
      } else if (/^http/.test(url)) {
        return url
      } else if (/^\/storage\/view/.test(url)) {
        //测试&正式环境用
        //return `${location.origin}${process.env.VUE_APP_IMAGE_API}${url}`
        //本地调试时调用测试环境图片
        return "https://test.saas.yuemia.com/roche/jsq/admin/api"+url;
      }
    },
  }  
}