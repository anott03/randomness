"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

function PageContents() {
  const [ numNums, setNumNums ] = useState(10);
  const quantumQuery = useQuery({ queryKey: ["quantumNums"], queryFn: async () => {
      return await fetch(`http://localhost:3002/${numNums}`).then(res => res.json());
  }})

  const sodiumQuery = useQuery({ queryKey: ["sodiumNums"], queryFn: async () => {
      return await fetch(`http://localhost:3001/${numNums}`).then(res => res.json());
  }})
    return (
      <main className="w-screen h-screen flex flex-col p-3 bg-black text-white">
          <form className="flex flex-row py-2 gap-2" onSubmit={(e) => {
              e.preventDefault();
          }}>
              <input name="inpt" type="number" value={numNums} onChange={(e) => setNumNums(Number.parseInt(e.target.value))} className="p-2 bg-inherit text-inherit border border-white flex-1"/>
              <button type="submit" className="p-2 bg-violet-500 hover:bg-violet-600">Go</button>
          </form>
          <p className="text-xl font-bold">Quantum Random Numbers</p>
          { quantumQuery.isLoading ? <p className="text-xl">Loading...</p> : quantumQuery.data.bins.map((n: number, i:number) => <p key={i}>{n}</p>) }
          <p className="text-xl font-bold">Sodium Random Numbers</p>
          { sodiumQuery.isLoading ? <p className="text-xl">Loading...</p> : sodiumQuery.data.bins.map((n: number, i:number) => <p key={i}>{n}</p>) }
      </main>
    );
}

export default async function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <PageContents />
    </QueryClientProvider>
  )
}
