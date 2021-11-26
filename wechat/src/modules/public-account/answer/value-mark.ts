import QTip from "./tip";

class QValueMark {
    data!:CFValueMarkQuestion;
    prev:string='';
    constructor() {}
    init(data:CFValueMarkQuestion){
        this.data = data;
        if(this.data.prev){
            this.prev = QTip.pre+','
        }
        debugger
    }
    getMessage():string{
        debugger
        let message = `${this.data.title}\n`;
            message += `${this.data.options[0].text}\n`;
            //分值描述
            if(this.data.minText&&this.data.maxText){
                message += `左:${this.data.minText}\n右:${this.data.maxText}\n`;
            }
            message += `最大${this.data.markMax}分,最小${this.data.markMin}分,分值间隔${this.data.markStep}\n`;
            message += `${QTip.quit},${this.prev}${QTip.next}\n`;
        return message;
    }
    /**
     * 处理回答
     * @param answer 
     * @param quest 
     * @returns 
     */
     dealAnswer(answer:string):CFOptionInputData|undefined{
        let option:CFOptionInputData|undefined = undefined;
        if(this.verifyAnswer(answer)){
            option  = answer;
        }else{
            console.log('--------------请输入正确的序号--------------');
        }
        return option
    }
    /**
     * 验证回答
     * @param answer
     * @returns 
     */
    verifyAnswer(answer:string):boolean{
        const num=parseInt(answer);
        const max = Number(this.data.markMax);
        const min = Number(this.data.markMin);
        const step = Number(this.data.markStep);
        if(isNaN(num)){
            return false
        }
        if(num>max&&num<min){
            return false
        }
        if((num-max)%step!==0){
            return false;
        }
        return true
    }
}

const qValueMark = new QValueMark();
export default qValueMark;