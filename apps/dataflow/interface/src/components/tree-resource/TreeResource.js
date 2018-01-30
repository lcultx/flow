import React, { Component } from 'react';
import { Layout, Row, Col, Modal, Form, Input, Button, Radio, Breadcrumb } from 'antd';
import SearchTree from './SearchTree';
import { ContextMenu } from '../context-menu/ContextMenu';
import DataForm from '../data-form/DataForm'


export default class TreeResource extends React.Component {

    state = {};

    getItemByGUID(guid) {
        var data = this.props.data || [];
        var item = _(data)
            .thru(function (coll) {
                return _.union(coll, _.map(coll, 'detail.children'));
            })
            .flatten()
            .find({ guid: guid });
        return item;
    }

    getItemParent(item) {
        var data = this.props.data || [];
        return _.find(data, (item) => {
            return item.detail && item.detail.children.indexOf(item) > -1
        })
    }

    menuActions = {
        newEnumValue: {
            title: '新建值',
            action: () => {
                this.setState({
                    editMode: 'addValue',
                    editingItemId: this.rightClickedItem.guid
                })
            }
        },
        delEnumValue: {
            title: '删除值',
            action: () => {
                var item = this.getItemParent(this.rightClickedItem)
                this.props.callbacks.deleteItemValue(item, this.rightClickedItem)
            }
        },
        newEnum: {
            title: '新建项',
            action: () => {
                this.setState({
                    editMode: 'add'
                })
            }
        },
        editEnum: {
            title: '编辑项',
            action: () => {
                this.setState({
                    editMode: 'edit',
                    editingItemId: this.rightClickedItem.guid
                })
            }
        },
        delEnum: {
            title: '删除项',
            action: () => {
                Modal.confirm({
                    title: `您确定要删除枚举项${this.rightClickedItem.name}吗？ `,
                    content: '删除枚举项，该项下所有的枚举值也会被删除并且不可恢复',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk: () => {
                        this.props.callbacks.deleteItem(this.rightClickedItem)
                    }
                });
            }
        }
    }

    onTreeContainerRightClick(ev) {
        ev.preventDefault();
        this.openRightClickMenu(ev.pageX, ev.pageY, ['newEnum'])
    }

    openRightClickMenu(x, y, actionKeys) {
        this.rightClickMenu.show({
            x,
            y,
            items: actionKeys.map((key) => {
                return { key: key, title: this.menuActions[key].title }
            })
        })
    }

    openRightClickMenuClick(item) {
        this.rightClickMenu.hide();
        this.menuActions[item.key].action();
    }


    getTreePanel() {
        var data = this.props.data || [];
        var data = data.map((item) => {
            return {
                key: item.guid,
                title: item.detail ? item.detail.name : item.name,
                children: (item.detail && item.detail.children) ? item.detail.children.map((itemValue) => {
                    return {
                        key: itemValue.guid,
                        title: `${itemValue.name} [${itemValue.label}]`,
                    }
                }) : []
            }
        })

        console.log(data)
        return <SearchTree data={data}
            onExpand={(expandedKeys) => {
                var data = this.props.data || [];
                var key = expandedKeys[0];
                var item = _.find(data, { guid: key });
                if (item) {
                    //this.props.fetchEnumValues(item.guid);
                    this.props.callbacks['onTreeItemClick'](item)
                }
            }}
            onClick={(clickKeys, ev) => {
                var data = this.props.data || [];
                var key = clickKeys[0];
                if (!key) {
                    return
                }
                if (ev.isLeafNode) {
                    this.setState({
                        editingItemIValued: key,
                        editMode: 'editValue'
                    })
                } else {
                    //this.props.fetchEnumValues(key);
                    var item = _.find(data, { guid: key });

                    this.props.callbacks['onTreeItemClick'](item)
                    this.setState({
                        editingItemIValued: null,
                        editingItemId: key,
                        editMode: 'edit'
                    })
                }
            }}
            onRightClick={(ev) => {

                ev.event.preventDefault();
                ev.event.stopPropagation();
                var key = ev.node.props.eventKey
                var rightClickItem = this.getItemByGUID(key);
                this.rightClickedItem = rightClickItem;


                if(/(.*)\.item$/.test(rightClickItem._class)){
                    this.openRightClickMenu(ev.event.pageX, ev.event.pageY, ['delEnumValue'])
                }else{
                    this.openRightClickMenu(ev.event.pageX, ev.event.pageY, ['newEnumValue', 'editEnum', 'delEnum'])
                }
            }}
        ></SearchTree>
    }


    render() {
        var itemValue = this.state.editingItemIValued ? this.getItemByGUID(this.state.editingItemIValued) : {};
        var item = this.state.editingItemId ? _.find(this.props.data, { guid: this.state.editingItemId }) : {};


        var callbacks = this.props.callbacks;

        var editPanels = {
            add: () => {
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item> <span style={{ color: '#f50' }}>添加项</span></Breadcrumb.Item>
                        </Breadcrumb>
                        <DataForm config={this.props.config.addItem} onSubmit={callbacks.addItem} />
                    </div>
                )
            },
            edit: () => {
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item> <span style={{ color: '#f50' }}>编辑项</span></Breadcrumb.Item>
                        </Breadcrumb>
                        <DataForm config={this.props.config.editItem} data={item.detail} onSubmit={callbacks.editItem} />
                    </div>
                )

            },
            addValue: () => {
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item> <span style={{ color: '#f50' }}>添加值</span></Breadcrumb.Item>
                        </Breadcrumb>
                        <DataForm config={this.props.config.addItemValue} onSubmit={(values) => {
                            callbacks.addItemValue(item || this.state.rightClickedItem, values)
                        }} />
                    </div>
                )
            },
            editValue: () => {
                return (
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item> <span style={{ color: '#f50' }}>编辑值</span></Breadcrumb.Item>
                        </Breadcrumb>
                        <DataForm config={this.props.config.editItemValue} data={itemValue} onSubmit={(values) => {
                           callbacks.editItemValue(item || this.state.rightClickedItem, values)
                        }} />
                    </div>
                )
            }
        }

        return <Layout.Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, height: '100%' }}>
            <Row gutter={20} style={{ minWidth: 800, height: '100%' }} >
                <Col span={8} style={{ height: '100%', userSelect: 'none' }} onContextMenu={this.onTreeContainerRightClick.bind(this)}>
                    {this.getTreePanel()}
                    <ContextMenu ref={(c) => { this.rightClickMenu = c; }} onClick={this.openRightClickMenuClick.bind(this)}></ContextMenu>
                </Col>

                <Col span={16} style={{ paddingTop: 46 }}>
                    {this.state.editMode ? editPanels[this.state.editMode]() : null}
                </Col>
            </Row>
        </Layout.Content>
    }
}