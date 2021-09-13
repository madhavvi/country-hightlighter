/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, Container } from "@material-ui/core";
import './Countries.css';
import { Country } from "../../Utils/models";

interface OwnProps {
    countries: Country[];
    crtRegion: string;
}

type Props = OwnProps;

const Countries: React.FC<Props> = ({
    countries,
    crtRegion,
}) => {
    
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