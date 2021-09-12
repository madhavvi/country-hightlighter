/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, makeStyles, Container } from "@material-ui/core";

interface OwnProps {
    countries: any;
    crtRegion: string;
}

const useStyles = makeStyles((_theme) => ({
    cardGridContainer: {
        width: '65vw',
        maxWidth: 850,
        padding: '30px 10px',
        margin: 'auto',
    },
    cardContainer: {
        display: 'block',
        width: '100%',

        //  css for displaying as a flex, not as a column
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // flexWrap: 'wrap'
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
        margin: 15,
        display: 'inline-block',
        width: 170
    },
    cardActive: {
        borderColor: '#e3127e !important',
        color: '#e3127e !important'
    }
}));

type Props = OwnProps;

const Countries: React.FC<Props> = ({
    countries,
    crtRegion,
}) => {
    const classes = useStyles();
    const [selectedCountries, setSelectedCountires] = useState<string[]>([]);
    
    // if you want to memoize the countries selected from other regions, comment below 3 lines
    useEffect(() => {
        setSelectedCountires([]);
    }, [crtRegion]);
    
    // toggle select countries
    const selectCoutries = (country: string) => {
        if (!selectedCountries.includes(country)) {
            setSelectedCountires(arr => [...arr, country]);
        } else {
            setSelectedCountires(selectedCountries.filter(item => item !== country)); 
        }
    }

    return (
        <>
            <Container>
                {countries && (
                    <Grid item className={classes.cardGridContainer}>
                        <Grid item className={classes.cardContainer}>
                            {countries.map((country: any, idx: number) => (
                                <Grid key={idx} className={classes.countryTitle}>
                                    <Card 
                                        className={`${ selectedCountries.includes(country.name) ? `${classes.cardActive}` : '' } ${classes.cardRegion}`} 
                                        onClick={() => selectCoutries(country.name)}
                                    >
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
};

export default Countries;