<template>
  <div class='test-main'>
    <div id='container'>
      <a class='btn btn-default btn-lg ' id='pickfiles' href='#'>
        <span>选择文件</span>
      </a>
    </div>
    <input id='urlText' type='text' value='' />
  </div>
</template>
<script>
// /* eslint-disable */
// import { fetch } from '../../common/fetch'
// export default {
//   data () {
//     return {
//       retrunFile: '',
//       uploader: ''
//     }
//   },
//   mounted () {
//     var _this = this
//     _this.data()
//   },
//   methods: {
//     async data () {
//       var _this = this
//       var res = await _this.getKey()
//       console.log(res.data)
//       _this.uploaderReady(res.data)
//       document.getElementById('pickfiles').onclick = function () {
//         _this.uploader.start()
//       }
//     },
//     uploaderReady (token) {
//       var _this = this
//       // 引入Plupload 、qiniu.js后
//        _this.uploader = Qiniu.uploader({
//         runtimes: 'html5,flash,html4', // 上传模式,依次退化
//         browse_button: 'pickfiles', // 上传选择的点选按钮，**必需**
//         uptoken: token, // 这里的token是AJAX得到的

//         // uptoken_url: '/token', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
//         // uptoken: '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
//         save_key: false, // save_key: true, // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
//         domain: 'http://image.bblink.cn', // bucket 域名，下载资源时用到，这个可以到自己的七牛空间里找到具体url，**必需**
//         get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的token
//         container: 'container', // 上传区域DOM ID，默认是browser_button的父元素，
//         max_file_size: '4mb', // 最大文件体积限制
//         flash_swf_url: 'Moxie.swf', // 引入flash,相对路径
//         max_retries: 3, // 上传失败最大重试次数
//         dragdrop: true, // 开启可拖曳上传
//         drop_element: 'container', // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
//         chunk_size: '10mb', // 分块上传时，每片的体积
//         auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
//         unique_names: false, // unique_names: true,
//         filters: { // 对上传文件类型进行限制
//           mime_types: [
//             {title: 'Image files', extensions: 'jpg,gif,png' },
//             {title : "flv files", extensions : "flv"}, // 限定flv后缀上传格式上传
//             {title : "Video files", extensions : "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
//             {title : "RAR files", extensions : "rar,zip,tar.gz"},
//             {title: "Word文档", extensions: "doc,docx,txt,pdf" },
//             {title: 'excel 文档', extensions: 'xls,xlsx' }
//           ],
//           max_file_size: '500mb',
//           prevent_duplicates: false
//         },
//         init: {
//           'FilesAdded': function (up, files) {
//             plupload.each(files, function (file) {
//               // 文件添加进队列后,处理相关的事情
//               console.log(file.name)
//             })
//           },
//           'BeforeUpload': function (up, file) {
//             // 每个文件上传前,处理相关的事情
//           },
//           'UploadProgress': function (up, file) {
//             // 每个文件上传时,处理相关的事情
//           },
//           'FileUploaded': function (up, file, info) {
//             // 每个文件上传成功后,处理相关的事情
//             // 其中 info 是文件上传成功后，服务端返回的json，形式如
//             // {
//             // 'hash': 'Fh8xVqod2MQ1mocfI4S4KpRL6D98',
//             // 'key': 'gogopher.jpg'
//             // }
//             // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

//             var domain = up.getOption('domain')
//             var res = JSON.parse(info)
//             var sourceLink = domain + '/' + res.key // 获取上传成功后的文件的Url
//             document.getElementById('urlText').value = sourceLink// 将url展示到jsp input标签中
//           },
//           'Error': function (up, err, errTip) {
//             // 上传出错时,处理相关的事情
//           },
//           'UploadComplete': function () {
//             // 队列文件处理完毕后,处理相关的事情
//           },
//           'Key': function (up, file) {
//             // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
//             // 该配置必须要在 unique_names: false , save_key: false 时才生效
//             // key就是上传的文件路径
//             var key = ''
//             // 获取年月日时分秒
//             var date = new Date()
//             var year = date.getFullYear()
//             var month = date.getMonth() + 1
//             var day = date.getDate()
//             var hour = date.getHours()
//             var minute = date.getMinutes()
//             var second = date.getSeconds()
//             key += year + '_' + month + '_' + day + '_' + hour + minute + second + '_'
//             console.log('文件路径：' + file.name)
//             key += file.name
//             return key
//           }
//         }
//       })
//     },
//     getKey () {
//       return fetch({
//         url: '/crm/upload/getUpToken',
//         method: 'get',
//         params: {
//         },
//         success: function (res) {
//           return res
//         },
//         fail: function (err) {
//           console.log(err)
//         }
//       })
//     }
//   }
// }
</script>
