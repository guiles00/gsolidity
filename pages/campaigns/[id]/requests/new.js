import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { Icon, Button, Form, Input, Message } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from 'next/router'
import web3 from "../../../../ethereum/web3";
import Campaign from "../../../../ethereum/campaign";

const RequestNew = ()=>{
  const router = useRouter();
  const [value,setValue] = useState();
  const [description,setDescription] = useState();
  const [recipient, setRecipient] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = router.query;
  
  const onSubmit = async (e)=>{
    e.preventDefault();

    const campaign = Campaign(id);
    
    setError("");
    setLoading(true);

    try{
      const accounts = await web3.eth.getAccounts();
      const weis = web3.utils.toWei(value,"ether");
      
      await campaign.methods.createRequest(description,weis,recipient)
        .send({ from: accounts[0]});

        router.push(`/campaigns/${id}/requests`);

    }catch(err){
      setError(err.message);
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <Link href={`/campaigns/${id}/requests`}>
        <a> 
          <Icon name='angle left' size='small' />
          Back
        </a>
      </Link>
      <h2>Create a Request</h2>
      <Form onSubmit={onSubmit} error={!!error}>
      <Form.Field>
        <label>Description</label>
        <Input
          value={description}
          onChange={e => setDescription(e.target.value)}
        >
        </Input>
      </Form.Field>
      <Form.Field>
        <label>Value</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={e => setValue(e.target.value)}
        >
        </Input>
      </Form.Field>
      <Form.Field>
        <label>Recipient</label>
        <Input
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
        >
        </Input>
        <Message error header="Oops!" content={error} ></Message>
        <Button primary loading={loading}>Create!</Button>
      </Form.Field>
    </Form>   
    </Layout>
  )
}

export default RequestNew;