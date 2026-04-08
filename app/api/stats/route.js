export const dynamic = "force-dynamic";

async function refreshAccessToken() {
  const refreshToken = process.env.TIKTOK_REFRESH_TOKEN;
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;

  if (!refreshToken || !clientKey || !clientSecret) {
    throw new Error("Faltan variables de entorno");
  }

  const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(data?.error_description || "No se pudo refrescar el token");
  }

  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await refreshAccessToken();

    const userRes = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,username,avatar_url,follower_count",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const data = await userRes.json();

    if (!userRes.ok) {
      throw new Error(data?.error?.message || "Error consultando TikTok");
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      {
        data: {
          user: {
            username: "icalexir",
            display_name: "Alexis Ger",
            follower_count: 0,
          },
        },
        error: error.message || "Error en stats",
      },
      { status: 200 }
    );
  }
}
