window.onload = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  // if (searchParams.has("id")) {
  // const userId = searchParams.get("id");
  // console.log(userId);
  // const resp = await fetch(`/memos/likes?uid=${userId}`);
  // const result = await resp.json();
  // console.log(result);
  // }

  const userIdStr = searchParams.has("id") ? `uid=${searchParams.get("id")}` : "";
  const resp = await fetch(`/memos/likes?${userIdStr}`);
  const result = await resp.json();
  console.log(result.memos);
};
