import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../custom/useFetch";

const LeadDetails = () => {
  const { leadId } = useParams();
  const [newComment, setNewComment] = useState({
    author: "",
    text: "",
  });

  const { get, error, loading, lead, post , comments} = useFetch(
    "http://localhost:3000/api"
  );

  useEffect(() => {
    get(`/leads/${leadId}`, { leadId });
  }, [get, leadId]);

  const handleComment = async (e) => {
    e.preventDefault();
    await post("/comment", newComment);
    await  get("/comment", { author: lead?.salesAgent?._id });

    setNewComment({
        author:"",
        text:""
    })

  };

  useEffect(() => {
    get("/comment", { author: lead?.salesAgent?._id });
  }, [get, lead?.salesAgent?._id]);



  return (
    <>
      <h1 className="text-3xl text-center py-3 ">
        Lead Managment | {lead.name}
      </h1>
      <div className="flex container mx-auto py-4 gap-2">
        {/* Sidebar */}

        <div className="w-40">
          <Link
            className="py-4 text-2xl font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to={"/"}
          >
            Back To Dashboard
          </Link>
        </div>
        {/* Lead Details */}

        <div className="w-full border py-2 ">
          <h2 className="border-b text-center text-2xl">Lead Details</h2>
          {loading && <p>{loading}</p>}
          {error && <p>{error}</p>}
          <ul className="px-3 py-2">
            <li>Lead Name: {lead?.name}</li>
            <li>Agent Name: {lead?.salesAgent?.name}</li>
            <li>Lead Source: {lead?.source}</li>
            <li>Lead Status: {lead?.status}</li>
            <li>Priority: {lead?.priority}</li>
            <li>Time To Close: {lead?.timeToClose}</li>
          </ul>
          <hr />
          <div className="py-3 px-4">
            <Link
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline "
              to={`/newlead`}
              state={lead}
            >
              Edit Details
            </Link>
          </div>
          {/* Comment section */}
          <div className="px-3 py-3">
            {
              comments?.map((comment) => (
                <div key={comment._id} className="px-3 py-1">
                    <p>{comment?.author?.name} - {comment.createdAt}</p>
                    <p>Comment: {comment.text}</p>
              </div>
              ))
             }
          </div>

          <div>
            <form onSubmit={handleComment} className="mx-5" method="POST">
              <label className="block" htmlFor="comment">
                Comment here
              </label>
              <textarea
                onChange={(e) =>
                  setNewComment((prev) => ({
                    ...prev,
                    text: e.target.value,
                    author: lead?.salesAgent?._id,
                  }))
                }
                name="comment"
                id="comment"
                className="border w-full py-5 px-3"
                cols="20"
                value={newComment.text}
                rows="5"
                placeholder="Put your comment here"
              ></textarea>
              <button type="submit">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
