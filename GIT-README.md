# GIT 常用的操作
# 添加忽略文件
```
- touch .gitignore
```
## 忽略常用配置规则
```
#               表示此为注释,将被Git忽略
*.a             表示忽略所有 .a 结尾的文件
!lib.a          表示但lib.a除外
/TODO           表示仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/          表示忽略 build/目录下的所有文件，过滤整个build文件夹；
doc/*.txt       表示会忽略doc/notes.txt但不包括 doc/server/arch.txt
 
bin/:           表示忽略当前路径下的bin文件夹，该文件夹下的所有内容都会被忽略，不忽略 bin 文件
/bin:           表示忽略根目录下的bin文件
/*.c:           表示忽略cat.c，不忽略 build/cat.c
debug/*.obj:    表示忽略debug/io.obj，不忽略 debug/common/io.obj和tools/debug/io.obj
**/foo:         表示忽略/foo,a/foo,a/b/foo等
a/**/b:         表示忽略a/b, a/x/b,a/x/y/b等
!/bin/run.sh    表示不忽略bin目录下的run.sh文件
*.log:          表示忽略所有 .log 文件
config.php:     表示忽略当前路径的 config.php 文件
 
/mtk/           表示过滤整个文件夹
*.zip           表示过滤所有.zip文件
/mtk/do.c       表示过滤某个具体文件
被过滤掉的文件就不会出现在git仓库中（gitlab或github）了，当然本地库中还有，只是push的时候不会上传。
 
需要注意的是，gitignore还可以指定要将哪些文件添加到版本管理中，如下：
!*.zip
!/mtk/one.txt
 
唯一的区别就是规则开头多了一个感叹号，Git会将满足这类规则的文件添加到版本管理中。为什么要有两种规则呢？
想象一个场景：假如我们只需要管理/mtk/目录中的one.txt文件，这个目录中的其他文件都不需要管理，那么.gitignore规则应写为：：
/mtk/*
!/mtk/one.txt
 
假设我们只有过滤规则，而没有添加规则，那么我们就需要把/mtk/目录下除了one.txt以外的所有文件都写出来！
注意上面的/mtk/*不能写为/mtk/，否则父目录被前面的规则排除掉了，one.txt文件虽然加了!过滤规则，也不会生效！
 
----------------------------------------------------------------------------------
还有一些规则如下：
fd1/*
说明：忽略目录 fd1 下的全部内容；注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略；
 
/fd1/*
说明：忽略根目录下的 /fd1/ 目录的全部内容；
/*
!.gitignore
!/fw/ 
/fw/*
!/fw/bin/
!/fw/sf/
说明：忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；注意要先对bin/的父目录使用!规则，使其不被排除。

```
## 移除已经被缓存跟踪的文件
```
git rm -f --canche node_modules
```
## 从忽略文件里面恢复指定文件 -F 表示强制执行
```
git add -f node_modules
```
# Git Flow 使用

## 如果提示不支持Git Flow 指定，需要下载Git Flow 的拓展插件
```
MAC 
brew install git-flow-avh
```
## 常用Git Flow
### 1. Git Flow 初始化
```
git flow init
NOTE：
如果不需要改名字可以直接按回车、到结束就可以了的
EXTEND:
如果需要自定义名称、可以在步骤后输入名称，'Enter' 键表示结束
```
### 2. 开启一个新的功能分支
```
// 前面xxx为自定义分支名。分支名不用额外追加feature/前缀、在git flow 初始化配置时已完成相关配置
git flow feature start xxxx
```
### 3. 完成一个功能分支
```
NOTE: 完成功能分支后、会合并功能分支到默认'next release'分支、并删除功能分支
git flow feature finish xxxx
```
### 4. 新建一个发布分支
<font color='red'>NOTE:</font>

realse 分支名称会作为标签一起汇入主分支、一般release分支都是版本号命名
常用命名格式如下：
1. 1.0.1 //纯数字法
2. v1.0.1 //v首字母版本标识法
```
git flow release start xxxx 
```
### 5. 结束发布分支
```
//完成发布分支、releas分支会被合并到develop和master分支、并截取分支名打标签、
并删除release分支
git flow release finish xxxx
```
### 6. 新建一个紧急修复分支
```
git flow hotfix start xxxx
```
### 7. 结束一个紧急修复分支
执行管理git操作逻辑类似release分支操作
```
git flow hotfix finish xxxx
```
## GIT的提交规范
Git 提交规范是一种约定，用于确保代码库中的每次提交都具有清晰、一致和有用的信息。这有助于其他开发者理解每次提交的目的、内容和影响，从而更容易地协作和维护代码。以下是一种常见的 Git 提交规范：

提交格式：每个提交消息都包含一个头部（header）、一个主体（body）和一个页脚（footer）。这些部分之间用空行隔开。

* 头部：头部是必需的，包含 type、scope 和 subject。type 用于说明提交的类型（如 feat、fix、docs 等），scope 是可选的，用于说明提交影响的范围，subject 是提交目的的简短描述。
* 主体：主体是可选的，用于提供更详细的说明，解释这次提交的具体内容和动机。
* 页脚：页脚也是可选的，通常用于包含一些元数据，如链接到相关的问题或文档。
* 字符限制：提交消息的任何一行都不得超过 72 个字符（或 100 个字符，具体限制可能因团队而异）。这是为了避免自动换行影响美观和可读性。
使用第一人称现在时：在提交消息中，使用第一人称现在时来描述代码变动。例如，使用 "change" 而不是 "changed" 或 "changes"。
## GIT type的分类与说说明
|Type| 功能说明|
|:--|:--|
|feat|通常用来表示项目新增一些功能|
|fix| 通常用于解决指定问题、通常会需要指定issue编号|
|docs|新增一些文档注释|
|style| 修改一些代码风格或样式文件、不影响项目运行|
|refactor|指重构制定功能、具有较大改动、有较高风险|
|perf|对部分业务进行逻辑优化、需要有针对单侧编写和改动评估|
|test|增加单侧用例|
|chore|表示进行了不修改src或test的其他修改，比如改变构建流程、增加依赖库或工具等|
|revert| 版本回退|
|build|这表示对构建工具或构建过程进行了修改，比如升级webpack、替换gulp为webpack等|
|ci|这表示与持续集成（Continuous Integration）服务相关的修改|