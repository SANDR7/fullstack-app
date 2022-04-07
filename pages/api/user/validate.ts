import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    return res.json({
      isLoggedIn: true
    });
  } else {
    return res.json({
      isLoggedIn:true 
    });
  }
}
