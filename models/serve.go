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

type Type uint
const (
	Basic Type = iota + 1
	Ext
	None
)

type SoftType uint

const (
	Java SoftType = iota + 1
	NodeJs
)

type Serve struct {
	Id uint `json:"id"`
	// 景区ID
	ScenicId uint `json:"scenicId"`
	// 景区名称
	ScenicName string `json:"scenicName"`
	// 服务名称
	Name string `json:"name"`
	// 服务编码
	Code string `json:"code"`
	// 服务文件地址
	FileUrl string `json:"fileUrl"`
	// 版本号
	VersionCode string `json:"versionCode"`
	// 服务类型
	Type Type `json:"type"`
	// 软件类型
	SoftWareType SoftType `json:"softwareType"`
}