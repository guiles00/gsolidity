import React from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory  from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const New = ()=>{
  const [minimumContribution, setMimimumContribution] = React.useState();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0]  
      });
      Router.pushRoute("/");
    } catch (err) {
      //console.log(err);
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <div>
        <h3>Create a Campaign</h3>
        <Form onSubmit={handleSubmit} error={!!error}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input 
              label="wei" labelPosition="right"
              value={minimumContribution}
              onChange={ e => setMimimumContribution(e.target.value) }
            />
            <Message error header="Oops" content={error} ></Message>
            <Button primary loading={loading}> Create!</Button>  
          </Form.Field>  
        </Form>
      </div>
    </Layout>
  )
}

export default New;