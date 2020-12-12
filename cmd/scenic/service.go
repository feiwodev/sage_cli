package scenic

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
	"sync"

	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
	"sage-cli/download"
	"sage-cli/http"
	"sage-cli/models"
	"sage-cli/utils/convert"
	"sage-cli/utils/goUtil"
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
//  处理服务，读取配置文件，下载服务
// ------------------------------------------------------

const ConfFileName = "./scenic.json"
const ServeDir = "data/sage"

type IService interface {
	// 判断配置是否存在
	IsConfExists() (bool, error)
	// 初始化景区配置文件
	InitConf(code string)
	// 更新景区配置文件
	UpdateConf()
	// 下载景设定区服务
	DownloadServe(code string)
	// 显示景区信息
	PrintScenicInfo()
	// 显示景区服务列表
	PrintServeInfo()
	// 解压下载的景区服务
	UnzipServe()
}

var  (
	serve IService
	serviceLock sync.Mutex
)

func NewService()  IService{
	if serve == nil {
		serviceLock.Lock()
		if serve == nil {
			serve = &service{}
		}
		serviceLock.Unlock()
	}
	return serve
}

type service struct {

}

func (s *service) PrintScenicInfo() {
	conf, err := s.ReadConf()
	if err != nil {
		log.Printf("读取景区配置文件失败 --> %s\n", err.Error())
		return
	}

	fmt.Printf("景区ID：%d\n景区名称：%s\n景区编号：%s\n",conf.Id, conf.Name, conf.Code)
}

func (s *service) PrintServeInfo() {
	conf, err := s.ReadConf()
	if err != nil {
		log.Printf("读取景区配置文件失败 --> %s\n", err.Error())
		return
	}

	fmt.Print("服务名称\t\t服务编号\t\t服务类型\t\t服务版本\t\t文件地址\n")
	for _, ser := range conf.Serves {
		fmt.Printf("%-20s\t%-20s\t%-16s\t%-20s\t%s\t\n", ser.Name, ser.Code, convert.ServeType(ser.Type), ser.VersionCode, ser.FileUrl)
	}
}

func (s *service) IsConfExists() (bool, error) {
	stat, err := os.Stat(ConfFileName)
	if err != nil {
		return false, err
	}
	if stat.Size() > 0 {
		return true, nil
	}
	return false, errors.New("文件不存在")
}

func (s *service) InitConf(code string) {
	exists, _ := s.IsConfExists()
	if exists {
		log.Println("配置文件已存在，请使用: sage update 命令更新配置文件")
		return
	}
	http.Client().Get(http.Serve+code, func(bytes []byte) {
		// parser json string
		scenicInfo := new(models.ScenicInfo)
		data := models.BuildData(scenicInfo)
		err := json.Unmarshal(bytes, data)
		if err != nil {
			log.Printf("解析景区数据失败 --> %s\n", err.Error())
			return
		}
		if data.Code != 200 {
			log.Printf("返回结果失败： %s", data.Msg)
			return
		}
		marshal, err := json.Marshal(scenicInfo)
		if err != nil {
			log.Printf("解析景区数据失败 --> %s", err.Error())
			return
		}
		err = ioutil.WriteFile(ConfFileName, marshal, os.ModePerm)

		if err != nil {
			log.Printf("写入景区配置文件失败 --> %s\n", err.Error())
			return
		}
		log.Println("写入配置文件成功...")
	})
}

func (s *service) UpdateConf()  {
	exists, err := s.IsConfExists()
	if err != nil {
		log.Printf("读取配置文件失败 --> %s\n", err.Error())
		return
	}
	if !exists {
		log.Println("配置文件不存在，请使用: sage init 命令初始化景区配置文件")
		return
	}

	conf, err := s.ReadConf()
	if err != nil {
		log.Printf(err.Error())
		return
	}
	http.Client().Get(http.Serve+conf.Code, func(bytes []byte) {
		// parser json string
		scenicInfo := new(models.ScenicInfo)
		data := models.BuildData(scenicInfo)
		err := json.Unmarshal(bytes, data)
		if err != nil {
			log.Printf("解析景区数据失败 --> %s\n", err.Error())
			return
		}
		if data.Code != 200 {
			log.Printf("返回结果失败： %s\n", data.Msg)
			return
		}
		marshal, err := json.Marshal(scenicInfo)
		if err != nil {
			log.Printf("解析景区数据失败 --> %s\n", err.Error())
			return
		}
		err = ioutil.WriteFile(ConfFileName, marshal, os.ModePerm)

		if err != nil {
			log.Printf("写入景区配置文件失败 --> %s\n", err.Error())
			return
		}
		log.Println("写入配置文件成功...")
	})

}

func (s *service) DownloadServe(code string) {
	conf, err := s.ReadConf()
	if err != nil {
		log.Printf("读取配置文件失败 --> %s\n", err.Error())
		return
	}
	if _, err := os.Stat(ServeDir); os.IsNotExist(err) {
		err := os.MkdirAll(ServeDir, os.ModePerm)
		if err != nil {
			log.Printf("创建文件夹失败 --> %s", err.Error())
			return
		}

		err = os.Chmod(ServeDir, os.ModePerm)
		if err != nil {
			log.Printf("文件夹授权失败 --> %s", err.Error())
			return
		}
	}
	serves := conf.Serves
	log.Println("开始下载服务文件...")
	var serveType models.Type = models.None
	switch code {
	case "basic":
		serveType = models.Basic
	case "ext":
		serveType = models.Ext
	}
	var wg = new(sync.WaitGroup)
	for index, ser := range serves {
		if ser.Type == serveType {
			wg.Add(index+1)
			goUtil.Run(func() {
				download.Do(ser.FileUrl, ser.Code, ServeDir+"/"+ser.Code, wg)
			})
		}else if serveType == models.None {
			wg.Add(index+1)
			lastIndex := strings.LastIndex(ser.FileUrl, ".")
			fileExt := ser.FileUrl[lastIndex: len(ser.FileUrl)]
			filePath := strings.Builder{}
			filePath.WriteString("./")
			filePath.WriteString(ServeDir)
			filePath.WriteString("/")
			filePath.WriteString(ser.Code)
			filePath.WriteString(fileExt)
			log.Printf("文件路径 --> %s",filePath.String())
			goUtil.Run(func() {
				download.Do(ser.FileUrl, ser.Code, filePath.String(), wg)
			})
		}
	}
	wg.Wait()
}

func (s *service) ReadConf() (*models.ScenicInfo, error) {
	scenicInfo := new(models.ScenicInfo)
	bytes, err := ioutil.ReadFile(ConfFileName)
	if err != nil {
		return nil, errors.New(fmt.Sprintf("读取配置文件失败 --> %s\n", err.Error()))
	}

	err = json.Unmarshal(bytes, scenicInfo)
	if err != nil {
		return nil, errors.New(fmt.Sprintf("解析配置文件失败 --> %s\n", err.Error()))
	}
	return scenicInfo, nil
}

func (s *service) UnzipServe() {
	err := filepath.Walk(ServeDir, func(path string, info os.FileInfo, err error) error {
		stat, err := os.Stat(path)
		if err != nil {
			log.Printf("文件状态获取失败 --> %s", err.Error())
			return err
		}
		if !stat.IsDir() {
			lastIndex := strings.LastIndex(path, ".")
			ext := path[lastIndex: len(path)]
			if ext == ".zip"{
				split := strings.Split(info.Name(), ".")
				err := s.unzip(path, ServeDir+"/unzip/"+split[0]+"/")
				if err != nil {
					log.Printf("解压失败 --> %s", err.Error())
				}
			}
		}
		return nil
	})
	if err != nil {
		log.Printf("遍历文件失败 --> %s", err.Error())
	}
}

func (s *service) unzip(zipFile , destDir string) error {
	log.Println("file path --> ", zipFile)
	reader, err := zip.OpenReader(zipFile)
	if err != nil {
		return fmt.Errorf("读取zip文件失败 --> %s", err.Error())
	}
	defer func() { _ = reader.Close() }()
	var decodeName string
	for _, f := range reader.File {
		if f.Flags == 0 {
			// 如果标志位是0， 则默认本地编码，默认为gbk
			i := bytes.NewReader([]byte(f.Name))
			decoder := transform.NewReader(i, simplifiedchinese.GB18030.NewDecoder())
			content, _ := ioutil.ReadAll(decoder)
			decodeName = string(content)
		}else {
			decodeName = f.Name
		}

		fPath := filepath.Join(destDir, decodeName)
		if f.FileInfo().IsDir() {
			err := os.MkdirAll(fPath, os.ModePerm)
			if err != nil {
				log.Printf("解压创建文件夹失败 --> %s", err.Error())
			}
		}else {
			if err := os.MkdirAll(filepath.Dir(fPath), os.ModePerm); err != nil {
				return err
			}

			inFile, err := f.Open()
			if err != nil {
				return err
			}
			defer func() { _ = inFile.Close() }()

			outFile, err := os.OpenFile(fPath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
			if err != nil {
				return err
			}
			defer func() { _ = outFile.Close() }()

			_, err = io.Copy(outFile, inFile)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

