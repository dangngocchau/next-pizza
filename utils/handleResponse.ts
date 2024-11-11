import { NextResponse } from "next/server";
import HttpStatusCode from "@/utils/httpStatusCode";

export function handleResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any = null,
    message = "",
    status = HttpStatusCode.OK
) {
    return NextResponse.json(
        {
            status,
            metadata: data,
            message,
        },
        { status }
    );
}
