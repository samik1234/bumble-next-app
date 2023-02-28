import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";

import {
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc,
} from "firebase/firestore";



export default function Details() {

    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState("");
    const [allMessage, setAllMessages] = useState([]);




    //Submit a message
    const submitMessage = async () => {
        //Check if the user is logged
        if (!auth.currentUser) return router.push("/auth/login");

        if (!message) {
            console.log(message);
            toast.error("Don't leave an empty message 😅", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }
        const docRef = doc(db, "posts", routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            }),
        });
        setMessage("");
    };

    //Get Comments
    const getComments = async () => {
        const docRef = doc(db, "posts", routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAllMessages(snapshot.data().comments);
        });
        return unsubscribe;
    };


    useEffect(() =>{
        if (!router.isReady) return;
        getComments();
    }, [router.isReady]);

    return (
        <div>
            <Message {...routeData}></Message>
            <div className="my-4">
                <div className="flex">
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        value={message}
                        placeholder="Send a message 😀"
                        className="bg-violet-300  border border-gray-500 w-full p-2 rounded-md text-white text-sm"
                    />
                    <button
                        onClick={submitMessage}
                        className="bg-orange-500 text-white py-2 px-4 rounded-md text-sm">
                        Submit
                    </button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">
                     Comments
                     </h2>
                    {allMessage?.map((message) => (
                       <div className="bg-violet-300 p-2 my-4 border-1 rounded-md" key={message.time}>
                          <div className="flex items-center gap-4 mb-4">
                                <img src={message.avatar} alt="" />
                                <h2 className="font-light text-white">{message.userName}</h2>
                            </div>
                           
                            <h2 className="font-light text-black">{message.message}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}