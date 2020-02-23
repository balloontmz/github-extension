import React from 'react'

import { useParams } from 'react-router-dom';


export function ProjectDetail() {

    let { author, repo } = useParams();

    return (
        <div>
            Hello world  当前的用户为: {author} 当前仓库为: {repo}
        </div>
    );
}