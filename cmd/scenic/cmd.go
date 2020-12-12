package scenic

import (
	"fmt"
	"sync"

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
//  服务命令
// ------------------------------------------------------

type IScenic interface {
	AddScenicCommand()
}

var (
	s    IScenic
	lock sync.Mutex
)

func NewServeCmd(rootCommand *cobra.Command) IScenic {
	if s == nil {
		lock.Lock()
		defer lock.Unlock()
		if s == nil {
			s = &scenic{rootCommand: rootCommand}
		}
	}
	return s
}

type scenic struct {
	rootCommand *cobra.Command
}

func (s *scenic) AddScenicCommand() {
	s.rootCommand.AddCommand(s.initCommand(),s.updateConfCommand(), s.downloadServe(), s.printScenicInfo(), s.printServeInfo(), s.unzipServe())
}

func (s *scenic) initCommand() *cobra.Command{
	 return &cobra.Command{
		Use: "init",
		Short: "初始化景区Sage服务",
		Long: "初始化景区Sage服务，下载景区服务配置文件",
		Example: "sage init [景区Code]",
		Run: func(cmd *cobra.Command, args []string) {
			if len(args) <= 0 {
				fmt.Println("请输入正确指令： sage init [景区Code]")
			}
			scenicCode := args[0]
			NewService().InitConf(scenicCode)
		},
	}
}

func (s *scenic) updateConfCommand() *cobra.Command {
	return &cobra.Command{
		Use: "update",
		Short: "更新景区配置文件",
		Long: "sage update: 从服务上更新景区配置文件",
		Run: func(cmd *cobra.Command, args []string) {
			NewService().UpdateConf()
		},
	}
}

func (s *scenic) downloadServe() *cobra.Command {
	return &cobra.Command{
		Use: "download",
		Short: "下载景区基础服务",
		Long: "下载后台设定的全部基础服务",
		Run: func(cmd *cobra.Command, args []string) {
			NewService().DownloadServe("")
		},
	}
}

func (s *scenic) printScenicInfo()  *cobra.Command{
	return &cobra.Command{
		Use: "info",
		Short: "景区信息",
		Long: "显示景区信息",
		Run: func(cmd *cobra.Command, args []string) {
			NewService().PrintScenicInfo()
		},
	}
}

func (s *scenic) printServeInfo()  *cobra.Command{
	return &cobra.Command{
		Use: "list",
		Short: "景区服务信息列表",
		Long: "显示景区服务信息",
		Run: func(cmd *cobra.Command, args []string) {
			NewService().PrintServeInfo()
		},
	}
}

func (s *scenic) unzipServe() *cobra.Command {
	return &cobra.Command{
		Use: "unzip",
		Short: "解压下载的所有景区服务",
		Long: "解压下载的所有景区服务，会忽略已解压的景区服务",
		Run: func(cmd *cobra.Command, args []string) {
			NewService().UnzipServe()
		},
	}
}