import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faComment,
  faRetweet
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const image = post.images?.[0];
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <div className="bg-[#1a1a1a] text-white rounded-3xl shadow-xl px-6 pt-4 pb-3 mb-8 w-full max-w-[640px] mx-auto"
    onClick={() => navigate(`/questions/${post._id}`)}>
      {/* Top user info */}
      <div className="flex items-center justify-between text-[11px] text-gray-400 mb-3">
        <div className="flex items-center gap-2">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.user?.username}`}
            alt="avatar"
            className="w-[22px] h-[22px] rounded-full object-cover"
          />
          <span className="font-medium text-white text-[11px]">{post.user?.username}</span>
          <span className="text-gray-500 text-[11px]">· {formattedDate}</span>
        </div>
        <button className="text-blue-500 hover:underline text-[11px] font-medium">Follow</button>
      </div>

      {/* Title */}
      <div className="text-white text-[16px] font-bold leading-snug mb-2">
        {post.title.trim()}
      </div>

      {/* Description */}
      <div className="text-[14px] font-normal leading-normal text-gray-300 whitespace-pre-line mb-4">
        {post.description.trim()} <span className="text-blue-400 cursor-pointer hover:underline">(more)</span>
      </div>

      {/* Image */}
      {image && (
        <img
          src={image}
          alt="Post"
          className="rounded-xl w-full max-h-[300px] object-cover mb-4"
        />
      )}

      {/* Interaction Row */}
      <div className="flex justify-start gap-6 text-[13px] text-gray-400 pt-3 border-t border-gray-700">
        <span className="hover:text-purple-400 cursor-pointer flex items-center gap-1 pt-1">
          <FontAwesomeIcon icon={faArrowUp} className="w-4 h-4" /> 5.8K
        </span>
        <span className="hover:text-purple-400 cursor-pointer flex items-center gap-1 pt-1">
          <FontAwesomeIcon icon={faComment} className="w-4 h-4" /> 307
        </span>
        <span className="hover:text-purple-400 cursor-pointer flex items-center gap-1 pt-1">
          <FontAwesomeIcon icon={faRetweet} className="w-4 h-4" /> 161
        </span>
      </div>
    </div>
  );
}
