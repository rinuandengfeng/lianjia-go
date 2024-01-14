package main

import (
	"lianjia/routers"
)

func main() {
	r := routers.NewRouter()
	r.Run(":8000")
}
