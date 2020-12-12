package download

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"sync"
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
//  下载服务
// ------------------------------------------------------

type Reader struct {
	io.Reader
	Total int64
	Current int64
	fileName string
}

func (r *Reader) Read(bytes []byte) (n int, err error) {
	n, err = r.Reader.Read(bytes)
	r.Current += int64(n)
	fmt.Printf("\r %s 下载进度: %.2f%%",r.fileName, float64(r.Current*10000/r.Total)/100)
	if r.Current == r.Total {
		fmt.Printf("\t文件下载完成\n")
	}
	return
}

func Do(urlPath, fileName , filePath string, wg *sync.WaitGroup)  {
	_, err := url.ParseRequestURI(urlPath)
	if err != nil {
		log.Println("下载地址，不是有效的http地址")
		return
	}

	resp, err := http.Get(urlPath)
	if err != nil {
		log.Printf("下载出错 --> %s", err.Error())
		return
	}

	defer func() { _ = resp.Body.Close() }()

	file, err := os.Create(filePath)
	if err != nil {
		log.Printf("创建文件失败 --> %s", err.Error())
	}
	defer func() {_ = file.Close()}()

	reader := &Reader{
		Reader:   resp.Body,
		Total:    resp.ContentLength,
		fileName: fileName,
	}

	_, err = io.Copy(file, reader)
	if err != nil {
		log.Println("下载文件失败")
		return
	}
	wg.Done()
}