import axios from 'axios';

const STORE_PREFIX = '$YQLInspector';
const STORE_PARAMS_KEY = STORE_PREFIX + '/params';
const STORE_RESULT_KEY = STORE_PREFIX + '/result';

export interface IInspectorOptions {
  url?: string;
  request?: (url: string, data?: any) => any;
}

export interface IInspectorParams {
  operation?: string;
  variables?: string;
}

export class InspectorModel {

  private options: IInspectorOptions;
  public params: IInspectorParams;
  public result: string = '{}';
  public selectedText: string;
  public showDocs: boolean = false;
  private saveStateTimer: any;

  constructor(options: IInspectorOptions) {
    this.setOptions(options);
    this.loadState();
  }

  private defaultRequest(url: string, data?: any) {
    return axios.post(url, data);
  }

  public setOptions(options: IInspectorOptions = {}) {
    const { request, url } = options;
    if (!this.options) this.options = {};
    this.options.url = url || this.options.url || '/yamlql';
    this.options.request = request || this.options.request
      || this.defaultRequest;
  }

  public execute = async () => {
    let { operation, variables, } = this.params;
    if (this.selectedText) operation = this.selectedText;
    const { request, url } = this.options;
    this.showDocs = false;
    const { data = '' } = (await request(url, { operation, variables }) || {});
    this.result = JSON.stringify(data, null, '  ');
    this.saveState();
    return data;
  }

  public toggleDocs = () => {
    this.showDocs = !this.showDocs;
  }

  public saveState = () => {
    if (this.saveStateTimer) {
      clearTimeout(this.saveStateTimer);
    }
    this.saveStateTimer = setTimeout(() => {
      localStorage.setItem(STORE_PARAMS_KEY, JSON.stringify(this.params));
      localStorage.setItem(STORE_RESULT_KEY, JSON.stringify(this.result));
      this.saveStateTimer = null;
    }, 0);
  }

  public loadState = () => {
    try {
      const paramsText = localStorage.getItem(STORE_PARAMS_KEY);
      if (paramsText) this.params = JSON.parse(paramsText);
      const resultText = localStorage.getItem(STORE_RESULT_KEY);
      if (resultText) this.result = JSON.parse(resultText);
    } catch { }
    if (this.params) return;
    this.params = {
      operation: '# Please enter and click the run button',
      variables: '{}'
    };
    if (this.result) return;
    this.result = '{}';
  }

}