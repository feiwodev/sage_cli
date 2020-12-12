package http

import (
	"io/ioutil"
	"log"
	"net/http"
	"sync"
)

// ------------------------------------------------------
// Created by fei wo at 2020/11/28
// ------------------------------------------------------
// Copyright©2020-2030
// ------------------------------------------------------
// blog: http://www.feiwo.xyz
// ------------------------------------------------------
// email: zhuyongluck@qq.com
// ------------------------------------------------------
//  http请求
// ------------------------------------------------------

type Net interface {
	Get(url string, callback func(bytes []byte))
}

var (
	n Net
	lock sync.Mutex
)

func Client() Net {
	if n == nil {
		lock.Lock()
		if n == nil {
			n = &net{httpClient: http.DefaultClient}
		}
		lock.Unlock()
	}
	return n
}

type net struct {
	httpClient *http.Client
}

// get request
func (n *net) Get(url string, callback func(bytes []byte)) {
	resp, err := n.httpClient.Get(url)
	if err != nil {
		log.Printf("请求接口失败 --> %s\n", err.Error())
		return
	}

	bytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("读取接口数据失败 --> %s\n", err.Error())
	}
	callback(bytes)
}

