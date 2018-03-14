# YamlQL 
----

## 1. 为什么开发 YamlQL

在开发面向 PC 的单页应用（SPA）或移动端应用时，大多数情形之一都会依赖服务端 API，比如基于 REST API。

REST API 最大的问题是其多端点的本质。这要求客户端进行多次往返以获取数据。REST API 通常是端点的集合，其中每个端点代表一个资源。因此，当客户端需要获取多个资源的数据时，需要对 REST API 进行多次往返，以将其所需的数据放在一起。

在 REST API 中，没有客户端请求语言，客户端无法控制服务器返回的数据，不能指定为该资源中的记录选择哪些字段。这意味着 REST API 服务将始终返回所有字段，而不管客户端实际需要哪些，超量获取不需要的信息。这对客户端和服务器而言都是网络和内存资源的浪费。

如上的问题正是 GraphQL 试图要解决的问题，GraphQL 使用图与数据通信，数据自然是图，如果需要表示任何数据，右侧的结构便是图。GraphQL 运行时允许使用与该数据的自然图形式匹配的图 API 来表示数据，告知服务器需要哪些数据，服务器需要用实际的数据来满足客户端的数据需求。

GraphQL schema 是强类型的，创建一个 schema 要定义具有类型的字段，除了基本类型，所有 schema 中的其他类型都需要定义。强类型是 GraphQL 优点，但对于我们积累多年的面向众多业业务、产品的传统和 RESTful API，还有大量也并不符合 RESTful 的定义的基于 HTTP 的 API，为了 GraphQL 的优点而想要使用，需要投入的改造还是太大了，况且不少应用存在多年上下游依赖众多，根本动不了。

或可以尝试开发一个中间层，用于将所有 HTTP API 封装成 GraphQL API，但这样的成本也是巨大的，并且在上游 API 发生变化时，总还是需要调整中间层代码。schema 中的各种自定义类型，每个类型或还需要不同的 resolve 函数，企图做一个图形化的配置并不容易，费很多大劲做了大概率也会有妥协并支持并不完整，最后，易用性也会极差。

YamlQL 吸取了 GraphQL 的大多数优点，比如「减少数据查询、按需获取内容、字段映射」，但 YamlQL 不要求强类型，不需要定义 schema。YamlQL 还具有强于 GraphQL 的数据映射和转换能力。

（未完，待补充）


## 2. YamlQL 用法说明

从名称上就能看出来 YamlQL 的语法是 `yaml`，我们需要一种数据格式，并且它易于阅读和书写，所以选择了 `yaml` 并以此命名为 `YamlQL`，所以于 `YamlQL` 是一种基于 `yaml` 的查询语言，`YamlQL` 是声明式的，在声明查询的同时，也定义了要返回数据的结构。


### 2.1. 数据查询

一个最普通的查询，查询一个用户信息，并放到返回结构的 `user` 中

```yaml
user: 
  action: getFirstUser
```

返回
```json
{
  "user": {
    "userId": "user1",
    "userName": "bob"
  }
}
```

可以同时执行多个 `action`，例如下边的查询

```yaml
user1: 
  action: getUser
  params: 1

user2:
  action: getUser
  params: 2
```

将会返回如下结果

```json
{
  "user1": {
    "userId": "user1",
    "userName": "bob"
  }
}
```

### 2.2. 声明要返回的字段
```yaml
user:  
  action: getUser
  fields:
    id: userId
    name: userName
```

返回
```json
{
  "user": {
    "id": "user1",
    "name": "bob"
  }
}
```

也可以只声明返回字段，但不进行映射
```yaml
user: 
  action: getUser
  fields:
  	id: true
  	name: true
```

### 2.3. 结构映射




### 2.4. 嵌套查询

```yml

```
