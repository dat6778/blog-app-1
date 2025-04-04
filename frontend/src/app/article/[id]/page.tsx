'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

export default function ArticleDetail() {
    const params = useParams();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${API_URL}/articles/${params.id}`);
                const data = await response.json();
                setArticle(data.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [params.id]);

    if (!article) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                ← Back to Articles
            </Link>
            <article className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                {article.keyword && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {article.keyword.split(',').map((tag, index) => (
                            <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
                {article.description && (
                    <p className="text-gray-600 mb-8">{article.description}</p>
                )}
                <div className="prose max-w-none">
                    {article.content}
                </div>
                {article.date && (
                    <div className="mt-8 text-gray-500">
                        Published on: {new Date(article.date).toLocaleDateString()}
                    </div>
                )}
            </article>
        </main>
    );
} 