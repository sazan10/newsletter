import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import React, {Component} from 'react';
import './App.css';
import Grid from "@material-ui/core/Grid";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Subgrid from './subgrid';
import SubgridLeft from './subgrid_left';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

const Container = styled.div`
    border: 3px solid lightgrey
    border-radius: 1px;
    padding: 2px;
    margin-bottom: 2px;  
    background-color: ${props => props.isDragDisabled?
        'lightgrey':props.isDragging? 'lightgreen': 'white'}
    display: flex;
    cursor: grab;
    justify-content: center;
`;

class App extends Component {
  state={
    left:null,
    showProps:false,
    buttonText:"Button",
    showCK:false,
    data:"Hello",
    leftComponent:[]
  }
componentDidMount(){
  this.type="";
  this.componentIndex=2;
}
ckeditorOpen=()=>{
this.type="text";
  let data = (<CKEditor
    editor={ ClassicEditor }
    data={this.state.data}
    onInit={ editor => {
        // You can store the "editor" and use when it is needed.
        // console.log( 'Editor is ready to use!', editor );
    } }
    onChange={ ( event, editor ) => {
        const data = editor.getData();
        console.log(data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        this.setState({data: data}); 
    } }
/>);
  // let newState1={
  //   left:data
  // }
  // this.setState(newState1);
  this.setState({
    leftComponent:[...this.state.leftComponent, data]
  });
  console.log("state",this.state)
}
  buttonChange=(e)=>{
    let buttText=e.target.value;
    this.setState({buttonText:buttText})
    if(this.state.leftComponent && this.type==="button")
      {
       this.componentIndex++;
        let butt=(<SubgridLeft id= "leftButton"  classe= "button" disabled={true} onClick={this.buttonClick} index={this.componentIndex}>{e.target.value}</SubgridLeft>);
        // this.setState({
        //   left:butt
        // });
        this.setState({
          leftComponent:[...this.state.leftComponent,butt]
        });

        console.log("state",this.state)


      }
      else if (this.state.leftComponent && this.type==="text")
      {
        let data = (<CKEditor
          editor={ ClassicEditor }
          data={this.state.data}
          onInit={ editor => {
              // You can store the "editor" and use when it is needed.
              // console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              console.log(data);
              this.setState({data: data});
          } }
      />);
      let data1=<Container onClick={this.ckeditorOpen}>{this.state.data}</Container>;
          // let newState1={
          //   left:data1
          // }
          let newState1={
            leftComponent:[...this.state.leftComponent,data1]
          }
          this.setState(newState1);
      }
    console.log(e.target.value,this.state)
  }
  delete=()=>
  {
    // this.setState({buttonText:"Button",left:null,showProps:false});
    this.setState({buttonText:"Button",leftComponent:[],showProps:false});

    this.type="";
  }
  formSubmit=(e)=>{
    e.preventDefault();
    this.setState({buttonText:'hello'});
    console.log("state",this.state);
  }
  buttonClick=()=>{
    console.log("hello");
    this.setState({showProps:true});
  }

  
    onDragEnd=(result)=>
    {
      const {destination,source,draggableId}= result;
      if(!destination)
      {
        return;
      }
      console.log("destination droppable id",destination.droppableId)
      if(destination.droppableId==="1")
      {
        switch(source.index)
        {
         
          case 0:
          this.type="button";
          this.componentIndex++;
        let butt=(<SubgridLeft id= "leftButton" index={this.componentIndex} classe= "button" disabled={true} onClick={this.buttonClick}>{this.state.buttonText}</SubgridLeft>);
        // this.setState({
        //   left: butt
        // });
        this.setState({
          leftComponent: [...this.state.leftComponent,butt]
        });
          console.log("dsfdsfds",this.state);
          break;
          case 1:
          this.type="text";

      let data1=<Container onClick={this.ckeditorOpen}>{this.state.data}</Container>;
      
      // this.setState({
      //   left:data1
      // });
      this.setState({
        leftComponent:[...this.state.leftComponent,data1]
      });
          break;
          default:
          break;
        }
      }
      console.log(result, "destination:", destination, " source:",source, " draggableId:",draggableId);
    }

    render(){
 
     let form_=( <form onSubmit={ (e) => this.formSubmit(e)}><input type="text" onChange={this.buttonChange}></input><button type="submit" >SUBMIT</button><button onClick={this.delete}>DELETE</button></form>);
       
  let button="button";
  let index=[0,1,3];
    return (
      <div>
      <div className="App">
      <DragDropContext onDragEnd={this.onDragEnd}  >    
       < Grid container spacing={5} className="side" >
       <Droppable droppableId="1" >
      {provided=>(
           <Grid item className="left" item xs={12} sm={8}  ref={provided.innerRef} {...provided.droppableProps}>
           {/* <Subgrid index={index[2]} id="3">s </Subgrid> */}
           {/* {provided.placeholder} */}
           {/* {this.state.left} */}
           {this.state.leftComponent}

           </Grid>
      )}
      </Droppable>
             <Droppable droppableId="2">
      {provided=>(
           <Grid className="right" item xs={12} sm={4} ref={provided.innerRef} {...provided.droppableProps} hidden={this.state.showProps} >
           <Subgrid index={index[0]} id="button"  classe="subgrid" disabled={false}>
            {/* {provided.placeholder} */}
           {button}</Subgrid>
           <Subgrid index={index[1]} id="text"  classe="subgrid" disabled={false} >Text</Subgrid>
           </Grid>
           
      )}
      </Droppable>
      <Grid className="right" item xs={12} sm={4} hidden={!this.state.showProps}>
      {form_}
      </Grid>
      </Grid>
      </DragDropContext>

      </div>

      </div>

    );
    }
  }
  



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
