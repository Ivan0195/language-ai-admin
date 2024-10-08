import {action, makeAutoObservable, observable} from 'mobx';
import autoBind from 'auto-bind';

export interface Prompt {
    id: string
    text: string
}


export class PromptsStore {
    @observable promptsList: Prompt[] = [];
    @observable modelAnswer: string = "Result will be here";

    constructor() {
        autoBind(this);
        makeAutoObservable(this);
    };

    @action
    setPromptsList(prompts: Prompt[]) {
        this.promptsList = prompts
    };

    @action
    setModelAnswer(answer: string) {
        this.modelAnswer = answer
    };
}