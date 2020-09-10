import { fetchPullRequestDetails, fetchPullRequestFilesDetail, listPullRequestFiles } from './src/github-api.js'
import dotenv from "dotenv";

dotenv.config()
const abc = async ()  => {
    const pulls = await fetchPullRequestDetails(process.env.GITHUB_TOKEN, 'goshposh/web');
    const files = await fetchPullRequestFilesDetail(process.env.GITHUB_TOKEN,pulls);
    const pullsFiles = await listPullRequestFiles(files);
    console.log(pullsFiles)
}

abc()