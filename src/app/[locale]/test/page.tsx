"use client";
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";

interface Pokemon {
    name: string;
    url: string;
}

const fetchData = async (): Promise<{ results: Pokemon[] }> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

const DataDisplay = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: fetchData,
    });

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data && data.results && (
                <div>
                    {data.results.map((pokemon: Pokemon) => (
                        <div key={pokemon.name}>{pokemon.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DataDisplay;
