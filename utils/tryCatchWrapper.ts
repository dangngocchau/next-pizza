import { handleResponse } from "@/utils/handleResponse";
import HttpStatusCode from "@/utils/httpStatusCode";
import { NextRequest, NextResponse } from "next/server";

export function tryCatchWrapper(
    fn: (req: NextRequest) => Promise<NextResponse>
) {
    return async (req: NextRequest) => {
        try {
            return await fn(req);
        } catch (error) {
            console.error(error);
            return handleResponse(
                null,
                "An error occurred",
                HttpStatusCode.INTERNAL_SERVER_ERROR
            );
        }
    };
}
