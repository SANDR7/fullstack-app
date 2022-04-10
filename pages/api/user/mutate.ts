import logger from '@/lib/logger';
import { sessionOptions } from '@/lib/session';
import { ApiUserMutations } from '@/types/server';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

const LOGGER = logger(import.meta.url);

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { m } = req.query as ApiUserMutations; //if m as mutation e.g. posts

  // const test = m as mApi;

  if (req.method === 'PUT') {
    return res.status(201).json({});
  }

  if (req.method === 'GET') {
    if (m === 'withPosts') {
      // fetch with posts
    }

    return res.status(200).json({});
  }

  if (req.method === 'POST') {
    if (m === 'createPost') {
      // create post logic
    }

    return res.status(200).json({});
  }

  if (req.method === 'DELETE') {
    return res.status(204).json({});
  }
}
