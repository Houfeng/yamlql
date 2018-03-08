# YamlQL 
----

#### 1. 普通查询
```yml
user: 
  action: getUser
  fields:
      
```

返回
```json
{
  "user": {
    "userId": "user1",
    "userName": "bob",
    "userAge": 30,
    "userGender": "male"
  }
}
```

#### 2. 声明要返回的字段
```yml
user:  
  - gt: $waaa
  - getUser: id
  - name: userName
    age: userAge
    rules: 
      - getRole: 
```

```gql
user: getUser(id,id){
  name: data.userName
  name,
}
```

返回
```json
{
  "user": {
    "name": "bob",
    "age": 30
  }
}
```

也可以只声明返回字段，但不进行映射
```yml
user: 
  - getUser: id
  - $map: 
      - userName
      - userAge
```

#### 3. 查询列表
```yml
userList: 
  - getUsers
  - $map:
      name: userName
      age: userAge
```

返回

```json
{
  "userList": [
    {...},
    {...}
  ]
}
```


#### 4. 子查询

```yml
user: 
  - getUser(id)
  - id: userId
    name: userName
    age: userAge
    roles: 
      - getRoles: id
      - items
        - name: roleName
          id: roleId
```

返回
```json
{
  "user": {
    "name": "bob",
    "age": 30,
    "roles": [
      {
        "name": "角色一",
        "id": "role1"
      },
      {
        "name": "角色二",
        "id": "role2"
      }
    ]
  }
}
```