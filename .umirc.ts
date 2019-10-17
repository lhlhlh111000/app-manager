import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: 'app-manager',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      }
    }],
  ],
  proxy: {
    "/version/manager": {
      "target": "http://localhost:8099",
      "changeOrigin": true,
    },
    "/rn/manager": {
      "target": "http://localhost:8099",
      "changeOrigin": true,
    }
  }
}

export default config;
