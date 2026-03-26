import {Suspense} from "react";
import JoinUsList from "./join-us";

import { cookies } from 'next/headers';


export default async function JoinUsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    return (
        <Suspense>
            <JoinUsList token={token ?? ""} />
        </Suspense>
    )
}
