### generator-react-ui-cdk
generator react ui component development kit

最简单的开发react ui组件的脚手架工具

### 安装使用
1.  全局安装yeoman

```bash
npm install yo -g
```

2.  全局安装generator-react-ui-cdk

```bash
npm install generator-react-ui-cdk -g
```

3.  在要初始化的项目文件夹下，运行脚手架，选择React Ui Cdk并按提示执行

```bash
yo
```

### 开发组件

1.  开启storybook，进行实时预览调试开发

```bash
npm start
```

2.  打开浏览器预览现有的组件[http://localhost:9010/](http://localhost:9010/)

3.  编辑自己的组件代码
    
`./src/index.js`

4.  编辑storybook页面

`./src/stories/index.js`

### 发布

1.  确认自己的package.json中的项目名name字段是否符合规范
2.  确认自己的package.json中的publishConfig.registry字段是否符合规范
3.  发布

```bash
npm publish
```