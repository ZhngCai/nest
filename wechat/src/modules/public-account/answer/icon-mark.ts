import { isOptionGrou } from "../util/common";
import QTip from "./tip";


class QIconMark {
    data!:CFIconMarkQuestion;
    constructor() {}
    getMessage():string{
        let prev = '';
        const iconMarkQuest = this.data;
        if(iconMarkQuest.prev){
            prev = QTip.pre+','
        }
        let message = `${iconMarkQuest.title}\n`;
            message += `${iconMarkQuest.options[0].text}\n`;
            message += `最大${iconMarkQuest.markImgCount}分,最小1分\n`
        return message;
    }

    /**
     * 选项组
     * @param optGroups 
     * @param num 
     * @returns 
     */
    optGroupMessage(optGroups:ICFOptGroupChild[],num:number):string{
        let message = ``;
        optGroups.forEach((child:ICFOptGroupChild,index:number)=>{
            for (let index = 0; index < num; index++) {
                message += `  `;
            }
            if(isOptionGrou(child)){
                message+= `${index}) ${child.groupTitle}\n`;
                message+= this.optGroupMessage(child.children,child.currentLevel);
            }else{
                message+= `${index}) ${child.text}\n`;
            }
        })
        return message
    }
    /**
     * 处理回答
     * @param answer 
     * @param quest 
     * @returns 
     */
     dealAnswer(answer:string,quest:CFIconMarkQuestion):CFOptionInputData|undefined{
        let option:CFOptionInputData|undefined = undefined;
        const num=parseInt(answer);
        if(!isNaN(num)&&num<quest.markImgCount&&num>0){
            option  = answer;
        }else{
            console.log('--------------请输入正确的序号--------------');
        }
        return option
    }
}


const qIconMark = new QIconMark();
export default qIconMark;