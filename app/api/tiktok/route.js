export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json({ error: "No code" }, { status: 400 });
  }

  try {
    const tokenRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_key: "sbawze28fwh1d03t5m",
        client_secret: "0dpgJM2fTSVVmf8jZodzWGajToAKI9zY",
        code,
        grant_type: "authorization_code",
        redirect_uri: "https://icalexir-project.vercel.app/api/tiktok",
      }).toString(),
      cache: "no-store",
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return Response.json({ step: "token", tokenData }, { status: 500 });
    }

    const userRes = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,follower_count",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        cache: "no-store",
      }
    );

    const userData = await userRes.json();

    return Response.json({
      tokenData,
      userData,
    });
  } catch (error) {
    return Response.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}