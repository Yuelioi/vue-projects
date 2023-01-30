## 模板来源

https://github.com/Yukun-Guo/vite-vue3-electron-ts-template

## 打包慢

请下载指定文件到 C:\Users\用户名\AppData\Local\electron\Cache 内, 具体看你要下哪个版本, 可以尝试直接使用 files 的文件

~Cache\nsis\nsis-3.0.4.1.7z
~Cache\nsis\nsis-resources-3.4.1.7z
~Cache\winCodeSign\winCodeSign-2.6.0.7z
~Cache\electron-v22.0.0-win32-x64.zip

pnpm config set electron_mirror "https://npm.taobao.org/mirrors/electron/"

## PNPM

查看源: pnpm get registry
临时更改: pnpm --registry
持久更改: pnpm config set registry

官方:https://registry.npmjs.org/
阿里源: https://registry.npm.taobao.org

pnpm config set registry https://registry.npmmirror.com
pnpm config set registry https://registry.npmjs.org/
