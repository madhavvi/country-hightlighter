/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Card, CircularProgress, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { getCountries } from "../../redux/countries/countriesActions";
import { selectCountries, selectGetCountriesState } from "../../redux/countries/countriesSelector";
import { groupBy } from 'lodash';

const useStyles = makeStyles((theme) => ({
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
    mainContainer: {
        padding: '5%'
    },
    subTitle: {
      fontSize: '2.4em',
      lineHeight: 1.4
    },
    cardGridContainer: {
        padding: '30px',
        width: '48vw',
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
        width: '140px',
        height: '60px',
        flexGrow: 4,
        cursor: 'pointer'
    }
}));

interface StateFromProps {
    countries: ReturnType<typeof selectGetCountriesState>;
}

type Props = StateFromProps;

const Countries: React.FC<Props> = ({
    countries
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [countries1, setCountries] = useState(countries);
    const [loading, setLoading] = useState(true);
    const [regions, setRegions] = useState<any>();

    useEffect(() => {
        dispatch(getCountries());
    },[]);
    
    const countryData = useSelector((rootState: any) => selectCountries(rootState));
    
    useEffect(() => {
        setCountries(countryData.countries);
        setLoading(countryData.loading);
        let arr:any = [];
        const groupByRegion = countryData.countries && groupBy(countryData.countries, (country) => country.region);
        groupByRegion && Object.entries(groupByRegion).forEach(([key, value]) => {
            key && arr.push({name: key, value: value});
        });
        setRegions(arr);
        console.log('groupByRegion : ', groupByRegion, arr);
        
    }, [countryData]);

    return (
        <>
        {loading ? (
            <div className={classes.loadingContainer}>
                <CircularProgress className={classes.loader}/> 
            </div>
        ): (
            <Container className={classes.mainContainer}>
                <Grid item xs={12} md={12} lg={12}>
                    <span className={classes.subTitle}>
                        Select region and click on <br/>
                        the countries you want to highlight
                    </span>
                </Grid>

                <Grid item xs={12} md={12} lg={12} className={classes.cardGridContainer}>
                    <Grid item xs={12} md={12} lg={12} className={classes.cardContainer}>
                        {regions && regions.map((reg: any, idx: number) => (
                            <Grid key={idx}>
                                {reg.name && (
                                    <Grid style={{ margin: '25px 0' }}>
                                        <Card className={classes.cardRegion}>
                                            <Typography>{reg.name}</Typography>
                                        </Card>
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        )}
        </>
    ) 
}

function mapStateToProps(state: any): StateFromProps {
    return {
        countries: selectGetCountriesState(state)
    };
}

export default connect<StateFromProps>(
    mapStateToProps
)(Countries);
