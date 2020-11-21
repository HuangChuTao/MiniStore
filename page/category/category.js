// page/category/category.js
Page({
    data: {
        Time: new Date().toLocaleString(),
        isActive: false,
        counter: 0
    },
    onLoad()  {
        setInterval(() => {
            this.setData({
                Time: new Date().toLocaleString()
            })
        }, 1000)
    },
    hhhClick() {
        this.setData({
            isActive: !this.data.isActive
        })        
    }
})