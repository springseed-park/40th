export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ProgramItem {
  time: string;
  title: string;
  speaker?: string;
  description: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  caption: string;
  span: boolean; // if true, spans 2 columns
}