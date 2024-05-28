import { NextResponse } from "next/server";
import { prisma } from "../config/prisma";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.products2.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
      },
    });
    return NextResponse.json({
      message: "Products Created",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Some Thing Went Wronge",
      error: JSON.stringify(error),
    });
  }
};
export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.products2.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({
      message: "Products Delete",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Some Thing Went Wronge",
      error: JSON.stringify(error),
    });
  }
};
export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.products2.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
      },
    });
    return NextResponse.json({
      message: "Products Updated",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Some Thing Went Wronge",
      error: JSON.stringify(error),
    });
  }
};
