import cloudinary from "./cloudinary";
import { ImageProps } from "./types";

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

interface CloudinarySearchResult {
  resources: CloudinaryResource[];
  total_count: number;
}

let cachedResults: CloudinarySearchResult | null = null;

export default async function getResults(): Promise<CloudinarySearchResult> {
  if (!cachedResults) {
    const fetchedResults = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by("public_id", "desc")
      .max_results(400)
      .execute();

    cachedResults = fetchedResults;
  }

  return cachedResults as CloudinarySearchResult;
}
