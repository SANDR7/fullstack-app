import logger from '@/lib/logger';
import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

const LOGGER = logger(import.meta.url);

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { m } = req.query; //if m as mutation e.g. login or with posts

  if (req.method === 'PUT') {
    res.status(201).json({});
  }

  if (req.method === 'GET') {
    if (m === 'withPosts') {
      // fetch with posts
    }

    res.status(200).json({});
  }

  if (req.method === 'POST') {
    if (m === 'login') {
      // login logic
    }

    res.status(200).json({});
  }

  if (req.method === 'DELETE') {
    res.status(204).json({});
  }
}
