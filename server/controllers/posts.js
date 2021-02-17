import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find({}, null, {sort: {createdAt: -1}})

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    const {title, message, selectedFile, creator, tags} = req.body;

    const newPostMessage = new PostMessage({title, message, selectedFile, creator, tags})

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})

        res.json(updatedPost)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

    try {
        const response = await PostMessage.deleteOne({_id: _id})

        return res.status(200).json({message: "post deleted"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const likePost = async (req, res) => {
    const {id: _id} = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

    const post = await PostMessage.findById(_id)

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, {new: true})

        res.json(updatedPost)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export default router;
