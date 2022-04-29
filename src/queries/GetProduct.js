import { client, Query, Field } from "@tilework/opus";
import clientConfig from "../client-config";

const getProduct = async (id) => {
  client.setEndpoint(clientConfig.endpointUrl);

  const queryResponse = new Query("product", true)
    .addArgument("id", "String!", id)
    .addField(
      new Field("prices")
        .addField("amount")
        .addField(new Field("currency").addField("symbol"))
    )
    .addField("gallery", true)
    .addField("inStock")
    .addField("name")
    .addField("id")
    .addField("brand")
    .addField("description")
    .addField(new Field("attributes", true)
        .addField("id")
        .addField("type")
        .addField(new Field("items", true)
            .addField("value")
            .addField("displayValue")
            .addField("id"))
        );

  return await client.post(queryResponse);
};

export default getProduct;
