import { client, Query } from "@tilework/opus";
import clientConfig from "../client-config";

const getCategories = async () => {
  client.setEndpoint(clientConfig.endpointUrl);

  const queryResponse = new Query("categories", true).addField("name");

  return client.post(queryResponse);
};

export default getCategories;
