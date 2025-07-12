"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";

import reactLogo from '../assets/react.svg'
import {
  SAMPLE_POST,
  SAMPLE_COMMENTS,
  CURRENT_USER,
} from '../utils/viewPostMockApi'
import CommentComponent from './Comment'

// console.log(SAMPLE_POST)

const ViewPost = () => {
  // const postId = 22458
  const { id: postId } = useParams();
  console.log("Post ID from URL:", postId)

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

  const samplePostGet = async() =>{
    try {
      const res = await axios.get(`http://localhost:8000/questions/${postId}`);
      // console.log("Sample Post Data:", res.data)
      setPost(res.data)
      setPostVotes(SAMPLE_POST.votes)
      setPostError(null)
    } catch (err) {
      setPostError(err)
      // setPost(SAMPLE_POST)
      // setPostVotes(SAMPLE_POST.votes)
      setPostError("Backend not available")
    } finally {
      setPostLoading(false)
    }
  }

  

  // Axios API calls
  // const fetchPost = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3001/posts/22458");
  //     setPost(res.data)
  //     setPostVotes(res.data.votes)
  //     setPostError(null)
  //   } catch (err) {
  //     setPostError(err)
  //     setPost(SAMPLE_POST)
  //     setPostVotes(SAMPLE_POST.votes)
  //     setPostError("Backend not available")
  //   } finally {
  //     setPostLoading(false)
  //   }
  // }

  // console.log(post)

  const fetchAnswers = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/questions/${postId}/replies`);
      // console.log("Sample Post Data:", res.data)
     setComments(res.data)
      setCommentsError(null)
      console.log("Fetched answers:", res.data)
    } catch (err) {
      setCommentsError(err)
      // setComments(SAMPLE_COMMENTS)
      setCommentsError("Backend not available")
    } finally {
      setCommentsLoading(false)
    }
  }

  // fetchAnswers()

  // const fetchComments = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3001/posts/22458");
  //     setComments(res.data)
  //     setCommentsError(null)
  //   } catch (err) {
  //     setCommentsError(err)
  //     setComments(SAMPLE_COMMENTS)
  //     setCommentsError("Backend not available")
  //   } finally {
  //     setCommentsLoading(false)
  //   }
  // }

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
  console.log(comments)


  // Reusable loading state setter
  const setLoading = (key, value) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }))
  }

  // Effects
  useEffect(() => {
    // fetchPost()
    samplePostGet()
    fetchAnswers()
    fetchCurrentUser()
  }, [])

  // Handlers
  // const handlePostVote = async (type) => {
  //   if (!post) return
  //   setLoading("postVote", true)
  //   try {
  //     const res = await axios.post("http://localhost:3001/posts/22458");
  //     setPostVotes(res.data.votes)
  //   } catch (err) {
  //     console.error("Error voting on post:", err)
  //   } finally {
  //     setLoading("postVote", false)
  //   }
  // }

  // const handleCommentVote = async (commentId, type) => {
  //   setLoading(`commentVote_${commentId}`, true)
  //   try {
  //     //   const res = await axios.post(`/api/comments/${commentId}/vote`, { type })
  //     const res = await axios.post("http://localhost:3001/posts/22458");
  //     setCommentVotes((prev) => ({
  //       ...prev,
  //       [commentId]: res.data.votes,
  //     }))
  //   } catch (err) {
  //     console.error("Error voting on comment:", err)
  //   } finally {
  //     setLoading(`commentVote_${commentId}`, false)
  //   }
  // }



  const handleAddComment = async () => {
    if (!newComment.trim() || !post) return
    setLoading("addComment", true)
    try {
      //   await axios.post(`/api/posts/${post.id}/comments`, { text: newComment })
      const sendData = {
        content: newComment,
        postId: postId,
      }
      await axios.post(`http://localhost:8000/questions/${postId}/replies`,{
        headers: {
          'Content-Type': 'application/json'
        },
        data: sendData
      });
      setNewComment("")
      fetchComments()
    } catch (err) {
      console.error("Error adding comment:", err)
      console.log(err)
    } finally {
      setLoading("addComment", false)
    }
  }


  const handleReplyWrapped = useCallback((commentId) => {
    return async () => {
      if (!replyText.trim() || !post) return
      setLoading(`reply_${commentId}`, true)
      try {
        await axios.post("http://localhost:3001/posts/22458")
        setReplyText("")
        setReplyingTo(null)
        fetchComments()
      } catch (err) {
        console.error("Error replying to comment:", err)
      } finally {
        setLoading(`reply_${commentId}`, false)
      }
    }
  }, [replyText, post])


  // const toggleCollapse = (commentId) => {
  //   setCollapsedComments((prev) => {
  //     const newSet = new Set(prev)
  //     if (newSet.has(commentId)) {
  //       newSet.delete(commentId)
  //     } else {
  //       newSet.add(commentId)
  //     }
  //     return newSet
  //   })
  // }

  //   const [newComment, setNewComment] = useState("")
  // const [replyText, setReplyText] = useState("")
  // const [replyingTo, setReplyingTo] = useState(null)
  // const [collapsedComments, setCollapsedComments] = useState(new Set())

  const toggleCollapse = (commentId) => {
    setCollapsedComments(prev => {
      const newSet = new Set(prev)
      newSet.has(commentId) ? newSet.delete(commentId) : newSet.add(commentId)
      return newSet
    })
  }



  // Get comment votes (from API response or local state)
  const getCommentVotes = useCallback((comment) => {
    return commentVotes[comment._id] || comment.votes
  }, [commentVotes])





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
            <span className="text-gray-500 font-light ml-2">#{post._id}</span>
          </h1>
        </div>

        {/* Status Badge */}
        {/* <div className="mb-6">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
            {post.status}
          </span>
        </div> */}

        {/* Post Content */}
        <div className="border border-gray-600 rounded-lg mb-6">
          <div className="flex items-center p-4 border-b border-gray-600 bg-gray-800 rounded-t-lg">
            <img src={reactLogo} alt="Author" className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1">
              <span className="font-semibold text-gray-100 mr-2">{post.user.username}</span>
              <span className="text-gray-500 text-sm">opened </span>
            </div>
            <button className="bg-transparent border-none text-gray-500 hover:bg-gray-700 hover:text-gray-100 cursor-pointer p-1 rounded">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>

          <div className="p-4 leading-relaxed">
            <div className="whitespace-pre-line">{post.description}</div>

            {/* Voting Section */}
            {/* <div className="flex gap-2 mt-6 pt-4 border-t border-gray-600">
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-200 border disabled:opacity-50 ${postVotes?.userVote === "up"
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
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-200 border disabled:opacity-50 ${postVotes?.userVote === "down"
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
            </div> */}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-4">Comments</h3>

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
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-sm text-white resize-y focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows="3"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || loadingStates.addComment}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {loadingStates.addComment ? "Adding..." : "Comment"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {commentsLoading ? (
            <div className="text-center text-gray-400 py-8">Loading comments...</div>
          ) : commentsError ? (
            <div className="text-center text-red-500 py-8">Error loading comments: {commentsError}</div>
          ) : (
            <div className="space-y-3">
              {comments?.map((comment) => (
                <CommentComponent
                  key={comment._id}
                  comment={comment}
                  depth={0}
                  maxDepth={6}
                  collapsedComments={collapsedComments}
                  toggleCollapse={toggleCollapse}
                  // handleCommentVote={handleCommentVote}
                  getCommentVotes={getCommentVotes}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  handleReply={handleReplyWrapped(comment._id)}
                  // loadingStates={loadingStates}
                  currentUser={currentUser}
                  isAccepted={ comment.isAccepted}
                />

              ))}
            </div>
          )}
          
        </div>

      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-72 flex-shrink-0">
        <div className="space-y-6">
          <div className="pb-4 border-b border-gray-700">
  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wider">Tags</h3>
  {post.tags && post.tags.length > 0 ? (
    <div className="flex flex-wrap gap-1">
      {post.tags.map((tag) => (
        <span
          key={tag}
          className="bg-blue-700 text-white px-2 py-0.5 rounded-xl text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No Tags</p>
  )}
</div>
        </div>
      </div>
    </div>
  )
}

export default ViewPost
