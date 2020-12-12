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

type ScenicInfo struct {
	Id uint `json:"id"`
	// 景区名称
	Name string `json:"name"`
	// 景区编码
	Code string `json:"code"`
	// 是否开启自动更新
	AutoUpdate bool `json:"autoUpdate"`
	// 景区服务列表
	Serves []*Serve `json:"serves"`
}