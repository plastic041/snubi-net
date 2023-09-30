export type Post = {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
};

type PostRaw = {
  number: number; // issue number
  title: string;
  created_at: string;
  updated_at: string;
  state: "open" | "closed";
  body: string;
};

export const loadPosts = async (): Promise<Post[]> => {
  const url = new URL(
    "https://api.github.com/repos/plastic041/snubi-net/issues",
  );
  url.search = new URLSearchParams({
    labels: "post",
  }).toString();

  const postRaws = await fetch(url.toString(), {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "force-cache",
  }).then((res) => res.json() as Promise<PostRaw[]>);

  const posts: Post[] = postRaws.map((postRaw) => {
    // eslint-disable-next-line camelcase
    const { number, title, created_at, updated_at, state, body } = postRaw;

    const bodyLF = body.replace(/\r\n/g, "\n");

    const description = bodyLF.split("\n---\n")[0];
    const content = bodyLF.split("\n---\n").slice(1).join("\n---\n");

    return {
      id: number,
      title,
      description,
      content,
      // eslint-disable-next-line camelcase
      createdAt: created_at,
      // eslint-disable-next-line camelcase
      updatedAt: updated_at,
      isPublished: state === "open",
    };
  });

  return posts;
};
