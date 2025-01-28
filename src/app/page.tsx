'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [kayneMessages, setKayneMessages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const api = 'https://api.kanye.rest';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuote = (event: any) => {
    event.preventDefault();

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setKayneMessages((prevMessages) => [...prevMessages, data.quote]);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [kayneMessages]);

  return (
    <div className=" flex min-h-screen items-center bg-slate-50 justify-center">
      <Card className="w-[440px] h-[700px] grid grid-rows-[min-content,1fr,min-content]">
        <CardHeader className="border-b border-border mb-4">
          <CardTitle>Chat Kayne, skrr!</CardTitle>
          <CardDescription>Using Next.js, Tailwind CSS, and TypeScript</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="./kayne.jpg" className="object-cover w-12 h-w-12 rounded-full" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className="text-sm font-semibold leading-none">Kayne West</p>

            <span className="text-sm text-muted-foreground">
              And I wonder...
            </span>
          </div>

          <ScrollArea className="h-[460px] rounded-md p-4">
            <div className="flex flex-col items-start gap-2">
              {kayneMessages && kayneMessages.map((message, index) => (
                <div key={index} className="">
                  <p className="bg-zinc-800 p-2 rounded-xl text-sm flex flex-col gap-2">
                    { errorMessage ? errorMessage : message }
                  </p>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <form action="" className="flex items-center gap-2 justify-center w-full" onSubmit={handleQuote}>
            <Button onClick={handleQuote} className="bg-primary transform duration-300 rounded-xl w-full">
              Generate message
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}