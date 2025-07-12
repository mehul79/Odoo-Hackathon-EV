
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPenNib,
  faFeatherPointed,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import Header from './header';
import PostCard from './postcard';

export default function Home() {
  const [tags, setTags] = useState([
    'Entertainment', 'Science', 'Technology', 'Mathematics', 'Education',
    'Lifestyle', 'History', 'Logic & Puzzles', 'CBSE'
  ]);
  const [newTag, setNewTag] = useState('');

  const posts = [
    {
      _id: "68720662efb1246375a4bc4b",
      user: { _id: "6871f22af326423f5b066268", username: "vaibhav" },
      title: "What is unga bunga atlas?",
      description: "I want to understand document databases.",
      images: [],
      tags: ["mongodb", "database"],
      createdAt: "2025-07-12T06:53:22.988Z",
    },
    {
      _id: "68720491a098acd87ecae9f8",
      user: { _id: "6871f22af326423f5b066268", username: "vaibhav" },
      title: "What is mongodb atlas?",
      description: "I want to understand document databases.",
      images: [
        "https://res.cloudinary.com/dicsxtvo5/image/upload/v1752302737/question-images/f7ol1l4wikalj0bpgych.jpg"
      ],
      tags: ["mongodb", "database"],
      createdAt: "2025-07-12T06:45:37.746Z",
    },
    {
      _id: "6871f217f326423f5b066264",
      user: { _id: "6871f20ff326423f5b066261", username: "shikhar" },
      title: "What is MongoDB?",
      description: "I want to understand document databases.",
      images: [],
      tags: ["mongodb", "database"],
      createdAt: "2025-07-12T05:26:47.184Z",
    }
  ];

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen font-sans text-sm overflow-x-hidden">
      <div className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-[#2a2a2a]">
        <Header />
      </div>
      <aside className="w-[260px] bg-[#0f0f0f] h-screen fixed top-0 left-0 border-r border-[#2a2a2a] flex flex-col justify-between z-40">
        <div className="p-4 space-y-3">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New Topic"
              className="w-full bg-[#1c1c1c] text-white text-sm px-3 py-1.5 rounded-xl border border-[#333] focus:outline-none"
            />
            <button
              onClick={addTag}
              className="bg-purple-600 px-3 py-1.5 text-white text-lg rounded-xl hover:bg-purple-700"
            >
              +
            </button>
          </div>

          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-2 py-2 hover:bg-[#1f1f1f] rounded-lg cursor-pointer group"
            >
              <div className="w-[8px] h-[8px] bg-red-500 rounded-full mt-[2px]"></div>
              <span className="text-white text-sm truncate">{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="ml-auto text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
              >
                <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-gray-500 text-[10px] px-4 py-5 border-t border-[#2a2a2a] leading-5 text-center">
          About · Careers · Terms · Privacy · <br /> Acceptable Use · Advertise · Press · <br /> Your Ad Choices · Grievance Officer
        </div>
      </aside>

      <div className="ml-[260px] mt-6 px-4">
        <div className="max-w-screen-xl mx-auto flex justify-between gap-6">
          <main className="w-[520px] mt-6 relative z-10">
            <div className="bg-[#181818] rounded-3xl p-6 shadow-lg mb-8">
              <div className="flex items-center mb-4 gap-3">
                <span className="text-purple-400 text-sm font-semibold">Explore</span>
                <input
                  type="text"
                  placeholder="What do you want to ask or share?"
                  className="flex-1 bg-[#0f0f0f] text-sm text-white px-4 py-2 rounded-full border border-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex justify-around text-white text-base border-t border-gray-700 pt-3">
                <button className="hover:text-purple-400 flex items-center gap-2">
                  <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" /> Ask
                </button>
                <span className="text-gray-500">|</span>
                <button className="hover:text-purple-400 flex items-center gap-2">
                  <FontAwesomeIcon icon={faPenNib} className="w-5 h-5" /> Answer
                </button>
                <span className="text-gray-500">|</span>
                <button className="hover:text-purple-400 flex items-center gap-2">
                  <FontAwesomeIcon icon={faFeatherPointed} className="w-5 h-5" /> Post
                </button>
              </div>
            </div>

            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </main>

          <aside className="w-[260px] bg-[#181818] p-4 rounded-3xl h-fit sticky top-20 self-start space-y-4 text-center text-xs mr-4 shadow-md">
            {[1, 2].map((_, i) => (
              <div key={i} className="bg-[#262626] p-3 rounded-2xl">
                <p className="text-gray-300 font-semibold mb-2">Free ChatGPT Browser Extension</p>
                <img src="https://placehold.co/240x120?text=Ad+Banner" className="rounded-xl w-full" alt="Ad" />
                <button className="mt-3 bg-purple-600 text-white px-4 py-1 rounded-xl">Open</button>
              </div>
            ))}
            <p className="text-gray-500 mt-1">Advertisement</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
