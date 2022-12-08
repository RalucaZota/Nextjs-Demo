import { MongoClient } from "mongodb";
// /api/new-meetup
//POST/api/new-meetup

export default async function handler(req, res) {
  //   try {
  if (req.method === "POST") {
    const data = req.body;
    //-request m allows us to find out which kind of request was sent
    // -we can get our data by accessing req.body(body of incoming req-data of incoming req)
    // -this is the endpoint of creating new meetup
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://lorena99:lorena99@cluster0.mbklnlh.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    //   if (!result.ok) {
    //     throw new Error("Smth went wrong");
    //   }
  }
  //on the client obj we can add a db m, to get hold of the database to which we re connecting with
  //Mongodb is a Nosql database that works with collections full of documents/collections would be kind of tables in a Sql database and documents would be your entries in those tables/ a single meetup would be a single doc
  //InserOne m- built in command for inserting one new doc into this collection
  //result will be an obj, with for ex automatically generated id
  //   } catch (error) {
  //     console.log(error);
  //   }
  client.close();
  res.status(201).json({ message: "Meetup inserted successfully" });
  //to set a http status code after the response whoch will be returned
  //to close the databse connection once we re done and then we need to use the res obj to send back a res, cause we re getting a request, storing the data in the database, ultimetly we also need to send back a resp then
}
