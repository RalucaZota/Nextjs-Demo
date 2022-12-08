import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
//MongoClient package will not be part of the client side bundle, we can import code here which will only be executed on the server and next js willd detect this and not include it in our client's side bundle which is good for bundle size considerations as well as for security
// import { GetStaticProps } from "next";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}
export async function getStaticProps() {
  //fetch data from an API
  //read data from some files
  const client = await MongoClient.connect(
    "mongodb+srv://lorena99:lorena99@cluster0.mbklnlh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
