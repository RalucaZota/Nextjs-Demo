import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
export default function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://lorena99:lorena99@cluster0.mbklnlh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  console.log(meetups);
  client.close();

  return {
    //fallback: false - to indicate that I defined all supported paths
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
//getSttaicPaths-returns an obj all the dynamic segment values all the meetups id s for which this page should be pre generated- this obj contains a array of paths which has an obj per version of the dynamic page-obj has a params key-which then itself is an obj with all the key values pairs that might lead to your dynamic page/our meetupId with the concrete value 'm1' for the meetupId for which this page should be pre generated
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://lorena99:lorena99@cluster0.mbklnlh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    //findone finds 1 single doc, we pass an obj where we define how to filter
    _id: ObjectId(meetupId),
  });
  client.close();
  //fetch data for a single meeetup
  //that will be an obj where our identifiers bet the square brackets will be properties and the values will be the actual values encoded in the url/meetupId-the identifier that we chose
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
