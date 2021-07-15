import React from "react";
import Layout from "../../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

const RequestIndex = ({ address, requests, requestsCount, approversCount})=>{
  const router = useRouter();
  const { id } = router.query;
  const { Header, Row, HeaderCell, Body } = Table;
  
  
  const renderRow = ()=>{
    
    return JSON.parse(requests).map((request, index)=>{
      return <RequestRow 
        key={index} 
        id={index}
        request={request}
        address={address}
        approversCount={approversCount}
        ></RequestRow>
    });
  }
  return (
    <Layout>
      <h2>Lists Requests</h2>
      <Link href={`/campaigns/${id}/requests/new`}>
        <a>
          <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row> 
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>   
        </Header> 
        <Body>
          {renderRow()}
        </Body>
      </Table>
      <div> Found {requestsCount} requests.</div>
    </Layout>
  )
}

export async function getServerSideProps(props){
  
  const { id } = props.query;
  const campaign = Campaign(id);
  const requestsCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestsCount)).fill().map((element,index) => {
      
      return campaign.methods.requests(index).call();
    })
  )

  return {
    props: {
      address: id,
      requests: JSON.stringify(requests),
      requestsCount,
      approversCount
    }
  }
}

export default RequestIndex;