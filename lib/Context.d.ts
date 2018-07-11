import Processor from './Processor';
import IContextOptions from './IContextOptions';
export declare class Context {
    private __processor;
    private __options;
    private __resolveCount;
    private __resolvers;
    constructor(processor: Processor, options: IContextOptions);
    private convertOptions;
    readonly processor: Processor;
    readonly options: IContextOptions;
    readonly metadata: any;
    readonly client: any;
    readonly resolvers: any[];
    private createResolvers;
    private isVariable;
    private trimVariable;
    /**
     * 获取一个变量值
     * @param variables 所有变量
     * @param path 值路径
     */
    private getVarValue;
    private isAction;
    private parseParams;
    private getParams;
    /**
     * 调用一个 action , 并返回执行结果
     * @param operation 动作描述对象
     * @param variables 所有变量
     */
    private resolveAction;
    /**
     * 转换处理一个 field
     * 暂不允许在对象是调用函数（将来增加一个注解声明哪些可调用）
     * src.action = isFunction(val) ? (...args: Array<any>) => {
     *   return val.call(srcItem, ...args);
     * } : val;
     * @param srcObj
     * @param src
     * @param dstObj
     * @param dst
     * @param variables
     */
    private resolveField;
    /**
     * 创建一个 filed 转换异步任务
     * @param srcObj 源对象
     * @param src 源表达式
     * @param dstObj 目标对象
     * @param dst 目标表达式
     * @param vars
     * @param ignores 要忽略的 key
     */
    private createFieldResolveTask;
    /**
     * 对结果对象进行 fileds 的转换和映射处理, convertObj 只处理对象
     * convertResult 检查是否为数组，并对数组进行 map 调用 convertObj 处理每一项
     * @param srcObj 要处理的结果对象
     * @param fields 要处理的字段映射
     * @param vars 所有变量
     */
    private resolveObj;
    /**
     * 对结果对象进行 fileds 的转换和映射处理，如果一个数据会 map 处理所有元素
     * @param result 要处理的结果对象
     * @param fields 要处理的字段映射
     * @param vars 所有变量
     */
    private resolve;
    /**
     * 执行当前处理上下文，并返回处理结果
     * 所有的平级 fileds 会并行的处理，子级会在父级完成后处理
     * 最后，返回的是完全处理好的结果对象
     */
    execute(): any;
}
export default Context;
