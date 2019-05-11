<template>
  <div class="components-container">
    <pan-thumb :image="image"/>

    <el-button type="primary" icon="upload" style="bottom: 12px;margin-left: 40px" @click="ChangeAvatar()">Change Avatar
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :width="300"
      :height="300"
      :params="params"
      :key="imagecropperKey"
      url="http://upload.qiniup.com/"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"/>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { getQiniuToken } from '@/api/personalinfo'

export default {
  name: 'AvatarUpload',
  components: { ImageCropper, PanThumb },
  props: {
    userinfo: {
      type: Object,
      'default': null
    }
  },
  data() {
    return {
      token: '',
      temp_parem: {},
      params: {
        token: ''
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      image: ''
    }
  },
  created() {
    this.image = this.userinfo.avatar
  },
  methods: {
    ChangeAvatar() {
      this.imagecropperShow = true
      getQiniuToken().then(res => {
        this.params.token = res.data.token
      })
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.image = 'http://ccmanito.cn/' + resData.key // 临时域名
      this.temp_parem.avatar = 'http://ccmanito.cn/' + resData.key
      this.temp_parem.token = this.userinfo.token
      this.$store.dispatch('SyncAvatar', this.temp_parem).then(() => {
        console.log('执行异步刷新用户信息')
      }).catch(() => {
        //
      })
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    /* margin: 20px; */
    border-radius: 50%;
  }
</style>

