---
title: 快速上手
sidemenu: false
---

# react-hook-form-with-antd

[antd 3.x 版本](https://ant-design-3x.gitee.io/components/form-cn/) 中的表单不支持 react hooks 的使用方式并且存在一定的[性能问题](https://github.com/ant-design/ant-design/issues?q=form+%E5%8D%A1%E9%A1%BF)，而 react-hook-form 又在社区广受好评，在实际项目中也能够同 antd 很好的结合使用。但 [antd Form](https://ant-design-3x.gitee.io/components/form-cn/) 组件中的 Form.Item 只适配了 rc-form，即能够根据 rc-form 的 `getFieldDecorator` 中的 `required`、`rules` 属性自动设置 Form.Item 的 `validateStatus`、`help`。所以创建了该组件用于连接 antd 的 Form.Item 和 react-hook-form。

使用该组件前，请先熟悉如何使用 [react-hook-form](https://react-hook-form.com/get-started#Quickstart)。

## 安装

```bash
yarn add react-hook-form-with-antd -D
```

```jsx | pure
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from 'antd';
import { Form, FormItem, PureFormItem } from 'react-hook-form-with-antd';

const App = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
  });

  return (
    <Form>
      <FormItem
        label="姓名"
        name="name"
        required
        control={control}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Input />
      </FormItem>
      <PureFormItem wrapperCol={{ span: 20, offset: 4 }}>
        <Button onClick={handleSubmit((data) => console.log('data', data))}>保存</Button>
      </PureFormItem>
    </Form>
  );
};
```

## 示例

<code src="./examples/index.tsx" />

## Props

react-hook-form-with-antd 总共提供了以下三个组件：

- Form
- FormItem
- PureFormItem
- PlainText

### Form

Form 完全等同于 antd 中的 Form 组件，可直接参考 [antd 官方文档](https://ant-design-3x.gitee.io/components/form-cn/#Form)。

> 注意：Form 虽然完全等同于 antd 中的 Form 组件，但请不要使用 Form.create 等 rc-form 的能力，此处我们只想利用 Form 本身的样式而已。

### PureFormItem

某些场景下你不需要将 FormItem 和 react-hook-form 进行连接，比如上方示例中的保存按钮，它只是想使用 FormItem 的布局属性，这时候可以使用 PureFormItem。

PureFormItem 完全等同于 antd 中的 Form.Item 组件，可直接参考 [antd 官方文档](https://ant-design-3x.gitee.io/components/form-cn/#Form.Item)。

### FormItem

FormItem 将根据 react-hook-form 的表单状态，自动设置 antd Form.Item 的`validateStatus`、`help` 属性，额外的如果表单控件没有设置 placeholder，还默认了 placeholder 属性。

> placeholder 的属性值会根据 props.children 的 type 来判断提示 `请输入${labelText}` 或者 `请选择${labelText}`。

| 参数 | 说明 | 类型 | 必填性 | 默认值 |
| --- | --- | --- | --- | --- |
| children | 被代理的表单控件 | React.ReactChild | 必填 | - |
| name | 用于 react-hook-form，作为表单值的 key | string | 必填 | - |
| control | react-hook-form 中会使用到的 control | ControllerProps['control'] | 必填 | - |
| rules | react-hook-form 中会使用到的 rules，具体设置参考[react-hook-form 文档](https://react-hook-form.com/get-started#Applyvalidation) | ControllerProps['rules'] | 必填 | - |
| colon | 配合 label 属性使用，表示是否显示 label 后面的冒号 | boolean | 非必填 | true |
| extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | string\|ReactNode | 非必填 | - |
| defaultValue | 表单项的默认值 | ControllerProps['defaultValue'] | 非必填 | - |
| label | 同 [antd Form.Item](https://ant-design-3x.gitee.io/components/form-cn/#Form.Item) 的 label 属性一致 | React.ReactNode | 非必填 | - |
| labelText | 用于 placeholder 及 required 中的提示文本 | string | 非必填 | 默认值为 等于 label 设置的值 |
| labelCol | 同 [antd Form.Item](https://ant-design-3x.gitee.io/components/form-cn/#Form.Item) 的 labelCol 属性一致。<br/> label 标签布局，同 \<Col\> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}。在 3.14.0 之后，你可以通过 Form 的 labelCol 进行统一设置。当和 Form 同时设置时，以 FormItem 为准。 | object | 非必填 | - |
| wrapperCol | 同 [antd Form.Item](https://ant-design-3x.gitee.io/components/form-cn/#Form.Item) 的 wrapperCol 属性一致。<br/> 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。在 3.14.0 之后，你可以通过 Form 的 wrapperCol 进行统一设置。当和 Form 同时设置时，以 FormItem 为准。 | object | 非必填 | - |
| labelAlign | 标签文本对齐方式。 | `'left'` \| `'right'` | 非必填 | `'left'` |
| required | 表单项是否必填，将同 rules.required 进行合并，建议在此设置 required 即可，无需额外设置 rules.required 属性。如果设置为 true，默认提示文本为`${labelText} 不能为空`。如果想自定义提示文本，则直接设置 required 为 相应提示文本即可。 | boolean \| string | 非必填 | false |
| hasFeedback | 同 [antd Form.Item](https://ant-design-3x.gitee.io/components/form-cn/#Form.Item) 的 hasFeedback 属性一致。<br/>配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用。 | boolean | 非必填 | false |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked' | string | 非必填 | 'value' |
| trigger | 收集子节点的值触发的事件 | string | 非必填 | 'onChange' |
| getValueFromEvent | 可以把 onChange 的参数（如 event）转化为控件的值 | (event: any) => value | 非必填 | - |
| style | 设置 Form.Item 的额外样式 | React.CSSProperties | 非必填 | - |

### PlainText

一个纯文本展示的组件，本质就是一个 `span 标签`，只不过扩展了 `value` 属性，方便一些只需要展示但也想通过 react-hook-form 代理的场景使用。

| 参数  | 说明             | 类型   | 必填性 | 默认值 |
| ----- | ---------------- | ------ | ------ | ------ |
| value | 文本组件显示的值 | string | 必填   | -      |
