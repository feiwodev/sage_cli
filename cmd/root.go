package cmd

import (
	"fmt"
	"log"
	"os"

	"github.com/spf13/cobra"
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
//  
// ------------------------------------------------------

var rootCommand *cobra.Command

func init() {
	rootCommand = &cobra.Command{
		Use: "sage",
		Short: "sage information",
		Long: "sage information",
		Version: "1.0.0",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Sage Cli客户端，用于运维景区服务， 帮助文档 --help")
		},
	}
}

func Execute()  {
	registerCommand(rootCommand)
	err := rootCommand.Execute()
	if err != nil {
		log.Fatalf("cmd exec fail")
		os.Exit(1)
	}
}