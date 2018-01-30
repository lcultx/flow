import React, { Component } from 'react';
import { Breadcrumb, Input, Checkbox } from 'antd';
import * as actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import TreeResource from '../../components/tree-resource/TreeResource'

@connect(
    (state) => {
        return { constant: state.constant }
    },
    dispatch => bindActionCreators(actions, dispatch)
)
export default class Const extends Component {

    componentDidMount() {
        this.props.fetchItemList();
    }

    constructor() {
        super();
        this.state = {}
    }

    render() {
        return <div style={{ height: '100%' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>数据定义</Breadcrumb.Item>
                <Breadcrumb.Item>枚举定义</Breadcrumb.Item>
            </Breadcrumb>
            <TreeResource data={this.props.constant}
                callbacks={{
                    ...this.props,
                    onTreeItemClick: (item) => { this.props.fetchItemValues(item.guid); },
                }}
                config={{//TODO 把这块变成yml
                    addItem: [
                        { label: '名称', field: 'name', Component: Input },
                        { label: '标签', field: 'label', Component: Input }
                    ],
                    addItemValue: [
                        { label: '名称', field: 'name', Component: Input },
                        { label: '标签', field: 'label', Component: Input },
                        { label: '值', field: 'data_value', Component: Input }
                    ],
                    editItem: [
                        [
                            { label: 'GUID', field: 'guid', Component: Input, display: 'none' },
                            { label: '名称', field: 'name', Component: Input, span: 10 },
                            { label: '有效性', field: 'option_valid', Component: Checkbox, span: 6 }
                        ],
                        { label: '标签', field: 'label', Component: Input },
                        {
                            label: '数据配置',
                            children: [
                                { label: '代码', field: 'data_code', Component: Input, span: 24 },
                                [
                                    { label: '前缀', field: 'data_prior_fix', Component: Input, span: 12 },
                                    { label: '后缀', field: 'data_after_fix', Component: Input, span: 12 }
                                ]
                            ]
                        },
                        {
                            label: '代码生成',
                            children: [
                                [
                                    { label: '前端', span: 3 },
                                    { label: '3D软件 (TypeScript)', field: 'source_client_typescript', Component: Checkbox, span: 7 },
                                    { label: '3D工具 (C#) ', field: 'source_client_csharp', Component: Checkbox, span: 7 },
                                    { label: '3D工具 (C++) ', field: 'source_client_cpp', Component: Checkbox, span: 7 },
                                ],
                                [
                                    { label: '前端服务', span: 3 },
                                    { label: '数据接口 (NodeJS)', field: 'source_service_node', Component: Checkbox, span: 7 }
                                ],
                                [
                                    { label: '后端服务', span: 3 },
                                    { label: '数据接口 (Java)', field: 'source_service_java', Component: Checkbox, span: 7 }
                                ]
                            ]
                        },
                        { label: '备注信息', field: 'note', Component: Input.TextArea }
                    ],
                    editItemValue: [
                        [
                            { label: 'GUID', field: 'guid', Component: Input, display: 'none' },
                            { label: '名称', field: 'name', Component: Input, span: 10 },
                            { label: '有效性', field: 'option_valid', Component: Checkbox, span: 6 }
                        ],
                        { label: '标签', field: 'label', Component: Input },
                        {
                            label: '数据配置',
                            children: [
                                { label: '代码', field: 'data_code', Component: Input },
                                { label: '内容', field: 'data_value', Component: Input },
                                { label: '别名', field: 'data_alias', Component: Input }
                            ]
                        },
                        {
                            label: '代码生成',
                            children: [
                                [
                                    { label: '前端', span: 3 },
                                    { label: '3D软件 (TypeScript)', field: 'source_client_typescript', Component: Checkbox, span: 7 },
                                    { label: '3D工具 (C#) ', field: 'source_client_csharp', Component: Checkbox, span: 7 },
                                    { label: '3D工具 (C++) ', field: 'source_client_cpp', Component: Checkbox, span: 7 },
                                ],
                                [
                                    { label: '前端服务', span: 3 },
                                    { label: '数据接口 (NodeJS)', field: 'source_service_node', Component: Checkbox, span: 7 }
                                ],
                                [
                                    { label: '后端服务', span: 3 },
                                    { label: '数据接口 (Java)', field: 'source_service_java', Component: Checkbox, span: 7 }
                                ]
                            ]
                        },
                        { label: '备注信息', field: 'note', Component: Input.TextArea }
                    ]
                }}
            />
        </div>
    }
}