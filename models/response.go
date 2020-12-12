package models

// ------------------------------------------------------
// Created by fei wo at 2020/11/29
// ------------------------------------------------------
// Copyright©2020-2030
// ------------------------------------------------------
// blog: http://www.feiwo.xyz
// ------------------------------------------------------
// email: zhuyongluck@qq.com
// ------------------------------------------------------
//  
// ------------------------------------------------------

type Response struct {
	Code int `json:"code"`
	Msg  string `json:"msg"`
	Data interface{} `json:"data"`
}

func BuildData(data interface{}) *Response {
	return &Response{
		Code: 0,
		Msg:  "",
		Data: data,
	}
}