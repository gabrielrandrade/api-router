export function GET(request: Request) {
  const data = [
    {
      id: 1,
      text: "Just launched my new app!",
      isLiked: false,
    },
    {
      id: 2,
      text: "Working on some new Ui designs today",
      isLiked: true,
    },
    {
      id: 3,
      text: "Morning run complete!",
      isLiked: true,
    },
  ];

  return Response.json(data);
}
