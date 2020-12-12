package cmd

import (
	"github.com/spf13/cobra"
	"sage-cli/cmd/scenic"
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
//  注册命令
// ------------------------------------------------------

func registerCommand(rootCommand *cobra.Command)  {
	scenic.NewServeCmd(rootCommand).AddScenicCommand()
}