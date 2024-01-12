package v1

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func GetCount(c *gin.Context) {
	year := c.Param("year")
	fmt.Println(year)
	res := map[string]interface{}{
		"total_num": 10000,
		"year_num":  3000,
	}
	c.JSON(http.StatusOK, res)
}
