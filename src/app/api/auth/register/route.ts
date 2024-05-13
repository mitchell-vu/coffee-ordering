import { User } from '@/models';
import { connect } from 'mongoose';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const { MONGODB_URI } = process.env as Record<string, string>;

export const POST = async (req: Request) => {
  const body = await req.json();
  const { email, password, name } = body;
  const hashedPassword = await bcrypt.hash(password, 12);

  await connect(MONGODB_URI);

  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
};
