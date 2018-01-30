import React, { Component } from 'react';
import { Form, Input, Button, Radio, Breadcrumb } from 'antd';
const FormItem = Form.Item;

@Form.create()
export default class AddEnumValuePanel extends React.Component {
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
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;

    let { enumValue, enumItem } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item> <span style={{ color: '#f50' }}>添加枚举值</span></Breadcrumb.Item>
          {enumItem ? <Breadcrumb.Item>{enumItem.name}</Breadcrumb.Item> : null}

        </Breadcrumb>
        <Form 
          onSubmit={this.handleSubmit}
          layout={formLayout} style={{ marginTop: 20 }} onSubmit={this.handleSubmit.bind(this)}>
          
          <FormItem
            label="Name（名称）："
            {...formItemLayout}
          >
            {getFieldDecorator('name')(<Input />)}
          </FormItem>
          <FormItem
            label="DataValue（值）："
            {...formItemLayout}
          >
            {getFieldDecorator('data_value')(<Input />)}
          </FormItem>
          <FormItem
            label="Label（标签）："
            {...formItemLayout}
          >
            {getFieldDecorator('label')(<Input />)}
          </FormItem>

          <FormItem
            label="DataAlias（别名）："
            {...formItemLayout}
          >
            {getFieldDecorator('data_alias')(<Input />)}
          </FormItem>


          <FormItem {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
          </FormItem>
          
        </Form>
      </div>
    );
  }
}

