import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {GoogleLogin} from "react-google-login"
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from "./Input"
import Icon from "./icon"

import {signup, signin} from "../../store/actions/auth"

import useStyles from "./styles"

const initialFormData = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = e => {
        e.persist()
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    const handleShowPassword = () => setShowPassword(prev => !prev)

    const switchMode = () => {
        setIsSignup(prev => !prev)
        setShowPassword(false)
    }

    const googleSuccess = async res => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({type: "AUTH", data: {result, token}})

            history.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = error => {
        console.log(error)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} evelation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input value={formData.firstName} name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input value={formData.lastName} name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }

                        <Input value={formData.email} name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input value={formData.password} name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

                        {
                            isSignup && (
                                <Input value={formData.confirmPassword} name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                            )
                        }
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {
                            isSignup ? "Sign up" : "Sign in"
                        }
                    </Button>

                    <GoogleLogin
                        clientId="192576221162-776pgu62iv9nqgs89inienr782od7g9n.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >Sign In with Google</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    {/* Sign up instead */}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign In" : "Don't have and account? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
