"use client";

import { Button } from "@nextui-org/button";
import { Image, Spinner, Textarea } from "@nextui-org/react";
import { Download } from "lucide-react";
import React from "react";
import useSWRMutation from "swr/mutation";

const fetcher = (...args: [string, any]) => {
  const [url, { arg }] = args;
  return fetch(url, {
    method: arg.method || "GET",
    body: arg.method === "POST" ? JSON.stringify(arg.data) : arg.data,
  }).then((res) => res.blob());
};

function HomePage() {
  const [description, setDescription] = React.useState("");

  const { data, trigger, isMutating } = useSWRMutation<any, any, any, any>(
    "https://art.jweboy.online",
    fetcher
  );

  const handleChange = (value: string) => {
    setDescription(value);
  };

  const handleSubmit = () => {
    if (description === "") {
      setDescription(() => {
        const prompt = "Fox, forest, autumn, misty, sunlight, 8k, best quality";
        trigger({ method: "POST", data: { prompt } });
        return prompt;
      });
    } else {
      trigger({ method: "POST", data: { prompt: description } });
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    const url = URL.createObjectURL(data);
    a.href = url;
    a.download = "generate.png";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-h-screen p-8 pb-20 gap-16 "
      style={{
        background: "radial-gradient(circle at 50% 50%, #0a0f1f, #000000)",
      }}
    >
      <section className="flex flex-col items-end justify-center gap-6 w-1/3 mx-auto">
        <h1
          className="capitalize text-center text-[48px] py-8 w-full text-primary font-bold"
          style={{ textShadow: "0 0 20px #00eaff, 0 0 30px #00eaff" }}
        >
          AI Image Generator
        </h1>
        <Textarea
          placeholder="Please enter prompt"
          size="lg"
          className="hover:shadow-textarea hover:rounded-lg"
          onValueChange={handleChange}
          value={description}
          minRows={10}
          description="e.g. Fox, forest, autumn, misty, sunlight, 8k, best quality"
        />
        <div className="flex justify-between w-full">
          <Button
            size="md"
            variant="bordered"
            color="primary"
            isDisabled={!data && isMutating}
            onClick={handleDownload}
          >
            <Download />
          </Button>
          <Button
            style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }}
            className="capitalize hover:shadow-button text-xl font-bold text-white"
            onClick={handleSubmit}
            isDisabled={isMutating}
            radius="full"
          >
            generate
          </Button>
        </div>
      </section>
      <section className="flex items-center justify-center py-8">
        {isMutating ? (
          <Spinner />
        ) : (
          !!data && (
            <Image
              src={URL.createObjectURL(data)}
              alt=""
              width={800}
              height={800}
            />
          )
        )}
      </section>
    </div>
  );
}

export default HomePage;
