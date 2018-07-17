import React, { Component } from 'react';
import { DataTable, Heading } from '@shopify/polaris';
import styled from 'styled-components';

export default class ShopifyTable extends Component{
    render() {
        if (this.props.rows && this.props.rows.length && (typeof this.props.rows === "object") ){
            return(
                <Wrapper>
                    <DataTable
                        columnContentTypes={this.props.columnContentTypes}
                        headings={this.props.headings}
                        rows={this.props.rows}
                        // totals={['', '', '', 255, '$155,830.00']}
                    />
                </Wrapper>
            )
        } else {
            return(<Heading> No Data</Heading>)
        }
    }
};

// const Title = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: palevioletred;
// `;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;