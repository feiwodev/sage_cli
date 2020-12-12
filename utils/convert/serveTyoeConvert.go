package convert

import (
	"sage-cli/models"
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
//  
// ------------------------------------------------------

func ServeType(t models.Type) string {
	switch t {
	case models.Basic:
		return "基础服务"
	case models.Ext:
		return "扩展服务"
	default:
		return "未知服务"
	}
}
