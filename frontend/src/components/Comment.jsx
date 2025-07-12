import { memo, useState } from "react"
import reactLogo from "../assets/react.svg"
import axios from "axios"
const CommentComponent = ({
    comment,
    depth = 0,
    maxDepth = 6,
    collapsedComments,
    toggleCollapse,
    // handleCommentVote,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    handleReply,
    // loadingStates,
    getCommentVotes,
    currentUser,
    isAccepted
  }) => {
    console.log("Rendering Comment:", comment._id)
    const isCollapsed = collapsedComments.has(comment._id)
    const shouldShowMore = depth >= maxDepth && comment.replies.length > 0
    const [loadingStates, setLoadingStates] = useState({});
    const votes = getCommentVotes(comment)
    console.log("Comment Votes:", votes)
    const isVoting = loadingStates[`commentVote_${comment._id}`]
    const isReplying = loadingStates[`reply_${comment._id}`]


const handleCommentVote = async (comment, type) => {
  if (!comment || !comment._id) {
    console.error("Invalid comment object:", comment);
    return;
  }

  const endpoint =
    type === "up"
      ? `http://localhost:8000/replies/${comment._id}/upvote`
      : `http://localhost:8000/replies/${comment._id}/downvote`;

  setLoadingStates((prev) => ({
    ...prev,
    [`commentVote_${comment._id}`]: true,
  }));

  try {
    await axios.post(
      endpoint,
      {}, // empty body
      { withCredentials: true }
    );

    setCommentVotes((prev) => ({
      ...prev,
      [comment._id]: (prev[comment._id] || 0) + (type === "up" ? 1 : -1),
    }));
  } catch (err) {
    console.error("Vote failed:", err.response?.data || err.message);
    if (err.response?.status === 401) {
      alert("Unauthorized. Please log in.");
    } else if (err.response?.status === 400) {
      alert(err.response.data.err);
    }
  } finally {
    setLoadingStates((prev) => ({
      ...prev,
      [`commentVote_${comment._id}`]: false,
    }));
  }
};

    return (
      <div className={`${depth > 0 ? "ml-14 border-l border-gray-700 pl-6" : ""}`}>
        <div className="flex gap-3 py-3">

          {/* Collapse toggle */}
          {comment.replies?.length > 0 && (
            <button
              onClick={() => toggleCollapse(comment._id)}
              className="text-gray-500 hover:text-gray-300 text-4xl mt-1 w-5 h-5 flex items-center justify-center font-semibold"
            >
              {isCollapsed ? "+" : "−"}
            </button>
          )}

          {/* Avatar */}
          <img
            src={comment.user.avatar || reactLogo}
            alt={comment.user.username}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span className="text-white font-semibold">{comment.user.username}</span>
              {isAccepted && (
                <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-medium">Accepted</span>
              )}
              {/* {comment.isAuthor && (
                <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-medium">Author</span>
              )} */}
              {/* <span>{formatTimeAgo(comment.createdAt)}</span> */}
            </div>

            {/* Content and actions */}
            {!isCollapsed && (
              <>
                {/* Comment body */}
                <div className="text-sm text-gray-200 leading-relaxed mb-2 break-words">
                  {comment.content}
                </div>

                {/* Voting & reply */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {/* Vote panel */}
                  <div className="flex flex-col items-center text-xs">
                    <button
                      onClick={() => handleCommentVote(comment._id, "up")}
                      disabled={isVoting}
                      className={`hover:text-orange-500 ${votes.userVote === "up" ? "text-orange-500" : ""
                        }`}
                    >
                      ▲
                    </button>
                    <span className="text-gray-400">
                      {/* {isVoting ? "…" : votes.upvotes - votes.downvotes}*/}
                      {votes}
                    </span>
                    <button
                      onClick={() => handleCommentVote(comment._id, "down")}
                      disabled={isVoting}
                      className={`hover:text-blue-500 ${votes.userVote === "down" ? "text-blue-500" : ""
                        }`}
                    >
                      ▼
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === comment._id ? null : comment._id)
                    }
                    className="hover:text-gray-300"
                  >
                    Reply
                  </button>

                  <button className="hover:text-gray-300">More</button>
                </div>

                {/* Reply box */}
                {replyingTo === comment._id && (
                  <div className="mt-3 flex gap-2">
                    <img
                      src={currentUser?.avatar || reactLogo}
                      alt="You"
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${comment.user.username}...`}
                        className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 resize-none focus:outline-none focus:border-blue-500"
                        rows="2"
                      />
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={handleReply}
                          disabled={!replyText.trim() || isReplying}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-3 py-1 rounded text-xs"
                        >
                          {isReplying ? "Replying…" : "Reply"}
                        </button>
                        <button
                          onClick={() => {
                            setReplyingTo(null)
                            setReplyText("")
                          }}
                          className="text-gray-500 hover:text-gray-300 px-3 py-1 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Nested replies */}
        {/* {!isCollapsed && comment.replies.?length > 0 && (
          <div className="mt-1">
            {shouldShowMore ? (
              <div className="ml-10">
                <button className="text-blue-400 hover:text-blue-300 text-xs">
                  Show {comment.replies.?length} more repl{comment.replies.length > 1 ? "ies" : "y"}
                </button>
              </div>
            ) : (
              comment.replies.map((reply) => (
                <CommentComponent
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                  collapsedComments={collapsedComments}
                  toggleCollapse={toggleCollapse}
                  handleCommentVote={handleCommentVote}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  handleReply={handleReply}
                  loadingStates={loadingStates}
                  getCommentVotes={getCommentVotes}
                  currentUser={currentUser}
                />
              ))
            )}
          </div>
        )} */}
      </div>
    )
  }

  export  default memo(CommentComponent);