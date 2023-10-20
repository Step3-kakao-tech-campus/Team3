import client from "./instance";

interface RecordOptions {
  key?: number;
  size?: number;
  condition?: "all" | "created" | "participated";
  status?: "all" | "open" | "closed";
  cityId?: number;
  start?: string;
  end?: string;
}

export async function getParticipationRecord(userId: number, recordOptions: RecordOptions) {
  if (!userId) throw new Error("userId가 유효하지 않습니다.");
  const response = await client.get(`/api/posts/users/${userId}/participation-records`, { params: recordOptions });
  return response;
}

export async function getRecord(userId: number) {
  if (!userId) throw new Error("userId가 유효하지 않습니다.");
  const response = await client.get(`/api/users/${userId}/records`);
  return response;
}

export async function postScore(postId: number, formData: { score: number; image?: File }) {
  if (!postId) throw new Error("postId가 유효하지 않습니다.");
  const response = await client.post(`/api/posts/${postId}/scores`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}
