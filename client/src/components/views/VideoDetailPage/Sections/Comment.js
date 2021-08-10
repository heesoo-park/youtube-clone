import React, {useState} from 'react'
import Axios from 'axios'
import { Button, Input } from 'antd';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';

const { TextArea } = Input;

function Comment(props) {


    const videoId = props.postId;

    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment',variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)

                    props.refreshFunction(response.data.result)
                } else {
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />

            {/* Comment Lists */}

            {props.commentLists && props.commentLists.map((comment, index)=> (
                (!comment.responseTo &&
                    <React.Fragment key={comment._id} >
                        <SingleComment  comment={props.comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
                    </React.Fragment>
                    
                )
                
            ))}
            
            {/* Root Comment Form */}

            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <TextArea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요"
                />
                <br />
                <Button style={{width: '20%', height:'52px'}} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comment
