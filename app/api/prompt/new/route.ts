import { Prompt } from "@/models/prompt";
import { connectToDB } from "@/utils/database";

type PostData = {
  userId: string;
  prompt: string;
  tag: string;
};

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  //console.log(body);
  try {
    await connectToDB();
    //create a new post
    const newPrompt = new Prompt({
      creator: body.userId,
      tag: body.tag,
      prompt: body.prompt,
    });
    //save to DB
    await newPrompt.save();
    //sent a response to client
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Prompt is not created", {
      status: 500,
    });
  }
};
