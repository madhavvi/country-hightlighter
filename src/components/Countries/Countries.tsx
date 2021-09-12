/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, makeStyles, Container } from "@material-ui/core";
import './Countries.css';
import { Country } from "../../Utils/models";

interface OwnProps {
    countries: Country[];
    crtRegion: string;
}

const useStyles = makeStyles((_theme) => ({
    cardGridContainer: {
        width: '70vw',
        maxWidth: 1250,
        padding: '30px 10px',
        margin: 'auto',
        display: 'flex'
    },
    cardContainer: {
        display: 'block',
        width: '100%',
        textAlign: 'left',

        //  css for displaying cards as a flex, not as a column
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
        width: 170,
        margin: 15,
        display: 'inline-block'
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
                <Grid>
                    <p>
                        <b>{crtRegion}</b>:
                        <i> listing {countries.length} {countries.length === 1 ? 'country' : 'countries'}</i>
                    </p>
                </Grid>
                <Grid>
                    {countries && (
                        <Grid className="gridContainer">
                            <Grid item className="container">
                                {countries.map((country: Country, idx: number) => (
                                    <Grid key={idx} className="countryTitle">
                                        <Card 
                                            className={`${ selectedCountries.includes(country.name) ? 'activeCountries' : '' } countryCard`} 
                                            onClick={() => selectCoutries(country.name)}
                                        >
                                            <Typography style={{ textAlign: 'center' }}>{country.name}</Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    )
};

export default Countries;