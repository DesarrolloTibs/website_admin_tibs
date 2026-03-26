import {Suspense} from "react";

import { cookies } from 'next/headers';
import TopicsList from "./topics";

export default async function TopicsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    return (
        <Suspense>
            <TopicsList token={token ?? ""}/>
        </Suspense>
    )
}
