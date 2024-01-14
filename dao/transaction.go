package dao

import (
	"fmt"
	"gorm.io/gorm"
)

type TransactionDb struct {
	*gorm.DB
}

// 获取数据库中总条数
func TotalNum() *int {
	var total_num *int
	Db.Raw("select count(*) from transaction ").Scan(&total_num)
	fmt.Println(*total_num)
	return total_num
}

// 获取指定年份的总数据条数
func GetYearNum(year string) *int {
	var num *int
	Db.Raw("select count(*) from transaction where transaction_time like  ?", year+"%").Scan(&num)
	fmt.Println(num)
	return num
}
