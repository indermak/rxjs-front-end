import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Page, Card, Spinner, Stack, Heading } from '@shopify/polaris';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
        this.props.search("");
    }

    onSearch = (search) => {
        this.setState({ search });
        this.props.search(search);
    }

    showData = () => {
        if (this.props.searchData && this.props.searchData.length)
            return this.props.searchData.map((item, index) => <Heading key={item+index}>{index+1} {item}</Heading>)
        else
            return (<Heading>No Data</Heading>);
    }

    componentWillUnmount(){
        this.props.leave();
    }

    render() {
        if (this.props.isError) {
            return (
                <Page title={"Sorry, Something went wrong..."} />
            )
        }

        return (
            <Page
                title={"Shopify Table"}
            >
                <Card
                    title="Search Data"
                >
                    <Card.Section>
                        <Stack>
                            <Stack.Item fill>
                            </Stack.Item>
                            <Stack.Item>
                                <Link to="/">Dashboard</Link>
                            </Stack.Item>
                        </Stack>
                    </Card.Section>
                    <Card.Section>
                        <TextField
                            value={this.state.search}
                            onChange={this.onSearch}
                            placeholder={"Search"}
                        />
                    </Card.Section>
                    {
                        this.props.loading ?
                            <Card.Section>
                                <center><Spinner size="large" color="teal" /></center>
                            </Card.Section>
                            :
                            <Card.Section>
                                {this.showData()}
                            </Card.Section>
                    }
                </Card>
            </Page>
        );
    }
}

export default Search;
