package main

import (
	"lianjia/dao"
	"lianjia/routers"
)

func main() {
	r := routers.NewRouter()
	dao.NewDB()
	r.Run(":8000")
}
