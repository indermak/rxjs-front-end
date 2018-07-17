import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShopifyTable from '../../components/shopifyTable';
import { Button, Page, Card, Spinner, Stack } from '@shopify/polaris';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.props.fetchUserEpic();
    }

    componentWillUnmount() {
        this.props.cancelFetchUser();
    }

    fetch = () => {
        this.props.fetchUserEpic();
    }

    cancel = () => {
        this.props.cancelFetchUser();
    }

    render() {
        const columnContentTypes = ['text', 'numeric'];
        const headings = ['Name', 'Number'];
        const dataRows = (this.props.data && this.props.data.length) ? this.props.data : [];
        const isLoading = this.props.loading

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
                    title={"Title"}
                >
                    <Card.Section>
                        <Stack>
                            <Stack.Item fill>
                            </Stack.Item>
                            <Stack.Item>
                                <Link to="/search">Search Data</Link>
                            </Stack.Item>
                        </Stack>
                    </Card.Section>
                    <Card.Section>
                        <Button
                            fullWidth
                            onClick={this.fetch}
                        >
                            Fetch User
                        </Button>
                    </Card.Section>
                    <Card.Section>
                        <Button
                            fullWidth
                            onClick={this.cancel}
                        >
                            Cancel
                        </Button>
                    </Card.Section>
                    {isLoading ?
                        <Card.Section>
                            <center><Spinner size="large" color="teal" /></center>
                        </Card.Section>
                        :
                        <Card.Section>
                            <ShopifyTable
                                columnContentTypes={columnContentTypes}
                                headings={headings}
                                rows={dataRows}
                            />
                        </Card.Section>
                    }
                </Card>
            </Page>
        );
    }
}

export default Dashboard;
