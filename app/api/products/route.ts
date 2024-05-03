// import type { NextApiRequest, NextApiResponse } from 'next'

// type ResponseData = {
//     message: string,
//     products: any[]
// }

// export default function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<ResponseData>
// ) {
//     if (req.method === 'GET') {
//         // Simulate async data fetching
//         setTimeout(async () => {
//             const result = await fetch('http://localhost:4000/products');
//             const products = await result.json();

//             res.status(200).json({ message: 'Products fetched successfully', products });
//         }, 2000);
//     } else {
//         res.status(405).json({
//             message: 'Method not allowed',
//             products: []
//         });
//     }
// }

// import type { NextApiRequest, NextApiResponse } from 'next'

// type ResponseData = {
//     message: string;
//     products: any[];
// }

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<ResponseData>
// ) {
//     if (req.method === 'GET') {
//         // Simulate async data fetching
//         setTimeout(async () => {
//             const result = await fetch('http://localhost:4000/products');
//             const products = await result.json();

//             res.status(200).json({ message: 'Products fetched successfully', products });
//         }, 2000);
//     } else {
//         res.status(405).json({
//             message: 'Method not allowed',
//             products: []
//         });
//     }
// }

// import type { NextApiRequest, NextApiResponse } from 'next'

// type ResponseData = {
//     message: string;
//     products: any[];
// }

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<ResponseData>
// ) {
//     if (req.method === 'GET') {
//         try {
//             const result = await fetch('http://localhost:4000/products');
//             if (!result.ok) {
//                 throw new Error('Failed to fetch products');
//             }
//             const products = await result.json();
//             res.status(200).json({ message: 'Products fetched successfully', products });
//         } catch (error) {
//             res.status(500).json({ message: 'Internal server error', products: [] });
//         }
//     } else {
//         res.status(405).json({
//             message: 'Method not allowed',
//             products: []
//         });
//     }
// }

import type { NextRequest } from 'next/server';

type ResponseData = {
    message: string;
    products: any[];
}

export async function GET(request: NextRequest): Promise<Response> {
    try {
        const result = await fetch('http://localhost:4000/products');
        if (!result.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await result.json();
        return new Response(JSON.stringify({ message: 'Products fetched successfully', products }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal server error', products: [] }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export const dynamic = 'force-dynamic';
