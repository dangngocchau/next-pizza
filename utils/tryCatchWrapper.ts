import { handleResponse } from "@/utils/handleResponse";
import HttpStatusCode from "@/utils/httpStatusCode";
import { NextRequest, NextResponse } from "next/server";

export function tryCatchWrapper(
    fn: (req: NextRequest, params?: { params: { [key: string]: string } }) => Promise<NextResponse>
) {
    return async (req: NextRequest, params: { params: { [key: string]: string } }) => {
        try {
            return await fn(req, params);
        } catch (error) {
            console.error(error);
            return handleResponse(null, "An error occurred", HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    };
}
