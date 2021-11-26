import { isOptionGrou } from "../util/common";
import QTip from "./tip";


class QMenu {
    data!:CFMenuQuestion;
    constructor() {}
    getMessage():string{
        let prev = '';
        const menuQuest = this.data;
        if(menuQuest.prev){
            prev = QTip.pre+','
        }
        let message = `${menuQuest.title}\n${QTip.quit},${prev}${QTip.next}\n`;
        if(menuQuest.optGroups){
            message += `请以-分割输入\n`;
            message += this.optGroupMessage(menuQuest.optGroups,0);
        }else{
            menuQuest.options.forEach((res:CFOption,index:number)=>{
                message+= `${index}) ${res.text}\n`;
            })
        }
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
    /**
     * 处理回答
     * @param answer 
     * @param quest 
     * @returns 
     */
    dealAnswer(answer:string,quest:CFSelectQuestion):CFOption|undefined{
        let option:CFOption|undefined = undefined;
        if(quest.optGroups){
            option = this.getSelectedOpt(answer,quest.optGroups)
            if(!option){
                console.log('--------------输入格式不正确--------------');
            }
        }else{
            const num=parseInt(answer);
            if(!isNaN(num)&&num<quest.options.length&&num>-1){
                option  = quest.options[num];
            }else{
                console.log('--------------请输入正确的序号--------------');
            }
        }
        return option
    }

    /**
     * 得到分组选项选中选项
     * @param answer 
     * @param optGroups 
     * @returns 
     */
    getSelectedOpt(answer:string,optGroups:ICFOptGroupChild[]):CFOption|undefined{
        let nums = answer.split('-')
        let _num = nums.pop();
        // 输入为空
        if(!_num){
            return;
        }
        let num = parseInt(_num);
        // 超出选项或者不是number
        if(isNaN(num)||num>=optGroups.length||num<0){
            return;
        }
        let optGroup = optGroups[num];
        if(isOptionGrou(optGroup)){
            let _answer = nums.join('-');
            return this.getSelectedOpt(_answer,optGroup.children)
        }else{
            return optGroup
        }
    }
}


const qMenu = new QMenu();
export default qMenu;