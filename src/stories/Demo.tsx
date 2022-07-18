import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import React, { useState } from 'react';

import {
  Input,
  Select,
  Switch,
  InputNumber,
  Upload,
  Rate,
  Checkbox,
  Radio,
  Slider,
  Table,
  Button,
  Icon,
  Tooltip,
  Row,
  Col,
} from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
// @ts-ignore
import { Form, FormItem, PureFormItem, PlainText } from '../index';

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
  const [showMethodTip, triggerMethodTip] = useState(false);

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
        <FormItem label="组件版本" name="componentVersion" control={control} defaultValue="1.0.0">
          <PlainText />
        </FormItem>

        <FormItem
          label={
            <span>
              组件名称&nbsp;
              <Tooltip title="代理的表单组件 placeholder 设为空字符串可以不显示 placeholder">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          labelText="组件名称"
          name="componentName"
          control={control}
          required
        >
          <Input placeholder="" />
        </FormItem>

        <FormItem label="是否启用" name="enabled" control={control} valuePropName="checked">
          <Switch />
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

        <PureFormItem label="调用地址" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex' }}>
            <FormItem
              labelText="调用地址"
              name="address"
              control={control}
              required
              style={{ flex: 1 }}
            >
              <Input />
            </FormItem>
            <span style={{ marginBottom: 24, marginTop: -1 }}>
              <Button type="primary" style={{ marginLeft: 8 }}>
                额外内容
              </Button>
            </span>
          </div>
        </PureFormItem>

  

        {showMethodTip && (
          <FormItem label="注意" name="methodTip" control={control} defaultValue="你选择了POST方式">
            <PlainText />
          </FormItem>
        )}

 

        <FormItem label="返回数据类型" name="responseType" control={control} required>
          <Radio.Group
            options={[
              { label: 'json', value: 'json' },
              { label: 'xml', value: 'xml' },
              { label: 'text', value: 'text' },
            ]}
          />
        </FormItem>

        <PureFormItem label="InputNumber" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex' }}>
            <FormItem
              labelText="调用地址"
              name="input-number"
              control={control}
              required
              defaultValue={3}
            >
              <InputNumber min={1} max={10} placeholder="" />
            </FormItem>
            <span> machines</span>
          </div>
        </PureFormItem>

   

        <FormItem label="Slider" name="Slider" control={control}>
          <Slider
            marks={{
              0: 'A',
              20: 'B',
              40: 'C',
              60: 'D',
              80: 'E',
              100: 'F',
            }}
          />
        </FormItem>

        <FormItem label="Slider" name="Slider" control={control} defaultValue={['A', 'B']}>
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              <Col span={8}>
                <Checkbox value="A">A</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox disabled value="B">
                  B
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="C">C</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="D">D</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="E">E</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </FormItem>

        <FormItem label="Rate" name="rate" control={control} defaultValue={3.5}>
          <Rate />
        </FormItem>

        <FormItem
          label="Upload"
          name="upload"
          control={control}
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
        </FormItem>

        <FormItem
          label="Dragger"
          name="Dragger"
          control={control}
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
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