"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import Form from "@/components/Form";

export type PostType = {
  prompt: string;
  tag: string;
};

const CreatePrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<PostType>({
    prompt: "",
    tag: "",
  });

  const { data: session } = useSession();
  const router = useRouter();
  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();
    //console.log(post);
    //if loading true
    setIsSubmitting(true);
    //For post sent api
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          // @ts-ignore
          userId: session?.user.id,
        }),
      });
      // @ts-ignore
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form
      type="create"
      post={post}
      setPost={setPost}
      submitting={isSubmitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
