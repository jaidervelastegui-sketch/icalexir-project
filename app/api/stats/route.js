export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    data: {
      user: {
        username: "icalexir",
        display_name: "Alexis Ger",
        follower_count: 42447,
      },
    },
  });
}