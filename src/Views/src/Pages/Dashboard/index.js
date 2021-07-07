import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import api from '../../Services/api';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';



const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

export default function BottomAppBar() {
    const classes = useStyles();
    const [preferences, setPreferences] = useState([{ Type: 0, Preferences: { isAbleToRegister: true } }])
    const [messages, setMessages] = useState([]);
    const [QuestionNowa, setQuestionNow] = useState(0);
    const [checked, setChecked] = useState(true)

    const setMuls = (QuestionNow, preferencexs) => {
        let da = [];
        setQuestionNow(QuestionNow)
        console.log(QuestionNowa)
        if (QuestionNow >= 1) {
            da.push({
                id: 1,
                primary: 'VALORANT',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionOneEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        if (QuestionNow >= 2) {
            da.push({
                id: 2,
                primary: 'TUCANO',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionTwoEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        if (QuestionNow >= 3) {
            da.push({
                id: 3,
                primary: 'MOJANG',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionThreeEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        if (QuestionNow >= 4) {
            da.push({
                id: 4,
                primary: 'PAPA',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionFourEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        if (QuestionNow >= 5) {
            da.push({
                id: 5,
                primary: 'ACORDAR',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionFiveEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        if (QuestionNow >= 6) {
            da.push({
                id: 6,
                primary: 'OXENTE',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionSixEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        if (QuestionNow >= 7) {
            da.push({
                id: 7,
                primary: 'BRAVO',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionSevenEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        if (QuestionNow >= 8) {
            da.push({
                id: 8,
                primary: 'DELTA',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionEightEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        if (QuestionNow >= 9) {
            da.push({
                id: 9,
                primary: 'NUVEM',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionNineEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        if (QuestionNow >= 10) {
            da.push({
                id: 10,
                primary: 'PORTA',
                secondary: `Disponível até: ${new Date(preferencexs.QuestionTenEnd).toLocaleTimeString('pt-br')}`,
            });
        }
        setMessages(da)
    }

    const getPrefer = async () => {
        let s = await (await api.get('/api/v1/preferences')).data;
        if (s.Type == 1) {
            setChecked(s.Preferences.isAbleToRegister)
            setPreferences(s)
            setMuls(s.Preferences.QuestionNow, s.Preferences);
        } else {
            setPreferences([{ Type: 0, Preferences: { isAbleToRegister: true } }])
            setChecked(true)
        }
    }

    useEffect(async () => {
        await getPrefer();

        setInterval(async function () {
            await getPrefer();
        }, 5000)
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                    Questões
                </Typography>
                <List className={classes.list}>
                    {messages.map(({ id, primary, secondary, person }) => (
                        <React.Fragment key={id}>
                            <ListItem button>
                                <ListItemText primary={primary} secondary={secondary} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={(e) => {
                        window.location.href = '/podium'
                    }}>
                        <ImportantDevicesIcon />
                    </IconButton>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={async (e) => {
                        try {
                            let fas = preferences.Type == 0
                            await api.post('/api/v1/preferences');
                            await getPrefer();
                        } catch (e) {
                            await api.put('/api/v1/preferences');
                            await getPrefer();
                        }
                        setMuls();
                    }}>
                        <NavigateNextIcon />
                    </Fab>
                    <div className={classes.grow} />
                    <Switch checked={checked} onChange={async (e) => {
                        await api.patch('/api/v1/preferences');
                        getPrefer();
                    }} />
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}