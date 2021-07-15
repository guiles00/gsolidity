import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from 'next/router'

const ContributeForm = ({ address })=>{
  const router = useRouter();
  const [value,setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(`${address} - ${value}`);
    
    const campaign = Campaign(address);
    setLoading(true);
    setError("");

    try {
    
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value,"ether")
      });
    
      router.replace(`/campaigns/${address}`);
      
    } catch (err) {
      setError(err.message)
    }

    setValue("");
    setLoading(false);

  }

  return (
    <Form onSubmit={onSubmit} error={!!error}>
      <Form.Field>
        <label> Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={e => setValue(e.target.value)}
        >
        </Input>
        <Message error header="Oops!" content={error} ></Message>
        <Button primary loading={loading}>Contribute!</Button>
      </Form.Field>
    </Form>
  )
};

export default ContributeForm;