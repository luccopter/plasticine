# PNPM MONOREPO 常规操作
**具体PNPM使用手册请参考官网:**
[PNPM官网](https://pnpm.io/cli/add)
## PNPM 安装
```
//全局安装
npm install -g pnpm
// 查看版本
pnpm -v
```
## 创建并配置worksapce
### 创建
```
touch pnpm-workspace.yaml
```
### 配置
配置工作区域、如`projects`文件下是工作区域配置如下:
``` yaml
packages:
   - 'projects/*'
```
## 安装依赖
### 安装全局依赖
```
pnpm add -w lodash
```
### 指定项目添加依赖
```
pnpm add lodash -F @plasticine/shared
```
## 常用指令
### pnpm add 指令
|分类|作用|
|:--|:--|
|`pnpm add sax`|保存至`dependencies`|
|`pnpm add -D sax`| 保存至`devDependencies`|
|`pnpm add -O sax`| 保存至`optionalDependencies`|
|`pnpm add -g sax`| 保存至全局包内|
|`pnpm add sax@next`|安装依赖根据标签|
|`pnpm add sax@3.0.0`|安装指定版本|
|`pnpm add react@">=0.1.0 < 0.2.0"`| 安装一定版本范围的包|

##### 安装本地文件
例如：本地有一个文件夹和一个压缩文件包的添加样例
1. 文件类型为(`.tar`或者`.tar.gz`或者`.tgz`)
2. 本地一个指定文件夹`/some-directory`
**添加方式如下 **
```
pnpm add ./package.tar.gz
pnpm add ./some-directory
```
### 下载远端的压缩包
```
pnpm add https://xxxx.com/xxxxxxxxxxx/xxxx/xxxx
```
### 从远端Git仓库下载
```
pnpm add <git remote url>
// 从master下载最新一次提交
pnpm add xxxx/xxxx
// 下载指定某次commit
pnpm add xxxx/xxxx#{{commit的HEX值}}
// 指定分支
pnpm add  xxx/xxx#{{branchName}}
// 下载指定版本
ppnm add xxx/xxxx#{{semver:^2.0.0}}
```
### 从workspace添加依赖关联
**首先要确认已经正确配置`pnpm-workspace.yaml`文件**
```
pnpm add @plastic/xxx@version-numer -F -D @plastinse/xxxx
```
### pnpm install
通常也可以`pnpm i`
下载项目的所有依赖。
当处于`workspace`环境下、`pnpm install`会下载这个项目所有依赖。如果你不想这么做。可以设置`recursive-install`为 `false`

|指令参数拓展|解释|
|`pnpm i --offline`|紧紧从本地仓库中离线下载|
|`pnpm i --forzen-lockfile`|`pnpm-lock.yaml`没有更新|
|`pnpm i --lockfile-only`|仅仅`pnpm-lock.yaml`更新|
|`pnpm i --force`|重新下载所有依赖、甚至忽略他们在当前环境不安全的|
|`pnpm i --prod,-P`|如果`NODE_ENV``production` 为true，就不会下载所有配置在`devDependenices`的依赖，而且会移除在这个范围内已经下载的依赖。如果为`false`,则会下载`devDependenices`和`dependencies`下配置的依赖|

### pnpm update
命令别名：
`pnpm up`或者`pnpm upgrade`
更新依赖包到他们最新的版本后者指定版本。如果没有限制参数、则更新全部依赖。
|指定|解释|
|`pnpm up`| 更新`package.json`文件下配置所有依赖|
|`pnpm up --latest/-L`|更新所有依赖直他们的最新版本|
|`pnpm up foo@2`|更新`foo`到v2的最新版本|
|`pnpm up "@babel/*"`|更新`@babel`范围下的所有依赖|
|`pnpm up --recursive/-r`, |递归查找所有子文件`package.json`并更新依赖|
|`pnpm up --global/-g`|更新所有全局依赖包|
|`pnpm up -r --workspace express`|更新`workspace`范围内所有依赖这个包的项目|
|`pnpm up --prod,-P`|更新配置在`dependencies`和`optionalDependencies`的依赖|
|`pnpm up --dev,-D`|仅仅更新配置`devDependecies`的依赖|
|`pnpm up --no-optional`|更新`optionalDependencies`|
|`pnpm up --interactive/-i`|展示过期的依赖，并选择一部分去更新|
|`pnpm up --filter<package_selector>`|支持过滤语法|

### pnpm remove
命令别名:
`pnpm rm`或者`pnpm uninstall`或者`un`
移除依赖包分别从`node_modules`文件下和项目的`package.json`
|指定参数|解释|
|`pnpm rm --recursive/-r`|递归查找删除、使用配置了`workspace`的项目|
|`pnpm rm --global/-g`|移除全局依赖|
|`pnpm rm --save-de/-D`|移除依赖从`devDependecies`|
|`pnpm rm --save-optional/-O`|移除依赖从`optionalDependencies`|
|`pnpm rm --save-prod,-P`|移除依赖从`dependecies`|
|`pnpm rm --filter <package_selector>`|