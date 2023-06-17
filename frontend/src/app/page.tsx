"use client";

import { QueryClient, QueryClientProvider, useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { LegacyRef, useMemo, useRef, useState } from "react";

const useMutateQuantum = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (n: number) => {
            return await fetch(`http://localhost:3002/${n}`).then(res => res.json());
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["quantumNums"], data);
        }
    });
}

const useMutateSodium = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (n: number) => {
            return await fetch(`http://localhost:3001/${n}`).then(res => res.json());
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["sodiumNums"], data);
        }
    });
}

function PageContents() {
  const [ numNums, setNumNums ] = useState(10);
  const formRef: LegacyRef<HTMLFormElement> = useRef(null);

  const quantumQuery = useQuery({ queryKey: ["quantumNums"], queryFn: async () => {
      return await fetch(`http://localhost:3002/${numNums}`).then(res => res.json());
  }})

  const sodiumQuery = useQuery({ queryKey: ["sodiumNums"], queryFn: async () => {
      return await fetch(`http://localhost:3001/${numNums}`).then(res => res.json());
  }})

  const quantumMutation = useMutateQuantum();
  const sodiumMutation = useMutateSodium();

  const dataLoading = useMemo(() =>
      (quantumQuery.isLoading)||(sodiumQuery.isLoading)||(quantumMutation.isLoading)||(sodiumMutation.isLoading),
      [quantumQuery, sodiumQuery, quantumMutation, sodiumMutation])

  return (
    <main className="w-screen h-screen flex flex-col p-3 bg-black text-white">
        <form className="flex flex-row py-2 gap-2" ref={formRef} onSubmit={(e) => {
            e.preventDefault();
            quantumMutation.mutate(numNums);
            sodiumMutation.mutate(numNums);
        }}>
            <input disabled={dataLoading} name="inpt" type="number" value={numNums} onChange={(e) => {
                if (e.target.value && e.target.value !== "") {
                    setNumNums(Number.parseInt(e.target.value))
                } else {
                    setNumNums(0);
                }
            }} className="p-2 bg-inherit text-inherit border border-white flex-1"/>
            <button disabled={dataLoading} type="submit" className="p-2 bg-violet-500 hover:bg-violet-600">Go</button>
        </form>
        <p className="text-xl font-bold">Quantum Random Numbers</p>
        { dataLoading ? <p className="text-xl">Loading...</p> : quantumQuery.data.bins.map((n: number, i:number) => <p key={i}>{n}</p>) }
        <p className="text-xl font-bold">Sodium Random Numbers</p>
        { dataLoading ? <p className="text-xl">Loading...</p> : sodiumQuery.data.bins.map((n: number, i:number) => <p key={i}>{n}</p>) }
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
