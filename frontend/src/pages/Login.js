import { Link } from 'react-router-dom';
import React, { useState, Fragment } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';



import Icon from '../components/icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../components/Input';
import useStyles from '../components/style';
import { signin, signup } from '../actions/auth';

const initialState = {firstname: '', lastname: '', email: '', password: '', confirmPassword: ''};



export default function Login() {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const[formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleSubmit  = (e) => {
        e.preventDefault();

        if(isSignUp) {
            console.log(formData);
            
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);   
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        
        try {
            dispatch({type: 'AUTH', data: {result, token} });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in failed");

        
    };
    

    return (
        <Container component="main" maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography varient="h5" className={classes.Typography}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstname" label="First Name" handelChange={handleChange} autoFocus half/>
                                    <Input name="lastname" label="Last Name" handelChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handelChange={handleChange} type="email" /> 
                        <Input name="password" label="Password" handelChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/> 
                        {isSignUp && <Input name="confirmPassword" label="Confirm Password" handelChange={handleChange} type="password"/>}
                    </Grid>
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin 
                        clientId="784285995732-ti5krj93ppjm96v9jsvcvt4jrunq4d4q.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                starIcon={<Icon />} 
                                variant="contained" 
                            > Google Sign In </Button>
                            
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid type="container" justify="flex-end">
                        <Grid type="item">
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
