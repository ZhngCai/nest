import { isOptionGrou } from "../util/common";
import QTip from "./tip";


class QFill {
    data!:CFFillQuestion;
    constructor() {}
    getMessage():string{
        let prev = '';
        const fillQuest = this.data;
        if(fillQuest.prev){
            prev = QTip.pre+','
        }
        let message = `${fillQuest.title}\n`;
        if(fillQuest.optGroups){
            message += this.optGroupMessage(fillQuest.optGroups,0)
        }else{
            message += `${fillQuest.options[0].text}\n`
        }
        message += `${QTip.quit},${prev}${QTip.next}`
        return message
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
}


const qFill = new QFill();
export default qFill;