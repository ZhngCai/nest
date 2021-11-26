import cfSurvey from "../survey";
import { isOptionGrou } from "../util/common";
import QTip from "./tip";


class QVerify {
    data!:CFVerifyQuestion;
    prev:string='';
    constructor() {}
    init(data:CFVerifyQuestion){
        this.data = data;
        if(data.prev){
            this.prev = QTip.pre+','
        }
    }
    getMessage():string{
        let message = `${this.data.title}\n`;
            message += `${QTip.quit},${this.prev}${QTip.next}\n`;
        return message
    }
    async dealAnswer(answer:string):Promise<void>{
        if(this.data.validateType === VERIFY_TYPE.PASSWORD){
           await cfSurvey.survey.handleEvents.handleInputCode!(answer,this.data);
        }
    }
}


const qVerify = new QVerify();
export default qVerify;