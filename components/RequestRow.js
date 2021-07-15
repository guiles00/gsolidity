import React from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
const RequestRow = ({ request, id, approversCount, address })=>{
  
  const { description, value, approvalCount, recipient } = request;
  const readyToFinalize = approvalCount > approversCount / 2;

  console.log("readyToFinalize");
  console.log(readyToFinalize);

  const onApprove = async ()=>{
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    });
  }

  const onFinalize = async ()=>{
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0]
    });
  }

  return (
    <Table.Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>{web3.utils.fromWei(value,"ether")}</Table.Cell>
      <Table.Cell>{recipient}</Table.Cell>
      <Table.Cell>{approvalCount}/{approversCount}</Table.Cell>
      <Table.Cell>
        { !request.complete &&
          <Button color="green" basic onClick={onApprove}>Approve</Button>
        }
      </Table.Cell>
      <Table.Cell>
        { !request.complete &&
          <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
        }  
      </Table.Cell>
    </Table.Row>
  )
}

export default RequestRow;