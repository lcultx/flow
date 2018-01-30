import * as React from "react";
import * as ReactDOM from "react-dom";
import './context-menu.less'
export class ContextMenu extends React.Component{
    state = {
        pos_x:0,
        pos_y:0,
        blurAutoClose:true
    };
    render() {
        var items = this.state.items || this.props.items || [];
        var {pos_x,pos_y,opened} = this.state;
        if (opened) {
    
            return (
                <div className="menu"    onClick={this.handleClick}
                    style={{
                        transform: `translate(${pos_x}px, ${pos_y}px)`,
                        height:items.length * 30 + 30 
                    }}>
                    {this.props.title ?      <div className="title">{this.props.title}</div> : null}
               
                    <div>
                        {items.map((item,index)=>{
                            return <div key={index} onClick={this.handleItemClick(item)}
                                    className="item"
                                    >{item.title}</div>
                        })}
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }



    handleItemClick(item){
        return (ev) =>{
            ev.preventDefault();
            ev.stopPropagation();
            if(this.props.onClick) this.props.onClick(item);
        }
  
    }

     componentDidMount() {
        this.setState({
            opened:   this.props.opened
        });
        window.document.addEventListener('click',(ev)=>{
            if(ev.srcElement != ReactDOM.findDOMNode(this)){
                if(this.state.blurAutoClose){
                    this.setState({
                        opened:false
                    })
                }
            }
        
        })
    }


     hide(){
        this.setState({
            opened: false
        })
    }

     show(ev) {
        this.setState({
            opened:true,
            items: ev.items || this.props.item,
            pos_x:ev.x,
            pos_y:ev.y
        })
    }


}