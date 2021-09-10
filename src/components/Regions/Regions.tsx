/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Card, CircularProgress, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { getCountries } from "../../redux/countries/countriesActions";
import { selectCountries, selectGetCountriesState } from "../../redux/countries/countriesSelector";
import { groupBy } from 'lodash';
import Countries from "../Countries/Countries";

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
    mainContainer: {
        padding: '5%'
    },
    subTitle: {
      fontSize: '2.4em',
      lineHeight: 1.4
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
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    cardRegion: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 'auto',
        width: '140px',
        height: '60px',
        cursor: 'pointer'
    }
}));

interface StateFromProps {
    // countries: ReturnType<typeof selectGetCountriesState>;
}

type Props = StateFromProps;

const Regions: React.FC<Props> = ({
    // countries
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [countries, setCountries] = useState();
    const [loading, setLoading] = useState(true);
    const [regions, setRegions] = useState<any>();

    useEffect(() => {
        dispatch(getCountries());
    },[]);
    
    const countryData = useSelector((rootState: any) => selectCountries(rootState));
    
    useEffect(() => {
        setLoading(countryData.loading);
        let arr:any = [];
        const groupByRegion = countryData.countries && groupBy(countryData.countries, (country) => country.region);
        groupByRegion && Object.entries(groupByRegion).forEach(([key, value]) => {
            arr.push({name: key || 'Other', value: value});
        });
        setRegions(arr);
        console.log('groupByRegion : ', groupByRegion, arr);
        
    }, [countryData]);
    
    const onRegionClick = (crtRegion: string) => {
        const regionalCountries = regions.find((reg: any) => reg.name === crtRegion);
        console.log('regionalCountries : ', regionalCountries.value);
        
        setCountries(regionalCountries.value);
        
    }

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
                                    <Grid style={{ margin: '25px' }}>
                                        <Card className={classes.cardRegion} onClick={() => onRegionClick(reg.name)}>
                                            <Typography>{reg.name}</Typography>
                                        </Card>
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {countries ? (
                    <Countries countries={countries} />
                ) : (
                    <>
                        <Typography>
                            No region selected
                        </Typography>
                    </>
                )    
            }
            </Container>
        )}
        </>
    ) 
}

function mapStateToProps(state: any): StateFromProps {
    return {
        // countries: selectGetCountriesState(state)
    };
}

export default connect<StateFromProps>(
    mapStateToProps
)(Regions);
