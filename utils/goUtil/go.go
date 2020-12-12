package goUtil

import (
	"log"
)

// ------------------------------------------------------
// Created by fei wo at 2020/11/29
// ------------------------------------------------------
// Copyright©2020-2030
// ------------------------------------------------------
// blog: http://www.feiwo.xyz
// ------------------------------------------------------
// email: zhuyongluck@qq.com
// ------------------------------------------------------
//  协程工具类
// ------------------------------------------------------

func Run(run func())  {
	if err := recover(); err != nil {
		log.Printf("协程出错了 --> %v", err)
		return
	}
	go run()
}