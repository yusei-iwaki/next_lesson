import { ItemType } from '@/app/types/types';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!, 
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllContents = async () => {
    const allItems = await client.getList<ItemType>({
        endpoint: "next-lesson"
    });

    return allItems;
};

export const getDetailContent = async (contentId: string) => {
  const detailContent = await client.getListDetail<ItemType>({
    endpoint: "next-lesson",
    contentId,
  });

  return detailContent
}