// Mock API functions with sample JSON data

// Sample post data
export const SAMPLE_POST = {
  id: 22458,
  title: "Request for SBOM Details for Component Protocol Buffer v26.1",
  content: `Dear Team,

I hope you're doing well.

We are currently reviewing the SBOM for the Protocol Buffer v26.1 component and are seeking the following information:

• End of life (EOL)
• Years to End of Life (YTEOL)
• Currently lifecycle status
• License type and status
• Functionalities
• Interacting software dependencies
• Relevant regulatory or compliance requirements

We have attempted to locate this information on your website but were unable to find the specific details we need. If this information is available elsewhere or if there is any relevant document you could share, it would be greatly appreciated.

Please let us know if any further information required from our side to support this request.

Looking forward to your response.`,
  author: {
    id: 1,
    username: "Adithya1432",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  createdAt: "2024-01-01T10:00:00Z",
  status: "open",
  votes: {
    upvotes: 15,
    downvotes: 2,
    userVote: null, // null, 'up', or 'down'
  },
}

// Sample comments data with nested structure
export const SAMPLE_COMMENTS = [
  {
    id: 1,
    content: "How did you pay rtgs or online?",
    author: {
      id: 2,
      username: "Kind-Temperature4385",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2024-01-02T14:00:00Z",
    votes: {
      upvotes: 1,
      downvotes: 0,
      userVote: null,
    },
    parentId: null,
    postId: 22458,
    replies: [
      {
        id: 2,
        content: "Online",
        author: {
          id: 1,
          username: "Adithya1432",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        createdAt: "2024-01-02T15:00:00Z",
        votes: {
          upvotes: 1,
          downvotes: 0,
          userVote: null,
        },
        parentId: 1,
        postId: 22458,
        isAuthor: true,
        replies: [],
      },
    ],
  },
  {
    id: 3,
    content: "I too paid today.lets talk on Instagram.'kusaal_kankanala'",
    author: {
      id: 3,
      username: "kusaalk",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2024-01-02T15:00:00Z",
    votes: {
      upvotes: 1,
      downvotes: 0,
      userVote: null,
    },
    parentId: null,
    postId: 22458,
    replies: [
      {
        id: 4,
        content: "Sureeee",
        author: {
          id: 1,
          username: "Adithya1432",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        createdAt: "2024-01-02T15:30:00Z",
        votes: {
          upvotes: 1,
          downvotes: 0,
          userVote: null,
        },
        parentId: 3,
        postId: 22458,
        isAuthor: true,
        replies: [],
      },
      {
        id: 5,
        content: "Sent a follow request 😊",
        author: {
          id: 1,
          username: "Adithya1432",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        createdAt: "2024-01-02T15:45:00Z",
        votes: {
          upvotes: 1,
          downvotes: 0,
          userVote: null,
        },
        parentId: 3,
        postId: 22458,
        isAuthor: true,
        replies: [],
      },
    ],
  },
]

// Current user data
export const CURRENT_USER = {
  id: 4,
  username: "CurrentUser",
  avatar: "/placeholder.svg?height=32&width=32",
}