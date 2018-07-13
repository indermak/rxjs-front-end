import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import ShopifyTable from '../components/shopifyTable';
import { Button, Page, Card, Spinner, Stack, Heading } from '@shopify/polaris';
import axios from 'axios';
import { Subject } from 'rxjs'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isError: false,
            loading: true,
            isCompleted: false,
            err: '',
            isDisabled: false
        }
        this.fetchData = new Subject();
        this.observer1 = this.fetchData
            .subscribe(
                data => this.setState({ data, isError: false, loading: false }),
                err => this.setState({ isError: true, loading: false, err }),
                () => this.setState({ isCompleted: true })
            )
        this.interval = setInterval(() => {
            this.getData();
        }, 5000);
    }

    getData = () => {
        console.log('-----24----Request sent----');
        axios.get('https://bae5c53c.ngrok.io/user')
            .then((res) => {
                this.fetchData.next(res.data.data);
                console.log('----26---', res);
            })
            .catch((err) => {
                this.setState({ err, isError: true, loading: false });
            })
    }

    componentWillUnmount() {
        console.log('--------35---------');
        clearInterval(this.interval);
        this.observer1.complete();
    }

    completeTask = () => {
        console.log('---------52---------');
        clearInterval(this.interval);
        this.observer1.complete();
        this.setState({ isDisabled: true });
    }

    render() {
        const columnContentTypes = ['text', 'numeric'];
        const headings = ['Name', 'Number'];

        const title = this.state.isCompleted ? 'Subscription ended, Thank you!' : 'Please wait while we are fetching the data...'

        if (this.state.isError) {
            return (
                <Page title={"Sorry, Something went wrong..."} />
            )
        }

        return (
            <Page
                title={"Shopify Table"}
            >
                {
                    this.state.loading ?
                        <Card
                            title={title}
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
                                <center><Spinner size="large" color="teal" /></center>
                            </Card.Section>
                        </Card>
                        :
                        <Card
                            title={title}
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
                                    disabled={this.state.isDisabled}
                                    onClick={this.completeTask}
                                >
                                    Unsubscribe
                        </Button>
                            </Card.Section>
                            <Card.Section>
                                <ShopifyTable
                                    columnContentTypes={columnContentTypes}
                                    headings={headings}
                                    rows={this.state.data}
                                />
                            </Card.Section>
                        </Card>
                }
            </Page>
        );
    }
}

export default Dashboard;
