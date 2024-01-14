package routers

import (
	"github.com/gin-gonic/gin"
	api "lianjia/api/v1"
	"net/http"
)

/*
初始化路由
*/
func NewRouter() *gin.Engine {
	r := gin.Default()

	// 加载静态文件
	r.StaticFS("/static", http.Dir("./static"))
	// 加载全部的html文件
	r.LoadHTMLGlob("templates/*")

	v1 := r.Group("/api/v1")
	{
		// 首页
		v1.GET("/", api.Index)
		v1.GET("get_count", api.GetCount)
		v1.GET("/get_info", api.GetInfo)
	}
	return r
}
