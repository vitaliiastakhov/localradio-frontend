import { NextApiRequest, NextApiResponse } from 'next';
import { ScheduleDocument } from '@/entities/schedule/api/schedule.graphql.interface';
import { client } from '@/shared/api/apollo/apollo-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const eventSchedulesFixed = await fetchEventSchedulesFixed();
    res.status(200).send({ eventSchedulesFixed });
  } catch (error) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}

export const fetchEventSchedulesFixed = async () => {
  const {
    data: { eventSchedulesFixed },
  } = await client.query({
    query: ScheduleDocument,
    fetchPolicy: 'no-cache',
  });

  return eventSchedulesFixed;
};
