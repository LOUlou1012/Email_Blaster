import { NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { emails, subject, message } = await req.json();

    if (!emails || !message) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const sendPromises = emails.map((email: string) =>
      transporter.sendMail({
        from: `"No Reply" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject || "No Subject",
        text: message,
      })
    );

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}