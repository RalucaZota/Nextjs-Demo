//our-domain.com/new-meetup
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
    //go back after sending the data

    //internal Api which will be hosted by the same server as is being used for serving this page\ to construct an absolute path to send the request to the same server but a diff path on that server
    //this will send a req to the new-meetup from api folder and then will trigger this f handler/ next js will trigger that f when a req reaches that path
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}
