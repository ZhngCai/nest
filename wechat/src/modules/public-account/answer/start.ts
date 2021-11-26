import answer from '.';
import { IDealAnswer } from './type';

class QStart {
  data!: CFFillQuestion;
  constructor() {}
  // 处理开始节点回答
  async dealStartAnswer(content: string): Promise<IDealAnswer> {
    // 退出
    if (content === 'Q') {
      return { status: false, message: '退出答题' };
    }
    // 开始答题
    if (content === 'S') return { status: true, message: '' };
    await answer.startSurvey();
    return { status: false, message: '' };
  }
}

const qStart = new QStart();
export default qStart;
