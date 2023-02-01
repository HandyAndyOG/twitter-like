import React from "react"

export interface Posts {
    post: string
}

export interface User {
    userId: string | undefined
    posts: Posts[]
}

export interface States {
    posts: User[]
    setPosts: React.Dispatch<React.SetStateAction<User[]>>
}