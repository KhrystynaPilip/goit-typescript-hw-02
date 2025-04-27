export interface ImageDataType {
  id: number;
  urls: { [key: string]: string };
  description: string;
  user: { name: string };
  links: { download_location: string };
}
