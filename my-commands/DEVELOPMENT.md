# 参考
1. https://juejin.cn/post/6844903831994630158?searchId=202403111257332EA94A2C17402CACA497

# 配置zsh代码补全
```shell
# 自定义补全函数
_custom_qr_completion() {
  if [[ $words[1] == "qr"* ]]; then
    reply=($custom_completion_array)
  fi
}

# 注册自定义补全函数
compctl -K _custom_qr_completion qr
```


# 开发

1. npm i -g[将bin的映射记录到node中,不会拷贝命令到node下]
2. 如果使用nvm,例如在v18安装,但是你默认的nvm是14,也会失败

# npm i -g 失败问题
## 报错
qironglin@QirongdeMacBook-Pro my-commands % npm i -g
npm WARN checkPermissions Missing write access to /Users/qironglin/.nvm/versions/node/v14.21.3/lib/node_modules/my-command
npm ERR! code ENOENT
npm ERR! syscall access
npm ERR! path /Users/qironglin/.nvm/versions/node/v14.21.3/lib/node_modules/my-command
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, access '/Users/qironglin/.nvm/versions/node/v14.21.3/lib/node_modules/my-command'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 
npm ERR! A complete log of this run can be found in:

npm ERR!     /Users/qironglin/.npm/_logs/2024-06-14T09_57_10_252Z-debug.log

## 解决方案
1. 使用finder进入 /Users/qironglin/.nvm/versions/node/v14.21.3/lib/node_modules/my-command
2. 手动删除
3. 手动重新安装


# npm i -g 失败2
qironglin@QirongdeMacBook-Pro my-commands % npm i -g
npm ERR! code ENOENT
npm ERR! syscall rename
npm ERR! path /Users/qironglin/.nvm/versions/node/v14.21.3/lib/node_modules/.staging/my-command-0ccf148a/node_modules/@esbuild/aix-ppc64
npm ERR! dest /Users/qironglin/.nvm/versions/node/v14.21.3/lib/node_modules/.staging/@esbuild/aix-ppc64-a0707957
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, rename '/Users/qironglin/.nvm/versions/node/v14.21.3/lib/node_modules/.staging/my-command-0ccf148a/node_modules/@esbuild/aix-ppc64' -> '/Users/qironglin/.nvm/versions/node/v14.21.3/lib/node_modules/.staging/@esbuild/aix-ppc64-a0707957'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/qironglin/.npm/_logs/2024-06-14T11_34_02_081Z-debug.log

这时候链接已经在了,只需要 npm run build重新打包就行