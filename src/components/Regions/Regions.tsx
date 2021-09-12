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
import { Country } from '../../Utils/models';
import './Regions.css';


interface StateFromProps {
    // countries: ReturnType<typeof selectGetCountriesState>;
}

type Props = StateFromProps;

const Regions: React.FC<Props> = ({
    // countries
}) => {

    const dispatch = useDispatch();
    const [regions, setRegions] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState();
    const [ crtRegion, setCrtRegion] = useState('');

    useEffect(() => {
        dispatch(getCountries());
    },[]);
    
    // fetching data from state using useSelector
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
    
    const onRegionClick = (crtReg: string) => {
        const regionalCountries = regions.find((reg: any) => reg.name === crtReg);

        // toggle region selection
        if (crtRegion === crtReg) {
            setCrtRegion('');
            setCountries(undefined);
        } else {
            setCrtRegion(crtReg);
            setCountries(regionalCountries.value); 
        }
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
                        {regions && regions.map((reg: Country, idx: number) => (
                            <Grid key={idx}>
                                {reg.name && (
                                    <Grid style={{ margin: '25px' }}>
                                        <Card 
                                            onClick={() => onRegionClick(reg.name)}
                                            className={`${(crtRegion === reg.name) ? 'activeRegion' : '' } cardRegion`}
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
                
                {/* to load countries */}
                {countries ? (
                    <Countries countries={countries} crtRegion={crtRegion} />
                ) : (
                    <p style={{ margin: '3% 0'}}>
                        No region selected
                    </p>
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
