import client from "./instance";

export async function getMessages(pageParam?: number) {
  const response = await client.get(`/api/messages/opponents`, {
    params: {
      key: pageParam,
    },
  });
  return response;
}

export async function getUserMessages(id: number, pageParam?: number) {
  const response = await client.get(`/api/messages/opponents/${id}`, {
    params: {
      key: pageParam,
    },
  });
  return response;
}

export async function postMessages({ id, content }: { id: number; content: string }) {
  const response = await client.post(`/api/messages/opponents/${id}`, {
    content,
  });
  return response;
}
