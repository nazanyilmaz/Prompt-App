import { PostType } from "@/app/create-prompt/page";
import Link from "next/link";
import { Dispatch, FormEvent, SetStateAction } from "react";

type FormProps = {
  type: string;
  post: PostType;
  setPost: Dispatch<SetStateAction<PostType>>;
  submitting: boolean;
  handleSubmit: (e: FormEvent) => void;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className=" w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="orange_gradient">
          {type === "create" && "Create"} Post
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        Create and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            required
            value={post.prompt}
            placeholder="Write your post here"
            className="form_textarea"
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt
            <span>
              <span className="text-gray-500">
                (#webdevelopment, #idea, etc.)
              </span>
            </span>
          </span>
          <input
            required
            value={post.tag}
            placeholder="#Tag"
            className="form_input"
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full"
          >
            {submitting ? "Loading..." : type === "create" && "Create"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
