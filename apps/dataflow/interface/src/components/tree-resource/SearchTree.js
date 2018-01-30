import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
const { Header, Content, Sider } = Layout;


import { Tree, Input } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;




const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};




export default class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
    this.props.onExpand(expandedKeys)
  }

  onChange = (e) => {
    this.setState({
      searchValue:  e.target.value,
      autoExpandParent: true
    });
  }

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;

    const filter = (data) => data.filter((item)=>{
        return item.title.indexOf(searchValue) > -1
    })


    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={(clickKeys,e) => {
            if(typeof e.node.props.children != "undefined"){
              this.onExpand(clickKeys)
              this.props.onClick(clickKeys,{isLeafNode:false})             
            }else{
              this.props.onClick(clickKeys,{isLeafNode:true})              
            }
          }}
          onRightClick={this.props.onRightClick}
        >
          {loop(filter(this.props.data))}
        </Tree>
      </div>
    );
  }
}
