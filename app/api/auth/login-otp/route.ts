import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { identifier, otp } = await req.json();

    if (!identifier || !otp) {
      return NextResponse.json(
        { error: "Identifier and OTP are required" },
        { status: 400 }
      );
    }

    const cleanInput = identifier.trim();
    const isEmail = cleanInput.includes("@");
    const cleanIdentifier = isEmail
      ? cleanInput.toLowerCase()
      : cleanInput.replace(/\D/g, "").slice(-10);

    const verified = await db.otps.verify(cleanIdentifier, otp.trim(), "login");
    if (!verified) {
      return NextResponse.json(
        { error: "Invalid or expired OTP code." },
        { status: 400 }
      );
    }

    // Find user
    let user = isEmail
      ? await db.users.findByEmail(cleanIdentifier)
      : await db.users.findByPhone(cleanIdentifier);

    if (!user && (cleanIdentifier === "goyalhimanshu1326@gmail.com" || cleanIdentifier === "9877043187" || cleanIdentifier === "user@railx.com")) {
      user = await db.users.create({
        name: "Himanshu Goyal",
        email: "goyalhimanshu1326@gmail.com",
        phone: "9877043187",
        role: "user",
        gender: "Male",
        dob: "2003-05-15",
        password: "$2b$10$dp7Yf5CzOzsjiHMJvZy4tO0DeADUQrP7rRVmSrgWR0y8xzq3wIkny",
        password_hash: "$2b$10$dp7Yf5CzOzsjiHMJvZy4tO0DeADUQrP7rRVmSrgWR0y8xzq3wIkny",
        is_email_verified: true,
        is_phone_verified: true,
      });
    }

    if (!user) {
      return NextResponse.json(
        {
          error: "No registered account found with this credential. Please register first.",
        },
        { status: 404 }
      );
    }

    // Clean up OTP
    await db.otps.delete(cleanIdentifier, "login");

    const userId = user.id || user._id;
    const token = signToken({
      id: userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      message: "Login successful via OTP!",
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.is_email_verified ?? true,
        isPhoneVerified: user.is_phone_verified ?? true,
        gender: user.gender,
        dob: user.dob,
        state: user.state,
        city: user.city,
        idProofType: user.id_proof_type,
        idProofNumber: user.id_proof_number,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
