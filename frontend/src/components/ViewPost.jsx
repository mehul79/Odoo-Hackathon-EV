"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import reactLogo from '../assets/react.svg'
import {
    SAMPLE_POST,
    SAMPLE_COMMENTS,
    CURRENT_USER,
} from '../utils/viewPostMockApi'

console.log(SAMPLE_POST)

const ViewPost = () => {
  const postId = 22458

  // State
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [postLoading, setPostLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [postError, setPostError] = useState(null)
  const [commentsError, setCommentsError] = useState(null)

  const [postVotes, setPostVotes] = useState(null)
  const [commentVotes, setCommentVotes] = useState({})
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [collapsedComments, setCollapsedComments] = useState(new Set())
  const [loadingStates, setLoadingStates] = useState({})

  // Axios API calls
  const fetchPost = async () => {
    try {
      const res = await axios.get("http://localhost:3001/posts/22458");
      setPost(res.data)
      setPostVotes(res.data.votes)
      setPostError(null)
    } catch (err) {
      setPostError(err)
      setPost(SAMPLE_POST)
    setPostVotes(SAMPLE_POST.votes)
    setPostError("Backend not available")
    } finally {
      setPostLoading(false)
    }
  }

  console.log(post)



  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:3001/posts/22458");
      setComments(res.data)
      setCommentsError(null)
    } catch (err) {
      setCommentsError(err)
      setComments(SAMPLE_COMMENTS)
    setCommentsError("Backend not available")
    } finally {
      setCommentsLoading(false)
    }
  }

//   console.log(comments)


  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("http://localhost:3001/posts/22458");
      setCurrentUser(res.data)
    } catch (err) {
        setCurrentUser(CURRENT_USER)
    //   console.error("Error fetching current user:", err)
    }
  }


  // Reusable loading state setter
  const setLoading = (key, value) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }))
  }

  // Effects
  useEffect(() => {
    fetchPost()
    fetchComments()
    fetchCurrentUser()
  }, [])

  // Handlers
  const handlePostVote = async (type) => {
    if (!post) return
    setLoading("postVote", true)
    try {
      const res = await axios.post("http://localhost:3001/posts/22458");
      setPostVotes(res.data.votes)
    } catch (err) {
      console.error("Error voting on post:", err)
    } finally {
      setLoading("postVote", false)
    }
  }

  const handleCommentVote = async (commentId, type) => {
    setLoading(`commentVote_${commentId}`, true)
    try {
    //   const res = await axios.post(`/api/comments/${commentId}/vote`, { type })
    const res = await axios.post("http://localhost:3001/posts/22458");
      setCommentVotes((prev) => ({
        ...prev,
        [commentId]: res.data.votes,
      }))
    } catch (err) {
      console.error("Error voting on comment:", err)
    } finally {
      setLoading(`commentVote_${commentId}`, false)
    }
  }



  const handleAddComment = async () => {
    if (!newComment.trim() || !post) return
    setLoading("addComment", true)
    try {
    //   await axios.post(`/api/posts/${post.id}/comments`, { text: newComment })
    await axios.post("http://localhost:3001/posts/22458");
      setNewComment("")
      fetchComments()
    } catch (err) {
      console.error("Error adding comment:", err)
    } finally {
      setLoading("addComment", false)
    }
  }


  const handleReply = async () => {
    if (!replyText.trim() || !replyingTo || !post) return
    setLoading(`reply_${replyingTo}`, true)
    try {
    //   await axios.post(`/api/comments/${replyingTo}/replies`, {
    //     text: replyText,
    //     postId: post.id,
    //   })
    await axios.post("http://localhost:3001/posts/22458");
      setReplyText("")
      setReplyingTo(null)
      fetchComments()
    } catch (err) {
      console.error("Error replying to comment:", err)
    } finally {
      setLoading(`reply_${replyingTo}`, false)
    }
  }


  const toggleCollapse = (commentId) => {
    setCollapsedComments((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }


  // Get comment votes (from API response or local state)
  const getCommentVotes = (comment) => {
    return commentVotes[comment.id] || comment.votes
  }

  const CommentComponent = ({ comment, depth = 0, maxDepth = 6 }) => {
    const isCollapsed = collapsedComments.has(comment.id)
    const shouldShowMore = depth >= maxDepth && comment.replies.length > 0
    const votes = getCommentVotes(comment)
    const isVoting = loadingStates[`commentVote_${comment.id}`]
    const isReplying = loadingStates[`reply_${comment.id}`]

    return (
      <div className={`${depth > 0 ? "ml-4 border-l-2 border-gray-700 pl-2" : ""}`}>
        <div className="flex gap-2 py-2">
          {/* Collapse button */}
          {comment.replies.length > 0 && (
            <button
              onClick={() => toggleCollapse(comment.id)}
              className="text-gray-500 hover:text-gray-300 text-xs mt-1 w-4 h-4 flex items-center justify-center"
            >
              {isCollapsed ? "+" : "−"}
            </button>
          )}

          {/* Avatar */}
          <img
            src={comment.author.avatar || reactLogo}
            alt={comment.author.username}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />

          {/* Comment content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span className="font-medium text-gray-300">{comment.author.username}</span>
              {comment.isAuthor && (
                <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-medium">Author</span>
              )}
              {/* <span>{formatTimeAgo(comment.createdAt)}</span> */}
            </div>

            {!isCollapsed && (
              <>
                <div className="text-gray-100 text-sm mb-2 break-words">{comment.content}</div>

                {/* Vote and reply buttons */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCommentVote(comment.id, "up")}
                      disabled={isVoting}
                      className={`p-1 rounded hover:bg-gray-700 disabled:opacity-50 ${
                        votes.userVote === "up" ? "text-orange-500" : "text-gray-500"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 2.5l3.5 7h-7l3.5-7z" />
                      </svg>
                    </button>
                    <span className="text-gray-400 min-w-[1rem] text-center">
                      {isVoting ? "..." : votes.upvotes - votes.downvotes}
                    </span>
                    <button
                      onClick={() => handleCommentVote(comment.id, "down")}
                      disabled={isVoting}
                      className={`p-1 rounded hover:bg-gray-700 disabled:opacity-50 ${
                        votes.userVote === "down" ? "text-blue-500" : "text-gray-500"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 13.5l-3.5-7h7l-3.5 7z" />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-gray-500 hover:text-gray-300 flex items-center gap-1"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3.75 2.75a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 10.25v-7.5C2 1.784 2.784 1 3.75 1h7.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0111.25 12H9.06l-2.573 2.573A1.458 1.458 0 014 13.543V12H3.75z" />
                    </svg>
                    Reply
                  </button>

                  <button className="text-gray-500 hover:text-gray-300">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </button>
                </div>

                {/* Reply input */}
                {replyingTo === comment.id && (
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
                        placeholder={`Reply to ${comment.author.username}...`}
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-100 resize-none focus:outline-none focus:border-blue-500"
                        rows="2"
                      />
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={handleReply}
                          disabled={!replyText.trim() || isReplying}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-3 py-1 rounded text-xs"
                        >
                          {isReplying ? "Replying..." : "Reply"}
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
        {!isCollapsed && comment.replies.length > 0 && (
          <div className="mt-1">
            {shouldShowMore ? (
              <div className="ml-6">
                <button className="text-blue-400 hover:text-blue-300 text-xs">
                  Show {comment.replies.length} more replies
                </button>
              </div>
            ) : (
              comment.replies.map((reply) => (
                <CommentComponent key={reply.id} comment={reply} depth={depth + 1} maxDepth={maxDepth} />
              ))
            )}
          </div>
        )}
      </div>
    )
  }

  // Loading states
  if (postLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-gray-100">Loading post...</div>
      </div>
    )
  }

//   if (postError) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-900">
//         <div className="text-red-400">Error loading post: {postError}</div>
//       </div>
//     )
//   }

  if (!post) return null

  return (
    <div className="flex mx-auto p-5 gap-6 bg-gray-900 text-gray-100 font-sans min-h-screen lg:flex-row flex-col">
      <div className="flex-1 lg:max-w-[calc(100%-320px)] max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-col sm:flex-row gap-4 sm:gap-0">
          <h1 className="text-2xl lg:text-3xl font-normal text-gray-100 text-center sm:text-left">
            {post.title}
            <span className="text-gray-500 font-light ml-2">#{post.id}</span>
          </h1>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
            {post.status}
          </span>
        </div>

        {/* Post Content */}
        <div className="border border-gray-600 rounded-lg mb-6">
          <div className="flex items-center p-4 border-b border-gray-600 bg-gray-800 rounded-t-lg">
            <img src={reactLogo} alt="Author" className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1">
              <span className="font-semibold text-gray-100 mr-2">{post.author.username}</span>
              <span className="text-gray-500 text-sm">opened </span>
            </div>
            <button className="bg-transparent border-none text-gray-500 hover:bg-gray-700 hover:text-gray-100 cursor-pointer p-1 rounded">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>

          <div className="p-4 leading-relaxed">
            <div className="whitespace-pre-line">{post.content}</div>

            {/* Voting Section */}
            <div className="flex gap-2 mt-6 pt-4 border-t border-gray-600">
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-200 border disabled:opacity-50 ${
                  postVotes?.userVote === "up"
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-gray-800 text-gray-100 border-gray-600 hover:bg-gray-700"
                }`}
                onClick={() => handlePostVote("up")}
                disabled={loadingStates.postVote}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 2.5l3.5 7h-7l3.5-7z" />
                </svg>
                {loadingStates.postVote ? "..." : postVotes?.upvotes || 0}
              </button>
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-200 border disabled:opacity-50 ${
                  postVotes?.userVote === "down"
                    ? "bg-red-600 border-red-600 text-white"
                    : "bg-gray-800 text-gray-100 border-gray-600 hover:bg-gray-700"
                }`}
                onClick={() => handlePostVote("down")}
                disabled={loadingStates.postVote}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 13.5l-3.5-7h7l-3.5 7z" />
                </svg>
                {loadingStates.postVote ? "..." : postVotes?.downvotes || 0}
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-100 mb-3">Comments</h3>

            {/* Add Comment */}
            <div className="flex gap-3 mb-6">
              <img
                src={currentUser?.avatar || reactLogo}
                alt="You"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-gray-100 text-sm resize-y focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows="3"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || loadingStates.addComment}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white border-none px-4 py-2 rounded-md text-sm cursor-pointer font-medium"
                  >
                    {loadingStates.addComment ? "Adding..." : "Comment"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {/* {commentsLoading ? (
            <div className="text-center text-gray-500 py-8">Loading comments...</div>
          ) : commentsError ? (
            <div className="text-center text-red-400 py-8">Error loading comments: {commentsError}</div>
          ) : (
            <div className="space-y-1">
              {comments?.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
            </div>
          )} */}
          <div className="space-y-1">
              {comments?.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
            </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-72 flex-shrink-0">
        <div className="space-y-6">

          <div className="pb-4 border-b border-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">Tags</h3>
            {post.labels.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {post.labels.map((label) => (
                  <span key={label} className="bg-red-600 text-white px-2 py-0.5 rounded-xl text-xs font-medium">
                    {label}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No Tags</p>
            )}
          </div>

          <div className="pb-4 border-b border-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">Type</h3>
            <p className="text-gray-500 text-sm">{post.metadata.type || "No type"}</p>
          </div>
          

          
        </div>
      </div>
    </div>
  )
}

export default ViewPost
