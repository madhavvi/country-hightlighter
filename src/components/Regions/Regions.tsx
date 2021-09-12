/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import { getCountries } from "../../redux/countries/countriesActions";
import { 
    selectCountries, 
    // selectGetCountriesState 
} from "../../redux/countries/countriesSelector";
import { groupBy } from 'lodash';
import Countries from "../Countries/Countries";
import './Regions.css';

interface StateFromProps {
    // countries: ReturnType<typeof selectGetCountriesState>;
}

type Props = StateFromProps;

const Regions: React.FC<Props> = ({
    // countries
}) => {

    const dispatch = useDispatch();
    const [countries, setCountries] = useState();
    const [loading, setLoading] = useState(true);
    const [regions, setRegions] = useState<any>();
    const [ crtRegion, setCrtRegion] = useState('');

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
        
    }, [countryData]);
    
    const onRegionClick = (crtRegion: string) => {
        setCrtRegion(crtRegion);
        const regionalCountries = regions.find((reg: any) => reg.name === crtRegion);
        setCountries(regionalCountries.value); 
    }

    return (
        <>
        {loading ? (
            <div className="loadingContainer">
                <CircularProgress className="loader"/> 
            </div>
        ): (
            <Container className="mainContainer">
                <Grid item xs={12} md={12} lg={12}>
                    <span className="subTitle">
                        Select region and click on <br/>
                        the countries you want to highlight
                    </span>
                </Grid>

                <Grid item className="cardGridContainer">
                    <Grid item xs={12} md={12} lg={12} className="cardContainer">
                        {regions && regions.map((reg: any, idx: number) => (
                            <Grid key={idx}>
                                {reg.name && (
                                    <Grid style={{ margin: '25px' }}>
                                        <Card 
                                            onClick={() => onRegionClick(reg.name)}
                                            className={`${(crtRegion === reg.name) ? 'cardActive' : '' } cardRegion`}
                                        >
                                            <CardContent style={{ padding: 'inherit' }}>
                                                <Typography>{reg.name}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )}
                            </Grid> 
                        ))}
                    </Grid>
                </Grid>
                {countries ? (
                    <Countries countries={countries} crtRegion={crtRegion} />
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
