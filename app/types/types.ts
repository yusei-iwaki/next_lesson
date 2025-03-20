type ItemType = {
    id: string;
    title: string;
    content: string;
    price: number;
    thumbnail: { url: string };
    createdAt: string;
    updatedAt: string;
    };

type User = {
    id: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
};

type Purchase = {
    id: string;
    userId: string;
    bookId: string;
    title: string;
    createdAt: string;
    user: User;
};

export type { ItemType, User, Purchase };