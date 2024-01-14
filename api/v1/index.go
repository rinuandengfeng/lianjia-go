package v1

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"lianjia/dao"
	"net/http"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

/*
获取总条数和2023年的数据条数
返回值：
code： 状态码
total：总条数
year_num：获取参数中年份额度条数
*/
func GetCount(c *gin.Context) {
	year := c.Query("year")
	fmt.Println(year)
	//t := dao.TransactionDb{}
	totalNum := dao.TotalNum()
	yearNum := dao.GetYearNum(year)

	res := map[string]interface{}{
		"code":     200,
		"total":    totalNum,
		"year_num": yearNum,
	}
	c.JSON(http.StatusOK, res)
}

/*
获取2023年随机数据信息
*/

func GetInfo(c *gin.Context) {

}
