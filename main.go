package main

import (
	"fmt"
	"net/http"
)

// index
func index(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintln(w, map[string]interface{}{
		"code": 200,
		"msg":  "hello world",
	})
}

func main() {
	server := http.Server{
		Addr: "127.0.0.1:8000",
	}
	http.HandleFunc("/", index)

	server.ListenAndServe()
}
