import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Api } from '../../Services'
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                OBRIGADO PENELOPE/HUMILDE
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));


export default function Pricing() {
    const classes = useStyles();

    const update = async () => {
        let s = await (await Api.get('/api/v1/users')).data.Users;

        let first = {
            name: s[0].fullName,
            points: s[0].points
        }

        let second = {
            name: s[1].fullName,
            points: s[1].points
        }

        let thrid = {
            name: s[2].fullName,
            points: s[2].points
        }

        setPodium(first, second, thrid)
    }

    useEffect(() => {
        update();
        setInterval(update, 15000)
    }, [])

    const [tiers, setTiers] = useState([{
        title: 'Segundo',
        subheader: '',
        price: '0',
        description: ['Quase rebolation 😢', 'Não ganhou nada.😕']
    },
    {
        title: 'Primeiro',
        subheader: '',
        price: '0',
        description: [
            'Parabéns🥳🥳',
            'Você é rebolation😍',
            'Atente a professora pelo seu ponto.🤠'
        ],
    },
    {
        title: 'Terceiro',
        subheader: '',
        price: '0',
        description: [
            'Sem rebolation, jovem.🤡'
        ],
    },])

    const setPodium = (first, second, thrid) => {

        let podium = [{
            title: second.name,
            subheader: 'Segundo',
            price: second.points,
            description: ['Quase rebolation 😢', 'Não ganhou nada.😕']
        },
        {
            title: first.name,
            subheader: 'Primeiro',
            price: first.points,
            description: [
                'Parabéns🥳🥳',
                'Você é rebolation😍',
                'Atente a professora pelo seu ponto.🤠'
            ],
        },
        {
            title: thrid.name,
            subheader: 'Terceiro',
            price: thrid.points,
            description: [
                'Sem rebolation, jovem.🤡'
            ],
        }];

        setTiers(podium)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Pódium
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    action={tier.subheader === 'Primeiro' ? <StarIcon /> : null}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            {tier.price}
                                        </Typography>
                                    </div>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}