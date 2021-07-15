import React from "react";
import factory  from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Link from 'next/link'

import Layout from '../components/Layout'

const Index = ({ campaigns }) => {
  
  const renderCampaigns = ()=>{
    const items = campaigns.map( address => {
      return {
        header: address,
        description: (
        <Link href={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
        ),
        fluid: true
      }
    });

    return <Card.Group items = {items} />;
  }

  return (
    <Layout>
      <div>
        <h2>Campaigns</h2>
        <Link href="/campaigns/new">
          <Button
            floated="right" 
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </Link>

          {renderCampaigns()}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
     props: {
      campaigns
     }
   }
}

export default Index;