import React, { useState } from 'react';
import { Input, Radio, Select, Table, Button } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
// @ts-ignore
import { Form, FormItem, PureFormItem } from 'react-hook-form-with-antd';

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};

const Demo = () => {
  const [formValue, setFormValue] = useState({});

  const { control, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'componentParams',
    control,
  });

  return (
    <div>
      <Form {...formItemLayout}>
        <FormItem label="组件名称" name="componentName" control={control} required>
          <Input />
        </FormItem>

        <FormItem label="组件类型" name="componentType" control={control} required>
          <Radio.Group
            options={[
              { label: 'restful', value: 'restful' },
              { label: 'webservice', value: 'webservice' },
              { label: '页面', value: '页面' },
            ]}
          />
        </FormItem>

        <FormItem label="调用地址" name="address" control={control} required>
          <Input />
        </FormItem>

        <FormItem label="调用方式" name="method" control={control} required>
          <Select>
            <Select.Option value="GET">GET</Select.Option>
            <Select.Option value="POST">POST</Select.Option>
          </Select>
        </FormItem>

        <PureFormItem label="参数列表">
          <Table bordered dataSource={fields} pagination={false} size="middle" rowKey="id">
            <Table.Column
              title="参数名称"
              key="name"
              render={(_, __, index) => (
                <FormItem
                  labelText="参数名称"
                  name={`componentParams.${index}.name`}
                  control={control}
                  required
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </FormItem>
              )}
            />
            <Table.Column
              title="参数说明"
              key="memo"
              render={(_, __, index) => (
                <FormItem
                  labelText="参数说明"
                  name={`componentParams.${index}.memo`}
                  control={control}
                  required
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </FormItem>
              )}
            />
            <Table.Column
              title="数据类型"
              key="type"
              width={120}
              render={(_, __, index) => (
                <FormItem
                  labelText="数据类型"
                  name={`componentParams.${index}.type`}
                  control={control}
                  required
                  style={{ marginBottom: 0 }}
                >
                  <Select>
                    <Select.Option value="Int">Int</Select.Option>
                    <Select.Option value="Float">Float</Select.Option>
                    <Select.Option value="Long">Long</Select.Option>
                    <Select.Option value="String">String</Select.Option>
                    <Select.Option value="Date">Date</Select.Option>
                  </Select>
                </FormItem>
              )}
            />
            <Table.Column
              title="默认值"
              key="defaultValue"
              render={(_, __, index) => (
                <FormItem
                  labelText="默认值"
                  name={`componentParams.${index}.defaultValue`}
                  control={control}
                  required
                  style={{ marginBottom: 0 }}
                >
                  <Input />
                </FormItem>
              )}
            />
            <Table.Column
              title="操作"
              key="action"
              width={60}
              align="center"
              render={(_, __, index) => (
                <a style={{ color: 'red' }} onClick={() => remove(index)}>
                  删除
                </a>
              )}
            />
          </Table>

          <Button
            type="primary"
            onClick={() => append({ name: '', memo: '', type: 'Int', defaultValue: '' })}
          >
            新增
          </Button>
        </PureFormItem>

        <FormItem label="返回数据类型" name="responseType" control={control} required>
          <Radio.Group
            options={[
              { label: 'json', value: 'json' },
              { label: 'xml', value: 'xml' },
              { label: 'text', value: 'text' },
            ]}
          />
        </FormItem>

        <PureFormItem wrapperCol={{ span: 21, offset: 3 }}>
          <p>表单值: {JSON.stringify(formValue)}</p>
          <Button onClick={handleSubmit((data) => setFormValue(data))}>获取表单值</Button>
        </PureFormItem>
      </Form>
    </div>
  );
};

export default Demo;
