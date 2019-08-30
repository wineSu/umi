import { IConfig } from 'umi-types';

const config: IConfig =  {
  treeShaking: true,
  history: 'hash',
  publicPath:"/users/",
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { 
        webpackChunkName: true
      },
      title: '蚁呼邀约系统',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/api": {
      target: "https://yihoo.qingguo.com",
      changeOrigin: true,
      pathRewrite: { '^/api': '/' },
      //携带cookie
      cookieDomainRewrite: "localhost"
    }
  }
}

export default config;
