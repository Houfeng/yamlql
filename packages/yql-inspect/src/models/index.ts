import axios from 'axios';

export interface IInspectorOptions {
  url?: string;
  request?: (url: string, data?: any) => any;
}

export class InspectorModel {

  public operation: string = '# Please enter and click the run button';
  public variables: string = '{}';
  public result: string = '{}';
  private options: IInspectorOptions;
  public showDocs: boolean = true;

  constructor(options: IInspectorOptions) {
    this.setOptions(options);
  }

  private defaultRequest(url: string, data?: any) {
    return axios.post(url, data);
  }

  public setOptions(options: IInspectorOptions) {
    this.options = Object.assign({
      url: '/yamlql',
      request: this.defaultRequest
    }, options);
  }

  public execute = async () => {
    const { operation, variables, } = this;
    const { request, url } = this.options;
    const { data = '' } = (await request(url, { operation, variables }) || {});
    this.result = JSON.stringify(data, null, '  ');
    this.showDocs = false;
    return data;
  }

  public toggleDocs = () => {
    this.showDocs = !this.showDocs;
  }

}