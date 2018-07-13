import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import ShopifyTable from '../components/shopifyTable';
import { TextField, Page, Card, Spinner, Stack, Heading } from '@shopify/polaris';
import axios from 'axios';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { serverUrl } from '../config';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchData: [],
            isError: false,
            loading: true,
            isCompleted: false,
            err: '',
            search: '',
            debounced: ''
        }
        this.onSearch$ = new Subject();
        this.getData();
    }

    getData = () => {
        axios.get(serverUrl)
            .then((res) => {
                console.log('-------31------', res);
                this.setState({ data: res.data.data, isError: false, loading: false, searchData: res.data.data })
            })
            .catch((err) => {
                this.setState({ err, isError: true, loading: false });
            })
    }

    onSearch = (search) => {
        this.setState({ search });
        this.onSearch$.next(search)
    }

    componentWillUnmount() {
        console.log('--------35---------');
        this.onSearch$.complete();
    }

    completeTask = () => {
        console.log('---------52---------');
        this.onSearch$.complete();
    }

    componentDidMount() {
        this.subscription = this.onSearch$.pipe(debounceTime(500),
            distinctUntilChanged())
            .subscribe(debounced => {
                console.log('--------57----', this.state, debounced);
                this.setState({ debounced })
                if (debounced) {
                    const regex = new RegExp(`\\w*${debounced}\\w*`, 'gi');
                    let dataSearch = this.state.data.length && this.state.data.map((item) => {
                        if (item[0].match(regex)) {
                            return item;
                        }
                        return false;
                    });
                    dataSearch = dataSearch.filter(obj => obj);
                    console.log('-------65----', dataSearch);
                    this.setState({ searchData: dataSearch });
                } else {
                    this.setState({ searchData: this.state.data });
                }
            },
                err => {
                    this.setState({ err, isError: true })
                },
                () => {
                    this.setState({ isCompleted: true })
                }
            )
    }

    render() {
        const columnContentTypes = ['text', 'numeric'];
        const headings = ['Name', 'Number'];

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
                                <Heading>Please wait while we are fetching the data...</Heading>
                                <br />
                                <center><Spinner size="large" color="teal" /></center>
                            </Card.Section>

                        </Card>
                        :
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
                            <Card.Section>
                                <ShopifyTable
                                    columnContentTypes={columnContentTypes}
                                    headings={headings}
                                    rows={this.state.searchData}
                                />
                            </Card.Section>
                        </Card>
                }
            </Page>
        );
    }
}

export default Search;
