import React, { Component } from 'react';
import { Breadcrumb, Input, Checkbox } from 'antd';
import * as actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import TreeResource from '../../components/tree-resource/TreeResource'

@connect(
    (state) => {
        return { structure: state.structure }
    },
    dispatch => bindActionCreators(actions, dispatch)
)
export default class Struct extends Component {

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
                <Breadcrumb.Item>结构定义</Breadcrumb.Item>
            </Breadcrumb>
            <TreeResource data={this.props.structure}
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
                            label: '配置信息',
                            children: [
                                [
                                    { label: '代码', field: 'code', Component: Input, span: 12 },
                                    { label: '名称', field: 'code_label', Component: Input, span: 12 }
                                ],
                                { label: '代码全称', field: 'code_full', Component: Input, span: 24 },
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
                            label: '配置信息',
                            children: [
                                [{ label: '类型', field: 'data_type_cd', Component: Input, span: 10 },
                                { label: '集合化', field: 'option_collection', Component: Checkbox, span: 6 }],
                                [{ label: '子类型', field: 'data_sub_type_cd', Component: Input, span: 10 },
                                { label: '持久化', field: 'option_persistent', Component: Checkbox, span: 6 }],
                                { label: '大小', field: 'data_value', Component: Input, span: 10 },
                                [
                                    { label: '标志', span: 3 },
                                    { label: '锁定', field: 'option_lock', Component: Checkbox, span: 7 },
                                    { label: '可获取', field: 'option_get', Component: Checkbox, span: 7 },
                                    { label: '可设置', field: 'option_set', Component: Checkbox, span: 7 },
                                ],
                                [
                                    { label: '代码', field: 'code', Component: Input, span: 12 },
                                    { label: '名称', field: 'code_label', Component: Input, span: 12 }
                                ],
                                { label: '代码全称', field: 'code_full', Component: Input, span: 24 }
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
