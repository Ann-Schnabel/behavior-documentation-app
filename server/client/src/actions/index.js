import axios from "axios";

export const GET_JOBS = "GET_JOBS";

export function getJobs() {
  const url = `/api/jobs`;
  const request = axios.get(url);

  return {
    type: GET_JOBS,
    payload: request,
  };
}