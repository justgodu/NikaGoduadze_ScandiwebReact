import { client, Query} from "@tilework/opus";
import clientConfig from "../client-config";

const getCurrencies = async () => {

  client.setEndpoint(clientConfig.endpointUrl);

  const fieldList = ["label", "symbol"];
  const queryResponse = new Query("currencies", true)  
  .addFieldList(fieldList);

    return await client.post(queryResponse);
}

export default getCurrencies