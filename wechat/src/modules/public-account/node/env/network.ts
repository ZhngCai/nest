/** @format */

import axios from 'axios';
import { evaluate } from 'eval5';
// import request from 'request';
const global = {} as any;
global.FakeHost = {};
global.FakeHost.CFPlugin = {};

export const nodeEnvNetWork: CFEnvNetWork = {
  removeUpload() {
    return new Promise((resolve) => {
      resolve();
    });
  },
  async loadFakeFile(url: string, options: SignStrStr) {
    const upUrl = url.replace(/\.min\.js$/, '.min.up.js');
    try {
      const res = await nodeEnvNetWork.request(upUrl, {
        type: 'GET',
      } as CFApiReqConfig);
      // 将取到脚本依附到事先准备好的伪造接口落脚点
      const script = (res.response as string).replace(/window\./g, 'FakeHost.');
      evaluate(script, global);
    } catch (err) {
      console.error(err);
    }
  },
  getFakeHost() {
    return global.FakeHost.CFPlugin;
  },
  request(url: string, options: CFApiReqConfig): Promise<CFApiReqResult> {
    return new Promise(async (resolve) => {
      if (options.type === 'GET') {
        const res = await axios.get(url);
        resolve({
          status: res.status,
          response: res.data,
        });
      } else {
        const config = {
          method: options.type,
          url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
          },
          data: JSON.stringify(options.data),
        };
        console.log('post=>>>>>', config);

        const res = await axios(config);
        // console.log('post=>>>>>', res);
        resolve({
          status: res.status,
          response: res.data,
        });

        // request(data, function(error: any, response: any, body: any) {
        //   //TODO 暂时回调正常请求，错误请求会抛出异常，中断readline监听
        //   if (response.statusCode === 200 || response.statusCode === 201) {
        //     resolve({
        //       status: response.statusCode,
        //       response: body,
        //     });
        //   }
        // });
      }
    });
  },
  async upload(config: CFUploadConfig): Promise<ICFUploadResult> {
    return new Promise((resolve) => {
      resolve({
        filePath: '',
        value: '',
        fileName: '',
        isImage: true,
        fileType: '',
        miniValue: '',
      } as ICFUploadResult);
    });
  },
};
