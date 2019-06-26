import React from 'react';
import Grid from "@material-ui/core/Grid";
import './subgrid.css';
import { Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const subgrid=(props)=>
{
    return(

        <Draggable draggableId={props.id} index={props.index} isDragDisabled={props.disabled} >
        {(provided)=>(
        <Grid className={props.classe}  {...provided.draggableProps}    {...provided.dragHandleProps} ref={provided.innerRef}>
        {props.children}
        </Grid>
        )}
        </Draggable>
    )
}
export default subgrid;