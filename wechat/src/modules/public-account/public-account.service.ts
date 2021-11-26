import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import answer from './answer';

@Injectable()
export class PublicAccountService {
  getUserDataAsync(req: Request, res: Response): Promise<string> {
    return new Promise((resolve) => {
      let xmlData = '';
      req
        .on('data', (data) => {
          xmlData = data.toString();
        })
        .on('end', async () => {
          const ToUserName = this.getXMLNodeValue('ToUserName', xmlData);
          const FromUserName = this.getXMLNodeValue('FromUserName', xmlData);
          const MsgType = this.getXMLNodeValue('MsgType', xmlData);
          const Content = this.getXMLNodeValue('Content', xmlData);
          const answerContent = await answer.answer(
            this.getCDataValue(Content),
          );
          const xml = `<xml>
                  <ToUserName>${FromUserName}</ToUserName>
                  <FromUserName>${ToUserName}</FromUserName>
                  <CreateTime>${Date.now()}</CreateTime>
                  <MsgType><![CDATA[text]]></MsgType>
                  <Content><![CDATA[${answerContent}]]></Content>
                  </xml>`;
          res.header({
            'content-type': 'text/xml',
          });
          res.statusCode = 200;
          res.send(xml);
          resolve(xml);
        });
    });
  }
  getCDataValue(content: string): string {
    const tmp = content.split('<![CDATA[');
    const _tmp = tmp[1].split(']]>');
    return _tmp[0];
  }

  getXMLNodeValue(node_name: string, xml: string): string {
    const tmp = xml.split('<' + node_name + '>');
    const _tmp = tmp[1].split('</' + node_name + '>');
    return _tmp[0];
  }
}
