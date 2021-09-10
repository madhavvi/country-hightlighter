import React from "react";
import { Card, Grid, Typography, makeStyles, Container } from "@material-ui/core";

interface OwnProps {
    countries: any;
}

const useStyles = makeStyles((_theme) => ({
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 'auto',
        height: '60vh'
    },
    loader: {
        width: '60px !important',
        height: '60px !important'
    },
    cardGridContainer: {
        width: '65vw',
        maxWidth: 850,
        padding: '30px',
        margin: 'auto',
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    cardRegion: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 'auto',
        cursor: 'pointer',
        padding: '10px 15px',
        border: '1px solid #808080a1',
        boxShadow: 'none !important'
    },
    countryTitle: {
        margin: 15
    }
}));

type Props = OwnProps;

const Countries: React.FC<Props> = ({
    countries,
}) => {
    const classes = useStyles();
    console.log('countries : ', countries);
    return (
        <>
            <Container>
                {countries && (
                    <Grid item xs={12} md={12} lg={12} className={classes.cardGridContainer}>
                        <Grid item xs={12} md={12} lg={12} className={classes.cardContainer}>
                            {countries.map((country: any, idx: number) => (
                                <Grid key={idx} className={classes.countryTitle}>
                                    <Card className={classes.cardRegion}>
                                        <Typography>{country.name}</Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Container>
        </>
    )
}

export default Countries;