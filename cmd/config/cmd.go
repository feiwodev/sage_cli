package config

import (
	"sync"

	"github.com/spf13/cobra"
)

// ------------------------------------------------------
// Created by fei wo at 2020/12/1
// ------------------------------------------------------
// Copyright©2020-2030
// ------------------------------------------------------
// blog: http://www.feiwo.xyz
// ------------------------------------------------------
// email: zhuyongluck@qq.com
// ------------------------------------------------------
//  配置命令
// ------------------------------------------------------

type IConfig interface {
	AddScenicCommand()
}

var (
	c    IConfig
	lock sync.Mutex
)

func NewConfCommand(root *cobra.Command) IConfig {
	if c == nil {
		lock.Lock()
		if c == nil {
			c = & conf{rootCommand: root}
		}
		lock.Unlock()
	}
	return c
}

type conf struct {
	rootCommand *cobra.Command
}

func (c *conf) AddScenicCommand() {
	panic("implement me")
}
