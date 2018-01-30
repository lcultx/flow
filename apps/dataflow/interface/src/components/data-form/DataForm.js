import React, { Component } from 'react';
import { Form, Input, Button, Radio, Breadcrumb, Checkbox, Row, Col } from 'antd';
import _ from 'lodash';
import './data-form.less';
const TextArea = Input.TextArea;


@Form.create({
  mapPropsToFields: function (props) {
    var fields = {};
    for (var key in props.data) {
      var value = props.data[key];
      fields[key] = Form.createFormField({
        value: value
      })
    }
    return fields
  }
})
export default class DataForm extends React.Component {


  handleSubmit(ev) {
    ev.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    });
  }


  // [
  //     { label: '名称', field: 'name', Component: Input },
  //     { label: '标签', field: 'label', Component: Input }
  // ]
  getFromItemsByConfig(itemConfigList, data) {
    const { getFieldDecorator } = this.props.form;

    var result = itemConfigList.map((config) => {
      if (_.isArray(config)) {
        return this.getMulitValueFromItem(config, data)
      } else {

        if (config.children && _.isArray(config.children)) {
          return <div>
            <Row>{config.label}</Row>
            {this.getFromItemsByConfig(config.children, data)}
          </div>
        } else {
          // [
          //     { label: '名称', field: 'name', Component: Input },
          //     { label: '标签', field: 'label', Component: Input }
          // ]
          return this.getInputElement(config,data);
        }
      }
    });


    return result;
  }

  getInputElement(config,data){
    const { getFieldDecorator } = this.props.form;
    
    var inputElement = null;
    if (config.Component == Checkbox) {
      inputElement = getFieldDecorator(config.field, {
        valuePropName: 'checked',
        initialValue: data && data[config.field],
      })(<config.Component style={{display:config.display ? config.display:'block'}}>{config.label} </config.Component>)
    } else {
      inputElement = <Row style={{display:config.display ? config.display:'block'}}>
        <Col span="4">
          <label>{config.label}</label>
        </Col>
        <Col span="20">
          {getFieldDecorator(config.field, {
            initialValue: data && data[config.field],
          })(<config.Component />)}
        </Col>
      </Row>
    }
    return inputElement;
  }


  //   [
  //     { label: '名称', field: 'name', Component: Input, span: 10 },
  //     { label: '有效性', field: 'option_valid', Component: Checkbox, span: 6 }
  // ]
  getMulitValueFromItem(configList, data) {

    var cols = configList.map((config) => {

      if (config.Component && config.field) {
        return <Col span={config.span}>
          {this.getInputElement(config,data)}
        </Col>
      } else {
        return <Col span={config.span}>
          {config.label}
        </Col>
      }



    })


    return <Row gutter={16}>
        {cols}
      </Row>

  }



  render() {


    let { data, config } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="data-form"
          layout='vertical' style={{ marginTop: 20 }} onSubmit={this.handleSubmit.bind(this)}>
          {this.getFromItemsByConfig(config, data)}
          <Row>
            <Button type="primary" htmlType="submit">保存</Button>
          </Row>

        </Form>
      </div>
    );
  }
}

