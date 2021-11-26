import { Core } from "../node";

interface ICFSurvey{
    core:CFCore;
    origin:CFSurveyState;
    survey:CFSurveyState;
    getStartSurvey:()=>Promise<CFStartState>;
    getAnswerSurvey:()=>Promise<void>;
}


class CFSurvey implements ICFSurvey {
    core:CFCore = Core;
    survey: CFSurveyState={} as CFSurveyState;
    origin:CFSurveyState = {} as CFSurveyState;
    constructor() {
    }

    async getStartSurvey(){
       return  await this.core.fetchStartState();
    }
    async getAnswerSurvey(){
       this.survey = await this.core.fetchSurveyState();
    }
}
const cfSurvey = new CFSurvey()
export default cfSurvey;