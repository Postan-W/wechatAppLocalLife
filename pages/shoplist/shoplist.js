// pages/shoplist/shoplist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query:{},
        shopList:[],
        page:1,
        pageSize:10,
        total:0,
        isloading:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            query:options
        })
        this.getShopList()
    },
   
    getShopList(stopPullDown){
        this.setData({
            isloading:true
        })
        wx.showLoading({
          title: '加载中...',
        })
       wx.request({
           //反引号的字符串支持占位符
         url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
         method:"GET",
         data:{
             _page:this.data.page,
             _limit:this.data.pageSize
         },
         success:(res)=>{
             this.setData({
                 shopList:[...this.data.shopList,...res.data],
                 total:res.header['X-Total-Count'] - 0
             })
         },
         complete:()=>{
             wx.hideLoading({
               success: (res) => {},
             })
             this.setData({
                 isloading:false
             })
             //下拉刷新时调用getShopList时传一个回调函数来关闭下拉刷新动态效果
             //先判断回调函数存不存在，存在则说明是下拉刷新时传的，不存在说明getShopList是其他地方调用的
             stopPullDown & stopPullDown()
         }
       })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
          title: this.data.query.name,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.setData({
            page:1,
            shopList:[],
            total:0
        })
        this.getShopList(()=>{wx.stopPullDownRefresh({
          success: (res) => {},
        })})
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.data.page*this.data.pageSize >= this.data.total){
            return wx.showToast({
              title: '暂无更多店铺...',
              icon:'none'
            })
        }
        if(this.data.isloading) return
        this.setData({
            page:this.data.page + 1
        })

        this.getShopList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})