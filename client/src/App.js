import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import {getPosts} from './store/actions/posts';
import useStyles from './styles';
import memories from './images/memories.png';

const App = () => {
    return <p>hello</p>
};

export default App;
