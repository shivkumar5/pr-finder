export interface PullRequest {
    url:string,
    number:number,
    state:string,
    html_url:string,
}

export interface File {
    filename:string
}

export interface PullRequestFileData {
    pull_request:number,
    filesData:any
}

export interface PullRequestFile {
    pull_request:number,
    filesData:[File]
}