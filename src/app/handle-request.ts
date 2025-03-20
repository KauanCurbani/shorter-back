import { BaseError } from "@/utils/errors";
import type { Request, Response } from "express";

export async function handleRequest(
  fn: (req: Request, res: Response) => Promise<any>,
  req: Request,
  res: Response
) {
  try {
    const response = await fn(req, res)
    res.json(response)
  } catch (e) { 
    if(e instanceof BaseError) res.status(e.statusCode).json({ message: e.message })
    else res.status(500).json({ message: "Unexpected error",error: e })
  }
  
}