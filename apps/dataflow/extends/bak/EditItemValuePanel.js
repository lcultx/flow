import React, { Component } from 'react';
import { Form, Input, Button, Radio, Breadcrumb, Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;


@Form.create({
  mapPropsToFields:function(props){
    var fields = {};
    for(var key in props.enumValue){
      var value = props.enumValue[key];
      fields[key] = Form.createFormField({
        value:value
      })
    }

    return fields
	}
})
export default class EditEnumValuePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'vertical',
    };
  }
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }


  handleSubmit(ev){
    ev.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
       this.props.onSubmit(values)
      }
    });
  }
  render() {
    const { formLayout } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 },
    }
    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 4 },
    }

    let { enumValue, enumItem } = this.props;
    const { getFieldDecorator } = this.props.form;
    return ( 
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item> <span style={{ color: '#f50' }}>修改枚举值</span></Breadcrumb.Item>
          {enumItem ? <Breadcrumb.Item>{enumItem.name}</Breadcrumb.Item> : null}
          {enumValue ? <Breadcrumb.Item>{enumValue.name || enumValue.label}</Breadcrumb.Item> : null}

        </Breadcrumb>
        <Form 
          onSubmit={this.handleSubmit}
          layout={formLayout} style={{ marginTop: 20 }} onSubmit={this.handleSubmit.bind(this)}>
          <FormItem  style={{display:"none"}}
            label="GUID（唯一编号）："
            {...formItemLayout}
          >
            {getFieldDecorator('guid', {
              initialValue: enumValue.guid,
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label="名称" labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}>


            <Col span={10}>
              {getFieldDecorator('name', {
                initialValue: enumValue.name,
              })(<Input />)}
            </Col>
            <Col span={6}>
              {getFieldDecorator('option_valid', {
                valuePropName: 'checked',
                initialValue: enumValue.option_valid,
              })(
                <Checkbox>有效性</Checkbox>
                )}
            </Col>


          </FormItem>

          <FormItem
            label="标签"
            {...formItemLayout}
          >
            {getFieldDecorator('label', {
              initialValue: enumValue.label,
            })(<Input />)}
          </FormItem>




          <Row>数据配置</Row>
          <FormItem
            label="代码"
            {...formItemLayout}
          >
            {getFieldDecorator('data_code', {
              initialValue: enumValue.data_code,
            })(<Input />)}
          </FormItem>
          <FormItem
            label="内容"
            {...formItemLayout}
          >
            {getFieldDecorator('data_value', {
              initialValue: enumValue.data_value,
            })(<Input />)}
          </FormItem>
          <FormItem
            label="别名"
            {...formItemLayout}
          >
            {getFieldDecorator('data_alias', {
              initialValue: enumValue.data_alias,
            })(<Input />)}
          </FormItem>



          代码生成

          <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Row gutter={16}>
              <Col>
                前端
                {getFieldDecorator('source_client_typescript', {
                  valuePropName: 'checked',
                  initialValue: enumValue.source_client_typescript,
                })(
                  <Checkbox>3D软件 (TypeScript)</Checkbox>
                  )}

                {getFieldDecorator('source_client_csharp', {
                  valuePropName: 'checked',
                  initialValue: enumValue.source_client_csharp,
                })(
                  <Checkbox>D工具 (C#) </Checkbox>
                  )}


                {getFieldDecorator('source_client_cpp', {
                  valuePropName: 'checked',
                  initialValue: enumValue.source_client_cpp,
                })(
                  <Checkbox> 3D工具 (C++) </Checkbox>
                  )}
              </Col>

              <Col>

                前端服务

              {getFieldDecorator('source_service_node', {
                  valuePropName: 'checked',
                  initialValue: enumValue.source_service_node,
                })(
                  <Checkbox checked={enumValue.source_service_node}> 数据接口 (NodeJS) </Checkbox>
                  )}
              </Col>
              <Col>
                后端服务
              {getFieldDecorator('source_service_java', {
                  valuePropName: 'checked',
                  initialValue: enumValue.source_service_java,
                })(
                  <Checkbox> 数据接口 (Java)</Checkbox>
                  )}
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            备注信息
          {getFieldDecorator('note', {
                  initialValue: enumValue.note
           })(
              <TextArea rows={4}>
              </TextArea>
              )}
          </FormItem>


          <FormItem {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
          </FormItem>



        </Form>
      </div>
    );
  }
}

