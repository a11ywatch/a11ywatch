import { createTestClient } from 'apollo-server-testing'
import { killServer } from "@app/server";
import { Server } from "@app/apollo-server";
import gql from 'graphql-tag';

const server = new Server()
const { mutate } = createTestClient(server);

afterAll(async () => {
  await killServer();
});

it.skip('create user successfully', async () => {
    const mutation =  gql`
    mutation Register($email: String!, $password: String!){
      register(email: $email, password: $password) {
        id
		    email
      }
    }
  `;

	const email = 'nancy@foo.co'
  const res = await mutate({
		mutation,
		variables: { email, password: 'password' }
	});
  return expect(res.data.register.email).toBe(email);
});
