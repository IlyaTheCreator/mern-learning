import React, {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {deletePost, likePost} from "../../../store/actions/posts"

import moment from "moment"
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from "@material-ui/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from "./styles"

const Post = ({post, setCurrentId}) => {
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    useEffect(() => {
        setLikeCount(post.likeCount)
    }, [post.likeCount])

    const classes = useStyles()
    const dispatch = useDispatch()

    const handleDelete = id => {
        dispatch(deletePost(id))
    }

    const handleLike = () => {
        setLikeCount(likeCount + 1)
        setIsLiked(true)
        dispatch(likePost(post._id))
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button disabled={isLiked} size="small" color="primary" onClick={() => handleLike()}><ThumbUpAltIcon fontSize="small" /> Like {likeCount} </Button>
                <Button size="small" color="primary" onClick={() => handleDelete(post._id)}><DeleteIcon fontSize="small" /> Delete</Button>
            </CardActions>
        </Card>
    );
};

export default Post;
