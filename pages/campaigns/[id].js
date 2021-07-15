import Layout from "../../components/Layout";
import factory  from "../../ethereum/factory";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";

const CampaignShow = ({ address, minimumContribution, balance, requestsCount, approversCount, manager })=>{

  const renderCards = () =>{

    const items = [
      { 
        header: manager,
        meta: "Adress of manager", 
        description:"The manager created this campaign and create requests to withdraw money",
        style: { overflowWrap:"break-word"}
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description: "You must contribute at least this much wei"
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:"A request tries to withdraw money for the contract"
      },{
        header: approversCount,
        meta: "Number of approvers",
        description: "Number of people who have already donated"
      },
      {
        header: web3.utils.fromWei(balance,"ether"),
        meta:"Campaign Balance (ether)",
        description:"The blanace is how much money this campaign has left to spend"
      }
    ];

    return <Card.Group items={items} />
  }

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {renderCards()}
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address}/>
          </Grid.Column>      
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
};

export async function getStaticPaths(){
  
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  const paths = campaigns.map(campaignId => {
    return {
      params: {
        id: campaignId
      }
    }
  });

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {

  const campaign = Campaign(params.id);
  const summary = await campaign.methods.getSummary().call();
  //console.log("dentro de get",params.id);
  
  return {
    props:{
      address: params.id,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }
   }
}

export default CampaignShow;