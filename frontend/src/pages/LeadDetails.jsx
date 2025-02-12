import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../custom/useFetch";
import moment from "moment";

const LeadDetails = () => {
  const { leadId } = useParams();
  const [newComment, setNewComment] = useState({
    author: "",
    text: "",
    lead: "",
  });

  const { get, error, loading, lead, post, comments } = useFetch(
    "http://localhost:3000/api"
  );

  useEffect(() => {
    get(`/leads/${leadId}`, { leadId });
  }, [get, leadId]);

  const handleComment = async (e) => {
    e.preventDefault();
    await post("/comment", newComment);
    await get("/comment",{lead:leadId});

    setNewComment({
      author: "",
      text: "",
      lead: "",
    });
  };

  useEffect(() => {
    get("/comment", { lead: leadId });
  }, [get, leadId]);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      {/* Page Header */}
      <h1 className="text-3xl font-semibold text-center text-gray-800">
        Lead Management | {lead?.name}
      </h1>

      <div className="flex flex-col md:flex-row container mx-auto py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md p-5 rounded-lg">
          <Link
            className="text-2xl font-semibold text-blue-600 dark:text-blue-500 hover:underline block"
            to={"/"}
          >
            ⬅ Back To Dashboard
          </Link>
        </aside>

        {/* Lead Details */}
        <section className="w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center border-b pb-3 text-gray-800">
            Lead Details
          </h2>

          {/* Loading & Error Messages */}
          {loading && <p className="text-blue-500 text-center py-3">Loading...</p>}
          {error && <p className="text-red-500 text-center py-3">{error}</p>}

          {/* Lead Information */}
          <ul className="px-3 py-4 text-gray-700 space-y-3">
            <li><strong>Lead Name:</strong> {lead?.name}</li>
            <li><strong>Agent Name:</strong> {lead?.salesAgent?.name}</li>
            <li><strong>Lead Source:</strong> {lead?.source}</li>
            <li><strong>Lead Status:</strong> {lead?.status}</li>
            <li><strong>Priority:</strong> {lead?.priority}</li>
            <li><strong>Time To Close:</strong> {lead?.timeToClose}</li>
          </ul>

          <hr className="my-4 border-gray-300" />

          {/* Edit Lead Button */}
          <div className="py-3 px-4">
            <Link
              className="text-blue-600 hover:underline font-medium"
              to={`/newlead`}
              state={lead}
            >
              ✏ Edit Details
            </Link>
          </div>

          {/* Comment Section */}
          <div className="px-3 py-3">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Comments</h3>
            
            {/* Comments List */}
            <div className="mt-3 space-y-4">
              {comments?.map((comment) => (
                <div key={comment._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="text-gray-800 font-medium">
                    {comment?.author?.name} -{" "}
                    <span className="text-sm text-gray-500">
                      {moment(comment.createdAt).format("llll")}
                    </span>
                  </p>
                  <p className="text-gray-700 mt-1">💬 {comment.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add Comment Form */}
          <div className="mt-6">
            <form onSubmit={handleComment} className="bg-gray-50 p-5 rounded-lg shadow-md">
              <label className="block font-medium text-gray-700" htmlFor="comment">
                Add a Comment
              </label>
              <textarea
                onChange={(e) =>
                  setNewComment((prev) => ({
                    ...prev,
                    text: e.target.value,
                    author: lead?.salesAgent?._id,
                    lead: lead?._id,
                  }))
                }
                name="comment"
                id="comment"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows="5"
                placeholder="Write your comment here..."
                value={newComment.text}
              ></textarea>
              <button
                type="submit"
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all"
              >
                ➕  Add Comment
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeadDetails;
