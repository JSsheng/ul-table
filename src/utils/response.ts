import { RawResponse, Response } from "@/api/types"

export const formatResponse = (rawRes: RawResponse): Response => {

  const response = { code: rawRes.code, message: rawRes.message } as Response

  if (!rawRes.data) {
    response.data = {}
  }

  if (!rawRes.message) {
    response.message = ''
  }

  return response
}