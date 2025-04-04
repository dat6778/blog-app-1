'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Article {
    _id: string;
    title: string;
    keyword?: string;
    description?: string;
    content: string;
    date?: string;
}

const API_URL = 'http://localhost:4001/api/v1';

export default function Home() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${API_URL}/articles`);
                const data = await response.json();
                setArticles(data.data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Blog Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <div key={article._id} className="border rounded-lg p-6 shadow-md">
                        <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                        {article.description && (
                            <p className="text-gray-600 mb-4">{article.description}</p>
                        )}
                        {article.keyword && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {article.keyword.split(',').map((tag, index) => (
                                    <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                        <Link
                            href={`/article/${article._id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Read more →
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
} 