/** @format */

import { Core, User } from '../node';
import cfSurvey from '../survey';
import qFill from './fill';
import qIconMark from './icon-mark';
import qMenu from './menu';
import qSelect from './select';
import qStart from './start';
import QTip from './tip';
import { IDealAnswer } from './type';
import qValueMark from './value-mark';
import qVerify from './verify';

interface IInquirerJson {
  [p: string]: any;
}

const host = {
  sentryKey: 'https://c2a21df7b3794fc6a8854f0a51e0e790@sentry.choiceform.io/8',
  recordUrl: 'https://tracking.choiceform.io/api/records',
  host: 'https://osapi.choiceform.io',
  wsHost: 'wss://osapi.choiceform.io',
  cdnHost: 'https://media.choiceform.io',
  publicHost: 'https://public.choiceform.io',
  dictUrl:
    'https://media.choiceform.io/os-editor/assets/UploadFiles/Dictionary/Dictionary.js',
};

class Answer {
  type!: NODE_TYPE;
  optionType!: OPTION_GROUP_CHILD_TYPE;
  status: 'no' | 'start' | 'answer' | 'end';
  constructor() {
    this.status = 'no';
  }

  async start(content: string): Promise<string> {
    console.log('start:>>>', content);
    if (content === '答题' || content === 'DT') {
      User.setInfo({ sid: '9jR3TYAK' });
      Core.reset();
      const data: CFSetupOptions = {
        useWxSdk: true,
        hostConfig: host,
        notify: (message: string) => {
          console.log('notify:>>>>>>', message);
        },
        alert: (message: string) => {
          return;
        },
        error: (message: string) => {
          console.log('error:>>>>>>', message);
        },
      };
      await Core.setup(data);
      const answer = await this.startSurvey();
      return answer;
    } else {
      return '';
    }
  }
  async startSurvey(): Promise<string> {
    const suvery: CFStartState = await cfSurvey.getStartSurvey();
    const message = `${suvery.title}\n(${QTip.quit},${QTip.start})`;
    this.status = 'start';
    return message;
  }
  async answer(content: string): Promise<string> {
    let message = '';
    if (this.status === 'no' || this.status === 'end') {
      message = await this.start(content);
    } else if (this.status === 'start') {
      message = await this.dealStartAnswer(content);
    } else if (this.status === 'answer') {
      const quest = cfSurvey.survey.nodes[0];
      message = await this.dealAnswer(content, quest, quest.type);
    }
    return message;
  }

  async dealStartAnswer(answer: string): Promise<string> {
    const dealResult = await qStart.dealStartAnswer(answer);
    if (!dealResult.status) {
      return `============${dealResult.message}============`;
    }
    await cfSurvey.getAnswerSurvey();

    //TODO 目前先渲染一个题目
    const message = this.getQuestion();
    return message;
  }

  // 处理答案
  async dealAnswer(
    answer: string,
    quest: CFQuestion,
    type: NODE_TYPE,
  ): Promise<string> {
    const dealResult = await this.dealTipAnswer(answer, quest);
    if (!dealResult.status) {
      console.log(`============${dealResult.message}============`);
      return `============${dealResult.message}============`;
    }
    if (type === NODE_TYPE.FILL) {
      let option = (<CFFillQuestion>quest).options[0];
      await cfSurvey.survey.handleEvents.handleOptionInput!(
        answer,
        option,
        quest,
      );
    } else if (type === NODE_TYPE.SELECT) {
      let option = qSelect.dealAnswer(answer, <CFSelectQuestion>quest);
      if (!option) {
        // 输入格式错误重新答题
        return await this.getQuestion();
      }
      //下一题
      await cfSurvey.survey.handleEvents.handleOptionClick!(option, quest);
    } else if (type === NODE_TYPE.MENU) {
      let option = qMenu.dealAnswer(answer, <CFSelectQuestion>quest);
      if (!option) {
        // 输入格式错误重新答题
        return await this.getQuestion();
      }
      //下一题
      await cfSurvey.survey.handleEvents.handleOptionClick!(option, quest);
    } else if (type === NODE_TYPE.ICON_MARK) {
      let iconMarkQuest = <CFIconMarkQuestion>quest;
      let _answer = qIconMark.dealAnswer(answer, iconMarkQuest);
      if (!_answer) {
        // 输入格式错误重新答题
        return await this.getQuestion();
      }
      await cfSurvey.survey.handleEvents.handleOptionInput!(
        _answer,
        iconMarkQuest.options[0],
        quest,
      );
    } else if (type === NODE_TYPE.UPLOAD) {
      let option = (<CFUploadQuestion>quest).options[0];
      await cfSurvey.survey.handleEvents.handleOptionInput!(
        answer,
        option,
        quest,
      );
    } else if (type === NODE_TYPE.VERIFY) {
      await qVerify.dealAnswer(answer);
    }
    console.log('==================== click  before\n');
    await cfSurvey.survey.handleEvents.handleNextClick!();
    console.log('==================== click after\n', cfSurvey.survey);

    return await this.getQuestion();
  }
  // 处理输入回答
  async dealTipAnswer(answer: string, quest: CFQuestion): Promise<IDealAnswer> {
    // 退出
    if (answer === 'Q') {
      return { status: false, message: '退出答题' };
    }
    // 上一题
    if (answer === 'P' && quest.prev) {
      await cfSurvey.survey.handleEvents.handlePrevClick!();
      this.getQuestion();
      return { status: false, message: '' };
    }
    // 下一题
    if (answer === 'N') {
      await cfSurvey.survey.handleEvents.handleNextClick!();
      this.getQuestion();
      return { status: true, message: '' };
    }
    return { status: true, message: '' };
  }
  /**
   * 答题
   * @param data
   * @returns
   */
  //TODO 目前先渲染一个题目
  async getQuestion(): Promise<string> {
    this.status = 'answer';
    let data: CFQuestion = cfSurvey.survey.nodes[0];
    const inquirerJson = this.getQuestionContent(data);
    console.log('inquirerJson:>>', inquirerJson);

    if (!inquirerJson) {
      this.status = 'end';
      console.log('==============end==============');
      return '==============end==============';
    }
    return inquirerJson;
  }
  // 获得选项
  getQuestionContent(data: CFQuestion): string {
    this.type = data.type;
    switch (data.type) {
      case NODE_TYPE.FILL:
        qFill.data = <CFFillQuestion>data;
        return qFill.getMessage();
      case NODE_TYPE.SELECT:
        qSelect.data = <CFSelectQuestion>data;
        return qSelect.getMessage();
      case NODE_TYPE.MENU:
        qMenu.data = <CFMenuQuestion>data;
        return qMenu.getMessage();
      case NODE_TYPE.ICON_MARK:
        qIconMark.data = <CFIconMarkQuestion>data;
        return qIconMark.getMessage();
      case NODE_TYPE.VALUE_MARK:
        qValueMark.init(<CFValueMarkQuestion>data);
        return qValueMark.getMessage();
      // case NODE_TYPE.UPLOAD:
      //   qUpload.init(<CFUploadQuestion>data);
      //   return qUpload.getMessage();
      case NODE_TYPE.VERIFY:
        qVerify.init(<CFVerifyQuestion>data);
        return qVerify.getMessage();
      default:
        return '';
    }
  }
}

const answer = new Answer();
export default answer;
