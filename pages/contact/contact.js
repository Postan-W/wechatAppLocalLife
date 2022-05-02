// pages/contact/contact.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        colorList:[],
        isloading:false
    },
    getColorList(){
        this.setData({
            isloading:true
        })
        //展示loding效果
        wx.showLoading({
          title: '数据加载中...',
          //mask:true，此时加载数据过程中页面触控无效
        })
        wx.request({
          url: 'https://www.escook.cn/api/color',
          method:'GET',
          //参数data:res是将请求到的数据data重命名为res
          success:({data:res})=>{
              console.log(res)
              this.setData({
                  colorList:[...this.data.colorList,...res.data]
              })
              console.log(this.data.colorList)
          },
          complete:()=>{
            wx.hideLoading({
              success: (res) => {console.log("请求已发送")},
            })
            this.setData({
                isloading:false
            })
          }
        })
         },

    /**
     * 生命周期函数--监听页面加载，只调用一次
     */
    onLoad(options) {
        this.getColorList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成,只调用一次
     */
    onReady() {
        wx.setNavigationBarTitle({
          title: 'contact',
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log("进入到contact页面")
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载，只调用一次
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.data.isloading) return
        this.getColorList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})