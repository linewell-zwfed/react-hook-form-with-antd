# react-hook-form-with-antd

[antd 3.x 版本](https://ant-design-3x.gitee.io/components/form-cn/) 中的表单不支持 react hooks 的使用方式并且存在一定的[性能问题](https://github.com/ant-design/ant-design/issues?q=form+%E5%8D%A1%E9%A1%BF)，而 react-hook-form 又在社区广受好评，在实际项目中也能够同 antd 很好的结合使用。但 [antd Form](https://ant-design-3x.gitee.io/components/form-cn/) 组件中的 Form.Item 只适配了 rc-form，即能够根据 rc-form 的 `getFieldDecorator` 中的 `required`、`rules` 属性自动设置 Form.Item 的 `validateStatus`、`help`。所以创建了该组件用于连接 antd 的 Form.Item 和 react-hook-form。

使用该组件前，请先熟悉如何使用 [react-hook-form](https://react-hook-form.com/get-started#Quickstart)。

## 快速上手

### 安装
```bash
yarn add react-hook-form-with-antd -D
```

### 使用
```jsx | pure
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from 'antd';
import { Form, FormItem, PureFormItem } from 'react-hook-form-with-antd';


const App = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
  });

  return <Form>
    <FormItem label="姓名" name="name" requried control={control} labelCol={{span: 4}} wrapperCol={{span: 20}}>
      <Input />
    </FormItem>
    <PureFormItem wrapperCol={{span: 20, offset: 4}}>
      <Button onClick={handleSubmit(data => console.log('data', data))}>保存</Button>
    </PureFormItem>
  </Form>
}
```
## 文档
[组件文档](/src/index.md)

